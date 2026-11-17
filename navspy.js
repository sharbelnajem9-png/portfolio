/* הפס העליון יודע איפה אתם: גלולת זכוכית מאחורי הקישור של האזור שבו נמצאים, שזורמת לאזור הבא כמו נוזל
   (הקצה המוביל נמתח קודם והקצה השני משיג אותו), וקו כחול דק בתחתיתה שמתמלא ככל שמתקדמים באזור.
   מעבר עכבר על קישור אחר מזיז אליו את הגלולה לרגע. בטלפון ובטאבלט, כשהקישורים מוסתרים, שבב קטן בפס מראה את שם האזור
   והשם מתגלגל לכיוון הגלילה. משותף לאתר ולדף הנחיתה */
(function(){
  var nav = document.getElementById('nav'), links = nav && nav.querySelector('.nav__links');
  if (!links) return;
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var as = Array.prototype.slice.call(links.querySelectorAll('.nav__link'));
  var id = function(a){ return (a.dataset.go || a.getAttribute('href') || '').replace(/^.*#/, ''); };
  var secs = as.map(function(a){ return document.getElementById(id(a)); });
  var sheetAs = Array.prototype.slice.call(document.querySelectorAll('#sheet a')).filter(function(a){ return as.some(function(b){ return id(b) === id(a); }); });
  var ind = document.createElement('span'); ind.className = 'nav__ind'; ind.setAttribute('aria-hidden', 'true'); ind.innerHTML = '<i></i>'; links.prepend(ind);
  var where = document.createElement('button'); where.type = 'button'; where.className = 'nav__where'; where.innerHTML = '<i aria-hidden="true"></i>';
  var logo = nav.querySelector('.nav__logo'); logo.parentNode.insertBefore(where, logo.nextSibling);
  where.addEventListener('click', function(){ var m = document.getElementById('navMenu'); m && m.click(); });
  var S = { L: 0, R: 0, on: false, hover: null, act: -2, wi: -2, lastY: scrollY, p: 0 };
  as.forEach(function(a, i){ a.addEventListener('pointerenter', function(e){ if (e.pointerType === 'mouse') S.hover = i; }); });
  links.addEventListener('pointerleave', function(){ S.hover = null; });
  // האזור הנוכחי: האחרון שהתחלתו עברה את 38% מגובה המסך; בתחתית הדף - האחרון
  function current(){
    var y = innerHeight * .38, act = -1;
    for (var i = 0; i < secs.length; i++) if (secs[i] && secs[i].getBoundingClientRect().top <= y) act = i;
    if (act > -1 && innerHeight + scrollY >= document.documentElement.scrollHeight - 6) act = secs.length - 1;
    var p = 0; if (act > -1) { var r = secs[act].getBoundingClientRect(); p = Math.min(1, Math.max(0, (y - r.top) / Math.max(1, r.height - innerHeight * .3))); }
    return [act, p];
  }
  function setWhere(i, down){
    if (i === S.wi) return; S.wi = i;
    var old = where.querySelectorAll('span:not(.out)');
    Array.prototype.forEach.call(old, function(o){ o.classList.toggle('up', !down); o.classList.add('out'); setTimeout(function(){ o.remove(); }, 520); });
    var txt = i > -1 ? as[i].textContent : '';
    if (txt) {
      var s = document.createElement('span'); s.textContent = txt; if (!down) s.classList.add('up'); where.appendChild(s);
      where.style.width = (s.scrollWidth + 28) + 'px'; where.setAttribute('aria-label', txt);
    }
    else where.style.width = '0px';
    where.classList.toggle('on', !!txt);
  }
  function tick(){
    requestAnimationFrame(tick);
    if (document.hidden || !nav.classList.contains('is-on')) return;
    var c = current(), act = c[0], down = scrollY >= S.lastY; S.lastY = scrollY;
    if (act !== S.act) {
      S.act = act;
      as.forEach(function(a, i){ a.classList.toggle('is-active', i === act); if (i === act) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
      sheetAs.forEach(function(a){ a.classList.toggle('is-active', act > -1 && id(a) === id(as[act])); });
    }
    setWhere(act, down);
    S.p += (c[1] - S.p) * .2;
    var shown = links.offsetParent !== null, k = S.hover !== null ? S.hover : act;
    ind.classList.toggle('on', shown && k > -1);
    if (shown && k > -1) {
      var lr = links.getBoundingClientRect(), r = as[k].getBoundingClientRect(), tl = r.left - lr.left, tr = r.right - lr.left;
      if (!S.on || still) { S.L = tl; S.R = tr; S.on = true; }
      // הקצה המוביל זז מהר, השני לאט יותר: הגלולה נמתחת לכיוון היעד ואז מתכווצת אליו
      var right = (tl + tr) > (S.L + S.R);
      S.L += (tl - S.L) * (right ? .1 : .22); S.R += (tr - S.R) * (right ? .22 : .1);
      ind.style.transform = 'translateX(' + S.L.toFixed(2) + 'px)'; ind.style.width = Math.max(0, S.R - S.L).toFixed(2) + 'px';
      ind.style.setProperty('--p', (k === act ? S.p : 0).toFixed(3));
    } else if (k === -1) S.on = false;
    where.style.setProperty('--p', S.p.toFixed(3));
  }
  // אחרי החלפת שפה הטקסטים משתנים - מרעננים את השבב
  window.navSpyRefresh = function(){ S.wi = -2; S.act = -2; };
  requestAnimationFrame(tick);
})();
