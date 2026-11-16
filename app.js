(function(){
'use strict';
var D = window.SN_DATA, C = window.SN_CONTENT;
var root = document.documentElement;
var BASE = root.getAttribute('data-base') || '';
var $ = function(s, c){ return (c || document).querySelector(s); };
var $$ = function(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
var hasGsap = !!window.gsap;
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
if (hasGsap) gsap.registerPlugin(ScrollTrigger);

/* ---------- copy: taken from the live site ---------- */
var T = {
  he: {
    nAbout: 'אודות', nServices: 'שירותים', nProjects: 'פרויקטים', nHighlights: 'מועדפים', nCampaigns: 'קמפיינים', nBrands: 'מותגים', nTestimonials: 'המלצות', nContact: 'צרו קשר',
    campLabel: 'סרטוני קמפיין', campTitle: 'קמפיינים', campSub: 'לחצו על סרטון לצפייה מלאה.',
    stratLabel: 'מאסטרטגיה ללידים', stratTitle: 'אסטרטגיה שמביאה לידים', stratSub: 'שלושה עסקים, אותו תהליך: בניית אסטרטגיה, ניתוח ופילוח קהלים, תוכן ומשפך שממיר ללידים.',
    heroName: ['שרבל', 'נג׳ם'], heroSub: 'צלם מקצועי ויוצר תוכן שיווקי - יוצר ויזואלים קולנועיים שמספרים סיפור ומניעים תוצאות אמיתיות למותגים ועסקים.',
    heroBtn1: 'לפרויקטים', heroBtn2: 'בואו נדבר',
    aboutTitle: 'שרבל נג׳ם',
    about1: 'צלם מקצועי ויוצר תוכן שיווקי ומסחרי, מתמחה בהפקת וידאו ברמה גבוהה בתחומי הסושיאל, לייף סטייל, תיירות ותוכן מותגי. עם ניסיון מוכח בפרויקטים עשירים ויזואלית, כל אחד בנוי סביב מטרה אסטרטגית ברורה.',
    about2: 'כל פרויקט מתחיל מהבנה מעמיקה של המותג - הזהות שלו, קהל היעד והמטרות. מכיוון קריאייטיבי ותסריט ועד לעריכה הסופית, כל פרט מעוצב כדי להגיע לקהל הנכון ולייצר אימפקט מדיד.',
    svcLabel: 'מה אני עושה', svcTitle: 'השירותים שלי', svcSub: 'פתרונות שיווק וויזואליות מקצה לקצה, הבנויים סביב הקול והמטרות של המותג שלך.',
    svc: [['תוכן תיירות', 'סרטונים שלוכדים את האווירה והופכים צופים לאורחים.'], ['תוכן לרשתות חברתיות', 'תוכן שעוצר גלילה, בנוי להגדיל מעורבות וחשיפה.'],
          ['הפקת וידאו', 'מרילסים קצרים ועד הפקות קולנועיות מלאות - סיפור בכל קנה מידה.'], ['שיתופי פעולה', 'שותפויות אותנטיות שנראות טבעיות ומהדהדות עם הקהל שלך.'],
          ['אסטרטגיית שיווק', 'ניתוח מותג מעמיק ואסטרטגיה מותאמת אישית לתפיסת קהל היעד המדויק.']],
    featLabel: 'מומלצים', featTitle: 'סרטונים מועדפים', projLabel: 'העבודות שלי', projTitle: 'פרויקטים',
    brandsLabel: 'עבדתי עם', brandsTitle: 'מותגים שעבדתי איתם', quotesLabel: 'מה אומרים הלקוחות', quotesTitle: 'המלצות',
    contactLabel: 'בואו נדבר', contactPre: 'אני עובד עם 2 עסקים בחודש בלבד.', contactBig: 'מוכנים להפוך את החזון למציאות? בואו ניצור תוכן ש<em>עושה אימפקט</em>.',
    contactBtn: 'בואו נדבר', copy: 'העתקה', copied: 'הועתק',
    copyright: '© 2026 שרבל נג׳ם. כל הזכויות שמורות.', lAccess: 'נגישות', lPrivacy: 'מדיניות פרטיות', lTerms: 'תנאי שימוש',
    films: 'סרטים', reels: 'רילס', close: 'סגירה', prev: 'הקודם', next: 'הבא', nextProject: 'הפרויקט הבא', open: 'לפרויקט', play: 'צפייה',
    lang: 'EN', langLabel: 'Switch to English',
    cats: { food: 'אוכל ואירוח', people: 'אנשים ומותגים', business: 'עסקים', travel: 'תיירות', defense: 'ביטחון' }
  },
  en: {
    nAbout: 'About', nServices: 'Services', nProjects: 'Projects', nHighlights: 'Highlights', nCampaigns: 'Campaigns', nBrands: 'Brands', nTestimonials: 'Testimonials', nContact: 'Contact',
    campLabel: 'Campaign Videos', campTitle: 'Campaigns', campSub: 'Tap a video to watch it in full.',
    stratLabel: 'From Strategy to Leads', stratTitle: 'Strategy That Brings Leads', stratSub: 'Three businesses, one process: strategy, analysis and audience segmentation, content and a funnel that converts to leads.',
    heroName: ['Sharbel', 'Najem'], heroSub: 'Professional filmmaker and content creator - delivering cinematic visuals that tell stories and drive real results for brands.',
    heroBtn1: 'View Projects', heroBtn2: "Let's Talk",
    aboutTitle: 'Sharbel Najem',
    about1: 'A professional filmmaker and commercial content creator, focused on producing high-end video content across social media, lifestyle, tourism, and brand storytelling. With a proven track record in visually rich projects, each one built around a clear strategic objective.',
    about2: 'Every project begins with a deep understanding of the brand - its identity, audience, and goals. From creative direction and scripting to the final edit, every detail is crafted to connect with the right audience and deliver measurable impact.',
    svcLabel: 'What I Do', svcTitle: 'Services', svcSub: "End-to-end visual solutions built around your brand's voice and goals.",
    svc: [['Travel Content', 'Visuals that capture the atmosphere and turn viewers into guests.'], ['Social Media Content', 'Scroll-stopping content designed to grow engagement and reach.'],
          ['Video Production', 'From short-form reels to full cinematic productions - storytelling at every scale.'], ['Branded Collaborations', 'Authentic partnerships that feel natural and resonate with your audience.'],
          ['Marketing Strategy', 'In-depth brand analysis and tailored strategy to reach your target audience with precision.']],
    featLabel: 'Highlights', featTitle: 'Featured Videos', projLabel: 'My Work', projTitle: 'Projects',
    brandsLabel: 'Trusted By', brandsTitle: "Brands I've Worked With", quotesLabel: 'What Clients Say', quotesTitle: 'Testimonials',
    contactLabel: "Let's Talk", contactPre: 'I work with only 2 businesses a month.', contactBig: "Ready to bring your vision to life? Let's create content that <em>makes an impact</em>.",
    contactBtn: "Let's Talk", copy: 'Copy', copied: 'Copied',
    copyright: '© 2026 Sharbel Najem. All rights reserved.', lAccess: 'Accessibility', lPrivacy: 'Privacy Policy', lTerms: 'Terms of Use',
    films: 'Films', reels: 'Reels', close: 'Close', prev: 'Previous', next: 'Next', nextProject: 'Next project', open: 'Open', play: 'Play',
    lang: 'עב', langLabel: 'עברו לעברית',
    cats: { food: 'Food & Events', people: 'People & Brands', business: 'Business', travel: 'Travel', defense: 'Defense' }
  }
};
var ICONS = [
  '<path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/><circle cx="12" cy="12" r="9"/>',
  '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  '<rect x="2.5" y="6" width="13" height="12" rx="2.5"/><path d="M15.5 10.5l6-3.5v10l-6-3.5"/>',
  '<path d="M8 12l3 3 5-6"/><circle cx="12" cy="12" r="9"/>',
  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>'
];
var lang = 'he';
var L = function(){ return T[lang]; };
var nm = function(o){ return lang === 'he' ? o.he : o.en; };
var P = D.projects, F = D.featured;
var ratio = function(m){ return m.o === 'p' ? 9 / 16 : 16 / 9; };
function dur(s){ var m = Math.floor(s / 60), x = s % 60; return m + ':' + String(x).padStart(2, '0'); }
function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function store(k, v){ try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

/* ---------- media: poster first, then a light loop or a Vimeo background player ---------- */
var MEDIA = [];
var START = { '1181270619': 6 }; // previews that open on a title card start a few seconds in
// phones keep a single Vimeo background player alive at a time so scrolling stays smooth
var LIVE_IF = [], MAX_IF = matchMedia('(pointer: coarse)').matches || innerWidth < 760 ? 1 : 4;
function mediaHTML(m){ MEDIA.push(m); return '<span class="media" data-m="' + (MEDIA.length - 1) + '"><img src="' + m.poster + '" alt="" loading="lazy" decoding="async"></span>'; }
function vq(m){ return m.h ? 'h=' + m.h + '&' : ''; }
function bgURL(m){ return 'https://player.vimeo.com/video/' + m.v + '?' + vq(m) + 'background=1&autoplay=1&muted=1&loop=1&playsinline=1&autopause=0&dnt=1'; }
function fullURL(m){ return 'https://player.vimeo.com/video/' + m.v + '?' + vq(m) + 'autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=d4a853'; }
function isPhone(){ return innerWidth <= 760; }
// phones show posters only; a video plays when the viewer taps it
function live(box){
  if (!box || box._live || isPhone()) return; box._live = true;
  var m = MEDIA[+box.dataset.m], el;
  if (m.loop) {
    el = document.createElement('video'); el.muted = true; el.loop = true; el.playsInline = true; el.setAttribute('playsinline', ''); el.src = m.loop;
    el.addEventListener('playing', function(){ box._live && box.classList.add('is-live'); }, { once: true });
    box.appendChild(el); var p = el.play(); p && p.catch && p.catch(function(){});
  } else if (m.v) {
    el = document.createElement('iframe'); el.src = bgURL(m); el.allow = 'autoplay; fullscreen'; el.tabIndex = -1; el.title = '';
    box.appendChild(el);
    LIVE_IF.push(box); while (LIVE_IF.length > MAX_IF) dead(LIVE_IF.shift());
    // reveal only once Vimeo really plays; a blocked or failed embed keeps the poster
    if (window.Vimeo && Vimeo.Player) { try {
      var pl = new Vimeo.Player(el), skip = START[m.v], shown = false;
      pl.on('play', function(){
        if (shown) return; shown = true;
        var show = function(){ box._live && box.classList.add('is-live'); };
        if (skip) pl.setCurrentTime(skip).then(function(){ setTimeout(show, 250); }, show); else show();
      });
    } catch (e) {} }
  }
}
function dead(box){
  if (!box || !box._live) return; box._live = false; box.classList.remove('is-live');
  var li = LIVE_IF.indexOf(box); if (li > -1) LIVE_IF.splice(li, 1);
  var x = box.querySelector('video,iframe'); setTimeout(function(){ if (!box._live && x && x.parentNode) { if (x.pause) x.pause(); x.remove(); } }, 550);
}

/* ---------- text ---------- */
function applyText(){
  var t = L();
  $$('[data-t]').forEach(function(el){ var v = t[el.dataset.t]; if (typeof v === 'string') el.textContent = v; });
  $$('[data-th]').forEach(function(el){ el.innerHTML = t[el.dataset.th]; });
  $('#heroName').innerHTML = '<span class="mask"><span><em>' + esc(t.heroName[0]) + '</em></span></span> <span class="mask"><span>' + esc(t.heroName[1]) + '</span></span>';
  $('#aboutLead').innerHTML = t.about1.split(' ').map(function(w){ return '<span class="wd">' + esc(w) + '</span>'; }).join(' ');
  var nl = $('#navLang'); nl.textContent = t.lang; nl.setAttribute('aria-label', t.langLabel);
}

/* ---------- services ---------- */
function renderServices(){
  $('#svcGrid').innerHTML = L().svc.map(function(s, i){
    return '<article class="svc glass"><button type="button" class="svc__btn" aria-expanded="false"><span class="svc__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[i] + '</svg></span><h3>' + esc(s[0]) + '</h3>' +
      '<svg class="svc__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><p class="svc__desc">' + esc(s[1]) + '</p></article>';
  }).join('');
  $$('.svc__btn').forEach(function(b){ b.addEventListener('click', function(){
    if (!isPhone()) return;
    var c = b.parentNode, o = !c.classList.contains('is-open');
    $$('.svc.is-open').forEach(function(x){ x.classList.remove('is-open'); x.querySelector('.svc__btn').setAttribute('aria-expanded', 'false'); });
    c.classList.toggle('is-open', o); b.setAttribute('aria-expanded', String(o));
  }); });
  $$('.svc').forEach(function(c){ c.addEventListener('pointermove', function(e){ var r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); }); });
}

/* ---------- auto-advancing strips: centre the next item every few seconds, pause while touched or hovered ---------- */
var featStrip = null, deckStrip = null, projStrips = [];
function autoStrip(vp, sel, ms){
  var pause = 0, inV = false, hover = false;
  var items = function(){ return $$(sel, vp); };
  var nearest = function(){ var r = vp.getBoundingClientRect(), mid = r.left + r.width / 2, best = 0, bd = 1e9; items().forEach(function(c, i){ var cr = c.getBoundingClientRect(), d = Math.abs(cr.left + cr.width / 2 - mid); if (d < bd) { bd = d; best = i; } }); return best; };
  var go = function(i){ var list = items(); if (!list.length) return; i = (i + list.length) % list.length; var r = vp.getBoundingClientRect(), cr = list[i].getBoundingClientRect(); vp.scrollBy({ left: (cr.left + cr.width / 2) - (r.left + r.width / 2), behavior: reduce ? 'auto' : 'smooth' }); };
  var hold = function(){ pause = Date.now(); };
  var onEnter = function(){ hover = true; }, onLeave = function(){ hover = false; hold(); };
  ['pointerdown', 'touchstart', 'wheel'].forEach(function(ev){ vp.addEventListener(ev, hold, { passive: true }); });
  vp.addEventListener('mouseenter', onEnter); vp.addEventListener('mouseleave', onLeave);
  var io = new IntersectionObserver(function(es){ inV = es[0].isIntersecting; }, { threshold: .3 }); io.observe(vp);
  var t = setInterval(function(){ if (!inV || hover || reduce || document.hidden || Date.now() - pause < 6000) return; go(nearest() + 1); }, ms);
  return { step: function(d){ hold(); go(nearest() + d); }, stop: function(){ clearInterval(t); io.disconnect(); ['pointerdown', 'touchstart', 'wheel'].forEach(function(ev){ vp.removeEventListener(ev, hold); }); vp.removeEventListener('mouseenter', onEnter); vp.removeEventListener('mouseleave', onLeave); } };
}

/* ---------- featured strip: advances by itself, the centred one plays (desktop) ---------- */
var featActive = -1, featIn = false;
function renderFeatured(){
  $('#featTrack').innerHTML = F.map(function(m, i){
    var p = P.filter(function(x){ return x.id === m.pid; })[0];
    return '<button type="button" class="frame frame--' + m.o + '" data-i="' + i + '" data-cursor="play"><span class="frame__media">' + mediaHTML(m) + '</span>' +
      '<span class="frame__cap"><span>' + esc(nm(p)) + '</span><span class="mono ltr">' + dur(m.d) + '</span></span></button>';
  }).join('');
  $$('.frame').forEach(function(b){ b.addEventListener('click', function(e){ if (dragMoved) { e.preventDefault(); return; } var i = +b.dataset.i; openLightbox(F.map(function(m){ var p = P.filter(function(x){ return x.id === m.pid; })[0]; return { m: m, title: nm(p) }; }), i); }); });
  featActive = -1; pickFeatured();
  if (featStrip) featStrip.stop();
  featStrip = autoStrip($('#featVp'), '.frame', 4000);
}
function pickFeatured(){
  var frames = $$('.frame'); if (!frames.length) return;
  var mid = innerWidth / 2, best = 0, bd = 1e9;
  frames.forEach(function(f, i){ var r = f.getBoundingClientRect(); var d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = i; } });
  if (!featIn) best = -1;
  if (best === featActive) return;
  if (featActive > -1 && frames[featActive]) { frames[featActive].classList.remove('is-active'); dead(frames[featActive].querySelector('.media')); }
  featActive = best;
  if (best > -1) { frames[best].classList.add('is-active'); live(frames[best].querySelector('.media')); }
}
var dragMoved = false;
(function(){
  var vp = $('#featVp'), down = false, sx = 0, sl = 0;
  vp.addEventListener('scroll', pickFeatured, { passive: true });
  vp.addEventListener('pointerdown', function(e){ if (e.pointerType !== 'mouse') return; down = true; dragMoved = false; sx = e.clientX; sl = vp.scrollLeft; vp.classList.add('is-drag'); });
  addEventListener('pointermove', function(e){ if (!down) return; var dx = e.clientX - sx; if (Math.abs(dx) > 6) dragMoved = true; vp.scrollLeft = sl - dx; });
  addEventListener('pointerup', function(){ if (!down) return; down = false; vp.classList.remove('is-drag'); setTimeout(function(){ dragMoved = false; }, 60); });
  $('#featPrev').addEventListener('click', function(){ featStrip && featStrip.step(-1); });
  $('#featNext').addEventListener('click', function(){ featStrip && featStrip.step(1); });
  new IntersectionObserver(function(es){ featIn = es[0].isIntersecting; pickFeatured(); }, { threshold: .35 }).observe(vp);
})();

/* ---------- projects: symmetric 9:16 cards, moving while on screen ---------- */
var cardIO = null;
function renderProjects(){
  var t = L();
  var card = function(p){
    var i = P.indexOf(p);
    return '<button type="button" class="card" data-i="' + i + '" data-cursor="open">' + mediaHTML(p.cover) + '<span class="card__shade"></span>' +
      '<span class="card__tag glass">' + esc(t.cats[p.cat]) + '</span>' +
      '<span class="card__body"><span class="card__title">' + esc(nm(p)) + '</span><span class="card__sub">' + esc(lang === 'he' ? p.subHe : p.subEn) + '</span><span class="card__open glass">' + esc(t.open) + '</span></span></button>';
  };
  $('#projMain').innerHTML = P.filter(function(p){ return p.group !== 'strategy'; }).map(card).join('');
  $('#projStrat').innerHTML = P.filter(function(p){ return p.group === 'strategy'; }).map(card).join('');
  projStrips.forEach(function(s){ s.stop(); }); projStrips = [];
  if (isPhone()) { projStrips.push(autoStrip($('#projMain'), '.card', 3800)); projStrips.push(autoStrip($('#projStrat'), '.card', 4300)); }
  if (cardIO) cardIO.disconnect();
  cardIO = new IntersectionObserver(function(es){ es.forEach(function(e){ var b = e.target.querySelector('.media'); if (e.isIntersecting) live(b); else dead(b); }); }, { threshold: .3 });
  $$('.card').forEach(function(c){ cardIO.observe(c); c.addEventListener('click', function(){ openTheater(+c.dataset.i, c); }); });
}

/* ---------- brands + testimonials ---------- */
function renderBrands(){
  var half = Math.ceil(C.logos.length / 2), rows = [C.logos.slice(0, half), C.logos.slice(half)];
  $('#brandRows').innerHTML = rows.map(function(r, k){
    var items = r.map(function(src){ return '<span class="logo-item"><img src="' + BASE + src + '" alt="" loading="lazy"></span>'; }).join('');
    return '<div class="marquee' + (k ? ' rev' : '') + '" dir="ltr"><div class="marquee__row" style="--dur:' + (55 + k * 10) + 's">' + items + items + '</div></div>';
  }).join('');
}
/* testimonials: a slow ribbon like the logos; each card is sized to its text so none ends in empty space */
function renderQuotes(){
  var d = lang === 'he' ? 'rtl' : 'ltr', ph = isPhone();
  var cards = C.quotes.map(function(q){
    var txt = lang === 'he' ? q.he : q.en;
    var w = Math.round(Math.min(ph ? 300 : 440, Math.max(ph ? 210 : 270, (ph ? 120 : 160) + txt.length * (ph ? .55 : .75))));
    return '<figure class="quote glass" dir="' + d + '" style="width:' + w + 'px"><span class="quote__stars" aria-hidden="true">★★★★★</span><p>' + esc(txt) + '</p><figcaption class="quote__who">' + esc(lang === 'he' ? q.whoHe : q.whoEn) + '</figcaption></figure>';
  }).join('');
  $('#quoteRows').innerHTML = '<div class="marquee" dir="ltr" id="qMarq"><div class="marquee__row">' + cards + cards + '</div></div>';
  var mq = $('#qMarq'), row = mq.firstChild, resume;
  requestAnimationFrame(function(){ row.style.setProperty('--dur', Math.round(row.scrollWidth / 2 / (ph ? 20 : 28)) + 's'); });
  mq.addEventListener('touchstart', function(){ mq.classList.add('is-paused'); clearTimeout(resume); resume = setTimeout(function(){ mq.classList.remove('is-paused'); }, 4000); }, { passive: true });
}
function renderDream(){
  $$('.dw').forEach(function(w){ w.innerHTML = '<span class="dw__n">' + w.dataset.n + '</span><span class="dw__w">' + w.dataset.w + '</span>'; });
}

/* ---------- campaigns: a live fan. The front card plays; picking another turns the fan to it; it also turns by itself ---------- */
var CAMP = null, deckT = 0, deckSel = 0, deckIn = false, deckHover = false;
function renderDeck(){
  CAMP = P.filter(function(p){ return p.id === 'campaigns'; })[0];
  var sec = $('#campaigns'); sec.hidden = !CAMP; if (!CAMP) return;
  $('#deck').innerHTML = CAMP.items.map(function(m, i){
    return '<button type="button" class="dcard" data-i="' + i + '" data-cursor="play"><span class="dcard__in">' + mediaHTML(m) + '<span class="dcard__cap">' + esc(nm(m)) + '</span></span></button>';
  }).join('');
  deckSel = Math.floor(CAMP.items.length / 2);
  $$('.dcard').forEach(function(b){
    var i = +b.dataset.i;
    b.addEventListener('click', function(){
      if (isPhone() || i === deckSel) { dead(b.querySelector('.media')); openLightbox(CAMP.items.map(function(m){ return { m: m, title: nm(m), sub: nm(CAMP) }; }), i); return; }
      selectDeck(i);
    });
  });
  if (deckStrip) { deckStrip.stop(); deckStrip = null; }
  if (isPhone()) deckStrip = autoStrip($('#deck'), '.dcard', 3600);
  if (reduce) deckT = 1;
  layoutDeck(deckT, true); playDeck();
}
function playDeck(){
  $$('.dcard').forEach(function(c, i){ var box = c.querySelector('.media'); c.classList.toggle('is-sel', i === deckSel); if (i === deckSel && deckIn) live(box); else dead(box); });
}
function selectDeck(i){ if (!CAMP) return; var n = CAMP.items.length; deckSel = (i + n) % n; layoutDeck(deckT); playDeck(); }
function layoutDeck(t, instant){
  deckT = t; if (!hasGsap || isPhone()) return;
  var cards = $$('.dcard'), w = cards[0] ? cards[0].offsetWidth : 200, dir = lang === 'he' ? -1 : 1, spread = w * .74;
  cards.forEach(function(c, i){
    var k = i - deckSel, a = Math.abs(k);
    gsap.to(c, { x: dir * k * spread * t, y: (a * a * 9 + (a ? 22 : 0)) * t + (1 - t) * 40, rotation: dir * k * 5.5 * t, scale: k === 0 ? 1 + .1 * t : .9,
      zIndex: 100 - a * 2, duration: instant ? 0 : .75, ease: 'expo.out', overwrite: 'auto' });
  });
}
(function(){
  var deck = $('#deck');
  deck.addEventListener('mouseenter', function(){ deckHover = true; }); deck.addEventListener('mouseleave', function(){ deckHover = false; });
  new IntersectionObserver(function(es){ deckIn = es[0].isIntersecting; playDeck(); }, { threshold: .35 }).observe(deck);
  setInterval(function(){ if (!CAMP || !deckIn || deckHover || reduce || isPhone() || document.hidden) return; selectDeck(deckSel + 1); }, 3800);
  $('#deckPrev').addEventListener('click', function(){ if (isPhone()) deckStrip && deckStrip.step(-1); else selectDeck(deckSel - 1); });
  $('#deckNext').addEventListener('click', function(){ if (isPhone()) deckStrip && deckStrip.step(1); else selectDeck(deckSel + 1); });
})();

/* ---------- section dividers ---------- */
var RULES = [['services', 'nServices'], ['highlights', 'nHighlights'], ['campaigns', 'nCampaigns'], ['projects', 'nProjects'], ['brands', 'nBrands'], ['testimonials', 'nTestimonials'], ['contact', 'nContact']];
function renderRules(){
  $$('.rule').forEach(function(r){ r.remove(); });
  var n = 1;
  RULES.forEach(function(r){
    var s = document.getElementById(r[0]); if (!s || s.hidden) return; n++;
    var d = document.createElement('div'); d.className = 'rule wrap'; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<span class="rule__num mono ltr">' + String(n).padStart(2, '0') + '</span><span class="rule__line"><i></i></span><span class="rule__name">' + esc(L()[r[1]]) + '</span>';
    s.parentNode.insertBefore(d, s);
  });
}

/* ---------- theater (project) ---------- */
var thIndex = -1, opener = null, hoverT = null;
function clipHTML(m){
  return '<button type="button" class="clip" data-cursor="play" style="--ar:' + (m.o === 'p' ? '9 / 16' : '16 / 9') + '"><span class="clip__media">' + mediaHTML(m) +
    '<span class="clip__dur mono ltr">' + dur(m.d) + '</span></span><span class="clip__title">' + esc(nm(m)) + '</span></button>';
}
function fillTheater(i){
  var p = P[i], t = L(); thIndex = i;
  var films = p.items.filter(function(x){ return x.o === 'l'; }), reels = p.items.filter(function(x){ return x.o === 'p'; }), list = films.concat(reels);
  $('#thTag').textContent = t.cats[p.cat]; $('#thTitle').textContent = nm(p); $('#thSub').textContent = lang === 'he' ? p.subHe : p.subEn;
  $('#thFilms').innerHTML = films.map(clipHTML).join(''); $('#thReels').innerHTML = reels.map(clipHTML).join('');
  $('#thFilmsWrap').hidden = !films.length; $('#thReelsWrap').hidden = !reels.length;
  $$('#theater .clip').forEach(function(b, k){
    var box = b.querySelector('.media');
    b.addEventListener('mouseenter', function(){ clearTimeout(hoverT); hoverT = setTimeout(function(){ live(box); }, 220); });
    b.addEventListener('mouseleave', function(){ clearTimeout(hoverT); dead(box); });
    b.addEventListener('click', function(){ dead(box); openLightbox(list.map(function(m){ return { m: m, title: nm(m), sub: nm(p) }; }), k); });
  });
  $('#thNextName').textContent = nm(P[(i + 1) % P.length]);
  $('#thScroll').scrollTop = 0;
}
function openTheater(i, from){
  opener = from || null; fillTheater(i);
  var th = $('#theater'); th.hidden = false; lenis && lenis.stop(); root.classList.add('is-locked');
  if (hasGsap && !reduce) {
    var r = from ? from.getBoundingClientRect() : { top: innerHeight / 2, bottom: innerHeight / 2, left: 0, right: innerWidth };
    gsap.fromTo(th, { clipPath: 'inset(' + Math.max(0, r.top) + 'px ' + Math.max(0, innerWidth - r.right) + 'px ' + Math.max(0, innerHeight - r.bottom) + 'px ' + Math.max(0, r.left) + 'px round 24px)' },
      { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: .9, ease: 'expo.inOut' });
    gsap.from($$('.theater__head > *, #theater .shelf'), { y: 50, opacity: 0, duration: .9, ease: 'expo.out', stagger: .08, delay: .4 });
  }
  $('#thClose').focus({ preventScroll: true });
}
function closeTheater(){
  var th = $('#theater');
  $$('#theater .media').forEach(dead);
  var done = function(){ th.hidden = true; th.style.clipPath = ''; root.classList.remove('is-locked'); lenis && lenis.start(); opener && opener.focus({ preventScroll: true }); };
  if (hasGsap && !reduce) gsap.to(th, { clipPath: 'inset(50% 0% 50% 0% round 0px)', duration: .6, ease: 'expo.inOut', onComplete: done }); else done();
}
$('#thClose').addEventListener('click', closeTheater);
$('#thNext').addEventListener('click', function(){
  var n = (thIndex + 1) % P.length; $$('#theater .media').forEach(dead);
  if (hasGsap && !reduce) gsap.to('#thScroll', { opacity: 0, duration: .3, onComplete: function(){ fillTheater(n); gsap.to('#thScroll', { opacity: 1, duration: .5 }); } });
  else fillTheater(n);
});

/* ---------- lightbox: the full film at its own ratio, never cropped ---------- */
var lbList = [], lbI = 0;
function sizeBox(){
  var it = lbList[lbI]; if (!it) return; var r = ratio(it.m), st = $('#lbStage');
  var w = Math.min(st.clientWidth * .92, st.clientHeight * .9 * r);
  $('#lbBox').style.width = w + 'px'; $('#lbBox').style.height = (w / r) + 'px';
}
function showLb(){
  var it = lbList[lbI], m = it.m, box = $('#lbBox');
  $('#lbBg').src = m.poster; box.innerHTML = '';
  if (m.v) { var f = document.createElement('iframe'); f.src = fullURL(m); f.allow = 'autoplay; fullscreen; picture-in-picture'; f.allowFullscreen = true; f.title = it.title; box.appendChild(f); }
  else { var v = document.createElement('video'); v.src = m.loop; v.controls = true; v.autoplay = true; v.loop = true; v.playsInline = true; v.poster = m.poster; box.appendChild(v); }
  $('#lbName').textContent = it.title;
  $('#lbInfo').innerHTML = (it.sub ? esc(it.sub) + ' · ' : '') + '<span class="ltr mono">' + dur(m.d) + ' · ' + (lbI + 1) + ' / ' + lbList.length + '</span>';
  sizeBox();
  if (hasGsap && !reduce) gsap.fromTo(box, { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .45, ease: 'expo.out' });
}
function openLightbox(list, i){ lbList = list; lbI = i; $('#lb').hidden = false; lenis && lenis.stop(); showLb(); $('#lbClose').focus({ preventScroll: true }); }
function closeLb(){ $('#lbBox').innerHTML = ''; $('#lb').hidden = true; if ($('#theater').hidden) lenis && lenis.start(); }
function stepLb(d){ lbI = (lbI + d + lbList.length) % lbList.length; showLb(); }
$('#lbClose').addEventListener('click', closeLb);
$('#lbPrev').addEventListener('click', function(){ stepLb(-1); });
$('#lbNext').addEventListener('click', function(){ stepLb(1); });
addEventListener('resize', function(){ if (!$('#lb').hidden) sizeBox(); });
document.addEventListener('keydown', function(e){
  if (!$('#lb').hidden) {
    if (e.key === 'Escape') closeLb();
    if (e.key === (lang === 'he' ? 'ArrowLeft' : 'ArrowRight')) stepLb(1);
    if (e.key === (lang === 'he' ? 'ArrowRight' : 'ArrowLeft')) stepLb(-1);
    return;
  }
  if (e.key === 'Escape') { if (!$('#theater').hidden) closeTheater(); closeLegal(); }
});

/* ---------- legal modals (markup copied from the live site) ---------- */
window.openLegal = function(id){ var m = document.getElementById('modal-' + id); if (m) { m.classList.add('open'); lenis && lenis.stop(); } };
window.closeLegal = function(){ var open = $$('.legal-modal-overlay.open'); open.forEach(function(m){ m.classList.remove('open'); }); if (open.length && $('#theater').hidden) lenis && lenis.start(); };
var closeLegal = window.closeLegal;
$$('[data-legal]').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); openLegal(a.dataset.legal); }); });

/* ---------- language ---------- */
function setLang(l){
  lang = l; root.lang = l; root.dir = l === 'he' ? 'rtl' : 'ltr'; store('sn-lang', l);
  MEDIA = []; applyText(); renderServices(); renderFeatured(); renderDeck(); renderProjects(); renderQuotes(); renderRules();
  if (!$('#theater').hidden && thIndex > -1) fillTheater(thIndex);
}
$('#navLang').addEventListener('click', function(){
  var to = lang === 'he' ? 'en' : 'he';
  var run = function(){ setLang(to); setupScenes(); ScrollTrigger.refresh(); };
  if (hasGsap && !reduce) gsap.to('main', { opacity: 0, duration: .3, onComplete: function(){ run(); gsap.to('main', { opacity: 1, duration: .6 }); } });
  else { setLang(to); }
});

/* ---------- nav ---------- */
var sheet = $('#sheet'), menuBtn = $('#navMenu');
menuBtn.addEventListener('click', function(){ var o = !sheet.classList.contains('is-open'); sheet.classList.toggle('is-open', o); menuBtn.setAttribute('aria-expanded', String(o)); });
$$('[data-go]').forEach(function(a){ a.addEventListener('click', function(e){
  var t = $(a.dataset.go); if (!t) return; e.preventDefault(); sheet.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false');
  if (lenis) lenis.scrollTo(t, { duration: 1.4, offset: a.dataset.go === '#top' ? 0 : -70 }); else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
}); });

/* ---------- scroll scenes ---------- */
var scenes = [];
function setupScenes(){
  scenes.forEach(function(s){ s.scrollTrigger && s.scrollTrigger.kill(); s.kill(); }); scenes = [];
  if (!hasGsap || reduce) { root.classList.add('no-anim'); return; }
  var add = function(tw){ scenes.push(tw); return tw; };
  add(gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } })
    .to('#heroScreen', { scale: .9, borderRadius: 32, ease: 'none' }, 0).to('.hero__copy', { yPercent: -20, opacity: 0, ease: 'none' }, 0));
  if (!isPhone()) {
    add(gsap.fromTo('#aboutPhoto img', { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: true } }));
    add(gsap.from('#aboutPhoto', { clipPath: 'inset(18% 18% 18% 18% round 28px)', ease: 'none', scrollTrigger: { trigger: '#about', start: 'top 85%', end: 'top 35%', scrub: true } }));
  }
  add(gsap.to('#aboutLead .wd', { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: '#aboutLead', start: 'top 82%', end: 'bottom 50%', scrub: true } }));
  $$('.sec__head, #about .h2').forEach(function(h){ add(gsap.from(h.querySelectorAll('.label, .h2, .sec__sub, .feat__ctrls').length ? h.querySelectorAll('.label, .h2, .sec__sub, .feat__ctrls') : h, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: h, start: 'top 88%', once: true } })); });
  add(gsap.from('.svc', { y: 70, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: '#svcGrid', start: 'top 85%', once: true } }));
  add(gsap.fromTo('#featTrack', { scale: .94 }, { scale: 1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '#highlights', start: 'top bottom', end: 'center center', scrub: .6 } }));
  if (!isPhone()) ['#projMain', '#projStrat'].forEach(function(g){ add(gsap.from(g + ' .card', { y: 90, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: .07, scrollTrigger: { trigger: g, start: 'top 88%', once: true } })); });
  add(gsap.from('.contact__big', { scale: .9, opacity: 0, ease: 'none', scrollTrigger: { trigger: '#contact', start: 'top 85%', end: 'top 35%', scrub: true } }));
  // the weight of each word climbs as it scrolls in: Dream stays thin, Create lands medium, Share lands heavy
  add(gsap.from('.dw__w', { fontWeight: 200, ease: 'none', stagger: .2, scrollTrigger: { trigger: '.dream', start: 'top 88%', end: 'center 50%', scrub: true } }));
  add(gsap.from('.dw__n', { opacity: 0, y: 8, duration: .8, ease: 'expo.out', stagger: .12, scrollTrigger: { trigger: '.dream', start: 'top 80%', once: true } }));
  if (CAMP && !isPhone()) {
    var proxy = { t: 0 };
    add(gsap.to(proxy, { t: 1, ease: 'power2.out', onUpdate: function(){ layoutDeck(proxy.t, true); }, scrollTrigger: { trigger: '#campaigns', start: 'top 80%', end: 'center 55%', scrub: .5 } }));
  }
  $$('.rule').forEach(function(r){
    var line = r.querySelector('.rule__line'), glint = r.querySelector('i');
    add(gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: r, start: 'top 95%', end: 'top 60%', scrub: true } }));
    add(gsap.fromTo(glint, { '--p': '-12%' }, { '--p': '100%', ease: 'none', scrollTrigger: { trigger: r, start: 'top bottom', end: 'top 20%', scrub: true } }));
    add(gsap.from(r.querySelectorAll('.rule__num, .rule__name'), { opacity: 0, y: 10, duration: .8, ease: 'expo.out', scrollTrigger: { trigger: r, start: 'top 92%', once: true } }));
  });
}

/* ---------- smooth scroll ---------- */
var lenis = null;
if (hasGsap && window.Lenis && !reduce) {
  lenis = new Lenis({ lerp: .1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function(time){ lenis.raf(time * 1000); }); gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

/* ---------- copy, magnet, cursor ---------- */
if (fine && hasGsap && !reduce) {
  var mg = $('#magnet'), mx = gsap.quickTo(mg, 'x', { duration: .5, ease: 'power3' }), my = gsap.quickTo(mg, 'y', { duration: .5, ease: 'power3' });
  mg.addEventListener('mousemove', function(e){ var r = mg.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * .35); my((e.clientY - r.top - r.height / 2) * .45); });
  mg.addEventListener('mouseleave', function(){ mx(0); my(0); });
  root.classList.add('has-cursor');
  var cur = $('#cursor'), cx = gsap.quickTo(cur, 'x', { duration: .18, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: .18, ease: 'power3' });
  addEventListener('mousemove', function(e){ cx(e.clientX); cy(e.clientY); }, { passive: true });
  document.addEventListener('mouseover', function(e){
    var m = e.target.closest('[data-cursor]'), a = e.target.closest('a,button');
    cur.classList.toggle('is-media', !!m); cur.classList.toggle('is-link', !m && !!a);
    cur.querySelector('span').textContent = m ? (m.dataset.cursor === 'open' ? L().open : L().play) : '';
  });
}

/* ---------- gate: counter, frame 9:16 -> 16:9, the showreel inside, then choose a language ---------- */
var reel = $('#reel'), rf = $('#reelFrame'), frame = $('#gateFrame'), gate = $('#gate');
var REEL = 'https://player.vimeo.com/video/1182382291?h=4d10b0f514&background=1&autoplay=1&muted=1&loop=1&playsinline=1&autopause=0&dnt=1';
function coverReel(){ var w = reel.clientWidth, h = reel.clientHeight, R = 16 / 9; rf.style.width = Math.max(w, h * R) + 'px'; rf.style.height = Math.max(h, w / R) + 'px'; }
function syncReel(){ var r = frame.getBoundingClientRect(); reel.style.left = r.left + 'px'; reel.style.top = r.top + 'px'; reel.style.width = r.width + 'px'; reel.style.height = r.height + 'px'; reel.style.borderRadius = getComputedStyle(frame).borderRadius; coverReel(); }
addEventListener('resize', function(){ if (reel.classList.contains('is-gate')) syncReel(); else coverReel(); });
function enterSite(){
  reel.classList.remove('is-gate'); ['left', 'top', 'width', 'height', 'borderRadius', 'opacity'].forEach(function(k){ reel.style[k] = ''; });
  coverReel(); gate.remove(); $('#gateBg').remove(); root.classList.remove('is-locked'); lenis && lenis.start();
  $('#nav').classList.add('is-on');
  setupScenes(); hasGsap && ScrollTrigger.refresh();
  if (hasGsap && !reduce) gsap.timeline().from('#heroName .mask > span', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .1 }).from('.hero__row > *', { y: 26, opacity: 0, duration: .9, ease: 'expo.out', stagger: .08 }, '-=.8');
}
function startGate(){
  var langs = $('#gateLangs'), count = $('#gateCount'), btns = $$('.gate__lang');
  var last = store('sn-lang'); var pre = btns.filter(function(b){ return b.dataset.lang === last; })[0];
  var arm = function(){ langs.classList.add('is-on'); btns.forEach(function(b){ b.disabled = false; }); };
  var endW = Math.min(640, innerWidth * (innerWidth < 700 ? .86 : .56));
  rf.src = REEL;
  var ready = new Promise(function(res){
    if (window.Vimeo && Vimeo.Player) { try { new Vimeo.Player(rf).on('play', function(){ res(); }); } catch (e) {} }
    else rf.addEventListener('load', function(){ setTimeout(res, 900); }, { once: true });
    setTimeout(res, 5000);
  });
  if (!hasGsap || reduce) {
    frame.style.width = endW + 'px'; frame.style.height = endW * 9 / 16 + 'px'; syncReel(); reel.style.opacity = 1;
    ['#gateLogo', '#gatePrompt', '#gateLangs'].forEach(function(s){ $(s).style.opacity = 1; }); count.textContent = '100'; $('#gateRatio').textContent = '16:9'; arm();
  } else {
    var c = { v: 0 }, upd = function(){ count.textContent = String(Math.round(c.v)).padStart(3, '0'); };
    var tl = gsap.timeline({ onUpdate: syncReel });
    tl.to('#gateLogo', { opacity: 1, duration: .6 })
      .from(frame, { opacity: 0, scale: .9, duration: .6, ease: 'expo.out' }, '<')
      .to(c, { v: 62, duration: 1.3, ease: 'power2.inOut', onUpdate: upd })
      .to(frame, { width: endW, height: endW * 9 / 16, duration: .9, ease: 'expo.inOut', onStart: function(){ $('#gateRatio').textContent = '16:9'; } }, '-=.5');
    ready.then(function(){
      gsap.timeline({ delay: Math.max(0, tl.duration() - tl.time()), onUpdate: syncReel })
        .to(c, { v: 100, duration: .7, ease: 'power2.out', onUpdate: upd })
        .to(reel, { opacity: 1, duration: .9 }, '-=.4')
        .to(['#gatePrompt', langs], { opacity: 1, duration: .6, stagger: .1, onComplete: arm }, '-=.4');
    });
  }
  btns.forEach(function(b){ b.addEventListener('click', function(){
    langs.classList.remove('is-on'); btns.forEach(function(x){ x.disabled = true; });
    setLang(b.dataset.lang);
    if (!hasGsap || reduce) { enterSite(); return; }
    var r = frame.getBoundingClientRect();
    gsap.set(frame, { position: 'fixed', left: r.left, top: r.top, width: r.width, height: r.height, margin: 0 });
    gsap.timeline({ onComplete: enterSite, onUpdate: syncReel })
      .to([langs, '#gatePrompt', '.gate__meta', '#gateLogo', '#gateRatio', '.gate__corner'], { opacity: 0, duration: .3 }, 0)
      .to(frame, { left: 0, top: 0, width: innerWidth, height: innerHeight, borderRadius: 0, borderColor: 'rgba(255,255,255,0)', duration: 1.05, ease: 'expo.inOut' }, .12);
  }); });
}

/* ---------- boot ---------- */
setLang(store('sn-lang') || 'he');
renderBrands();
renderDream();
syncReel();
startGate();
var rt; addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){ hasGsap && ScrollTrigger.refresh(); pickFeatured(); }, 250); });
})();
