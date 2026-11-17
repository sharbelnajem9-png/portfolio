/* רקע האמנות: קומפוזיציה של מונדריאן בתבליט שחור על שחור (או לבן על לבן במצב בהיר), שמתגלה באור של זרקור שעוקב אחרי העכבר (בטלפון הוא נע לבד).
   הקומפוזיציה חיה: הקווים זזים לאט, כל אחד בקצב משלו, ומתנדנדים עם הגלילה; המלבנים הצבועים נושמים.
   מלבנים חלקים, קווים עם שוליים משופעים, וכמה מלבנים צבועים בלכה עדינה (פלטינה, קליין, שמנת, פלדה) שזוהרת רק באור.
   נבחר 2026-11-17 (מעבדה: צפוף + יותר צבע, פלטת "מיקס - פלטינה מובילה")
   המעברים הם של הציור עצמו:
   - כניסה לאתר: הקנבס ריק, והקווים נמתחים אחד אחד בזמן הספירה; אחריהם המלבנים הצבועים (artFX.build)
   - מצב בהיר/כהה: המלבנים מתהפכים כמו קיר קינטי, בגל שיוצא מהכפתור; בצד השני של כל מלבן - המצב החדש
   - שפה: אותו היפוך, בכיוון הקריאה של השפה החדשה (artFX.flip) */
(function(){
  var c = document.createElement('canvas'); c.id = 'artBg'; c.setAttribute('aria-hidden', 'true');
  var gl = c.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return;   // בלי WebGL האתר נשאר על הרקע הכהה הרגיל
  var coarse = matchMedia('(pointer: coarse)').matches, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var Q = coarse ? .5 : Math.min(.75, 1 / (window.devicePixelRatio || 1) + .25);
  var fs = [
    'precision highp float;',
    'uniform vec2 uRes;uniform float uScroll;uniform vec2 uMouse;uniform float uQ;uniform float uTime;',
    'uniform float uLA;uniform float uLB;uniform float uT0;uniform float uTM;uniform vec2 uO;uniform float uB;uniform float uTI;',
    'const float RH=400.,LW=6.,ON=.15,SPLIT=.35,TA=1.4,FD=.75;',
    'const vec3 C1=vec3(.788,.812,.851),C2=vec3(.184,.31,.847),C3=vec3(.922,.894,.839),C4=vec3(.435,.561,.722);',
    'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    'float segd(float a,float lo,float hi){return max(0.,max(lo-a,a-hi));}',
    // כמה מכל קו כבר צויר (בכניסה לאתר); כל קו מתחיל בזמן אחר
    'float grow(vec2 id){return smoothstep(0.,1.,clamp((uB-hash(id+7.)*1.6)/.9,0.,1.));}',
    'float rowLine(float rb,float dy,float x){if(uB>4.)return dy;float p=grow(vec2(rb,1.));if(p<=0.)return 1e4;float W=uRes.x;bool fl=hash(vec2(rb,2.))>.5;return length(vec2(segd(x,fl?0.:W*(1.-p),fl?W*p:W),dy));}',
    // שורות של 400px; בכל שורה עד שלושה קווים אנכיים, ובחלק מהתאים קו אופקי נוסף. מחזיר מרחק מהקו הקרוב, מזהה תא, וגבולות המלבן
    'vec4 cell(vec2 w,out vec4 pb){float r=floor(w.y/RH);float ly=w.y-r*RH;float W=uRes.x;float d=min(rowLine(r,ly,w.x),rowLine(r+1.,RH-ly,w.x));float c0=0.,c1=W,ci=0.;',
    'for(int k=0;k<3;k++){float fk=float(k);if(hash(vec2(r,fk+11.))>ON){float ph=hash(vec2(r,fk+21.))*6.2832;float sp=6.2832/(25.+20.*hash(vec2(r,fk+31.)));',
    'float fx=((.14+.72*hash(vec2(r,fk+3.)))+.035*sin(uTime*sp+ph)+.02*sin(uScroll*.0011+ph*1.7))*W;float dx=abs(w.x-fx);',
    'if(uB<4.){float p=grow(vec2(r*3.+fk,3.));bool up=hash(vec2(r,fk+5.))>.5;dx=p<=0.?1e4:length(vec2(dx,segd(ly,up?RH*(1.-p):0.,up?RH:RH*p)));}',
    'd=min(d,dx);if(w.x>fx&&fx>c0){c0=fx;ci=fk+1.;}if(w.x<fx&&fx<c1)c1=fx;}}',
    'float sub=0.,y0=0.,y1=RH;if(hash(vec2(r,ci+40.))>SPLIT){float hp=hash(vec2(r,ci+60.))*6.2832;float hy=(.3+.4*hash(vec2(r,ci+50.))+.06*sin(uTime*6.2832/(30.+15.*hash(vec2(r,ci+70.)))+hp))*RH;float dy=abs(ly-hy);',
    'if(uB<4.){float p=grow(vec2(r*5.+ci,4.));bool fl=hash(vec2(r,ci+8.))>.5;float sw=(c1-c0)*p;dy=p<=0.?1e4:length(vec2(dy,segd(w.x,fl?c0:c1-sw,fl?c0+sw:c1)));}',
    'd=min(d,dy);sub=step(hy,ly);if(sub>.5)y0=hy;else y1=hy;}',
    'pb=vec4(c0,c1,r*RH+y0,r*RH+y1);return vec4(d,r,ci,sub);}',
    'float H(vec2 w){vec4 pb;float line=1.-smoothstep(LW*.5,LW*.5+9.,cell(w,pb).x);return .2+.8*line;}',
    'vec3 tintOf(vec4 cl){if(cl.x<LW*.5+4.)return vec3(0.);float id=hash(cl.yz*1.7+cl.w*3.3+5.);',
    'float br=(.62+.38*sin(uTime*(.16+.12*id)+id*40.))*uTI;',
    'if(id<.10)return C1*TA*br;if(id<.22)return C2*TA*br;if(id<.28)return C3*TA*br;if(id<.36)return C4*TA*br;return vec3(0.);}',
    'void main(){vec2 px=vec2(gl_FragCoord.x,uRes.y*uQ-gl_FragCoord.y)/uQ;vec2 w=vec2(px.x,px.y+uScroll);',
    'vec4 pb;vec4 cc=cell(w,pb);',
    'float e=1.2;float h=H(w),hx=H(w+vec2(e,0.)),hy=H(w+vec2(0.,e));vec3 n=normalize(vec3((h-hx)*26.,(h-hy)*26.,1.));',
    // ההיפוך: כל מלבן מסתובב סביב הציר האנכי שלו; בחצי הדרך רואים את הצד השני (המצב החדש), ובמרווח - את החלל שמאחוריו ואת השפה שלו שתופסת אור
    'float Lh=uLB,gap=0.,edge=0.,gs=0.,ft=uTime-uT0;',
    'if(ft>0.&&ft<3.6){vec2 pc=vec2(pb.x+pb.y,pb.z+pb.w)*.5;vec2 ps=vec2(pc.x,pc.y-uScroll);',
    'float dl=abs(uTM)<.5?length(ps-uO)/1500.:(uTM>0.?ps.x/uRes.x:1.-ps.x/uRes.x)*1.05+clamp(ps.y/uRes.y,0.,1.)*.12;',
    'dl+=hash(cc.yz+cc.w*3.3+9.)*.12;float q=clamp((ft-dl)/FD,0.,1.);q=q*q*(3.-2.*q);float th=q*3.14159;Lh=mix(uLA,uLB,step(.5,q));',
    'if(q>0.&&q<1.&&cc.x>LW*.5+1.){float ca=abs(cos(th)),sa=sin(th),hw=(pb.y-pb.x)*.5,ax=abs(w.x-pc.x);',
    'if(ax>ca*hw){gap=1.;float gd=ax-ca*hw;edge=1.-smoothstep(0.,8.*sa+1.,gd);gs=smoothstep(0.,110.,gd);}else{float a=q<.5?th:th-3.14159;n=normalize(vec3(sin(a),0.,cos(a)));}}}',
    'vec2 dm=uMouse-px;float dist=length(dm)/uRes.y;vec3 L=normalize(vec3(dm/uRes.y,.45));vec3 Hh=normalize(L+vec3(0.,0.,1.));',
    'float spec=pow(max(dot(n,Hh),0.),36.);float diff=max(dot(n,L),0.);float fall=exp(-dist*1.6);',
    'float lm=1.-smoothstep(LW*.5,LW*.5+9.,cc.x);spec*=mix(.2,.62,max(lm,edge));',
    'vec3 base=vec3(.040,.043,.052);vec3 col=base*(.55+.6*diff);',
    'col+=spec*mix(C1,C3,.3)*.55*fall;col+=spec*C2*.05*(1.-fall);col+=base*.35*(h-.5);',
    'vec3 tn=gap>.5?vec3(0.):tintOf(cc);col+=tn*(.016+.15*fall*fall*(.4+.6*diff));',
    'vec3 paper=vec3(.953,.949,.933);vec3 cl=paper*(.875+.14*diff)+spec*.05*fall-.022*(1.-diff);',
    'cl*=mix(vec3(1.),tn/TA*.8+.2,step(.001,tn.x+tn.y+tn.z)*(.08+.26*fall*fall));',
    // החלל מאחורי מלבן שמסתובב: צל רך שמתבהר ככל שמתרחקים ממנו, ושפת המלבן תופסת אור
    'if(gap>.5){col=base*(.25+.4*gs)+vec3(.5,.52,.56)*edge*(.08+.5*fall);cl=paper*(.8+.11*gs)+vec3(.1)*edge;}',
    'gl_FragColor=vec4(mix(col,cl,Lh),1.);}'
  ].join('\n');
  function sh(t, src){ var s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; }
  var vs = sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'), fsh = sh(gl.FRAGMENT_SHADER, fs);
  if (!vs || !fsh) return;
  var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fsh); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var U = {}; ['uTime', 'uRes', 'uScroll', 'uMouse', 'uQ', 'uLA', 'uLB', 'uT0', 'uTM', 'uO', 'uB', 'uTI'].forEach(function(n){ U[n] = gl.getUniformLocation(pr, n); });
  document.body.prepend(c); document.documentElement.classList.add('has-art');
  var mx = innerWidth * .7, my = innerHeight * .3, tx = mx, ty = my, lastMove = -1e9, frame = 0, lastY = -1, lastMx = -1, lastMy = -1;
  // מצב המעבר: LA = הצד הקדמי של המלבנים, LB = הצד האחורי; T0 = מתי התחיל הגל; TM = 0 גל מהנקודה O, 1/-1 גל בכיוון קריאה
  var root = document.documentElement, cur = root.dataset.theme === 'light' ? 1 : 0, LA = cur, LB = cur, T0 = -100, TM = 0, OX = innerWidth / 2, OY = 0, now = 0;
  var B0 = document.getElementById('gate') && !still ? -1 : null;   // בפתיחה הקנבס ריק עד שהספירה מתחילה
  var nextWave = 35 + Math.random() * 15;   // מדי פעם (כל 40-75 שניות) גל מהיר עובר על הציור, כמו בכניסה - לא כל הזמן
  window.artFX = {
    origin: function(x, y){ OX = x; OY = y; },
    flip: function(dir){ if (still) return; LA = LB = cur; T0 = now; TM = dir; },
    build: function(){ if (B0 === -1) B0 = now; },
    wave: function(){ nextWave = 0; T0 = Math.min(T0, now - 6); },   // גל עכשיו (לבדיקה)
    waveAt: function(x, y){ return Math.hypot(x - OX, y - OY) / 1500 + .06 + .375; }   // מתי הגל הופך את המקום הזה (שניות)
  };
  function size(){ c.width = Math.round(innerWidth * Q); c.height = Math.round(innerHeight * Q); gl.viewport(0, 0, c.width, c.height); lastY = -1; }
  addEventListener('resize', size); size();
  addEventListener('pointermove', function(e){ if (e.pointerType === 'mouse') { tx = e.clientX; ty = e.clientY; lastMove = performance.now(); } }, { passive: true });
  // כשהצופה או עמוד פרויקט פתוחים, הרקע מוסתר מאחוריהם - לא מציירים
  function covered(){ var lb = document.getElementById('lb'), th = document.getElementById('theater'); return (lb && !lb.hidden) || (th && !th.hidden) || document.hidden; }
  function loop(t){
    requestAnimationFrame(loop);
    now = t / 1000;
    var lt = root.dataset.theme === 'light' ? 1 : 0;
    if (lt !== cur) { if (still) LA = LB = lt; else { LA = cur; LB = lt; T0 = now; TM = 0; } cur = lt; }
    if (covered()) return;
    if (!still && B0 === null && now > nextWave) {
      if (now - T0 > 5) { var m = Math.random(); TM = m < .35 ? 1 : m < .7 ? -1 : 0; if (!TM) { OX = innerWidth * (.15 + .7 * Math.random()); OY = innerHeight * (.15 + .7 * Math.random()); } LA = LB = cur; T0 = now; }
      nextWave = now + 40 + Math.random() * 35;
    }
    if (coarse && (frame++ & 1)) return;   // בטלפון 30 פריימים בשנייה
    if (!still && t - lastMove > 4000) { tx = innerWidth * (.5 + .34 * Math.sin(t * .00012)); ty = innerHeight * (.38 + .22 * Math.cos(t * .0001)); }
    mx += (tx - mx) * .045; my += (ty - my) * .045;
    var ub = B0 === null ? 99 : B0 < 0 ? -1 : now - B0;
    if (B0 !== null && B0 >= 0 && ub > 4.2) { B0 = null; ub = 99; }
    // הקומפוזיציה תמיד זזה; רק כשמבקשים פחות תנועה מציירים רק כשמשהו השתנה
    if (still && Math.abs(scrollY - lastY) < .5 && Math.abs(mx - lastMx) < .05 && Math.abs(my - lastMy) < .05 && now - T0 > 4) return;
    lastY = scrollY; lastMx = mx; lastMy = my;
    gl.uniform1f(U.uTime, still ? 0 : now); gl.uniform2f(U.uRes, innerWidth, innerHeight); gl.uniform1f(U.uScroll, scrollY); gl.uniform2f(U.uMouse, mx, my); gl.uniform1f(U.uQ, Q);
    gl.uniform1f(U.uLA, LA); gl.uniform1f(U.uLB, LB); gl.uniform1f(U.uT0, still ? -100 : T0); gl.uniform1f(U.uTM, TM); gl.uniform2f(U.uO, OX, OY);
    gl.uniform1f(U.uB, ub); gl.uniform1f(U.uTI, B0 === null ? 1 : Math.max(0, Math.min(1, (ub - 2) / 1)));
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  requestAnimationFrame(loop);
})();
