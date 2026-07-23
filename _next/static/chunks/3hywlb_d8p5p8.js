(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:l,sparkline:d,color:c="primary",description:m,className:u}){let x=i[c],p=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",u),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",x.bg,x.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",x.text)})}),p&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",p.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[p.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),p.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",x.text),children:o}),m&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:m}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:x.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:x.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:x.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},n=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:n,leftIcon:l,rightIcon:d,className:c,disabled:m,children:u,...x},p)=>(0,t.jsxs)("button",{ref:p,disabled:m||n,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],c),...x,children:[n?(0,t.jsx)(a.Spinner,{size:"sm"}):l,u,!n&&d]}));n.displayName="Button",e.s(["default",0,n])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e};function u(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let u=m(e),x=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!c[x]){let t=u!==e?e:(e=>{let t,r,s=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);c[x]=d(a?{["@keyframes "+x]:t}:t,r?"":"."+x)}let p=r&&c.g;return r&&(c.g=c[x]),i=c[x],p?t.data=t.data.replace(p,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),x})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}u.bind({g:1});let x,p,b,f=u.bind({k:1});function h(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:p&&p()},n),r.o=/go\d/.test(l),n.className=u.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),x(d,n)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},S=(e,t=j)=>{C[t]=N(C[t]||k,e),w.forEach(([e,r])=>{e===t&&r(C[t])})},O=e=>Object.keys(C).forEach(t=>S(e,t)),E=(e=j)=>t=>{S(t,e)},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return E(a.toasterId||(s=a.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},_=(e,t)=>H("blank")(e,t);_.error=H("error"),_.success=H("success"),_.loading=H("loading"),_.custom=H("custom"),_.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):O(r)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):O(r)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,r)=>{let s=_.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?_.success(a,{id:s,...r,...null==r?void 0:r.success}):_.dismiss(s),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?_.error(a,{id:s,...r,...null==r?void 0:r.error}):_.dismiss(s)}),e};var z=1e3,A=f`
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
}`,I=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,T=h("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${A} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,L=h("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,M=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,R=f`
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
}`,P=h("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${R} 0.2s ease-out forwards;
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
`,Q=h("div")`
  position: absolute;
`,U=h("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,F=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=h("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${F} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(q,null,t):t:"blank"===r?null:a.createElement(U,null,a.createElement(L,{...s}),"loading"!==r&&a.createElement(Q,null,"error"===r?a.createElement(T,{...s}):a.createElement(P,{...s})))},X=h("div")`
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
`,Z=h("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,G=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(K,{toast:e}),n=a.createElement(Z,{...e.ariaProps},g(e.message,e));return a.createElement(X,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});s=a.createElement,d.p=void 0,x=s,p=void 0,b=void 0;var W=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:o,className:t,style:r},i)},Y=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(C[t]||k),i=(0,a.useRef)(C[t]);(0,a.useEffect)(()=>(i.current!==C[t]&&s(C[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=z)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&_.dismiss(r.id);return}return setTimeout(()=>_.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let n=(0,a.useCallback)(E(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),m=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:m}}})(r,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,n,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),m=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return a.createElement(W,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Y:"",style:m},"custom"===r.type?g(r.message,r):i?i(r):a.createElement(G,{toast:r,position:l}))}))},"default",0,_,"toast",0,_],5766)},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=s.HiOutlineInbox,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},88442,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["CardSkeleton",0,function({count:e=3}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-5 flex-1 bg-card/80 animate-pulse rounded-[8px]"})]}),(0,t.jsx)("div",{className:"h-4 w-3/4 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-1/2 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"Skeleton",0,function({className:e,variant:s="text"}){return(0,t.jsx)("div",{className:(0,r.cn)("animate-pulse bg-card/80","circular"===s&&"rounded-full","text"===s&&"h-4 rounded-[8px]","rectangular"===s&&"rounded-[14px]",e)})},"StatsSkeleton",0,function({count:e=4}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsx)("div",{className:"w-11 h-11 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-8 w-32 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"TableSkeleton",0,function({rows:e=5}){return(0,t.jsxs)("div",{className:"border border-border rounded-[16px] overflow-hidden",children:[(0,t.jsx)("div",{className:"bg-card/50 border-b border-border px-4 py-3",children:(0,t.jsx)("div",{className:"h-4 w-32 bg-card/80 animate-pulse rounded-[8px]"})}),Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"border-b border-border last:border-b-0 px-4 py-3 flex items-center gap-4",children:[(0,t.jsx)("div",{className:"h-4 flex-1 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-16 bg-card/80 animate-pulse rounded-[8px]"})]},r))]})}])},51312,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["ErrorState",0,function({title:e="حدث خطأ",description:a="حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",icon:i=s.HiOutlineExclamationCircle,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-error/10 border border-error/20 flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-error"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},68635,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),a=e.i(50719),i=e.i(5766),o=e.i(75157),n=e.i(37757),l=e.i(97591),d=e.i(96640),c=e.i(40803),m=e.i(51312),u=e.i(88442),x=e.i(59544),p=e.i(81604);let b=[{id:"qr",label:"QR كود",icon:a.HiOutlineQrcode},{id:"code",label:"كود الطالب",icon:a.HiOutlineKey},{id:"manual",label:"يدوي",icon:a.HiOutlineUserAdd},{id:"employee",label:"موظف",icon:a.HiOutlineBriefcase}],f={present:{label:"حاضر",color:"bg-success/10 border-success/20 text-success"},absent:{label:"غائب",color:"bg-error/10 border-error/20 text-error"},late:{label:"متأخر",color:"bg-warning/10 border-warning/20 text-warning"},excused:{label:"معذر",color:"bg-info/10 border-info/20 text-info"}};e.s(["default",0,function(){let[e,h]=(0,r.useState)("qr"),[g,y]=(0,r.useState)(!0),[v,j]=(0,r.useState)(!1),[N,w]=(0,r.useState)(new Set),[k,C]=(0,r.useState)(""),[S,O]=(0,r.useState)(null),[E,$]=(0,r.useState)(""),[H,_]=(0,r.useState)("present"),[z,A]=(0,r.useState)({}),[D,I]=(0,r.useState)({}),[T,B]=(0,r.useState)(null);(0,r.useEffect)(()=>{let e=setTimeout(()=>y(!1),1e3);return()=>clearTimeout(e)},[]);let L=(0,r.useMemo)(()=>{let e=p.mockAttendance.filter(e=>e.date.toDateString()===new Date().toDateString());return 0===e.length?{total:0,present:0,absent:0,late:0,excused:0,rate:0}:{total:e.length,present:e.filter(e=>"present"===e.status).length,absent:e.filter(e=>"absent"===e.status).length,late:e.filter(e=>"late"===e.status).length,excused:e.filter(e=>"excused"===e.status).length,rate:Math.round(e.filter(e=>"present"===e.status).length/e.length*100)}},[]),M=()=>{if(!k.trim())return void i.default.error("يرجى إدخال كود الطالب");let e=p.mockStudents.find(e=>e.id===k.trim()||e.phone.includes(k.trim()));if(!e){i.default.error("لم يتم العثور على طالب"),O(null);return}if(N.has(e.id)){i.default.error("هذا الطالب مسجل حضوره بالفعل"),O(null);return}O(e),i.default.success("تم العثور على الطالب")};return v?(0,t.jsx)("div",{className:"p-4 md:p-6",children:(0,t.jsx)(m.ErrorState,{title:"حدث خطأ",description:"حدث خطأ في تحميل صفحة الحضور",retryLabel:"إعادة المحاولة",onRetry:()=>{j(!1),y(!0),setTimeout(()=>y(!1),1e3)}})}):(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsx)(n.PageHeader,{title:"نظام الحضور",description:"تسجيل ومتابعة حضور الطلاب والموظفين",breadcrumbs:[{label:"لوحة التحكم",href:"/teacher"},{label:"الحضور"}]}),g?(0,t.jsx)(u.StatsSkeleton,{}):(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",children:[(0,t.jsx)(l.StatsCard,{title:"نسبة الحضور",value:`${L.rate}%`,icon:a.HiOutlineCheckCircle,color:"primary",trend:L.rate>70?5:-3}),(0,t.jsx)(l.StatsCard,{title:"الحاضرون",value:L.present,icon:a.HiOutlineUsers,color:"success"}),(0,t.jsx)(l.StatsCard,{title:"الغائبون",value:L.absent,icon:a.HiOutlineXCircle,color:"error"}),(0,t.jsx)(l.StatsCard,{title:"المتأخرون",value:L.late,icon:a.HiOutlineClock,color:"warning"})]}),(0,t.jsx)("div",{className:"flex gap-1 border-b border-border overflow-x-auto",children:b.map(r=>{let s=r.icon;return(0,t.jsxs)("button",{onClick:()=>h(r.id),className:(0,o.cn)("flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-all duration-200",e===r.id?"border-primary text-primary":"border-transparent text-text-tertiary hover:text-text-secondary hover:border-border"),children:[(0,t.jsx)(s,{className:"w-4 h-4"}),r.label]},r.id)})}),"qr"===e&&(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"bg-card border border-border rounded-[24px] p-6 ",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:"مسح QR كود"}),(0,t.jsx)(d.Badge,{variant:"primary",size:"sm",children:"كاميرا"})]}),(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-[24px] bg-card/40 mb-4",children:[(0,t.jsx)(a.HiOutlineCamera,{className:"w-16 h-16 text-text-tertiary mb-4"}),(0,t.jsx)("p",{className:"text-text-secondary text-sm mb-4",children:"وجه الكاميرا نحو QR كود الطالب"}),(0,t.jsx)(x.default,{onClick:()=>{let e=p.mockStudents[Math.floor((0,o.det)()*p.mockStudents.length)];N.has(e.id)?i.default.error("هذا الطالب مسجل حضوره بالفعل"):(B(e),i.default.success("تم مسح QR بنجاح"))},leftIcon:(0,t.jsx)(a.HiOutlineQrcode,{className:"w-4 h-4"}),children:"محاكاة مسح QR"})]}),T?(0,t.jsxs)("div",{className:"p-6 rounded-[20px] bg-card border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-4 mb-4",children:[(0,t.jsx)("img",{src:T.avatar,alt:"",className:"w-12 h-12 rounded-full bg-card border border-border"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-semibold text-text",children:T.name}),(0,t.jsxs)("p",{className:"text-sm text-text-secondary",children:[T.grade," - ",T.group]})]})]}),(0,t.jsxs)("div",{className:"flex gap-4",children:[(0,t.jsx)(x.default,{onClick:()=>{!T||N.has(T.id)||(w(e=>new Set(e).add(T.id)),B(null),i.default.success(`تم تسجيل حضور ${T.name}`))},variant:"success",size:"sm",leftIcon:(0,t.jsx)(a.HiOutlineCheck,{className:"w-4 h-4"}),children:"تأكيد الحضور"}),(0,t.jsx)(x.default,{onClick:()=>B(null),variant:"secondary",size:"sm",leftIcon:(0,t.jsx)(a.HiOutlineX,{className:"w-4 h-4"}),children:"إلغاء"})]})]}):(0,t.jsx)("div",{className:"text-center py-3 text-text-tertiary text-sm",children:"اضغط على المحاكاة لمسح QR"})]}),"code"===e&&(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"bg-card border border-border rounded-[24px] p-6 ",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-4",children:"بحث بكود الطالب"}),(0,t.jsxs)("div",{className:"flex gap-4 mb-4",children:[(0,t.jsxs)("div",{className:"flex-1 relative",children:[(0,t.jsx)(a.HiOutlineSearch,{className:"absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"}),(0,t.jsx)("input",{placeholder:"أدخل كود الطالب أو رقم الهاتف",value:k,onChange:e=>C(e.target.value),onKeyDown:e=>"Enter"===e.key&&M(),className:"w-full bg-card border border-border rounded-[16px] pr-10 pl-4 py-2.5 text-sm text-text placeholder-text-tertiary/50  focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"})]}),(0,t.jsx)(x.default,{onClick:M,children:"بحث"})]}),S?(0,t.jsxs)("div",{className:"p-6 rounded-[20px] bg-card border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-4 mb-4",children:[(0,t.jsx)("img",{src:S.avatar,alt:"",className:"w-12 h-12 rounded-full bg-card border border-border"}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("p",{className:"font-semibold text-text",children:S.name}),(0,t.jsxs)("p",{className:"text-sm text-text-secondary",children:[S.grade," - ",S.group]}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary mt-0.5",children:["رقم: ",S.phone]})]}),(0,t.jsx)(d.Badge,{variant:"success",size:"sm",children:"تم العثور"})]}),(0,t.jsxs)("div",{className:"flex gap-4",children:[(0,t.jsx)(x.default,{onClick:()=>{S&&(w(e=>new Set(e).add(S.id)),i.default.success(`تم تسجيل حضور ${S.name}`),C(""),O(null))},variant:"success",size:"sm",leftIcon:(0,t.jsx)(a.HiOutlineCheck,{className:"w-4 h-4"}),children:"تأكيد الحضور"}),(0,t.jsx)(x.default,{onClick:()=>{O(null),C("")},variant:"secondary",size:"sm",leftIcon:(0,t.jsx)(a.HiOutlineX,{className:"w-4 h-4"}),children:"إلغاء"})]})]}):k?(0,t.jsx)(c.EmptyState,{icon:a.HiOutlineSearch,title:"ابحث عن طالب",description:"أدخل كود الطالب أو رقم الهاتف للبحث"}):null]}),"manual"===e&&(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"bg-card border border-border rounded-[24px] p-6  space-y-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:"تسجيل حضور يدوي"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary mb-1.5",children:"اختر الطالب"}),(0,t.jsxs)("select",{value:E,onChange:e=>$(e.target.value),className:"w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text appearance-none  focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all",children:[(0,t.jsx)("option",{value:"",children:"اختر طالباً..."}),p.mockStudents.map(e=>(0,t.jsxs)("option",{value:e.id,children:[e.name," - ",e.grade]},e.id))]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary mb-1.5",children:"حالة الحضور"}),(0,t.jsx)("div",{className:"flex gap-3",children:Object.entries(f).map(([e,r])=>(0,t.jsx)("button",{onClick:()=>_(e),className:(0,o.cn)("flex-1 px-3 py-2 rounded-[14px] text-sm font-medium border transition-all",H===e?r.color:"border-border text-text-tertiary hover:bg-card"),children:r.label},e))})]}),(0,t.jsx)(x.default,{onClick:()=>{E?N.has(E)?i.default.error("هذا الطالب مسجل حضوره بالفعل"):(w(e=>new Set(e).add(E)),i.default.success("تم تسجيل الحضور"),$("")):i.default.error("يرجى اختيار طالب")},size:"lg",className:"w-full",leftIcon:(0,t.jsx)(a.HiOutlineCheckCircle,{className:"w-4 h-4"}),children:"تسجيل الحضور"})]}),"employee"===e&&(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"bg-card border border-border rounded-[24px] p-6 ",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:"حضور الموظفين"}),(0,t.jsx)(d.Badge,{variant:"info",size:"sm",children:"تسجيل دخول/خروج"})]}),0===p.mockEmployees.length?(0,t.jsx)(c.EmptyState,{icon:a.HiOutlineBriefcase,title:"لا يوجد موظفون",description:"لم يتم إضافة أي موظفين بعد"}):(0,t.jsx)("div",{className:"space-y-4",children:p.mockEmployees.map(e=>(0,t.jsxs)("div",{className:(0,o.cn)("flex items-center justify-between p-5 rounded-[20px] border border-border transition-all bg-card",z[e.id]&&!D[e.id]&&"border-success/30 bg-success/5",D[e.id]&&"opacity-60"),children:[(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsx)("img",{src:e.avatar,alt:"",className:"w-10 h-10 rounded-full bg-card border border-border"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-semibold text-text text-sm",children:e.name}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.jobTitle}),z[e.id]&&!D[e.id]&&(0,t.jsx)(d.Badge,{variant:"success",size:"sm",dot:!0,children:"داخل"}),D[e.id]&&(0,t.jsx)(d.Badge,{variant:"default",size:"sm",children:"منصرف"})]})]}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)(x.default,{size:"sm",variant:z[e.id]?"secondary":"success",onClick:()=>{var t;z[t=e.id]?i.default.error("تم تسجيل دخول هذا الموظف بالفعل"):(A(e=>({...e,[t]:!0})),i.default.success("تم تسجيل الدخول"))},disabled:D[e.id],leftIcon:(0,t.jsx)(a.HiOutlineLogin,{className:"w-4 h-4"}),children:"دخول"}),(0,t.jsx)(x.default,{size:"sm",variant:D[e.id]?"secondary":"primary",onClick:()=>{var t;z[t=e.id]?D[t]?i.default.error("تم تسجيل خروج هذا الموظف بالفعل"):(I(e=>({...e,[t]:!0})),i.default.success("تم تسجيل الخروج")):i.default.error("لم يسجل هذا الموظف دخوله بعد")},disabled:!z[e.id]||D[e.id],leftIcon:(0,t.jsx)(a.HiOutlineLogout,{className:"w-4 h-4"}),children:"خروج"})]})]},e.id))})]})]})}])}]);