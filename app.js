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
    contactLabel: 'בואו נדבר', contactPre: 'אני עובד עם 2 עסקים בחודש בלבד.', contactQ: 'מוכנים להפוך את החזון למציאות?', contactA: 'בואו ניצור תוכן ש<em>עושה אימפקט</em>.',
    contactBtn: 'בואו נדבר', copy: 'העתקה', copied: 'הועתק',
    copyright: '© 2026 שרבל נג׳ם. כל הזכויות שמורות.', lAccess: 'נגישות', lPrivacy: 'מדיניות פרטיות', lTerms: 'תנאי שימוש',
    films: 'סרטים', reels: 'רילס', close: 'סגירה', prev: 'הקודם', next: 'הבא', upNext: 'הבא בתור', nextIn: 'הבא בעוד', playNow: 'נגן עכשיו', cancel: 'ביטול', nextProject: 'הפרויקט הבא', open: 'לפרויקט', play: 'צפייה',
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
    contactLabel: "Let's Talk", contactPre: 'I work with only 2 businesses a month.', contactQ: 'Ready to bring your vision to life?', contactA: "Let's create content that <em>makes an impact</em>.",
    contactBtn: "Let's Talk", copy: 'Copy', copied: 'Copied',
    copyright: '© 2026 Sharbel Najem. All rights reserved.', lAccess: 'Accessibility', lPrivacy: 'Privacy Policy', lTerms: 'Terms of Use',
    films: 'Films', reels: 'Reels', close: 'Close', prev: 'Previous', next: 'Next', upNext: 'Up next', nextIn: 'Next in', playNow: 'Play now', cancel: 'Cancel', nextProject: 'Next project', open: 'Open', play: 'Play',
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
var LIVE_IF = [], MAX_IF = matchMedia('(pointer: coarse)').matches || innerWidth < 760 ? 1 : 5;
// מה מנגן עכשיו: העמוד (main), עמוד פרויקט פתוח (theater) או צפייה מלאה (lb). נגני רקע רק בשכבה שלמעלה
var stage = 'main', lbFrom = 'main';
function mediaHTML(m){ MEDIA.push(m); return '<span class="media" data-m="' + (MEDIA.length - 1) + '"><img src="' + m.poster + '" alt="" loading="lazy" decoding="async"></span>'; }
function vq(m){ return m.h ? 'h=' + m.h + '&' : ''; }
// תצוגות מקדימות ב-540p: מספיק לגודל האריחים, ובאיכות אוטומטית סרטונים כבדים לא מתחילים כשכמה נטענים יחד
function bgURL(m){ return 'https://player.vimeo.com/video/' + m.v + '?' + vq(m) + 'background=1&autoplay=1&muted=1&loop=1&playsinline=1&autopause=0&dnt=1&quality=540p'; }
function fullURL(m){ return 'https://player.vimeo.com/video/' + m.v + '?' + vq(m) + 'autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=d4a853'; }
function isPhone(){ return innerWidth <= 760; }
// phones show posters only; a video plays when the viewer taps it
function live(box){
  if (!box || box._live || isPhone()) return;
  if (stage === 'lb' || (stage === 'theater') !== !!box.closest('#theater')) return;
  box._live = true;
  var m = MEDIA[+box.dataset.m], el;
  if (m.loop) {
    el = document.createElement('video'); el.muted = true; el.loop = true; el.playsInline = true; el.setAttribute('playsinline', ''); el.src = m.loop;
    el.addEventListener('playing', function(){ box._live && box.classList.add('is-live'); }, { once: true });
    box.appendChild(el); var p = el.play(); p && p.catch && p.catch(function(){});
  } else if (m.v) {
    el = document.createElement('iframe'); el.src = bgURL(m); el.allow = 'autoplay; fullscreen'; el.tabIndex = -1; el.title = '';
    box.appendChild(el);
    // over the cap, a player that has scrolled away goes first, otherwise the oldest
    LIVE_IF.push(box);
    while (LIVE_IF.length > (stage === 'theater' && MAX_IF > 1 ? 16 : MAX_IF)) { var far = LIVE_IF.filter(function(b){ if (b === box) return false; var r = b.getBoundingClientRect(); return r.bottom < -80 || r.top > innerHeight + 80 || r.right < 0 || r.left > innerWidth; })[0]; dead(far || LIVE_IF[0]); }
    // reveal only once Vimeo really plays; a blocked or failed embed keeps the poster
    if (window.Vimeo && Vimeo.Player) { try {
      var pl = new Vimeo.Player(el), skip = START[m.v], shown = false;
      pl.on('play', function(){
        if (shown) return; shown = true;
        var show = function(){ box._live && box.classList.add('is-live'); };
        if (skip) pl.setCurrentTime(skip).then(function(){ setTimeout(show, 250); }, show); else show();
      });
      // נגן שנטען כשהיה מוסתר (למשל בזמן אנימציית הפתיחה של פרויקט) נשאר עצור - מזיזים אותו להתחיל
      var tries = 0, nudge = setInterval(function(){
        if (!box._live || shown || ++tries > 14) { clearInterval(nudge); return; }
        if (tries < 2) return;
        pl.getPaused().then(function(p){ if (p && box._live && !shown) pl.play().catch(function(){}); }, function(){});
      }, 1500);
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
  $('#aboutLead').innerHTML = t.about1.split(' ').map(function(w){ return '<span class="wd">' + esc(w) + '</span>'; }).join(' ');
  var nl = $('#navLang'); nl.textContent = t.lang; nl.setAttribute('aria-label', t.langLabel);
  tsHeads();
}

/* ---------- כותרות בסגנון השם: העובי עולה מדק לעבה, הצבע עובר מזהב ללבן, וכל זוג אותיות מקבל אותה כמות אוויר לפי הצורה שלו
   (נמדד מהדיו של האות, לא מהקופסה שלה). אנגלית ב-Georama צר, עברית ב-Noto Sans Hebrew צר. גרש וגרשיים יורדים לקו העליון של האותיות ---------- */
var TS = { S: 120, W: 300, H: 230, B: 170, X: 60, tight: -.03, ready: false }, tsCache = {};
var tsCv = document.createElement('canvas'); tsCv.width = TS.W; tsCv.height = TS.H;
var tsCx = tsCv.getContext('2d', { willReadFrequently: true });
var TS_GOLD = [212, 168, 83], TS_INK = [242, 242, 240], TS_MARK = /[׳״'"]/;
function tsMix(p){ return 'rgb(' + TS_GOLD.map(function(c, i){ return Math.round(c + (TS_INK[i] - c) * p); }).join(',') + ')'; }
function tsFont(){ return lang === 'he' ? { fam: 'Noto Sans Hebrew', st: 'extra-condensed', lo: 100, hi: 900, ref: 'ה' } : { fam: 'Georama', st: 'extra-condensed', lo: 100, hi: 900, ref: 'H' }; }
function tsWeight(f, p){ return f.ws ? f.ws[Math.min(f.ws.length - 1, Math.floor(p * f.ws.length))] : Math.round(f.lo + (f.hi - f.lo) * p); }
// מצייר אות ומחזיר לכל שורה איפה הדיו מתחיל ונגמר
function tsGlyph(ch, f, w, dy){
  var key = ch + '|' + f.fam + '|' + w + '|' + (dy || 0); if (tsCache[key]) return tsCache[key];
  var c = tsCx; c.clearRect(0, 0, TS.W, TS.H); c.font = w + ' ' + TS.S + 'px "' + f.fam + '"'; c.fontStretch = f.st; c.direction = 'ltr'; c.textBaseline = 'alphabetic';
  c.fillText(ch, TS.X, TS.B + (dy || 0));
  var d = c.getImageData(0, 0, TS.W, TS.H).data, Lr = [], Rr = [], x0 = TS.W, x1 = -1, y0 = TS.H, y1 = -1;
  for (var y = 0; y < TS.H; y++) { var a = -1, b = -1;
    for (var x = 0; x < TS.W; x++) if (d[(y * TS.W + x) * 4 + 3] > 90) { if (a < 0) a = x; b = x; }
    Lr[y] = a; Rr[y] = b; if (a >= 0) { if (a < x0) x0 = a; if (b > x1) x1 = b; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
  return tsCache[key] = { L: Lr, R: Rr, x0: x0, x1: x1, y0: y0, adv: c.measureText(ch).width, il: x0 - TS.X, ir: x1 - TS.X };
}
// המרחק בין הדיו של שתי אותיות כך שכמות האוויר הממוצעת ביניהן תהיה T; פתחים עמוקים (כמו ב-L או A) נחתכים ב-D
function tsGap(A, B, band, T, D, clear){
  var sum = 0, cnt = 0, minRaw = 1e9;
  for (var y = band[0]; y <= band[1]; y += 2) {
    var ra = A.R[y] < 0 ? D : A.x1 - A.R[y], lb = B.L[y] < 0 ? D : B.L[y] - B.x0;
    if (A.R[y] >= 0 && B.L[y] >= 0) minRaw = Math.min(minRaw, ra + lb);
    sum += Math.min(ra, D) + Math.min(lb, D); cnt++;
  }
  var g = T - sum / cnt; if (minRaw < 1e9) g = Math.max(g, clear - minRaw); return g;
}
function typeset(el, text, mask){
  if (!el) return; text = String(text).trim();
  if (!TS.ready) { el.innerHTML = text.split(' ').map(function(w){ return mask ? '<span class="mask"><span>' + esc(w) + '</span></span>' : esc(w); }).join(' '); return; }
  var f = tsFont(), rtl = lang === 'he', S = TS.S, ref = tsGlyph(f.ref, f, tsWeight(f, .5)), band = [ref.y0, TS.B];
  if (!rtl) text = text.toUpperCase();   // באנגלית הכותרות באותיות גדולות, כמו השם; מודדים את האותיות כפי שהן מוצגות
  var words = text.split(/\s+/).filter(Boolean).map(function(w){ return Array.from(w); });
  var n = words.reduce(function(a, w){ return a + w.length; }, 0), i = 0;
  el.innerHTML = words.map(function(wd){
    var it = wd.map(function(ch){
      var p = n > 1 ? i++ / (n - 1) : 0, w = tsWeight(f, p), g = tsGlyph(ch, f, w), dy = 0;
      if (TS_MARK.test(ch)) { dy = ref.y0 - g.y0; g = tsGlyph(ch, f, w, dy); }   // הגרש יורד לקו העליון של האותיות
      return { ch: ch, p: p, w: w, g: g, dy: dy, m: null };
    });
    for (var k = 0; k < it.length - 1; k++) {
      var a = it[k], b = it[k + 1], vl = rtl ? b : a, vr = rtl ? a : b;   // בעברית האות הבאה נמצאת משמאל
      var gap = tsGap(vl.g, vr.g, band, (.05 + TS.tight + .022 * (a.p + b.p) / 2) * S, .13 * S, .014 * S);
      a.m = (gap - (vl.g.adv + vr.g.il - vl.g.ir)) / S;
    }
    var inner = it.map(function(x){
      return '<span class="tl" style="color:' + tsMix(x.p) + ';font-weight:' + x.w + (x.m === null ? '' : ';margin-inline-end:calc(' + x.m.toFixed(4) + 'em + var(--br))') + (x.dy ? ';top:' + (x.dy / S).toFixed(4) + 'em' : '') + '">' + esc(x.ch) + '</span>';
    }).join('');
    return mask ? '<span class="mask"><span class="tw">' + inner + '</span></span>' : '<span class="tw">' + inner + '</span>';
  }).join(' ');
  el.classList.add('ts');
}
function tsHeads(){
  typeset($('#heroName'), L().heroName.join(' '), true);
  $$('.h2, .group-head__title').forEach(function(el){ typeset(el, el.textContent); });
  var th = $('#thTitle'); if (th && th.textContent) typeset(th, th.textContent);
}
(function(){
  var loads = [100, 300, 500, 700, 900].map(function(w){ return document.fonts.load('extra-condensed ' + w + ' 40px "Georama"', 'SHARBELNAJEM'); })
    .concat([100, 300, 500, 700, 900].map(function(w){ return document.fonts.load('extra-condensed ' + w + ' 40px "Noto Sans Hebrew"', 'שרבלנג׳םה'); }));
  Promise.all(loads).then(function(){ TS.ready = true; tsCache = {}; tsHeads(); }, function(){});
})();

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
var projStrips = [];
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

/* ---------- featured: an endless ribbon that keeps drifting (a hovering mouse holds it, leaving lets it go), frames turn toward
   the centre in 3D and the centred one plays - already while the section is on its way into view. Moved by transform, positions cached ---------- */
var FE = { x: 0, tx: null, seg: 0, vw: 0, cx: [], frames: [], n: 0, near: false, hover: false, drag: null, hold: 0, last: 0, active: -1, tick: 0, running: false, moved: false, fresh: true };
function featDir(){ return lang === 'he' ? 1 : -1; }   // Hebrew flows to the right, English to the left
function renderFeatured(){
  var d = lang === 'he' ? 'rtl' : 'ltr';
  var one = function(){ return F.map(function(m, i){
    var p = P.filter(function(x){ return x.id === m.pid; })[0];
    return '<button type="button" class="frame frame--' + m.o + '" data-i="' + i + '" dir="' + d + '"><span class="frame__media">' + mediaHTML(m) + '</span>' +
      '<span class="frame__cap"><span>' + esc(nm(p)) + '</span><span class="mono ltr">' + dur(m.d) + '</span></span></button>';
  }).join(''); };
  $('#featTrack').innerHTML = one() + one() + one();
  FE.frames = $$('.frame', $('#featTrack')); FE.n = F.length; FE.active = -1; FE.fresh = true;
  FE.frames.forEach(function(b){ b.addEventListener('click', function(e){
    if (FE.moved) { e.preventDefault(); return; }
    openSet('featured', F[+b.dataset.i]);
  }); });
  requestAnimationFrame(function(){ featLayout(); });
  if (!FE.running) { FE.running = true; requestAnimationFrame(featTick); }
}
function featLayout(){
  if (!FE.frames.length) return;
  FE.vw = $('#featVp').clientWidth;
  FE.cx = FE.frames.map(function(f){ return f.offsetLeft + f.offsetWidth / 2; });
  FE.seg = FE.frames[FE.n].offsetLeft - FE.frames[0].offsetLeft;
  if (FE.seg <= 0) { FE.seg = 0; return; }   // the track must run left to right (dir=ltr in the markup)
  if (FE.fresh) { FE.fresh = false; FE.x = FE.vw / 2 - FE.cx[FE.n]; }   // the first film of the middle copy starts in the centre
  FE.tx = null; featApply(); featPick();
}
function featWrap(){   // keep the window inside the middle copy; jumping a whole copy looks identical
  var a = -FE.x, s = 0;
  if (a < FE.seg * .5) s = -FE.seg; else if (a > FE.seg * 1.5) s = FE.seg;
  if (!s) return; FE.x += s; if (FE.tx !== null) FE.tx += s; if (FE.drag) FE.drag.x0 += s;
}
function featApply(){
  $('#featTrack').style.transform = 'translate3d(' + FE.x.toFixed(2) + 'px,0,0)';
  var half = FE.vw / 2, deg = isPhone() ? 12 : 18;
  FE.frames.forEach(function(f, i){
    var c = FE.x + FE.cx[i]; if (c < -600 || c > FE.vw + 600) return;
    var d = Math.max(-1.3, Math.min(1.3, (c - half) / half));
    f.style.transform = 'perspective(1300px) rotateY(' + (-d * deg).toFixed(2) + 'deg) translateZ(' + (-Math.abs(d) * 70).toFixed(1) + 'px)';
  });
}
function featPick(){
  var half = FE.vw / 2, best = -1, bd = 1e9;
  if (FE.near) FE.cx.forEach(function(cx, i){ var d = Math.abs(FE.x + cx - half); if (d < bd) { bd = d; best = i; } });
  if (best === FE.active) return;
  var old = FE.frames[FE.active]; if (old) { old.classList.remove('is-active'); dead(old.querySelector('.media')); }
  FE.active = best;
  if (best > -1) { FE.frames[best].classList.add('is-active'); live(FE.frames[best].querySelector('.media')); }
}
function featStep(d){   // arrows: glide to the next or previous film, then drift on
  var half = FE.vw / 2, base = FE.tx !== null ? FE.tx : FE.x, best = 0, bd = 1e9;
  FE.cx.forEach(function(cx, i){ var dd = Math.abs(base + cx - half); if (dd < bd) { bd = dd; best = i; } });
  var t = Math.max(0, Math.min(FE.frames.length - 1, best + d * (lang === 'he' ? -1 : 1)));
  FE.tx = half - FE.cx[t]; FE.hold = Date.now() + 600;
}
function featTick(tm){
  var dt = Math.min(50, tm - (FE.last || tm)); FE.last = tm;
  if (stage === 'main' && FE.seg && (FE.near || FE.drag)) {
    if (FE.tx !== null && !FE.drag) { FE.x += (FE.tx - FE.x) * (1 - Math.exp(-dt / 170)); if (Math.abs(FE.tx - FE.x) < .5) { FE.x = FE.tx; FE.tx = null; } }
    else if (!FE.drag && !document.hidden && Date.now() > FE.hold) FE.x += featDir() * dt * (isPhone() ? .05 : .08);
    featWrap(); featApply();
    if (++FE.tick % 8 === 0) featPick();
  }
  requestAnimationFrame(featTick);
}
(function(){
  var vp = $('#featVp');
  vp.addEventListener('pointerdown', function(e){ FE.drag = { sx: e.clientX, x0: FE.x }; FE.moved = false; FE.tx = null; vp.classList.add('is-drag'); });
  addEventListener('pointermove', function(e){ if (!FE.drag) return; var dx = e.clientX - FE.drag.sx; if (Math.abs(dx) > 6) FE.moved = true; FE.x = FE.drag.x0 + dx; });
  var end = function(){ if (!FE.drag) return; FE.drag = null; vp.classList.remove('is-drag'); FE.hold = Date.now() + 600; setTimeout(function(){ FE.moved = false; }, 60); };
  addEventListener('pointerup', end); addEventListener('pointercancel', end);
  $('#featPrev').addEventListener('click', function(){ featStep(-1); });
  $('#featNext').addEventListener('click', function(){ featStep(1); });
  new IntersectionObserver(function(es){ FE.near = es[0].isIntersecting; featPick(); }, { rootMargin: '60% 0px 60% 0px' }).observe(vp);
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
  cardIO = new IntersectionObserver(function(es){ es.forEach(function(e){ var b = e.target.querySelector('.media'); if (e.isIntersecting) live(b); else dead(b); }); }, { rootMargin: '40% 0px 40% 0px' });
  $$('.card').forEach(function(c){ cardIO.observe(c); c.addEventListener('click', function(){ openTheater(+c.dataset.i, c); }); });
}

/* ---------- brands + testimonials ---------- */
function renderBrands(){
  var half = Math.ceil(C.logos.length / 2), rows = [C.logos.slice(0, half), C.logos.slice(half)];
  $('#brandRows').innerHTML = rows.map(function(r, k){
    var items = r.map(function(src){ return '<span class="logo-item"><img src="' + BASE + src + '" alt="" loading="lazy"></span>'; }).join('');
    return '<div class="marquee' + (k ? ' rev' : '') + '" dir="ltr"><div class="marquee__row" style="--dur:' + (40 + k * 8) + 's">' + items + items + '</div></div>';
  }).join('');
}
/* testimonials: an endless ribbon of equal cards. Each text gets the largest size that fills its card,
   and the card reaching the centre comes forward in 3D, its stars lighting up one by one */
var Q = { x: 0, tx: null, w: 0, vw: 0, cx: [], cards: [], row: null, inV: false, hover: false, hold: 0, drag: null, last: 0, running: false };
function renderQuotes(){
  var d = lang === 'he' ? 'rtl' : 'ltr', stars = '<i>★</i><i>★</i><i>★</i><i>★</i><i>★</i>';
  var cards = C.quotes.map(function(q){
    return '<figure class="quote" dir="' + d + '"><span class="quote__stars" aria-hidden="true">' + stars + '</span><p>' + esc(lang === 'he' ? q.he : q.en) + '</p><figcaption class="quote__who">' + esc(lang === 'he' ? q.whoHe : q.whoEn) + '</figcaption></figure>';
  }).join('');
  $('#quoteRows').innerHTML = '<div class="qrib" id="qRib" dir="ltr"><div class="qrib__row" id="qRow">' + cards + cards + '</div></div>';
  Q.row = $('#qRow'); Q.cards = $$('.quote', Q.row); Q.x = 0; Q.fresh = true;
  requestAnimationFrame(function(){ quotesLayout(); });
  if (!Q.running) { Q.running = true; requestAnimationFrame(quotesTick); }
}
function quotesLayout(force){
  if (!Q.cards.length) return;
  var n = Q.cards.length / 2, fit = force === true || Q.fitFor !== Q.row || Q.fitW !== innerWidth;
  Q.fitFor = Q.row; Q.fitW = innerWidth;
  if (fit) for (var k = 0; k < n; k++) {
    var c = Q.cards[k], p = c.querySelector('p'), lo = 12, hi = isPhone() ? 16.5 : 18.5;
    while (hi - lo > .25) { var mid = (lo + hi) / 2; p.style.fontSize = mid + 'px'; if (c.scrollHeight > c.clientHeight + 1) hi = mid; else lo = mid; }
    p.style.fontSize = lo + 'px'; Q.cards[k + n].querySelector('p').style.fontSize = lo + 'px';
  }
  var was = Q.p ? Math.round((Q.o - Q.x) / Q.p) : null;
  Q.vw = $('#qRib').clientWidth; Q.w = Q.cards[n].offsetLeft - Q.cards[0].offsetLeft; Q.n = n;
  Q.cx = Q.cards.map(function(c){ return c.offsetLeft + c.offsetWidth / 2; });
  Q.p = Q.cx[1] - Q.cx[0]; Q.o = Q.vw / 2 - Q.cx[0]; Q.kmin = Math.ceil((Q.vw / 2 - Q.cx[0]) / Q.p) + 1;
  // card k sits in the centre when x = o - k*p; keep k inside [kmin, kmin + n) so both sides of the ribbon stay filled
  var k = was === null || Q.fresh ? Q.kmin : ((was - Q.kmin) % n + n) % n + Q.kmin; Q.fresh = false;
  Q.x = Q.o - k * Q.p; Q.tx = null;
  quotes3D();
}
function quotesGo(k){ Q.tx = Q.o - k * Q.p; Q.hold = Date.now() + 900; }
function quotes3D(){
  var half = Q.vw / 2, ph = isPhone();
  Q.row.style.transform = 'translate3d(' + Q.x.toFixed(2) + 'px,0,0)';
  Q.cards.forEach(function(c, i){
    var d = (Q.x + Q.cx[i] - half) / half;
    if (Math.abs(d) > 1.7) return;
    var a = Math.min(1.2, Math.abs(d)), f = Math.max(0, 1 - Math.abs(d) * (ph ? 1.6 : 2.4));
    c.style.transform = 'perspective(1100px) translateZ(' + (f * 50 - a * (ph ? 90 : 160)).toFixed(1) + 'px) rotateY(' + (d * (ph ? 28 : 36)).toFixed(2) + 'deg)';
    c.style.opacity = (1 - Math.min(1, a) * .55).toFixed(3);
    c.style.setProperty('--c', f.toFixed(3));
  });
}
/* הרצועה זזה כל הזמן, גם כשהעכבר מעליה. הקשה או גרירה מחליקות פנימה ומיד ממשיכות */
function quotesTick(t){
  var dt = Math.min(50, t - (Q.last || t)); Q.last = t;
  if (stage === 'main' && Q.row && Q.p && (Q.inV || Q.drag)) {
    if (Q.tx !== null && !Q.drag) { Q.x += (Q.tx - Q.x) * (reduce ? 1 : 1 - Math.exp(-dt / 210)); if (Math.abs(Q.tx - Q.x) < .5) { Q.x = Q.tx; Q.tx = null; } }
    else if (!Q.drag && !document.hidden && Date.now() > Q.hold) Q.x -= dt * (isPhone() ? .042 : .06);
    var lo = Q.o - (Q.kmin + Q.n - .5) * Q.p, hi = Q.o - (Q.kmin - .5) * Q.p, s = Q.x < lo ? Q.w : Q.x > hi ? -Q.w : 0;
    if (s) { Q.x += s; if (Q.tx !== null) Q.tx += s; if (Q.drag) Q.drag.q += s; }
    quotes3D();
  }
  requestAnimationFrame(quotesTick);
}
(function(){
  var box = $('#quoteRows');
  new IntersectionObserver(function(es){ Q.inV = es[0].isIntersecting; }, { threshold: .05 }).observe(box);
  box.addEventListener('pointerdown', function(e){ Q.drag = { x: e.clientX, q: Q.x, moved: false }; });
  addEventListener('pointermove', function(e){ if (!Q.drag) return; var dx = e.clientX - Q.drag.x; if (Math.abs(dx) > 6) Q.drag.moved = true; Q.x = Q.drag.q + dx; });
  var end = function(e){
    if (!Q.drag) return; var d = Q.drag; Q.drag = null;
    if (d.moved) { Q.hold = Date.now() + 600; return; }
    var c = e && e.target && e.target.closest && e.target.closest('.quote');   // a tap on a side card brings it to the centre
    if (c) quotesGo(Q.cards.indexOf(c));
  };
  addEventListener('pointerup', end); addEventListener('pointercancel', function(){ end(null); });
})();
function renderDream(){
  $$('.dw').forEach(function(w){ w.innerHTML = '<span class="dw__w">' + w.dataset.w.split('').map(function(ch){ return '<span class="dl">' + ch + '</span>'; }).join('') + '</span>'; });
}

/* ---------- campaigns: an endless fan in 3D that keeps turning slowly (a hovering mouse holds it, leaving lets it go).
   The front card plays - already on the way into view; tapping another turns the fan to it; swipe on phones ---------- */
var CAMP = null, DK = { pos: 0, to: null, t: 0, n: 0, cards: [], sel: -1, key: '', near: false, shown: false, hover: false, hold: 0, last: 0, running: false, swiped: false };
function renderDeck(){
  CAMP = P.filter(function(p){ return p.id === 'campaigns'; })[0];
  var sec = $('#campaigns'); sec.hidden = !CAMP; if (!CAMP) return;
  var copies = CAMP.items.length < 10 ? 2 : 1, html = '';
  for (var c = 0; c < copies; c++) html += CAMP.items.map(function(m, k){ return '<button type="button" class="dcard" data-k="' + k + '"><span class="dcard__in">' + mediaHTML(m) + '<span class="dcard__cap">' + esc(nm(m)) + '</span></span></button>'; }).join('');
  $('#deck').innerHTML = html;
  DK.cards = $$('.dcard'); DK.n = DK.cards.length; DK.pos = 0; DK.to = null; DK.key = '';
  DK.cards.forEach(function(b, i){ b.addEventListener('click', function(){
    if (DK.swiped) return;
    if (i === DK.sel) { dead(b.querySelector('.media')); openSet(CAMP.id, CAMP.items[+b.dataset.k]); return; }
    deckGo(i);
  }); });
  if (reduce || !hasGsap) DK.t = 1;
  layoutDeck(); playDeck();
  if (!DK.running) { DK.running = true; requestAnimationFrame(deckTick); }
}
function deckOff(i){ var n = DK.n, k = ((i - DK.pos) % n + n) % n; return k > n / 2 ? k - n : k; }
function deckGo(i){   // the short way round to card i
  if (!DK.n) return; var n = DK.n, cur = DK.to !== null ? DK.to : DK.pos, d = ((i - cur) % n + n) % n; if (d > n / 2) d -= n;
  DK.to = cur + d; DK.hold = Date.now() + 900;
}
function layoutDeck(){
  var cards = DK.cards; if (!cards.length) return;
  var t = DK.t, ph = isPhone(), w = cards[0].offsetWidth || 1, dir = lang === 'he' ? -1 : 1, spread = w * (ph ? .6 : .74), vis = ph ? 2 : 3;
  cards.forEach(function(c, i){
    var k = deckOff(i), a = Math.abs(k);
    if (a > vis + 1) { if (c._on !== false) { c._on = false; c.style.opacity = 0; c.style.pointerEvents = 'none'; } return; }
    c._on = true;
    var x = dir * k * spread * t, y = (a * a * (ph ? 6 : 9) + Math.min(1, a) * 18) * t + (1 - t) * 50,
      s = .9 + .2 * Math.max(0, 1 - a) * t, op = Math.max(0, Math.min(1, vis + .6 - a)) * Math.min(1, t * 1.6);
    c.style.transform = 'perspective(1200px) translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + (dir * k * 5 * t).toFixed(2) + 'deg) rotateY(' + (-dir * k * 12 * t).toFixed(2) + 'deg) scale(' + s.toFixed(3) + ')';
    c.style.opacity = op.toFixed(3); c.style.zIndex = String(1000 - Math.round(a * 100));
    c.style.pointerEvents = a <= vis + .2 ? '' : 'none';
  });
}
function playDeck(){
  if (!DK.n) return;
  var sel = ((Math.round(DK.pos) % DK.n) + DK.n) % DK.n, key = sel + (DK.near ? 'n' : 'f');
  if (key === DK.key) return; DK.key = key; DK.sel = sel;
  DK.cards.forEach(function(c, i){ var box = c.querySelector('.media'), on = i === sel; c.classList.toggle('is-sel', on); if (on && DK.near) live(box); else dead(box); });
}
function deckTick(tm){
  var dt = Math.min(50, tm - (DK.last || tm)); DK.last = tm;
  if (stage === 'main' && DK.n && (DK.near || DK.to !== null)) {
    if (DK.to !== null) { DK.pos += (DK.to - DK.pos) * (1 - Math.exp(-dt / 260)); if (Math.abs(DK.to - DK.pos) < .002) { DK.pos = DK.to; DK.to = null; } }
    else if (DK.shown && DK.t >= 1 && !document.hidden && Date.now() > DK.hold) DK.pos += dt / 3000;
    layoutDeck(); playDeck();
  }
  requestAnimationFrame(deckTick);
}
(function(){
  var deck = $('#deck'), sx = null;
  deck.addEventListener('pointerdown', function(e){ sx = e.clientX; DK.swiped = false; });
  deck.addEventListener('pointerup', function(e){
    if (sx === null) return; var dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) > 40) { DK.swiped = true; deckGo(DK.sel + (dx > 0 ? 1 : -1) * (lang === 'he' ? 1 : -1)); setTimeout(function(){ DK.swiped = false; }, 60); }
  });
  new IntersectionObserver(function(es){ DK.near = es[0].isIntersecting; playDeck(); }, { rootMargin: '60% 0px 60% 0px' }).observe(deck);
  new IntersectionObserver(function(es){
    if (!es[0].isIntersecting || DK.shown) return; DK.shown = true;
    if (hasGsap && !reduce) gsap.to(DK, { t: 1, duration: 1.6, ease: 'expo.out' }); else { DK.t = 1; layoutDeck(); }
  }, { threshold: .3 }).observe(deck);
  $('#deckPrev').addEventListener('click', function(){ deckGo(DK.sel - 1); });
  $('#deckNext').addEventListener('click', function(){ deckGo(DK.sel + 1); });
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
var thIndex = -1, opener = null;
function clipHTML(m){
  return '<button type="button" class="clip" data-cursor="play" style="--ar:' + (m.o === 'p' ? '9 / 16' : '16 / 9') + '"><span class="clip__media">' + mediaHTML(m) +
    '<span class="clip__dur mono ltr">' + dur(m.d) + '</span></span><span class="clip__title">' + esc(nm(m)) + '</span></button>';
}
function fillTheater(i, later){
  var p = P[i], t = L(); thIndex = i;
  var films = p.items.filter(function(x){ return x.o === 'l'; }), reels = p.items.filter(function(x){ return x.o === 'p'; }), list = films.concat(reels);
  $('#thTag').textContent = t.cats[p.cat]; typeset($('#thTitle'), nm(p)); $('#thSub').textContent = lang === 'he' ? p.subHe : p.subEn;
  $('#thFilms').innerHTML = films.map(clipHTML).join(''); $('#thReels').innerHTML = reels.map(clipHTML).join('');
  $('#thFilmsWrap').hidden = !films.length; $('#thReelsWrap').hidden = !reels.length;
  $$('#theater .clip').forEach(function(b, k){
    var box = b.querySelector('.media');
    b.addEventListener('click', function(){ dead(box); openSet(p.id, list[k]); });
  });
  $('#thNextName').textContent = nm(P[(i + 1) % P.length]);
  $('#thScroll').scrollTop = 0;
  if (!later) thWatch();
}
// בתוך פרויקט כל הסרטונים מנגנים: כל מה שעל המסך, ומה שמתקרב מתחיל עוד לפני שמגיעים אליו
var thIO = null;
function thWatch(){
  if (thIO) thIO.disconnect();
  // נדלקים אחד אחרי השני (120ms) כדי שלא ייטענו כולם באותו רגע
  thIO = new IntersectionObserver(function(es){ var k = 0; es.forEach(function(e){ var b = e.target.querySelector('.media'); clearTimeout(b._t); if (e.isIntersecting) b._t = setTimeout(function(){ live(b); }, 120 * k++); else dead(b); }); }, { root: $('#thScroll'), rootMargin: '40% 0px 40% 0px' });
  $$('#theater .clip').forEach(function(c){ thIO.observe(c); });
}
// חזרה לעמוד: הסרטונים שעל המסך חוזרים לנגן
function resumeMain(){
  $$('.frame.is-active').forEach(function(f){ f.classList.remove('is-active'); }); FE.active = -1; featPick();
  DK.key = ''; playDeck();
  if (cardIO) $$('.card').forEach(function(c){ cardIO.unobserve(c); cardIO.observe(c); });
}
function openTheater(i, from){
  opener = from || null; stage = 'theater'; $$('main .media').forEach(dead); fillTheater(i, true);
  var th = $('#theater'); th.hidden = false; lenis && lenis.stop(); root.classList.add('is-locked');
  if (hasGsap && !reduce) {
    var r = from ? from.getBoundingClientRect() : { top: innerHeight / 2, bottom: innerHeight / 2, left: 0, right: innerWidth };
    gsap.fromTo(th, { clipPath: 'inset(' + Math.max(0, r.top) + 'px ' + Math.max(0, innerWidth - r.right) + 'px ' + Math.max(0, innerHeight - r.bottom) + 'px ' + Math.max(0, r.left) + 'px round 24px)' },
      { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: .9, ease: 'expo.inOut', onComplete: function(){ th.style.clipPath = ''; thWatch(); } });
    gsap.from($$('.theater__head > *, #theater .shelf'), { y: 50, opacity: 0, duration: .9, ease: 'expo.out', stagger: .08, delay: .4 });
  }
  else thWatch();
  $('#thClose').focus({ preventScroll: true });
}
function closeTheater(){
  var th = $('#theater');
  if (thIO) thIO.disconnect(); $$('#theater .media').forEach(dead); stage = 'main';
  var done = function(){ th.hidden = true; th.style.clipPath = ''; root.classList.remove('is-locked'); lenis && lenis.start(); opener && opener.focus({ preventScroll: true }); resumeMain(); };
  if (hasGsap && !reduce) gsap.to(th, { clipPath: 'inset(50% 0% 50% 0% round 0px)', duration: .6, ease: 'expo.inOut', onComplete: done }); else done();
}
$('#thClose').addEventListener('click', closeTheater);
$('#thNext').addEventListener('click', function(){
  var n = (thIndex + 1) % P.length; $$('#theater .media').forEach(dead);
  if (hasGsap && !reduce) gsap.to('#thScroll', { opacity: 0, duration: .3, onComplete: function(){ fillTheater(n); gsap.to('#thScroll', { opacity: 1, duration: .5 }); } });
  else fillTheater(n);
});

/* ---------- צופה בסגנון נטפליקס: הסרטון בגודל וביחס המקוריים במרכז הבמה, הקודם והבא מציצים בצדדים, רצועת כל הסרטונים למטה,
   ספירה לאחור והמעבר לבא בסוף, מעבר בכיוון הקריאה, והממשק נעלם בזמן צפייה ---------- */
var lbList = [], lbI = 0, lbPl = null, lbCancel = false, lbIdleT = null, LB_SETS = [], lbSet = 0, railSet = 0;
// אוספי הצפייה: המועדפים ואחריהם כל הפרויקטים בסדר שלהם (סרטים ואחריהם רילס, כמו בעמוד הפרויקט)
function lbBuildSets(){
  var sets = [{ key: 'featured', name: L().featTitle, items: F.map(function(m){ var p = P.filter(function(x){ return x.id === m.pid; })[0]; return { m: m, title: nm(p) }; }) }];
  P.forEach(function(p){ var films = p.items.filter(function(x){ return x.o === 'l'; }), reels = p.items.filter(function(x){ return x.o === 'p'; });
    sets.push({ key: p.id, name: nm(p), items: films.concat(reels).map(function(m){ return { m: m, title: nm(m), sub: nm(p) }; }) }); });
  return sets;
}
function openSet(key, m){
  LB_SETS = lbBuildSets(); var s = Math.max(0, LB_SETS.map(function(x){ return x.key; }).indexOf(key));
  var i = Math.max(0, LB_SETS[s].items.map(function(x){ return x.m; }).indexOf(m));
  lbSet = railSet = s; openLightbox(LB_SETS[s].items, i);
}
// הסרטון שנמצא d צעדים מהנוכחי; בקצה של אוסף ממשיכים לפרויקט הבא (או חוזרים לקודם)
function lbAt(d){
  var s = lbSet, i = lbI, N = LB_SETS.length, st = d > 0 ? 1 : -1;
  for (var k = 0; k !== d; k += st) { i += st; if (i >= LB_SETS[s].items.length) { s = (s + 1) % N; i = 0; } else if (i < 0) { s = (s - 1 + N) % N; i = LB_SETS[s].items.length - 1; } }
  return { s: s, i: i, it: LB_SETS[s].items[i] };
}
function lbNb(d){ return lbAt(d); }
function pad2(x){ return (x < 10 ? '0' : '') + x; }
var PEEKS = [-2, -1, 1, 2];
function renderPeeks(){
  var t = L();
  $('#lbPeeks').innerHTML = PEEKS.map(function(o){
    var nb = lbAt(o), cap = o === 1 ? (nb.s !== lbSet ? LB_SETS[nb.s].name : t.upNext) : t.prev;
    return '<button type="button" class="lb__peek" data-o="' + o + '" aria-label="' + esc(nb.it.title) + '"><img src="' + nb.it.m.poster + '" alt=""><span class="lb__peekdur mono ltr">' + dur(nb.it.m.d) + '</span>' +
      (Math.abs(o) === 1 ? '<span class="lb__peekcap"><small>' + esc(cap) + '</small><b>' + esc(nb.it.title) + '</b></span>' : '') + '</button>';
  }).join('');
  $$('.lb__peek').forEach(function(b){ b.addEventListener('click', function(){ lbJump(+b.dataset.o); }); });
}
function lbJump(o){ var nb = lbAt(o); if (nb.s !== lbSet) { lbSet = nb.s; lbList = LB_SETS[nb.s].items; } goLb(nb.i, o > 0 ? 1 : -1); }
function sizeBox(){
  var it = lbList[lbI]; if (!it) return; var r = ratio(it.m), st = $('#lbStage'), ph = isPhone();
  var W = st.clientWidth, H = st.clientHeight - 20, w = Math.min(W * (ph ? .94 : .6), H * r), h = w / r;
  $('#lbBox').style.width = w + 'px'; $('#lbBox').style.height = h + 'px'; st.style.setProperty('--bw', w + 'px');
  if (ph) return;
  // צד "הבא" על המסך: שמאל בעברית, ימין באנגלית
  var sg = lang === 'he' ? -1 : 1, side = (W - w) / 2, dims = {};
  PEEKS.forEach(function(o){
    // הקרוב תופס כ-60% מהשטח שבצד כדי שגם השני ייראה מאחוריו
    var a = Math.abs(o), r2 = ratio(lbAt(o).it.m), ph2 = h * (a === 1 ? .74 : .58), pw = ph2 * r2, cap = a === 1 ? Math.max(220, side * .62) : Math.max(170, side * .45);
    if (pw > cap) { pw = cap; ph2 = pw / r2; }
    dims[o] = { w: pw, h: ph2 };
  });
  $$('.lb__peek').forEach(function(el){
    var o = +el.dataset.o, a = Math.abs(o), sd = sg * (o > 0 ? 1 : -1), d1 = dims[o > 0 ? 1 : -1], dm = dims[o];
    var cx = W / 2 + sd * (w / 2 + 28 + d1.w / 2);
    if (a === 2) cx += sd * (d1.w / 2 + dm.w * .15);   // השני נכנס חלקית מאחורי הראשון ומציץ ממנו החוצה
    el.style.width = dm.w + 'px'; el.style.height = dm.h + 'px'; el.style.left = (cx - dm.w / 2) + 'px'; el.style.zIndex = a === 1 ? 2 : 1;
    el.style.setProperty('--ry', (sd * (a === 1 ? 14 : 24)) + 'deg'); el.style.transformOrigin = sd > 0 ? '0% 50%' : '100% 50%';
  });
}
function renderChips(){
  $('#lbChips').innerHTML = LB_SETS.map(function(x, k){ return '<button type="button" class="lb__chip" data-k="' + k + '">' + esc(x.name) + '</button>'; }).join('');
  $$('.lb__chip').forEach(function(b){ b.addEventListener('click', function(){ railSet = +b.dataset.k; renderRail(true); }); });
}
function renderRail(anim){
  var items = (LB_SETS[railSet] || {}).items || [];
  $('#lbRail').innerHTML = items.map(function(it, k){
    return '<button type="button" class="lb__thumb' + (it.m.o === 'p' ? ' is-p' : '') + '" data-k="' + k + '" title="' + esc(it.title) + '" aria-label="' + esc(it.title) + '"><img src="' + it.m.poster + '" alt="" loading="lazy">' +
      '<span class="lb__thumbdur mono ltr">' + dur(it.m.d) + '</span><span class="lb__eq" aria-hidden="true"><i></i><i></i><i></i></span></button>';
  }).join('');
  $$('.lb__thumb').forEach(function(b){ b.addEventListener('click', function(){
    var k = +b.dataset.k;
    if (railSet !== lbSet) { lbSet = railSet; lbList = LB_SETS[lbSet].items; goLb(k, 1); }   // סרטון מפרויקט אחר: האוסף שלו הופך לנוכחי
    else if (k !== lbI) goLb(k, k > lbI ? 1 : -1);
  }); });
  railSync(true);
  if (anim && hasGsap && !reduce) gsap.from('.lb__thumb', { x: (lang === 'he' ? -1 : 1) * 40, opacity: 0, duration: .6, ease: 'expo.out', stagger: .02, clearProps: 'all' });
}
function railSync(instant){
  var on = null;
  $$('.lb__thumb').forEach(function(b, k){ var x = railSet === lbSet && k === lbI; b.classList.toggle('is-on', x); if (x) on = b; });
  $$('.lb__chip').forEach(function(b, k){ b.classList.toggle('is-on', k === railSet); b.classList.toggle('is-playing', k === lbSet); });
  var behavior = reduce || instant ? 'auto' : 'smooth', chip = $('.lb__chip.is-on');
  if (chip) chip.scrollIntoView({ inline: 'center', block: 'nearest', behavior: behavior });
  if (on) on.scrollIntoView({ inline: 'center', block: 'nearest', behavior: behavior });
  else $('#lbRail').scrollLeft = 0;
}
function lbEnding(on){ var lb = $('#lb'); if (lb.classList.contains('is-ending') === on) return; lb.classList.toggle('is-ending', on); $('#lbUp').hidden = !on; }
// 8 השניות האחרונות: טבעת שמתמלאת, "הבא בעוד 5", והסרטון הבא גדל בצד
function lbTick(remain, total){
  if (lbCancel || !(total > 20) || !(remain > .2 && remain <= 8)) { lbEnding(false); return; }
  lbEnding(true); $('#lbUpN').textContent = Math.ceil(remain); $('#lbUp').style.setProperty('--p', (1 - remain / 8).toFixed(3));
}
function lbEnded(){ if (!lbCancel) stepLb(1); }
function lbUnbind(){ if (lbPl) { try { lbPl.off('play'); lbPl.off('loaded'); lbPl.off('timeupdate'); lbPl.off('ended'); } catch (e) {} lbPl = null; } }
function showLb(d){
  var it = lbList[lbI], m = it.m, box = $('#lbBox'), n = lbList.length;
  // הרקע הוא הסרטון עצמו מטושטש לאור; שתי שכבות שמתחלפות בדעיכה
  var amb = $$('.lb__amb'), cur = amb.filter(function(a){ return a.classList.contains('is-on'); })[0];
  if (!cur || cur.getAttribute('src') !== m.poster) { var nx = cur === amb[0] ? amb[1] : amb[0]; nx.src = m.poster; nx.classList.add('is-on'); if (cur) cur.classList.remove('is-on'); }
  lbUnbind(); lbEnding(false); box.classList.remove('is-on');
  box.innerHTML = '<img class="lb__poster" src="' + m.poster + '" alt="">';   // התמונה מיד, בלי מסך שחור עד שהנגן עולה
  if (m.v) {
    var f = document.createElement('iframe'); f.src = fullURL(m); f.allow = 'autoplay; fullscreen; picture-in-picture'; f.allowFullscreen = true; f.title = it.title; box.appendChild(f);
    if (window.Vimeo && Vimeo.Player) { try {
      lbPl = new Vimeo.Player(f);
      lbPl.on('play', function(){ box.classList.add('is-on'); });
      // הנגן נחשף רק כשהסרטון באמת מתחיל (בלי מסך טעינה אפור); אם הדפדפן חסם ניגון אוטומטי - נחשף אחרי 3.5 שניות עם כפתור הניגון
      setTimeout(function(){ if (lbPl && box.contains(f)) box.classList.add('is-on'); }, 3500);
      lbPl.on('timeupdate', function(e){ lbTick(e.duration - e.seconds, e.duration); });
      lbPl.on('ended', lbEnded);
    } catch (e) { box.classList.add('is-on'); } } else box.classList.add('is-on');
  } else {
    var v = document.createElement('video'); v.src = m.loop; v.controls = true; v.autoplay = true; v.playsInline = true; v.poster = m.poster; box.appendChild(v); box.classList.add('is-on');
    v.addEventListener('timeupdate', function(){ lbTick(v.duration - v.currentTime, v.duration); }); v.addEventListener('ended', lbEnded);
  }
  $('#lbName').textContent = it.title;
  $('#lbInfo').innerHTML = esc(it.sub || LB_SETS[lbSet].name) + ' · <span class="ltr mono">' + dur(m.d) + '</span>';
  $('#lbCount').textContent = pad2(lbI + 1) + ' / ' + pad2(n);
  renderPeeks();   // שני סרטונים מכל צד; בסוף פרויקט "הבא בתור" הוא שם הפרויקט הבא
  if (railSet !== lbSet) { railSet = lbSet; renderRail(true); } else railSync();
  sizeBox();
  if (hasGsap && !reduce) {
    gsap.fromTo(box, { x: -(lang === 'he' ? 1 : -1) * (d || 0) * 160, scale: d ? .93 : .96, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: .65, ease: 'expo.out', overwrite: true });
    gsap.from('.lb__peek', { opacity: 0, duration: .8, delay: .12, ease: 'power2.out', stagger: .05, clearProps: 'opacity' });
  }
}
// מעבר: הנוכחי יוצא לצד של הקודם, החדש נכנס מהצד של הבא
function goLb(i, d){
  var n = lbList.length; if (!n) return; i = (i % n + n) % n; lbCancel = false;
  var box = $('#lbBox');
  if (hasGsap && !reduce && box.firstChild) gsap.to(box, { x: (lang === 'he' ? 1 : -1) * d * 160, scale: .9, opacity: 0, duration: .3, ease: 'power2.in', overwrite: true, onComplete: function(){ lbI = i; showLb(d); } });
  else { lbI = i; showLb(d); }
}
function stepLb(d){
  var nb = lbNb(d);
  if (nb.s !== lbSet) { lbSet = nb.s; lbList = LB_SETS[nb.s].items; }
  goLb(nb.i, d);
}
// הממשק נעלם רק עם עכבר; במסך מגע הקשה על הסרטון לא מגיעה לאתר, אז הממשק נשאר גלוי
function lbWake(){ var lb = $('#lb'); lb.classList.remove('is-idle'); clearTimeout(lbIdleT); if (!fine) return; lbIdleT = setTimeout(function(){ if (!lb.hidden) lb.classList.add('is-idle'); }, 3500); }
function openLightbox(list, i){
  lbFrom = stage; stage = 'lb'; $$('.media').forEach(dead);
  lbList = list; lbI = i; lbCancel = false; $('#lb').hidden = false; lenis && lenis.stop();
  renderChips(); renderRail(); showLb(0); lbWake(); $('#lb').focus({ preventScroll: true });   // המיקוד על הצופה, כך שרווח עוצר/מנגן ולא סוגר
  if (hasGsap && !reduce) {
    gsap.fromTo('#lb', { opacity: 0 }, { opacity: 1, duration: .45, ease: 'power2.out' });
    gsap.fromTo('.lb__logo', { opacity: 0, y: -14 }, { opacity: .95, y: 0, duration: 1, ease: 'expo.out', delay: .2 });
    gsap.from('.lb__thumb', { y: 34, opacity: 0, duration: .8, ease: 'expo.out', stagger: .025, delay: .25, clearProps: 'all' });
  }
}
function closeLb(){
  lbUnbind(); lbEnding(false); clearTimeout(lbIdleT); $('#lb').classList.remove('is-idle');
  $('#lbBox').innerHTML = ''; $('#lb').hidden = true; if ($('#theater').hidden) lenis && lenis.start();
  stage = lbFrom; if (stage === 'theater') thWatch(); else resumeMain();
}
$('#lbClose').addEventListener('click', closeLb);
$('#lbPrev').addEventListener('click', function(){ stepLb(-1); });
$('#lbNext').addEventListener('click', function(){ stepLb(1); });
$('#lbUpGo').addEventListener('click', function(){ stepLb(1); });
$('#lbUpX').addEventListener('click', function(){ lbCancel = true; lbEnding(false); });
$('#lb').addEventListener('pointermove', lbWake); $('#lb').addEventListener('pointerdown', lbWake);
addEventListener('resize', function(){ if (!$('#lb').hidden) sizeBox(); });
document.addEventListener('keydown', function(e){
  if (!$('#lb').hidden) {
    lbWake();
    if (e.key === 'Escape') closeLb();
    if (e.key === (lang === 'he' ? 'ArrowLeft' : 'ArrowRight')) stepLb(1);
    if (e.key === (lang === 'he' ? 'ArrowRight' : 'ArrowLeft')) stepLb(-1);
    if (e.key === ' ' && lbPl && !/BUTTON|INPUT/.test(document.activeElement.tagName)) { e.preventDefault(); lbPl.getPaused().then(function(p){ p ? lbPl.play() : lbPl.pause(); }); }
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
  var top = function(){ scrollTo(0, 0); lenis && lenis.scrollTo(0, { immediate: true, force: true }); };   // a new language starts from the top
  var run = function(){ setLang(to); top(); setupScenes(); ScrollTrigger.refresh(); };
  if (hasGsap && !reduce) gsap.to('main', { opacity: 0, duration: .3, onComplete: function(){ run(); gsap.to('main', { opacity: 1, duration: .6 }); } });
  else { setLang(to); top(); }
});

/* ---------- nav ---------- */
var sheet = $('#sheet'), menuBtn = $('#navMenu');
menuBtn.addEventListener('click', function(){ var o = !sheet.classList.contains('is-open'); sheet.classList.toggle('is-open', o); menuBtn.setAttribute('aria-expanded', String(o)); });
$$('[data-go]').forEach(function(a){ a.addEventListener('click', function(e){
  var t = $(a.dataset.go); if (!t) return; e.preventDefault(); sheet.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false');
  if (lenis) lenis.scrollTo(t, { duration: 1.4, offset: a.dataset.go === '#top' ? 0 : -70 }); else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
}); });

/* ---------- reveal: an IntersectionObserver adds .in, so nothing can stay hidden if a scroll trigger fires late ---------- */
var revIO = ('IntersectionObserver' in window) ? new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); revIO.unobserve(e.target); } }); }, { rootMargin: '0px 0px -6% 0px', threshold: .01 }) : null;
function armReveal(){
  if (!revIO || reduce) return;
  var arm = function(sel, cls){ $$(sel).forEach(function(el, i){ if (el.classList.contains('in')) return; el.classList.add(cls); el.style.setProperty('--d', (i % 6) * 70 + 'ms'); revIO.observe(el); }); };
  arm('.sec__head .label, .sec__head .h2, .sec__head .sec__sub, #about .h2, .about__p, .group-head > *, .contact .label, .contact__l1, .contact__l2, .contact__foot > *, .strip-ctrls', 'rv');
  arm('.svc, .card, .rule__num, .rule__name', 'rvo');
  arm('.contact__rule', 'rvx');
}
/* 3D tilt toward the pointer, with a light that follows it */
function tilt(el, deg){
  if (!fine || reduce || el._tilt) return; el._tilt = true;
  el.addEventListener('pointermove', function(e){ var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = 'perspective(900px) rotateY(' + (x * deg).toFixed(2) + 'deg) rotateX(' + (-y * deg).toFixed(2) + 'deg) translateY(-6px)';
    el.style.setProperty('--gx', ((x + .5) * 100).toFixed(1) + '%'); el.style.setProperty('--gy', ((y + .5) * 100).toFixed(1) + '%'); });
  el.addEventListener('pointerleave', function(){ el.style.transform = ''; });
}

/* ---------- scroll scenes ---------- */
var scenes = [];
function setupScenes(){
  scenes.forEach(function(s){ s.scrollTrigger && s.scrollTrigger.kill(); s.kill(); }); scenes = [];
  armReveal();
  $$('.card').forEach(function(c){ tilt(c, 10); }); tilt($('#aboutPhoto'), 7);
  if (!hasGsap || reduce) { root.classList.add('no-anim'); return; }
  var add = function(tw){ scenes.push(tw); return tw; };
  // the reel stays whole and still while scrolling (no scale/tilt/rounding: that clipped the video at its corner); only the copy drifts up and fades
  add(gsap.to('.hero__copy', { yPercent: -20, opacity: 0, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } }));
  add(gsap.to('#aboutLead .wd', { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: '#aboutLead', start: 'top 85%', end: 'bottom 55%', scrub: true } }));
  // Dream / Create / Share: the letters flip up out of the line one by one, the words close in from wide spacing,
  // and each word grows into its own weight (light, medium, heavy)
  if (!root._dreamIO) {
    var dls = $$('.dl'), dws = $$('.dw__w'), ls = dws.map(function(w){ return getComputedStyle(w).letterSpacing; });
    gsap.set(dls, { opacity: 0, yPercent: 70, rotationX: -85, transformPerspective: 700, transformOrigin: '50% 100%', fontWeight: 200 });
    gsap.set(dws, { letterSpacing: '.4em' });
    gsap.set('.dream img', { opacity: 0, rotationY: -90, transformPerspective: 600 });
    root._dreamIO = new IntersectionObserver(function(es){
      if (!es[0].isIntersecting) return; root._dreamIO.disconnect();
      gsap.timeline({ onComplete: function(){ gsap.set(dls, { clearProps: 'all' }); gsap.set(dws, { clearProps: 'letterSpacing' }); $('.dream').classList.add('is-done'); } })
        .to('.dream img', { opacity: .9, rotationY: 0, duration: 1.4, ease: 'expo.out' }, 0)
        .to(dws, { letterSpacing: function(i){ return ls[i]; }, duration: 2.2, ease: 'expo.out', stagger: .2 }, .15)
        .to(dls, { opacity: 1, yPercent: 0, rotationX: 0, duration: 1.2, ease: 'expo.out', stagger: .055 }, .15)
        .to(dls, { fontWeight: function(i, el){ return +getComputedStyle(el.parentNode).fontWeight; }, duration: 1.3, ease: 'power2.inOut', stagger: .055 }, .6);
    }, { threshold: .5 });
    root._dreamIO.observe($('.dream__words'));
  }
  $$('.rule').forEach(function(r){
    var line = r.querySelector('.rule__line'), glint = r.querySelector('i');
    add(gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: r, start: 'top 98%', end: 'top 65%', scrub: true } }));
    add(gsap.fromTo(glint, { '--p': '-12%' }, { '--p': '100%', ease: 'none', scrollTrigger: { trigger: r, start: 'top bottom', end: 'top 20%', scrub: true } }));
  });
}

/* ---------- smooth scroll ---------- */
var lenis = null;
if (hasGsap && window.Lenis && !reduce) {
  lenis = new Lenis({ lerp: .15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function(time){ lenis.raf(time * 1000); }); gsap.ticker.lagSmoothing(0);
  lenis.stop();
}
if (hasGsap) {
  addEventListener('load', function(){ ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ ScrollTrigger.refresh(); });
}

/* ---------- magnetic button ---------- */
if (fine && hasGsap && !reduce) {
  var mg = $('#magnet'), mx = gsap.quickTo(mg, 'x', { duration: .5, ease: 'power3' }), my = gsap.quickTo(mg, 'y', { duration: .5, ease: 'power3' });
  mg.addEventListener('mousemove', function(e){ var r = mg.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * .35); my((e.clientY - r.top - r.height / 2) * .45); });
  mg.addEventListener('mouseleave', function(){ mx(0); my(0); });
}

/* ---------- gate: counter, frame 9:16 -> 16:9, the showreel inside, then choose a language ---------- */
var reel = $('#reel'), rf = $('#reelFrame'), frame = $('#gateFrame'), gate = $('#gate');
var REEL = 'https://player.vimeo.com/video/1182382291?h=4d10b0f514&background=1&autoplay=1&muted=1&loop=1&playsinline=1&autopause=0&dnt=1';
function coverReel(){ var w = reel.clientWidth, h = reel.clientHeight, R = 16 / 9; rf.style.width = Math.max(w, h * R) + 'px'; rf.style.height = Math.max(h, w / R) + 'px'; }
function syncReel(){ var r = frame.getBoundingClientRect(); reel.style.left = r.left + 'px'; reel.style.top = r.top + 'px'; reel.style.width = r.width + 'px'; reel.style.height = r.height + 'px'; reel.style.borderRadius = getComputedStyle(frame).borderRadius; coverReel(); }
addEventListener('resize', function(){ if (reel.classList.contains('is-gate')) syncReel(); else coverReel(); });
function enterSite(){
  reel.classList.remove('is-gate'); ['left', 'top', 'width', 'height', 'borderRadius', 'opacity'].forEach(function(k){ reel.style[k] = ''; });
  // the site always opens at its top, whatever the browser remembered from a previous visit
  scrollTo(0, 0); lenis && lenis.scrollTo(0, { immediate: true, force: true });
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
    setTimeout(res, 2200);
  });
  if (!hasGsap || reduce) {
    frame.style.width = endW + 'px'; frame.style.height = endW * 9 / 16 + 'px'; syncReel(); reel.style.opacity = 1;
    ['#gateLogo', '#gatePrompt', '#gateLangs'].forEach(function(s){ $(s).style.opacity = 1; }); count.textContent = '100'; $('#gateRatio').textContent = '16:9'; arm();
  } else {
    var c = { v: 0 }, upd = function(){ count.textContent = String(Math.round(c.v)).padStart(3, '0'); };
    var tl = gsap.timeline({ onUpdate: syncReel });
    tl.to('#gateLogo', { opacity: 1, duration: .4 })
      .from(frame, { opacity: 0, scale: .9, duration: .5, ease: 'expo.out' }, '<')
      .to(c, { v: 62, duration: .8, ease: 'power2.inOut', onUpdate: upd })
      .to(frame, { width: endW, height: endW * 9 / 16, duration: .7, ease: 'expo.inOut', onStart: function(){ $('#gateRatio').textContent = '16:9'; } }, '-=.4');
    ready.then(function(){
      gsap.timeline({ delay: Math.max(0, tl.duration() - tl.time()), onUpdate: syncReel })
        .to(c, { v: 100, duration: .45, ease: 'power2.out', onUpdate: upd })
        .to(reel, { opacity: 1, duration: .6 }, '-=.3')
        .to(['#gatePrompt', langs], { opacity: 1, duration: .45, stagger: .08, onComplete: arm }, '-=.35');
    });
  }
  btns.forEach(function(b){ b.addEventListener('click', function(){
    langs.classList.remove('is-on'); btns.forEach(function(x){ x.disabled = true; });
    if (b.dataset.lang !== lang) setLang(b.dataset.lang); else store('sn-lang', lang);
    if (!hasGsap || reduce) { enterSite(); return; }
    var r = frame.getBoundingClientRect();
    gsap.set(frame, { position: 'fixed', left: r.left, top: r.top, width: r.width, height: r.height, margin: 0 });
    gsap.timeline({ onComplete: enterSite, onUpdate: syncReel })
      .to([langs, '#gatePrompt', '.gate__meta', '#gateLogo', '#gateRatio', '.gate__corner'], { opacity: 0, duration: .3 }, 0)
      .to(frame, { left: 0, top: 0, width: innerWidth, height: innerHeight, borderRadius: 0, borderColor: 'rgba(255,255,255,0)', duration: .8, ease: 'expo.inOut' }, .08);
  }); });
}

/* ---------- boot ---------- */
setLang(store('sn-lang') || 'he');
renderBrands();
renderDream();
syncReel();
startGate();
var rt; addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){ hasGsap && ScrollTrigger.refresh(); layoutDeck(); featLayout(); quotesLayout(); }, 250); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ quotesLayout(true); });
})();
