(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:a}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",a),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(s.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:o,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[n],o),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:n,icon:o,trend:l,sparkline:d,color:c="primary",description:x,className:m}){let p=i[c],u=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",m),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",p.bg,p.border),children:o&&(0,t.jsx)(o,{className:(0,r.cn)("w-5 h-5",p.text)})}),u&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",u.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[u.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),u.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",p.text),children:n}),x&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:x}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:p.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:p.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:p.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":s+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,n):i+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},x=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+x(e[r]);return t}return e};function m(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let m=x(e),p=c[m]||(c[m]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(m));if(!c[p]){let t=m!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);c[p]=d(a?{["@keyframes "+p]:t}:t,r?"":"."+p)}let u=r&&c.g;return r&&(c.g=c[p]),i=c[p],u?t.data=t.data.replace(u,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),p})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}m.bind({g:1});let p,u,h,f=m.bind({k:1});function b(e,t){let r=this||{};return function(){let s=arguments;function a(i,n){let o=Object.assign({},i),l=o.className||a.className;r.p=Object.assign({theme:u&&u()},o),r.o=/go\d/.test(l),o.className=m.apply(r,s)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),h&&d[0]&&h(o),p(d,o)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},$=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},_=e=>Object.keys(k).forEach(t=>$(e,t)),O=(e=j)=>t=>{$(t,e)},E={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return O(a.toasterId||(s=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},T=(e,t)=>H("blank")(e,t);T.error=H("error"),T.success=H("success"),T.loading=H("loading"),T.custom=H("custom"),T.dismiss=(e,t)=>{let r={type:3,toastId:e};t?O(t)(r):_(r)},T.dismissAll=e=>T.dismiss(void 0,e),T.remove=(e,t)=>{let r={type:4,toastId:e};t?O(t)(r):_(r)},T.removeAll=e=>T.remove(void 0,e),T.promise=(e,t,r)=>{let s=T.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?T.success(a,{id:s,...r,...null==r?void 0:r.success}):T.dismiss(s),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?T.error(a,{id:s,...r,...null==r?void 0:r.error}):T.dismiss(s)}),e};var S=1e3,D=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,A=f`
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
}`,z=b("div")`
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
    animation: ${A} 0.15s ease-out forwards;
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
`,M=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,L=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,I=f`
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
}`,R=b("div")`
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
    animation: ${I} 0.2s ease-out forwards;
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
`,U=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Y=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,G=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(Y,null,t):t:"blank"===r?null:a.createElement(U,null,a.createElement(B,{...s}),"loading"!==r&&a.createElement(F,null,"error"===r?a.createElement(z,{...s}):a.createElement(R,{...s})))},Q=b("div")`
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
`,Z=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(G,{toast:e}),o=a.createElement(V,{...e.ariaProps},g(e.message,e));return a.createElement(Q,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:n,message:o}):a.createElement(a.Fragment,null,n,o))});s=a.createElement,d.p=void 0,p=s,u=void 0,h=void 0;var q=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let n=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:n,className:t,style:r},i)},W=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&s(k[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||E[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=S)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&T.dismiss(r.id);return}return setTimeout(()=>T.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let o=(0,a.useCallback)(O(t),[t]),l=(0,a.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,a.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,a.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),x=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:x}}})(r,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let n,o,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),x=(n=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return a.createElement(q,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?W:"",style:x},"custom"===r.type?g(r.message,r):i?i(r):a.createElement(Z,{toast:r,position:l}))}))},"default",0,T,"toast",0,T],5766)},41740,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Progress",0,function({value:e,className:s,size:a="md"}){return(0,t.jsx)("div",{className:(0,r.cn)("w-full bg-card/80 rounded-full overflow-hidden border border-border","sm"===a?"h-1.5":"h-2.5",s),children:(0,t.jsx)("div",{className:"h-full bg-primary rounded-full transition-all duration-500",style:{width:`${Math.min(100,Math.max(0,e))}%`}})})}])},15327,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),a=e.i(50719),i=e.i(9694),n=e.i(75225),o=e.i(85183),l=e.i(93230),d=e.i(72526),c=e.i(34239),x=e.i(31195),m=e.i(22787),p=e.i(5766),u=e.i(37757),h=e.i(64753),f=e.i(39964),b=e.i(96640),g=e.i(97591),y=e.i(41740);let v=[{id:"s1",name:"أحمد محمد",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=t1",grade:"الثالث الثانوي",gpa:"3.8",rank:2,totalStudents:45},{id:"s2",name:"مريم أحمد",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=t2",grade:"الثالث الثانوي",gpa:"3.9",rank:1,totalStudents:45},{id:"s3",name:"يوسف علي",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=t3",grade:"الثالث الثانوي",gpa:"3.2",rank:8,totalStudents:45}],j=[{name:"الكيمياء",exam1:42,exam2:38,final:88,homework:45,total:213,max:250},{name:"الفيزياء",exam1:40,exam2:42,final:85,homework:42,total:209,max:250},{name:"الرياضيات",exam1:45,exam2:40,final:90,homework:48,total:223,max:250},{name:"العربي",exam1:38,exam2:36,final:82,homework:40,total:196,max:250},{name:"الإنجليزي",exam1:44,exam2:46,final:92,homework:48,total:230,max:250}],N=[{id:"c1",name:"شهادة إتمام الكيمياء - المستوى المتقدم",date:"2026-06-15",serial:"TOS-2026-0001"},{id:"c2",name:"شهادة التفوق في الفيزياء",date:"2026-05-20",serial:"TOS-2026-0002"},{id:"c3",name:"شهادة إتمام دورة الرياضيات",date:"2026-04-10",serial:"TOS-2026-0003"}],w={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.05}}},C={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,k]=(0,r.useState)(v[0]),$=Math.round(j.reduce((e,t)=>e+t.total,0)/j.reduce((e,t)=>e+t.max,0)*100);return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(h.Breadcrumb,{items:[{label:"الطلاب",href:"/teacher/students"},{label:"كشف الدرجات"}]}),(0,t.jsx)(u.PageHeader,{title:"كشف الدرجات",description:"سجل أكاديمي كامل للطالب"}),(0,t.jsx)("div",{className:"p-4 md:p-6 max-w-6xl mx-auto space-y-6",children:(0,t.jsxs)(s.motion.div,{variants:w,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsx)(s.motion.div,{variants:C,className:"flex flex-wrap gap-2",children:v.map(r=>(0,t.jsxs)("button",{type:"button",onClick:()=>k(r),className:`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${e.id===r.id?"border-primary bg-primary/10 text-primary":"border-border text-text-secondary hover:bg-surface-secondary"}`,children:[(0,t.jsx)("img",{src:r.avatar,alt:"",className:"w-6 h-6 rounded-full bg-surface-secondary"}),r.name]},r.id))}),(0,t.jsxs)(s.motion.div,{variants:C,className:"grid grid-cols-1 md:grid-cols-4 gap-3",children:[(0,t.jsx)(f.Card,{children:(0,t.jsx)(f.CardContent,{className:"p-4",children:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("img",{src:e.avatar,alt:"",className:"w-12 h-12 rounded-full bg-surface-secondary"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-bold text-text",children:e.name}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.grade})]})]})})}),(0,t.jsx)(g.StatsCard,{title:"المعدل التراكمي",value:e.gpa,icon:a.HiOutlineStar,color:"primary"}),(0,t.jsx)(g.StatsCard,{title:"الترتيب",value:`#${e.rank} من ${e.totalStudents}`,icon:a.HiOutlineChartBar,color:"success"}),(0,t.jsx)(g.StatsCard,{title:"النسبة المئوية",value:`${$}%`,icon:a.HiOutlineAcademicCap,color:"info"})]}),(0,t.jsxs)(s.motion.div,{variants:C,className:"grid grid-cols-1 lg:grid-cols-3 gap-4",children:[(0,t.jsxs)(f.Card,{className:"lg:col-span-2",children:[(0,t.jsx)(f.CardHeader,{children:(0,t.jsx)(f.CardTitle,{children:"الدرجات حسب المادة"})}),(0,t.jsx)(f.CardContent,{children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border",children:[(0,t.jsx)("th",{className:"text-right py-2 px-2 text-xs text-text-tertiary",children:"المادة"}),(0,t.jsx)("th",{className:"text-center py-2 px-2 text-xs text-text-tertiary",children:"امتحان أول"}),(0,t.jsx)("th",{className:"text-center py-2 px-2 text-xs text-text-tertiary",children:"امتحان ثاني"}),(0,t.jsx)("th",{className:"text-center py-2 px-2 text-xs text-text-tertiary",children:"نهائي"}),(0,t.jsx)("th",{className:"text-center py-2 px-2 text-xs text-text-tertiary",children:"واجبات"}),(0,t.jsx)("th",{className:"text-center py-2 px-2 text-xs text-text-tertiary",children:"المجموع"}),(0,t.jsx)("th",{className:"text-center py-2 px-2 text-xs text-text-tertiary",children:"النسبة"}),(0,t.jsx)("th",{className:"text-center py-2 px-2 text-xs text-text-tertiary",children:"الحالة"})]})}),(0,t.jsx)("tbody",{children:j.map(e=>{let r=Math.round(e.total/e.max*100);return(0,t.jsxs)("tr",{className:"border-b border-border last:border-0",children:[(0,t.jsx)("td",{className:"py-2.5 px-2 text-sm font-medium text-text",children:e.name}),(0,t.jsx)("td",{className:"py-2.5 px-2 text-center text-sm text-text",children:e.exam1}),(0,t.jsx)("td",{className:"py-2.5 px-2 text-center text-sm text-text",children:e.exam2}),(0,t.jsx)("td",{className:"py-2.5 px-2 text-center text-sm text-text",children:e.final}),(0,t.jsx)("td",{className:"py-2.5 px-2 text-center text-sm text-text",children:e.homework}),(0,t.jsxs)("td",{className:"py-2.5 px-2 text-center text-sm font-bold text-text",children:[e.total,"/",e.max]}),(0,t.jsx)("td",{className:"py-2.5 px-2 text-center",children:(0,t.jsx)(y.Progress,{value:r,size:"sm",variant:r>=80?"success":r>=60?"warning":"error",className:"w-16"})}),(0,t.jsx)("td",{className:"py-2.5 px-2 text-center",children:r>=60?(0,t.jsx)(b.Badge,{variant:"success",size:"sm",children:"ناجح"}):(0,t.jsx)(b.Badge,{variant:"error",size:"sm",children:"راسب"})})]},e.name)})})]})})})]}),(0,t.jsxs)(f.Card,{children:[(0,t.jsx)(f.CardHeader,{children:(0,t.jsx)(f.CardTitle,{children:"ملخص الحضور"})}),(0,t.jsxs)(f.CardContent,{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2",children:[(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-success/5 text-center",children:[(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"حاضر"}),(0,t.jsx)("p",{className:"text-xl font-bold text-success",children:42})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-error/5 text-center",children:[(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"غائب"}),(0,t.jsx)("p",{className:"text-xl font-bold text-error",children:2})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-warning/5 text-center",children:[(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"متأخر"}),(0,t.jsx)("p",{className:"text-xl font-bold text-warning",children:1})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-primary/5 text-center",children:[(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"الإجمالي"}),(0,t.jsx)("p",{className:"text-xl font-bold text-primary",children:45})]})]}),(0,t.jsx)(y.Progress,{value:Math.round(42/45*100),size:"lg",variant:"success",showLabel:!0})]})]})]}),(0,t.jsxs)(s.motion.div,{variants:C,className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:[(0,t.jsxs)(f.Card,{children:[(0,t.jsx)(f.CardHeader,{children:(0,t.jsx)(f.CardTitle,{children:"مقارنة الدرجات"})}),(0,t.jsx)(f.CardContent,{children:(0,t.jsx)(x.ResponsiveContainer,{width:"100%",height:220,children:(0,t.jsxs)(i.BarChart,{data:j,children:[(0,t.jsx)(d.CartesianGrid,{strokeDasharray:"3 3",stroke:"var(--color-border)"}),(0,t.jsx)(o.XAxis,{dataKey:"name",tick:{fontSize:11,fill:"var(--color-text-secondary)"}}),(0,t.jsx)(l.YAxis,{tick:{fontSize:11,fill:"var(--color-text-secondary)"}}),(0,t.jsx)(c.Tooltip,{}),(0,t.jsx)(n.Bar,{dataKey:"total",radius:[6,6,0,0],children:j.map((e,r)=>(0,t.jsx)(m.Cell,{fill:["#10b981","#3b82f6","#8b5cf6","#f59e0b","#e11d48"][r]},r))})]})})})]}),(0,t.jsxs)(f.Card,{children:[(0,t.jsx)(f.CardHeader,{children:(0,t.jsx)(f.CardTitle,{children:"رمز التحقق من الشهادة"})}),(0,t.jsx)(f.CardContent,{children:(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center p-6 bg-surface-secondary rounded-xl border border-border",children:[(0,t.jsx)("div",{className:"w-32 h-32 bg-white rounded-xl flex items-center justify-center mb-3 border",children:(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)(a.HiOutlineQrcode,{className:"w-16 h-16 text-text-tertiary mx-auto"}),(0,t.jsx)("p",{className:"text-[10px] text-text-tertiary mt-1",children:"QR Verification"})]})}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary mb-1",children:"رمز التحقق:"}),(0,t.jsxs)("p",{className:"text-sm font-mono font-bold text-primary",children:["TOS-VRFY-",e.id.toUpperCase(),"-2026"]}),(0,t.jsx)("button",{type:"button",onClick:()=>p.default.success("تم نسخ رمز التحقق"),className:"mt-2 text-xs text-primary hover:underline",children:"نسخ الرمز"})]})})]})]}),(0,t.jsx)(s.motion.div,{variants:C,children:(0,t.jsxs)(f.Card,{children:[(0,t.jsx)(f.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)(f.CardTitle,{children:"الشهادات المحصل عليها"}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>p.default.success("جاري تحميل كشف الدرجات..."),className:"flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-text hover:bg-surface-secondary transition-all",children:[(0,t.jsx)(a.HiOutlineDownload,{className:"w-3.5 h-3.5"})," PDF"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>p.default.success("جاري التحميل للطباعة..."),className:"flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-text hover:bg-surface-secondary transition-all",children:[(0,t.jsx)(a.HiOutlinePrinter,{className:"w-3.5 h-3.5"})," طباعة"]})]})]})}),(0,t.jsx)(f.CardContent,{children:(0,t.jsx)("div",{className:"space-y-2",children:N.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(a.HiOutlineStar,{className:"w-8 h-8 text-primary"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.name}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:[e.date," - ",e.serial]})]})]}),(0,t.jsxs)("button",{type:"button",onClick:()=>p.default.success("جاري تحميل الشهادة..."),className:"px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all",children:[(0,t.jsx)(a.HiOutlineDownload,{className:"w-3.5 h-3.5 inline ml-1"}),"تحميل"]})]},e.id))})})]})})]})})]})}])}]);