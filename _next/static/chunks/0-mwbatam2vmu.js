(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},n=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:n,leftIcon:l,rightIcon:c,className:d,disabled:x,children:u,...p},m)=>(0,t.jsxs)("button",{ref:m,disabled:x||n,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],d),...p,children:[n?(0,t.jsx)(a.Spinner,{size:"sm"}):l,u,!n&&c]}));n.displayName="Button",e.s(["default",0,n])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:c=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",c&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},67073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(50719);let i=(0,r.forwardRef)(({label:e,error:r,options:i,placeholder:o,className:n,...l},c)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:c,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",n),...l,children:[o&&(0,t.jsx)("option",{value:"",children:o}),i.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(a.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));i.displayName="Select",e.s(["default",0,i])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=s.HiOutlineInbox,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:l,sparkline:c,color:d="primary",description:x,className:u}){let p=i[d],m=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",u),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",p.bg,p.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",p.text)})}),m&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",m.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[m.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),m.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",p.text),children:o}),x&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:x}),c&&c.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${c.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${d}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:p.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:p.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:c.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...c)*28}`).join(" "),fill:"none",stroke:p.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${c.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...c)*28}`).join(" ")} L${c.length-1} 32 L0 32 Z`,fill:`url(#sg-${d}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},d={},x=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+x(e[r]);return t}return e};function u(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let u=x(e),p=d[u]||(d[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!d[p]){let t=u!==e?e:(e=>{let t,r,s=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);d[p]=c(a?{["@keyframes "+p]:t}:t,r?"":"."+p)}let m=r&&d.g;return r&&(d.g=d[p]),i=d[p],m?t.data=t.data.replace(m,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),p})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}u.bind({g:1});let p,m,f,h=u.bind({k:1});function b(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:m&&m()},n),r.o=/go\d/.test(l),n.className=u.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),f&&c[0]&&f(n),p(c,n)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},_=(e,t=j)=>{C[t]=N(C[t]||k,e),w.forEach(([e,r])=>{e===t&&r(C[t])})},$=e=>Object.keys(C).forEach(t=>_(e,t)),E=(e=j)=>t=>{_(t,e)},H={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return E(a.toasterId||(s=a.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},A=(e,t)=>O("blank")(e,t);A.error=O("error"),A.success=O("success"),A.loading=O("loading"),A.custom=O("custom"),A.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):$(r)},A.dismissAll=e=>A.dismiss(void 0,e),A.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):$(r)},A.removeAll=e=>A.remove(void 0,e),A.promise=(e,t,r)=>{let s=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?A.success(a,{id:s,...r,...null==r?void 0:r.success}):A.dismiss(s),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?A.error(a,{id:s,...r,...null==r?void 0:r.error}):A.dismiss(s)}),e};var S=1e3,D=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,I=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,M=b("div")`
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
    animation: ${z} 0.15s ease-out forwards;
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
`,T=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,P=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${T} 1s linear infinite;
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
}`,B=b("div")`
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
`,F=b("div")`
  position: absolute;
`,U=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Q=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,X=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(X,null,t):t:"blank"===r?null:a.createElement(U,null,a.createElement(P,{...s}),"loading"!==r&&a.createElement(F,null,"error"===r?a.createElement(M,{...s}):a.createElement(B,{...s})))},Z=b("div")`
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
`,q=b("div")`
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
`];return{animation:t?`${h(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(K,{toast:e}),n=a.createElement(q,{...e.ariaProps},g(e.message,e));return a.createElement(Z,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});s=a.createElement,c.p=void 0,p=s,m=void 0,f=void 0;var W=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:o,className:t,style:r},i)},Y=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(C[t]||k),i=(0,a.useRef)(C[t]);(0,a.useEffect)(()=>(i.current!==C[t]&&s(C[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||H[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=S)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&A.dismiss(r.id);return}return setTimeout(()=>A.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let n=(0,a.useCallback)(E(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,a.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),x=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:x}}})(r,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let o,n,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),x=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return a.createElement(W,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?Y:"",style:x},"custom"===r.type?g(r.message,r):i?i(r):a.createElement(G,{toast:r,position:l}))}))},"default",0,A,"toast",0,A],5766)},7081,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(50719);let i=(0,r.forwardRef)(({value:e,onChange:i,placeholder:o="بحث...",className:n},l)=>{let[c,d]=(0,r.useState)(""),x=void 0!==e,u=x?e:c,p=e=>{x||d(e),i?.(e)};return(0,t.jsxs)("div",{className:(0,s.cn)("relative",n),children:[(0,t.jsx)(a.HiSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"}),(0,t.jsx)("input",{ref:l,value:u,onChange:e=>p(e.target.value),placeholder:o,className:"w-full bg-card border border-border rounded-[14px] pr-10 pl-9 py-2.5 text-sm text-text placeholder-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-200"}),u&&(0,t.jsx)("button",{onClick:()=>p(""),className:"absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text transition-colors",children:(0,t.jsx)(a.HiX,{className:"w-4 h-4"})})]})});i.displayName="SearchInput",e.s(["SearchInput",0,i])},32098,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(46932),i=e.i(88653),o=e.i(50719);let n={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:l,title:c,children:d,className:x,size:u="md"}){let p=(0,r.useCallback)(e=>{"Escape"===e.key&&l()},[l]);return(0,r.useEffect)(()=>(e&&(document.addEventListener("keydown",p),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",p),document.body.style.overflow=""}),[e,p]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:l}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,s.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",n[u],x),children:[c&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:c}),(0,t.jsx)("button",{onClick:l,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(o.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,s.cn)("px-6 pb-6",!c&&"pt-6"),children:d})]})]})})}])},3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157);let a=(0,r.forwardRef)(({label:e,error:r,leftIcon:a,rightIcon:i,className:o,...n},l)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[a&&(0,t.jsx)("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none",children:a}),(0,t.jsx)("input",{ref:l,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50","shadow-[0_2px_8px_rgba(217,119,6,0.015),0_1px_0_rgba(255,255,255,0.9)_inset]","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",a&&"pr-10",i&&"pl-10",o),...n}),i&&(0,t.jsx)("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary",children:i})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));a.displayName="Input",e.s(["default",0,a])},47647,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Table",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("w-full overflow-auto",s),children:(0,t.jsx)("table",{className:"w-full border-collapse",children:e})})}])},61418,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);let a={success:s.HiCheckCircle,error:s.HiXCircle,info:s.HiInformationCircle,warning:s.HiExclamation},i={success:"bg-success/10 border-success/20 text-success",error:"bg-error/10 border-error/20 text-error",info:"bg-info/10 border-info/20 text-info",warning:"bg-warning/10 border-warning/20 text-warning"};e.s(["Alert",0,function({children:e,variant:s="info",className:o}){let n=a[s];return(0,t.jsxs)("div",{className:(0,r.cn)("flex items-start gap-3 px-4 py-3 rounded-[14px] border ",i[s],o),children:[(0,t.jsx)(n,{className:"w-5 h-5 shrink-0 mt-0.5"}),(0,t.jsx)("div",{className:"flex-1 text-sm",children:e})]})}])},19993,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(50719),a=e.i(37757),i=e.i(39964),o=e.i(96640),n=e.i(47647),l=e.i(32098),c=e.i(97591),d=e.i(7081),x=e.i(59544),u=e.i(3812),p=e.i(67073),m=e.i(61418),f=e.i(81604),h=e.i(40803),b=e.i(75157),g=e.i(5766),y=e.i(22016);let v={active:"success",revoked:"error"},j={active:"نشطة",revoked:"ملغاة"};e.s(["default",0,function(){let[e,N]=(0,r.useState)(""),[w,k]=(0,r.useState)("all"),[C,_]=(0,r.useState)(!1),$=(0,r.useMemo)(()=>({total:f.mockCertificates.length,active:f.mockCertificates.filter(e=>"active"===e.status).length,revoked:f.mockCertificates.filter(e=>"revoked"===e.status).length}),[]),E=(0,r.useMemo)(()=>{let e=new Map;return f.mockCertificates.forEach(t=>{let r=e.get(t.courseName)||{count:0,active:0,revoked:0};r.count++,"active"===t.status?r.active++:r.revoked++,e.set(t.courseName,r)}),Array.from(e.entries())},[]),H=(0,r.useMemo)(()=>f.mockCertificates.filter(t=>{let r=t.studentName.includes(e)||t.certificateNumber.includes(e)||t.courseName.includes(e),s="all"===w||t.status===w;return r&&s}),[e,w]);return(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(a.PageHeader,{title:"الشهادات",description:"إدارة شهادات إتمام الكورسات"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-4",children:[(0,t.jsx)(c.StatsCard,{title:"إجمالي الشهادات",value:$.total,icon:s.HiOutlineBadgeCheck,color:"primary"}),(0,t.jsx)(c.StatsCard,{title:"الشهادات النشطة",value:$.active,icon:s.HiOutlineCheckCircle,color:"success"}),(0,t.jsx)(c.StatsCard,{title:"الشهادات الملغاة",value:$.revoked,icon:s.HiOutlineXCircle,color:"error"}),(0,t.jsx)(c.StatsCard,{title:"نسبة الإصدار",value:`${Math.round($.active/$.total*100)}%`,icon:s.HiOutlineAcademicCap,color:"info"})]}),(0,t.jsxs)("div",{className:"flex flex-col md:flex-row gap-3 items-start md:items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex flex-1 gap-3 w-full",children:[(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsx)(d.SearchInput,{value:e,onChange:N,placeholder:"بحث باسم الطالب أو رقم الشهادة أو الكورس..."})}),(0,t.jsxs)("select",{value:w,onChange:e=>k(e.target.value),className:"px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer",children:[(0,t.jsx)("option",{value:"all",children:"جميع الحالات"}),(0,t.jsx)("option",{value:"active",children:"نشطة"}),(0,t.jsx)("option",{value:"revoked",children:"ملغاة"})]})]}),(0,t.jsx)(x.default,{leftIcon:(0,t.jsx)(s.HiOutlinePlus,{className:"w-4 h-4"}),onClick:()=>_(!0),children:"إصدار شهادة"})]}),0===H.length?(0,t.jsx)(h.EmptyState,{icon:s.HiOutlineDocumentText,title:"لا يوجد شهادات",description:"لم يتم إصدار أي شهادات بعد"}):(0,t.jsx)(n.Table,{columns:[{key:"studentName",header:"اسم الطالب",render:e=>(0,t.jsx)(y.default,{href:`/teacher/students/${e.studentId}`,className:"text-sm font-medium text-text hover:text-primary transition-colors",children:e.studentName})},{key:"courseName",header:"الكورس",render:e=>(0,t.jsx)(y.default,{href:`/teacher/courses/${e.courseId}`,className:"text-text hover:text-primary transition-colors",children:e.courseName})},{key:"grade",header:"الدرجة",render:e=>(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:`text-sm font-bold ${e.grade>=90?"text-success":e.grade>=70?"text-warning":"text-error"}`,children:e.grade}),(0,t.jsxs)("span",{className:"text-text-tertiary text-xs",children:["(",e.percentage,"%)"]})]})},{key:"issuedAt",header:"تاريخ الإصدار",render:e=>(0,t.jsx)("span",{className:"text-sm text-text-secondary",children:(0,b.formatDate)(e.issuedAt)})},{key:"certificateNumber",header:"رقم الشهادة",render:e=>(0,t.jsx)("span",{className:"font-mono text-xs text-text-tertiary",dir:"ltr",children:e.certificateNumber})},{key:"status",header:"الحالة",render:e=>(0,t.jsx)(o.Badge,{variant:v[e.status],children:j[e.status]})},{key:"actions",header:"",render:e=>(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)("button",{type:"button",onClick:()=>g.default.success("جاري تجهيز الطباعة..."),className:"p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors",title:"طباعة",children:(0,t.jsx)(s.HiOutlinePrinter,{size:16})}),(0,t.jsx)("button",{type:"button",onClick:()=>g.default.success("جاري تحميل الشهادة..."),className:"p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors",title:"تحميل",children:(0,t.jsx)(s.HiOutlineDownload,{size:16})}),(0,t.jsx)("button",{type:"button",onClick:()=>g.default.success("تم إنشاء رمز QR"),className:"p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors",title:"QR",children:(0,t.jsx)(s.HiOutlineQrcode,{size:16})}),"active"===e.status&&(0,t.jsx)("button",{type:"button",onClick:()=>g.default.success("تم إلغاء الشهادة بنجاح"),className:"p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors",title:"إلغاء الشهادة",children:(0,t.jsx)(s.HiOutlineTrash,{size:16})})]})}],data:H}),(0,t.jsxs)(i.Card,{children:[(0,t.jsx)(i.CardHeader,{children:(0,t.jsx)(i.CardTitle,{children:"الشهادات حسب الكورس"})}),(0,t.jsx)(i.CardContent,{children:(0,t.jsx)("div",{className:"space-y-2",children:E.map(([e,r])=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsx)("div",{className:"min-w-0 flex-1",children:(0,t.jsx)("p",{className:"text-sm text-text truncate",children:e})}),(0,t.jsxs)("div",{className:"flex items-center gap-4 shrink-0 mr-3",children:[(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("p",{className:"text-sm font-bold text-success",children:r.active}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"نشطة"})]}),(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("p",{className:"text-sm font-bold text-error",children:r.revoked}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"ملغاة"})]}),(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("p",{className:"text-sm font-bold text-text",children:r.count}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"إجمالي"})]})]})]},e))})})]}),(0,t.jsxs)(i.Card,{children:[(0,t.jsxs)(i.CardHeader,{children:[(0,t.jsx)(i.CardTitle,{children:"نظرة عامة على الشهادات"}),(0,t.jsx)(o.Badge,{variant:"primary",size:"sm",children:"آخر 6 أشهر"})]}),(0,t.jsxs)(i.CardContent,{children:[(0,t.jsx)("div",{className:"flex items-end gap-3 h-40",children:Array.from({length:6},(e,r)=>{let s=20+Math.floor(60*(0,b.det)()),a=Math.floor(15*(0,b.det)());return(0,t.jsxs)("div",{className:"flex-1 flex flex-col items-center justify-end gap-1",children:[(0,t.jsx)("div",{className:"w-full rounded-t-md bg-error/40 transition-all",style:{height:`${a}%`},title:"ملغاة"}),(0,t.jsx)("div",{className:"w-full rounded-t-md bg-primary transition-all",style:{height:`${s}%`},title:"نشطة"}),(0,t.jsx)("span",{className:"text-xs text-text-tertiary mt-1",children:["يناير","فبراير","مارس","إبريل","مايو","يونيو"][r]})]},r)})}),(0,t.jsxs)("div",{className:"flex items-center justify-center gap-6 mt-4 text-xs text-text-secondary",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)("span",{className:"w-3 h-3 rounded-sm bg-primary"}),(0,t.jsx)("span",{children:"نشطة"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)("span",{className:"w-3 h-3 rounded-sm bg-error/40"}),(0,t.jsx)("span",{children:"ملغاة"})]})]})]})]}),(0,t.jsx)(l.Modal,{isOpen:C,onClose:()=>_(!1),title:"إصدار شهادة جديدة",subtitle:"اختر الطالب والكورس لإصدار شهادة إتمام",size:"lg",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)(p.default,{label:"الطالب",options:f.mockStudents.slice(0,30).map(e=>({value:e.id,label:e.name})),placeholder:"اختر الطالب"}),(0,t.jsx)(p.default,{label:"الكورس",options:f.mockCourses.map(e=>({value:e.id,label:e.title})),placeholder:"اختر الكورس"}),(0,t.jsx)(u.default,{label:"الدرجة النهائية",type:"number",placeholder:"درجة الطالب"}),(0,t.jsx)(u.default,{label:"نسبة الإنجاز",type:"number",placeholder:"نسبة الإنجاز %"}),(0,t.jsx)(m.Alert,{variant:"info",children:"سيتم إنشاء رقم شهادة فريد ورمز QR تلقائياً"}),(0,t.jsxs)("div",{className:"pt-4 flex gap-3",children:[(0,t.jsx)(x.default,{variant:"primary",size:"lg",className:"flex-1",onClick:()=>{g.default.success("تم إصدار الشهادة بنجاح"),_(!1)},children:"إصدار الشهادة"}),(0,t.jsx)(x.default,{variant:"secondary",size:"lg",onClick:()=>_(!1),children:"إلغاء"})]})]})})]})}])}]);