(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:a}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",a),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(s.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:l,sparkline:d,color:c="primary",description:p,className:u}){let x=i[c],m=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",u),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",x.bg,x.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",x.text)})}),m&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",m.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[m.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),m.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",x.text),children:o}),p&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:p}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:x.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:x.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:x.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function u(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let u=p(e),x=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!c[x]){let t=u!==e?e:(e=>{let t,r,s=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);c[x]=d(a?{["@keyframes "+x]:t}:t,r?"":"."+x)}let m=r&&c.g;return r&&(c.g=c[x]),i=c[x],m?t.data=t.data.replace(m,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),x})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}u.bind({g:1});let x,m,b,g=u.bind({k:1});function h(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:m&&m()},n),r.o=/go\d/.test(l),n.className=u.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),x(d,n)}return t?t(a):a}}var f=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},$=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},E=e=>Object.keys(k).forEach(t=>$(e,t)),_=(e=j)=>t=>{$(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return _(a.toasterId||(s=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},A=(e,t)=>O("blank")(e,t);A.error=O("error"),A.success=O("success"),A.loading=O("loading"),A.custom=O("custom"),A.dismiss=(e,t)=>{let r={type:3,toastId:e};t?_(t)(r):E(r)},A.dismissAll=e=>A.dismiss(void 0,e),A.remove=(e,t)=>{let r={type:4,toastId:e};t?_(t)(r):E(r)},A.removeAll=e=>A.remove(void 0,e),A.promise=(e,t,r)=>{let s=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?f(t.success,e):void 0;return a?A.success(a,{id:s,...r,...null==r?void 0:r.success}):A.dismiss(s),e}).catch(e=>{let a=t.error?f(t.error,e):void 0;a?A.error(a,{id:s,...r,...null==r?void 0:r.error}):A.dismiss(s)}),e};var H=1e3,T=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,M=h("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,P=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=h("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,I=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,z=g`
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
}`,B=h("div")`
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
    animation: ${z} 0.2s ease-out forwards;
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
`,F=h("div")`
  position: absolute;
`,R=h("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=h("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Z=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(W,null,t):t:"blank"===r?null:a.createElement(R,null,a.createElement(U,{...s}),"loading"!==r&&a.createElement(F,null,"error"===r?a.createElement(M,{...s}):a.createElement(B,{...s})))},q=h("div")`
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
`,G=h("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(Z,{toast:e}),n=a.createElement(G,{...e.ariaProps},f(e.message,e));return a.createElement(q,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});s=a.createElement,d.p=void 0,x=s,m=void 0,b=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:o,className:t,style:r},i)},J=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&s(k[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=H)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&A.dismiss(r.id);return}return setTimeout(()=>A.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let n=(0,a.useCallback)(_(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),p=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:p}}})(r,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,n,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),p=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return a.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:p},"custom"===r.type?f(r.message,r):i?i(r):a.createElement(X,{toast:r,position:l}))}))},"default",0,A,"toast",0,A],5766)},49744,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(50719);e.s(["DataTable",0,function({data:e,columns:i,pageSize:o=10,searchable:n,searchKeys:l,className:d}){let[c,p]=(0,r.useState)(""),[u,x]=(0,r.useState)(1),[m,b]=(0,r.useState)(null),[g,h]=(0,r.useState)("asc"),f=(0,r.useMemo)(()=>{if(!c||!l)return e;let t=c.toLowerCase();return e.filter(e=>l.some(r=>String(e[r]).toLowerCase().includes(t)))},[e,c,l]),y=(0,r.useMemo)(()=>m?[...f].sort((e,t)=>{let r=e[m],s=t[m],a="number"==typeof r?r-s:String(r).localeCompare(String(s));return"asc"===g?a:-a}):f,[f,m,g]),v=Math.ceil(y.length/o),j=y.slice((u-1)*o,u*o);return(0,t.jsxs)("div",{className:(0,s.cn)("space-y-4",d),children:[n&&(0,t.jsx)("input",{value:c,onChange:e=>{p(e.target.value),x(1)},placeholder:"بحث...",className:"w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30"}),(0,t.jsx)("div",{className:"w-full overflow-auto rounded-[16px] border border-border",children:(0,t.jsxs)("table",{className:"w-full border-collapse",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"border-b border-border bg-card/50",children:i.map(e=>(0,t.jsxs)("th",{onClick:()=>{e.sortable&&(b(e.key),h(e=>"asc"===e?"desc":"asc"))},className:(0,s.cn)("px-4 py-3 text-right text-sm font-medium text-text-secondary",e.sortable&&"cursor-pointer hover:text-text select-none",e.className),children:[e.label,m===e.key&&(0,t.jsx)("span",{className:"mr-1 text-primary",children:"asc"===g?"↑":"↓"})]},e.key))})}),(0,t.jsxs)("tbody",{className:"divide-y divide-border",children:[j.map((e,r)=>(0,t.jsx)("tr",{className:"transition-colors hover:bg-card/30",children:i.map(r=>(0,t.jsx)("td",{className:(0,s.cn)("px-4 py-3 text-sm text-text",r.className),children:r.render?r.render(e):String(e[r.key])},r.key))},r)),0===j.length&&(0,t.jsx)("tr",{children:(0,t.jsx)("td",{colSpan:i.length,className:"text-center py-12 text-text-secondary text-sm",children:"لا توجد نتائج"})})]})]})}),v>1&&(0,t.jsxs)("div",{className:"flex items-center justify-between text-sm",children:[(0,t.jsxs)("span",{className:"text-text-secondary",children:["الصفحة ",u," من ",v]}),(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)("button",{onClick:()=>x(e=>Math.min(e+1,v)),disabled:u===v,className:"p-2 rounded-[10px] text-text-secondary hover:bg-card hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors",children:(0,t.jsx)(a.HiChevronLeft,{className:"w-4 h-4"})}),(0,t.jsx)("button",{onClick:()=>x(e=>Math.max(e-1,1)),disabled:1===u,className:"p-2 rounded-[10px] text-text-secondary hover:bg-card hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors",children:(0,t.jsx)(a.HiChevronRight,{className:"w-4 h-4"})})]})]})]})}])},9529,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),a=e.i(50719),i=e.i(5766),o=e.i(37757),n=e.i(39964),l=e.i(96640),d=e.i(97591),c=e.i(49744),p=e.i(64753);let u=[{id:"c1",code:"BACK2SCHOOL",discount:20,type:"percentage",usageCount:45,maxUsage:100,expiresAt:"2026-09-01",active:!0},{id:"c2",code:"SUMMER50",discount:50,type:"fixed",usageCount:12,maxUsage:50,expiresAt:"2026-08-15",active:!0},{id:"c3",code:"NEWSTUDENT",discount:15,type:"percentage",usageCount:8,maxUsage:30,expiresAt:"2026-12-31",active:!0},{id:"c4",code:"ELITE10",discount:10,type:"percentage",usageCount:120,maxUsage:200,expiresAt:"2026-07-30",active:!1},{id:"c5",code:"FINALPUSH",discount:100,type:"fixed",usageCount:5,maxUsage:20,expiresAt:"2026-07-20",active:!0}],x=[{key:"code",label:"الكود",render:e=>(0,t.jsx)("span",{className:"text-sm font-mono font-bold text-primary",children:e.code})},{key:"discount",label:"الخصم",render:e=>(0,t.jsx)("span",{className:"text-sm text-text",children:"percentage"===e.type?`${e.discount}%`:`${e.discount} ج.ظ…`})},{key:"usage",label:"الاستخدام",render:e=>(0,t.jsxs)("span",{className:"text-xs text-text-tertiary",children:[e.usageCount,"/",e.maxUsage]})},{key:"expires",label:"ينتهي",render:e=>(0,t.jsx)("span",{className:"text-xs text-text-tertiary",children:e.expiresAt})},{key:"active",label:"الحالة",render:e=>(0,t.jsx)(l.Badge,{variant:e.active?"success":"error",size:"sm",children:e.active?"نشط":"منتهي"})}],m={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.05}}},b={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,l]=(0,r.useState)(""),[g,h]=(0,r.useState)(""),[f,y]=(0,r.useState)("percentage"),v=u.filter(e=>e.active).length,j=u.reduce((e,t)=>e+t.usageCount,0);return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(p.Breadcrumb,{items:[{label:"المدفوعات",href:"/teacher/payments/installments"},{label:"الكوبونات"}]}),(0,t.jsx)(o.PageHeader,{title:"كوبونات الخصم",description:"إدارة أكواد الخصم والعروض"}),(0,t.jsx)("div",{className:"p-4 md:p-6 space-y-6",children:(0,t.jsxs)(s.motion.div,{variants:m,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsxs)(s.motion.div,{variants:b,className:"grid grid-cols-1 sm:grid-cols-4 gap-3",children:[(0,t.jsx)(d.StatsCard,{title:"إجمالي الكوبونات",value:u.length,icon:a.HiOutlineTicket,color:"primary"}),(0,t.jsx)(d.StatsCard,{title:"نشطة",value:v,icon:a.HiOutlineCheckCircle,color:"success"}),(0,t.jsx)(d.StatsCard,{title:"منتهية",value:u.length-v,icon:a.HiOutlineXCircle,color:"error"}),(0,t.jsx)(d.StatsCard,{title:"مرات الاستخدام",value:j,icon:a.HiOutlineSelector,color:"info"})]}),(0,t.jsx)(s.motion.div,{variants:b,children:(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsx)(n.CardTitle,{children:"إنشاء كوبون جديد"})}),(0,t.jsx)(n.CardContent,{children:(0,t.jsxs)("div",{className:"flex flex-wrap gap-3 items-end",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("label",{className:"text-xs text-text-tertiary",children:"الكود"}),(0,t.jsx)("input",{type:"text",value:e,onChange:e=>l(e.target.value),placeholder:"مثال: OFFER20",className:"w-36 bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("label",{className:"text-xs text-text-tertiary",children:"القيمة"}),(0,t.jsx)("input",{type:"number",value:g,onChange:e=>h(e.target.value),placeholder:"20",className:"w-24 bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("label",{className:"text-xs text-text-tertiary",children:"النوع"}),(0,t.jsx)("div",{className:"flex gap-2",children:["percentage","fixed"].map(e=>(0,t.jsx)("button",{type:"button",onClick:()=>y(e),className:`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${f===e?"border-primary bg-primary/10 text-primary":"border-border text-text-tertiary"}`,children:"percentage"===e?"نسبة %":"قيمة ثابتة"},e))})]}),(0,t.jsxs)("button",{type:"button",onClick:()=>{e.trim()&&g.trim()?(i.default.success(`تم إنشاء الكود ${e.trim()} بنجاح`),l(""),h("")):i.default.error("الرجاء إدخال الكود والخصم")},className:"px-4 py-2 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-dark transition-all",children:[(0,t.jsx)(a.HiOutlinePlus,{className:"w-4 h-4 inline ml-1"}),"إنشاء"]})]})})]})}),(0,t.jsx)(s.motion.div,{variants:b,children:(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsx)(n.CardTitle,{children:"جميع الكوبونات"})}),(0,t.jsx)(n.CardContent,{children:(0,t.jsx)(c.DataTable,{columns:x,data:u,searchable:!0})})]})})]})})]})}])}]);