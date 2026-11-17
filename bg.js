/* רקע האמנות: קומפוזיציה של מונדריאן בתבליט שחור על שחור (או לבן על לבן במצב בהיר), שמתגלה באור של זרקור שעוקב אחרי העכבר (בטלפון הוא נע לבד).
   הקומפוזיציה חיה: הקווים זזים לאט, כל אחד בקצב משלו, ומתנדנדים עם הגלילה; המלבנים הצבועים נושמים.
   מלבנים חלקים, קווים עם שוליים משופעים, וכמה מלבנים צבועים בלכה עדינה (פלטינה, קליין, שמנת, פלדה) שזוהרת רק באור.
   נבחר 2026-11-17 (מעבדה: צפוף + יותר צבע, פלטת "מיקס - פלטינה מובילה") */
(function(){
  var c = document.createElement('canvas'); c.id = 'artBg'; c.setAttribute('aria-hidden', 'true');
  var gl = c.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return;   // בלי WebGL האתר נשאר על הרקע הכהה הרגיל
  var coarse = matchMedia('(pointer: coarse)').matches, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var Q = coarse ? .5 : Math.min(.75, 1 / (window.devicePixelRatio || 1) + .25);
  var fs = [
    'precision highp float;',
    'uniform vec2 uRes;uniform float uScroll;uniform vec2 uMouse;uniform float uQ;uniform float uTime;uniform float uLight;',
    'const float RH=400.,LW=6.,ON=.15,SPLIT=.35,TA=1.4;',
    'const vec3 C1=vec3(.788,.812,.851),C2=vec3(.184,.31,.847),C3=vec3(.922,.894,.839),C4=vec3(.435,.561,.722);',
    'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    // שורות של 400px; בכל שורה עד שלושה קווים אנכיים, ובחלק מהתאים קו אופקי נוסף. מחזיר מרחק מהקו הקרוב ומזהה תא
    'vec4 cell(vec2 w){float r=floor(w.y/RH);float ly=w.y-r*RH;float W=uRes.x;float d=min(ly,RH-ly);float c0=0.,ci=0.;',
    'for(int k=0;k<3;k++){float fk=float(k);if(hash(vec2(r,fk+11.))>ON){float ph=hash(vec2(r,fk+21.))*6.2832;float sp=6.2832/(25.+20.*hash(vec2(r,fk+31.)));',
    'float fx=((.14+.72*hash(vec2(r,fk+3.)))+.035*sin(uTime*sp+ph)+.02*sin(uScroll*.0011+ph*1.7))*W;d=min(d,abs(w.x-fx));if(w.x>fx&&fx>c0){c0=fx;ci=fk+1.;}}}',
    'float sub=0.;if(hash(vec2(r,ci+40.))>SPLIT){float hp=hash(vec2(r,ci+60.))*6.2832;float hy=(.3+.4*hash(vec2(r,ci+50.))+.06*sin(uTime*6.2832/(30.+15.*hash(vec2(r,ci+70.)))+hp))*RH;d=min(d,abs(ly-hy));sub=step(hy,ly);}',
    'return vec4(d,r,ci,sub);}',
    'float H(vec2 w){float line=1.-smoothstep(LW*.5,LW*.5+9.,cell(w).x);return .2+.8*line;}',
    'vec3 tint(vec2 w){vec4 cl=cell(w);if(cl.x<LW*.5+4.)return vec3(0.);float id=hash(cl.yz*1.7+cl.w*3.3+5.);',
    'float br=.62+.38*sin(uTime*(.16+.12*id)+id*40.);',
    'if(id<.10)return C1*TA*br;if(id<.22)return C2*TA*br;if(id<.28)return C3*TA*br;if(id<.36)return C4*TA*br;return vec3(0.);}',
    'void main(){vec2 px=vec2(gl_FragCoord.x,uRes.y*uQ-gl_FragCoord.y)/uQ;vec2 w=vec2(px.x,px.y+uScroll);',
    'float e=1.2;float h=H(w),hx=H(w+vec2(e,0.)),hy=H(w+vec2(0.,e));vec3 n=normalize(vec3((h-hx)*26.,(h-hy)*26.,1.));',
    'vec2 dl=uMouse-px;float dist=length(dl)/uRes.y;vec3 L=normalize(vec3(dl/uRes.y,.45));vec3 Hh=normalize(L+vec3(0.,0.,1.));',
    'float spec=pow(max(dot(n,Hh),0.),36.);float diff=max(dot(n,L),0.);float fall=exp(-dist*1.6);',
    'float lm=1.-smoothstep(LW*.5,LW*.5+9.,cell(w).x);spec*=mix(.2,.62,lm);',
    'vec3 base=vec3(.040,.043,.052);vec3 col=base*(.55+.6*diff);',
    'col+=spec*mix(C1,C3,.3)*.55*fall;col+=spec*C2*.05*(1.-fall);col+=base*.35*(h-.5);',
    'vec3 tn=tint(w);col+=tn*(.016+.15*fall*fall*(.4+.6*diff));',
    'vec3 paper=vec3(.953,.949,.933);vec3 cl=paper*(.875+.14*diff)+spec*.05*fall-.022*(1.-diff);',
    'cl*=mix(vec3(1.),tn/TA*.8+.2,step(.001,tn.x+tn.y+tn.z)*(.08+.26*fall*fall));',
    'gl_FragColor=vec4(mix(col,cl,uLight),1.);}'
  ].join('\n');
  function sh(t, src){ var s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; }
  var vs = sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'), fsh = sh(gl.FRAGMENT_SHADER, fs);
  if (!vs || !fsh) return;
  var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fsh); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var uTime = gl.getUniformLocation(pr, 'uTime'), uLight = gl.getUniformLocation(pr, 'uLight'), uRes = gl.getUniformLocation(pr, 'uRes'), uScroll = gl.getUniformLocation(pr, 'uScroll'), uMouse = gl.getUniformLocation(pr, 'uMouse'), uQ = gl.getUniformLocation(pr, 'uQ');
  document.body.prepend(c); document.documentElement.classList.add('has-art');
  var mx = innerWidth * .7, my = innerHeight * .3, tx = mx, ty = my, lastMove = -1e9, frame = 0, lastY = -1, lastMx = -1, lastMy = -1, light = document.documentElement.dataset.theme === 'light' ? 1 : 0;
  function size(){ c.width = Math.round(innerWidth * Q); c.height = Math.round(innerHeight * Q); gl.viewport(0, 0, c.width, c.height); lastY = -1; }
  addEventListener('resize', size); size();
  addEventListener('pointermove', function(e){ if (e.pointerType === 'mouse') { tx = e.clientX; ty = e.clientY; lastMove = performance.now(); } }, { passive: true });
  // כשהצופה או עמוד פרויקט פתוחים, הרקע מוסתר מאחוריהם - לא מציירים
  function covered(){ var lb = document.getElementById('lb'), th = document.getElementById('theater'); return (lb && !lb.hidden) || (th && !th.hidden) || document.hidden; }
  function loop(t){
    requestAnimationFrame(loop);
    if (covered()) return;
    if (coarse && (frame++ & 1)) return;   // בטלפון 30 פריימים בשנייה
    if (!still && t - lastMove > 4000) { tx = innerWidth * (.5 + .34 * Math.sin(t * .00012)); ty = innerHeight * (.38 + .22 * Math.cos(t * .0001)); }
    mx += (tx - mx) * .045; my += (ty - my) * .045;
    var lt = document.documentElement.dataset.theme === 'light' ? 1 : 0; light += (lt - light) * .05;
    // הקומפוזיציה תמיד זזה; רק כשמבקשים פחות תנועה מציירים רק כשמשהו השתנה
    if (still && Math.abs(scrollY - lastY) < .5 && Math.abs(mx - lastMx) < .05 && Math.abs(my - lastMy) < .05 && Math.abs(lt - light) < .002) return;
    lastY = scrollY; lastMx = mx; lastMy = my;
    gl.uniform1f(uTime, still ? 0 : t / 1000); gl.uniform1f(uLight, light); gl.uniform2f(uRes, innerWidth, innerHeight); gl.uniform1f(uScroll, scrollY); gl.uniform2f(uMouse, mx, my); gl.uniform1f(uQ, Q);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  requestAnimationFrame(loop);
})();
