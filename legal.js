/* המסמכים המשפטיים של תיק העבודות ודף הנחיתה - מקור אחד, בעברית ובאנגלית: מדיניות פרטיות (כולל עוגיות), הצהרת נגישות ותנאי שימוש.
   הכל כתוב לפי מה שקורה בפועל באתר (הכלים, הספקים, הטופס). כשמוסיפים כלי או ספק - מעדכנים כאן ואת התאריך. טיוטה מקצועית, כדאי שעו"ד יעבור עליה.
   עוד כאן: חלונית הסכמה לעוגיות שיווק (מופיעה רק כשיש בדף כלי שצריך הסכמה, כמו הפיקסל של מטא), והקישור "הגדרות עוגיות" בפוטר.
   קישור ישיר למסמך: #privacy, #terms, #accessibility (למשל כקישור למדיניות במודעות של מטא) */
(function(){
'use strict';
var root = document.documentElement;
var MAIL = 'sharbelnajem9@gmail.com', WA = '054-346-6880', WA_URL = 'https://wa.me/972543466880', VERSION = '2026-11-25';
var mail = '<a href="mailto:' + MAIL + '">' + MAIL + '</a>', wa = '<a href="' + WA_URL + '" target="_blank" rel="noopener noreferrer" dir="ltr">' + WA + '</a>';
function lang(){ return root.lang === 'en' ? 'en' : 'he'; }

var DOCS = {
  he: {
    privacy: { t: 'מדיניות פרטיות', b:
      '<p>כאן מוסבר איזה מידע נאסף בתיק העבודות sharbelnajem.pro ובדף הנחיתה sharbelnajem.pro/start, למה, איפה הוא נשמר ומה הזכויות שלך. המדיניות נכתבה לפי חוק הגנת הפרטיות, התשמ"א-1981 (כולל תיקון 13) ולפי סעיף 30א לחוק התקשורת.</p>' +
      '<h4>מי אחראי על המידע</h4><p>שרבל נג\'ם (Sharbel Najem Marketing Studio). לכל שאלה או בקשה: ' + mail + ' או בוואטסאפ ' + wa + '.</p>' +
      '<h4>איזה מידע נאסף</h4><ul>' +
        '<li><strong>מה שממלאים בטופס בדף הנחיתה:</strong> שם מלא, טלפון לוואטסאפ, מייל (לא חובה), כמה מילים על העסק, והאם ביקשת לקבל תוכן ועדכונים.</li>' +
        '<li><strong>מאיפה הגעת:</strong> אם הגעת ממודעה, שם המודעה או הקמפיין (מתוך הקישור עצמו) נשמר יחד עם הפנייה.</li>' +
        '<li><strong>מידע טכני:</strong> כמו בכל אתר, כתובת ה-IP וסוג הדפדפן מגיעים לספקים שמגישים את האתר, הסרטונים והגופנים (הפירוט למטה). אני לא אוסף את המידע הזה ולא משתמש בו.</li></ul>' +
        '<p>בתיק העבודות עצמו אין טופס, ולא נאסף בו מידע אישי.</p>' +
      '<h4>למה המידע משמש</h4><ul>' +
        '<li>כדי לחזור אליך לגבי הפנייה: שיחה, הצעת מחיר ותיאום.</li>' +
        '<li>אם סימנת שזה מעניין אותך, כדי לשלוח מדי פעם תוכן ועדכונים. אפשר להסיר את עצמך בכל רגע.</li>' +
        '<li>אם אישרת עוגיות שיווק, כדי למדוד אם מודעה הביאה פנייה ולשפר את המודעות.</li></ul>' +
        '<p>אני לא מוכר מידע ולא מעביר אותו לאחרים לשיווק שלהם.</p>' +
      '<h4>האם חובה למסור את המידע</h4><p>אין חובה לפי חוק למסור את המידע, והמסירה תלויה ברצונך. בלי שם וטלפון לא אוכל לחזור אליך.</p>' +
      '<h4>איפה המידע נשמר ומי מקבל אותו</h4><p>המידע עובר לספקים שעוזרים לי להפעיל את האתר, רק לצורך השירות שהם נותנים. חלקם פועלים מחוץ לישראל (בעיקר בארה"ב), כך שהמידע מועבר לחו"ל:</p><ul>' +
        '<li><strong>Web3Forms</strong> - שולח את הפנייה למייל שלי.</li>' +
        '<li><strong>Pantry</strong> - שומר את הפנייה בלוח הלידים הפרטי שלי. הפרטים מוצפנים כבר בדפדפן שלך, לפני שהם נשלחים, ורק אני יכול לפתוח אותם.</li>' +
        '<li><strong>GitHub Pages</strong> - מארח את האתר, ורושם כתובות IP לצורכי אבטחה ותפעול.</li>' +
        '<li><strong>Vimeo</strong> - מנגן את הסרטונים, במצב "ללא מעקב".</li>' +
        '<li><strong>Google Fonts</strong> - מגיש את הגופנים.</li>' +
        '<li><strong>UserWay</strong> - תפריט הנגישות, ששומר את ההגדרות שבחרת בו.</li>' +
        '<li><strong>Meta</strong> (פייסבוק ואינסטגרם) - רק בדף הנחיתה ורק אם אישרת עוגיות שיווק: פיקסל שמודד כניסה לדף ושליחת טופס. הוא לא מקבל את השם, הטלפון, המייל או את תוכן הפנייה.</li></ul>' +
        '<p>לכל ספק יש מדיניות פרטיות משלו.</p>' +
      '<h4 id="legal-cookies">עוגיות ואחסון במכשיר</h4><ul>' +
        '<li><strong>הכרחי ונוחות (תמיד פעיל):</strong> השפה שבחרת, מצב בהיר או כהה, הבחירה שלך לגבי עוגיות, הגדרות הנגישות, ועותק של הפנייה במכשיר שממנו שלחת. כל אלה נשמרים רק בדפדפן שלך.</li>' +
        '<li><strong>שיווק (רק בהסכמה):</strong> הפיקסל של מטא, שיוצר עוגייה משלו (_fbp) כדי למדוד מודעות.</li></ul>' +
        '<p>אפשר לשנות את הבחירה בכל רגע דרך "הגדרות עוגיות" בתחתית הדף, או למחוק עוגיות בהגדרות הדפדפן.</p>' +
      '<h4>כמה זמן המידע נשמר</h4><p>הפרטים נשמרים כל עוד הם רלוונטיים לקשר העסקי. אם עבדנו יחד, הם נשמרים עד 7 שנים, כנדרש לצורכי מס והנהלת חשבונות, ואחר כך נמחקים. אישור לקבלת תוכן ועדכונים נשמר עד שמבקשים להסיר.</p>' +
      '<h4>אבטחת מידע</h4><p>האתר עובד בחיבור מוצפן (HTTPS). הפניות מוצפנות לפני שהן נשמרות בענן, ולוח הלידים מוגן בסיסמה ובסיסמת כספת נפרדת. אני נוקט אמצעים סבירים להגן על המידע, אבל באינטרנט אין אבטחה מוחלטת.</p>' +
      '<h4>הזכויות שלך</h4><ul>' +
        '<li>לעיין במידע שנשמר עליך (סעיף 13 לחוק).</li>' +
        '<li>לבקש לתקן או למחוק אותו (סעיף 14 לחוק).</li>' +
        '<li>להסיר את עצמך מתוכן ועדכונים בכל רגע, בהודעה פשוטה.</li>' +
        '<li>לבטל את ההסכמה לעוגיות שיווק בכל רגע.</li></ul>' +
        '<p>שולחים בקשה במייל ' + mail + ' או בוואטסאפ ' + wa + ', והיא מטופלת תוך 30 יום. אפשר גם לפנות לרשות להגנת הפרטיות.</p>' +
      '<h4>קטינים</h4><p>השירות מיועד לבעלי עסקים ולארגונים, ולא לילדים מתחת לגיל 18.</p>' +
      '<h4>שינויים במדיניות</h4><p>עדכונים יפורסמו בעמוד הזה, עם תאריך עדכון חדש.</p>' +
      '<p class="legal-note">עדכון אחרון: 25.11.2026 · שרבל נג\'ם · ' + mail + '</p>' },
    access: { t: 'הצהרת נגישות', b:
      '<p>חשוב לי שכל אחד יוכל להשתמש בתיק העבודות ובדף הנחיתה. האתר הונגש לפי תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ולפי התקן הישראלי ת"י 5568 ברמה AA, שמבוסס על הנחיות WCAG 2.0.</p>' +
      '<h4>מה הונגש באתר</h4><ul>' +
        '<li>תפריט נגישות (UserWay, הכפתור בתפריט העליון): הגדלת טקסט, ניגודיות, הדגשת קישורים, עצירת אנימציות ועוד.</li>' +
        '<li>עצירת תנועה: "עצירת אנימציות" בתפריט הנגישות, או הגדרת "הפחתת תנועה" במכשיר, עוצרות את הסרטונים שרצים ברקע, את הציור המונפש ואת הרצועות שזזות לבד.</li>' +
        '<li>אפשר לנווט באתר במקלדת בלבד.</li>' +
        '<li>מבנה כותרות מסודר, ותווית לכל שדה בטופס, בשביל קוראי מסך.</li>' +
        '<li>תיאור חלופי לתמונות שמעבירות מידע.</li>' +
        '<li>סרטוני הרקע מושתקים, ואין צליל שמתחיל לבד.</li>' +
        '<li>עברית ואנגלית, עם כיוון כתיבה נכון לכל שפה.</li></ul>' +
      '<h4>מה עדיין לא נגיש במלואו</h4><ul>' +
        '<li>לחלק מסרטוני העבודות אין כתוביות או תמליל.</li>' +
        '<li>נגן הסרטונים שייך ל-Vimeo, והנגישות שלו תלויה בהם.</li></ul>' +
        '<p>אני ממשיך לשפר את הנגישות. נתקלת במשהו שלא נגיש? אשמח לדעת ולתקן.</p>' +
      '<h4>רכז הנגישות</h4><p>שרבל נג\'ם · ' + mail + ' · וואטסאפ ' + wa + '</p>' +
      '<p class="legal-note">עדכון אחרון: 25.11.2026</p>' },
    terms: { t: 'תנאי שימוש', b:
      '<h4>זכויות יוצרים</h4><p>הסרטונים, הצילומים, העריכות, התסריטים, העיצוב והטקסטים באתר ובדף הנחיתה מוגנים לפי חוק זכות יוצרים, התשס"ח-2007. הזכויות בהם שייכות לשרבל נג\'ם או ללקוחות שעבורם הם הופקו. אין להעתיק, להוריד, להפיץ או לעשות בהם שימוש בלי אישור בכתב ומראש.</p>' +
        '<p>הלוגואים של הלקוחות שייכים לבעליהם, ומוצגים כאן כדוגמה לעבודה משותפת.</p>' +
      '<h4>טופס יצירת הקשר</h4><p>הטופס מיועד לפניות עסקיות. אין להשתמש בו לספאם, לפרסום או לתוכן לא חוקי. בשליחה את/ה מאשר/ת שהפרטים נכונים ושייכים לך. שליחת פנייה אינה יוצרת התחייבות: עבודה משותפת נעשית בהסכם כתוב וחתום.</p>' +
      '<h4>אחריות</h4><p>האתר מוצג כפי שהוא. המידע בו כללי, ואינו התחייבות לתוצאה. שרבל נג\'ם לא יישא באחריות לנזק ישיר או עקיף שייגרם משימוש באתר, מתקלות טכניות או מהסתמכות על המידע שבו.</p>' +
      '<h4>קישורים חיצוניים</h4><p>באתר יש קישורים לשירותים אחרים, כמו אינסטגרם, יוטיוב, טיקטוק ווואטסאפ. התוכן שלהם ומדיניות הפרטיות שלהם באחריותם.</p>' +
      '<h4>דין וסמכות שיפוט</h4><p>על השימוש באתר חלים דיני מדינת ישראל. סמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים במחוז תל אביב.</p>' +
      '<h4>יצירת קשר</h4><p>' + mail + ' · וואטסאפ ' + wa + '</p>' +
      '<p class="legal-note">עדכון אחרון: 25.11.2026</p>' }
  },
  en: {
    privacy: { t: 'Privacy Policy', b:
      '<p>This policy explains what information is collected on the portfolio sharbelnajem.pro and the landing page sharbelnajem.pro/start, why, where it is kept and what your rights are. It follows the Israeli Protection of Privacy Law, 1981 (including Amendment 13) and section 30A of the Communications Law.</p>' +
      '<h4>Who is responsible</h4><p>Sharbel Najem (Sharbel Najem Marketing Studio). For any question or request: ' + mail + ' or WhatsApp ' + wa + '.</p>' +
      '<h4>What is collected</h4><ul>' +
        '<li><strong>What you fill in on the landing page form:</strong> full name, WhatsApp number, email (optional), a few words about your business, and whether you asked to receive content and updates.</li>' +
        '<li><strong>Where you came from:</strong> if you arrived from an ad, the ad or campaign name (from the link itself) is saved with your inquiry.</li>' +
        '<li><strong>Technical information:</strong> as on any website, your IP address and browser type reach the providers that serve the site, the videos and the fonts (listed below). I do not collect or use this information.</li></ul>' +
        '<p>The portfolio itself has no form and collects no personal information.</p>' +
      '<h4>What it is used for</h4><ul>' +
        '<li>To get back to you about your inquiry: a call, a quote and scheduling.</li>' +
        '<li>If you ticked the box, to send you occasional content and updates. You can unsubscribe at any time.</li>' +
        '<li>If you allowed marketing cookies, to measure whether an ad led to an inquiry and improve the ads.</li></ul>' +
        '<p>I do not sell information or pass it to others for their marketing.</p>' +
      '<h4>Do you have to provide it</h4><p>You are not legally required to provide the information; it is up to you. Without a name and phone number I cannot get back to you.</p>' +
      '<h4>Where it is kept and who receives it</h4><p>The information goes to providers that help me run the site, only for the service they provide. Some operate outside Israel (mainly in the US), so the information is transferred abroad:</p><ul>' +
        '<li><strong>Web3Forms</strong> - sends the inquiry to my email.</li>' +
        '<li><strong>Pantry</strong> - stores the inquiry in my private lead board. Your details are encrypted in your own browser before they are sent, and only I can open them.</li>' +
        '<li><strong>GitHub Pages</strong> - hosts the site and logs IP addresses for security and operation.</li>' +
        '<li><strong>Vimeo</strong> - plays the videos, in "do not track" mode.</li>' +
        '<li><strong>Google Fonts</strong> - serves the fonts.</li>' +
        '<li><strong>UserWay</strong> - the accessibility menu, which remembers the settings you choose in it.</li>' +
        '<li><strong>Meta</strong> (Facebook and Instagram) - only on the landing page and only if you allowed marketing cookies: a pixel that measures page visits and form submissions. It does not receive your name, phone, email or the content of your inquiry.</li></ul>' +
        '<p>Each provider has its own privacy policy.</p>' +
      '<h4 id="legal-cookies">Cookies and storage on your device</h4><ul>' +
        '<li><strong>Necessary and convenience (always on):</strong> your language, light or dark mode, your cookie choice, your accessibility settings, and a copy of your inquiry on the device you sent it from. All of these stay in your browser.</li>' +
        '<li><strong>Marketing (only with consent):</strong> the Meta pixel, which sets its own cookie (_fbp) to measure ads.</li></ul>' +
        '<p>You can change your choice at any time through "Cookie settings" at the bottom of the page, or delete cookies in your browser settings.</p>' +
      '<h4>How long it is kept</h4><p>Details are kept as long as they are relevant to the business contact. If we worked together, they are kept for up to 7 years as required for tax and bookkeeping, and then deleted. Consent to content and updates is kept until you unsubscribe.</p>' +
      '<h4>Security</h4><p>The site runs over an encrypted connection (HTTPS). Inquiries are encrypted before they are stored in the cloud, and the lead board is protected by a password and a separate vault passphrase. I take reasonable measures, but no security on the internet is absolute.</p>' +
      '<h4>Your rights</h4><ul>' +
        '<li>To see the information kept about you (section 13 of the law).</li>' +
        '<li>To ask to correct or delete it (section 14 of the law).</li>' +
        '<li>To unsubscribe from content and updates at any time, with a simple message.</li>' +
        '<li>To withdraw your consent to marketing cookies at any time.</li></ul>' +
        '<p>Send a request to ' + mail + ' or WhatsApp ' + wa + ', and it will be handled within 30 days. You may also contact the Israeli Privacy Protection Authority.</p>' +
      '<h4>Minors</h4><p>The service is meant for business owners and organizations, not for children under 18.</p>' +
      '<h4>Changes</h4><p>Updates will be published on this page with a new date.</p>' +
      '<p class="legal-note">Last updated: November 25, 2026 · Sharbel Najem · ' + mail + '</p>' },
    access: { t: 'Accessibility Statement', b:
      '<p>I want everyone to be able to use the portfolio and the landing page. The site was made accessible according to the Israeli Equal Rights for Persons with Disabilities (Service Accessibility Adjustments) Regulations, 2013, and Israeli Standard IS 5568 at level AA, which is based on WCAG 2.0.</p>' +
      '<h4>What has been done</h4><ul>' +
        '<li>An accessibility menu (UserWay, the button in the top bar): larger text, contrast, highlighted links, stopping animations and more.</li>' +
        '<li>Stopping motion: "Stop animations" in the accessibility menu, or the "reduce motion" setting on your device, stops the background videos, the animated painting and the strips that move on their own.</li>' +
        '<li>The site can be used with a keyboard only.</li>' +
        '<li>A clear heading structure and a label for every form field, for screen readers.</li>' +
        '<li>Alternative text for images that carry information.</li>' +
        '<li>Background videos are muted, and no sound starts on its own.</li>' +
        '<li>Hebrew and English, each with the right text direction.</li></ul>' +
      '<h4>What is not fully accessible yet</h4><ul>' +
        '<li>Some of the work videos have no captions or transcript.</li>' +
        '<li>The video player belongs to Vimeo, and its accessibility depends on them.</li></ul>' +
        '<p>I keep improving. Found something that is not accessible? I would be glad to hear and fix it.</p>' +
      '<h4>Accessibility coordinator</h4><p>Sharbel Najem · ' + mail + ' · WhatsApp ' + wa + '</p>' +
      '<p class="legal-note">Last updated: November 25, 2026</p>' },
    terms: { t: 'Terms of Use', b:
      '<h4>Copyright</h4><p>The videos, photos, edits, scripts, design and texts on the site and the landing page are protected by the Israeli Copyright Act, 2007. The rights belong to Sharbel Najem or to the clients they were produced for. Do not copy, download, distribute or use them without prior written permission.</p>' +
        '<p>Client logos belong to their owners and are shown here as examples of work together.</p>' +
      '<h4>The contact form</h4><p>The form is for business inquiries. Do not use it for spam, advertising or unlawful content. By sending it you confirm the details are correct and yours. Sending an inquiry creates no obligation: working together is done under a written, signed agreement.</p>' +
      '<h4>Liability</h4><p>The site is provided as is. Its information is general and is not a promise of results. Sharbel Najem is not liable for direct or indirect damage caused by using the site, by technical faults or by relying on its information.</p>' +
      '<h4>External links</h4><p>The site links to other services such as Instagram, YouTube, TikTok and WhatsApp. Their content and privacy policies are their responsibility.</p>' +
      '<h4>Law and jurisdiction</h4><p>Use of the site is governed by the laws of the State of Israel. The competent courts of the Tel Aviv district have exclusive jurisdiction.</p>' +
      '<h4>Contact</h4><p>' + mail + ' · WhatsApp ' + wa + '</p>' +
      '<p class="legal-note">Last updated: November 25, 2026</p>' }
  }
};
var UI = {
  he: { close: 'סגירה', cookies: 'הגדרות עוגיות', allow: 'מאשר/ת', necessary: 'רק מה שהכרחי', policy: 'מדיניות הפרטיות',
        banner: 'האתר שומר במכשיר רק את מה שהוא צריך כדי לעבוד, כמו השפה ומצב התצוגה. אפשר לאשר גם עוגיות שיווק, שעוזרות לי למדוד אם מודעה עבדה.' },
  en: { close: 'Close', cookies: 'Cookie settings', allow: 'Allow', necessary: 'Only necessary', policy: 'Privacy policy',
        banner: 'This site stores only what it needs to work on your device, such as your language and display mode. You can also allow marketing cookies, which help me measure whether an ad worked.' }
};

/* ---------- החלונות: נבנים מכאן בשפה של הדף, ומתעדכנים כשהשפה מתחלפת ---------- */
function render(){
  var L = lang(), d = DOCS[L], u = UI[L];
  ['privacy', 'access', 'terms'].forEach(function(id){
    var box = document.querySelector('#modal-' + id + ' .legal-modal'); if (!box) return;
    box.setAttribute('dir', L === 'he' ? 'rtl' : 'ltr'); box.setAttribute('lang', L);
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'legal-t-' + id);
    box.innerHTML = '<div class="legal-modal-header"><h3 id="legal-t-' + id + '">' + d[id].t + '</h3><button type="button" class="legal-modal-close" onclick="closeLegal()" aria-label="' + u.close + '">&times;</button></div>' + d[id].b;
  });
  Array.prototype.forEach.call(document.querySelectorAll('.js-cookies'), function(a){ a.textContent = u.cookies; });
  if (bar) fillBar();
}

/* ---------- הסכמה לעוגיות שיווק ---------- */
var KEY = 'sn-consent', need = false, bar = null;
function read(){ try { var c = JSON.parse(localStorage.getItem(KEY) || 'null'); return c && c.v === VERSION ? c : null; } catch (e) { return null; } }
function write(ads){
  try { localStorage.setItem(KEY, JSON.stringify({ ads: !!ads, v: VERSION, ts: new Date().toISOString() })); } catch (e) {}
  hideBar(); dispatchEvent(new CustomEvent('sn-consent', { detail: { ads: !!ads } }));
}
function gated(){ return document.getElementById('lpGate') || document.getElementById('gate'); }   // לא מעל מסך הכניסה
function fillBar(){
  var u = UI[lang()];
  bar.setAttribute('dir', lang() === 'he' ? 'rtl' : 'ltr');
  bar.innerHTML = '<p>' + u.banner + ' <a href="#" data-legal="privacy">' + u.policy + '</a></p><div class="cookie-bar__btns"><button type="button" class="cookie-bar__btn" data-c="1">' + u.allow + '</button><button type="button" class="cookie-bar__btn" data-c="0">' + u.necessary + '</button></div>';
}
function showBar(){
  if (bar) return;
  if (gated()) { setTimeout(showBar, 600); return; }
  bar = document.createElement('div'); bar.className = 'cookie-bar glass'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', UI[lang()].cookies);
  fillBar(); document.body.appendChild(bar);
  bar.addEventListener('click', function(e){ var b = e.target.closest('[data-c]'); if (b) write(b.dataset.c === '1'); });
  requestAnimationFrame(function(){ bar && bar.classList.add('is-on'); });
}
function hideBar(){ if (!bar) return; var b = bar; bar = null; b.classList.remove('is-on'); setTimeout(function(){ b.remove(); }, 400); }

window.SNConsent = {
  ads: function(){ var c = read(); return !!(c && c.ads); },
  // דף שיש בו כלי שצריך הסכמה (כמו הפיקסל) מבקש אותה. בלי בחירה שמורה - מוצגת החלונית
  need: function(){ need = true; if (!read()) showBar(); },
  // "הגדרות עוגיות": אם בדף יש מה לבחור - החלונית; אחרת - הסעיף על עוגיות במדיניות
  open: function(){
    if (need) { hideBar(); setTimeout(showBar, bar ? 420 : 0); return; }
    if (window.openLegal) { openLegal('privacy'); setTimeout(function(){ var h = document.getElementById('legal-cookies'); h && h.scrollIntoView({ block: 'start' }); }, 60); }
  }
};
document.addEventListener('click', function(e){ var a = e.target.closest('.js-cookies'); if (a) { e.preventDefault(); SNConsent.open(); } });

render();
new MutationObserver(render).observe(root, { attributes: true, attributeFilter: ['lang'] });
// קישור ישיר: sharbelnajem.pro/start/#privacy פותח את המדיניות (גם מעל מסך הכניסה)
// (מיד כשהדף מוכן, בלי לחכות שהסרטונים ייטענו)
function fromHash(){
  var m = { '#privacy': 'privacy', '#terms': 'terms', '#accessibility': 'access', '#cookies': 'cookies' }[location.hash];
  if (!m || !window.openLegal) return;
  window.closeLegal && closeLegal();   // מסמך אחד פתוח בכל פעם
  if (m === 'cookies') SNConsent.open(); else openLegal(m);
}
if (document.readyState === 'loading') addEventListener('DOMContentLoaded', function(){ setTimeout(fromHash, 0); }); else setTimeout(fromHash, 0);
addEventListener('hashchange', fromHash);
})();
