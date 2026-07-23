(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},n=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:n,leftIcon:l,rightIcon:d,className:c,disabled:u,children:p,...x},m)=>(0,t.jsxs)("button",{ref:m,disabled:u||n,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],c),...x,children:[n?(0,t.jsx)(a.Spinner,{size:"sm"}):l,p,!n&&d]}));n.displayName="Button",e.s(["default",0,n])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},67073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(50719);let i=(0,r.forwardRef)(({label:e,error:r,options:i,placeholder:o,className:n,...l},d)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:d,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",n),...l,children:[o&&(0,t.jsx)("option",{value:"",children:o}),i.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(a.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));i.displayName="Select",e.s(["default",0,i])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=s.HiOutlineInbox,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:l,sparkline:d,color:c="primary",description:u,className:p}){let x=i[c],m=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",p),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",x.bg,x.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",x.text)})}),m&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",m.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[m.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),m.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",x.text),children:o}),u&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:u}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:x.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:x.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:x.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let p=u(e),x=c[p]||(c[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!c[x]){let t=p!==e?e:(e=>{let t,r,s=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);c[x]=d(a?{["@keyframes "+x]:t}:t,r?"":"."+x)}let m=r&&c.g;return r&&(c.g=c[x]),i=c[x],m?t.data=t.data.replace(m,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),x})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}p.bind({g:1});let x,m,b,h=p.bind({k:1});function f(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:m&&m()},n),r.o=/go\d/.test(l),n.className=p.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),x(d,n)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},S=(e,t=j)=>{k[t]=w(k[t]||C,e),N.forEach(([e,r])=>{e===t&&r(k[t])})},_=e=>Object.keys(k).forEach(t=>S(e,t)),E=(e=j)=>t=>{S(t,e)},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return E(a.toasterId||(s=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},H=(e,t)=>O("blank")(e,t);H.error=O("error"),H.success=O("success"),H.loading=O("loading"),H.custom=O("custom"),H.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):_(r)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):_(r)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,r)=>{let s=H.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?H.success(a,{id:s,...r,...null==r?void 0:r.success}):H.dismiss(s),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?H.error(a,{id:s,...r,...null==r?void 0:r.error}):H.dismiss(s)}),e};var D=1e3,T=h`
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
}`,I=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,P=f("div")`
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
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,z=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${z} 1s linear infinite;
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
}`,M=f("div")`
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
`,U=f("div")`
  position: absolute;
`,F=f("div")`
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
}`,W=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(W,null,t):t:"blank"===r?null:a.createElement(F,null,a.createElement(B,{...s}),"loading"!==r&&a.createElement(U,null,"error"===r?a.createElement(P,{...s}):a.createElement(M,{...s})))},Z=f("div")`
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
`,Q=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(K,{toast:e}),n=a.createElement(q,{...e.ariaProps},g(e.message,e));return a.createElement(Z,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});s=a.createElement,d.p=void 0,x=s,m=void 0,b=void 0;var X=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:o,className:t,style:r},i)},Y=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&s(k[t]),N.push([t,s]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=D)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&H.dismiss(r.id);return}return setTimeout(()=>H.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let n=(0,a.useCallback)(E(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}})(r,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,n,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),u=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return a.createElement(X,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Y:"",style:u},"custom"===r.type?g(r.message,r):i?i(r):a.createElement(Q,{toast:r,position:l}))}))},"default",0,H,"toast",0,H],5766)},7081,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(50719);let i=(0,r.forwardRef)(({value:e,onChange:i,placeholder:o="بحث...",className:n},l)=>{let[d,c]=(0,r.useState)(""),u=void 0!==e,p=u?e:d,x=e=>{u||c(e),i?.(e)};return(0,t.jsxs)("div",{className:(0,s.cn)("relative",n),children:[(0,t.jsx)(a.HiSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"}),(0,t.jsx)("input",{ref:l,value:p,onChange:e=>x(e.target.value),placeholder:o,className:"w-full bg-card border border-border rounded-[14px] pr-10 pl-9 py-2.5 text-sm text-text placeholder-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-200"}),p&&(0,t.jsx)("button",{onClick:()=>x(""),className:"absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text transition-colors",children:(0,t.jsx)(a.HiX,{className:"w-4 h-4"})})]})});i.displayName="SearchInput",e.s(["SearchInput",0,i])},88442,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["CardSkeleton",0,function({count:e=3}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-5 flex-1 bg-card/80 animate-pulse rounded-[8px]"})]}),(0,t.jsx)("div",{className:"h-4 w-3/4 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-1/2 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"Skeleton",0,function({className:e,variant:s="text"}){return(0,t.jsx)("div",{className:(0,r.cn)("animate-pulse bg-card/80","circular"===s&&"rounded-full","text"===s&&"h-4 rounded-[8px]","rectangular"===s&&"rounded-[14px]",e)})},"StatsSkeleton",0,function({count:e=4}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsx)("div",{className:"w-11 h-11 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-8 w-32 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"TableSkeleton",0,function({rows:e=5}){return(0,t.jsxs)("div",{className:"border border-border rounded-[16px] overflow-hidden",children:[(0,t.jsx)("div",{className:"bg-card/50 border-b border-border px-4 py-3",children:(0,t.jsx)("div",{className:"h-4 w-32 bg-card/80 animate-pulse rounded-[8px]"})}),Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"border-b border-border last:border-b-0 px-4 py-3 flex items-center gap-4",children:[(0,t.jsx)("div",{className:"h-4 flex-1 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-16 bg-card/80 animate-pulse rounded-[8px]"})]},r))]})}])},51312,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["ErrorState",0,function({title:e="حدث خطأ",description:a="حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",icon:i=s.HiOutlineExclamationCircle,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-error/10 border border-error/20 flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-error"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},13857,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(50719),a=e.i(5766),i=e.i(59544),o=e.i(39964),n=e.i(96640),l=e.i(97591),d=e.i(37757),c=e.i(7081),u=e.i(67073),p=e.i(40803),x=e.i(51312),m=e.i(88442),b=e.i(81604);function h({count:e=1}){return(0,t.jsx)("div",{className:"grid grid-cols-1 gap-6",children:Array.from({length:e},(e,r)=>(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4",children:[(0,t.jsx)(m.Skeleton,{className:"h-4 w-1/3"}),(0,t.jsx)(m.Skeleton,{className:"h-8 w-1/2"})]},r))})}e.s(["default",0,function(){let[e,f]=(0,r.useState)(!0),[g,y]=(0,r.useState)(null),[v,j]=(0,r.useState)(""),[w,N]=(0,r.useState)("all"),[C,k]=(0,r.useState)("all"),[S,_]=(0,r.useState)(null),[E,$]=(0,r.useState)(null),[O,H]=(0,r.useState)(!1),[D,T]=(0,r.useState)(new Date),A=b.mockWaitingQueueStats,I=(0,r.useCallback)(()=>{f(!0),y(null),setTimeout(()=>{f(!1),T(new Date)},500)},[]);(0,r.useEffect)(()=>{I()},[I]),(0,r.useEffect)(()=>{if(!O)return;let e=setInterval(()=>{let e=b.mockClassGroups.filter(e=>e.enrolledCount<e.capacity).length;e>0&&b.mockWaitingStudents.some(e=>"waiting"===e.status)&&a.default.success(`تم العثور على ${e} مقعد شاغر - جاري إخطار الطلاب المنتظرين`),T(new Date)},3e4);return()=>clearInterval(e)},[O]);let P=(0,r.useMemo)(()=>b.mockWaitingStudents.filter(e=>{let t=e.studentName.includes(v),r="all"===w||e.groupId===w,s="all"===C||e.status===C;return t&&r&&s}),[v,w,C]),z=async e=>{_(e),await new Promise(e=>setTimeout(e,800)),a.default.success("تم إرسال الإشعار للطالب بنجاح"),_(null)},B=async e=>{$(e),await new Promise(e=>setTimeout(e,1e3)),a.default.success("تم تسجيل الطالب في المجموعة"),$(null)};return g?(0,t.jsxs)("div",{className:"p-4 md:p-6",children:[(0,t.jsx)(d.PageHeader,{title:"إدارة قائمة الانتظار",description:"متابعة الطلاب المنتظرين وإدارة المقاعد الشاغرة"}),(0,t.jsx)(x.ErrorState,{description:g,onRetry:()=>{I()}})]}):(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(d.PageHeader,{title:"إدارة قائمة الانتظار",description:"متابعة الطلاب المنتظرين وإدارة المقاعد الشاغرة",actions:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(i.default,{type:"button",variant:O?"success":"outline",size:"sm",leftIcon:(0,t.jsx)(s.HiOutlineBell,{className:"w-4 h-4"}),onClick:()=>{H(!O),a.default.success(O?"تم إيقاف الإخطار التلقائي":"تم تفعيل الإخطار التلقائي كل 30 ثانية")},children:O?"الإخطار التلقائي مفعل":"تفعيل الإخطار التلقائي"}),(0,t.jsx)(i.default,{variant:"ghost",size:"sm",leftIcon:(0,t.jsx)(s.HiOutlineRefresh,{className:"w-4 h-4"}),onClick:I,children:"تحديث"})]})}),e?(0,t.jsx)(m.StatsSkeleton,{count:4}):(0,t.jsxs)("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-4",children:[(0,t.jsx)(l.StatsCard,{title:"إجمالي المنتظرين",value:A.totalWaiting,icon:s.HiOutlineUsers,color:"warning"}),(0,t.jsx)(l.StatsCard,{title:"متوسط أيام الانتظار",value:A.averageWaitDays,icon:s.HiOutlineClock,color:"info",subtitle:"يوم"}),(0,t.jsx)(l.StatsCard,{title:"تم الإخطار اليوم",value:A.notifiedToday,icon:s.HiOutlineBell,color:"primary"}),(0,t.jsx)(l.StatsCard,{title:"تم التسجيل اليوم",value:A.enrolledToday,icon:s.HiOutlineUserAdd,color:"success"})]}),e?(0,t.jsx)(h,{count:1}):(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"توزيع الطلاب حسب المجموعة"})}),(0,t.jsx)(o.CardContent,{children:(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:A.byGroup.map(e=>(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-surface-secondary border border-border text-center",children:[(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e.groupName}),(0,t.jsx)("p",{className:"text-2xl font-bold text-text",children:e.count}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1",children:"منتظر"})]},e.groupName))})})]}),(0,t.jsxs)(o.Card,{children:[(0,t.jsxs)(o.CardHeader,{children:[(0,t.jsx)(o.CardTitle,{children:"الطلاب المنتظرون"}),(0,t.jsx)(n.Badge,{variant:"warning",children:P.length})]}),(0,t.jsxs)(o.CardContent,{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex flex-col md:flex-row gap-3",children:[(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsx)(c.SearchInput,{value:v,onChange:j,placeholder:"بحث عن طالب..."})}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)(u.default,{options:[{value:"all",label:"جميع المجموعات"},...b.mockClassGroups.map(e=>({value:e.id,label:e.name}))],value:w,onChange:e=>N(e.target.value)}),(0,t.jsx)(u.default,{options:[{value:"all",label:"جميع الحالات"},{value:"waiting",label:"بانتظار"},{value:"offered",label:"تم العرض"},{value:"enrolled",label:"مسجل"},{value:"cancelled",label:"ملغي"}],value:C,onChange:e=>k(e.target.value)})]})]}),e?(0,t.jsx)(m.TableSkeleton,{rows:6,columns:6}):0===P.length?(0,t.jsx)(p.EmptyState,{icon:s.HiOutlineUsers,title:"لا يوجد طلاب في قائمة الانتظار",description:v||"all"!==w||"all"!==C?"لا توجد نتائج للتصفية":"قائمة الانتظار فارغة حالياً"}):(0,t.jsx)("div",{className:"overflow-x-auto rounded-xl border border-border",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"bg-surface-secondary border-b border-border",children:[(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"الطالب"}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"المجموعة"}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"تاريخ الانضمام"}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"الأولوية"}),(0,t.jsx)("th",{className:"text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"الحالة"}),(0,t.jsx)("th",{className:"text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",children:"الإجراءات"})]})}),(0,t.jsx)("tbody",{children:P.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors",children:[(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsx)("span",{className:"text-text font-medium",children:e.studentName})}),(0,t.jsx)("td",{className:"px-4 py-3 text-text-secondary",children:e.groupName}),(0,t.jsx)("td",{className:"px-4 py-3 text-text-secondary",children:e.joinedAt.toLocaleDateString("ar-EG")}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsx)(n.Badge,{variant:1===e.priority?"error":2===e.priority?"warning":"info",children:1===e.priority?"عالية":2===e.priority?"متوسطة":"منخفضة"})}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsx)(n.Badge,{variant:"waiting"===e.status?"warning":"offered"===e.status?"info":"enrolled"===e.status?"success":"error",children:"waiting"===e.status?"بانتظار":"offered"===e.status?"تم العرض":"enrolled"===e.status?"مسجل":"ملغي"})}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsxs)("div",{className:"flex items-center justify-center gap-2",children:[(0,t.jsx)(i.default,{type:"button",variant:e.notified?"secondary":"outline",size:"xs",leftIcon:S===e.id?(0,t.jsx)(s.HiOutlineRefresh,{className:"w-3.5 h-3.5 animate-spin"}):(0,t.jsx)(s.HiOutlineBell,{className:"w-3.5 h-3.5"}),onClick:()=>z(e.id),disabled:S===e.id,children:e.notified?"تم الإخطار":"إخطار"}),(0,t.jsx)(i.default,{type:"button",variant:"success",size:"xs",leftIcon:E===e.id?(0,t.jsx)(s.HiOutlineRefresh,{className:"w-3.5 h-3.5 animate-spin"}):(0,t.jsx)(s.HiOutlineCheckCircle,{className:"w-3.5 h-3.5"}),onClick:()=>B(e.id),disabled:E===e.id||"enrolled"===e.status,children:"enrolled"===e.status?"مسجل":"تسجيل"})]})})]},e.id))})]})})]})]}),(0,t.jsxs)("div",{className:"text-center text-xs text-text-tertiary",children:["آخر تحديث: ",D.toLocaleTimeString("ar-EG"),O&&" | الإخطار التلقائي نشط (كل 30 ثانية)"]})]})}])}]);