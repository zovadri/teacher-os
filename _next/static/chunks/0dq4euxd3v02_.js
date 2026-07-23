(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32098,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(75157),a=e.i(46932),i=e.i(88653),n=e.i(50719);let o={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:l,title:c,children:d,className:u,size:m="md"}){let x=(0,s.useCallback)(e=>{"Escape"===e.key&&l()},[l]);return(0,s.useEffect)(()=>(e&&(document.addEventListener("keydown",x),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",x),document.body.style.overflow=""}),[e,x]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:l}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,r.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",o[m],u),children:[c&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:c}),(0,t.jsx)("button",{onClick:l,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(n.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,r.cn)("px-6 pb-6",!c&&"pt-6"),children:d})]})]})})}])},40803,e=>{"use strict";var t=e.i(43476),s=e.i(75157),r=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=r.HiOutlineInbox,action:n,className:o}){return(0,t.jsxs)("div",{className:(0,s.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",o),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},97591,e=>{"use strict";var t=e.i(43476),s=e.i(75157),r=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:n,icon:o,trend:l,sparkline:c,color:d="primary",description:u,className:m}){let x=i[d],p=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,s.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",m),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,s.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",x.bg,x.border),children:o&&(0,t.jsx)(o,{className:(0,s.cn)("w-5 h-5",x.text)})}),p&&(0,t.jsxs)(r.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,s.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",p.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[p.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),p.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(r.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,s.cn)("text-[28px] font-bold leading-tight",x.text),children:n}),u&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:u}),c&&c.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${c.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${d}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:x.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:x.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:c.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...c)*28}`).join(" "),fill:"none",stroke:x.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${c.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...c)*28}`).join(" ")} L${c.length-1} 32 L0 32 Z`,fill:`url(#sg-${d}-${e.replace(/\s/g,"")})`})]})})]})}])},96640,e=>{"use strict";var t=e.i(43476),s=e.i(75157);let r={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:o,dot:l=!1,pulse:c=!1}){return(0,t.jsxs)("span",{className:(0,s.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",r[i],a[n],o),children:[l&&(0,t.jsx)("span",{className:(0,s.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",c&&"animate-pulse")}),e]})}])},37757,e=>{"use strict";var t=e.i(43476),s=e.i(75157);e.s(["PageHeader",0,function({title:e,description:r,children:a,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,s.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,s.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),r&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:r})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},5766,e=>{"use strict";let t,s;var r,a=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let s="",r="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+n+";":r+="f"==i[1]?c(n,i):i+"{"+c(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=c(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,n):i+":"+n+";")}return s+(t&&a?t+"{"+a+"}":a)+r},d={},u=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+u(e[s]);return t}return e};function m(e){let t,s,r=this||{},a=e.call?e(r.p):e;return((e,t,s,r,a)=>{var i;let m=u(e),x=d[m]||(d[m]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(m));if(!d[x]){let t=m!==e?e:(e=>{let t,s,r=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?r.shift():t[3]?(s=t[3].replace(l," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(l," ").trim();return r[0]})(e);d[x]=c(a?{["@keyframes "+x]:t}:t,s?"":"."+x)}let p=s&&d.g;return s&&(d.g=d[x]),i=d[x],p?t.data=t.data.replace(p,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),x})(a.unshift?a.raw?(t=[].slice.call(arguments,1),s=r.p,a.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}m.bind({g:1});let x,p,h,f=m.bind({k:1});function b(e,t){let s=this||{};return function(){let r=arguments;function a(i,n){let o=Object.assign({},i),l=o.className||a.className;s.p=Object.assign({theme:p&&p()},o),s.o=/go\d/.test(l),o.className=m.apply(s,r)+(l?" "+l:""),t&&(o.ref=n);let c=e;return e[0]&&(c=o.as||e,delete o.as),h&&c[0]&&h(o),x(c,o)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},j="default",w=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},$=(e,t=j)=>{k[t]=w(k[t]||C,e),N.forEach(([e,s])=>{e===t&&s(k[t])})},E=e=>Object.keys(k).forEach(t=>$(e,t)),O=(e=j)=>t=>{$(t,e)},_={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,s)=>{let r,a=((e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||y()}))(t,e,s);return O(a.toasterId||(r=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===r))))({type:2,toast:a}),a.id},S=(e,t)=>H("blank")(e,t);S.error=H("error"),S.success=H("success"),S.loading=H("loading"),S.custom=H("custom"),S.dismiss=(e,t)=>{let s={type:3,toastId:e};t?O(t)(s):E(s)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let s={type:4,toastId:e};t?O(t)(s):E(s)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,s)=>{let r=S.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?S.success(a,{id:r,...s,...null==s?void 0:s.success}):S.dismiss(r),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?S.error(a,{id:r,...s,...null==s?void 0:s.error}):S.dismiss(r)}),e};var A=1e3,P=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,M=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${D} 0.15s ease-out forwards;
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
    animation: ${M} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,z=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,T=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${z} 1s linear infinite;
`,I=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=f`
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
}`,U=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
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
}`,K=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Z=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(K,null,t):t:"blank"===s?null:a.createElement(F,null,a.createElement(T,{...r}),"loading"!==s&&a.createElement(R,null,"error"===s?a.createElement(L,{...r}):a.createElement(U,{...r})))},q=b("div")`
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
`,W=b("div")`
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
`];return{animation:t?`${f(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(Z,{toast:e}),o=a.createElement(W,{...e.ariaProps},g(e.message,e));return a.createElement(q,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof r?r({icon:n,message:o}):a.createElement(a.Fragment,null,n,o))});r=a.createElement,c.p=void 0,x=r,p=void 0,h=void 0;var Y=({id:e,className:t,style:s,onHeightUpdate:r,children:i})=>{let n=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:n,className:t,style:s},i)},J=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:s,pausedAt:r}=((e={},t=j)=>{let[s,r]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&r(k[t]),N.push([t,r]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let n=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||_[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:n}})(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=A)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&S.dismiss(s.id);return}return setTimeout(()=>S.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let o=(0,a.useCallback)(O(t),[t]),l=(0,a.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),c=(0,a.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),d=(0,a.useCallback)(()=>{r&&o({type:6,time:Date.now()})},[r,o]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},n=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,n]),{toasts:s,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}})(s,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(s=>{let n,o,l=s.position||t,c=d.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(n=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return a.createElement(Y,{id:s.id,key:s.id,onHeightUpdate:d.updateHeight,className:s.visible?J:"",style:u},"custom"===s.type?g(s.message,s):i?i(s):a.createElement(X,{toast:s,position:l}))}))},"default",0,S,"toast",0,S],5766)},37558,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(46932),a=e.i(50719),i=e.i(5766),n=e.i(37757),o=e.i(96640),l=e.i(97591),c=e.i(32098),d=e.i(40803);let u=[{id:"l1",name:"أحمد علي",phone:"01012345678",email:"ahmed@example.com",course:"الكيمياء",source:"فيسبوك",status:"جديد",date:"2026-07-19",notes:"سأل عن مواعيد المجموعة 1"},{id:"l2",name:"منى سامي",phone:"01023456789",email:"mona@example.com",course:"الفيزياء",source:"توصية",status:"مهتم",date:"2026-07-18",notes:"صديقتها عندنا"},{id:"l3",name:"خالد محمود",phone:"01034567890",email:"khaled@example.com",course:"الرياضيات",source:"جوجل",status:"تم التواصل",date:"2026-07-17",notes:"اتصلنا به وسيأتي الأسبوع القادم"},{id:"l4",name:"سارة عبدالله",phone:"01045678901",email:"sara@example.com",course:"الكيمياء",source:"واتساب",status:"محول",date:"2026-07-16",notes:"تم التسجيل في المجموعة 2"},{id:"l5",name:"محمد نور",phone:"01056789012",email:"mohamed@example.com",course:"العربي",source:"فيسبوك",status:"ملغي",date:"2026-07-15",notes:"اختار سنتر تاني"},{id:"l6",name:"ندى حسن",phone:"01067890123",email:"nada@example.com",course:"الإنجليزي",source:"توصية",status:"جديد",date:"2026-07-19",notes:"تريد حصة تجريبية"},{id:"l7",name:"عمر سعيد",phone:"01078901234",email:"omar@example.com",course:"الرياضيات",source:"جوجل",status:"مهتم",date:"2026-07-14",notes:"يسأل عن الخصومات"},{id:"l8",name:"ليلى إبراهيم",phone:"01089012345",email:"layla@example.com",course:"الفيزياء",source:"واتساب",status:"تم التواصل",date:"2026-07-13",notes:"حجزت مقعد تجريبي"}],m={جديد:"primary","تم التواصل":"warning",مهتم:"warning",محول:"success",ملغي:"error"},x={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.04}}},p={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,h]=(0,s.useState)(""),[f,b]=(0,s.useState)("all"),[g,y]=(0,s.useState)(null),[v,j]=(0,s.useState)(!1),[w,N]=(0,s.useState)(""),C=(0,s.useMemo)(()=>({total:u.length,new:u.filter(e=>"جديد"===e.status).length,converted:u.filter(e=>"محول"===e.status).length,interested:u.filter(e=>"مهتم"===e.status||"تم التواصل"===e.status).length}),[]),k=(0,s.useMemo)(()=>u.filter(t=>{let s=t.name.includes(e)||t.phone.includes(e)||t.email.includes(e),r="all"===f||t.status===f;return s&&r}),[e,f]);return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(n.PageHeader,{title:"إدارة العملاء المحتملين",description:"متابعة الاستفسارات - تحويل العملاء إلى طلاب"}),(0,t.jsx)("div",{className:"p-4 md:p-6 max-w-7xl mx-auto space-y-6",children:(0,t.jsxs)(r.motion.div,{variants:x,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsxs)(r.motion.div,{variants:p,className:"grid grid-cols-1 sm:grid-cols-4 gap-3",children:[(0,t.jsx)(l.StatsCard,{title:"إجمالي العملاء",value:C.total,icon:a.HiOutlineUserGroup,color:"primary"}),(0,t.jsx)(l.StatsCard,{title:"جديد",value:C.new,icon:a.HiOutlineStar,color:"primary"}),(0,t.jsx)(l.StatsCard,{title:"قيد المتابعة",value:C.interested,icon:a.HiOutlineChat,color:"warning"}),(0,t.jsx)(l.StatsCard,{title:"تم التحويل",value:C.converted,icon:a.HiOutlineCheckCircle,color:"success"})]}),(0,t.jsxs)(r.motion.div,{variants:p,className:"flex flex-col sm:flex-row gap-3",children:[(0,t.jsxs)("div",{className:"flex-1 relative",children:[(0,t.jsx)(a.HiOutlineSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary"}),(0,t.jsx)("input",{value:e,onChange:e=>h(e.target.value),placeholder:"بحث باسم العميل أو الهاتف...",className:"w-full pr-10 pl-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"})]}),(0,t.jsxs)("select",{value:f,onChange:e=>b(e.target.value),className:"px-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30",children:[(0,t.jsx)("option",{value:"all",children:"كل الحالات"}),(0,t.jsx)("option",{value:"جديد",children:"جديد"}),(0,t.jsx)("option",{value:"تم التواصل",children:"تم التواصل"}),(0,t.jsx)("option",{value:"مهتم",children:"مهتم"}),(0,t.jsx)("option",{value:"محول",children:"محول"}),(0,t.jsx)("option",{value:"ملغي",children:"ملغي"})]})]}),(0,t.jsx)(r.motion.div,{variants:p,className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3",children:k.map(e=>(0,t.jsxs)("div",{onClick:()=>y(e),className:"p-4 rounded-xl bg-surface border border-border hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary",children:e.name.charAt(0)}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.name}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",dir:"ltr",children:e.phone})]})]}),(0,t.jsx)(o.Badge,{variant:m[e.status],children:e.status})]}),(0,t.jsxs)("div",{className:"flex items-center gap-4 text-xs text-text-tertiary",children:[(0,t.jsxs)("span",{children:["📚 ",e.course]}),(0,t.jsxs)("span",{children:["📅 ",e.date]}),(0,t.jsxs)("span",{children:["🔗 ",e.source]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mt-3 pt-3 border-t border-border",children:[(0,t.jsxs)("button",{type:"button",onClick:t=>{t.stopPropagation(),i.default.success(`تم تسجيل مكالمة مع ${e.name}`)},className:"flex-1 px-2 py-1.5 text-xs bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all flex items-center justify-center gap-1",children:[(0,t.jsx)(a.HiOutlinePhone,{className:"w-3 h-3"})," اتصال"]}),(0,t.jsxs)("button",{type:"button",onClick:t=>{t.stopPropagation(),i.default.success(`تم إرسال رسالة إلى ${e.name}`)},className:"flex-1 px-2 py-1.5 text-xs bg-success/10 text-success rounded-lg hover:bg-success/20 transition-all flex items-center justify-center gap-1",children:[(0,t.jsx)(a.HiOutlineChat,{className:"w-3 h-3"})," رسالة"]}),(0,t.jsxs)("button",{type:"button",onClick:t=>{t.stopPropagation(),y(e),j(!0)},className:"flex-1 px-2 py-1.5 text-xs bg-warning/10 text-warning rounded-lg hover:bg-warning/20 transition-all flex items-center justify-center gap-1",children:[(0,t.jsx)(a.HiOutlineCheckCircle,{className:"w-3 h-3"})," تحويل"]})]})]},e.id))}),0===k.length&&(0,t.jsx)(d.EmptyState,{icon:a.HiOutlineUserGroup,title:"لا يوجد عملاء محتملين",description:"لم يتم إضافة أي عملاء محتملين بعد"})]})}),(0,t.jsx)(c.Modal,{isOpen:!!g&&!v,onClose:()=>y(null),title:"تفاصيل العميل",size:"sm",children:g&&(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary",children:g.name.charAt(0)}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-sm font-bold text-text",children:g.name}),(0,t.jsx)(o.Badge,{variant:m[g.status],children:g.status})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3 text-sm",children:[(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-surface-secondary",children:[(0,t.jsx)("span",{className:"text-text-tertiary text-xs",children:"الهاتف"}),(0,t.jsx)("p",{className:"text-text font-medium",dir:"ltr",children:g.phone})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-surface-secondary",children:[(0,t.jsx)("span",{className:"text-text-tertiary text-xs",children:"البريد"}),(0,t.jsx)("p",{className:"text-text font-medium",children:g.email})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-surface-secondary",children:[(0,t.jsx)("span",{className:"text-text-tertiary text-xs",children:"الكورس"}),(0,t.jsx)("p",{className:"text-text font-medium",children:g.course})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-surface-secondary",children:[(0,t.jsx)("span",{className:"text-text-tertiary text-xs",children:"المصدر"}),(0,t.jsx)("p",{className:"text-text font-medium",children:g.source})]})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-surface-secondary",children:[(0,t.jsx)("span",{className:"text-text-tertiary text-xs",children:"ملاحظات"}),(0,t.jsx)("p",{className:"text-text text-sm mt-1",children:g.notes})]}),(0,t.jsxs)("div",{className:"flex gap-2 pt-2",children:[(0,t.jsx)("button",{type:"button",onClick:()=>i.default.success("تم تسجيل مكالمة"),className:"flex-1 px-3 py-2 bg-primary text-white rounded-xl text-xs font-medium hover:bg-primary-dark transition-all",children:"تسجيل مكالمة"}),(0,t.jsx)("button",{type:"button",onClick:()=>{y(null),j(!0)},className:"flex-1 px-3 py-2 bg-success text-white rounded-xl text-xs font-medium hover:bg-success/90 transition-all",children:"تحويل لطالب"})]})]})}),(0,t.jsx)(c.Modal,{isOpen:v,onClose:()=>{j(!1),y(null)},title:"تحويل عميل لطالب",size:"sm",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("p",{className:"text-sm text-text-secondary",children:["تحويل ",g?.name," إلى طالب في النظام."]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-xs text-text-tertiary mb-1 block",children:"المجموعة"}),(0,t.jsxs)("select",{value:w,onChange:e=>N(e.target.value),className:"w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30",children:[(0,t.jsx)("option",{value:"",children:"اختر..."}),(0,t.jsx)("option",{value:"مجموعة 1",children:"مجموعة 1"}),(0,t.jsx)("option",{value:"مجموعة 2",children:"مجموعة 2"}),(0,t.jsx)("option",{value:"مجموعة 3",children:"مجموعة 3"})]})]}),(0,t.jsxs)("div",{className:"flex gap-3 pt-2",children:[(0,t.jsx)("button",{type:"button",onClick:()=>{i.default.success(`تم تحويل ${g?.name} إلى طالب`),j(!1),y(null)},className:"flex-1 px-4 py-2.5 bg-success text-white rounded-xl text-sm font-medium hover:bg-success/90 transition-all",children:"تأكيد التحويل"}),(0,t.jsx)("button",{type:"button",onClick:()=>{j(!1),y(null)},className:"flex-1 px-4 py-2.5 border border-border rounded-xl text-sm text-text-secondary hover:bg-surface-secondary transition-all",children:"إلغاء"})]})]})})]})}])}]);