(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157);let s=(0,r.forwardRef)(({label:e,error:r,leftIcon:s,rightIcon:i,className:n,...o},l)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[s&&(0,t.jsx)("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none",children:s}),(0,t.jsx)("input",{ref:l,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50","shadow-[0_2px_8px_rgba(217,119,6,0.015),0_1px_0_rgba(255,255,255,0.9)_inset]","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",s&&"pr-10",i&&"pl-10",n),...o}),i&&(0,t.jsx)("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary",children:i})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));s.displayName="Input",e.s(["default",0,s])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:s="لم يتم العثور على أي عناصر بعد.",icon:i=a.HiOutlineInbox,action:n,className:o}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",o),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:s}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(46932),s=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:n,icon:o,trend:l,sparkline:d,color:c="primary",description:p,className:x}){let m=i[c],u=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",x),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",m.bg,m.border),children:o&&(0,t.jsx)(o,{className:(0,r.cn)("w-5 h-5",m.text)})}),u&&(0,t.jsxs)(a.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",u.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[u.positive?(0,t.jsx)(s.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(s.HiTrendingDown,{className:"w-3.5 h-3.5"}),u.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(a.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",m.text),children:n}),p&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:p}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:m.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:m.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:m.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":a+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,n):i+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function x(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let x=p(e),m=c[x]||(c[x]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(x));if(!c[m]){let t=x!==e?e:(e=>{let t,r,a=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);c[m]=d(s?{["@keyframes "+m]:t}:t,r?"":"."+m)}let u=r&&c.g;return r&&(c.g=c[m]),i=c[m],u?t.data=t.data.replace(u,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}x.bind({g:1});let m,u,h,b=x.bind({k:1});function f(e,t){let r=this||{};return function(){let a=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;r.p=Object.assign({theme:u&&u()},o),r.o=/go\d/.test(l),o.className=x.apply(r,a)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),h&&d[0]&&h(o),m(d,o)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},_=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},E=e=>Object.keys(k).forEach(t=>_(e,t)),O=(e=j)=>t=>{_(t,e)},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return O(s.toasterId||(a=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},H=(e,t)=>S("blank")(e,t);H.error=S("error"),H.success=S("success"),H.loading=S("loading"),H.custom=S("custom"),H.dismiss=(e,t)=>{let r={type:3,toastId:e};t?O(t)(r):E(r)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let r={type:4,toastId:e};t?O(t)(r):E(r)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,r)=>{let a=H.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?H.success(s,{id:a,...r,...null==r?void 0:r.success}):H.dismiss(a),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?H.error(s,{id:a,...r,...null==r?void 0:r.error}):H.dismiss(a)}),e};var A=1e3,D=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,M=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=f("div")`
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
    animation: ${P} 0.15s ease-out forwards;
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
`,T=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,I=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${T} 1s linear infinite;
`,z=b`
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
}`,R=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,U=f("div")`
  position: absolute;
`,F=f("div")`
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
}`,Z=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,q=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(Z,null,t):t:"blank"===r?null:s.createElement(F,null,s.createElement(I,{...a}),"loading"!==r&&s.createElement(U,null,"error"===r?s.createElement(L,{...a}):s.createElement(R,{...a})))},G=f("div")`
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
`,W=f("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=s.createElement(q,{toast:e}),o=s.createElement(W,{...e.ariaProps},g(e.message,e));return s.createElement(G,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:n,message:o}):s.createElement(s.Fragment,null,n,o))});a=s.createElement,d.p=void 0,m=a,u=void 0,h=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let n=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:n,className:t,style:r},i)},J=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(k[t]||C),i=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(i.current!==k[t]&&a(k[t]),w.push([t,a]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,s.useRef)(new Map).current,n=(0,s.useCallback)((e,t=A)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&H.dismiss(r.id);return}return setTimeout(()=>H.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let o=(0,s.useCallback)(O(t),[t]),l=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,s.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),p=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:p}}})(r,n);return s.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let n,o,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),p=(n=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return s.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:p},"custom"===r.type?g(r.message,r):i?i(r):s.createElement(X,{toast:r,position:l}))}))},"default",0,H,"toast",0,H],5766)},41740,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Progress",0,function({value:e,className:a,size:s="md"}){return(0,t.jsx)("div",{className:(0,r.cn)("w-full bg-card/80 rounded-full overflow-hidden border border-border","sm"===s?"h-1.5":"h-2.5",a),children:(0,t.jsx)("div",{className:"h-full bg-primary rounded-full transition-all duration-500",style:{width:`${Math.min(100,Math.max(0,e))}%`}})})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},n={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},o=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:o,leftIcon:l,rightIcon:d,className:c,disabled:p,children:x,...m},u)=>(0,t.jsxs)("button",{ref:u,disabled:p||o,className:(0,a.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],n[r],c),...m,children:[o?(0,t.jsx)(s.Spinner,{size:"sm"}):l,x,!o&&d]}));o.displayName="Button",e.s(["default",0,o])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:o,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",a[i],s[n],o),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:a,hover:s=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",a),children:e})},"CardContent",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",a),children:e})},"CardDescription",0,function({children:e,className:a}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",a),children:e})},"CardFooter",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",a),children:e})},"CardHeader",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",a),children:e})},"CardTitle",0,function({children:e,className:a}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",a),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:a,children:s,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),a&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:a})]}),s&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:s})]})}])},32098,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(46932),i=e.i(88653),n=e.i(50719);let o={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:l,title:d,children:c,className:p,size:x="md"}){let m=(0,r.useCallback)(e=>{"Escape"===e.key&&l()},[l]);return(0,r.useEffect)(()=>(e&&(document.addEventListener("keydown",m),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",m),document.body.style.overflow=""}),[e,m]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(s.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:l}),(0,t.jsxs)(s.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,a.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",o[x],p),children:[d&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:d}),(0,t.jsx)("button",{onClick:l,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(n.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,a.cn)("px-6 pb-6",!d&&"pt-6"),children:c})]})]})})}])},88442,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["CardSkeleton",0,function({count:e=3}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-5 flex-1 bg-card/80 animate-pulse rounded-[8px]"})]}),(0,t.jsx)("div",{className:"h-4 w-3/4 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-1/2 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"Skeleton",0,function({className:e,variant:a="text"}){return(0,t.jsx)("div",{className:(0,r.cn)("animate-pulse bg-card/80","circular"===a&&"rounded-full","text"===a&&"h-4 rounded-[8px]","rectangular"===a&&"rounded-[14px]",e)})},"StatsSkeleton",0,function({count:e=4}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsx)("div",{className:"w-11 h-11 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-8 w-32 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"TableSkeleton",0,function({rows:e=5}){return(0,t.jsxs)("div",{className:"border border-border rounded-[16px] overflow-hidden",children:[(0,t.jsx)("div",{className:"bg-card/50 border-b border-border px-4 py-3",children:(0,t.jsx)("div",{className:"h-4 w-32 bg-card/80 animate-pulse rounded-[8px]"})}),Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"border-b border-border last:border-b-0 px-4 py-3 flex items-center gap-4",children:[(0,t.jsx)("div",{className:"h-4 flex-1 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-16 bg-card/80 animate-pulse rounded-[8px]"})]},r))]})}])},51312,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["ErrorState",0,function({title:e="حدث خطأ",description:s="حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",icon:i=a.HiOutlineExclamationCircle,action:n,className:o}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",o),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-error/10 border border-error/20 flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-error"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:s}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},22073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(88653),i=e.i(50719),n=e.i(5766),o=e.i(37757),l=e.i(39964),d=e.i(97591),c=e.i(96640),p=e.i(41740),x=e.i(32098),m=e.i(59544),u=e.i(3812),h=e.i(88442),b=e.i(40803),f=e.i(51312),g=e.i(75157),y=e.i(81604);e.s(["default",0,function(){let[e,v]=(0,r.useState)(y.mockBranches),[j,N]=(0,r.useState)(null),[w,C]=(0,r.useState)(!1),[k,_]=(0,r.useState)({name:"",address:"",phone:"",email:"",manager:"",capacity:100}),[E,O]=(0,r.useState)(!1),[$,S]=(0,r.useState)(!1),H=(0,r.useCallback)(()=>{O(!0),S(!1),setTimeout(()=>{v(y.mockBranches),O(!1)},1e3)},[]),A=(0,r.useMemo)(()=>({total:e.length,active:e.filter(e=>"active"===e.status).length,totalCapacity:e.reduce((e,t)=>e+t.capacity,0),totalCurrent:e.reduce((e,t)=>e+t.currentCount,0)}),[e]),D=(0,r.useCallback)(()=>{H()},[H]);return $?(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(o.PageHeader,{title:"الفروع",description:"إدارة فروع المركز"}),(0,t.jsx)(f.ErrorState,{onRetry:D})]}):(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",dir:"rtl",children:[(0,t.jsx)(o.PageHeader,{title:"الفروع",description:"إدارة فروع المركز"}),(0,t.jsx)("div",{className:"flex justify-end",children:(0,t.jsx)(m.default,{variant:"primary",leftIcon:(0,t.jsx)(i.HiOutlinePlus,{className:"w-4 h-4"}),onClick:()=>C(!0),children:"إضافة فرع"})}),E?(0,t.jsx)(h.StatsSkeleton,{count:4}):(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:[(0,t.jsx)(d.StatsCard,{title:"إجمالي الفروع",value:A.total,icon:i.HiOutlineOfficeBuilding,color:"primary",subtitle:`${A.active} نشط`}),(0,t.jsx)(d.StatsCard,{title:"السعة الإجمالية",value:A.totalCapacity,icon:i.HiOutlineLocationMarker,color:"info"}),(0,t.jsx)(d.StatsCard,{title:"إجمالي المسجلين",value:A.totalCurrent,icon:i.HiOutlineUser,color:"success",subtitle:`${Math.round(A.totalCurrent/A.totalCapacity*100)}% من السعة`}),(0,t.jsx)(d.StatsCard,{title:"متوسط الإشغال",value:`${A.total>0?Math.round(e.reduce((e,t)=>e+(t.capacity>0?t.currentCount/t.capacity*100:0),0)/A.total):0}%`,icon:i.HiOutlineExclamation,color:"warning"})]}),E?(0,t.jsx)(h.CardSkeleton,{count:3}):0===e.length?(0,t.jsx)(b.EmptyState,{icon:i.HiOutlineOfficeBuilding,title:"لا توجد فروع",description:"لم يتم إضافة أي فروع بعد. أضف فرعاً جديداً للبدء.",action:(0,t.jsx)(m.default,{variant:"primary",leftIcon:(0,t.jsx)(i.HiOutlinePlus,{className:"w-4 h-4"}),onClick:()=>C(!0),children:"إضافة فرع"})}):(0,t.jsx)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:e.map(e=>(0,t.jsx)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},layout:!0,children:(0,t.jsxs)(l.Card,{hover:!0,className:"p-0",onClick:()=>N(j===e.id?null:e.id),children:[(0,t.jsxs)("div",{className:"p-5",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:(0,g.cn)("w-10 h-10 rounded-xl flex items-center justify-center","active"===e.status?"bg-primary-100 text-primary":"bg-surface-tertiary text-text-tertiary"),children:(0,t.jsx)(i.HiOutlineOfficeBuilding,{className:"w-5 h-5"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-semibold text-text",children:e.name}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.manager})]})]}),(0,t.jsx)(c.Badge,{variant:"active"===e.status?"success":"default",children:"active"===e.status?"نشط":"غير نشط"})]}),(0,t.jsxs)("div",{className:"space-y-2 text-sm text-text-secondary",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(i.HiOutlineLocationMarker,{className:"w-4 h-4 shrink-0"}),(0,t.jsx)("span",{children:e.address})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(i.HiOutlinePhone,{className:"w-4 h-4 shrink-0"}),(0,t.jsx)("span",{children:e.phone})]})]}),(0,t.jsxs)("div",{className:"mt-3",children:[(0,t.jsxs)("div",{className:"flex justify-between text-xs mb-1",children:[(0,t.jsx)("span",{className:"text-text-secondary",children:"سعة الفرع"}),(0,t.jsxs)("span",{className:"text-text font-medium",children:[e.currentCount,"/",e.capacity]})]}),(0,t.jsx)(p.Progress,{value:e.currentCount/e.capacity*100,size:"sm",variant:e.currentCount/e.capacity>.85?"warning":"primary"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1 mt-3 text-xs text-text-tertiary",children:[j===e.id?(0,t.jsx)(i.HiOutlineChevronUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(i.HiOutlineChevronDown,{className:"w-3.5 h-3.5"}),(0,t.jsx)("span",{children:j===e.id?"إخفاء التفاصيل":"عرض التفاصيل"})]})]}),(0,t.jsx)(s.AnimatePresence,{children:j===e.id&&(0,t.jsx)(a.motion.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},className:"overflow-hidden border-t border-border",children:(0,t.jsxs)("div",{className:"p-5 space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-sm",children:[(0,t.jsx)(i.HiOutlineUser,{className:"w-4 h-4 text-text-tertiary"}),(0,t.jsx)("span",{className:"text-text-secondary",children:"المدير:"}),(0,t.jsx)("span",{className:"text-text font-medium",children:e.manager})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,t.jsxs)("div",{className:"p-3 rounded-lg bg-surface-secondary",children:[(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"عدد قاعات الدراسة"}),(0,t.jsx)("p",{className:"text-lg font-bold text-text",children:"--"})]}),(0,t.jsxs)("div",{className:"p-3 rounded-lg bg-surface-secondary",children:[(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"عدد الموظفين"}),(0,t.jsx)("p",{className:"text-lg font-bold text-text",children:"--"})]})]}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:["تاريخ الإنشاء: ",(0,g.formatDate)(e.createdAt)]})]})})})]})},e.id))}),(0,t.jsx)(x.Modal,{isOpen:w,onClose:()=>C(!1),title:"إضافة فرع جديد",size:"md",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)(u.default,{label:"اسم الفرع",value:k.name,onChange:e=>_({...k,name:e.target.value}),placeholder:"أدخل اسم الفرع"}),(0,t.jsx)(u.default,{label:"العنوان",value:k.address,onChange:e=>_({...k,address:e.target.value}),placeholder:"أدخل العنوان"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,t.jsx)(u.default,{label:"رقم الهاتف",value:k.phone,onChange:e=>_({...k,phone:e.target.value}),placeholder:"رقم الهاتف"}),(0,t.jsx)(u.default,{label:"البريد الإلكتروني",value:k.email,onChange:e=>_({...k,email:e.target.value}),placeholder:"البريد الإلكتروني"})]}),(0,t.jsx)(u.default,{label:"اسم المدير",value:k.manager,onChange:e=>_({...k,manager:e.target.value}),placeholder:"اسم المدير"}),(0,t.jsx)(u.default,{label:"السعة القصوى",type:"number",value:String(k.capacity),onChange:e=>_({...k,capacity:Number(e.target.value)}),placeholder:"السعة القصوى"}),(0,t.jsxs)("div",{className:"flex gap-3 pt-2",children:[(0,t.jsx)(m.default,{variant:"primary",className:"flex-1",onClick:()=>{let e={id:`br-${Date.now()}`,name:k.name,address:k.address,phone:k.phone,email:k.email,manager:k.manager,status:"active",capacity:k.capacity,currentCount:0,createdAt:new Date};v(t=>[e,...t]),C(!1),_({name:"",address:"",phone:"",email:"",manager:"",capacity:100}),n.default.success("تم إضافة الفرع بنجاح")},disabled:!k.name,children:"إضافة الفرع"}),(0,t.jsx)(m.default,{variant:"secondary",onClick:()=>C(!1),children:"إلغاء"})]})]})})]})}])}]);