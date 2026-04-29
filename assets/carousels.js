(function(){
  var isMobile = window.innerWidth <= 768;

  // Config: [selector, dir, speedDesktop, speedMobile]
  // dir: 'right'=scrollLeft+, 'left'=scrollLeft-
  var CAROUSELS = [
    ['.folders-carousel',     'left',  0.65, 0.45],
    ['.featured-strip',       'right', 0.65, 0.50],
    ['.brand-marquee',        'left',  0.70, 0.55],
    ['.testimonials-marquee', 'right', 0.55, 0.40],
  ];

  // rAF scroller: runs on ALL viewports (desktop + mobile)
  CAROUSELS.forEach(function(cfg){
    var sel   = cfg[0];
    var dir   = cfg[1];
    var speed = isMobile ? cfg[3] : cfg[2];

    var wrap = document.querySelector(sel);
    if (!wrap) return;

    var track = wrap.firstElementChild;
    var touching  = false;  // finger on screen
    var mouseDown = false;  // mouse button held
    var didDrag   = false;  // mouse moved enough to count as drag
    var mouseLastX = 0;
    var hovering  = false;
    var rafId     = null;
    var lastTs    = null;

    function getHalf(){ return track ? Math.floor(track.scrollWidth / 2) : 0; }

    // Clamp scrollLeft inside [0, half*2) with seamless wrap
    function wrapScroll(){
      var half = getHalf();
      if (half <= 0) return;
      if (wrap.scrollLeft <= 0)        wrap.scrollLeft += half;
      if (wrap.scrollLeft >= half * 2) wrap.scrollLeft -= half;
      if (dir === 'left' && wrap.scrollLeft < half / 2 && wrap.scrollLeft > 0){}
      // Light boundary: jump when we cross midpoint
      if (dir === 'right' && wrap.scrollLeft >= half) wrap.scrollLeft -= half;
      if (dir === 'left'  && wrap.scrollLeft <= 0)    wrap.scrollLeft += half;
    }

    function step(ts){
      var paused = touching || mouseDown ||
                   (hovering && !isMobile) ||
                   (window._carouselBtnPauseUntil && Date.now() < window._carouselBtnPauseUntil);
      if (paused){ lastTs = null; rafId = requestAnimationFrame(step); return; }
      if (lastTs === null){ lastTs = ts; rafId = requestAnimationFrame(step); return; }
      var dt    = Math.min(ts - lastTs, 50);
      lastTs    = ts;
      var delta = speed * dt / 16.67;
      var half  = getHalf();
      if (half <= 0){ rafId = requestAnimationFrame(step); return; }
      if (dir === 'right'){
        wrap.scrollLeft += delta;
        if (wrap.scrollLeft >= half) wrap.scrollLeft -= half;
      } else {
        wrap.scrollLeft -= delta;
        if (wrap.scrollLeft <= 0) wrap.scrollLeft += half;
      }
      rafId = requestAnimationFrame(step);
    }

    // ── Touch (mobile) ───────────────────────────────────────────
    wrap.addEventListener('touchstart', function(){
      touching = true;
      if (window.innerWidth <= 768) wrap.classList.add('snap-touch');
    }, {passive:true});
    wrap.addEventListener('touchend', function(){
      // Pause auto-scroll for 8s after user swipes — time to actually see the card
      window._carouselBtnPauseUntil = Date.now() + 8000;
      setTimeout(function(){
        touching = false;
        wrap.classList.remove('snap-touch');
      }, 600);
    }, {passive:true});

    // ── Mouse drag (desktop) ─────────────────────────────────────
    wrap.addEventListener('mouseenter', function(){ hovering = true; });
    wrap.addEventListener('mouseleave', function(){
      hovering = false;
      // Release drag if mouse leaves wrap
      if (mouseDown){
        mouseDown = false;
        wrap.style.cursor = '';
        window._carouselBtnPauseUntil = Date.now() + 600;
      }
    });

    wrap.addEventListener('mousedown', function(e){
      // Skip entirely on touch devices — mousedown fires after touchend on mobile
      // and calling preventDefault() here blocks the click event → openProject never fires
      if (window.matchMedia('(pointer:coarse)').matches) return;
      if (e.button !== 0) return;
      // Don't intercept clicks on buttons or links
      if (e.target.closest('button,.carousel-btn,a')) return;
      mouseDown = true;
      didDrag   = false;
      mouseLastX = e.clientX;
      wrap.style.cursor = 'grabbing';
      e.preventDefault();
    }, {passive:false});

    window.addEventListener('mousemove', function(e){
      if (!mouseDown) return;
      var dx = e.clientX - mouseLastX;
      mouseLastX = e.clientX;
      if (Math.abs(dx) > 2) didDrag = true;
      wrap.scrollLeft -= dx;  // natural: drag right → content moves right
      var half = getHalf();
      if (half > 0){
        if (wrap.scrollLeft < 0)        wrap.scrollLeft += half;
        if (wrap.scrollLeft >= half * 2) wrap.scrollLeft -= half;
      }
      // Rolling pause so auto-scroll doesn't fight the drag
      window._carouselBtnPauseUntil = Date.now() + 150;
    });

    window.addEventListener('mouseup', function(){
      if (!mouseDown) return;
      mouseDown = false;
      wrap.style.cursor = hovering ? 'grab' : '';
      window._carouselBtnPauseUntil = Date.now() + 800;
    });

    // Suppress click on cards if it was a mouse drag (desktop only)
    wrap.addEventListener('click', function(e){
      if (didDrag && !window.matchMedia('(pointer:coarse)').matches){
        e.stopPropagation();
        e.preventDefault();
        didDrag = false;
      }
    }, true);

    // ── Start ────────────────────────────────────────────────────
    function start(){
      var half = getHalf();
      if (half > 0 && half > wrap.offsetWidth){
        // Position so auto-scroll loop starts cleanly
        if (dir === 'left') wrap.scrollLeft = half;
        rafId = requestAnimationFrame(step);
      } else {
        setTimeout(start, 1200);
      }
    }
    setTimeout(start, isMobile ? 400 : 600);
  }); // end CAROUSELS.forEach

  // ── Services mobile auto-scroll — continuous LEFT (שמאלה), seamless ──
  if (isMobile) {
    var svcGrid = document.querySelector('.services-grid');
    if (svcGrid) {
      // Clone cards for seamless infinite loop
      var svcOriginals = Array.from(svcGrid.children);
      svcOriginals.forEach(function(c){ svcGrid.appendChild(c.cloneNode(true)); });
      var svcSpeed = 0.50;
      var svcTouching = false;
      var svcLast = null;
      svcGrid.addEventListener('touchstart', function(){ svcTouching = true; }, {passive:true});
      svcGrid.addEventListener('touchend', function(){
        setTimeout(function(){ svcTouching = false; }, 800);
      }, {passive:true});
      function svcStep(ts){
        var _svcBtnPaused = window._carouselBtnPauseUntil && Date.now() < window._carouselBtnPauseUntil;
        if (!svcTouching && !_svcBtnPaused){
          if (svcLast !== null){
            var dt = Math.min(ts - svcLast, 50);
            svcGrid.scrollLeft += svcSpeed * dt / 16.67; // LEFT (שמאלה)
            var half = svcGrid.scrollWidth / 2;
            if (half > 0 && svcGrid.scrollLeft >= half){
              svcGrid.scrollLeft -= half; // seamless jump
            }
          }
        } else { svcLast = null; }
        svcLast = ts;
        requestAnimationFrame(svcStep);
      }
      setTimeout(function(){ requestAnimationFrame(svcStep); }, 800);
    }
  }
})();



// ── Site loader: smart "eye" — dismiss only when hero + featured videos are PLAYING ──
(function(){
  var loader = document.getElementById('site-loader');
  if (!loader) return;
  var _slDismissed = false;
  var _slStart = Date.now();
  var _isMob = window.innerWidth <= 768;
  // Minimum loader display so the progress bar animation completes
  var _slMinMs = _isMob ? 2500 : 5000;

  function dismiss(){
    if (_slDismissed) return;
    var elapsed = Date.now() - _slStart;
    var wait = Math.max(0, _slMinMs - elapsed);
    setTimeout(function(){
      if (_slDismissed) return;
      _slDismissed = true;
      // Restart hero showreel from time 0 so the user sees it from the start
      if (window._heroPlayer) {
        try { window._heroPlayer.setCurrentTime(0).then(function(){
          window._heroPlayer.play().catch(function(){});
        }).catch(function(){}); } catch(e) {}
      }
      loader.classList.add('sl-hidden');
      setTimeout(function(){ if (loader.parentNode) loader.style.display = 'none'; }, 800);
    }, wait);
  }

  // Smart eye counters — featured IIFE bumps _slFeatPlaying when timeupdate fires
  window._slFeatPlaying = 0;
  window._slFeatLoaded = 0; // legacy alias for compatibility
  var _slHeroPlaying = false;
  // Mobile: featured iframes are skipped — only require hero
  var _slNeededFeat = _isMob ? 0 : 1;

  window._slCheckReady = function(){
    if (_slHeroPlaying && window._slFeatPlaying >= _slNeededFeat) dismiss();
  };

  // Hero showreel — initialize Vimeo Player IMMEDIATELY (the iframe is in static
  // HTML and may have already fired its load event before this script runs, so
  // attaching a load listener is unreliable). The Vimeo SDK handles the handshake
  // internally regardless of iframe load state.
  var heroIframe = document.getElementById('heroShowreelIframe');
  if (heroIframe) {
    if (typeof Vimeo !== 'undefined' && Vimeo.Player) {
      try {
        var hp = new Vimeo.Player(heroIframe);
        window._heroPlayer = hp; // exposed so dismiss() can rewind to 0
        var _heroPlayed = false;
        hp.on('timeupdate', function _onHeroTu(){
          if (_heroPlayed) return; _heroPlayed = true;
          hp.off('timeupdate', _onHeroTu);
          _slHeroPlaying = true;
          window._slCheckReady();
        });
        hp.play().catch(function(){});
      } catch(e) {
        _slHeroPlaying = true; window._slCheckReady();
      }
    }
    // Safety: assume playing after 2.5s if timeupdate didn't fire (autoplay blocked etc.)
    setTimeout(function(){ _slHeroPlaying = true; window._slCheckReady(); }, 2500);
  } else {
    _slHeroPlaying = true;
  }

  // Hard fallback — never keep loader past 8s desktop / 5s mobile
  setTimeout(dismiss, _isMob ? 5000 : 8000);
})();

// ── Project URL routing — deep links & browser back/forward ──
(function() {
  // Browser back/forward button
  window.addEventListener('popstate', function(e) {
    var overlay = document.getElementById('project-overlay');
    if (e.state && e.state.project) {
      openProject(e.state.project);
    } else if (overlay && overlay.classList.contains('active')) {
      closeProject();
    }
  });
  // Deep link: open project from URL hash on load (e.g. sharbelnajem.pro/#naadned)
  var hash = window.location.hash.replace('#', '');
  if (hash && typeof PROJECT_DATA !== 'undefined' && PROJECT_DATA[hash]) {
    window.addEventListener('load', function() {
      setTimeout(function() { openProject(hash); }, 900);
    });
  }
})();
