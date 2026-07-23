(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},n={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},d=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:d,leftIcon:o,rightIcon:l,className:c,disabled:x,children:m,...p},u)=>(0,t.jsxs)("button",{ref:u,disabled:x||d,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],n[r],c),...p,children:[d?(0,t.jsx)(a.Spinner,{size:"sm"}):o,m,!d&&l]}));d.displayName="Button",e.s(["default",0,d])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:d,dot:o=!1,pulse:l=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[n],d),children:[o&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",l&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=s.HiOutlineInbox,action:n,className:d}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",d),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:n,icon:d,trend:o,sparkline:l,color:c="primary",description:x,className:m}){let p=i[c],u=void 0===o?null:"number"==typeof o?{value:Math.abs(o),positive:o>=0}:{value:o.value,positive:o.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",m),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",p.bg,p.border),children:d&&(0,t.jsx)(d,{className:(0,r.cn)("w-5 h-5",p.text)})}),u&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",u.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[u.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),u.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",p.text),children:n}),x&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:x}),l&&l.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${l.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:p.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:p.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" "),fill:"none",stroke:p.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" ")} L${l.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,o=/\n+/g,l=(e,t)=>{let r="",s="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":s+="f"==i[1]?l(n,i):i+"{"+l(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=l(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=l.p?l.p(i,n):i+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},x=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+x(e[r]);return t}return e};function m(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let m=x(e),p=c[m]||(c[m]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(m));if(!c[p]){let t=m!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(d,""));)t[4]?s.shift():t[3]?(r=t[3].replace(o," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(o," ").trim();return s[0]})(e);c[p]=l(a?{["@keyframes "+p]:t}:t,r?"":"."+p)}let u=r&&c.g;return r&&(c.g=c[p]),i=c[p],u?t.data=t.data.replace(u,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),p})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}m.bind({g:1});let p,u,h,g=m.bind({k:1});function f(e,t){let r=this||{};return function(){let s=arguments;function a(i,n){let d=Object.assign({},i),o=d.className||a.className;r.p=Object.assign({theme:u&&u()},d),r.o=/go\d/.test(o),d.className=m.apply(r,s)+(o?" "+o:""),t&&(d.ref=n);let l=e;return e[0]&&(l=d.as||e,delete d.as),h&&l[0]&&h(d),p(l,d)}return t?t(a):a}}var b=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},E=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},_=e=>Object.keys(k).forEach(t=>E(e,t)),O=(e=j)=>t=>{E(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return O(a.toasterId||(s=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},$=(e,t)=>H("blank")(e,t);$.error=H("error"),$.success=H("success"),$.loading=H("loading"),$.custom=H("custom"),$.dismiss=(e,t)=>{let r={type:3,toastId:e};t?O(t)(r):_(r)},$.dismissAll=e=>$.dismiss(void 0,e),$.remove=(e,t)=>{let r={type:4,toastId:e};t?O(t)(r):_(r)},$.removeAll=e=>$.remove(void 0,e),$.promise=(e,t,r)=>{let s=$.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?b(t.success,e):void 0;return a?$.success(a,{id:s,...r,...null==r?void 0:r.success}):$.dismiss(s),e}).catch(e=>{let a=t.error?b(t.error,e):void 0;a?$.error(a,{id:s,...r,...null==r?void 0:r.error}):$.dismiss(s)}),e};var A=1e3,T=g`
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
}`,I=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=f("div")`
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
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=g`
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
  animation: ${M} 1s linear infinite;
`,P=g`
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
}`,R=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,U=f("div")`
  position: absolute;
`,F=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,G=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,W=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(K,null,t):t:"blank"===r?null:a.createElement(F,null,a.createElement(L,{...s}),"loading"!==r&&a.createElement(U,null,"error"===r?a.createElement(B,{...s}):a.createElement(R,{...s})))},Z=f("div")`
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
`,q=f("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Y=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(W,{toast:e}),d=a.createElement(q,{...e.ariaProps},b(e.message,e));return a.createElement(Z,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:n,message:d}):a.createElement(a.Fragment,null,n,d))});s=a.createElement,l.p=void 0,p=s,u=void 0,h=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let n=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:n,className:t,style:r},i)},Q=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:n,containerStyle:d,containerClassName:o})=>{let{toasts:l,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&s(k[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=A)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),d({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&$.dismiss(r.id);return}return setTimeout(()=>$.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let d=(0,a.useCallback)(O(t),[t]),o=(0,a.useCallback)(()=>{d({type:5,time:Date.now()})},[d]),l=(0,a.useCallback)((e,t)=>{d({type:1,toast:{id:e,height:t}})},[d]),c=(0,a.useCallback)(()=>{s&&d({type:6,time:Date.now()})},[s,d]),x=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),d=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<d&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:l,startPause:o,endPause:c,calculateOffset:x}}})(r,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...d},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let n,d,o=r.position||t,l=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),x=(n=o.includes("top"),d=o.includes("center")?{justifyContent:"center"}:o.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${l*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...d});return a.createElement(J,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Q:"",style:x},"custom"===r.type?b(r.message,r):i?i(r):a.createElement(Y,{toast:r,position:o}))}))},"default",0,$,"toast",0,$],5766)},88442,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["CardSkeleton",0,function({count:e=3}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-5 flex-1 bg-card/80 animate-pulse rounded-[8px]"})]}),(0,t.jsx)("div",{className:"h-4 w-3/4 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-1/2 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"Skeleton",0,function({className:e,variant:s="text"}){return(0,t.jsx)("div",{className:(0,r.cn)("animate-pulse bg-card/80","circular"===s&&"rounded-full","text"===s&&"h-4 rounded-[8px]","rectangular"===s&&"rounded-[14px]",e)})},"StatsSkeleton",0,function({count:e=4}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsx)("div",{className:"w-11 h-11 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-8 w-32 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"TableSkeleton",0,function({rows:e=5}){return(0,t.jsxs)("div",{className:"border border-border rounded-[16px] overflow-hidden",children:[(0,t.jsx)("div",{className:"bg-card/50 border-b border-border px-4 py-3",children:(0,t.jsx)("div",{className:"h-4 w-32 bg-card/80 animate-pulse rounded-[8px]"})}),Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"border-b border-border last:border-b-0 px-4 py-3 flex items-center gap-4",children:[(0,t.jsx)("div",{className:"h-4 flex-1 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-16 bg-card/80 animate-pulse rounded-[8px]"})]},r))]})}])},57553,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(50719),a=e.i(5766),i=e.i(59544),n=e.i(39964),d=e.i(96640),o=e.i(97591),l=e.i(37757),c=e.i(40803),x=e.i(88442),m=e.i(81604);let p=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][new Date().getDay()],u=Array.from({length:6},(e,t)=>({id:`appt-${t+1}`,studentName:`طالب ${t+1}`,time:`${8+t}:00`,type:t%2==0?"مقابلة":"اختبار تحديد مستوى",status:t<2?"جاري":t<4?"قادم":"منتهي"}));function h(){return(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)(x.Skeleton,{className:"h-5 w-1/3"}),(0,t.jsx)(x.Skeleton,{className:"h-20"})]})}e.s(["default",0,function(){let[e,g]=(0,r.useState)(!0),[f,b]=(0,r.useState)(new Date);(0,r.useEffect)(()=>{let e=setTimeout(()=>g(!1),1e3);return()=>clearTimeout(e)},[]),(0,r.useEffect)(()=>{let e=setInterval(()=>{b(new Date),a.default.success("تم تحديث البيانات تلقائياً")},6e4);return()=>clearInterval(e)},[]);let y=(0,r.useMemo)(()=>m.mockClassGroups.filter(e=>e.schedule.some(e=>e.day===p)&&"active"===e.status),[]),v=(0,r.useMemo)(()=>m.mockAttendance.slice(0,5).map(e=>({...e,checkedIn:"present"===e.status||"late"===e.status})),[]),j=(0,r.useMemo)(()=>m.mockWaitingStudents.filter(e=>"waiting"===e.status),[]),N=(0,r.useMemo)(()=>m.mockPayments.filter(e=>"pending"===e.status),[]),w=(0,r.useMemo)(()=>m.mockEnrollments.slice(0,5),[]),C=(0,r.useMemo)(()=>({todayClasses:y.length,currentAttendance:v.filter(e=>e.checkedIn).length,waitingCount:j.length,pendingPayments:N.length,todayRegistrations:w.length,todayAppointments:u.filter(e=>"منتهي"!==e.status).length}),[y,v,j,N,w]);return(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(l.PageHeader,{title:"لوحة الاستقبال",description:"نظرة عامة على نشاط اليوم",actions:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("span",{className:"text-xs text-text-tertiary",children:["آخر تحديث: ",f.toLocaleTimeString("ar-EG")]}),(0,t.jsx)(i.default,{variant:"ghost",size:"sm",leftIcon:(0,t.jsx)(s.HiOutlineRefresh,{className:"w-4 h-4"}),onClick:()=>{g(!0),setTimeout(()=>{g(!1),b(new Date),a.default.success("تم تحديث البيانات")},600)},children:"تحديث"})]})}),e?(0,t.jsx)(x.StatsSkeleton,{count:6}):(0,t.jsxs)("div",{className:"grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4",children:[(0,t.jsx)(o.StatsCard,{title:"حصص اليوم",value:C.todayClasses,icon:s.HiOutlineAcademicCap,color:"primary"}),(0,t.jsx)(o.StatsCard,{title:"الحضور الحالي",value:C.currentAttendance,icon:s.HiOutlineUsers,color:"success"}),(0,t.jsx)(o.StatsCard,{title:"الطلاب المنتظرون",value:C.waitingCount,icon:s.HiOutlineClock,color:"warning"}),(0,t.jsx)(o.StatsCard,{title:"المدفوعات المعلقة",value:C.pendingPayments,icon:s.HiOutlineCash,color:"error"}),(0,t.jsx)(o.StatsCard,{title:"تسجيلات اليوم",value:C.todayRegistrations,icon:s.HiOutlineUserAdd,color:"info"}),(0,t.jsx)(o.StatsCard,{title:"مواعيد اليوم",value:C.todayAppointments,icon:s.HiOutlineCalendar,color:"primary"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[(0,t.jsxs)(n.Card,{children:[(0,t.jsxs)(n.CardHeader,{children:[(0,t.jsx)(n.CardTitle,{children:"حصص اليوم"}),(0,t.jsx)(d.Badge,{variant:"primary",children:y.length})]}),(0,t.jsx)(n.CardContent,{children:e?(0,t.jsx)(h,{}):0===y.length?(0,t.jsx)(c.EmptyState,{icon:s.HiOutlineAcademicCap,title:"لا توجد حصص اليوم",description:"ليس لديك أي حصص مجدولة اليوم",bordered:!0}):(0,t.jsx)("div",{className:"space-y-3",children:y.map(e=>{let r=e.schedule.find(e=>e.day===p);return r?(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-xl bg-primary-10 flex items-center justify-center",children:(0,t.jsx)(s.HiOutlineAcademicCap,{className:"w-5 h-5 text-primary"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.courseName}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:[e.name," - ",e.classroom]})]})]}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsxs)("p",{className:"text-sm font-medium text-text",children:[r.startTime," - ",r.endTime]}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:[e.enrolledCount," طالب"]})]})]},e.id):null})})})]}),(0,t.jsxs)(n.Card,{children:[(0,t.jsxs)(n.CardHeader,{children:[(0,t.jsx)(n.CardTitle,{children:"الحضور الحالي"}),(0,t.jsx)(d.Badge,{variant:"success",children:v.filter(e=>e.checkedIn).length})]}),(0,t.jsx)(n.CardContent,{children:e?(0,t.jsx)(h,{}):0===v.filter(e=>e.checkedIn).length?(0,t.jsx)(c.EmptyState,{icon:s.HiOutlineUsers,title:"لا يوجد حضور حالياً",description:"لم يتم تسجيل أي حضور حتى الآن",bordered:!0}):(0,t.jsx)("div",{className:"space-y-3",children:v.filter(e=>e.checkedIn).map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(s.HiOutlineCheckCircle,{className:"w-5 h-5 text-success"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.studentName}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.courseName})]})]}),(0,t.jsx)("div",{className:"text-left",children:(0,t.jsxs)("p",{className:"text-xs text-text-secondary",children:["دخول: ",e.checkIn]})})]},e.id))})})]}),(0,t.jsxs)(n.Card,{children:[(0,t.jsxs)(n.CardHeader,{children:[(0,t.jsx)(n.CardTitle,{children:"الطلاب المنتظرون"}),(0,t.jsx)(d.Badge,{variant:"warning",children:j.length})]}),(0,t.jsx)(n.CardContent,{children:e?(0,t.jsx)(h,{}):0===j.length?(0,t.jsx)(c.EmptyState,{icon:s.HiOutlineClock,title:"لا يوجد طلاب منتظرون",description:"قائمة الانتظار فارغة حالياً",bordered:!0}):(0,t.jsxs)("div",{className:"space-y-3",children:[j.slice(0,5).map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(s.HiOutlineClock,{className:"w-5 h-5 text-warning"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.studentName}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.groupName})]})]}),(0,t.jsx)("div",{className:"text-left",children:(0,t.jsxs)(d.Badge,{variant:1===e.priority?"error":2===e.priority?"warning":"info",size:"sm",children:["أولوية ",e.priority]})})]},e.id)),j.length>5&&(0,t.jsxs)("p",{className:"text-center text-xs text-text-tertiary pt-2",children:["+ ",j.length-5," آخرون"]})]})})]}),(0,t.jsxs)(n.Card,{children:[(0,t.jsxs)(n.CardHeader,{children:[(0,t.jsx)(n.CardTitle,{children:"المدفوعات المعلقة"}),(0,t.jsx)(d.Badge,{variant:"error",children:N.length})]}),(0,t.jsx)(n.CardContent,{children:e?(0,t.jsx)(h,{}):0===N.length?(0,t.jsx)(c.EmptyState,{icon:s.HiOutlineCash,title:"لا توجد مدفوعات معلقة",description:"جميع المدفوعات مسددة",bordered:!0}):(0,t.jsxs)("div",{className:"space-y-3",children:[N.slice(0,5).map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(s.HiOutlineCash,{className:"w-5 h-5 text-error"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.studentName}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"cash"===e.method?"نقداً":"fawry"===e.method?"فوري":"كود"})]})]}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsxs)("p",{className:"text-sm font-bold text-error",children:[e.amount.toLocaleString("ar-EG")," ج.ظ…"]}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.createdAt.toLocaleDateString("ar-EG")})]})]},e.id)),N.length>5&&(0,t.jsxs)("p",{className:"text-center text-xs text-text-tertiary pt-2",children:["+ ",N.length-5," مدفوعات أخرى"]})]})})]}),(0,t.jsxs)(n.Card,{children:[(0,t.jsxs)(n.CardHeader,{children:[(0,t.jsx)(n.CardTitle,{children:"تسجيلات اليوم"}),(0,t.jsx)(d.Badge,{variant:"info",children:w.length})]}),(0,t.jsx)(n.CardContent,{children:e?(0,t.jsx)(h,{}):0===w.length?(0,t.jsx)(c.EmptyState,{icon:s.HiOutlineUserAdd,title:"لا توجد تسجيلات اليوم",description:"لم يتم تسجيل أي طالب جديد اليوم",bordered:!0}):(0,t.jsx)("div",{className:"space-y-3",children:w.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(s.HiOutlineUserAdd,{className:"w-5 h-5 text-info"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.studentName}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.courseName})]})]}),(0,t.jsx)(d.Badge,{variant:"active"===e.status?"success":"warning",size:"sm",children:"active"===e.status?"نشط":e.status})]},e.id))})})]}),(0,t.jsxs)(n.Card,{children:[(0,t.jsxs)(n.CardHeader,{children:[(0,t.jsx)(n.CardTitle,{children:"مواعيد اليوم"}),(0,t.jsx)(d.Badge,{variant:"primary",children:u.filter(e=>"منتهي"!==e.status).length})]}),(0,t.jsx)(n.CardContent,{children:e?(0,t.jsx)(h,{}):0===u.length?(0,t.jsx)(c.EmptyState,{icon:s.HiOutlineCalendar,title:"لا توجد مواعيد اليوم",description:"لا توجد مواعيد مجدولة لليوم",bordered:!0}):(0,t.jsx)("div",{className:"space-y-3",children:u.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(s.HiOutlineCalendar,{className:"w-5 h-5 text-primary"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.studentName}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.type})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-sm text-text-secondary",children:e.time}),(0,t.jsx)(d.Badge,{variant:"جاري"===e.status?"success":"قادم"===e.status?"info":"default",size:"sm",children:e.status})]})]},e.id))})})]})]}),(0,t.jsxs)("div",{className:"text-center text-xs text-text-tertiary",children:["التحديث التلقائي كل 60 ثانية | آخر تحديث: ",f.toLocaleTimeString("ar-EG")]})]})}])}]);