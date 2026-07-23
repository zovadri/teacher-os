(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32098,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(75157),a=e.i(46932),i=e.i(88653),o=e.i(50719);let n={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:l,title:d,children:c,className:u,size:p="md"}){let m=(0,s.useCallback)(e=>{"Escape"===e.key&&l()},[l]);return(0,s.useEffect)(()=>(e&&(document.addEventListener("keydown",m),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",m),document.body.style.overflow=""}),[e,m]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:l}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,r.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",n[p],u),children:[d&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:d}),(0,t.jsx)("button",{onClick:l,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(o.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,r.cn)("px-6 pb-6",!d&&"pt-6"),children:c})]})]})})}])},40803,e=>{"use strict";var t=e.i(43476),s=e.i(75157),r=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=r.HiOutlineInbox,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,s.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},97591,e=>{"use strict";var t=e.i(43476),s=e.i(75157),r=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:l,sparkline:d,color:c="primary",description:u,className:p}){let m=i[c],x=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,s.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",p),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,s.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",m.bg,m.border),children:n&&(0,t.jsx)(n,{className:(0,s.cn)("w-5 h-5",m.text)})}),x&&(0,t.jsxs)(r.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,s.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(r.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,s.cn)("text-[28px] font-bold leading-tight",m.text),children:o}),u&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:u}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:m.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:m.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:m.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},96640,e=>{"use strict";var t=e.i(43476),s=e.i(75157);let r={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,s.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",r[i],a[o],n),children:[l&&(0,t.jsx)("span",{className:(0,s.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},37757,e=>{"use strict";var t=e.i(43476),s=e.i(75157);e.s(["PageHeader",0,function({title:e,description:r,children:a,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,s.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,s.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),r&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:r})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},5766,e=>{"use strict";let t,s;var r,a=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let s="",r="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":r+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,o):i+":"+o+";")}return s+(t&&a?t+"{"+a+"}":a)+r},c={},u=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+u(e[s]);return t}return e};function p(e){let t,s,r=this||{},a=e.call?e(r.p):e;return((e,t,s,r,a)=>{var i;let p=u(e),m=c[p]||(c[p]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(p));if(!c[m]){let t=p!==e?e:(e=>{let t,s,r=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?r.shift():t[3]?(s=t[3].replace(l," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(l," ").trim();return r[0]})(e);c[m]=d(a?{["@keyframes "+m]:t}:t,s?"":"."+m)}let x=s&&c.g;return s&&(c.g=c[m]),i=c[m],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),m})(a.unshift?a.raw?(t=[].slice.call(arguments,1),s=r.p,a.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}p.bind({g:1});let m,x,f,b=p.bind({k:1});function g(e,t){let s=this||{};return function(){let r=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;s.p=Object.assign({theme:x&&x()},n),s.o=/go\d/.test(l),n.className=p.apply(s,r)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),f&&d[0]&&f(n),m(d,n)}return t?t(a):a}}var h=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},j="default",w=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},E=(e,t=j)=>{k[t]=w(k[t]||C,e),N.forEach(([e,s])=>{e===t&&s(k[t])})},$=e=>Object.keys(k).forEach(t=>E(e,t)),O=(e=j)=>t=>{E(t,e)},H={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},_=e=>(t,s)=>{let r,a=((e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||y()}))(t,e,s);return O(a.toasterId||(r=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===r))))({type:2,toast:a}),a.id},S=(e,t)=>_("blank")(e,t);S.error=_("error"),S.success=_("success"),S.loading=_("loading"),S.custom=_("custom"),S.dismiss=(e,t)=>{let s={type:3,toastId:e};t?O(t)(s):$(s)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let s={type:4,toastId:e};t?O(t)(s):$(s)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,s)=>{let r=S.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?h(t.success,e):void 0;return a?S.success(a,{id:r,...s,...null==s?void 0:s.success}):S.dismiss(r),e}).catch(e=>{let a=t.error?h(t.error,e):void 0;a?S.error(a,{id:r,...s,...null==s?void 0:s.error}):S.dismiss(r)}),e};var A=1e3,D=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,P=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,z=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,T=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${z} 1s linear infinite;
`,I=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=b`
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
}`,R=g("div")`
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
`,F=g("div")`
  position: absolute;
`,U=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,X=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${X} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Z=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(K,null,t):t:"blank"===s?null:a.createElement(U,null,a.createElement(T,{...r}),"loading"!==s&&a.createElement(F,null,"error"===s?a.createElement(L,{...r}):a.createElement(R,{...r})))},q=g("div")`
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
`,G=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,W=a.memo(({toast:e,position:t,style:s,children:r})=>{let i=e.height?((e,t)=>{let s=e.includes("top")?1:-1,[r,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*s}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*s}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(Z,{toast:e}),n=a.createElement(G,{...e.ariaProps},h(e.message,e));return a.createElement(q,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof r?r({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});r=a.createElement,d.p=void 0,m=r,x=void 0,f=void 0;var Y=({id:e,className:t,style:s,onHeightUpdate:r,children:i})=>{let o=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:o,className:t,style:s},i)},J=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:s,pausedAt:r}=((e={},t=j)=>{let[s,r]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&r(k[t]),N.push([t,r]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||H[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=A)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&S.dismiss(s.id);return}return setTimeout(()=>S.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let n=(0,a.useCallback)(O(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},o=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,o]),{toasts:s,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}})(s,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let o,n,l=s.position||t,d=c.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return a.createElement(Y,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?J:"",style:u},"custom"===s.type?h(s.message,s):i?i(s):a.createElement(W,{toast:s,position:l}))}))},"default",0,S,"toast",0,S],5766)},38836,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(46932),a=e.i(50719),i=e.i(5766),o=e.i(37757),n=e.i(96640),l=e.i(97591),d=e.i(32098),c=e.i(40803);let u=[{id:"a1",type:"نقل مجموعة",student:"أحمد محمد",details:"من مجموعة 1 إلى مجموعة 2 - بسبب تغيير الموعد",date:"2026-07-19",status:"معلق"},{id:"a2",type:"تجميد كورس",student:"مريم أحمد",details:"تجميد كورس الكيمياء لمدة شهر - ظروف سفر",date:"2026-07-18",status:"معلق"},{id:"a3",type:"استرداد مبلغ",student:"يوسف علي",details:"استرداد 1500 ج.م - قسط شهر لم يحضره",date:"2026-07-17",status:"موافق"},{id:"a4",type:"نقل مجموعة",student:"سارة خالد",details:"من مجموعة 3 إلى مجموعة 1 - لمستواها",date:"2026-07-16",status:"مرفوض"},{id:"a5",type:"تجميد كورس",student:"عمر حسن",details:"تجميد كورس الفيزياء شهرين - امتحانات مدرسة",date:"2026-07-15",status:"موافق"},{id:"a6",type:"استرداد مبلغ",student:"ندى سامي",details:"استرداد 2000 ج.م - إلغاء اشتراك",date:"2026-07-14",status:"معلق"},{id:"a7",type:"نقل مجموعة",student:"ليلى إبراهيم",details:"من مجموعة 2 إلى مجموعة 4 - مع صديقتها",date:"2026-07-13",status:"معلق"}],p={معلق:"warning",موافق:"success",مرفوض:"error"},m={"نقل مجموعة":a.HiOutlineSwitchHorizontal,"تجميد كورس":a.HiOutlinePause,"استرداد مبلغ":a.HiOutlineCash},x={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.04}}},f={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let e,[b,g]=(0,s.useState)(u),[h,y]=(0,s.useState)(""),[v,j]=(0,s.useState)("all"),[w,N]=(0,s.useState)(null),C=(0,s.useMemo)(()=>({total:b.length,pending:b.filter(e=>"معلق"===e.status).length,approved:b.filter(e=>"موافق"===e.status).length,rejected:b.filter(e=>"مرفوض"===e.status).length}),[b]),k=(0,s.useMemo)(()=>b.filter(e=>{let t=e.student.includes(h)||e.details.includes(h),s="all"===v||e.type===v;return t&&s}),[b,h,v]);return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(o.PageHeader,{title:"الموافقات",description:"طلبات نقل مجموعة - تجميد كورس - استرداد مبلغ"}),(0,t.jsx)("div",{className:"p-4 md:p-6 max-w-7xl mx-auto space-y-6",children:(0,t.jsxs)(r.motion.div,{variants:x,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsxs)(r.motion.div,{variants:f,className:"grid grid-cols-1 sm:grid-cols-4 gap-3",children:[(0,t.jsx)(l.StatsCard,{title:"إجمالي الطلبات",value:C.total,icon:a.HiOutlineCheckCircle,color:"primary"}),(0,t.jsx)(l.StatsCard,{title:"معلق",value:C.pending,icon:a.HiOutlineClock,color:"warning"}),(0,t.jsx)(l.StatsCard,{title:"موافق",value:C.approved,icon:a.HiOutlineCheckCircle,color:"success"}),(0,t.jsx)(l.StatsCard,{title:"مرفوض",value:C.rejected,icon:a.HiOutlineXCircle,color:"error"})]}),(0,t.jsxs)(r.motion.div,{variants:f,className:"flex flex-col sm:flex-row gap-3",children:[(0,t.jsxs)("div",{className:"flex-1 relative",children:[(0,t.jsx)(a.HiOutlineSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary"}),(0,t.jsx)("input",{value:h,onChange:e=>y(e.target.value),placeholder:"بحث باسم الطالب...",className:"w-full pr-10 pl-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"})]}),(0,t.jsxs)("select",{value:v,onChange:e=>j(e.target.value),className:"px-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30",children:[(0,t.jsx)("option",{value:"all",children:"كل الأنواع"}),(0,t.jsx)("option",{value:"نقل مجموعة",children:"نقل مجموعة"}),(0,t.jsx)("option",{value:"تجميد كورس",children:"تجميد كورس"}),(0,t.jsx)("option",{value:"استرداد مبلغ",children:"استرداد مبلغ"})]})]}),(0,t.jsx)(r.motion.div,{variants:f,className:"space-y-2",children:0===k.length?(0,t.jsx)(c.EmptyState,{icon:a.HiOutlineCheckCircle,title:"لا يوجد موافقات",description:"لا توجد طلبات موافقة في الوقت الحالي"}):k.map(e=>{let s=m[e.type];return(0,t.jsx)("div",{onClick:()=>N(e),className:`p-4 rounded-xl border transition-all cursor-pointer ${"معلق"===e.status?"bg-warning/5 border-warning/30":"bg-surface border-border hover:border-primary/30"}`,children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-full bg-surface-secondary border border-border flex items-center justify-center",children:(0,t.jsx)(s,{className:"w-5 h-5 text-primary"})}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"text-sm font-medium text-text",children:[e.type," - ",e.student]}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary max-w-md truncate",children:e.details})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("span",{className:"text-xs text-text-tertiary",children:e.date}),(0,t.jsx)(n.Badge,{variant:p[e.status],children:e.status}),(0,t.jsx)(a.HiOutlineEye,{className:"w-4 h-4 text-text-tertiary"})]})]})},e.id)})})]})}),(0,t.jsx)(d.Modal,{isOpen:!!w,onClose:()=>N(null),title:"تفاصيل الطلب",size:"sm",children:w&&(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(e=m[w.type],(0,t.jsx)(e,{className:"w-6 h-6 text-primary"})),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-sm font-bold text-text",children:w.type}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:w.student})]}),(0,t.jsx)(n.Badge,{variant:p[w.status],className:"mr-auto",children:w.status})]}),(0,t.jsx)("div",{className:"p-3 rounded-xl bg-surface-secondary text-sm text-text-secondary",children:w.details}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:["تاريخ الطلب: ",w.date]}),"معلق"===w.status&&(0,t.jsxs)("div",{className:"flex gap-3 pt-2",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>{var e;return e=w.id,void(g(t=>t.map(t=>t.id===e?{...t,status:"موافق"}:t)),i.default.success("تمت الموافقة على الطلب"),N(null))},className:"flex-1 px-4 py-2.5 bg-success text-white rounded-xl text-sm font-medium hover:bg-success/90 transition-all flex items-center justify-center gap-2",children:[(0,t.jsx)(a.HiOutlineCheckCircle,{className:"w-4 h-4"})," موافقة"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>{var e;return e=w.id,void(g(t=>t.map(t=>t.id===e?{...t,status:"مرفوض"}:t)),i.default.success("تم رفض الطلب"),N(null))},className:"flex-1 px-4 py-2.5 bg-error text-white rounded-xl text-sm font-medium hover:bg-error/90 transition-all flex items-center justify-center gap-2",children:[(0,t.jsx)(a.HiOutlineXCircle,{className:"w-4 h-4"})," رفض"]})]})]})})]})}])}]);