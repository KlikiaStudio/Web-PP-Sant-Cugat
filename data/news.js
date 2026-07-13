/**
 * Carga noticias, opiniones y vídeos desde Google Sheets.
 * La hoja tiene 3 pestañas: NOTICIAS, OPINION, VIDEOS.
 * Solo se muestran las filas con activo = 1.
 *
 * Para que funcione, la hoja debe estar publicada como "cualquiera con el enlace puede ver".
 */
(function () {
  var SHEETS_ID = '1_RwObghauyC68umoJ42IzhqTPDl3qx8SV_x2tIASdGw';

  // Valores vacíos hasta que lleguen los datos
  window.SITE_NEWS   = { actualidad: [], opinion: [] };
  window.SITE_VIDEOS = [];

  function parseSheet(json) {
    var cols = json.table.cols.map(function (c) { return c.label; });
    return json.table.rows
      .filter(function (row) { return row.c && row.c.some(function (c) { return c && c.v != null; }); })
      .map(function (row) {
        var obj = {};
        row.c.forEach(function (cell, i) { obj[cols[i]] = cell ? cell.v : null; });
        return obj;
      });
  }

  // Google Sheets gviz devuelve fechas como "Date(año,mes0,día)". Las convertimos a "YYYY-MM-DD".
  function parseDate(val) {
    if (!val) return '';
    var m = String(val).match(/^Date\((\d+),(\d+),(\d+)\)/);
    if (m) {
      var y  = m[1];
      var mo = String(Number(m[2]) + 1).padStart(2, '0');
      var d  = String(Number(m[3])).padStart(2, '0');
      return y + '-' + mo + '-' + d;
    }
    return String(val);
  }

  function getYoutubeId(url) {
    if (!url) return null;
    var m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?\s]+)/);
    return m ? m[1] : null;
  }

  // Convierte enlaces de "compartir" de Google Drive (…/file/d/ID/view) en una URL de imagen directa.
  function driveDirectUrl(url) {
    if (!url) return '';
    var m = url.match(/\/file\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);
    return m ? 'https://drive.google.com/thumbnail?id=' + m[1] + '&sz=w1000' : url;
  }

  var base = 'https://docs.google.com/spreadsheets/d/' + SHEETS_ID + '/gviz/tq?sheet=';

  // Cargamos cada pestaña vía JSONP (etiqueta <script>) en lugar de fetch():
  // fetch() exige CORS, y el origen "null" (abrir el HTML con doble clic, sin
  // servidor local) siempre lo bloquea. Un <script src> nunca pasa por CORS,
  // así que esto funciona igual con Live Server, en producción o en local.
  function loadSheet(sheetName) {
    return new Promise(function (resolve, reject) {
      var cbName = '__ppSheetCB_' + sheetName + '_' + Date.now();
      window[cbName] = function (json) {
        resolve(json);
        delete window[cbName];
        script.parentNode && script.parentNode.removeChild(script);
      };
      var script = document.createElement('script');
      script.src = base + sheetName + '&tqx=out:json;responseHandler:' + cbName;
      script.onerror = function () {
        reject(new Error('No se pudo cargar la pestaña ' + sheetName));
        delete window[cbName];
        script.parentNode && script.parentNode.removeChild(script);
      };
      document.head.appendChild(script);
    });
  }

  Promise.all([
    loadSheet('NOTICIAS'),
    loadSheet('OPINION'),
    loadSheet('VIDEOS')
  ]).then(function (results) {
    var rN = results[0], rO = results[1], rV = results[2];

    var noticias  = parseSheet(rN).filter(function (r) { return r.activo == 1; });
    var opiniones = parseSheet(rO).filter(function (r) { return r.activo == 1; });
    var videos    = parseSheet(rV).filter(function (r) { return r.activo == 1; });

    window.SITE_NEWS = {
      actualidad: noticias.map(function (n) {
        return {
          image:    n.imagen_url  || '',
          date:     parseDate(n.fecha),
          link:     n.enlace      || '#',
          category: { es: n.categoria || '', ca: n.categoria || '' },
          title:    { es: n.titular   || '', ca: n.titular   || '' },
          excerpt:  { es: n.resumen   || '', ca: n.resumen   || '' }
        };
      }),
      opinion: opiniones.map(function (o) {
        return {
          numero: o.numero || '',
          link:   o.enlace || '#',
          title:  { es: o.titulo || '', ca: o.titulo || '' },
          author: o.autor  || ''
        };
      })
    };

    window.SITE_VIDEOS = videos.map(function (v) {
      var platform  = (v.plataforma || '').toLowerCase();
      var youtubeId = platform === 'youtube' ? getYoutubeId(v.url_video) : null;
      var autoThumb = youtubeId ? 'https://img.youtube.com/vi/' + youtubeId + '/hqdefault.jpg' : null;
      return {
        platform:    platform,
        url:         v.url_video      || '#',
        youtubeId:   youtubeId,
        thumbnail:   driveDirectUrl(v.thumbnail_url) || autoThumb || '',
        title:       { es: v.titulo || '', ca: v.titulo || '' },
        publishedAt: parseDate(v.fecha)
      };
    });

    // Re-renderizar con los datos reales (main.js ya está cargado a estas alturas)
    if (typeof applyLang === 'function' && typeof currentLang !== 'undefined') {
      applyLang(currentLang);
    }
  }).catch(function (e) {
    console.warn('Error cargando datos de Google Sheets:', e);
  });
})();
