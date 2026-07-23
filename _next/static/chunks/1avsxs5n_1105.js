(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32098,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(75157),a=e.i(46932),i=e.i(88653),n=e.i(50719);let l={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:o,title:d,children:c,className:x,size:m="md"}){let u=(0,s.useCallback)(e=>{"Escape"===e.key&&o()},[o]);return(0,s.useEffect)(()=>(e&&(document.addEventListener("keydown",u),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",u),document.body.style.overflow=""}),[e,u]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:o}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,r.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",l[m],x),children:[d&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:d}),(0,t.jsx)("button",{onClick:o,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(n.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,r.cn)("px-6 pb-6",!d&&"pt-6"),children:c})]})]})})}])},64753,e=>{"use strict";var t=e.i(43476),s=e.i(75157),r=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:a}){return(0,t.jsx)("nav",{className:(0,s.cn)("flex items-center gap-1.5 text-sm text-text-secondary",a),children:e.map((e,s)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[s>0&&(0,t.jsx)(r.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},s))})}])},5766,e=>{"use strict";let t,s;var r,a=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,o=/\n+/g,d=(e,t)=>{let s="",r="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+n+";":r+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,n):i+":"+n+";")}return s+(t&&a?t+"{"+a+"}":a)+r},c={},x=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+x(e[s]);return t}return e};function m(e){let t,s,r=this||{},a=e.call?e(r.p):e;return((e,t,s,r,a)=>{var i;let m=x(e),u=c[m]||(c[m]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(m));if(!c[u]){let t=m!==e?e:(e=>{let t,s,r=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(s=t[3].replace(o," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(o," ").trim();return r[0]})(e);c[u]=d(a?{["@keyframes "+u]:t}:t,s?"":"."+u)}let p=s&&c.g;return s&&(c.g=c[u]),i=c[u],p?t.data=t.data.replace(p,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),u})(a.unshift?a.raw?(t=[].slice.call(arguments,1),s=r.p,a.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}m.bind({g:1});let u,p,h,f=m.bind({k:1});function b(e,t){let s=this||{};return function(){let r=arguments;function a(i,n){let l=Object.assign({},i),o=l.className||a.className;s.p=Object.assign({theme:p&&p()},l),s.o=/go\d/.test(o),l.className=m.apply(s,r)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),h&&d[0]&&h(l),u(d,l)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},j="default",N=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},E=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,s])=>{e===t&&s(k[t])})},S=e=>Object.keys(k).forEach(t=>E(e,t)),O=(e=j)=>t=>{E(t,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},_=e=>(t,s)=>{let r,a=((e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||y()}))(t,e,s);return O(a.toasterId||(r=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===r))))({type:2,toast:a}),a.id},H=(e,t)=>_("blank")(e,t);H.error=_("error"),H.success=_("success"),H.loading=_("loading"),H.custom=_("custom"),H.dismiss=(e,t)=>{let s={type:3,toastId:e};t?O(t)(s):S(s)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let s={type:4,toastId:e};t?O(t)(s):S(s)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,s)=>{let r=H.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?H.success(a,{id:r,...s,...null==s?void 0:s.success}):H.dismiss(r),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?H.error(a,{id:r,...s,...null==s?void 0:s.error}):H.dismiss(r)}),e};var D=1e3,$=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,I=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,A=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,P=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${$} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${I} 0.15s ease-out forwards;
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
    animation: ${A} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,T=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${T} 1s linear infinite;
`,B=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,L=f`
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
}`,q=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${L} 0.2s ease-out forwards;
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
`,R=b("div")`
  position: absolute;
`,F=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,G=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,U=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(Q,null,t):t:"blank"===s?null:a.createElement(F,null,a.createElement(M,{...r}),"loading"!==s&&a.createElement(R,null,"error"===s?a.createElement(P,{...r}):a.createElement(q,{...r})))},K=b("div")`
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
`,V=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=a.memo(({toast:e,position:t,style:s,children:r})=>{let i=e.height?((e,t)=>{let s=e.includes("top")?1:-1,[r,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*s}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*s}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(U,{toast:e}),l=a.createElement(V,{...e.ariaProps},g(e.message,e));return a.createElement(K,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof r?r({icon:n,message:l}):a.createElement(a.Fragment,null,n,l))});r=a.createElement,d.p=void 0,u=r,p=void 0,h=void 0;var Y=({id:e,className:t,style:s,onHeightUpdate:r,children:i})=>{let n=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:n,className:t,style:s},i)},Z=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:i,toasterId:n,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:s,pausedAt:r}=((e={},t=j)=>{let[s,r]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&r(k[t]),w.push([t,r]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let n=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:n}})(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=D)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&H.dismiss(s.id);return}return setTimeout(()=>H.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let l=(0,a.useCallback)(O(t),[t]),o=(0,a.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,a.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,a.useCallback)(()=>{r&&l({type:6,time:Date.now()})},[r,l]),x=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},n=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...r?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,n]),{toasts:s,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:x}}})(s,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let n,l,o=s.position||t,d=c.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}),x=(n=o.includes("top"),l=o.includes("center")?{justifyContent:"center"}:o.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...l});return a.createElement(Y,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?Z:"",style:x},"custom"===s.type?g(s.message,s):i?i(s):a.createElement(X,{toast:s,position:o}))}))},"default",0,H,"toast",0,H],5766)},96640,e=>{"use strict";var t=e.i(43476),s=e.i(75157);let r={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:l,dot:o=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,s.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",r[i],a[n],l),children:[o&&(0,t.jsx)("span",{className:(0,s.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),s=e.i(75157);e.s(["Card",0,function({children:e,className:r,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,s.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",r),children:e})},"CardContent",0,function({children:e,className:r}){return(0,t.jsx)("div",{className:(0,s.cn)("px-7 pb-7",r),children:e})},"CardDescription",0,function({children:e,className:r}){return(0,t.jsx)("p",{className:(0,s.cn)("text-sm text-text-secondary mt-1",r),children:e})},"CardFooter",0,function({children:e,className:r}){return(0,t.jsx)("div",{className:(0,s.cn)("px-7 py-4 border-t border-border/60",r),children:e})},"CardHeader",0,function({children:e,className:r}){return(0,t.jsx)("div",{className:(0,s.cn)("px-7 pt-7 pb-2",r),children:e})},"CardTitle",0,function({children:e,className:r}){return(0,t.jsx)("h3",{className:(0,s.cn)("text-lg font-semibold text-text",r),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),s=e.i(75157);e.s(["PageHeader",0,function({title:e,description:r,children:a,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,s.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,s.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),r&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:r})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},67073,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(75157),a=e.i(50719);let i=(0,s.forwardRef)(({label:e,error:s,options:i,placeholder:n,className:l,...o},d)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:d,className:(0,r.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",s&&"border-error/40 focus:ring-error/15 focus:border-error/50",l),...o,children:[n&&(0,t.jsx)("option",{value:"",children:n}),i.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(a.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),s&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:s})]}));i.displayName="Select",e.s(["default",0,i])},51312,e=>{"use strict";var t=e.i(43476),s=e.i(75157),r=e.i(50719);e.s(["ErrorState",0,function({title:e="حدث خطأ",description:a="حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",icon:i=r.HiOutlineExclamationCircle,action:n,className:l}){return(0,t.jsxs)("div",{className:(0,s.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",l),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-error/10 border border-error/20 flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-error"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},59544,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},n={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},l=(0,s.forwardRef)(({variant:e="primary",size:s="md",isLoading:l,leftIcon:o,rightIcon:d,className:c,disabled:x,children:m,...u},p)=>(0,t.jsxs)("button",{ref:p,disabled:x||l,className:(0,r.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],n[s],c),...u,children:[l?(0,t.jsx)(a.Spinner,{size:"sm"}):o,m,!l&&d]}));l.displayName="Button",e.s(["default",0,l])},40803,e=>{"use strict";var t=e.i(43476),s=e.i(75157),r=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=r.HiOutlineInbox,action:n,className:l}){return(0,t.jsxs)("div",{className:(0,s.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",l),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},88442,e=>{"use strict";var t=e.i(43476),s=e.i(75157);e.s(["CardSkeleton",0,function({count:e=3}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:Array.from({length:e}).map((e,s)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-5 flex-1 bg-card/80 animate-pulse rounded-[8px]"})]}),(0,t.jsx)("div",{className:"h-4 w-3/4 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-1/2 bg-card/80 animate-pulse rounded-[8px]"})]},s))})},"Skeleton",0,function({className:e,variant:r="text"}){return(0,t.jsx)("div",{className:(0,s.cn)("animate-pulse bg-card/80","circular"===r&&"rounded-full","text"===r&&"h-4 rounded-[8px]","rectangular"===r&&"rounded-[14px]",e)})},"StatsSkeleton",0,function({count:e=4}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:Array.from({length:e}).map((e,s)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsx)("div",{className:"w-11 h-11 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-8 w-32 bg-card/80 animate-pulse rounded-[8px]"})]},s))})},"TableSkeleton",0,function({rows:e=5}){return(0,t.jsxs)("div",{className:"border border-border rounded-[16px] overflow-hidden",children:[(0,t.jsx)("div",{className:"bg-card/50 border-b border-border px-4 py-3",children:(0,t.jsx)("div",{className:"h-4 w-32 bg-card/80 animate-pulse rounded-[8px]"})}),Array.from({length:e}).map((e,s)=>(0,t.jsxs)("div",{className:"border-b border-border last:border-b-0 px-4 py-3 flex items-center gap-4",children:[(0,t.jsx)("div",{className:"h-4 flex-1 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-16 bg-card/80 animate-pulse rounded-[8px]"})]},s))]})}])},60082,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(46932),a=e.i(50719),i=e.i(5766),n=e.i(39964),l=e.i(37757),o=e.i(96640),d=e.i(59544),c=e.i(67073),x=e.i(32098),m=e.i(88442),u=e.i(40803),p=e.i(51312),h=e.i(81604),f=e.i(64753),b=e.i(75157);let g={"multiple-choice":"اختيار من متعدد","true-false":"صواب/خطأ","fill-blank":"ملء الفراغ",essay:"مقالي",ordering:"ترتيب",matching:"مطابقة"},y={easy:"success",medium:"warning",hard:"error"};e.s(["default",0,function(){let{data:e,loading:v,error:j,retry:N}=function(){let[e,t]=(0,s.useState)(!0),[r,a]=(0,s.useState)(null),[i,n]=(0,s.useState)([]),l=(0,s.useCallback)(()=>{t(!0),a(null),setTimeout(()=>{try{if((0,b.det)()>.1)n(h.mockExamVersions);else throw Error("فشل تحميل النسخ")}catch(e){a(e.message)}finally{t(!1)}},800)},[]);return(0,s.useEffect)(()=>{l()},[l]),{data:i,loading:e,error:r,retry:l}}(),[w,C]=(0,s.useState)(""),[k,E]=(0,s.useState)(null),[S,O]=(0,s.useState)(""),[z,_]=(0,s.useState)(""),[H,D]=(0,s.useState)(!1),[$,I]=(0,s.useState)(!1),A=(0,s.useMemo)(()=>[{value:"",label:"اختر الامتحان..."},...h.mockExams.map(e=>({value:e.id,label:e.title}))],[]),P=(0,s.useMemo)(()=>w?e.filter(e=>e.examId===w):[],[e,w]),T=(0,s.useMemo)(()=>h.mockExams.find(e=>e.id===w),[w]),M=(0,s.useMemo)(()=>e.filter(e=>e.examId===w),[e,w]),B=(0,s.useMemo)(()=>[{value:"",label:"اختر..."},...M.map(e=>({value:e.id,label:e.label}))],[M]),L=(0,s.useMemo)(()=>{if(!S||!z)return null;let t=e.find(e=>e.id===S),s=e.find(e=>e.id===z);return t&&s?{a:t,b:s}:null},[S,z,e]);return j?(0,t.jsxs)("div",{className:"p-4 md:p-6",children:[(0,t.jsx)(l.PageHeader,{title:"نسخ الامتحان",description:"إدارة نسخ متعددة للامتحان"}),(0,t.jsx)(p.ErrorState,{description:j,onRetry:N})]}):(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",dir:"rtl",children:[(0,t.jsx)(f.Breadcrumb,{items:[{label:"الامتحانات",href:"/teacher/exams"},{label:"إصدارات متعددة"}]}),(0,t.jsx)(l.PageHeader,{title:"نسخ الامتحان",description:"إدارة نسخ متعددة للامتحان",actions:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)(d.default,{variant:"secondary",onClick:()=>D(!0),rightIcon:(0,t.jsx)(a.HiOutlineScale,{size:18}),children:"مقارنة النسخ"}),(0,t.jsx)(d.default,{variant:"primary",onClick:()=>I(!0),rightIcon:(0,t.jsx)(a.HiOutlinePlus,{size:18}),children:"إضافة نسخة"})]})}),(0,t.jsx)(n.Card,{children:(0,t.jsxs)(n.CardContent,{className:"space-y-4",children:[(0,t.jsx)(c.default,{label:"اختر الامتحان",options:A,value:w,onChange:e=>C(e.target.value)}),T&&(0,t.jsxs)("div",{className:"text-sm text-text-secondary",children:[(0,t.jsx)("span",{className:"font-medium text-text",children:T.title})," | ",T.questions.length," سؤال | ",T.totalGrade," درجة"]})]})}),v&&(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",children:Array.from({length:3},(e,s)=>(0,t.jsx)(n.Card,{children:(0,t.jsxs)(n.CardContent,{className:"space-y-3",children:[(0,t.jsx)(m.Skeleton,{className:"h-5 w-1/3"}),(0,t.jsx)(m.Skeleton,{className:"h-4 w-2/3"}),(0,t.jsx)(m.Skeleton,{className:"h-3 w-1/2"}),(0,t.jsxs)("div",{className:"flex gap-2 pt-2",children:[(0,t.jsx)(m.Skeleton,{className:"h-8 w-20"}),(0,t.jsx)(m.Skeleton,{className:"h-8 w-20"})]})]})},s))}),!v&&!w&&(0,t.jsx)(u.EmptyState,{icon:a.HiOutlineTemplate,title:"اختر امتحاناً",description:"يرجى اختيار امتحان من القائمة أعلاه لعرض النسخ المتاحة"}),!v&&w&&0===P.length&&(0,t.jsx)(u.EmptyState,{icon:a.HiOutlineDocumentDuplicate,title:"لا توجد نسخ",description:"لم يتم إنشاء نسخ لهذا الامتحان بعد. أضف نسخة جديدة للبدء.",action:(0,t.jsx)(d.default,{variant:"primary",onClick:()=>I(!0),rightIcon:(0,t.jsx)(a.HiOutlinePlus,{size:18}),children:"إضافة نسخة"})}),!v&&P.length>0&&(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",children:P.map((e,s)=>(0,t.jsx)(r.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.05*s},children:(0,t.jsx)(n.Card,{className:"h-full",children:(0,t.jsxs)(n.CardContent,{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center",children:(0,t.jsx)(a.HiOutlineDocumentDuplicate,{className:"text-primary",size:20})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-semibold text-text",children:e.label}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:[e.questions.length," أسئلة"]})]})]}),(0,t.jsxs)(o.Badge,{variant:"primary",children:[e.totalGrade," درجة"]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3 text-xs text-text-secondary",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(a.HiOutlineStatusOffline,{size:14}),e.shuffleQuestions?"ترتيب عشوائي":"ترتيب ثابت"]}),(0,t.jsxs)("span",{className:(0,b.cn)("px-2 py-0.5 rounded-full",e.shuffleQuestions?"bg-success/10 text-success":"bg-surface-tertiary text-text-tertiary"),children:[(e.shuffleQuestions,"أسئلة")," ",e.shuffleQuestions?"عشوائية":"مرتبة"]})]}),(0,t.jsx)("div",{className:"pt-2 border-t border-border",children:(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(d.default,{variant:"secondary",size:"sm",onClick:()=>E(e),rightIcon:(0,t.jsx)(a.HiOutlineEye,{size:16}),children:"معاينة"}),(0,t.jsx)(d.default,{variant:"secondary",size:"sm",onClick:()=>{var t;return t=e.label,void i.default.success(`جاري طباعة ${t}`)},rightIcon:(0,t.jsx)(a.HiOutlinePrinter,{size:16}),children:"طباعة النسخة"})]})})]})})},e.id))}),(0,t.jsx)(x.Modal,{isOpen:!!k,onClose:()=>E(null),title:`معاينة: ${k?.label}`,size:"xl",children:k&&(0,t.jsx)("div",{className:"space-y-4 max-h-[70vh] overflow-y-auto",children:k.questions.map((e,s)=>(0,t.jsx)(n.Card,{children:(0,t.jsxs)(n.CardContent,{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold",children:s+1}),(0,t.jsx)("span",{className:"text-sm font-medium text-text",children:e.text})]}),(0,t.jsxs)("div",{className:"flex gap-1 shrink-0",children:[(0,t.jsx)(o.Badge,{variant:"info",size:"sm",children:g[e.type]}),(0,t.jsx)(o.Badge,{variant:y[e.difficulty],size:"sm",children:"easy"===e.difficulty?"سهل":"medium"===e.difficulty?"متوسط":"صعب"})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3 text-xs text-text-secondary",children:[(0,t.jsxs)("span",{children:["الدرجة: ",e.grade]}),(0,t.jsxs)("span",{children:["الوقت: ",e.suggestedTime," د"]}),e.tags.length>0&&(0,t.jsxs)("span",{children:["الوسوم: ",e.tags.join(", ")]})]}),e.choices&&(0,t.jsx)("div",{className:"grid grid-cols-2 gap-2",children:e.choices.map(e=>(0,t.jsx)("div",{className:(0,b.cn)("px-3 py-2 rounded-lg border text-sm",e.isCorrect?"border-success bg-success/5 text-success":"border-border text-text-secondary"),children:e.text},e.id))})]})},e.id))})}),(0,t.jsx)(x.Modal,{isOpen:H,onClose:()=>D(!1),title:"مقارنة النسخ",size:"xl",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsx)(c.default,{label:"النسخة الأولى",options:B,value:S,onChange:e=>O(e.target.value)}),(0,t.jsx)(c.default,{label:"النسخة الثانية",options:B,value:z,onChange:e=>_(e.target.value)})]}),L&&(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsxs)(n.Card,{children:[(0,t.jsxs)(n.CardHeader,{children:[(0,t.jsx)(n.CardTitle,{children:L.a.label}),(0,t.jsxs)(n.CardDescription,{children:[L.a.questions.length," أسئلة - ",L.a.totalGrade," درجة"]})]}),(0,t.jsx)(n.CardContent,{className:"space-y-2 max-h-80 overflow-y-auto",children:L.a.questions.map((e,s)=>(0,t.jsxs)("div",{className:"p-2 rounded-lg bg-surface-secondary text-sm",children:[(0,t.jsxs)("span",{className:"font-medium text-text",children:[s+1,". "]}),(0,t.jsx)("span",{className:"text-text-secondary",children:e.text}),(0,t.jsxs)("div",{className:"flex gap-1 mt-1",children:[(0,t.jsx)(o.Badge,{size:"sm",variant:"info",children:g[e.type]}),(0,t.jsxs)(o.Badge,{size:"sm",variant:y[e.difficulty],children:[e.grade," درجات"]})]})]},e.id))})]}),(0,t.jsxs)(n.Card,{children:[(0,t.jsxs)(n.CardHeader,{children:[(0,t.jsx)(n.CardTitle,{children:L.b.label}),(0,t.jsxs)(n.CardDescription,{children:[L.b.questions.length," أسئلة - ",L.b.totalGrade," درجة"]})]}),(0,t.jsx)(n.CardContent,{className:"space-y-2 max-h-80 overflow-y-auto",children:L.b.questions.map((e,s)=>(0,t.jsxs)("div",{className:"p-2 rounded-lg bg-surface-secondary text-sm",children:[(0,t.jsxs)("span",{className:"font-medium text-text",children:[s+1,". "]}),(0,t.jsx)("span",{className:"text-text-secondary",children:e.text}),(0,t.jsxs)("div",{className:"flex gap-1 mt-1",children:[(0,t.jsx)(o.Badge,{size:"sm",variant:"info",children:g[e.type]}),(0,t.jsxs)(o.Badge,{size:"sm",variant:y[e.difficulty],children:[e.grade," درجات"]})]})]},e.id))})]})]})]})}),(0,t.jsx)(x.Modal,{isOpen:$,onClose:()=>I(!1),title:"إضافة نسخة جديدة",size:"md",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)("p",{className:"text-sm text-text-secondary",children:"سيتم إنشاء نسخة جديدة من الامتحان المحدد مع إمكانية تخصيص الأسئلة والترتيب."}),(0,t.jsxs)("div",{className:"flex gap-3 justify-end",children:[(0,t.jsx)(d.default,{variant:"secondary",onClick:()=>I(!1),children:"إلغاء"}),(0,t.jsx)(d.default,{variant:"primary",onClick:()=>{i.default.success("تمت إضافة النسخة بنجاح"),I(!1)},rightIcon:(0,t.jsx)(a.HiOutlinePlus,{size:18}),children:"إضافة"})]})]})})]})}])}]);