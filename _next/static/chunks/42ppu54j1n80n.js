(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:l,sparkline:d,color:c="primary",description:x,className:m}){let p=i[c],u=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",m),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",p.bg,p.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",p.text)})}),u&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",u.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[u.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),u.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",p.text),children:o}),x&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:x}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:p.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:p.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:p.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},n=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:n,leftIcon:l,rightIcon:d,className:c,disabled:x,children:m,...p},u)=>(0,t.jsxs)("button",{ref:u,disabled:x||n,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],c),...p,children:[n?(0,t.jsx)(a.Spinner,{size:"sm"}):l,m,!n&&d]}));n.displayName="Button",e.s(["default",0,n])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},x=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+x(e[r]);return t}return e};function m(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let m=x(e),p=c[m]||(c[m]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(m));if(!c[p]){let t=m!==e?e:(e=>{let t,r,s=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);c[p]=d(a?{["@keyframes "+p]:t}:t,r?"":"."+p)}let u=r&&c.g;return r&&(c.g=c[p]),i=c[p],u?t.data=t.data.replace(u,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),p})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}m.bind({g:1});let p,u,h,b=m.bind({k:1});function f(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:u&&u()},n),r.o=/go\d/.test(l),n.className=m.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),h&&d[0]&&h(n),p(d,n)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},S=(e,t=j)=>{C[t]=w(C[t]||k,e),N.forEach(([e,r])=>{e===t&&r(C[t])})},E=e=>Object.keys(C).forEach(t=>S(e,t)),$=(e=j)=>t=>{S(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},_=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return $(a.toasterId||(s=a.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},A=(e,t)=>_("blank")(e,t);A.error=_("error"),A.success=_("success"),A.loading=_("loading"),A.custom=_("custom"),A.dismiss=(e,t)=>{let r={type:3,toastId:e};t?$(t)(r):E(r)},A.dismissAll=e=>A.dismiss(void 0,e),A.remove=(e,t)=>{let r={type:4,toastId:e};t?$(t)(r):E(r)},A.removeAll=e=>A.remove(void 0,e),A.promise=(e,t,r)=>{let s=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?A.success(a,{id:s,...r,...null==r?void 0:r.success}):A.dismiss(s),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?A.error(a,{id:s,...r,...null==r?void 0:r.error}):A.dismiss(s)}),e};var T=1e3,D=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,H=b`
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
}`,M=f("div")`
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
    animation: ${H} 0.15s ease-out forwards;
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
`,I=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,L=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,z=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,R=b`
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
}`,B=f("div")`
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
`,U=f("div")`
  position: absolute;
`,W=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,F=b`
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
  animation: ${F} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,X=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(Z,null,t):t:"blank"===r?null:a.createElement(W,null,a.createElement(L,{...s}),"loading"!==r&&a.createElement(U,null,"error"===r?a.createElement(M,{...s}):a.createElement(B,{...s})))},q=f("div")`
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
`,G=f("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,K=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(X,{toast:e}),n=a.createElement(G,{...e.ariaProps},g(e.message,e));return a.createElement(q,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});s=a.createElement,d.p=void 0,p=s,u=void 0,h=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:o,className:t,style:r},i)},J=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(C[t]||k),i=(0,a.useRef)(C[t]);(0,a.useEffect)(()=>(i.current!==C[t]&&s(C[t]),N.push([t,s]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=T)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&A.dismiss(r.id);return}return setTimeout(()=>A.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let n=(0,a.useCallback)($(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),x=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:x}}})(r,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,n,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),x=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return a.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:x},"custom"===r.type?g(r.message,r):i?i(r):a.createElement(K,{toast:r,position:l}))}))},"default",0,A,"toast",0,A],5766)},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=s.HiOutlineInbox,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},88442,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["CardSkeleton",0,function({count:e=3}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-5 flex-1 bg-card/80 animate-pulse rounded-[8px]"})]}),(0,t.jsx)("div",{className:"h-4 w-3/4 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-1/2 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"Skeleton",0,function({className:e,variant:s="text"}){return(0,t.jsx)("div",{className:(0,r.cn)("animate-pulse bg-card/80","circular"===s&&"rounded-full","text"===s&&"h-4 rounded-[8px]","rectangular"===s&&"rounded-[14px]",e)})},"StatsSkeleton",0,function({count:e=4}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsx)("div",{className:"w-11 h-11 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-8 w-32 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"TableSkeleton",0,function({rows:e=5}){return(0,t.jsxs)("div",{className:"border border-border rounded-[16px] overflow-hidden",children:[(0,t.jsx)("div",{className:"bg-card/50 border-b border-border px-4 py-3",children:(0,t.jsx)("div",{className:"h-4 w-32 bg-card/80 animate-pulse rounded-[8px]"})}),Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"border-b border-border last:border-b-0 px-4 py-3 flex items-center gap-4",children:[(0,t.jsx)("div",{className:"h-4 flex-1 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-16 bg-card/80 animate-pulse rounded-[8px]"})]},r))]})}])},51312,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["ErrorState",0,function({title:e="حدث خطأ",description:a="حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",icon:i=s.HiOutlineExclamationCircle,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-error/10 border border-error/20 flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-error"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},38982,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["TabPanel",0,function({children:e,active:s,className:a}){return s?(0,t.jsx)("div",{className:(0,r.cn)("mt-4",a),children:e}):null},"Tabs",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)(s),children:e})}])},93582,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(46932),i=e.i(88653),o=e.i(50719);let n=(0,r.createContext)(null);e.s(["ConfirmDialog",0,function({children:e}){let[l,d]=(0,r.useState)(!1),[c,x]=(0,r.useState)({message:""}),[m,p]=(0,r.useState)(null),u=(0,r.useCallback)(e=>(x(e),d(!0),new Promise(e=>{p(()=>e)})),[]),h=()=>{m?.(!1),d(!1)};return(0,t.jsxs)(n.Provider,{value:{confirm:u},children:[e,(0,t.jsx)(i.AnimatePresence,{children:l&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/60",onClick:h}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},className:"relative bg-card border border-border rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.08)] p-6 max-w-sm w-full",children:[(0,t.jsx)("div",{className:"w-12 h-12 rounded-[14px] bg-error/10 border border-error/20 flex items-center justify-center mb-4",children:(0,t.jsx)(o.HiExclamationCircle,{className:"w-6 h-6 text-error"})}),c.title&&(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-2",children:c.title}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-6",children:c.message}),(0,t.jsxs)("div",{className:"flex items-center gap-3 justify-end",children:[(0,t.jsx)("button",{onClick:h,className:"px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text bg-transparent border border-border rounded-[12px] hover:bg-card/50 transition-colors",children:c.cancelLabel||"إلغاء"}),(0,t.jsx)("button",{onClick:()=>{m?.(!0),d(!1)},className:(0,s.cn)("px-4 py-2.5 text-sm font-medium text-white rounded-[12px] transition-colors","danger"===c.variant?"bg-error hover:bg-error/90":"bg-primary hover:bg-primary-dark"),children:c.confirmLabel||"تأكيد"})]})]})]})})]})}])},56420,e=>{"use strict";var t=e.i(71645);let r=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim(),s=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,t.createContext)({}),o=(0,t.forwardRef)(({color:e,size:s,strokeWidth:o,absoluteStrokeWidth:n,className:l="",children:d,iconNode:c,...x},m)=>{let{size:p=24,strokeWidth:u=2,absoluteStrokeWidth:h=!1,color:b="currentColor",className:f=""}=(0,t.useContext)(i)??{},g=n??h?24*Number(o??u)/Number(s??p):o??u;return(0,t.createElement)("svg",{ref:m,...a,width:s??p??a.width,height:s??p??a.height,stroke:e??b,strokeWidth:g,className:r("lucide",f,l),...!d&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(x)&&{"aria-hidden":"true"},...x},[...c.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(d)?d:[d]])});e.s(["default",0,(e,a)=>{let i=(0,t.forwardRef)(({className:i,...n},l)=>(0,t.createElement)(o,{ref:l,iconNode:a,className:r(`lucide-${s(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,i),...n}));return i.displayName=s(e),i}],56420)},46513,e=>{"use strict";let t=(0,e.i(56420).default)("monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);e.s(["Monitor",0,t],46513)},14110,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),a=e.i(5766),i=e.i(22016),o=e.i(18566),n=e.i(50719),l=e.i(46513);let d=(0,e.i(56420).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var c=e.i(37757),x=e.i(96640),m=e.i(38982),p=e.i(97591),u=e.i(59544),h=e.i(93582),b=e.i(88442),f=e.i(40803),g=e.i(51312),y=e.i(81604),v=e.i(75157);let j={iPhone:d,Android:d,MacBook:l.Monitor,Windows:l.Monitor};e.s(["default",0,function(){let[e,d]=(0,r.useState)([]),[w,N]=(0,r.useState)([]),[k,C]=(0,r.useState)(!0),[S,E]=(0,r.useState)(null),[$,O]=(0,r.useState)(null),[_,A]=(0,r.useState)(!1),[T,D]=(0,r.useState)("my"),[H,P]=(0,r.useState)(0);(0,o.useRouter)(),(0,r.useEffect)(()=>{let e=setTimeout(()=>{(0,v.det)()>.95?E("فشل في تحميل بيانات الجلسات"):d(y.mockSessions),C(!1)},800);return()=>clearTimeout(e)},[H]),(0,r.useEffect)(()=>{let e=setInterval(()=>{P(e=>e+1)},3e4);return()=>clearInterval(e)},[]);let M=(0,r.useMemo)(()=>e.filter(e=>"أحمد محمد"===e.user),[e]),I=(0,r.useMemo)(()=>"my"===T?M:e,[T,M,e]),L=(0,r.useMemo)(()=>{let t=e.filter(e=>"active"===e.status).length,r=e.filter(e=>e.loginDate.startsWith("2026-07-19")).length,s=e.reduce((e,t)=>(e[t.browser]=(e[t.browser]||0)+1,e),{}),a=Object.entries(s).sort(([,e],[,t])=>t-e)[0]?.[0]||"-";return{totalActive:t,todaySessions:r,averageDuration:y.mockSessionStats.averageDuration,topBrowser:a}},[e]),z=(0,r.useCallback)(e=>{d(t=>t.filter(t=>t.id!==e)),N(t=>t.filter(t=>t!==e)),O(null),a.default.success("تم إنهاء الجلسة بنجاح")},[]);return S?(0,t.jsxs)("div",{className:"p-4 md:p-6",children:[(0,t.jsx)(c.PageHeader,{title:"إدارة الجلسات",description:"عرض وإدارة جلسات المستخدمين النشطة"}),(0,t.jsx)(g.ErrorState,{title:"فشل تحميل الجلسات",message:"حدث خطأ أثناء تحميل بيانات الجلسات. يرجى المحاولة مرة أخرى.",error:S,onRetry:()=>{C(!0),E(null),P(e=>e+1)}})]}):(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(c.PageHeader,{title:"إدارة الجلسات",description:"عرض وإدارة جلسات المستخدمين النشطة",actions:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5 text-xs text-text-tertiary",children:[(0,t.jsx)(n.HiOutlineRefresh,{className:(0,v.cn)("w-3.5 h-3.5",H%2==0?"text-text-tertiary":"text-primary")}),(0,t.jsx)("span",{children:"تحديث تلقائي كل 30 ثانية"})]}),e.length>0&&(0,t.jsx)(u.default,{type:"button",variant:"danger",size:"sm",leftIcon:(0,t.jsx)(n.HiOutlineXCircle,{className:"w-4 h-4"}),onClick:()=>A(!0),children:"إنهاء جميع الجلسات"})]})}),k?(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsx)(b.StatsSkeleton,{count:4}),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)("div",{className:"flex gap-1 border-b border-border mb-6",children:[1,2].map(e=>(0,t.jsx)(b.Skeleton,{className:"h-10 w-28"},e))}),(0,t.jsx)(b.TableSkeleton,{rows:6,columns:8})]})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-4",children:[(0,t.jsx)(p.StatsCard,{title:"إجمالي الجلسات النشطة",value:L.totalActive,icon:n.HiOutlineShieldCheck,color:"success"}),(0,t.jsx)(p.StatsCard,{title:"جلسات اليوم",value:L.todaySessions,icon:n.HiOutlineClock,color:"info"}),(0,t.jsx)(p.StatsCard,{title:"متوسط مدة الجلسة",value:L.averageDuration,icon:n.HiOutlineRefresh,color:"primary"}),(0,t.jsx)(p.StatsCard,{title:"أكثر متصفح استخداماً",value:L.topBrowser,icon:n.HiOutlineGlobeAlt,color:"warning"})]}),(0,t.jsx)(m.Tabs,{tabs:[{id:"my",label:"جلساتي",count:M.length},{id:"all",label:"جميع الجلسات",count:e.length}],defaultTab:"my",onChange:D,children:e=>(0,t.jsx)(m.TabPanel,{id:e,activeTab:e,children:0===I.length?(0,t.jsx)(f.EmptyState,{icon:n.HiOutlineLogout,title:"my"===T?"لا توجد جلسات نشطة":"لا توجد جلسات",description:"my"===T?"ليس لديك أي جلسات نشطة حالياً":"لا توجد أي جلسات مسجلة في النظام"}):(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,t.jsxs)("p",{className:"text-sm text-text-secondary",children:["تم تحديد ",w.length," أنك تريد ",I.length," جلسة"]}),w.length>0&&(0,t.jsx)(u.default,{type:"button",variant:"outline",size:"sm",leftIcon:(0,t.jsx)(n.HiOutlineXCircle,{className:"w-4 h-4"}),onClick:()=>O("selected"),children:"إنهاء المحدد"})]}),(0,t.jsx)("div",{className:"overflow-x-auto rounded-xl border border-border",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"bg-surface-secondary border-b border-border",children:[(0,t.jsx)("th",{className:"text-right px-4 py-3 w-10",children:(0,t.jsx)("input",{type:"checkbox",checked:w.length===I.length&&I.length>0,onChange:e=>{e.target.checked?N(I.map(e=>e.id)):N([])},className:"rounded border-border text-primary focus:ring-primary/30"})}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"المستخدم"}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"الدور"}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"الجهاز"}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"المتصفح"}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"IP"}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"آخر نشاط"}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"تاريخ الدخول"}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"الحالة"}),(0,t.jsx)("th",{className:"text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap w-24",children:"الإجراء"})]})}),(0,t.jsx)("tbody",{children:I.map((e,r)=>{let a=function(e){for(let[t,r]of Object.entries(j))if(e.includes(t))return r;return l.Monitor}(e.device);return(0,t.jsxs)(s.motion.tr,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{delay:.03*r},className:"border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors",children:[(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsx)("input",{type:"checkbox",checked:w.includes(e.id),onChange:()=>{var t;return t=e.id,void N(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t])},className:"rounded border-border text-primary focus:ring-primary/30"})}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center",children:(0,t.jsx)(n.HiOutlineUser,{className:"w-4 h-4 text-primary"})}),(0,t.jsx)(i.default,{href:`/teacher/students/${encodeURIComponent(e.user)}`,className:"text-sm font-medium text-text hover:text-primary transition-colors",children:e.user})]})}),(0,t.jsx)("td",{className:"px-4 py-3 text-sm text-text-secondary",children:e.role}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsxs)("div",{className:"flex items-center gap-1.5 text-sm text-text-secondary",children:[(0,t.jsx)(a,{className:"w-3.5 h-3.5"}),e.device]})}),(0,t.jsx)("td",{className:"px-4 py-3 text-sm text-text-secondary",children:e.browser}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsx)("code",{className:"text-xs bg-surface-secondary px-2 py-0.5 rounded text-text-tertiary",dir:"ltr",children:e.ip})}),(0,t.jsx)("td",{className:"px-4 py-3 text-sm text-text-secondary",children:e.lastActive}),(0,t.jsx)("td",{className:"px-4 py-3 text-sm text-text-secondary",children:e.loginDate}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsx)(x.Badge,{variant:"active"===e.status?"success":"default",size:"sm",dot:!0,children:"active"===e.status?"نشط":"منتهي"})}),(0,t.jsx)("td",{className:"px-4 py-3 text-center",children:"active"===e.status&&(0,t.jsx)(u.default,{type:"button",variant:"ghost",size:"xs",leftIcon:(0,t.jsx)(n.HiOutlineXCircle,{className:"w-3.5 h-3.5"}),className:"text-error hover:text-error",onClick:()=>O(e.id),children:"إنهاء"})})]},e.id)})})]})})]})})})]}),(0,t.jsx)(h.ConfirmDialog,{isOpen:!!$&&"selected"!==$,onClose:()=>O(null),onConfirm:()=>z($),title:"إنهاء الجلسة",message:"هل أنت متأكد أنك تريد إنهاء هذه الجلسة؟ سيتم تسجيل خروج المستخدم فوراً.",confirmText:"إنهاء الجلسة",cancelText:"إلغاء",variant:"danger"}),(0,t.jsx)(h.ConfirmDialog,{isOpen:"selected"===$,onClose:()=>O(null),onConfirm:()=>{d(e=>e.filter(e=>!w.includes(e.id))),N([]),O(null),a.default.success("تم إنهاء الجلسات المحددة بنجاح")},title:"إنهاء الجلسات المحددة",message:`هل أنت متأكد أنك تريد إنهاء ${w.length} جلسة محددة؟ سيتم تسجيل خروج المستخدمين فوراً.`,confirmText:"إنهاء الكل",cancelText:"إلغاء",variant:"danger"}),(0,t.jsx)(h.ConfirmDialog,{isOpen:_,onClose:()=>A(!1),onConfirm:()=>{d([]),N([]),A(!1),a.default.success("تم إنهاء جميع الجلسات بنجاح")},title:"إنهاء جميع الجلسات",message:"هل أنت متأكد أنك تريد إنهاء جميع الجلسات؟ سيتم تسجيل خروج جميع المستخدمين فوراً.",confirmText:"إنهاء الكل",cancelText:"إلغاء",variant:"danger"})]})}],14110)}]);