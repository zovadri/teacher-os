(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,s;var r,a=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let s="",r="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":r+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,o):i+":"+o+";")}return s+(t&&a?t+"{"+a+"}":a)+r},c={},u=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+u(e[s]);return t}return e};function p(e){let t,s,r=this||{},a=e.call?e(r.p):e;return((e,t,s,r,a)=>{var i;let p=u(e),m=c[p]||(c[p]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(p));if(!c[m]){let t=p!==e?e:(e=>{let t,s,r=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(s=t[3].replace(n," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(n," ").trim();return r[0]})(e);c[m]=d(a?{["@keyframes "+m]:t}:t,s?"":"."+m)}let x=s&&c.g;return s&&(c.g=c[m]),i=c[m],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),m})(a.unshift?a.raw?(t=[].slice.call(arguments,1),s=r.p,a.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}p.bind({g:1});let m,x,f,b=p.bind({k:1});function y(e,t){let s=this||{};return function(){let r=arguments;function a(i,o){let l=Object.assign({},i),n=l.className||a.className;s.p=Object.assign({theme:x&&x()},l),s.o=/go\d/.test(n),l.className=p.apply(s,r)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),f&&d[0]&&f(l),m(d,l)}return t?t(a):a}}var h=(e,t)=>"function"==typeof e?e(t):e,g=(t=0,()=>(++t).toString()),v=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},j="default",w=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},E=(e,t=j)=>{C[t]=w(C[t]||k,e),N.forEach(([e,s])=>{e===t&&s(C[t])})},z=e=>Object.keys(C).forEach(t=>E(e,t)),$=(e=j)=>t=>{E(t,e)},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,s)=>{let r,a=((e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||g()}))(t,e,s);return $(a.toasterId||(r=a.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===r))))({type:2,toast:a}),a.id},M=(e,t)=>H("blank")(e,t);M.error=H("error"),M.success=H("success"),M.loading=H("loading"),M.custom=H("custom"),M.dismiss=(e,t)=>{let s={type:3,toastId:e};t?$(t)(s):z(s)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let s={type:4,toastId:e};t?$(t)(s):z(s)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,s)=>{let r=M.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?h(t.success,e):void 0;return a?M.success(a,{id:r,...s,...null==s?void 0:s.success}):M.dismiss(r),e}).catch(e=>{let a=t.error?h(t.error,e):void 0;a?M.error(a,{id:r,...s,...null==s?void 0:s.error}):M.dismiss(r)}),e};var O=1e3,B=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,S=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,T=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,A=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${S} 0.15s ease-out forwards;
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
    animation: ${T} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,I=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,P=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,L=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,_=b`
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
}`,F=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,R=y("div")`
  position: absolute;
`,U=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(q,null,t):t:"blank"===s?null:a.createElement(U,null,a.createElement(P,{...r}),"loading"!==s&&a.createElement(R,null,"error"===s?a.createElement(A,{...r}):a.createElement(F,{...r})))},Y=y("div")`
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
`,Z=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,G=a.memo(({toast:e,position:t,style:s,children:r})=>{let i=e.height?((e,t)=>{let s=e.includes("top")?1:-1,[r,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*s}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*s}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(V,{toast:e}),l=a.createElement(Z,{...e.ariaProps},h(e.message,e));return a.createElement(Y,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof r?r({icon:o,message:l}):a.createElement(a.Fragment,null,o,l))});r=a.createElement,d.p=void 0,m=r,x=void 0,f=void 0;var J=({id:e,className:t,style:s,onHeightUpdate:r,children:i})=>{let o=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:o,className:t,style:s},i)},Q=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:i,toasterId:o,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:s,pausedAt:r}=((e={},t=j)=>{let[s,r]=(0,a.useState)(C[t]||k),i=(0,a.useRef)(C[t]);(0,a.useEffect)(()=>(i.current!==C[t]&&r(C[t]),N.push([t,r]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=O)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&M.dismiss(s.id);return}return setTimeout(()=>M.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let l=(0,a.useCallback)($(t),[t]),n=(0,a.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,a.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,a.useCallback)(()=>{r&&l({type:6,time:Date.now()})},[r,l]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},o=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<l&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,o]),{toasts:s,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}})(s,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let o,l,n=s.position||t,d=c.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(o=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...l});return a.createElement(J,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?Q:"",style:u},"custom"===s.type?h(s.message,s):i?i(s):a.createElement(G,{toast:s,position:n}))}))},"default",0,M,"toast",0,M],5766)},98706,e=>{"use strict";var t=e.i(43476),s=e.i(75157);let r={sm:"w-8 h-8 text-xs",md:"w-10 h-10 text-sm",lg:"w-12 h-12 text-base"};e.s(["Avatar",0,function({src:e,alt:a="",name:i,size:o="md",className:l}){let n=i?i.split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase():"?";return e?(0,t.jsx)("img",{src:e,alt:a,className:(0,s.cn)("rounded-full object-cover border border-border",r[o],l)}):(0,t.jsx)("div",{className:(0,s.cn)("rounded-full bg-primary-100 text-primary flex items-center justify-center font-medium border border-primary-200",r[o],l),children:n})}])},5434,e=>{"use strict";var t=e.i(43476),s=e.i(22016),r=e.i(50719),a=e.i(98706),i=e.i(96395),o=e.i(31539),l=e.i(81604);e.s(["default",0,function({title:e,subtitle:n}){let{theme:d,toggleTheme:c}=(0,i.useThemeStore)(),u=(0,o.useSearchStore)(e=>e.toggleSearch);return(0,t.jsx)("header",{className:"sticky top-0 z-20 bg-surface/60 border-b border-border",children:(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 py-4",children:[(0,t.jsxs)("div",{children:[e&&(0,t.jsx)("h1",{className:"text-xl font-semibold text-text",children:e}),n&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-0.5",children:n})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)("button",{type:"button",onClick:u,className:"p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:(0,t.jsx)(r.HiSearch,{className:"w-5 h-5"})}),(0,t.jsx)("button",{type:"button",onClick:c,className:"p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:"dark"===d?(0,t.jsx)(r.HiSun,{className:"w-5 h-5"}):(0,t.jsx)(r.HiMoon,{className:"w-5 h-5"})}),(0,t.jsxs)(s.default,{href:"/teacher/notifications",className:"relative p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:[(0,t.jsx)(r.HiBell,{className:"w-5 h-5"}),(0,t.jsx)("span",{className:"absolute top-2 right-2 w-2 h-2 bg-error rounded-full"})]}),(0,t.jsx)(s.default,{href:"/teacher/settings",className:"mr-3",children:(0,t.jsx)(a.Avatar,{src:l.mockTeacher.avatar,name:l.mockTeacher.name,size:"sm"})})]})]})})}])},36825,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(46932),a=e.i(88653),i=e.i(50719),o=e.i(5434),l=e.i(5766);let n=[{id:"m1",title:"مذكرة الكيمياء - الباب الأول",description:"شرح وافي للعناصر الانتقالية مع أسئلة محلولة",subject:"الكيمياء",type:"pdf",size:"12.5 MB",downloads:2341,date:"2026-07-15"},{id:"m2",title:"قوانين الفيزياء كاملة",description:"جميع قوانين الكهربية والتيار المتردد في 10 صفحات",subject:"الفيزياء",type:"pdf",size:"3.2 MB",downloads:1876,date:"2026-07-14"},{id:"m3",title:"المراجعة النهائية - التفاضل",description:"مراجعة شاملة على التفاضل مع 50 سؤالاً",subject:"الرياضيات",type:"review",size:"8.1 MB",downloads:3102,date:"2026-07-12"},{id:"m4",title:"كتاب الشرح - النحو المبسط",description:"شرح وافٍ لقواعد النحو العربي للمرحلة الثانوية",subject:"العربي",type:"book",size:"25.4 MB",downloads:4567,date:"2026-07-10"},{id:"m5",title:"فيديو شرح - الباب الثالث كيمياء",description:"شرح تفصيلي للأحماض والقواعد مع تجارب عملية",subject:"الكيمياء",type:"video",size:"180 MB",downloads:5231,date:"2026-07-18"},{id:"m6",title:"امتحانات المحافظات - كيمياء",description:"نماذج امتحانات المحافظات للأعوام السابقة",subject:"الكيمياء",type:"exam",size:"4.8 MB",downloads:8902,date:"2026-07-08"},{id:"m7",title:"مذكرة الجرامر - English",description:"جميع قواعد اللغة الإنجليزية في 30 صفحة",subject:"الإنجليزي",type:"pdf",size:"5.6 MB",downloads:6543,date:"2026-07-16"},{id:"m8",title:"مراجعة ليلة الامتحان - فيزياء",description:"أهم المسائل المتوقعة مع الحلول النموذجية",subject:"الفيزياء",type:"review",size:"6.3 MB",downloads:4321,date:"2026-07-13"},{id:"m9",title:"فيديو تجارب كيميائية",description:"تجارب تفاعلية لجميع تفاعلات المنهج",subject:"الكيمياء",type:"video",size:"250 MB",downloads:3765,date:"2026-07-17"},{id:"m10",title:"امتحانات شهر مارس",description:"نماذج امتحانات شهرية مجمعة لجميع المواد",subject:"عام",type:"exam",size:"9.2 MB",downloads:7210,date:"2026-07-05"},{id:"m11",title:"كتاب التمارين - الرياضيات",description:"تمارين وتدريبات على التفاضل والتكامل",subject:"الرياضيات",type:"book",size:"18.7 MB",downloads:2987,date:"2026-07-09"},{id:"m12",title:"مذكرة البلاغة",description:"تلخيص شامل لعلم البلاغة مع الأمثلة",subject:"العربي",type:"pdf",size:"4.1 MB",downloads:5432,date:"2026-07-11"}],d=["الكل","مذكرات","كتب","مراجعات","فيديوهات","اختبارات"],c={pdf:"مذكرات",video:"فيديوهات",book:"كتب",exam:"اختبارات",review:"مراجعات"},u={pdf:i.HiDocumentText,video:i.HiVideoCamera,book:i.HiBookOpen,exam:i.HiDocument,review:i.HiOutlineDocument},p={الكيمياء:"bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",الفيزياء:"bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",الرياضيات:"bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",العربي:"bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",الإنجليزي:"bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",عام:"bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"};e.s(["default",0,function(){let[e,m]=(0,s.useState)(""),[x,f]=(0,s.useState)("الكل"),[b,y]=(0,s.useState)("newest"),h=(0,s.useMemo)(()=>{let t=n;if("الكل"!==x){let e=Object.entries(c).find(([,e])=>e===x)?.[0];e&&(t=t.filter(t=>t.type===e))}if(e){let s=e.toLowerCase();t=t.filter(e=>e.title.includes(s)||e.subject.includes(s)||e.description.includes(s))}return"newest"===b?t=[...t].sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime()):"popular"===b?t=[...t].sort((e,t)=>t.downloads-e.downloads):"subject"===b&&(t=[...t].sort((e,t)=>e.subject.localeCompare(t.subject))),t},[e,x,b]);return(0,t.jsxs)("div",{className:"min-h-screen bg-gradient-to-b from-surface to-surface-secondary",children:[(0,t.jsx)(o.default,{}),(0,t.jsxs)("div",{className:"p-6 md:p-8 lg:p-10 max-w-5xl mx-auto space-y-6",children:[(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},children:[(0,t.jsx)("h1",{className:"text-2xl font-bold text-text",children:"المكتبة"}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:"مذكرات، كتب، فيديوهات، ومراجعات لمساعدتك على التفوق"})]}),(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-3",children:[(0,t.jsxs)("div",{className:"relative flex-1 min-w-[200px]",children:[(0,t.jsx)(i.HiSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary"}),(0,t.jsx)("input",{value:e,onChange:e=>m(e.target.value),placeholder:"ابحث في المكتبة...",className:"w-full pr-10 pl-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"})]}),(0,t.jsx)("div",{className:"flex gap-1 bg-surface-secondary rounded-xl p-1 border border-border overflow-x-auto",children:d.map(e=>(0,t.jsx)("button",{type:"button",onClick:()=>f(e),className:`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${x===e?"bg-surface text-primary shadow-sm":"text-text-tertiary hover:text-text"}`,children:e},e))}),(0,t.jsxs)("select",{value:b,onChange:e=>y(e.target.value),className:"px-3 py-2 rounded-xl bg-surface border border-border text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer",children:[(0,t.jsx)("option",{value:"newest",children:"الأحدث"}),(0,t.jsx)("option",{value:"popular",children:"الأكثر تحميلاً"}),(0,t.jsx)("option",{value:"subject",children:"الموضوع"})]})]}),(0,t.jsx)(r.motion.div,{layout:!0,className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:(0,t.jsx)(a.AnimatePresence,{mode:"popLayout",children:h.map((e,s)=>{let a=u[e.type],o=p[e.subject]||"bg-gray-100 text-gray-600";return(0,t.jsxs)(r.motion.div,{layout:!0,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},transition:{delay:.02*s},className:"bg-surface rounded-2xl border border-border/60 p-6 hover:border-primary/30 hover:shadow-sm transition-all flex flex-col",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-3",children:[(0,t.jsx)("div",{className:"w-11 h-11 rounded-xl bg-surface-secondary flex items-center justify-center shrink-0",children:(0,t.jsx)(a,{className:"w-5 h-5 text-primary"})}),(0,t.jsx)("span",{className:`px-2 py-0.5 text-[10px] font-medium rounded-full ${o}`,children:e.subject})]}),(0,t.jsx)("h3",{className:"font-semibold text-text text-sm leading-snug",children:e.title}),(0,t.jsx)("p",{className:"text-xs text-text-secondary mt-1 flex-1",children:e.description}),(0,t.jsxs)("div",{className:"flex items-center justify-between mt-4 pt-3 border-t border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[10px] text-text-tertiary",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(i.HiOutlineClock,{className:"w-3 h-3"}),e.date]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(i.HiDownload,{className:"w-3 h-3"}),e.downloads]})]}),(0,t.jsx)("span",{className:"text-[10px] text-text-tertiary",children:e.size})]}),(0,t.jsxs)("button",{type:"button",onClick:()=>{"video"===e.type?l.toast.success("تمت إضافة الفيديو إلى قائمة المشاهدة!"):l.toast.success(`جاري تحميل "${e.title}"...`)},className:"mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary text-xs font-medium transition-colors",children:["video"===e.type?(0,t.jsx)(i.HiEye,{className:"w-3.5 h-3.5"}):(0,t.jsx)(i.HiDownload,{className:"w-3.5 h-3.5"}),"video"===e.type?"مشاهدة":"تحميل"]})]},e.id)})})}),0===h.length&&(0,t.jsxs)("div",{className:"text-center py-16 text-text-tertiary",children:[(0,t.jsx)(i.HiSearch,{className:"w-12 h-12 mx-auto mb-3 opacity-30"}),(0,t.jsx)("p",{children:"لا توجد نتائج للبحث"})]})]})]})}])}]);