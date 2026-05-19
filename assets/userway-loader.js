(function(d){
    var s = d.createElement("script");
    s.setAttribute("data-language", "he");
    s.setAttribute("data-widget_layout", "full");
    s.setAttribute("data-account", "yZwFbWSvDL");
    s.setAttribute("src", "https://cdn.userway.org/widget.js");
    (d.body || d.head).appendChild(s);
  })(document);

// ================================================================
// A11y: custom panel that toggles site.css body classes
// (high-contrast / large-text / highlight-links / reduce-motion).
// 100% reliable — no dependency on UserWay's UI binding.
// UserWay's icon is hidden via CSS (still loaded for any compliance value).
// ================================================================
(function(){
  var A11Y_KEY = 'sn_a11y_v1';
  var FEATURES = [
    { id: 'large-text',      he: 'טקסט גדול',     en: 'Larger text' },
    { id: 'high-contrast',   he: 'ניגודיות גבוהה', en: 'High contrast' },
    { id: 'highlight-links', he: 'הדגשת קישורים',  en: 'Highlight links' },
    { id: 'reduce-motion',   he: 'הפחתת תנועה',    en: 'Reduce motion' }
  ];

  function getPrefs() {
    try { return JSON.parse(localStorage.getItem(A11Y_KEY)) || {}; } catch(e) { return {}; }
  }
  function setPrefs(p) {
    try { localStorage.setItem(A11Y_KEY, JSON.stringify(p)); } catch(e) {}
  }
  function applyPrefs() {
    var p = getPrefs();
    FEATURES.forEach(function(f){ document.body.classList.toggle(f.id, !!p[f.id]); });
  }

  function build() {
    // 1. Hide UserWay's default icon entirely
    var hide = document.createElement('style');
    hide.textContent = '.uwy,#userwayAccessibilityIcon{display:none!important}';
    document.head.appendChild(hide);

    // 2. Panel CSS
    var css = document.createElement('style');
    css.textContent =
      '#snA11yPanel{position:fixed;top:70px;z-index:9999;background:rgba(15,18,28,0.96);' +
      'backdrop-filter:blur(24px) saturate(1.5);-webkit-backdrop-filter:blur(24px) saturate(1.5);' +
      'border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:16px;width:280px;' +
      'box-shadow:0 24px 80px rgba(0,0,0,0.55),0 0 0 1px rgba(255,255,255,0.05);' +
      "font-family:'Assistant','Rubik',sans-serif;color:#fff;display:none;" +
      'animation:snA11yIn .22s cubic-bezier(0.2,0.9,0.3,1.2)}' +
      'html[dir="rtl"] #snA11yPanel{right:14px;left:auto;text-align:right}' +
      'html[dir="ltr"] #snA11yPanel{left:14px;right:auto;text-align:left}' +
      '@keyframes snA11yIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}' +
      '#snA11yPanel.open{display:block}' +
      '#snA11yPanel h4{font-size:13px;font-weight:700;letter-spacing:.5px;margin:0 0 12px;color:rgba(255,255,255,.95);text-transform:uppercase}' +
      '#snA11yPanel .a11y-item{display:flex;align-items:center;justify-content:space-between;gap:12px;' +
      'padding:10px 12px;margin-bottom:6px;background:rgba(255,255,255,0.04);' +
      'border:1px solid rgba(255,255,255,0.08);border-radius:10px;cursor:pointer;' +
      'font-size:13.5px;font-weight:500;color:rgba(255,255,255,0.85);transition:all .18s}' +
      '#snA11yPanel .a11y-item:hover{background:rgba(81,131,223,0.16);border-color:rgba(81,131,223,0.4);color:#fff}' +
      '#snA11yPanel .a11y-item.on{background:rgba(81,131,223,0.28);border-color:#5183df;color:#fff}' +
      '#snA11yPanel .a11y-toggle{width:32px;height:18px;border-radius:999px;background:rgba(255,255,255,0.18);' +
      'position:relative;transition:background .2s;flex-shrink:0}' +
      "#snA11yPanel .a11y-toggle::after{content:'';position:absolute;top:2px;left:2px;width:14px;height:14px;" +
      'border-radius:50%;background:#fff;transition:transform .2s}' +
      '#snA11yPanel .a11y-item.on .a11y-toggle{background:#5183df}' +
      '#snA11yPanel .a11y-item.on .a11y-toggle::after{transform:translateX(14px)}' +
      '#snA11yPanel .a11y-reset{width:100%;margin-top:10px;padding:10px;background:transparent;' +
      'border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);border-radius:10px;' +
      'font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .18s}' +
      '#snA11yPanel .a11y-reset:hover{border-color:rgba(255,255,255,0.4);color:#fff}' +
      '#snA11yBackdrop{position:fixed;inset:0;z-index:9998;background:transparent;display:none}' +
      '#snA11yBackdrop.open{display:block}';
    document.head.appendChild(css);

    // 3. Build panel + backdrop
    var lang = document.documentElement.lang === 'en' ? 'en' : 'he';
    var title = lang === 'he' ? 'אפשרויות נגישות' : 'Accessibility';
    var reset = lang === 'he' ? 'איפוס' : 'Reset';
    var panel = document.createElement('div');
    panel.id = 'snA11yPanel';
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-label', title);
    panel.innerHTML = '<h4>' + title + '</h4>' +
      FEATURES.map(function(f){
        return '<div class="a11y-item" data-feat="' + f.id + '" role="switch" tabindex="0">' +
               '<span>' + f[lang] + '</span><span class="a11y-toggle" aria-hidden="true"></span></div>';
      }).join('') +
      '<button class="a11y-reset" type="button">' + reset + '</button>';

    var backdrop = document.createElement('div');
    backdrop.id = 'snA11yBackdrop';

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    function positionPanel() {
      var btn = document.getElementById('userwayTrigger');
      if (!btn) return;
      var r = btn.getBoundingClientRect();
      panel.style.top = (r.bottom + 10) + 'px';
      if (document.documentElement.dir === 'rtl') {
        panel.style.right = Math.max(10, window.innerWidth - r.right) + 'px';
        panel.style.left  = 'auto';
      } else {
        panel.style.left  = Math.max(10, r.left) + 'px';
        panel.style.right = 'auto';
      }
    }

    function applyPrefsToUI() {
      var p = getPrefs();
      panel.querySelectorAll('.a11y-item').forEach(function(el){
        el.classList.toggle('on', !!p[el.dataset.feat]);
      });
    }
    function open()   { applyPrefsToUI(); positionPanel(); panel.classList.add('open'); backdrop.classList.add('open'); }
    function close()  { panel.classList.remove('open'); backdrop.classList.remove('open'); }
    function toggle() { panel.classList.contains('open') ? close() : open(); }

    panel.querySelectorAll('.a11y-item').forEach(function(el){
      function flip(){
        var id = el.dataset.feat;
        var p = getPrefs();
        p[id] = !p[id];
        setPrefs(p);
        document.body.classList.toggle(id, p[id]);
        el.classList.toggle('on', p[id]);
      }
      el.addEventListener('click', flip);
      el.addEventListener('keydown', function(e){
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
      });
    });
    panel.querySelector('.a11y-reset').addEventListener('click', function(){
      FEATURES.forEach(function(f){ document.body.classList.remove(f.id); });
      setPrefs({});
      applyPrefsToUI();
    });
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });

    function bindTrigger() {
      var btn = document.getElementById('userwayTrigger');
      if (!btn || btn._snA11yBound) return;
      btn._snA11yBound = true;
      btn.addEventListener('click', function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        toggle();
      });
    }
    bindTrigger();
    if (window.MutationObserver) {
      new MutationObserver(bindTrigger).observe(document.body, { childList: true, subtree: true });
    }
    window.addEventListener('resize', positionPanel);

    applyPrefs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();

// ================================================================
// HERO SHOWREEL — loops continuously, replays on tab re-focus
// ================================================================
(function(){
  var wrap   = document.getElementById('heroShowreelWrap');
  var iframe = document.getElementById('heroShowreelIframe');
  if (!wrap || !iframe) return;

  var player = null;

  function waitForVimeo(cb) {
    if (typeof Vimeo !== 'undefined' && Vimeo.Player) { cb(); return; }
    var t = setInterval(function(){
      if (typeof Vimeo !== 'undefined' && Vimeo.Player) { clearInterval(t); cb(); }
    }, 100);
  }

  waitForVimeo(function(){
    player = new Vimeo.Player(iframe);
    player.setLoop(true).catch(function(){});
    player.disableTextTrack().catch(function(){});
    player.play().catch(function(){});

    // On Vimeo error — hide wrapper so no error banner shows
    player.on('error', function(){
      wrap.classList.add('sr-ended');
    });
  });

  // Resume play on tab re-focus (browser may have paused background tabs)
  document.addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'visible' && player) {
      player.play().catch(function(){});
    }
  });
})();

// ================================================================
// PROJECT MODAL KEEPALIVE — ping every open project video every 8s
// so browsers never throttle or suspend the background-mode iframes
// ================================================================
setInterval(function(){
  if (!window._pvPlayers || !window._pvPlayers.length) return;
  var overlay = document.getElementById('project-overlay');
  if (!overlay || !overlay.classList.contains('active')) return;
  window._pvPlayers.forEach(function(p){ try{ p.play().catch(function(){}); }catch(e){} });
}, 8000);

// ================================================================
// RTL-AWARE SCROLL ARROWS
// ================================================================
function getScrollDir(requestedDir){
  // In RTL, left arrow should scroll right (positive X) and vice versa
  const rtl = document.documentElement.dir === 'rtl';
  return rtl ? -requestedDir : requestedDir;
}

// Override scrollFolders for RTL support
const _origScrollFolders = scrollFolders;
scrollFolders = function(dir){ _origScrollFolders(getScrollDir(dir)); };

// Override scrollFeatured for RTL support
const _origScrollFeatured = scrollFeatured;
scrollFeatured = function(dir){ _origScrollFeatured(getScrollDir(dir)); };

// ================================================================
// SERVICES: Hebrew title & collabs fix via toggleLang hook
// ================================================================
const _origToggleLang = toggleLang;
toggleLang = function(){
  _origToggleLang();
  // Ensure projects and featured sections are always visible
  document.querySelectorAll('.folders-carousel, .featured-strip, .brand-marquee, .testimonials-marquee').forEach(el => {
    el.style.display = '';
    el.style.visibility = 'visible';
    el.style.opacity = '1';
  });
  document.querySelectorAll('.folder-card, .featured-item').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
};

// ================================================================
// ADDITIONAL SCROLL ANIMATIONS  -  observe more elements
// ================================================================
(function addMoreAnimations(){
  const css = `
    .anim-up{opacity:0;transform:translateY(32px);transition:opacity 0.75s cubic-bezier(0.16,1,0.3,1),transform 0.75s cubic-bezier(0.16,1,0.3,1)}
    .anim-up.visible{opacity:1;transform:translateY(0)}
    .anim-up:nth-child(2){transition-delay:0.08s}
    .anim-up:nth-child(3){transition-delay:0.16s}
    .anim-up:nth-child(4){transition-delay:0.24s}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const animObs = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Add anim-up to elements not already animated
  document.querySelectorAll(
    '.brands-header, .testimonials-marquee, .dream-logo-wrap, .dream-words, .footer .footer-text, .contact-big-text, .contact-btn'
  ).forEach(el => {
    if(!el.classList.contains('fade-in') && !el.classList.contains('anim-up')){
      el.classList.add('anim-up');
      animObs.observe(el);
    }
  });
})();

// ================================================================
// ENSURE PROJECTS VISIBLE (runs after any language toggle)
// ================================================================
function ensureProjectsVisible(){
  document.querySelectorAll(
    '.folder-card, .featured-item, .folders-carousel, .featured-strip, .projects-section, .featured-section'
  ).forEach(el => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
    if(el.classList.contains('folder-card') || el.classList.contains('featured-item')){
      el.style.transform = 'none';
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(ensureProjectsVisible, 300);
  setTimeout(ensureProjectsVisible, 1200);
  // Set thumbnail as CSS background-image on each video container (no black box while img loads)
  document.querySelectorAll('.fc-bg[data-vid], .fi-bg[data-vid]').forEach(function(el){
    var id = el.dataset.vid;
    if (id) el.style.backgroundImage = 'url(https://vumbnail.com/' + id + '.jpg)';
  });
});







// ── Mobile: Favorites card in projects carousel (replaces hidden featured section) ──
(function(){
  if (window.innerWidth >= 768) return;
  var seen = new Set();
  var favVids = [];
  document.querySelectorAll('#featuredTrack .featured-item[data-vid]').forEach(function(item){
    var vid = item.dataset.vid;
    if (!vid || seen.has(vid)) return;
    seen.add(vid);
    favVids.push([vid, item.classList.contains('portrait') ? 'p' : 'l']);
  });
  if (!favVids.length) return;
  if (typeof PROJECT_DATA !== 'undefined') {
    PROJECT_DATA['favorites'] = { en:'Highlights', he:'\u05de\u05d5\u05de\u05dc\u05e6\u05d9\u05dd', vids:favVids };
  }
  var vidIds = favVids.slice(0,6).map(function(v){return v[0];}).join(',');
  var card = document.createElement('div');
  card.className = 'folder-card';
  card.setAttribute('onclick',"openProject('favorites')");
  card.setAttribute('data-key','favorites');
  card.setAttribute('data-vids', vidIds);
  card.innerHTML =
    '<div class="folder-thumb">' +
      '<div class="fc-bg" data-vid="'+favVids[0][0]+'" data-vids="'+vidIds+'">' +
        '<img class="fc-thumb-img" src="https://vumbnail.com/'+favVids[0][0]+'.jpg" ' +
        'alt="Highlights" loading="lazy" draggable="false">' +
      '</div>' +
      '<div class="fc-overlay"><div class="fc-play-btn"></div></div>' +
    '</div>' +
    '<div class="folder-info"><h4 data-en="Highlights" data-he="\u05de\u05d5\u05de\u05dc\u05e6\u05d9\u05dd">Highlights</h4></div>';
  var track = document.getElementById('foldersTrack');
  if (track) track.appendChild(card);
})();

// ── Project card: 3×3 mini-grid of thumbnails + name overlay ──
(function(){
  document.querySelectorAll('.folder-card[data-key][data-vids]').forEach(function(card){
    var bg = card.querySelector('.fc-bg');
    if (!bg || bg.querySelector('.fc-thumb-grid')) return;

    // Hide legacy thumb image (grid hidden via CSS)
    var oldThumb = bg.querySelector('.fc-thumb-img');
    if (oldThumb) oldThumb.style.display = 'none';

    var rawVids = (card.dataset.vids || '').split(',').filter(Boolean);
    if (!rawVids.length) return;

    // Fill 9 slots (3×3 grid), repeating if project has < 9 videos
    var slots = [];
    while (slots.length < 9) slots = slots.concat(rawVids);
    slots = slots.slice(0, 9);

    // Build grid
    var grid = document.createElement('div');
    grid.className = 'fc-thumb-grid';
    slots.forEach(function(vid){
      var img = document.createElement('img');
      img.className = 'fc-grid-thumb';
      img.src = 'https://vumbnail.com/' + vid.trim() + '.jpg';
      img.loading = 'lazy';
      img.draggable = false;
      img.alt = '';
      grid.appendChild(img);
    });
    bg.appendChild(grid);

    // Project name overlay (bottom)
    var thumb = card.querySelector('.folder-thumb');
    if (thumb && !thumb.querySelector('.fc-name-overlay')) {
      var h4 = card.querySelector('.folder-info h4');
      var en = h4 ? (h4.dataset.en || h4.textContent.trim()) : '';
      var he = h4 ? (h4.dataset.he || '') : '';
      var nameDiv = document.createElement('div');
      nameDiv.className = 'fc-name-overlay';
      nameDiv.innerHTML = '<span class="fc-project-title" data-en="' +
        en.replace(/"/g,'&quot;') + '" data-he="' + he.replace(/"/g,'&quot;') +
        '">' + en + '</span>';
      thumb.appendChild(nameDiv);
    }

    // Hide play button + folder-info (name shown only once on overlay)
    var btn = card.querySelector('.fc-play-btn');
    if (btn) btn.style.display = 'none';
    var info = card.querySelector('.folder-info');
    if (info) info.style.display = 'none';
  });
})();

// ── Project card: background video preloads near viewport, reveals on hover ──
(function(){
  var _cardVidBuilt = new WeakSet();
  var _cardVidCount = 0;
  var _cardVidMax = 12;

  function buildCardVid(card) {
    if (_cardVidBuilt.has(card) || _cardVidCount >= _cardVidMax) return;
    var bg = card.querySelector('.fc-bg');
    if (!bg || bg.querySelector('.fc-card-vid')) return;
    var vid = bg.dataset.vid;
    if (!vid) return;
    _cardVidBuilt.add(card);
    _cardVidCount++;
    var hash = (typeof VID_HASHES !== 'undefined' && VID_HASHES[vid]) ? VID_HASHES[vid] : '';
    var q = hash ? '?h=' + hash + '&' : '?';
    var iframe = document.createElement('iframe');
    iframe.className = 'fc-card-vid';
    iframe.src = 'https://player.vimeo.com/video/' + vid + q +
      'background=1&autoplay=1&loop=1&muted=1&playsinline=1&autopause=0&dnt=1&texttrack=false';
    iframe.setAttribute('frameborder','0');
    iframe.setAttribute('allow','autoplay; fullscreen; picture-in-picture');
    iframe.style.cssText = 'position:absolute;top:50%;left:50%;' +
      'width:177.8%;height:177.8%;transform:translate(-50%,-50%);' +
      'border:0;pointer-events:none;';
    bg.appendChild(iframe);
  }

  // Build bg video for all 9 unique cards immediately (desktop only — mobile skips to save memory)
  if (!window.matchMedia || !window.matchMedia('(pointer:coarse)').matches) {
    var _builtCount = 0;
    document.querySelectorAll('.folder-card[data-key]').forEach(function(c) {
      if (_builtCount >= 9) return;
      buildCardVid(c);
      _builtCount++;
    });
  }
})();

// ── Touch hover: reveal card bg video on touchstart (desktop/non-coarse only) ──
(function(){
  // On mobile (pointer:coarse) the two-tap IIFE below manages touch-active
  if (window.matchMedia && window.matchMedia('(pointer:coarse)').matches) return;
  document.querySelectorAll('.folder-card[data-key]').forEach(function(card){
    card.addEventListener('touchstart', function(){
      document.querySelectorAll('.folder-card.touch-active').forEach(function(c){
        if (c !== card) c.classList.remove('touch-active');
      });
      card.classList.add('touch-active');
    }, {passive:true});
    card.addEventListener('touchend', function(){
      setTimeout(function(){ card.classList.remove('touch-active'); }, 2000);
    }, {passive:true});
  });
})();

// ─── PEEK STRIP: show video thumbnails on project card hover ─────────────────
(function(){
  document.querySelectorAll('.folder-card[data-key][data-vids]').forEach(function(card){
    var thumb = card.querySelector('.folder-thumb');
    if(!thumb || thumb.querySelector('.fc-peek')) return;
    var vids = (card.dataset.vids || '').split(',').filter(Boolean);
    if(vids.length < 2) return;
    var count = vids.length;
    // Show up to 3 peek thumbs from the project (skip vid[0] — already playing)
    var peekVids = vids.slice(1, 4);

    var peek = document.createElement('div');
    peek.className = 'fc-peek';

    // Badge: "12 videos"
    var badge = document.createElement('span');
    badge.className = 'fc-peek-badge';
    badge.textContent = count + (typeof currentLang !== 'undefined' && currentLang === 'he' ? ' סרטונים' : ' videos');
    peek.appendChild(badge);

    peekVids.forEach(function(vid){
      var img = document.createElement('img');
      img.className = 'fc-peek-thumb';
      img.src = 'https://vumbnail.com/' + vid.trim() + '.jpg';
      img.loading = 'lazy';
      img.draggable = false;
      img.alt = '';
      peek.appendChild(img);
    });

    thumb.appendChild(peek);
  });
})();

// ── Mobile: direct touchend on folder-card → openProject (no two-tap, no click reliance) ──
(function(){
  if (!window.matchMedia || !window.matchMedia('(pointer:coarse)').matches) return;
  document.querySelectorAll('.folder-card[data-key]').forEach(function(card){
    var sx = 0, sy = 0;
    card.addEventListener('touchstart', function(e){
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    }, {passive:true});
    card.addEventListener('touchend', function(e){
      var dx = Math.abs(e.changedTouches[0].clientX - sx);
      var dy = Math.abs(e.changedTouches[0].clientY - sy);
      if (dx > 10 || dy > 10) return; // was a scroll, ignore
      e.preventDefault(); // block synthetic click — we open directly here
      var key = card.getAttribute('data-key');
      if (key) openProject(key);
    }, {passive:false});
  });
})();

// ── Mobile nav accordion for Projects ──
function toggleMobProjectsMenu(btn) {
  btn.classList.toggle('open');
  var panel = btn.nextElementSibling;
  if (panel) panel.classList.toggle('open');
}
function openProjectFromNav(key) {
  closeMobileNav();
  setTimeout(function() {
    var el = document.getElementById('projects');
    if (el) el.scrollIntoView({behavior:'smooth'});
    setTimeout(function() { openProject(key); }, 420);
  }, 200);
}

// ── Deep linking: clean hash from URL on page load to prevent auto-modal on refresh ──
(function(){
  // On page load — clear any leftover project hash silently so refresh is always clean
  if (window.location.hash) {
    var key = window.location.hash.replace('#','');
    if (typeof PROJECT_DATA !== 'undefined' && PROJECT_DATA[key]) {
      // Remove hash without triggering hashchange or reload
      if (history.replaceState) history.replaceState(null, '', window.location.pathname);
    }
  }
})();

// ─── RTL ARROW FIX ───────────────────────────────────────────
document.querySelectorAll('.carousel-btn').forEach(btn => {
  btn.addEventListener('click', e => e.stopPropagation());
});
