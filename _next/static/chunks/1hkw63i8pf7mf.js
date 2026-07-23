(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,37757,e=>{"use strict";var t=e.i(43476),s=e.i(75157);e.s(["PageHeader",0,function({title:e,description:r,children:a,className:i,gradient:l=!1}){return(0,t.jsxs)("div",{className:(0,s.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,s.cn)("text-2xl font-bold",l?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),r&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:r})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},5766,e=>{"use strict";let t,s;var r,a=e.i(71645);let i={data:""},l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,o=/\n+/g,c=(e,t)=>{let s="",r="",a="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+l+";":r+="f"==i[1]?c(l,i):i+"{"+c(l,"k"==i[1]?"":t)+"}":"object"==typeof l?r+=c(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,l):i+":"+l+";")}return s+(t&&a?t+"{"+a+"}":a)+r},d={},m=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+m(e[s]);return t}return e};function u(e){let t,s,r=this||{},a=e.call?e(r.p):e;return((e,t,s,r,a)=>{var i;let u=m(e),x=d[u]||(d[u]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(u));if(!d[x]){let t=u!==e?e:(e=>{let t,s,r=[{}];for(;t=l.exec(e.replace(n,""));)t[4]?r.shift():t[3]?(s=t[3].replace(o," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(o," ").trim();return r[0]})(e);d[x]=c(a?{["@keyframes "+x]:t}:t,s?"":"."+x)}let p=s&&d.g;return s&&(d.g=d[x]),i=d[x],p?t.data=t.data.replace(p,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),x})(a.unshift?a.raw?(t=[].slice.call(arguments,1),s=r.p,a.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}u.bind({g:1});let x,p,h,f=u.bind({k:1});function b(e,t){let s=this||{};return function(){let r=arguments;function a(i,l){let n=Object.assign({},i),o=n.className||a.className;s.p=Object.assign({theme:p&&p()},n),s.o=/go\d/.test(o),n.className=u.apply(s,r)+(o?" "+o:""),t&&(n.ref=l);let c=e;return e[0]&&(c=n.as||e,delete n.as),h&&c[0]&&h(n),x(c,n)}return t?t(a):a}}var y=(e,t)=>"function"==typeof e?e(t):e,g=(t=0,()=>(++t).toString()),v=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},j="default",N=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},E=(e,t=j)=>{C[t]=N(C[t]||k,e),w.forEach(([e,s])=>{e===t&&s(C[t])})},O=e=>Object.keys(C).forEach(t=>E(e,t)),z=(e=j)=>t=>{E(t,e)},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,s)=>{let r,a=((e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||g()}))(t,e,s);return z(a.toasterId||(r=a.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===r))))({type:2,toast:a}),a.id},A=(e,t)=>H("blank")(e,t);A.error=H("error"),A.success=H("success"),A.loading=H("loading"),A.custom=H("custom"),A.dismiss=(e,t)=>{let s={type:3,toastId:e};t?z(t)(s):O(s)},A.dismissAll=e=>A.dismiss(void 0,e),A.remove=(e,t)=>{let s={type:4,toastId:e};t?z(t)(s):O(s)},A.removeAll=e=>A.remove(void 0,e),A.promise=(e,t,s)=>{let r=A.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?y(t.success,e):void 0;return a?A.success(a,{id:r,...s,...null==s?void 0:s.success}):A.dismiss(r),e}).catch(e=>{let a=t.error?y(t.error,e):void 0;a?A.error(a,{id:r,...s,...null==s?void 0:s.error}):A.dismiss(r)}),e};var D=1e3,S=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,P=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,T=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${S} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${M} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${P} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,I=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,L=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,q=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,_=f`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,B=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${_} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,F=b("div")`
  position: absolute;
`,R=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,U=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${U} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Q=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(G,null,t):t:"blank"===s?null:a.createElement(R,null,a.createElement(L,{...r}),"loading"!==s&&a.createElement(F,null,"error"===s?a.createElement(T,{...r}):a.createElement(B,{...r})))},K=b("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,X=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Y=a.memo(({toast:e,position:t,style:s,children:r})=>{let i=e.height?((e,t)=>{let s=e.includes("top")?1:-1,[r,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*s}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*s}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},l=a.createElement(Q,{toast:e}),n=a.createElement(X,{...e.ariaProps},y(e.message,e));return a.createElement(K,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof r?r({icon:l,message:n}):a.createElement(a.Fragment,null,l,n))});r=a.createElement,c.p=void 0,x=r,p=void 0,h=void 0;var Z=({id:e,className:t,style:s,onHeightUpdate:r,children:i})=>{let l=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:l,className:t,style:s},i)},J=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:i,toasterId:l,containerStyle:n,containerClassName:o})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:s,pausedAt:r}=((e={},t=j)=>{let[s,r]=(0,a.useState)(C[t]||k),i=(0,a.useRef)(C[t]);(0,a.useEffect)(()=>(i.current!==C[t]&&r(C[t]),w.push([t,r]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let l=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:l}})(e,t),i=(0,a.useRef)(new Map).current,l=(0,a.useCallback)((e,t=D)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&A.dismiss(s.id);return}return setTimeout(()=>A.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let n=(0,a.useCallback)(z(t),[t]),o=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,a.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),m=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},l=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=l.findIndex(t=>t.id===e.id),o=l.filter((e,t)=>t<n&&e.visible).length;return l.filter(e=>e.visible).slice(...r?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)l(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,l]),{toasts:s,handlers:{updateHeight:c,startPause:o,endPause:d,calculateOffset:m}}})(s,l);return a.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:o,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(s=>{let l,n,o=s.position||t,c=d.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}),m=(l=o.includes("top"),n=o.includes("center")?{justifyContent:"center"}:o.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(l?1:-1)}px)`,...l?{top:0}:{bottom:0},...n});return a.createElement(Z,{id:s.id,key:s.id,onHeightUpdate:d.updateHeight,className:s.visible?J:"",style:m},"custom"===s.type?y(s.message,s):i?i(s):a.createElement(Y,{toast:s,position:o}))}))},"default",0,A,"toast",0,A],5766)},64753,e=>{"use strict";var t=e.i(43476),s=e.i(75157),r=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:a}){return(0,t.jsx)("nav",{className:(0,s.cn)("flex items-center gap-1.5 text-sm text-text-secondary",a),children:e.map((e,s)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[s>0&&(0,t.jsx)(r.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},s))})}])},34133,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(46932),a=e.i(88653),i=e.i(50719),l=e.i(5766),n=e.i(37757),o=e.i(64753);let c=["الكيمياء","الفيزياء","الرياضيات"],d={الكيمياء:["المادة وخواصها","الذرة والجزيئات","الجدول الدوري","الروابط الكيميائية","المحاليل والأحماض","التفاعلات الكيميائية","الكيمياء العضوية","الكيمياء الحرارية"],الفيزياء:["القياس والوحدات","الحركة الخطية","القوى والحركة","الطاقة والشغل","الموجات والصوت","الضوء والبصريات","الكهرباء الساكنة"],الرياضيات:["الأساسيات والمصفوفات","المعادلات الخطية","الدوال والمتباينات","الهندسة التحليلية","التفاضل والتكامل","الإحصاء والاحتمالات"]},m={الكيمياء:["دراسة المادة وتركيبها وخصائصها المختلفة","تعلم بنية الذرة وتكوين الجزيئات","استكشاف ترتيب العناصر في الجدول الدوري","فهم أنواع الروابط بين الذرات","دراسة المحاليل والأحماض والقواعد","أنواع التفاعلات الكيميائية وكيفية حدوثها","مقدمة في الكيمياء العضوية والمركبات","المفاهيم الأساسية للكيمياء الحرارية"],الفيزياء:["المفاهيم الأساسية للقياس والوحدات الفيزيائية","دراسة الحركة في خط مستقيم","قوانين نيوتن للحركة وتطبيقاتها","مفهوم الطاقة وأنواعها والشغل","الموجات الميكانيكية والصوتية","خصائص الضوء والبصريات الهندسية","الكهرباء الساكنة والشحنات الكهربائية"],الرياضيات:["المصفوفات والعمليات عليها","حل المعادلات الخطية بيانياً وجبرياً","الدوال الجبرية والمتباينات","الهندسة في المستوى الإحداثي","مبادئ التفاضل والتكامل","تحليل البيانات والاحتمالات"]},u={الكيمياء:[3,4,2,5,3,6,4,3],الفيزياء:[4,3,5,2,4,3,5],الرياضيات:[3,4,3,5,4,3]},x={الكيمياء:[60,65,70,75,70,80,75,70],الفيزياء:[55,60,70,65,75,70,65],الرياضيات:[50,65,70,75,80,70]},p=["أحمد محمد علي","سارة خالد حسن","عمر عبدالله أحمد","مريم يوسف محمود","خالد إبراهيم محمد","نورة سعد عبدالرحمن","فيصل تركي العنزي","لينا فهد المطيري","ماجد عبدالعزيز الشمري","هديل ناصر الدوسري"],h={الكيمياء:["الجدول الدوري","الروابط الكيميائية","المحاليل والأحماض","التفاعلات الكيميائية","الجدول الدوري","الروابط الكيميائية","المادة وخواصها","الذرة والجزيئات","التفاعلات الكيميائية","المحاليل والأحماض"],الفيزياء:["الحركة الخطية","القوى والحركة","الطاقة والشغل","الموجات والصوت","القوى والحركة","الحركة الخطية","القياس والوحدات","الضوء والبصريات","الطاقة والشغل","الموجات والصوت"],الرياضيات:["المعادلات الخطية","الدوال والمتباينات","الهندسة التحليلية","التفاضل والتكامل","المعادلات الخطية","الدوال والمتباينات","الهندسة التحليلية","المعادلات الخطية","التفاضل والتكامل","الدوال والمتباينات"]},f=["available","available","locked","locked","locked","locked","locked","locked"],b=c.map(function(e){let t=d[e],s=m[e],r=u[e],a=x[e];t.length;let i=t.map((e,t)=>{let i=[];return(2===t||3===t)&&i.push(1),4===t&&i.push(3),5===t&&i.push(3),6===t&&i.push(4,5),7===t&&i.push(5),{id:t,title:e,description:s[t],status:f[t<f.length?t:t%f.length],passingGrade:a[t],resourcesCount:r[t],prerequisites:i,hasQuiz:t%2==0,hasHomework:t%3==0}});return{id:c.indexOf(e),name:e,lessons:i}}),y={};function g(e,t,s){let r=s.get(t);if(void 0!==r)return r;let a=e.find(e=>e.id===t);if(!a||0===a.prerequisites.length)return s.set(t,0),0;let i=Math.max(...a.prerequisites.map(t=>g(e,t,s)))+1;return s.set(t,i),i}c.forEach(e=>{let t=h[e];y[e]=p.map((s,r)=>({id:r,name:s,avatar:`https://api.dicebear.com/7.x/avataaars/svg?seed=${r+e.length}`,progress:(8*r+15)%100,currentLesson:t[r]}))});let v={locked:"bg-surface-tertiary border-border",available:"bg-success/5 border-success/20",completed:"bg-primary/5 border-primary/20"},j={locked:"bg-surface-tertiary text-text-tertiary",available:"bg-success/10 text-success",completed:"bg-primary/10 text-primary"},N={locked:"مغلقة",available:"متاحة",completed:"مكتملة"};e.s(["default",0,function(){let[e,d]=(0,s.useState)(0),[m,u]=(0,s.useState)(b[0].lessons),[x,p]=(0,s.useState)(!1),[h,f]=(0,s.useState)(!1),[w,k]=(0,s.useState)(null),[C,E]=(0,s.useState)(""),[O,z]=(0,s.useState)(""),[$,H]=(0,s.useState)(70),[A,D]=(0,s.useState)([]),[S,M]=(0,s.useState)(!1),[P,T]=(0,s.useState)(!1),I=c[e],L=(0,s.useCallback)(e=>{let t=Number(e.target.value);d(t),u(b[t].lessons),p(!1),q()},[]),q=(0,s.useCallback)(()=>{E(""),z(""),H(70),D([]),M(!1),T(!1)},[]),_=(0,s.useMemo)(()=>new Map,[m]);(0,s.useMemo)(()=>{_.clear(),m.forEach(e=>g(m,e.id,_))},[m,_]);let B=(0,s.useMemo)(()=>{let e=new Map,t=new Map;return m.forEach(s=>{let r=g(m,s.id,e),a=t.get(r)||[];a.push(s),t.set(r,a)}),t},[m]);(0,s.useMemo)(()=>{let e;return e=new Map,m.forEach(t=>e.set(t.id,[])),m.forEach(t=>{t.prerequisites.forEach(s=>{let r=e.get(s)||[];r.push(t.id),e.set(s,r)})}),e},[m]);let F=(0,s.useMemo)(()=>Math.max(0,...Array.from(B.keys())),[B]),R=(0,s.useCallback)(()=>{if(!C.trim())return void l.default.error("يرجى إدخال اسم الدرس");let e={id:m.length,title:C.trim(),description:O.trim(),status:"locked",passingGrade:$,resourcesCount:0,prerequisites:A,hasQuiz:S,hasHomework:P};u(t=>[...t,e]),l.default.success("تمت إضافة الدرس بنجاح"),p(!1),q()},[C,O,$,A,S,P,m.length,q]),U=(0,s.useCallback)(e=>{u(t=>t.filter(t=>t.id!==e).map((t,s)=>({...t,id:s,prerequisites:t.prerequisites.filter(t=>t!==e).map(t=>t>e?t-1:t)}))),l.default.success("تم حذف الدرس")},[]),G=(0,s.useCallback)(e=>{k(e)},[]),Q=(0,s.useCallback)((e,t)=>{e.preventDefault(),null!==w&&w!==t&&(u(e=>{let s=[...e],[r]=s.splice(w,1);return s.splice(t,0,r),s.map((e,t)=>({...e,id:t}))}),k(t))},[w]),K=(0,s.useCallback)(()=>{k(null)},[]),X=(0,s.useCallback)(()=>{f(!0),setTimeout(()=>{f(!1),l.default.success("تم نشر المسار بنجاح")},1500)},[]),Y=(0,s.useCallback)(e=>{D(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])},[]),Z=y[I]||[];return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(o.Breadcrumb,{items:[{label:"الكورسات",href:"/teacher/courses"},{label:"مسار التعلم"}]}),(0,t.jsx)(n.PageHeader,{title:"مسارات التعلم",description:"إنشاء وإدارة مسارات التعلم المتسلسلة للدروس"}),(0,t.jsxs)("div",{className:"p-4 md:p-6 max-w-7xl mx-auto space-y-6",children:[(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("label",{htmlFor:"course-select",className:"text-sm font-medium text-text-secondary",children:"اختر المادة:"}),(0,t.jsx)("select",{id:"course-select",value:e,onChange:L,className:"px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer min-w-[160px]",children:c.map((e,s)=>(0,t.jsx)("option",{value:s,children:e},e))})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>p(!0),className:"flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-sm",children:[(0,t.jsx)(i.HiOutlinePlus,{size:18}),(0,t.jsx)("span",{children:"إضافة درس"})]}),(0,t.jsxs)("button",{type:"button",onClick:X,disabled:h,className:"flex items-center gap-2 px-4 py-2 bg-success text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50",children:[(0,t.jsx)(i.HiOutlineCheckCircle,{size:18}),(0,t.jsx)("span",{children:h?"جاري النشر...":"نشر المسار"})]})]})]}),(0,t.jsx)("div",{className:"bg-surface border border-border rounded-2xl p-4 md:p-6 overflow-x-auto",children:(0,t.jsx)("div",{className:"min-w-[600px]",children:(0,t.jsx)("div",{className:"flex items-start justify-center gap-6",dir:"ltr",children:Array.from({length:F+1},(e,s)=>{let r=B.get(s)||[];return(0,t.jsxs)("div",{className:"flex flex-col items-center gap-4 flex-1 min-w-0",children:[s>0&&(0,t.jsxs)("div",{className:"text-xs text-text-tertiary mb-1 font-medium",children:["المستوى ",s+1]}),0===s&&(0,t.jsx)("div",{className:"text-xs text-text-tertiary mb-1 font-medium",children:"المستوى الأساسي"}),0===r.length&&(0,t.jsx)("div",{className:"text-xs text-text-tertiary py-4",children:"—"}),r.map((e,r)=>{let a=m.findIndex(t=>t.id===e.id);return(0,t.jsxs)("div",{draggable:!0,onDragStart:()=>G(a),onDragOver:e=>Q(e,a),onDragEnd:K,className:`relative w-full max-w-[220px] cursor-grab active:cursor-grabbing rounded-xl border-2 p-3 transition-all ${w===a?"opacity-50 border-primary shadow-md":v[e.status]}`,children:[s>0&&(0,t.jsx)("div",{className:"absolute -top-[18px] left-1/2 -translate-x-1/2 flex items-center justify-center",children:(0,t.jsx)(i.HiOutlineArrowRight,{size:14,className:"text-border rotate-180"})}),(0,t.jsxs)("div",{className:"flex items-start justify-between mb-2",children:[(0,t.jsx)("span",{className:`text-xs font-bold px-2 py-0.5 rounded-full ${j[e.status]}`,children:N[e.status]}),(0,t.jsx)("button",{type:"button",onClick:()=>U(e.id),className:"p-0.5 text-text-tertiary hover:text-error transition-colors rounded",title:"حذف الدرس",children:(0,t.jsx)(i.HiOutlineTrash,{size:14})})]}),(0,t.jsx)("h4",{className:"text-sm font-semibold text-text mb-1 leading-tight",children:e.title}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary mb-2 line-clamp-2",children:e.description}),(0,t.jsxs)("div",{className:"flex items-center gap-2 text-xs text-text-secondary mb-1",children:[(0,t.jsx)(i.HiOutlineAdjustments,{size:14}),(0,t.jsxs)("span",{children:["نسبة النجاح: ",e.passingGrade,"%"]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 text-xs text-text-secondary",children:[(0,t.jsx)(i.HiOutlineBookOpen,{size:14}),(0,t.jsxs)("span",{children:[e.resourcesCount," موارد"]})]}),e.prerequisites.length>0&&(0,t.jsxs)("div",{className:"mt-2 pt-2 border-t border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1 text-xs text-text-tertiary",children:[(0,t.jsx)(i.HiOutlineLink,{size:12}),(0,t.jsx)("span",{children:"يعتمد على: "})]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1 mt-1",children:e.prerequisites.map(e=>{let s=m.find(t=>t.id===e);return s?(0,t.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded bg-surface-tertiary text-text-tertiary",children:s.title},e):null})})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mt-2 text-[10px] text-text-tertiary",children:[e.hasQuiz&&(0,t.jsx)("span",{className:"px-1.5 py-0.5 rounded bg-warning/10 text-warning",children:"اختبار"}),e.hasHomework&&(0,t.jsx)("span",{className:"px-1.5 py-0.5 rounded bg-info/10 text-info",children:"واجب"})]})]},e.id)})]},s)})})})}),(0,t.jsxs)("div",{className:"bg-surface border border-border rounded-2xl p-4 md:p-6",children:[(0,t.jsxs)("h2",{className:"text-lg font-bold text-text mb-4 flex items-center gap-2",children:[(0,t.jsx)(i.HiOutlineUserGroup,{size:20,className:"text-primary"}),"الطلاب المسجلين",(0,t.jsxs)("span",{className:"text-sm font-normal text-text-tertiary",children:["(",Z.length," طالب)"]})]}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border text-xs text-text-tertiary",children:[(0,t.jsx)("th",{className:"text-right py-3 px-3 font-medium",children:"الطالب"}),(0,t.jsx)("th",{className:"text-right py-3 px-3 font-medium",children:"التقدم"}),(0,t.jsx)("th",{className:"text-right py-3 px-3 font-medium",children:"الدرس الحالي"}),(0,t.jsx)("th",{className:"text-right py-3 px-3 font-medium",children:"شريط التقدم"})]})}),(0,t.jsx)("tbody",{children:Z.map((e,s)=>(0,t.jsxs)(r.motion.tr,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.03*s},className:"border-b border-border-light hover:bg-surface-secondary transition-colors",children:[(0,t.jsx)("td",{className:"py-3 px-3",children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("img",{src:e.avatar,alt:e.name,className:"w-7 h-7 rounded-full bg-surface-tertiary"}),(0,t.jsx)("span",{className:"font-medium text-text",children:e.name})]})}),(0,t.jsx)("td",{className:"py-3 px-3",children:(0,t.jsxs)("span",{className:"font-bold text-primary",children:[e.progress,"%"]})}),(0,t.jsx)("td",{className:"py-3 px-3",children:(0,t.jsx)("span",{className:"text-text-secondary",children:e.currentLesson})}),(0,t.jsx)("td",{className:"py-3 px-3 min-w-[140px]",children:(0,t.jsx)("div",{className:"h-2 rounded-full bg-surface-tertiary overflow-hidden",children:(0,t.jsx)("div",{className:"h-full rounded-full bg-primary transition-all duration-500",style:{width:`${e.progress}%`}})})})]},e.id))})]})})]})]}),(0,t.jsx)(a.AnimatePresence,{children:x&&(0,t.jsx)(r.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4",onClick:()=>p(!1),children:(0,t.jsxs)(r.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},onClick:e=>e.stopPropagation(),className:"bg-surface rounded-2xl border border-border shadow-xl w-full max-w-lg p-6 space-y-5",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-text",children:"إضافة درس جديد"}),(0,t.jsx)("button",{type:"button",onClick:()=>p(!1),className:"p-1.5 rounded-lg hover:bg-surface-tertiary text-text-tertiary transition-colors",children:(0,t.jsx)(i.HiOutlineX,{size:20})})]}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary mb-1.5",children:"اسم الدرس"}),(0,t.jsx)("input",{type:"text",value:C,onChange:e=>E(e.target.value),placeholder:"أدخل اسم الدرس",className:"w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary mb-1.5",children:"الوصف"}),(0,t.jsx)("textarea",{value:O,onChange:e=>z(e.target.value),placeholder:"وصف مختصر للدرس",rows:3,className:"w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("label",{className:"block text-sm font-medium text-text-secondary mb-1.5",children:["درجة النجاح المطلوبة: ",$,"%"]}),(0,t.jsx)("input",{type:"range",min:50,max:100,value:$,onChange:e=>H(Number(e.target.value)),className:"w-full h-2 rounded-full bg-surface-tertiary appearance-none cursor-pointer accent-primary"}),(0,t.jsxs)("div",{className:"flex justify-between text-xs text-text-tertiary mt-1",children:[(0,t.jsx)("span",{children:"50%"}),(0,t.jsx)("span",{children:"100%"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary mb-1.5",children:"الدروس السابقة (اختياري)"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 border border-border rounded-xl bg-surface-secondary",children:[m.map(e=>(0,t.jsxs)("label",{className:"flex items-center gap-2 p-2 rounded-lg hover:bg-surface cursor-pointer transition-colors",children:[(0,t.jsx)("input",{type:"checkbox",checked:A.includes(e.id),onChange:()=>Y(e.id),className:"accent-primary w-4 h-4"}),(0,t.jsx)("span",{className:"text-sm text-text",children:e.title})]},e.id)),0===m.length&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary col-span-2 text-center py-4",children:"لا توجد دروس مضافة بعد"})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-6",children:[(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:S,onChange:e=>M(e.target.checked),className:"accent-primary w-4 h-4"}),(0,t.jsx)("span",{className:"text-sm text-text",children:"اختبار"})]}),(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:P,onChange:e=>T(e.target.checked),className:"accent-primary w-4 h-4"}),(0,t.jsx)("span",{className:"text-sm text-text",children:"واجب منزلي"})]})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3 pt-2",children:[(0,t.jsx)("button",{type:"button",onClick:R,className:"flex-1 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors",children:"إضافة الدرس"}),(0,t.jsx)("button",{type:"button",onClick:()=>p(!1),className:"px-4 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-xl hover:bg-surface-tertiary transition-colors",children:"إلغاء"})]})]})})})]})}])}]);