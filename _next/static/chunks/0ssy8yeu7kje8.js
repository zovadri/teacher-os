(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:a}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",a),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(s.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:d=!1,pulse:l=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[o],n),children:[d&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",l&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:d,sparkline:l,color:c="primary",description:p,className:m}){let u=i[c],x=void 0===d?null:"number"==typeof d?{value:Math.abs(d),positive:d>=0}:{value:d.value,positive:d.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",m),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",u.bg,u.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",u.text)})}),x&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",u.text),children:o}),p&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:p}),l&&l.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${l.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:u.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:u.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" "),fill:"none",stroke:u.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" ")} L${l.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,l=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?l(o,i):i+"{"+l(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=l(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=l.p?l.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function m(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let m=p(e),u=c[m]||(c[m]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(m));if(!c[u]){let t=m!==e?e:(e=>{let t,r,s=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?s.shift():t[3]?(r=t[3].replace(d," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(d," ").trim();return s[0]})(e);c[u]=l(a?{["@keyframes "+u]:t}:t,r?"":"."+u)}let x=r&&c.g;return r&&(c.g=c[u]),i=c[u],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),u})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}m.bind({g:1});let u,x,b,f=m.bind({k:1});function h(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),d=n.className||a.className;r.p=Object.assign({theme:x&&x()},n),r.o=/go\d/.test(d),n.className=m.apply(r,s)+(d?" "+d:""),t&&(n.ref=o);let l=e;return e[0]&&(l=n.as||e,delete n.as),b&&l[0]&&b(n),u(l,n)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),y=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},$=(e,t=j)=>{k[t]=w(k[t]||C,e),N.forEach(([e,r])=>{e===t&&r(k[t])})},_=e=>Object.keys(k).forEach(t=>$(e,t)),E=(e=j)=>t=>{$(t,e)},A={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||v()}))(t,e,r);return E(a.toasterId||(s=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},O=(e,t)=>D("blank")(e,t);O.error=D("error"),O.success=D("success"),O.loading=D("loading"),O.custom=D("custom"),O.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):_(r)},O.dismissAll=e=>O.dismiss(void 0,e),O.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):_(r)},O.removeAll=e=>O.remove(void 0,e),O.promise=(e,t,r)=>{let s=O.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?O.success(a,{id:s,...r,...null==r?void 0:r.success}):O.dismiss(s),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?O.error(a,{id:s,...r,...null==r?void 0:r.error}):O.dismiss(s)}),e};var H=1e3,P=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,T=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,S=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=h("div")`
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
    animation: ${T} 0.15s ease-out forwards;
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
    animation: ${S} 0.15s ease-out forwards;
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
`,L=h("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${z} 1s linear infinite;
`,M=f`
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
}`,F=h("div")`
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
`,R=h("div")`
  position: absolute;
`,U=h("div")`
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
}`,K=h("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Z=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(K,null,t):t:"blank"===r?null:a.createElement(U,null,a.createElement(L,{...s}),"loading"!==r&&a.createElement(R,null,"error"===r?a.createElement(B,{...s}):a.createElement(F,{...s})))},q=h("div")`
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
`,W=h("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=y()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(Z,{toast:e}),n=a.createElement(W,{...e.ariaProps},g(e.message,e));return a.createElement(q,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});s=a.createElement,l.p=void 0,u=s,x=void 0,b=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:o,className:t,style:r},i)},J=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:n,containerClassName:d})=>{let{toasts:l,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&s(k[t]),N.push([t,s]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||A[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=H)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&O.dismiss(r.id);return}return setTimeout(()=>O.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let n=(0,a.useCallback)(E(t),[t]),d=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),l=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),p=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),d=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[d+1]:[0,d]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:l,startPause:d,endPause:c,calculateOffset:p}}})(r,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:d,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let o,n,d=r.position||t,l=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),p=(o=d.includes("top"),n=d.includes("center")?{justifyContent:"center"}:d.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:y()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${l*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return a.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:p},"custom"===r.type?g(r.message,r):i?i(r):a.createElement(X,{toast:r,position:d}))}))},"default",0,O,"toast",0,O],5766)},86339,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),a=e.i(50719),i=e.i(5766),o=e.i(37757),n=e.i(39964),d=e.i(96640),l=e.i(97591),c=e.i(64753);let p=[{id:"s1",name:"أحمد محمد",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=vp1",maxDevices:2,devices:[{id:"d1",name:"iPhone 15",type:"هاتف",ip:"192.168.1.101",lastActive:"منذ 5 دقائق",blocked:!1},{id:"d2",name:"MacBook Pro",type:"لابتوب",ip:"192.168.1.102",lastActive:"منذ ساعة",blocked:!1}]},{id:"s2",name:"مريم أحمد",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=vp2",maxDevices:2,devices:[{id:"d3",name:"Samsung Galaxy",type:"هاتف",ip:"192.168.1.103",lastActive:"منذ 3 ساعات",blocked:!1},{id:"d4",name:"iPad Air",type:"جهاز لوحي",ip:"192.168.1.104",lastActive:"منذ يوم",blocked:!0}]},{id:"s3",name:"يوسف علي",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=vp3",maxDevices:1,devices:[{id:"d5",name:"Huawei P60",type:"هاتف",ip:"192.168.1.105",lastActive:"منذ 30 دقيقة",blocked:!1}]},{id:"s4",name:"سارة خالد",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=vp4",maxDevices:3,devices:[{id:"d6",name:"iPhone 14",type:"هاتف",ip:"192.168.1.106",lastActive:"الآن",blocked:!1},{id:"d7",name:"Dell XPS",type:"لابتوب",ip:"192.168.1.107",lastActive:"منذ ساعتين",blocked:!1}]}],m={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.05}}},u={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,x]=(0,r.useState)(p),b=e.reduce((e,t)=>e+t.devices.length,0),f=e.reduce((e,t)=>e+t.devices.filter(e=>e.blocked).length,0),h=e.filter(e=>e.devices.some(e=>!e.blocked)).length;return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(c.Breadcrumb,{items:[{label:"الفيديوهات",href:"/teacher/videos"},{label:"حماية الفيديو",href:"/teacher/videos/protection"},{label:"حماية متقدمة"}]}),(0,t.jsx)(o.PageHeader,{title:"حماية الفيديو المتقدمة",description:"إدارة الأجهزة والعلامات المائية والحظر"}),(0,t.jsx)("div",{className:"p-4 md:p-6 max-w-6xl mx-auto space-y-6",children:(0,t.jsxs)(s.motion.div,{variants:m,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsxs)(s.motion.div,{variants:u,className:"grid grid-cols-1 sm:grid-cols-4 gap-3",children:[(0,t.jsx)(l.StatsCard,{title:"الأجهزة المسجلة",value:b,icon:a.HiOutlineDeviceTablet,color:"primary"}),(0,t.jsx)(l.StatsCard,{title:"محظورة",value:f,icon:a.HiOutlineBan,color:"error"}),(0,t.jsx)(l.StatsCard,{title:"نشطة",value:b-f,icon:a.HiOutlineCheckCircle,color:"success"}),(0,t.jsx)(l.StatsCard,{title:"طلاب نشطين",value:h,icon:a.HiOutlineShieldCheck,color:"info"})]}),(0,t.jsxs)(s.motion.div,{variants:u,className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsx)(n.CardTitle,{children:"إعدادات العلامة المائية"})}),(0,t.jsxs)(n.CardContent,{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsx)("span",{className:"text-sm text-text",children:"اسم الطالب"}),(0,t.jsx)(d.Badge,{variant:"success",size:"sm",children:"مفعل"})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsx)("span",{className:"text-sm text-text",children:"رقم الهاتف"}),(0,t.jsx)(d.Badge,{variant:"success",size:"sm",children:"مفعل"})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsx)("span",{className:"text-sm text-text",children:"الوقت والتاريخ"}),(0,t.jsx)(d.Badge,{variant:"success",size:"sm",children:"مفعل"})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsx)("span",{className:"text-sm text-text",children:"منع أكثر من جهاز في وقت واحد"}),(0,t.jsx)(d.Badge,{variant:"primary",size:"sm",children:"مفعل"})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-warning/5 border border-warning/20 text-xs text-warning",children:[(0,t.jsx)(a.HiOutlineShieldCheck,{className:"w-4 h-4 inline ml-1"}),"العلامة المائية تضاف تلقائياً على جميع فيديوهات الكورس"]})]})]}),(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsx)(n.CardTitle,{children:"سجل الأجهزة للطلاب"})}),(0,t.jsx)(n.CardContent,{className:"space-y-3",children:e.map(e=>(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("img",{src:e.avatar,alt:"",className:"w-6 h-6 rounded-full bg-surface-secondary"}),(0,t.jsx)("span",{className:"text-sm font-medium text-text",children:e.name})]}),(0,t.jsxs)("span",{className:"text-xs text-text-tertiary",children:["الحد الأقصى: ",e.maxDevices," أجهزة"]})]}),e.devices.map(r=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-2 rounded-lg bg-surface mb-1 text-xs",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:r.blocked?"text-error line-through":"text-text",children:r.name}),(0,t.jsx)("span",{className:"text-text-tertiary",children:r.type})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:r.ip}),(0,t.jsx)("span",{className:"text-text-tertiary",children:r.lastActive}),(0,t.jsx)("button",{type:"button",onClick:()=>{var t,s;return t=e.id,s=r.id,void(x(e=>e.map(e=>e.id===t?{...e,devices:e.devices.map(e=>e.id===s?{...e,blocked:!e.blocked}:e)}:e)),i.default.success("تم تحديث حالة الجهاز"))},className:`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${r.blocked?"bg-success/10 text-success":"bg-error/10 text-error"}`,children:r.blocked?"رفع الحظر":"حظر"})]})]},r.id))]},e.id))})]})]})]})})]})}])}]);