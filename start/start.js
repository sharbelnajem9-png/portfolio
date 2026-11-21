/* דף הנחיתה: הבעיה, הפתרון, התהליך, מה מקבלים, תוצאות, בואו נדבר.
   אותה שפה כמו האתר: הציור ברקע (bg.js) נבנה בכניסה ומתהפך בהחלפת שפה ובהיר/כהה, והכותרות בסגנון השם.
   הטופס ומערכת הלידים (Web3Forms, Pantry, הצפנה) נשארו בדיוק כמו בדף הקודם */
(function(){
'use strict';
var root = document.documentElement, C = window.SN_CONTENT || { quotes: [], logos: [] };
var $ = function(s, c){ return (c || document).querySelector(s); };
var $$ = function(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function store(k, v){ try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

/* ---------- התוכן ---------- */
var T = {
  he: {
    nav: ['הבעיה', 'הפתרון', 'מי אני', 'התהליך', 'מה מקבלים', 'תוצאות'], navCta: 'בואו נדבר',
    heroLabel: 'אסטרטגיה והפקת תוכן לבעלי עסקים, ארגונים וחברות',
    h1a: 'פחות תדמית.', h1b: 'יותר אמת.',
    heroSub: 'אני בונה לעסק שלכם אסטרטגיה מהשורש ומפיק את התוכן שמספר אותה - כדי שהקהל הנכון יבין מי אתם, יבחר בכם, וישלם על זה.',
    heroBtn: 'בואו נדבר', heroBtn2: 'לראות תוצאות', heroNote: 'אני עובד עם <b>2 עסקים בחודש</b> בלבד.',
    probLabel: 'הבעיה', probTitle: 'למה התוכן לא עובד',
    probs: [['מצלמים בלי למה', 'סרטונים יפים בלי אסטרטגיה מאחוריהם הם קישוט, לא שיווק. הצופה רואה וממשיך הלאה.'],
            ['נראים כמו כולם', 'רפרנסים, טרנדים ותבניות. בסוף הקהל לא מבדיל ביניכם לבין המתחרה - ובוחר לפי מחיר.'],
            ['אין לכם זמן לזה', 'לחשוב, לכתוב, לצלם ולערוך כל שבוע - זה עוד עסק שלם. ואתם כבר מנהלים אחד.']],
    solLabel: 'הפתרון', s1: 'קודם למה.', s2: 'אחר כך איך.',
    solText: 'שותף אחד לשני הצדדים. קודם אני מבין לעומק מי אתם, מה אתם מוכרים ולמי, ובונה מזה אסטרטגיה ובנק מסרים. אחר כך אני מפיק את התוכן בעצמי: תסריט, צילום ועריכה. בלי רפרנסים ובלי תבניות - DNA אחד, שלכם.',
    eq: ['אסטרטגיה', 'הפקה', 'תוכן שמביא את הקהל הנכון'],
    abTitle: 'שרבל נג׳ם', abRole: 'אסטרטג שיווק, יוצר תוכן ומומחה לסטוריטלינג.',
    ab1: 'צלם מקצועי ויוצר תוכן שיווקי ומסחרי, מתמחה בהפקת וידאו ברמה גבוהה בתחומי הסושיאל, לייף סטייל, תיירות ותוכן מותגי. עם ניסיון מוכח בפרויקטים עשירים ויזואלית, כל אחד בנוי סביב מטרה אסטרטגית ברורה.',
    ab2: 'כל פרויקט מתחיל מהבנה מעמיקה של המותג - הזהות שלו, קהל היעד והמטרות. מכיוון קריאייטיבי ותסריט ועד לעריכה הסופית, כל פרט מעוצב כדי להגיע לקהל הנכון ולייצר אימפקט מדיד.',
    abWho: 'עובד עם יזמים, יוצרים, בעלי שליחות ועסקי תיירות.',
    stepsLabel: 'התהליך', stepsTitle: 'ארבעה שלבים',
    steps: [['אפיון', 'שני מפגשי עומק, אישי ועסקי, שמוציאים את ה-DNA שלכם: מי אתם, מה אתם מציעים, ולמי.'],
            ['אסטרטגיה', 'תוכנית שיווקית, מסרי על, ערוצים ובנק מסרים בטון שהוא שלכם.'],
            ['הפקה', 'תסריטים, צילום ועריכה. האסטרטגיה הופכת לסרטונים מוכנים לפרסום.'],
            ['ליווי', 'אחרי המסירה ממשיכים יחד: בודקים מה עובד, מחדדים, ומכוונים את הצעד הבא.']],
    offLabel: 'מה מקבלים', offTitle: 'שלוש דרכים לעבוד יחד', chip: 'מומלץ',
    offers: [{ t: 'אפיון ואסטרטגיה', tag: 'הכיוון', items: ['שאלון אישי ושאלון עסקי', 'שני מפגשי עומק', 'בנק מסרים', 'אסטרטגיה מלאה'], for: 'כשיש לכם מי שמפיק, וחסר הכיוון.' },
             { t: 'התהליך המלא', tag: 'מהלמה ועד המסך', items: ['האפיון והאסטרטגיה', 'תסריטים, צילום ועריכה', '8 סרטונים מוכנים', 'ליווי וחידוד'], for: 'כשאתם רוצים שהכל יקרה במקום אחד, מאותו ראש.', hi: true },
             { t: 'הפקה', tag: 'הביצוע', items: ['תסריטים', 'יום צילום', 'עריכה', '8 סרטונים מוכנים'], for: 'כשהמסר ברור, וחסר מי שיביא אותו למסך.' }],
    fitTitle: 'מתאים לכם אם',
    fit: ['יש לכם עסק מבוסס, ארגון או חברה עם מוצר טוב.', 'אתם רוצים שהקהל יבין מי אתם ולמה לבחור בכם.', 'אתם רוצים להתבדל, לא להיות עוד אחד בפיד.'],
    resLabel: 'תוצאות', resTitle: 'תוצאות, במילים שלהם', watch: 'צפייה', allWork: 'לכל העבודות',
    cases: [{ big: '2 ימים', txt: 'פרויקט תדמית ענק, עם תוצאה שנראית כמו חודשים של צוות שלם.', who: 'חיל התקשוב · קריית התקשוב' },
            { big: '×3', txt: 'המכירות שולשו, בזכות מיתוג אישי מדויק וסרטונים אורגניים.', who: 'נאדנד' },
            { big: 'סולד אאוט', txt: 'קמפיין בכמה לוקיישנים, והכרטיסים נגמרו תוך זמן קצר מאוד.', who: 'עמותת זמן גליל מערבי' },
            { big: '35+', txt: 'סרטונים, לצד תכנון שיווקי מחדש ומיתוג אישי.', who: 'בלנדר' }],
    quotesTitle: 'המלצות', quotesLabel: 'מה אומרים הלקוחות', brandsLabel: 'עבדתי עם',
    ctLabel: 'בואו נדבר', ctTitle: 'רוצים להיות הבאים?',
    ctText: 'אני עובד עם 2 עסקים בחודש בלבד. ספרו לי על העסק שלכם, ואחזור אליכם בוואטסאפ תוך 24 שעות.', wa: 'מעדיפים לדבר עכשיו? וואטסאפ',
    fName: 'שם מלא', fPhone: 'וואטסאפ', fEmail: 'מייל (אופציונלי)', fAbout: 'על העסק. מה אתם עושים ולמי?',
    consent: 'קראתי את <a data-legal="privacy">מדיניות הפרטיות</a> ומסכים/ה לשמירת הפרטים שלי לצורך יצירת קשר חוזר.',
    send: 'שלח', consentAlert: 'יש לאשר את מדיניות הפרטיות לפני שליחה',
    privacyNote: 'הפרטים שלך נשמרים במערכת ניהול הלידים שלי ונשלחים אליי במייל. <a data-legal="privacy">פרטים מלאים במדיניות הפרטיות</a>.',
    tyTitle: 'נשלח, תודה!', tyText: 'קיבלתי את הפרטים. חוזר אליכם בוואטסאפ תוך 24 שעות. בינתיים מוזמנים לצפות בעבודות שלי, או לפנות אליי ישירות:', tyWork: 'לתיק העבודות', tyWa: 'שלח וואטסאפ',
    copyright: '© 2026 שרבל נג׳ם. כל הזכויות שמורות.', lAccess: 'נגישות', lPrivacy: 'מדיניות פרטיות', lTerms: 'תנאי שימוש',
    lang: 'EN', langLabel: 'Switch to English', themeLabel: 'מצב בהיר או כהה', close: 'סגירה'
  },
  en: {
    nav: ['Problem', 'Solution', 'About', 'Process', 'Offer', 'Results'], navCta: "Let's Talk",
    heroLabel: 'Strategy & content production for business owners, organizations and companies',
    h1a: 'Less image.', h1b: 'More truth.',
    heroSub: 'I build your business a strategy from the roots and produce the content that tells it - so the right audience understands who you are, chooses you, and pays for it.',
    heroBtn: "Let's Talk", heroBtn2: 'See Results', heroNote: 'I work with only <b>2 businesses a month</b>.',
    probLabel: 'The Problem', probTitle: "Why Content Doesn't Work",
    probs: [['Filming without a why', 'Beautiful videos with no strategy behind them are decoration, not marketing. People watch, and scroll on.'],
            ['Looking like everyone', "References, trends and templates. In the end your audience can't tell you from a competitor - so they choose on price."],
            ['No time for it', 'Thinking, writing, filming and editing every week is a whole other business. And you already run one.']],
    solLabel: 'The Solution', s1: 'Why first.', s2: 'Then how.',
    solText: 'One partner for both sides. First I get to know, in depth, who you are, what you sell and to whom, and turn it into a strategy and a message bank. Then I produce the content myself: script, shoot and edit. No references, no templates - one DNA, yours.',
    eq: ['Strategy', 'Production', 'Content that brings the right audience'],
    abTitle: 'Sharbel Najem', abRole: 'Marketing strategist, content creator and storytelling specialist.',
    ab1: 'A professional filmmaker and commercial content creator, focused on producing high-end video content across social media, lifestyle, tourism, and brand storytelling. With a proven track record in visually rich projects, each one built around a clear strategic objective.',
    ab2: 'Every project begins with a deep understanding of the brand - its identity, audience, and goals. From creative direction and scripting to the final edit, every detail is crafted to connect with the right audience and deliver measurable impact.',
    abWho: 'I work with entrepreneurs, creators, mission-driven people and tourism businesses.',
    stepsLabel: 'The Process', stepsTitle: 'Four Steps',
    steps: [['Discovery', 'Two deep sessions, personal and business, that bring out your DNA: who you are, what you offer, and to whom.'],
            ['Strategy', 'A marketing plan, core messages, channels and a message bank in a voice that is yours.'],
            ['Production', 'Scripts, shoot and edit. The strategy becomes videos ready to publish.'],
            ['Follow-through', 'After delivery we keep going together: see what works, refine, and set the next move.']],
    offLabel: 'What You Get', offTitle: 'Three Ways to Work Together', chip: 'Recommended',
    offers: [{ t: 'Discovery & Strategy', tag: 'The direction', items: ['Personal and business questionnaires', 'Two deep sessions', 'A message bank', 'A full strategy'], for: 'When you have someone to produce, and need the direction.' },
             { t: 'The Full Process', tag: 'From why to screen', items: ['Discovery and strategy', 'Scripts, shoot and edit', '8 ready-to-publish videos', 'Follow-through and refinement'], for: 'When you want it all in one place, from one mind.', hi: true },
             { t: 'Production', tag: 'The execution', items: ['Scripts', 'A shoot day', 'Editing', '8 ready-to-publish videos'], for: 'When the message is clear, and you need someone to bring it to the screen.' }],
    fitTitle: "It's for you if",
    fit: ['You run an established business, organization or company with a great product.', 'You want your audience to understand who you are and why to choose you.', 'You want to stand out, not be one more in the feed.'],
    resLabel: 'Results', resTitle: 'Results, in Their Words', watch: 'Watch', allWork: 'See all my work',
    cases: [{ big: '2 Days', txt: "A huge brand project, with a result that looks like months of a full team's work.", who: 'ICT Corps · ICT Campus' },
            { big: '×3', txt: 'Sales tripled, through precise personal branding and organic videos.', who: 'Naadned' },
            { big: 'Sold Out', txt: 'A multi-location campaign, and the tickets sold out very quickly.', who: 'Western Galilee Time' },
            { big: '35+', txt: 'Videos, alongside a marketing redesign and personal branding.', who: 'Blendar' }],
    quotesTitle: 'Testimonials', quotesLabel: 'What Clients Say', brandsLabel: 'Trusted By',
    ctLabel: "Let's Talk", ctTitle: 'Want to Be Next?',
    ctText: "I work with only 2 businesses a month. Tell me about your business and I'll get back to you on WhatsApp within 24 hours.", wa: 'Rather talk now? WhatsApp',
    fName: 'Full name', fPhone: 'WhatsApp', fEmail: 'Email (optional)', fAbout: 'About the business. What do you do, and for whom?',
    consent: 'I have read the <a data-legal="privacy">privacy policy</a> and agree to my details being stored for the purpose of follow-up contact.',
    send: 'Send', consentAlert: 'Please accept the privacy policy before sending',
    privacyNote: 'Your details are stored in my lead management system and sent to me by email. <a data-legal="privacy">Full details in the privacy policy</a>.',
    tyTitle: 'Sent. Thanks!', tyText: "Got your details. I'll reach out on WhatsApp within 24 hours. Meanwhile, feel free to browse my work, or reach me directly:", tyWork: 'My portfolio', tyWa: 'Send a WhatsApp',
    copyright: '© 2026 Sharbel Najem. All rights reserved.', lAccess: 'Accessibility', lPrivacy: 'Privacy Policy', lTerms: 'Terms of Use',
    lang: 'עב', langLabel: 'עברו לעברית', themeLabel: 'Light or dark mode', close: 'Close'
  }
};
var lang = store('sn-lang') === 'en' ? 'en' : 'he';
var L = function(){ return T[lang]; };
// הסרטונים מאחורי התוצאות (מהאתר): קריית התקשוב, נאדנד, זמן גליל מערבי, בלנדר
var CASES = [{ v: '1181259173', h: 'ecb3db2a7b', o: 'l', poster: '../media/p1181259173.jpg' }, { v: '1181225482', h: 'b027619c83', o: 'p', poster: '../media/p1181225482.jpg' },
             { v: '1181263657', h: '9980864011', o: 'l', poster: '../media/p1181263657.jpg' }, { v: '1181129583', h: 'a4e0378bd0', o: 'p', poster: '../media/p1181129583.jpg' }];
var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
var PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>';

/* ---------- כותרות בסגנון השם (אותו מנוע כמו באתר): העובי עולה מדק לעבה, והאוויר בין האותיות נמדד מהדיו שלהן ---------- */
var TS = { S: 120, W: 300, H: 230, B: 170, X: 60, tight: -.03, ready: false }, tsCache = {};
var tsCv = document.createElement('canvas'); tsCv.width = TS.W; tsCv.height = TS.H;
var tsCx = tsCv.getContext('2d', { willReadFrequently: true });
var TS_MARK = /[׳״'"]/;
var TS_STOPS = [[201, 207, 217], [226, 228, 232], [242, 242, 240]], TS_LIGHT = [[111, 127, 151], [62, 68, 80], [20, 21, 24]];
function tsStops(el){ return root.dataset.theme === 'light' && !(el && el.closest('.lp-hero')) ? TS_LIGHT : TS_STOPS; }
function tsMix(p, st){ var a = p < .5 ? st[0] : st[1], b = p < .5 ? st[1] : st[2], t = p < .5 ? p * 2 : (p - .5) * 2; return 'rgb(' + a.map(function(c, i){ return Math.round(c + (b[i] - c) * t); }).join(',') + ')'; }
function tsFont(only){ return (only || lang) === 'he' ? { fam: 'Noto Sans Hebrew', st: 'extra-condensed', lo: 100, hi: 900, ref: 'ה' } : { fam: 'Georama', st: 'extra-condensed', lo: 100, hi: 900, ref: 'H' }; }
function tsWeight(f, p){ return Math.round(f.lo + (f.hi - f.lo) * p); }
function tsGlyph(ch, f, w, dy){
  var key = ch + '|' + f.fam + '|' + w + '|' + (dy || 0); if (tsCache[key]) return tsCache[key];
  var c = tsCx; c.clearRect(0, 0, TS.W, TS.H); c.font = w + ' ' + TS.S + 'px "' + f.fam + '"'; c.fontStretch = f.st; c.direction = 'ltr'; c.textBaseline = 'alphabetic';
  c.fillText(ch, TS.X, TS.B + (dy || 0));
  var d = c.getImageData(0, 0, TS.W, TS.H).data, Lr = [], Rr = [], x0 = TS.W, x1 = -1, y0 = TS.H;
  for (var y = 0; y < TS.H; y++) { var a = -1, b = -1;
    for (var x = 0; x < TS.W; x++) if (d[(y * TS.W + x) * 4 + 3] > 90) { if (a < 0) a = x; b = x; }
    Lr[y] = a; Rr[y] = b; if (a >= 0) { if (a < x0) x0 = a; if (b > x1) x1 = b; if (y < y0) y0 = y; } }
  return tsCache[key] = { L: Lr, R: Rr, x0: x0, x1: x1, y0: y0, adv: c.measureText(ch).width, il: x0 - TS.X, ir: x1 - TS.X };
}
function tsGap(A, B, band, Tt, D, clear){
  var sum = 0, cnt = 0, minRaw = 1e9;
  for (var y = band[0]; y <= band[1]; y += 2) {
    var ra = A.R[y] < 0 ? D : A.x1 - A.R[y], lb = B.L[y] < 0 ? D : B.L[y] - B.x0;
    if (A.R[y] >= 0 && B.L[y] >= 0) minRaw = Math.min(minRaw, ra + lb);
    sum += Math.min(ra, D) + Math.min(lb, D); cnt++;
  }
  var g = Tt - sum / cnt; if (minRaw < 1e9) g = Math.max(g, clear - minRaw); return g;
}
// byWord: כל מילה בעובי ובצבע אחידים, והמילים מתעבות אחת אחרי השנייה (המוטו); only: שפה קבועה לכותרת
function typeset(el, text, mask, byWord, only){
  if (!el) return; text = String(text).trim();
  if (!TS.ready) { el.innerHTML = text.split(' ').map(function(w){ return mask ? '<span class="mask"><span>' + esc(w) + '</span></span>' : esc(w); }).join(' '); return; }
  var stops = tsStops(el), f = tsFont(only), rtl = (only || lang) === 'he', S = TS.S, ref = tsGlyph(f.ref, f, tsWeight(f, .5)), band = [ref.y0, TS.B];
  if (!rtl) text = text.toUpperCase();
  var words = text.split(/\s+/).filter(Boolean).map(function(w){ return Array.from(w); });
  var n = words.reduce(function(a, w){ return a + w.length; }, 0), i = 0;
  el.innerHTML = words.map(function(wd, wi){
    var it = wd.map(function(ch){
      var p = byWord ? (words.length > 1 ? wi / (words.length - 1) : 0) : (n > 1 ? i / (n - 1) : 0); i++;
      var w = tsWeight(f, byWord ? .125 + .75 * p : p), g = tsGlyph(ch, f, w), dy = 0;
      if (TS_MARK.test(ch)) { dy = ref.y0 - g.y0; g = tsGlyph(ch, f, w, dy); }
      return { ch: ch, p: p, w: w, g: g, dy: dy, m: null, ix: i - 1 };
    });
    for (var k = 0; k < it.length - 1; k++) {
      var a = it[k], b = it[k + 1], vl = rtl ? b : a, vr = rtl ? a : b;
      var gap = tsGap(vl.g, vr.g, band, (.05 + TS.tight + .022 * (a.p + b.p) / 2) * S, .13 * S, .014 * S);
      a.m = (gap - (vl.g.adv + vr.g.il - vl.g.ir)) / S;
    }
    var inner = it.map(function(x){
      return '<span class="tl" style="--i:' + x.ix + ';color:' + tsMix(x.p, stops) + ';font-weight:' + x.w + (x.m === null ? '' : ';margin-inline-end:calc(' + x.m.toFixed(4) + 'em + var(--br))') + (x.dy ? ';top:' + (x.dy / S).toFixed(4) + 'em' : '') + '">' + esc(x.ch) + '</span>';
    }).join('');
    return mask ? '<span class="mask"><span class="tw">' + inner + '</span></span>' : '<span class="tw">' + inner + '</span>';
  }).join(' ');
  el.classList.add('ts'); el.classList.toggle('ts-en', only === 'en'); tsFit(el);
}
function tsFit(el){
  el.style.fontSize = ''; var avail = el.clientWidth, need = el.scrollWidth;
  if (avail > 0 && need > avail + 1) el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * avail / need * .985).toFixed(2) + 'px';
}
var tsFitT; addEventListener('resize', function(){ clearTimeout(tsFitT); tsFitT = setTimeout(function(){ $$('.ts').forEach(tsFit); }, 200); });
function tsHeads(){
  var t = L();
  typeset($('#h1a'), t.h1a, true); typeset($('#h1b'), t.h1b, true);
  typeset($('#s1'), t.s1); typeset($('#s2'), t.s2);
  $$('.h2').forEach(function(el){ typeset(el, t[el.dataset.t] || el.textContent); });
  typeset($('#motto'), 'Dream Create Share Sell', false, true, 'en');   // המוטו: ארבע מילים, כל אחת עבה מהקודמת
}
var fontsReady = Promise.all([100, 300, 500, 700, 900].map(function(w){ return document.fonts.load('extra-condensed ' + w + ' 40px "Georama"', 'LESSIMAGE'); })
  .concat([100, 300, 500, 700, 900].map(function(w){ return document.fonts.load('extra-condensed ' + w + ' 40px "Noto Sans Hebrew"', 'פחותתדמיתה'); })))
  .then(function(){ TS.ready = true; tsCache = {}; tsHeads(); }, function(){});

/* ---------- בניית הדף בשפה הנוכחית ---------- */
function render(){
  var t = L(), he = lang === 'he';
  root.lang = lang; root.dir = he ? 'rtl' : 'ltr';
  $$('[data-t]').forEach(function(el){ var v = t[el.dataset.t]; if (typeof v === 'string') el.textContent = v; });
  $$('[data-th]').forEach(function(el){ el.innerHTML = t[el.dataset.th]; });
  $$('[data-nav]').forEach(function(el){ el.textContent = t.nav[+el.dataset.nav]; });
  $('#probs').innerHTML = t.probs.map(function(p, i){ return '<div class="lp-prob rv" style="--d:' + i * 90 + 'ms"><span class="lp-prob__n">0' + (i + 1) + '</span><h3 class="lp-prob__t">' + esc(p[0]) + '</h3><p class="lp-prob__d">' + esc(p[1]) + '</p></div>'; }).join('');
  $('#eq').innerHTML = '<span class="lp-pill">' + esc(t.eq[0]) + '</span><span class="lp-op">+</span><span class="lp-pill">' + esc(t.eq[1]) + '</span><span class="lp-op">=</span><span class="lp-pill lp-pill--hi">' + esc(t.eq[2]) + '</span>';
  $('#steps').innerHTML = t.steps.map(function(s, i){ return '<div class="lp-step rv" style="--d:' + i * 90 + 'ms"><span class="lp-step__n">0' + (i + 1) + '</span><h3>' + esc(s[0]) + '</h3><p>' + esc(s[1]) + '</p></div>'; }).join('');
  // מה מקבלים: קומפוזיציה של מונדריאן - שלושה משטחי צבע וקווים שחורים עבים. נבנית כשמגיעים אליה (הקווים נמתחים, הצבע נשפך)
  $('#offers').innerHTML = '<div class="lp-mond rvm">' + t.offers.map(function(o, i){
    return '<div class="lp-pan lp-pan--' + 'abc'[i] + (o.hi ? ' lp-pan--hi' : '') + '" style="--k:' + i + '"><div class="lp-pan__in">' + (o.hi ? '<span class="lp-pan__chip">' + esc(t.chip) + '</span>' : '') +
      '<h3>' + esc(o.t) + '</h3><p class="lp-pan__tag">' + esc(o.tag) + '</p><ul>' + o.items.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul><p class="lp-pan__for">' + esc(o.for) + '</p></div></div>';
  }).join('') + '</div>';
  // מתאים לכם אם: משפטים גדולים שנכתבים מילה אחרי מילה עם הגלילה
  $('#fit').innerHTML = t.fit.map(function(x){ return '<li class="lp-words">' + x.split(' ').map(function(w){ return '<span class="wd">' + esc(w) + '</span>'; }).join(' ') + '</li>'; }).join('');
  $('#cases').innerHTML = t.cases.map(function(c, i){
    var m = CASES[i];
    return '<button type="button" class="lp-case rv" style="--d:' + i * 90 + 'ms" data-case="' + i + '" aria-label="' + esc(t.watch + ': ' + c.who) + '"><img src="' + m.poster + '" alt="" loading="lazy" decoding="async"><span class="lp-case__play" aria-hidden="true">' + PLAY + '</span>' +
      '<span class="lp-case__body"><span class="lp-case__big' + (/[֐-׿]/.test(c.big) ? ' he">' + bigNum(c.big) : '"><bdi dir="ltr">' + bigNum(c.big) + '</bdi>') + '</span><span class="lp-case__txt">' + esc(c.txt) + '</span><span class="lp-case__who">' + esc(c.who) + '</span></span></button>';
  }).join('');
  // המלצות ולוגואים: רצועות שתמיד זזות, בעברית ימינה ובאנגלית שמאלה
  renderQuotes();
  var lg = C.logos || [], half = Math.ceil(lg.length / 2);
  $('#logos').innerHTML = [lg.slice(0, half), lg.slice(half)].map(function(r, k){
    var items = r.map(function(src){ return '<span class="logo-item"><img src="../' + src + '" alt="" loading="lazy"></span>'; }).join('');
    return '<div class="marquee' + (k ? ' rev' : '') + '" dir="ltr"><div class="marquee__row" style="--dur:' + (40 + k * 8) + 's">' + items + items + '</div></div>';
  }).join('');
  var sl = $('.lp-lead'); sl.classList.add('lp-words'); sl.innerHTML = t.solText.split(' ').map(function(w){ return '<span class="wd">' + esc(w) + '</span>'; }).join(' ');
  var nl = $('#navLang'); nl.textContent = t.lang; nl.setAttribute('aria-label', t.langLabel);
  $('#themeBtn').setAttribute('aria-label', t.themeLabel);
  tsHeads(); armReveal(); window.navSpyRefresh && navSpyRefresh();
}

/* ---------- המלצות: אותה רצועה כמו בתיק העבודות - כרטיסים שווים, הטקסט ממלא כל כרטיס, הכרטיס שמגיע למרכז
   יוצא קדימה בתלת-ממד והכוכבים שלו נדלקים אחד אחד. הרצועה זזה כל הזמן; הקשה או גרירה מחליקות ומיד ממשיכות ---------- */
var isPhone = function(){ return innerWidth <= 760; };
var Q = { x: 0, tx: null, w: 0, vw: 0, cx: [], cards: [], row: null, inV: false, hold: 0, drag: null, last: 0, running: false };
function renderQuotes(){
  var d = lang === 'he' ? 'rtl' : 'ltr', stars = '<i>★</i><i>★</i><i>★</i><i>★</i><i>★</i>';
  var cards = (C.quotes || []).map(function(q){
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
function quotesTick(t){
  var dt = Math.min(50, t - (Q.last || t)); Q.last = t;
  if (Q.row && Q.p && (Q.inV || Q.drag)) {
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
    if (!Q.drag) return; var dd = Q.drag; Q.drag = null;
    if (dd.moved) { Q.hold = Date.now() + 600; return; }
    var c = e && e.target && e.target.closest && e.target.closest('.quote');
    if (c) quotesGo(Q.cards.indexOf(c));
  };
  addEventListener('pointerup', end); addEventListener('pointercancel', function(){ end(null); });
  addEventListener('resize', function(){ clearTimeout(Q.rt); Q.rt = setTimeout(function(){ quotesLayout(); }, 250); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ quotesLayout(true); });
})();

/* ---------- נחשף כשמגיעים: כרטיסים עולים, קו המחיקה נמתח על כל בעיה, הקו של התהליך נמתח ---------- */
// אלמנט שנפתח מתוך clip-path סגור לא נחשב גלוי לדפדפן - לכן עוקבים אחרי האזור שמכיל אותו ופותחים את מה שבתוכו
var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { if (e.target._kids) $$(e.target._kids, e.target).forEach(function(k){ k.classList.add('in'); }); else e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -10% 0px', threshold: .05 }) : null;
// מספר גדול בתוצאה (2 / ×3 / 35+) סופר מאפס כשהכרטיס נפתח
function bigNum(s){ return esc(s).replace(/\d+/, function(n){ return '<span class="cnt" data-to="' + n + '">' + n + '</span>'; }); }
function countUp(el){
  if (el._done) return; el._done = true; var to = +el.dataset.to, t0 = performance.now();
  if (reduce) return; el.textContent = '0';
  (function step(now){ var p = Math.min(1, (now - t0) / 1300), e = 1 - Math.pow(1 - p, 3); el.textContent = String(Math.round(to * e)); if (p < 1) requestAnimationFrame(step); })(t0);
}
var cio = ('IntersectionObserver' in window) ? new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } }); }, { threshold: .6 }) : null;
// מילים שמתמלאות לפי הגלילה (כמו בתיק העבודות)
function wordsTick(){
  requestAnimationFrame(wordsTick);
  $$('.lp-words').forEach(function(el){
    var r = el.getBoundingClientRect(); if (r.bottom < -50 || r.top > innerHeight + 50) return;
    var p = reduce ? 1 : Math.min(1, Math.max(0, (innerHeight * .9 - r.top) / (innerHeight * .45 + r.height)));
    var ws = el._ws || (el._ws = el.querySelectorAll('.wd')), n = ws.length, on = Math.round(p * n);
    if (el._on === on) return; el._on = on;
    for (var i = 0; i < n; i++) ws[i].classList.toggle('on', i < on);
  });
}
requestAnimationFrame(wordsTick);
function armReveal(){
  $$('.rv:not(.lp-case), #steps, #eq, .lp-about, .lp-contact').forEach(function(el){ if (!io || reduce) el.classList.add('in'); else if (!el.classList.contains('in')) io.observe(el); });
  [['#cases', '.lp-case'], ['#offers', '.lp-mond']].forEach(function(z){ var box = $(z[0]); box._kids = z[1]; if (!io || reduce) $$(z[1], box).forEach(function(k){ k.classList.add('in'); }); else io.observe(box); });
  $$('.cnt').forEach(function(el){ el._done = false; if (cio && !reduce) cio.observe(el); });
  $$('.lp-head').forEach(function(h){ h.classList.add('rv'); if (!io || reduce) h.classList.add('in'); else io.observe(h); });
}

/* ---------- בהיר / כהה: כמו באתר - המלבנים מתהפכים בגל שיוצא מהכפתור, וכל אזור מחליף צבע כשהגל מגיע אליו ---------- */
function autoTheme(){ var h = new Date().getHours(); return h >= 7 && h < 19 ? 'light' : 'dark'; }
function manualTheme(){ try { var s = JSON.parse(store('sn-theme') || 'null'); if (s && s.d === new Date().toDateString()) return s.t; } catch (e) {} return null; }
var themeT;
function applyTheme(t, anim, o){
  if (root.dataset.theme === t) return;
  var fx = !!(window.artFX && anim && !reduce), late = 0, blocks = $$('#nav, main > *');
  if (fx) {
    artFX.origin(o ? o[0] : innerWidth / 2, o ? o[1] : 0);
    blocks.forEach(function(el){
      var r = el.getBoundingClientRect(), y = Math.max(0, Math.min(innerHeight, r.top + Math.min(r.height, innerHeight) / 2));
      var d = Math.max(0, artFX.waveAt(r.left + r.width / 2, y) - .4); late = Math.max(late, d); el.style.setProperty('--td', d.toFixed(2) + 's');
    });
  }
  if (anim && !reduce) { root.classList.add('theme-anim'); clearTimeout(themeT); themeT = setTimeout(function(){ root.classList.remove('theme-anim'); blocks.forEach(function(el){ el.style.removeProperty('--td'); }); }, 950 + late * 1000); }
  root.dataset.theme = t;
  if (fx) setTimeout(tsHeads, 420); else tsHeads();
}
$('#themeBtn').addEventListener('click', function(){
  var t = root.dataset.theme === 'light' ? 'dark' : 'light', r = this.getBoundingClientRect();
  store('sn-theme', JSON.stringify({ t: t, d: new Date().toDateString() })); applyTheme(t, true, [r.left + r.width / 2, r.top + r.height / 2]);
});
setInterval(function(){ applyTheme(manualTheme() || autoTheme(), true); }, 60000);

/* ---------- שפה: הציור מתהפך בכיוון הקריאה של השפה החדשה, והתוכן נחשף באותו כיוון. נשארים באותו מקום בדף ---------- */
$('#navLang').addEventListener('click', function(){
  var to = lang === 'he' ? 'en' : 'he', m = $('main');
  var mid = document.elementFromPoint(innerWidth / 2, innerHeight / 2), sec = mid && mid.closest('section, footer'), off = sec ? sec.getBoundingClientRect().top : 0;
  var swap = function(){ lang = to; store('sn-lang', to); render(); if (sec) scrollTo(0, scrollY + sec.getBoundingClientRect().top - off); };
  if (reduce) { swap(); return; }
  window.artFX && artFX.flip(to === 'he' ? -1 : 1);
  m.style.transition = 'opacity .28s ease-in'; m.style.opacity = '0';
  setTimeout(function(){
    swap();
    m.style.transition = 'none'; m.style.setProperty('--sd', to === 'he' ? 'to left' : 'to right'); m.style.setProperty('--sw', '0'); m.classList.add('sweep'); m.style.opacity = '1';
    var t0 = performance.now();
    (function step(now){
      var p = Math.min(1, (now - t0) / 1350), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      m.style.setProperty('--sw', e.toFixed(4));
      if (p < 1) requestAnimationFrame(step); else { m.classList.remove('sweep'); m.style.removeProperty('--sw'); m.style.transition = ''; }
    })(t0);
  }, 290);
});

/* ---------- ניווט ---------- */
var sheet = $('#sheet'), menuBtn = $('#navMenu');
menuBtn.addEventListener('click', function(){ var o = !sheet.classList.contains('is-open'); sheet.classList.toggle('is-open', o); menuBtn.setAttribute('aria-expanded', String(o)); });
$$('a[href^="#"]').forEach(function(a){ a.addEventListener('click', function(){ sheet.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); }); });

/* ---------- צפייה בסרטון ---------- */
var vm = $('#vm');
function openVideo(m){
  vm.classList.toggle('p', m.o === 'p');
  $('#vmBox').innerHTML = '<iframe src="https://player.vimeo.com/video/' + m.v + '?h=' + m.h + '&autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=c9cfd9" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title=""></iframe>';
  vm.hidden = false; requestAnimationFrame(function(){ vm.classList.add('open'); }); $('#vmClose').focus();
}
function closeVideo(){ vm.classList.remove('open'); setTimeout(function(){ vm.hidden = true; $('#vmBox').innerHTML = ''; }, 450); }
$('#cases').addEventListener('click', function(e){ var b = e.target.closest('[data-case]'); if (b) openVideo(CASES[+b.dataset.case]); });
$('#vmClose').addEventListener('click', closeVideo);
vm.addEventListener('click', function(e){ if (e.target === vm) closeVideo(); });

/* ---------- מסמכים משפטיים ---------- */
window.openLegal = function(which){ var m = document.getElementById('modal-' + which); if (!m) return; m.classList.add('open'); document.body.style.overflow = 'hidden'; };
window.closeLegal = function(){ $$('.legal-modal-overlay.open').forEach(function(m){ m.classList.remove('open'); }); document.body.style.overflow = ''; };
document.addEventListener('click', function(e){ var a = e.target.closest('[data-legal]'); if (a) { e.preventDefault(); openLegal(a.dataset.legal); } });
document.addEventListener('keydown', function(e){ if (e.key === 'Escape') { closeLegal(); if (!vm.hidden) closeVideo(); } });

/* ---------- הטופס: שמירה במכשיר, בענן (Pantry, מוצפן כשאפשר) ושליחה במייל (Web3Forms) - בדיוק כמו בדף הקודם ---------- */
var WEB3FORMS_KEY = '7e9b87a8-9683-474a-a95c-d804549dbc61';
var PANTRY_ID = '8978df43-3859-46c3-be39-905e7a54e68b';
var PANTRY_URL = 'https://getpantry.cloud/apiv1/pantry/' + PANTRY_ID + '/basket/leads';
var PUBKEY_URL = 'https://getpantry.cloud/apiv1/pantry/' + PANTRY_ID + '/basket/pubkey';
var LEADS_KEY = 'sharbel_leads_v1';
async function fetchPublicKey(){
  try {
    var r = await fetch(PUBKEY_URL, { cache: 'no-store' });
    if (!r.ok) return null;
    var j = await r.json();
    if (!j || !j.publicJwk || !window.SNCrypto || !SNCrypto.available) return null;
    return await SNCrypto.importPublicKey(j.publicJwk);
  } catch (e) { return null; }
}
async function saveLeadToCloud(lead){
  try {
    var outbound = lead, publicKey = await fetchPublicKey();
    if (publicKey) { try { outbound = await SNCrypto.encryptLead(lead, publicKey); } catch (e) { console.warn('encryption failed, sending plaintext', e); } }
    var res = await fetch(PANTRY_URL), leads = [];
    if (res.ok) { var data = await res.json(); leads = Array.isArray(data.leads) ? data.leads : []; }
    leads.unshift(outbound);
    await fetch(PANTRY_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ leads: leads }) });
  } catch (err) { console.warn('Pantry save failed', err); }
}
async function submitForm(e){
  e.preventDefault();
  var form = e.target;
  if (!form.querySelector('#consent').checked) { alert(L().consentAlert); return; }
  var btn = form.querySelector('.submit-btn');
  btn.textContent = '⏳'; btn.disabled = true;
  var data = new FormData(form);
  var lead = {
    id: Date.now(), name: data.get('name') || '', phone: data.get('phone') || '', email: (data.get('email') || '').trim(), about: data.get('about') || '',
    budget: '—', date: new Date().toISOString(), status: 'new', notes: '',
    consent: { given: true, ts: new Date().toISOString(), policy_version: '2026-05-25' }
  };
  try { var existing = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]'); existing.unshift(lead); localStorage.setItem(LEADS_KEY, JSON.stringify(existing)); } catch (err) { console.warn('localStorage save failed', err); }
  saveLeadToCloud(lead);
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY, subject: '🔥 ליד חדש: ' + lead.name, from_name: 'Sharbel Najem · Lead Intake',
        replyto: lead.email || (lead.phone ? lead.phone + '@noreply.local' : undefined),
        'שם מלא': lead.name, 'וואטסאפ': lead.phone, 'מייל': lead.email || '—', 'על העסק': lead.about,
        'נשלח בתאריך': new Date().toLocaleString('he-IL'),
        'קישור וואטסאפ ישיר': lead.phone ? 'https://wa.me/' + (lead.phone.replace(/[^\d]/g, '').replace(/^0/, '972')) : '—'
      })
    });
  } catch (err) { console.warn('Web3Forms send failed (lead still saved locally)', err); }
  $('#leadForm').style.display = 'none';
  var ty = $('#thankYou'); ty.classList.add('show'); ty.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
$('#leadForm').addEventListener('submit', submitForm);
(function(){ var cb = $('#consent'), btn = $('.submit-btn'); function sync(){ btn.disabled = !cb.checked; } cb.addEventListener('change', sync); sync(); })();

/* ---------- השואוריל ברקע הפתיחה: נחשף בהתמזגות רכה רק כשהוא באמת מתנגן ---------- */
(function(){
  var box = $('#lpReel'), f = $('#lpReelFrame'); if (!box || !f) return;
  // הסרטון ממלא את כל הפתיחה בכל גודל מסך (בלי פסים): נמדד לפי הפתיחה עצמה
  var cover = function(){ var W = box.clientWidth, H = box.clientHeight, R = 16 / 9; f.style.width = Math.ceil(Math.max(W, H * R)) + 'px'; f.style.height = Math.ceil(Math.max(H, W / R)) + 'px'; };
  cover(); addEventListener('resize', cover); setTimeout(cover, 600);
  var on = function(){ box.classList.add('is-playing'); };
  if (window.Vimeo && Vimeo.Player) { try { var pl = new Vimeo.Player(f); pl.on('play', on); pl.on('timeupdate', function(d){ if (d && d.seconds > 0) on(); }); } catch (e) { on(); } }
  else f.addEventListener('load', function(){ setTimeout(on, 1200); }, { once: true });
})();

/* ---------- כניסה: הקווים של הציור נמתחים, והכותרת עולה ---------- */
render();
$('#nav').classList.add('is-on');
window.artFX && artFX.build();
Promise.race([fontsReady, new Promise(function(r){ setTimeout(r, 1400); })]).then(function(){ requestAnimationFrame(function(){ $('.lp-hero').classList.add('in'); }); });
})();
