(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:s}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",s),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(a.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:d=!1,pulse:l=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",a[i],s[o],n),children:[d&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",l&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:a,hover:s=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",a),children:e})},"CardContent",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",a),children:e})},"CardDescription",0,function({children:e,className:a}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",a),children:e})},"CardFooter",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",a),children:e})},"CardHeader",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",a),children:e})},"CardTitle",0,function({children:e,className:a}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",a),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:a,children:s,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),a&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:a})]}),s&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:s})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(46932),s=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:d,sparkline:l,color:c="primary",description:u,className:p}){let m=i[c],x=void 0===d?null:"number"==typeof d?{value:Math.abs(d),positive:d>=0}:{value:d.value,positive:d.isPositive};return(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",p),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",m.bg,m.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",m.text)})}),x&&(0,t.jsxs)(a.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(s.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(s.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(a.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",m.text),children:o}),u&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:u}),l&&l.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${l.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:m.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:m.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" "),fill:"none",stroke:m.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" ")} L${l.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,l=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?l(o,i):i+"{"+l(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=l(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=l.p?l.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let p=u(e),m=c[p]||(c[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!c[m]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(d," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);c[m]=l(s?{["@keyframes "+m]:t}:t,r?"":"."+m)}let x=r&&c.g;return r&&(c.g=c[m]),i=c[m],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}p.bind({g:1});let m,x,h,f=p.bind({k:1});function g(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let n=Object.assign({},i),d=n.className||s.className;r.p=Object.assign({theme:x&&x()},n),r.o=/go\d/.test(d),n.className=p.apply(r,a)+(d?" "+d:""),t&&(n.ref=o);let l=e;return e[0]&&(l=n.as||e,delete n.as),h&&l[0]&&h(n),m(l,n)}return t?t(s):s}}var b=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},k=(e,t=j)=>{$[t]=w($[t]||C,e),N.forEach(([e,r])=>{e===t&&r($[t])})},D=e=>Object.keys($).forEach(t=>k(e,t)),_=(e=j)=>t=>{k(t,e)},E={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return _(s.toasterId||(a=s.id,Object.keys($).find(e=>$[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},S=(e,t)=>O("blank")(e,t);S.error=O("error"),S.success=O("success"),S.loading=O("loading"),S.custom=O("custom"),S.dismiss=(e,t)=>{let r={type:3,toastId:e};t?_(t)(r):D(r)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let r={type:4,toastId:e};t?_(t)(r):D(r)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,r)=>{let a=S.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?b(t.success,e):void 0;return s?S.success(s,{id:a,...r,...null==r?void 0:r.success}):S.dismiss(a),e}).catch(e=>{let s=t.error?b(t.error,e):void 0;s?S.error(s,{id:a,...r,...null==r?void 0:r.error}):S.dismiss(a)}),e};var T=1e3,H=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,A=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${M} 0.15s ease-out forwards;
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
    animation: ${A} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,P=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,z=f`
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
}`,F=g("div")`
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
`,R=g("div")`
  position: absolute;
`,U=g("div")`
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
}`,G=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Y=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(G,null,t):t:"blank"===r?null:s.createElement(U,null,s.createElement(B,{...a}),"loading"!==r&&s.createElement(R,null,"error"===r?s.createElement(L,{...a}):s.createElement(F,{...a})))},Z=g("div")`
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
`,q=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,W=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(Y,{toast:e}),n=s.createElement(q,{...e.ariaProps},b(e.message,e));return s.createElement(Z,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});a=s.createElement,l.p=void 0,m=a,x=void 0,h=void 0;var X=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},J=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:n,containerClassName:d})=>{let{toasts:l,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)($[t]||C),i=(0,s.useRef)($[t]);(0,s.useEffect)(()=>(i.current!==$[t]&&a($[t]),N.push([t,a]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||E[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=T)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&S.dismiss(r.id);return}return setTimeout(()=>S.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,s.useCallback)(_(t),[t]),d=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),l=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,s.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),d=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[d+1]:[0,d]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:l,startPause:d,endPause:c,calculateOffset:u}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:d,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let o,n,d=r.position||t,l=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(o=d.includes("top"),n=d.includes("center")?{justifyContent:"center"}:d.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${l*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(X,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:u},"custom"===r.type?b(r.message,r):i?i(r):s.createElement(W,{toast:r,position:d}))}))},"default",0,S,"toast",0,S],5766)},41740,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Progress",0,function({value:e,className:a,size:s="md"}){return(0,t.jsx)("div",{className:(0,r.cn)("w-full bg-card/80 rounded-full overflow-hidden border border-border","sm"===s?"h-1.5":"h-2.5",a),children:(0,t.jsx)("div",{className:"h-full bg-primary rounded-full transition-all duration-500",style:{width:`${Math.min(100,Math.max(0,e))}%`}})})}])},55727,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(50719),i=e.i(9694),o=e.i(75225),n=e.i(85183),d=e.i(93230),l=e.i(72526),c=e.i(34239),u=e.i(31195),p=e.i(5766),m=e.i(37757),x=e.i(39964),h=e.i(96640),f=e.i(97591),g=e.i(41740),b=e.i(64753);let y=[{id:"i1",student:"أحمد محمد",total:5e3,paid:5e3,dueDate:"2026-06-01",status:"paid",transactions:[{id:"t1",date:"2026-05-15",amount:2500,method:"نقدي"},{id:"t2",date:"2026-06-01",amount:2500,method:"تحويل"}]},{id:"i2",student:"مريم أحمد",total:4e3,paid:2e3,dueDate:"2026-06-15",status:"overdue",transactions:[{id:"t3",date:"2026-05-20",amount:2e3,method:"نقدي"}]},{id:"i3",student:"يوسف علي",total:3e3,paid:3e3,dueDate:"2026-07-01",status:"paid",transactions:[{id:"t4",date:"2026-06-25",amount:1500,method:"بطاقة"},{id:"t5",date:"2026-07-01",amount:1500,method:"نقدي"}]},{id:"i4",student:"سارة خالد",total:6e3,paid:1500,dueDate:"2026-05-20",status:"overdue",transactions:[{id:"t6",date:"2026-05-10",amount:1500,method:"تحويل"}]},{id:"i5",student:"عمر حسن",total:2500,paid:0,dueDate:"2026-07-20",status:"pending",transactions:[]},{id:"i6",student:"ندى سامي",total:4500,paid:3500,dueDate:"2026-07-10",status:"partial",transactions:[{id:"t7",date:"2026-06-01",amount:2e3,method:"نقدي"},{id:"t8",date:"2026-06-20",amount:1500,method:"نقدي"}]},{id:"i7",student:"عبدالرحمن نور",total:3500,paid:3500,dueDate:"2026-06-10",status:"paid",transactions:[{id:"t9",date:"2026-05-30",amount:3500,method:"تحويل"}]},{id:"i8",student:"ليلى إبراهيم",total:5500,paid:1e3,dueDate:"2026-05-01",status:"overdue",transactions:[{id:"t10",date:"2026-04-15",amount:1e3,method:"نقدي"}]},{id:"i9",student:"محمد كريم",total:2e3,paid:500,dueDate:"2026-07-25",status:"pending",transactions:[{id:"t11",date:"2026-07-01",amount:500,method:"نقدي"}]},{id:"i10",student:"هند مصطفى",total:4e3,paid:4e3,dueDate:"2026-06-20",status:"paid",transactions:[{id:"t12",date:"2026-06-10",amount:2e3,method:"بطاقة"},{id:"t13",date:"2026-06-20",amount:2e3,method:"نقدي"}]},{id:"i11",student:"خالد سامي",total:3e3,paid:1500,dueDate:"2026-07-05",status:"overdue",transactions:[{id:"t14",date:"2026-06-15",amount:1500,method:"نقدي"}]}],v=[{month:"مايو",collected:18e3,target:2e4},{month:"يونيو",collected:22e3,target:25e3},{month:"يوليو",collected:15e3,target:18e3}],j={paid:{variant:"success",label:"مدفوع"},partial:{variant:"warning",label:"جزئي"},overdue:{variant:"error",label:"متأخر"},pending:{variant:"neutral",label:"معلق"}},w={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.04}}},N={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,C]=(0,r.useState)(""),[$,k]=(0,r.useState)("all"),[D,_]=(0,r.useState)(null),E=(0,r.useMemo)(()=>{let e=y.reduce((e,t)=>e+(t.total-t.paid),0),t=y.filter(e=>"overdue"===e.status).reduce((e,t)=>e+(t.total-t.paid),0);return{totalRemaining:e,overdue:t,collected:y.reduce((e,t)=>e+t.paid,0),rate:y.length>0?Math.round(y.filter(e=>"paid"===e.status).length/y.length*100):0}},[]),O=(0,r.useMemo)(()=>y.filter(t=>{let r=t.student.includes(e),a="all"===$||t.status===$;return r&&a}),[e,$]);return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(b.Breadcrumb,{items:[{label:"المدفوعات",href:"/teacher/payments/installments"},{label:"متابعة الأقساط",href:"/teacher/payments/installments/tracking"}]}),(0,t.jsx)(m.PageHeader,{title:"متابعة الأقساط",description:"المتبقي - المتأخر - الغرامات - سجل السداد"}),(0,t.jsx)("div",{className:"p-4 md:p-6 max-w-7xl mx-auto space-y-6",children:(0,t.jsxs)(a.motion.div,{variants:w,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsxs)(a.motion.div,{variants:N,className:"grid grid-cols-1 sm:grid-cols-4 gap-3",children:[(0,t.jsx)(f.StatsCard,{title:"إجمالي المتبقي",value:`${(E.totalRemaining/1e3).toFixed(1)} ألف`,icon:s.HiOutlineCurrencyDollar,color:"error"}),(0,t.jsx)(f.StatsCard,{title:"المتأخر",value:`${(E.overdue/1e3).toFixed(1)} ألف`,icon:s.HiOutlineExclamationCircle,color:"error"}),(0,t.jsx)(f.StatsCard,{title:"المحصل هذا الشهر",value:`${(E.collected/1e3).toFixed(1)} ألف`,icon:s.HiOutlineTrendingUp,color:"success"}),(0,t.jsx)(f.StatsCard,{title:"نسبة التحصيل",value:`${E.rate}%`,icon:s.HiOutlineCheckCircle,color:"primary"})]}),(0,t.jsxs)(a.motion.div,{variants:N,className:"flex flex-col sm:flex-row gap-3",children:[(0,t.jsxs)("div",{className:"flex-1 relative",children:[(0,t.jsx)(s.HiOutlineSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary"}),(0,t.jsx)("input",{value:e,onChange:e=>C(e.target.value),placeholder:"بحث باسم الطالب...",className:"w-full pr-10 pl-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"})]}),(0,t.jsxs)("select",{value:$,onChange:e=>k(e.target.value),className:"px-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30",children:[(0,t.jsx)("option",{value:"all",children:"كل الحالات"}),(0,t.jsx)("option",{value:"paid",children:"مدفوع"}),(0,t.jsx)("option",{value:"partial",children:"جزئي"}),(0,t.jsx)("option",{value:"overdue",children:"متأخر"}),(0,t.jsx)("option",{value:"pending",children:"معلق"})]})]}),(0,t.jsx)(a.motion.div,{variants:N,children:(0,t.jsxs)(x.Card,{children:[(0,t.jsx)(x.CardHeader,{children:(0,t.jsx)(x.CardTitle,{children:"الأقساط"})}),(0,t.jsx)(x.CardContent,{children:(0,t.jsx)("div",{className:"space-y-2",children:O.map(e=>{let r,i,o=j[e.status],n=e.total-e.paid,d="overdue"===e.status?(r=new Date(e.dueDate),(i=Math.floor((new Date().getTime()-r.getTime())/864e5))>0?10*i:0):0,l=D===e.id,c=Math.ceil((new Date(e.dueDate).getTime()-Date.now())/864e5);return(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{onClick:()=>_(l?null:e.id),className:"flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border hover:bg-surface-tertiary transition-all cursor-pointer",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlineChevronDown,{className:`w-4 h-4 text-text-tertiary transition-transform ${l?"rotate-180":""}`}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.student}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:["المتبقي: ",n.toLocaleString()," ج.م | يستحق: ",e.dueDate]})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[d>0&&(0,t.jsxs)("span",{className:"text-xs text-error font-medium",children:["غرامة: ",d," ج.م"]}),c<=3&&c>0&&(0,t.jsxs)("span",{className:"text-xs text-warning",children:["باقي ",c," أيام"]}),(0,t.jsx)(h.Badge,{variant:o.variant,children:o.label})]})]}),l&&(0,t.jsx)(a.motion.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},className:"overflow-hidden",children:(0,t.jsxs)("div",{className:"p-3 mr-4 space-y-3",children:[(0,t.jsxs)("div",{className:"grid grid-cols-3 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"p-2 rounded-lg bg-surface border border-border",children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"الإجمالي"}),(0,t.jsxs)("p",{className:"text-text font-bold",children:[e.total.toLocaleString()," ج.م"]})]}),(0,t.jsxs)("div",{className:"p-2 rounded-lg bg-surface border border-border",children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"المدفوع"}),(0,t.jsxs)("p",{className:"text-success font-bold",children:[e.paid.toLocaleString()," ج.م"]})]}),(0,t.jsxs)("div",{className:"p-2 rounded-lg bg-surface border border-border",children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"المتبقي"}),(0,t.jsxs)("p",{className:"text-error font-bold",children:[n.toLocaleString()," ج.م"]})]})]}),(0,t.jsx)(g.Progress,{value:Math.round(e.paid/e.total*100),size:"sm"}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("p",{className:"text-xs text-text-tertiary font-medium",children:"سجل السداد:"}),e.transactions.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-2 rounded-lg bg-surface border border-border text-xs",children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:e.date}),(0,t.jsxs)("span",{className:"text-text font-medium",children:[e.amount.toLocaleString()," ج.م"]}),(0,t.jsx)("span",{className:"text-text-tertiary",children:e.method})]},e.id)),0===e.transactions.length&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"لا توجد معاملات سداد بعد"})]}),(0,t.jsxs)("button",{type:"button",onClick:()=>p.default.success(`تم إرسال إشعار إلى ${e.student}`),className:"px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-dark transition-all flex items-center gap-1",children:[(0,t.jsx)(s.HiOutlineBell,{className:"w-3 h-3"})," إرسال إشعار"]})]})})]},e.id)})})})]})}),(0,t.jsx)(a.motion.div,{variants:N,children:(0,t.jsxs)(x.Card,{children:[(0,t.jsx)(x.CardHeader,{children:(0,t.jsx)(x.CardTitle,{children:"التحصيل الشهري"})}),(0,t.jsx)(x.CardContent,{children:(0,t.jsx)(u.ResponsiveContainer,{width:"100%",height:200,children:(0,t.jsxs)(i.BarChart,{data:v,children:[(0,t.jsx)(l.CartesianGrid,{strokeDasharray:"3 3",stroke:"var(--color-border)"}),(0,t.jsx)(n.XAxis,{dataKey:"month",tick:{fontSize:10,fill:"var(--color-text-secondary)"}}),(0,t.jsx)(d.YAxis,{tick:{fontSize:10,fill:"var(--color-text-secondary)"}}),(0,t.jsx)(c.Tooltip,{formatter:e=>`${(e/1e3).toFixed(1)} ألف`}),(0,t.jsx)(o.Bar,{dataKey:"collected",name:"المحصل",radius:[4,4,0,0],fill:"#10b981"}),(0,t.jsx)(o.Bar,{dataKey:"target",name:"المستهدف",radius:[4,4,0,0],fill:"#3b82f6"})]})})})]})})]})})]})}])}]);