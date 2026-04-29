// Prevent iOS Safari from restoring scroll position after reload — always start at top
if (history.scrollRestoration) history.scrollRestoration = 'manual';
window.addEventListener('load', function(){ if (!window.location.hash) window.scrollTo(0, 0); });

// ── Page Visibility: pause every Vimeo iframe when the tab is hidden,
// resume the ones currently in view when it becomes visible again. Saves
// significant CPU/network when the user switches tabs. ─────────────────────
document.addEventListener('visibilitychange', function(){
  var hidden = document.hidden;
  // Featured strip
  document.querySelectorAll('.featured-item iframe').forEach(function(fr){
    if (!fr._fiPlayer) return;
    try {
      if (hidden) fr._fiPlayer.pause().catch(function(){});
      else if (_isInViewport(fr)) fr._fiPlayer.play().catch(function(){});
    } catch(e) {}
  });
  // Project modal
  document.querySelectorAll('#pm-videos iframe').forEach(function(fr){
    if (!fr._pvPlayer) return;
    try {
      if (hidden) fr._pvPlayer.pause().catch(function(){});
      else if (_isInViewport(fr)) fr._pvPlayer.play().catch(function(){});
    } catch(e) {}
  });
});
function _isInViewport(el){
  var r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < (window.innerHeight || document.documentElement.clientHeight);
}
let currentLang='en';
function toggleLang(){
  currentLang=currentLang==='en'?'he':'en';
  var mob=document.getElementById('mobLangToggle');
  if(mob) mob.textContent=currentLang==='en'?'עב':'EN';
  document.documentElement.dir=currentLang==='he'?'rtl':'ltr';
  document.documentElement.lang=currentLang;
  document.getElementById('langToggle').textContent=currentLang==='en'?'עב':'EN';
  document.querySelectorAll('[data-en]').forEach(el=>{
    const t=el.getAttribute('data-'+currentLang);
    if(t){if(t.includes('<em>')){el.innerHTML=t}else{el.textContent=t}}
  });
}
window.addEventListener('scroll',()=>{document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>50)});
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.fade-in,.fade-in-left,.fade-in-right,.fade-in-scale').forEach(el=>obs.observe(el));



function scrollServices(dir){
  var grid = document.querySelector('.services-grid');
  if (!grid) return;
  var card = grid.querySelector('.service-card');
  var w = card ? card.offsetWidth + 14 : 280;
  window._carouselBtnPauseUntil = Date.now() + 2500;
  grid.scrollBy({left: dir * w, behavior: 'smooth'});
}
function scrollFolders(dir){
  var carousel = document.querySelector('.folders-carousel');
  var track = document.getElementById('foldersTrack');
  if (!carousel || !track) return;
  var card = track.querySelector('.folder-card');
  var w = card ? card.offsetWidth + 20 : 300;
  window._carouselBtnPauseUntil = Date.now() + 2500;
  carousel.scrollBy({left: dir * w, behavior: 'smooth'});
}
function openMobileNav(){document.getElementById('mobileNav').classList.add('open');document.body.style.overflow='hidden';var b=document.getElementById('mobileMenuBtn');if(b)b.classList.add('is-open')}
function closeMobileNav(){document.getElementById('mobileNav').classList.remove('open');document.body.style.overflow='';var b=document.getElementById('mobileMenuBtn');if(b)b.classList.remove('is-open')}
function toggleMobileNav(){var nav=document.getElementById('mobileNav');if(nav.classList.contains('open')){closeMobileNav();}else{openMobileNav();}}
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}})});

// Follower count fetch (using public proxy-friendly approach)
// Note: Instagram & TikTok APIs require auth tokens for live counts.
// This uses a placeholder that you can connect to a serverless function.
async function fetchFollowers(){
  try{
    // Placeholder - replace with your own API endpoint that returns follower counts
    // Example: const res = await fetch('https://your-api.com/followers');
    // const data = await res.json();
    // For now, showing static placeholder:
    const igEl=document.getElementById('igCount');
    const tkEl=document.getElementById('tkCount');
    // You can set up a simple Cloudflare Worker or Vercel serverless function
    // that scrapes or uses official APIs to return counts
    // igEl.textContent = '• ' + data.instagram;
    // tkEl.textContent = '• ' + data.tiktok;
  }catch(e){}
}
fetchFollowers();

// Folder cards stagger entrance
const folderObs = new IntersectionObserver(es => {
  es.forEach((e,i) => {
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'), i * 80);
    }
  });
},{threshold:0.05});
document.querySelectorAll('.folder-card').forEach(el => folderObs.observe(el));


// Service cards staggered entrance
const svcObs = new IntersectionObserver(es => {
  es.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold: 0.1});
document.querySelectorAll('.service-card').forEach(el => svcObs.observe(el));


// Legal modals
function openLegal(id){
  document.querySelectorAll('.legal-modal-overlay').forEach(m=>m.classList.remove('open'));
  var el=document.getElementById('modal-'+id);
  if(el){el.classList.add('open');document.body.style.overflow='hidden';}
}
function closeLegal(){
  document.querySelectorAll('.legal-modal-overlay').forEach(m=>m.classList.remove('open'));
  document.body.style.overflow='';
}


// Carousel scroll
function scrollCarousel(trackId, dir){
  var track=document.getElementById(trackId);
  if(!track)return;
  var container=track.parentElement;
  if(!container)return;
  var items=track.children;
  if(!items.length)return;
  var gap=parseInt(getComputedStyle(track).gap)||20;
  var itemW=(items[0].offsetWidth||300)+gap;
  window._carouselBtnPauseUntil = Date.now() + 2500;
  container.scrollBy({left: dir * itemW, behavior: 'smooth'});
}

// Pause carousel animation when video plays
document.addEventListener('play',function(e){
  var track=e.target.closest('[id$="Track"]');
  if(track){track.dataset.paused='1';track.style.animationPlayState='paused';}
},true);
document.addEventListener('pause',function(e){
  var track=e.target.closest('[id$="Track"]');
  if(track&&track.dataset.paused){delete track.dataset.paused;track.style.animationPlayState='running';}
},true);
document.addEventListener('ended',function(e){
  var track=e.target.closest('[id$="Track"]');
  if(track){delete track.dataset.paused;track.style.animationPlayState='running';}
},true);

// ================================================================
// PROJECT MODAL + VIDEO LIGHTBOX
// ================================================================
const PROJECT_DATA = {
'podcast-short':{en:'Podcast Short',he:'פודקאסט',vids:[['1181243866','p'],['1181244361','p'],['1181237397','p'],['1181245016','p'],['1181245910','p'],['1181238149','p'],['1181246622','p'],['1181242850','p'],['1181247341','p'],['1181238978','p'],['1181239956','p'],['1181241565','p'],['1181240736','p']]},
'real-estate':{en:'Real Estate & Interior Design',he:'נדל"ן ועיצוב פנים',vids:[['1181249674','p'],['1181248011','p'],['1181253289','p'],['1181251726','p'],['1181251383','p'],['1181249987','p'],['1181256366','p'],['1181255416','p'],['1181258284','p'],['1181257746','p'],['1181257117','p'],['1181258640','p']]},
'hotels':{en:'Hotels',he:'מלונות ומקומות אירוח',vids:[['1181178222','p'],['1181181225','p'],['1181181511','p'],['1181178707','l'],['1181179779','l'],['1181181189','l']]},
'travel-short':{en:'Travel Short',he:'סרטוני טיולים',vids:[['1181282280','p'],['1181278824','p'],['1181283204','l'],['1181279455','l'],['1181282252','l'],['1181277471','l'],['1181277743','l'],['1181278067','l'],['1181278497','l'],['1181277254','l']]},
'technology':{en:'Technology',he:'טכנולוגיה',vids:[['1181259173','l']]},
'tourism-companies':{en:'Tourism & Companies',he:'תיירות וחברות',vids:[['1181261937','p'],['1181270619','p'],['1181271353','l'],['1181263657','l'],['1181269909','l']]},
'kristian-najem':{en:'Kristian Najem',he:'כריסטיאן נג\'ם',vids:[['1181212370','p'],['1181214416','p'],['1181216090','p'],['1181182439','p'],['1181183766','p'],['1181205157','p'],['1181206645','p'],['1181209657','p'],['1181211716','p']]},
'naadned':{en:'Naadned',he:'נאדנד',vids:[['1181228462','p'],['1181229662','p'],['1181231926','p'],['1181233630','p'],['1181236213','p'],['1181219025','p'],['1181222057','p'],['1181223604','p'],['1181225482','p'],['1181227058','p'],['1181217328','p']]},
'blendar':{en:'Blendar',he:'בלנד.אר',vids:[['1181129583','p'],['1181130233','p'],['1181130693','p'],['1181131121','p'],['1181131716','p'],['1181132783','p'],['1181133908','p'],['1181134696','p'],['1181135174','p'],['1181136783','p'],['1181137269','p'],['1181138086','p'],['1181138794','p']]}
};

// ── Play SVG icon ──
function makePvPlay() {
  const wrap = document.createElement('div');
  wrap.className = 'pv-play';
  wrap.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="12" cy="12" r="11" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"/>' +
    '<polygon points="10,8 17,12 10,16" fill="rgba(255,255,255,0.95)"/></svg>';
  return wrap;
}

// ── Load correct 1080x1920 portrait thumbnail from Vimeo CDN ──
// oEmbed gives us the picture hash (e.g. _1280x720.jpg).
// We replace dimensions with _1080x1920.jpg — Vimeo CDN serves this for portrait videos.
// ── Desktop: immediate iframe drain (all at once) ──
var _pvQueue = [];
var _pvActive = 0;
var _pvObserver = null;
function _pvDrainAll() {
  // Mobile queue is empty (observer handles loading). Desktop: append all now.
  while (_pvQueue.length > 0) {
    (function(job){
      if (job.div && job.div.isConnected) job.div.appendChild(job.iframe);
    })(_pvQueue.shift());
  }
}

// ── Mobile: thumbnails only — no background autoplay iframes in project modal.
// Loading even 2 background iframes while the lightbox video plays crashes Safari on iOS.
var _pvMobileObs = null;
function _loadAllMobileVideos(container) {
  if (_pvMobileObs) { _pvMobileObs.disconnect(); _pvMobileObs = null; }
  // Thumbnails are already rendered; immediately signal reveal so the loading cover lifts.
  if (window._pvTriggerReveal) window._pvTriggerReveal();
}

// ── Static thumbnail map (local files, no API needed) ──
const THUMB_STATIC = {
  '1181129583':'thumbs/1181129583.jpg','1181130233':'thumbs/1181130233.jpg','1181130693':'thumbs/1181130693.jpg',
  '1181131121':'thumbs/1181131121.jpg','1181131716':'thumbs/1181131716.jpg','1181132783':'thumbs/1181132783.jpg',
  '1181133908':'thumbs/1181133908.jpg','1181134696':'thumbs/1181134696.jpg','1181135174':'thumbs/1181135174.jpg',
  '1181136783':'thumbs/1181136783.jpg','1181137269':'thumbs/1181137269.jpg','1181138086':'thumbs/1181138086.jpg',
  '1181138794':'thumbs/1181138794.jpg',
  '1181178222':'thumbs/1181178222.jpg','1181181225':'thumbs/1181181225.jpg','1181181511':'thumbs/1181181511.jpg',
  '1181282280':'thumbs/1181282280.jpg','1181278824':'thumbs/1181278824.jpg',
  '1181261937':'thumbs/1181261937.jpg','1181270619':'thumbs/1181270619.jpg',
  '1181212370':'thumbs/1181212370.jpg','1181214416':'thumbs/1181214416.jpg','1181216090':'thumbs/1181216090.jpg',
  '1181182439':'thumbs/1181182439.jpg','1181183766':'thumbs/1181183766.jpg','1181205157':'thumbs/1181205157.jpg',
  '1181206645':'thumbs/1181206645.jpg','1181209657':'thumbs/1181209657.jpg','1181211716':'thumbs/1181211716.jpg',
  '1181228462':'thumbs/1181228462.jpg','1181229662':'thumbs/1181229662.jpg','1181231926':'thumbs/1181231926.jpg',
  '1181233630':'thumbs/1181233630.jpg','1181236213':'thumbs/1181236213.jpg','1181219025':'thumbs/1181219025.jpg',
  '1181222057':'thumbs/1181222057.jpg','1181223604':'thumbs/1181223604.jpg','1181225482':'thumbs/1181225482.jpg',
  '1181227058':'thumbs/1181227058.jpg','1181217328':'thumbs/1181217328.jpg',
  '1181243866':'thumbs/1181243866.jpg','1181244361':'thumbs/1181244361.jpg','1181237397':'thumbs/1181237397.jpg',
  '1181245016':'thumbs/1181245016.jpg','1181245910':'thumbs/1181245910.jpg','1181238149':'thumbs/1181238149.jpg',
  '1181246622':'thumbs/1181246622.jpg','1181242850':'thumbs/1181242850.jpg','1181247341':'thumbs/1181247341.jpg',
  '1181238978':'thumbs/1181238978.jpg','1181239956':'thumbs/1181239956.jpg','1181241565':'thumbs/1181241565.jpg',
  '1181240736':'thumbs/1181240736.jpg',
  '1181249674':'thumbs/1181249674.jpg','1181248011':'thumbs/1181248011.jpg','1181253289':'thumbs/1181253289.jpg',
  '1181251726':'thumbs/1181251726.jpg','1181251383':'thumbs/1181251383.jpg','1181249987':'thumbs/1181249987.jpg',
  '1181256366':'thumbs/1181256366.jpg','1181255416':'thumbs/1181255416.jpg','1181258284':'thumbs/1181258284.jpg',
  '1181257746':'thumbs/1181257746.jpg','1181257117':'thumbs/1181257117.jpg','1181258640':'thumbs/1181258640.jpg'
};

// ── Thumbnail loader ──
// Priority: static local file → vumbnail.com → oEmbed API with hash
function _loadThumb(imgEl, id, pvItem, isPortrait) {
  var hash = (typeof VID_HASHES !== 'undefined' && VID_HASHES[id]) ? VID_HASHES[id] : '';
  function done() {
    imgEl.style.opacity = '1';
    if (pvItem) pvItem.classList.add('pv-loaded', isPortrait ? 'pt-loaded' : '');
  }
  function tryOembed() {
    imgEl.onload = null; imgEl.onerror = null;
    if (!hash) { done(); return; }
    fetch('https://vimeo.com/api/oembed.json?url=' + encodeURIComponent('https://vimeo.com/' + id + '/' + hash))
      .then(function(r){ return r.ok ? r.json() : Promise.reject(); })
      .then(function(d){
        if (d && d.thumbnail_url) {
          var size = isPortrait ? '_640x1136' : '_1280x720';
          imgEl.onload = done; imgEl.onerror = done;
          imgEl.src = d.thumbnail_url.replace(/_\d+x\d+/, size);
        } else { done(); }
      })
      .catch(done);
  }
  function tryVumbnail() {
    imgEl.onload = done; imgEl.onerror = tryOembed;
    imgEl.src = 'https://vumbnail.com/' + id + '.jpg';
  }
  if (THUMB_STATIC[id]) {
    imgEl.onload = done; imgEl.onerror = tryVumbnail;
    imgEl.src = THUMB_STATIC[id];
  } else {
    tryVumbnail();
  }
}
function loadPortraitThumb(imgEl, id, pvItem)  { _loadThumb(imgEl, id, pvItem, true);  }
function loadLandscapeThumb(imgEl, id, pvItem) { _loadThumb(imgEl, id, pvItem, false); }

// ── Build one section (label + count + grid) ──
// Mobile: thumbnails from Vimeo oEmbed (first 6 items also get live iframes). Desktop: live autoplay iframes.
function buildSection(videos, label, gridClass, isPortrait, startIdx, lang) {
  if (!videos.length) return null;
  var isMobile = window.innerWidth <= 768;

  const section = document.createElement('div');
  section.className = 'pm-section';
  section.setAttribute('role', 'region');
  section.setAttribute('aria-label', label);

  // Section header
  const head = document.createElement('div');
  head.className = 'pm-sec-head';
  head.innerHTML =
    '<span class="pm-sec-label">' + label + '</span>' +
    '<span class="pm-sec-dot"></span>' +
    '<span class="pm-sec-count">' + videos.length + (lang === 'he' ? ' סרטונים' : (videos.length > 1 ? ' videos' : ' video')) + '</span>';
  section.appendChild(head);

  // Grid
  const grid = document.createElement('div');
  grid.className = gridClass;
  grid.setAttribute('role', 'list');

  videos.forEach(([id], i) => {
    const div = document.createElement('div');
    div.className = 'pv-item ' + (isPortrait ? 'portrait' : 'landscape');
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label',
      (lang === 'he' ? (isPortrait ? 'שורט אנכי' : 'סרטון אופקי') : (isPortrait ? 'Vertical short' : 'Horizontal video')) + ' ' + (startIdx + i + 1));

    if (isMobile) {
      // ── Mobile: thumbnail from Vimeo oEmbed (correct aspect). First 6 items also get live iframes on top. ──
      var _mh = (typeof VID_HASHES !== 'undefined' && VID_HASHES[id]) ? VID_HASHES[id] : '';
      div.setAttribute('data-vid', id);
      if (_mh) div.setAttribute('data-hash', _mh);
      var _tImg = document.createElement('img');
      _tImg.alt = '';
      // Explicit inline style guarantees position/size regardless of CSS specificity
      _tImg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;opacity:0;transition:opacity 0.4s;';
      div.appendChild(_tImg);
      if (isPortrait) loadPortraitThumb(_tImg, id, div);
      else loadLandscapeThumb(_tImg, id, div);
    } else {
      // ── Desktop: live autoplay iframe ──
      const _h2 = (typeof VID_HASHES !== 'undefined' && VID_HASHES[id]) ? VID_HASHES[id] : '';
      const _q2 = _h2 ? '?h=' + _h2 + '&' : '?';
      const _fr = document.createElement('iframe');
      _fr.src = 'https://player.vimeo.com/video/' + id + _q2 +
        'background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1&playsinline=1&texttrack=false';
      _fr.setAttribute('frameborder','0');
      _fr.setAttribute('allow','autoplay; fullscreen; picture-in-picture');
      _fr.setAttribute('playsinline','');
      _fr.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;' +
        'border:0;z-index:3;opacity:0;transition:opacity 0.6s ease;pointer-events:none;';
      _pvQueue.push({iframe:_fr, div:div, thumb:null});
      (function(fr, dv){
        fr.addEventListener('load', function(){
          if (typeof Vimeo !== 'undefined' && Vimeo.Player) {
            try {
              var p = new Vimeo.Player(fr);
              fr._pvPlayer = p;
              if (!window._pvPlayers) window._pvPlayers = [];
              window._pvPlayers.push(p);
              // Smart eye: count when video is ACTUALLY playing (timeupdate fired)
              var _played = false;
              p.on('timeupdate', function _onTu(){
                if (_played) return; _played = true;
                p.off('timeupdate', _onTu);
                if (typeof window._pvPlayingCount === 'number') {
                  window._pvPlayingCount++;
                  if (window._pvCheckPlaying) window._pvCheckPlaying();
                }
              });
              p.on('ended', function(){
                p.setCurrentTime(0).then(function(){ p.play().catch(function(){}); }).catch(function(){});
              });
              p.on('error', function(){ fr.style.opacity = '0'; });
              p.play().catch(function(){});
              // Pause when scrolled off-screen, resume when back in view
              if (window._pvScrollPauseObs) window._pvScrollPauseObs.observe(fr);
            } catch(e) {}
          } else {
            // Fallback if SDK didn't load — count load event as "playing"
            if (typeof window._pvPlayingCount === 'number') {
              window._pvPlayingCount++;
              if (window._pvCheckPlaying) window._pvCheckPlaying();
            }
          }
        }, {once:true});
      })(_fr, div);
    }

    // Shimmer: mobile z-index:2 so it covers thumbnail while loading, hides when pv-loaded
    const shimmer = document.createElement('div');
    shimmer.className = 'pv-shimmer';
    shimmer.style.zIndex = isMobile ? '2' : '3';
    div.appendChild(shimmer);

    // Play overlay
    div.appendChild(makePvPlay());

    // Stagger entrance animation
    div.style.animationDelay = ((startIdx + i) * 0.05) + 's';

    // Click / keyboard → lightbox
    const openLb = () => openLightbox(id, isPortrait ? '9:16' : '16:9');
    div.addEventListener('click', openLb);
    div.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(); }
    });
    // Mobile: direct touchend → lightbox (no click relay needed, instant response)
    if (isMobile) {
      var _ts = {x:0, y:0};
      div.addEventListener('touchstart', function(e){ _ts.x=e.touches[0].clientX; _ts.y=e.touches[0].clientY; }, {passive:true});
      div.addEventListener('touchend', function(e){
        if (Math.abs(e.changedTouches[0].clientX-_ts.x)>10 || Math.abs(e.changedTouches[0].clientY-_ts.y)>10) return;
        e.preventDefault();
        openLb();
      }, {passive:false});
    }

    grid.appendChild(div);
  });

  section.appendChild(grid);
  return section;
}

function openProject(key) {
  const p = PROJECT_DATA[key];
  if (!p) return;
  // Reset modal video queue, observers, and play counters
  _pvQueue = []; _pvActive = 0;
  window._pvPlayingCount = 0;
  window._pvTotalCount = 0;
  if (_pvObserver)   { _pvObserver.disconnect();   _pvObserver   = null; }
  if (_pvMobileObs)  { _pvMobileObs.disconnect();  _pvMobileObs  = null; }
  // Recreate scroll-pause observer fresh for this project
  if (window._pvScrollPauseObs) { window._pvScrollPauseObs.disconnect(); }
  if ('IntersectionObserver' in window) {
    window._pvScrollPauseObs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var fr = e.target;
        if (!fr._pvPlayer) return;
        try {
          if (e.isIntersecting) fr._pvPlayer.play().catch(function(){});
          else fr._pvPlayer.pause().catch(function(){});
        } catch(err) {}
      });
    }, {threshold: 0.1, rootMargin: '200px'});
  }
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
  const title = lang === 'he' ? p.he : p.en;

  // Header
  const titleEl = document.getElementById('pm-title');
  titleEl.textContent = title;
  titleEl.setAttribute('data-en', p.en);
  titleEl.setAttribute('data-he', p.he);

  const countEl = document.getElementById('pm-video-count');
  if (countEl) {
    countEl.textContent = p.vids.length + (lang === 'he' ? ' סרטונים' : ' Videos');
  }

  const container = document.getElementById('pm-videos');
  // Release iframes and images from previous project before clearing DOM
  container.querySelectorAll('iframe').forEach(function(fr){ try{fr.src='about:blank';}catch(e){} fr.remove(); });
  container.querySelectorAll('img').forEach(function(img){ img.src=''; });
  container.innerHTML = '';

  const landscapes = p.vids.filter(([,r]) => r !== 'p');
  const portraits  = p.vids.filter(([,r]) => r === 'p');

  const hLabel = lang === 'he' ? 'סרטונים אופקיים' : 'Horizontal Videos';
  const vLabel = lang === 'he' ? 'שורטס אנכיים'    : 'Vertical Shorts';

  const secH = buildSection(landscapes, hLabel, 'pm-grid-h', false, 0, lang);
  const secV = buildSection(portraits,  vLabel, 'pm-grid-v', true,  landscapes.length, lang);

  if (secH) container.appendChild(secH);
  if (secV) container.appendChild(secV);
  // Track total iframes that need to load before we can reveal
  window._pvTotalCount = _pvQueue.length;
  // Desktop: append all iframes now. Mobile: observer handles loading below.
  _pvDrainAll();

  // Open modal
  const overlay = document.getElementById('project-overlay');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', title + ' gallery');
  overlay.setAttribute('data-project', key);
  var lc = document.getElementById('pm-load-cover');
  var _pvIsMobileNow = window.innerWidth <= 768;
  if (lc) lc.classList.add('active');
  container.scrollTop = 0;
  overlay.classList.add('active');
  if (history.pushState) history.pushState({project: key}, '', '#' + key);

  // Instant scroll reset
  container.scrollTop = 0;

  // Mobile: pause hero iframe to free decoder slot, then start scroll observer
  if (_pvIsMobileNow) {
    var _heroFr = document.getElementById('heroShowreelIframe');
    if (_heroFr && _heroFr.src && _heroFr.src.indexOf('vimeo') !== -1) {
      _heroFr.setAttribute('data-hero-src', _heroFr.src);
      _heroFr.src = 'about:blank';
    }
    requestAnimationFrame(function(){ _loadAllMobileVideos(container); });
  }

  // Loading cover — smart eye: dismisses only when videos are actually PLAYING
  var _pvRevealDone = false;
  var _pvIsMobile = window.innerWidth <= 768;
  function _pvRevealAll() {
    if (_pvRevealDone) return; _pvRevealDone = true;
    window._pvTriggerReveal = null;
    window._pvCheckPlaying = null;
    if (lc) lc.classList.remove('active');
    // Synchronized fade-in: all videos appear together, all already playing
    container.querySelectorAll('.pv-item iframe').forEach(function(fr){ fr.style.opacity = '1'; });
    container.querySelectorAll('.pv-item').forEach(function(dv){ dv.classList.add('pv-loaded'); });
  }
  window._pvTriggerReveal = function() { _pvRevealAll(); };
  // Smart eye: reveal once the first visible row of videos are confirmed playing
  // (items below the fold load and pause via IntersectionObserver — no need to wait)
  window._pvCheckPlaying = function() {
    if (_pvRevealDone) return;
    var total = window._pvTotalCount || 0;
    if (total === 0) { _pvRevealAll(); return; }
    var playing = window._pvPlayingCount || 0;
    var threshold = Math.min(3, total); // first row visible
    if (playing >= threshold) {
      // Tiny grace so first frames are rendered before the cover fades
      setTimeout(_pvRevealAll, 200);
    }
  };
  // Hard fallback — never block longer than 8s desktop / 9s mobile
  setTimeout(function(){ if (!_pvRevealDone) _pvRevealAll(); }, _pvIsMobile ? 9000 : 8000);

  // Focus trap: move focus into modal
  setTimeout(() => {
    container.scrollTop = 0;
    const firstFocus = overlay.querySelector('[tabindex="0"]');
    if (firstFocus) firstFocus.focus({ preventScroll: true });
  }, 80);
}

function closeProject(e) {
  // Called directly (no arg) or from overlay background click
  if (e && e.target !== document.getElementById('project-overlay')) return;
  // Disconnect all observers and stop all iframes immediately
  _pvQueue = []; _pvActive = 0;
  if (_pvObserver) { _pvObserver.disconnect(); _pvObserver = null; }
  if (_pvMobileObs) { _pvMobileObs.disconnect(); _pvMobileObs = null; }
  document.querySelectorAll('#pm-videos iframe').forEach(function(fr){
    try { fr.src = 'about:blank'; } catch(e){}
    fr.remove();
  });
  if (window._pvPlayers && window._pvPlayers.length) {
    window._pvPlayers.forEach(function(p){ try { p.pause().catch(function(){}); } catch(e){} });
  }
  window._pvPlayers = [];
  window._pvTriggerReveal = null;
  window._pvCheckPlaying = null;
  window._pvPlayingCount = 0;
  window._pvTotalCount = 0;
  if (window._pvScrollPauseObs) { window._pvScrollPauseObs.disconnect(); window._pvScrollPauseObs = null; }
  // Restore hero iframe on mobile
  var _heroFr = document.getElementById('heroShowreelIframe');
  if (_heroFr && _heroFr.hasAttribute('data-hero-src')) {
    _heroFr.src = _heroFr.getAttribute('data-hero-src');
    _heroFr.removeAttribute('data-hero-src');
  }
  const overlay = document.getElementById('project-overlay');
  overlay.classList.remove('active');
  if (history.pushState) history.pushState(null, '', location.pathname + location.search);
  setTimeout(() => {
    const grid = document.getElementById('pm-videos');
    if (grid) {
      grid.querySelectorAll('img').forEach(function(img){ img.src = ''; });
      grid.innerHTML = '';
    }
  }, 380);
}

// ── Vimeo secure hash map (h= parameter for private/unlisted videos) ──
const VID_HASHES = {
  // Featured / Highlights
  '1181174677':'36c747184b','1181143425':'0eae2eeb49','1181144568':'a096820ed0','1181144982':'303ff0cd3e',
  '1181146048':'7183552c67','1181158565':'91028ede7e','1181139973':'1b18a49a53',
  '1181140262':'c13a530058','1181141663':'fbfa196fac','1181141949':'2a876e2e9e',
  '1181141110':'5a988f3abf','1181143015':'d020411f05','1181171862':'8d14096bc1',
  '1181171994':'8e760bae2e','1181176384':'fc7b949256','1181177403':'52192c5f65',
  '1181166462':'7aec599b0a','1181167335':'3b075f4738','1181167383':'63d7f17372',
  '1181168451':'dc4eb4ac9b','1181169343':'aaa71d420a','1181171690':'6458d0972b',
  '1181159897':'732e15727d','1181160293':'87ad070b5a','1181161467':'3253066100',
  // Hotels
  '1181178222':'132f0a4533','1181178707':'f429515b9a','1181179779':'55b056f3b6',
  '1181181189':'5f39a77851','1181181225':'76bfa7a974','1181181511':'405fd3ca47',
  // Travel Short
  '1181282280':'5324b2ff39','1181283204':'1ecf343664','1181278824':'431835302a',
  '1181279455':'2f6c857c1f','1181282252':'3c00d65e1f','1181277471':'2be88e05be',
  '1181277743':'33d7ff196f','1181278067':'b850ddda31','1181278497':'9c6aa83d4a',
  '1181277254':'d15fe7a927',
  // Tourism & Companies
  '1181271353':'03afe4f912','1181261937':'9e2bbe49c9','1181263657':'9980864011',
  '1181269909':'c812043855','1181270619':'89673580e3',
  // Podcast Short
  '1181243866':'cf69e3b39b','1181244361':'d12987c3db','1181237397':'cbe600993f',
  '1181245016':'b7e21c81df','1181245910':'a997376f43','1181238149':'9b70094435',
  '1181246622':'3f752000d3','1181242850':'f6a6b21dcd','1181247341':'0addbf55c1',
  '1181238978':'136c047b4f','1181239956':'58132b1fa9','1181241565':'859c47ad54',
  '1181240736':'85676f60ee',
  // Real Estate & Interior Design
  '1181249674':'7c60e24c17','1181248011':'1bc32b0a1d','1181253289':'f2cb7c914f',
  '1181251726':'065b684a0f','1181251383':'7753e87f51','1181249987':'a6abd98ba0',
  '1181256366':'9bf9958f3e','1181255416':'755defaf4b','1181258284':'b37df51a3c',
  '1181257746':'2e791d3653','1181257117':'331deb6b57','1181258640':'c5c924ccc6',
  // Technology
  '1181259173':'ecb3db2a7b',
  // Kristian Najem
  '1181212370':'29b5f6f22d','1181214416':'90d23f7cf0','1181216090':'7ff4767b8b',
  '1181182439':'20a58cf827','1181183766':'0263fa6ea3','1181205157':'004ae9d676',
  '1181206645':'d859007a19','1181209657':'f5f72ce40a','1181211716':'c753cb2f20',
  // Naadned
  '1181228462':'a7281190aa','1181229662':'ee9cf5e231','1181231926':'5df4c5f479',
  '1181233630':'8a301f3e74','1181236213':'b43360e142','1181219025':'df6948f8d6',
  '1181222057':'d72bfff7fc','1181223604':'43b0ce7390','1181225482':'b027619c83',
  '1181227058':'8e87dfeb56','1181217328':'7d9e0a99cd',
  // Blendar
  '1181129583':'a4e0378bd0','1181130233':'96b9574b82','1181130693':'da58a7da47',
  '1181131121':'e8d8564ed1','1181131716':'0c3d69d2b5','1181132783':'491d6401d9',
  '1181133908':'2c08123abe','1181134696':'ecd5df1a9f','1181135174':'306e800366',
  '1181136783':'83bda3a18f','1181137269':'25ff393e1e','1181138086':'97d38700a5',
  '1181138794':'7f123dbbf0'
};

function openLightbox(vid, ratio) {
  const lb = document.getElementById('vid-lightbox');
  const container = document.getElementById('vlb-video');
  const isPortrait = ratio === '9:16';
  const isMobile = window.matchMedia && window.matchMedia('(pointer:coarse)').matches;

  // Let CSS handle sizing — just mark portrait vs landscape
  container.style.width  = '';
  container.style.height = '';
  if (isPortrait) {
    container.classList.add('portrait-mode');
  } else {
    container.classList.remove('portrait-mode');
  }

  // Mobile: blank ALL background Vimeo iframes to free decoder/memory slots for the
  // lightbox video. Safari iOS supports only ~3 concurrent video decoders — without
  // this the lightbox video never loads and the page freezes.
  if (isMobile) {
    document.querySelectorAll('iframe').forEach(function(fr) {
      if (fr.id === 'heroShowreelIframe') return; // already handled by openProject
      var s = fr.src || '';
      if (s.indexOf('vimeo') !== -1 && s.indexOf('about:blank') === -1) {
        fr.setAttribute('data-lbsrc', s);
        fr.src = 'about:blank';
      }
    });
  }

  var _h = (typeof VID_HASHES !== 'undefined' && VID_HASHES[vid]) ? VID_HASHES[vid] : '';
  var _q = _h ? '?h=' + _h + '&' : '?';
  var _fr = document.createElement('iframe');
  _fr.src = 'https://player.vimeo.com/video/' + vid + _q +
    'autoplay=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&texttrack=false';
  _fr.setAttribute('frameborder','0');
  _fr.setAttribute('allow','autoplay; fullscreen; picture-in-picture; clipboard-write');
  _fr.setAttribute('allowfullscreen','');
  _fr.setAttribute('playsinline','');
  _fr.style.cssText = 'width:100%;height:100%;border:0;display:block;border-radius:8px;opacity:0;transition:opacity 0.4s;';

  // Show spinner while loading, fade in iframe when ready
  container.innerHTML = '';
  var _spinner = document.createElement('div');
  _spinner.className = 'vlb-spinner';
  container.appendChild(_spinner);
  container.appendChild(_fr);

  function _onReady() {
    if (_spinner.parentNode) _spinner.remove();
    _fr.style.opacity = '1';
  }
  _fr.addEventListener('load', _onReady, {once: true});
  // Hard fallback: show video after 12s even if load event never fires
  setTimeout(_onReady, 12000);

  lb.classList.add('active');

  // Vimeo API fallback: force play if autoplay was blocked
  if (typeof Vimeo !== 'undefined' && Vimeo.Player) {
    try {
      var _lbPlayer = new Vimeo.Player(_fr);
      _lbPlayer.play().catch(function(){});
    } catch(ex){}
  }
}

function closeLightbox(e) {
  if (e && e.target !== document.getElementById('vid-lightbox')) return;
  const lb = document.getElementById('vid-lightbox');
  lb.classList.remove('active');
  setTimeout(function() {
    document.getElementById('vlb-video').innerHTML = '';
    // Mobile: restore background iframes that were paused when lightbox opened
    document.querySelectorAll('iframe[data-lbsrc]').forEach(function(fr) {
      fr.src = fr.getAttribute('data-lbsrc');
      fr.removeAttribute('data-lbsrc');
    });
  }, 320);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('project-overlay');
    const lb = document.getElementById('vid-lightbox');
    if (lb && lb.classList.contains('active')) closeLightbox();
    else if (overlay && overlay.classList.contains('active')) closeProject();
    else closeLegal();
  }
});


// ================================================================
// SCROLL PROGRESS BAR
// ================================================================
window.addEventListener('scroll', () => {
  const el = document.getElementById('scrollProgress');
  if (!el) return;
  const doc = document.documentElement;
  const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
  el.style.width = Math.min(100, scrolled * 100) + '%';
});

// ================================================================
// ─── FEATURED STRIP AUTOPLAY — eager pre-load + site-loader signal ─────────────
(function(){
  // Mobile: skip autoplay iframes entirely — too many concurrent videos crash the browser.
  // Thumbnails are already rendered in the HTML; this IIFE only adds live iframes on desktop.
  if (window.matchMedia && window.matchMedia('(pointer:coarse)').matches) return;

  var _fCount = 0;
  var _fMax = 40; // allow plenty for eager + observer load (incl. duplicates)

  function _buildFiItem(item) {
    var bg = item.querySelector('.fi-bg');
    if (!bg) return;
    if (bg.querySelector('iframe') || _fCount >= _fMax) return;
    var vid = bg.dataset.vid;
    if (!vid) return;
    _fCount++;
    var hash = (typeof VID_HASHES !== 'undefined' && VID_HASHES[vid]) ? VID_HASHES[vid] : '';
    var q = hash ? '?h=' + hash + '&' : '?';
    var iframe = document.createElement('iframe');
    iframe.src = 'https://player.vimeo.com/video/' + vid + q +
      'background=1&autoplay=1&loop=1&muted=1&playsinline=1&autopause=0&dnt=1&texttrack=false';
    iframe.setAttribute('frameborder','0');
    iframe.setAttribute('allow','autoplay; fullscreen; picture-in-picture');
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;' +
      'border:0;pointer-events:none;z-index:2;opacity:0;transition:opacity 0.8s ease;';
    bg.appendChild(iframe);
    // Smart "eye" — reveal only when video is actually playing (timeupdate fires)
    iframe.addEventListener('load', function(){
      // Initialize Vimeo Player to listen for actual playback
      if (typeof Vimeo !== 'undefined' && Vimeo.Player) {
        try {
          var p = new Vimeo.Player(iframe);
          iframe._fiPlayer = p; // store ref for IntersectionObserver pause/resume
          var _played = false;
          p.on('timeupdate', function _onTu(){
            if (_played) return; _played = true;
            p.off('timeupdate', _onTu);
            // Truly playing — reveal smoothly
            iframe.style.opacity = '1';
            var thumb = bg.querySelector('.fi-thumb-img');
            if (thumb) thumb.style.opacity = '0';
            item.classList.add('fi-loaded');
            // Signal site loader that a featured video is actually playing
            if (typeof window._slFeatPlaying !== 'undefined'){
              window._slFeatPlaying++;
              if (window._slCheckReady) window._slCheckReady();
            }
          });
          p.on('error', function(){ iframe.style.opacity = '0'; });
          p.play().catch(function(){});
          // Track for off-screen pause
          if (window._featPauseObs) window._featPauseObs.observe(iframe);
        } catch(e) {}
      } else {
        // Fallback if Vimeo SDK didn't load — reveal anyway after a short delay
        setTimeout(function(){
          iframe.style.opacity = '1';
          var thumb = bg.querySelector('.fi-thumb-img');
          if (thumb) thumb.style.opacity = '0';
          item.classList.add('fi-loaded');
          if (typeof window._slFeatPlaying !== 'undefined'){
            window._slFeatPlaying++;
            if (window._slCheckReady) window._slCheckReady();
          }
        }, 600);
      }
    }, {once: true});
  }

  // IntersectionObserver: pause featured iframes when scrolled off-screen
  // (saves bandwidth + decoder slots; resumes when back in view)
  if ('IntersectionObserver' in window) {
    window._featPauseObs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var fr = e.target;
        if (!fr._fiPlayer) return;
        try {
          if (e.isIntersecting) fr._fiPlayer.play().catch(function(){});
          else fr._fiPlayer.pause().catch(function(){});
        } catch(err) {}
      });
    }, {threshold: 0.15, rootMargin: '100px'});
  }

  // Eagerly pre-load first 12 unique items (no viewport check needed)
  var allItems = Array.from(document.querySelectorAll('.featured-item[data-vid]'));
  var seenVids = {}, preCount = 0;
  allItems.forEach(function(item){
    if (preCount >= 12) return;
    var bg = item.querySelector('.fi-bg');
    var vid = bg && bg.dataset.vid;
    if (!vid || seenVids[vid]) return;
    seenVids[vid] = true;
    preCount++;
    _buildFiItem(item);
  });

  // IntersectionObserver for items beyond the pre-loaded set (when user scrolls)
  var featObs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      _buildFiItem(entry.target);
    });
  }, {threshold: 0, rootMargin: '600px'});
  allItems.forEach(function(i){ featObs.observe(i); });
})();

// ================================================================
// FEATURED SECTION SCROLL ARROWS
// ================================================================
function scrollFeatured(dir) {
  var strip = document.querySelector('.featured-strip');
  var track = document.getElementById('featuredTrack');
  if (!strip || !track) return;
  var item = (track.querySelector('.featured-item.landscape') || track.querySelector('.featured-item'));
  var w = item ? item.offsetWidth + 12 : 300;
  window._carouselBtnPauseUntil = Date.now() + 2500;
  strip.scrollBy({left: dir * w, behavior: 'smooth'});
}


// ── Fix featured portrait thumbnails: load 1080x1920 from Vimeo CDN ──
document.querySelectorAll('.featured-item.portrait[data-vid]').forEach(function(item) {
  var vid = item.dataset.vid;
  var img = item.querySelector('.fi-thumb-img');
  if (!vid || !img) return;
  var hash = (typeof VID_HASHES !== 'undefined' && VID_HASHES[vid]) ? VID_HASHES[vid] : '';
  fetch('https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F' +
    vid + (hash ? '%3Fh%3D' + hash : ''))
    .then(function(r){ return r.json(); })
    .then(function(d){
      if (!d || !d.thumbnail_url) return;
      var portraitUrl = d.thumbnail_url.replace(/_\d+x\d+(\.\w+)$/, '_1080x1920$1');
      var done = false;
      function apply(url) {
        if (done) return; done = true;
        img.src = url;
        // pt-loaded class switches CSS to object-fit:cover
        item.classList.add('pt-loaded');
      }
      var check = new Image();
      check.onload  = function() { apply(portraitUrl); };
      check.onerror = function() { apply(d.thumbnail_url); };
      check.src = portraitUrl;
    })
    .catch(function(){});
});
