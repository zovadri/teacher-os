(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},n={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},o=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:o,leftIcon:d,rightIcon:l,className:c,disabled:p,children:u,...m},x)=>(0,t.jsxs)("button",{ref:x,disabled:p||o,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],n[r],c),...m,children:[o?(0,t.jsx)(a.Spinner,{size:"sm"}):d,u,!o&&l]}));o.displayName="Button",e.s(["default",0,o])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:o,dot:d=!1,pulse:l=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[n],o),children:[d&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",l&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=s.HiOutlineInbox,action:n,className:o}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",o),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:n,icon:o,trend:d,sparkline:l,color:c="primary",description:p,className:u}){let m=i[c],x=void 0===d?null:"number"==typeof d?{value:Math.abs(d),positive:d>=0}:{value:d.value,positive:d.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",u),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",m.bg,m.border),children:o&&(0,t.jsx)(o,{className:(0,r.cn)("w-5 h-5",m.text)})}),x&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",m.text),children:n}),p&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:p}),l&&l.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${l.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:m.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:m.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" "),fill:"none",stroke:m.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" ")} L${l.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,l=(e,t)=>{let r="",s="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":s+="f"==i[1]?l(n,i):i+"{"+l(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=l(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=l.p?l.p(i,n):i+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function u(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let u=p(e),m=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!c[m]){let t=u!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?s.shift():t[3]?(r=t[3].replace(d," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(d," ").trim();return s[0]})(e);c[m]=l(a?{["@keyframes "+m]:t}:t,r?"":"."+m)}let x=r&&c.g;return r&&(c.g=c[m]),i=c[m],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),m})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}u.bind({g:1});let m,x,b,h=u.bind({k:1});function f(e,t){let r=this||{};return function(){let s=arguments;function a(i,n){let o=Object.assign({},i),d=o.className||a.className;r.p=Object.assign({theme:x&&x()},o),r.o=/go\d/.test(d),o.className=u.apply(r,s)+(d?" "+d:""),t&&(o.ref=n);let l=e;return e[0]&&(l=o.as||e,delete o.as),b&&l[0]&&b(o),m(l,o)}return t?t(a):a}}var y=(e,t)=>"function"==typeof e?e(t):e,g=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},_=(e,t=j)=>{C[t]=N(C[t]||k,e),w.forEach(([e,r])=>{e===t&&r(C[t])})},$=e=>Object.keys(C).forEach(t=>_(e,t)),E=(e=j)=>t=>{_(t,e)},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},T=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||g()}))(t,e,r);return E(a.toasterId||(s=a.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},O=(e,t)=>T("blank")(e,t);O.error=T("error"),O.success=T("success"),O.loading=T("loading"),O.custom=T("custom"),O.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):$(r)},O.dismissAll=e=>O.dismiss(void 0,e),O.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):$(r)},O.removeAll=e=>O.remove(void 0,e),O.promise=(e,t,r)=>{let s=O.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?y(t.success,e):void 0;return a?O.success(a,{id:s,...r,...null==r?void 0:r.success}):O.dismiss(s),e}).catch(e=>{let a=t.error?y(t.error,e):void 0;a?O.error(a,{id:s,...r,...null==r?void 0:r.error}):O.dismiss(s)}),e};var S=1e3,P=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,A=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,z=f("div")`
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
    animation: ${H} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=h`
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
  animation: ${M} 1s linear infinite;
`,L=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,R=h`
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

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,F=f("div")`
  position: absolute;
`,U=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,G=h`
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
`,Z=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(K,null,t):t:"blank"===r?null:a.createElement(U,null,a.createElement(I,{...s}),"loading"!==r&&a.createElement(F,null,"error"===r?a.createElement(z,{...s}):a.createElement(B,{...s})))},q=f("div")`
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
`,X=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(Z,{toast:e}),o=a.createElement(W,{...e.ariaProps},y(e.message,e));return a.createElement(q,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:n,message:o}):a.createElement(a.Fragment,null,n,o))});s=a.createElement,l.p=void 0,m=s,x=void 0,b=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let n=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:n,className:t,style:r},i)},J=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:n,containerStyle:o,containerClassName:d})=>{let{toasts:l,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(C[t]||k),i=(0,a.useRef)(C[t]);(0,a.useEffect)(()=>(i.current!==C[t]&&s(C[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=S)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&O.dismiss(r.id);return}return setTimeout(()=>O.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let o=(0,a.useCallback)(E(t),[t]),d=(0,a.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),l=(0,a.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,a.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),p=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),d=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[d+1]:[0,d]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:l,startPause:d,endPause:c,calculateOffset:p}}})(r,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:d,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let n,o,d=r.position||t,l=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),p=(n=d.includes("top"),o=d.includes("center")?{justifyContent:"center"}:d.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${l*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return a.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:p},"custom"===r.type?y(r.message,r):i?i(r):a.createElement(X,{toast:r,position:d}))}))},"default",0,O,"toast",0,O],5766)},47647,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Table",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("w-full overflow-auto",s),children:(0,t.jsx)("table",{className:"w-full border-collapse",children:e})})}])},38982,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["TabPanel",0,function({children:e,active:s,className:a}){return s?(0,t.jsx)("div",{className:(0,r.cn)("mt-4",a),children:e}):null},"Tabs",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)(s),children:e})}])},70716,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),a=e.i(5766),i=e.i(22016),n=e.i(50719),o=e.i(37757),d=e.i(39964),l=e.i(38982),c=e.i(97591),p=e.i(96640),u=e.i(47647),m=e.i(59544),x=e.i(81604),b=e.i(40803),h=e.i(75157);let f={completed:"success",pending:"warning",failed:"error",refunded:"info"},y={completed:"مكتمل",pending:"معلق",failed:"فاشل",refunded:"مسترجع"},g={cash:"نقداً",fawry:"فوري",code:"كود شحن"},v=[{id:"subscriptions",label:"الاشتراكات"},{id:"payments",label:"المدفوعات"},{id:"plans",label:"الباقات"}];e.s(["default",0,function(){let[e,j]=(0,r.useState)("subscriptions"),N=(0,r.useMemo)(()=>x.mockStudents.slice(0,20).map(e=>({id:e.id,studentName:e.name,planName:e.subscription.planName,startDate:e.subscription.startDate,endDate:e.subscription.endDate,daysRemaining:Math.max(0,Math.ceil((e.subscription.endDate.getTime()-Date.now())/864e5)),status:e.subscription.status,amount:"active"===e.subscription.status?[300,765,2700][["الشهرية","الثلاثية","السنوية"].indexOf(e.subscription.planName)]||300:0})),[]),w=(0,r.useMemo)(()=>({activeSubscriptions:N.filter(e=>"active"===e.status).length,expiredSubscriptions:N.filter(e=>"expired"===e.status).length,monthlyRevenue:x.mockPayments.filter(e=>"completed"===e.status).reduce((e,t)=>e+t.amount,0),pendingPayments:x.mockPayments.filter(e=>"pending"===e.status).length}),[N]);return(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(o.PageHeader,{title:"الاشتراكات والمدفوعات"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-4",children:[(0,t.jsx)(c.StatsCard,{title:"الاشتراكات النشطة",value:w.activeSubscriptions,icon:n.HiOutlineCheckCircle,color:"success"}),(0,t.jsx)(c.StatsCard,{title:"الاشتراكات المنتهية",value:w.expiredSubscriptions,icon:n.HiOutlineXCircle,color:"error"}),(0,t.jsx)(c.StatsCard,{title:"الإيرادات الشهرية",value:(0,h.formatCurrency)(w.monthlyRevenue),icon:n.HiOutlineCurrencyDollar,color:"primary"}),(0,t.jsx)(c.StatsCard,{title:"المدفوعات المعلقة",value:w.pendingPayments,icon:n.HiOutlineClock,color:"warning"})]}),(0,t.jsx)(l.Tabs,{tabs:v,defaultTab:"subscriptions",onChange:j,children:e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.TabPanel,{id:"subscriptions",activeTab:e,children:(0,t.jsx)(d.Card,{children:0===N.length?(0,t.jsx)(b.EmptyState,{icon:n.HiOutlineCreditCard,title:"لا يوجد اشتراكات",description:"لم يتم تسجيل أي اشتراكات بعد"}):(0,t.jsx)(u.Table,{columns:[{key:"studentName",header:"الطالب",render:e=>(0,t.jsx)(i.default,{href:`/teacher/students/${e.id}`,className:"text-primary hover:text-primary-dark transition-colors",children:e.studentName})},{key:"planName",header:"الباقة"},{key:"startDate",header:"تاريخ البداية",render:e=>(0,t.jsx)("span",{className:"text-sm text-text-secondary",children:e.startDate.toLocaleDateString("ar-EG")})},{key:"endDate",header:"تاريخ النهاية",render:e=>(0,t.jsx)("span",{className:"text-sm text-text-secondary",children:e.endDate.toLocaleDateString("ar-EG")})},{key:"daysRemaining",header:"الأيام المتبقية",render:e=>(0,t.jsxs)("span",{className:`font-medium ${e.daysRemaining<=7?"text-error":"text-text"}`,children:[e.daysRemaining," يوم"]})},{key:"status",header:"الحالة",render:e=>(0,t.jsx)(p.Badge,{variant:"active"===e.status?"success":"expired"===e.status?"error":"warning",children:"active"===e.status?"نشط":"expired"===e.status?"منتهي":"معلق"})},{key:"amount",header:"المبلغ",render:e=>(0,t.jsx)("span",{className:"font-medium",children:(0,h.formatCurrency)(e.amount)})},{key:"actions",header:"الإجراءات",render:e=>(0,t.jsxs)("div",{className:"flex items-center gap-2",children:["active"===e.status?(0,t.jsx)(m.default,{type:"button",size:"sm",variant:"danger",onClick:()=>{a.default.success("تم إلغاء الاشتراك بنجاح")},children:"إلغاء"}):(0,t.jsx)(m.default,{type:"button",size:"sm",variant:"success",onClick:()=>{a.default.success("تم تفعيل الاشتراك بنجاح")},children:"تفعيل"}),(0,t.jsx)(m.default,{type:"button",size:"sm",variant:"primary",onClick:()=>{a.default.success("تم ترقية الاشتراك بنجاح")},children:"ترقية"}),(0,t.jsx)(m.default,{type:"button",size:"sm",variant:"info",onClick:()=>{a.default.success("تم تجديد الاشتراك بنجاح")},children:"تجديد"})]})}],data:N})})}),(0,t.jsx)(l.TabPanel,{id:"payments",activeTab:e,children:(0,t.jsx)(d.Card,{children:(0,t.jsx)(u.Table,{columns:[{key:"studentName",header:"الطالب",render:e=>(0,t.jsx)(i.default,{href:`/teacher/students/${e.studentId}`,className:"text-primary hover:text-primary-dark transition-colors",children:e.studentName})},{key:"amount",header:"المبلغ",render:e=>(0,t.jsx)("span",{className:"font-medium",children:(0,h.formatCurrency)(e.amount)})},{key:"method",header:"طريقة الدفع",render:e=>(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(n.HiOutlineCash,{size:14,className:"text-text-tertiary"}),(0,t.jsx)("span",{children:g[e.method]||e.method})]})},{key:"status",header:"الحالة",render:e=>(0,t.jsx)(p.Badge,{variant:f[e.status],children:y[e.status]})},{key:"createdAt",header:"التاريخ",render:e=>(0,t.jsx)("span",{className:"text-sm text-text-secondary",children:e.createdAt.toLocaleDateString("ar-EG")})},{key:"transactionId",header:"رقم المعاملة",render:e=>(0,t.jsx)("span",{className:"text-xs font-mono text-text-tertiary",dir:"ltr",children:e.transactionId})},{key:"actions",header:"",render:e=>(0,t.jsx)(i.default,{href:`/teacher/subscriptions/payments/${e.id}`,className:"text-primary hover:text-primary-dark transition-colors text-sm",children:"عرض التفاصيل"})}],data:x.mockPayments.slice(0,20)})})}),(0,t.jsx)(l.TabPanel,{id:"plans",activeTab:e,children:(0,t.jsx)("div",{className:"grid md:grid-cols-3 gap-5",children:x.mockSubscriptionPlans.map((e,r)=>(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1*r},className:"relative p-6 rounded-2xl border-2 bg-surface border-border hover:shadow-lg hover:border-primary/30 transition-all",children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-text mb-1",children:e.name}),(0,t.jsx)("p",{className:"text-xs text-text-secondary mb-4",children:e.description}),(0,t.jsxs)("div",{className:"mb-4",children:[(0,t.jsx)("span",{className:"text-3xl font-bold text-text",children:e.price}),(0,t.jsxs)("span",{className:"text-text-secondary text-sm mr-1",children:["ج.ظ… / ",e.duration," ","month"===e.durationUnit?"شهر":"سنة"]})]}),(0,t.jsxs)("ul",{className:"space-y-2 mb-6",children:[(0,t.jsxs)("li",{className:"flex items-center gap-2 text-xs text-text-secondary",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-primary shrink-0"}),e.allCourses?"جميع الكورسات":`${e.coursesCount} كورسات`]}),(0,t.jsxs)("li",{className:"flex items-center gap-2 text-xs text-text-secondary",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-primary shrink-0"}),"دعم فني متواصل"]}),(0,t.jsxs)("li",{className:"flex items-center gap-2 text-xs text-text-secondary",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-primary shrink-0"}),"امتحانات وواجبات غير محدودة"]})]}),(0,t.jsx)("div",{className:"pt-4 border-t border-border space-y-2",children:(0,t.jsxs)("div",{className:"flex justify-between text-sm",children:[(0,t.jsx)("span",{className:"text-text-secondary",children:"السعر شهرياً"}),(0,t.jsxs)("span",{className:"font-bold text-text",children:[Math.round(e.price/e.duration)," ج.ظ…"]})]})})]},e.id))})})]})})]})}])}]);