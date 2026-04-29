// ── Custom cursor ─────────────────────────────────────────────────────────────
(function(){
  // Skip on touch devices — no cursor needed, saves rAF loop
  if(window.matchMedia('(pointer:coarse)').matches) return;
  var dot  = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  if(!dot || !ring) return;
  var rx=0,ry=0,mx=0,my=0;
  document.addEventListener('mousemove',function(e){
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
  },{passive:true});
  function animRing(){
    rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.addEventListener('mouseleave',function(){dot.style.opacity='0';ring.style.opacity='0';});
  document.addEventListener('mouseenter',function(){dot.style.opacity='1';ring.style.opacity='1';});
})();



// ── Active nav link on scroll ─────────────────────────────────────────────────
(function(){
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav-links a[href^="#"]');
  if(!links.length) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(l){l.classList.remove('active');});
        var a = document.querySelector('.nav-links a[href="#'+e.target.id+'"]');
        if(a) a.classList.add('active');
      }
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  sections.forEach(function(s){obs.observe(s);});
})();

// ── Hero name char reveal ─────────────────────────────────────────────────────
(function(){
  // Skip on mobile — 14+ spans each animating = jank
  if(window.matchMedia('(max-width:768px)').matches) return;
  var nameEl = document.querySelector('.hero-name');
  if(!nameEl || nameEl.dataset.charSplit) return;
  nameEl.dataset.charSplit='1';
  var text = nameEl.textContent;
  nameEl.innerHTML = text.split('').map(function(c,i){
    return '<span class="char" style="animation-delay:'+(i*0.04)+'s">'+(c===' '?'&nbsp;':c)+'</span>';
  }).join('');
})();
