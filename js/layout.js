/**
 * Cabecera (topbar + nav) y pie de página compartidos por todas las páginas.
 * Cada página solo necesita:
 *   <div id="site-header"></div>
 *   <script>Layout.header('ID_DE_PAGINA');</script>
 *   ...
 *   <div id="site-footer"></div>
 *   <script>Layout.footer();</script>
 * antes de cargar data/news.js y js/main.js.
 */
(function () {
  var NAV_ITEMS = [
    { id: 'inicio',     href: 'index.html',       i18n: 'nav_inicio' },
    { id: 'conocenos',  href: 'conocenos.html',   i18n: 'nav_conocenos' },
    { id: 'propuestas', href: 'propuestas.html',  i18n: 'nav_propuestas' },
    { id: 'noticias',   href: 'noticias.html',    i18n: 'nav_noticias' },
    { id: 'opinion',    href: 'opinion.html',     i18n: 'nav_opinion' },
    { id: 'videos',     href: 'index.html#videos', i18n: 'nav_videos' },
    { id: 'afiliate',   href: 'afiliate.html',    i18n: 'nav_afiliate' },
    { id: 'contacto',   href: 'contacto.html',    i18n: 'nav_contacto' }
  ];

  function headerHTML(active) {
    var links = NAV_ITEMS.map(function (item) {
      var cls = item.id === active ? ' class="active-link"' : '';
      return '<li><a href="' + item.href + '" data-i18n="' + item.i18n + '"' + cls + '></a></li>';
    }).join('');

    return ''
      + '<div class="topbar">'
      + '  <div class="wrap">'
      + '    <div class="topbar-left">'
      + '      <a href="tel:+34935890000"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> [93 589 00 00]</a>'
      + '      <a href="mailto:info@ppsantcugat.es"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6zm-2 0-8 5-8-5"/></svg> [info@ppsantcugat.es]</a>'
      + '    </div>'
      + '    <div class="topbar-right">'
      + '      <div class="social-inline" id="topSocial">'
      + '        <a href="#" aria-label="Facebook" data-net="facebook">FB</a>'
      + '        <a href="#" aria-label="X" data-net="x">X</a>'
      + '        <a href="#" aria-label="Instagram" data-net="instagram">IG</a>'
      + '        <a href="#" aria-label="YouTube" data-net="youtube">YT</a>'
      + '        <a href="#" aria-label="TikTok" data-net="tiktok">TT</a>'
      + '        <a href="#" aria-label="WhatsApp" data-net="whatsapp">WA</a>'
      + '      </div>'
      + '      <div class="lang-switch">'
      + '        <button data-lang="es" class="active">ES</button><span>/</span><button data-lang="ca">CA</button>'
      + '      </div>'
      + '    </div>'
      + '  </div>'
      + '</div>'
      + '<nav class="nav">'
      + '  <div class="wrap">'
      + '    <a href="index.html" class="brand">'
      + '      <img id="logoImg" src="assets/logo-pp.png" alt="Logo Partido Popular" onerror="this.remove();document.getElementById(\'logoFallback\').style.display=\'flex\';">'
      + '      <div class="brand-mark" id="logoFallback" style="display:none;">P.</div>'
      + '      <div class="brand-text">'
      + '        <span class="n1">PP</span>'
      + '        <span class="n2">SANT CUGAT</span>'
      + '      </div>'
      + '    </a>'
      + '    <ul class="nav-links" id="navLinks">' + links + '</ul>'
      + '    <a href="especial-elecciones-2027.html" class="btn btn-primary nav-cta" data-i18n="nav_cta">Especial Elecciones 2027</a>'
      + '    <button class="menu-toggle" id="menuToggle" aria-label="Menú">'
      + '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>'
      + '    </button>'
      + '  </div>'
      + '</nav>';
  }

  function footerHTML() {
    return ''
      + '<div class="wrap">'
      + '  <div class="footer-grid">'
      + '    <div class="footer-brand">'
      + '      <div class="brand" style="margin-bottom:4px;">'
      + '        <div class="brand-mark" style="width:36px;height:36px;font-size:16px;">P.</div>'
      + '        <div class="brand-text"><span class="n1" style="color:#fff;">PP</span><span class="n2">SANT CUGAT</span></div>'
      + '      </div>'
      + '      <p data-i18n="footer_desc">Trabajamos cada día por un Sant Cugat mejor, más seguro y próspero para todas las personas que viven en nuestra ciudad.</p>'
      + '      <div class="social-circles">'
      + '        <a class="scircle" style="background:rgba(255,255,255,.1);color:#fff;" href="#" data-net="facebook">FB</a>'
      + '        <a class="scircle" style="background:rgba(255,255,255,.1);color:#fff;" href="#" data-net="instagram">IG</a>'
      + '        <a class="scircle" style="background:rgba(255,255,255,.1);color:#fff;" href="#" data-net="youtube">YT</a>'
      + '        <a class="scircle" style="background:rgba(255,255,255,.1);color:#fff;" href="#" data-net="x">X</a>'
      + '        <a class="scircle" style="background:rgba(255,255,255,.1);color:#fff;" href="#" data-net="tiktok">TT</a>'
      + '      </div>'
      + '    </div>'
      + '    <div>'
      + '      <h5 data-i18n="footer_h1">Secciones</h5>'
      + '      <ul>'
      + '        <li><a href="conocenos.html" data-i18n="nav_conocenos">Conócenos</a></li>'
      + '        <li><a href="propuestas.html" data-i18n="nav_propuestas">Propuestas</a></li>'
      + '        <li><a href="noticias.html" data-i18n="nav_noticias">Noticias</a></li>'
      + '        <li><a href="opinion.html" data-i18n="nav_opinion">Opinión</a></li>'
      + '        <li><a href="index.html#videos" data-i18n="nav_videos">Vídeos</a></li>'
      + '      </ul>'
      + '    </div>'
      + '    <div>'
      + '      <h5 data-i18n="footer_h2">Participa</h5>'
      + '      <ul>'
      + '        <li><a href="afiliate.html" data-i18n="footer_join">Únete</a></li>'
      + '        <li><a href="afiliate.html" data-i18n="footer_newsletter">Newsletter</a></li>'
      + '        <li><a href="index.html#actualidad" data-i18n="foto_title">Foto-Denuncia</a></li>'
      + '        <li><a href="index.html#actualidad" data-i18n="mapa_title">Mapa de Abandono</a></li>'
      + '        <li><a href="contacto.html" data-i18n="nav_contacto">Contactar</a></li>'
      + '      </ul>'
      + '    </div>'
      + '    <div>'
      + '      <h5 data-i18n="footer_h3">Contacto</h5>'
      + '      <ul class="footer-contact">'
      + '        <li>📍 Sant Cugat del Vallès</li>'
      + '        <li>📞 [93 589 00 00]</li>'
      + '        <li>✉️ [info@ppsantcugat.es]</li>'
      + '      </ul>'
      + '    </div>'
      + '  </div>'
      + '  <div class="footer-bottom">'
      + '    <span data-i18n-html="footer_copy">© 2026 PP Sant Cugat. Todos los derechos reservados.</span>'
      + '    <span><a href="privacidad.html" data-i18n="legal_title" style="opacity:.75;">Términos de uso y política de privacidad</a> · <span data-i18n="footer_credit">Web de campaña — Horizonte 2027</span></span>'
      + '  </div>'
      + '</div>';
  }

  window.Layout = {
    header: function (active) {
      document.getElementById('site-header').innerHTML = headerHTML(active);
    },
    footer: function () {
      document.getElementById('site-footer').innerHTML = footerHTML();
    }
  };
})();
