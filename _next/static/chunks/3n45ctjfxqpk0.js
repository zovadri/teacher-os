(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:l,dot:n=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[o],l),children:[n&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function x(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let x=u(e),p=c[x]||(c[x]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(x));if(!c[p]){let t=x!==e?e:(e=>{let t,r,s=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(r=t[3].replace(n," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(n," ").trim();return s[0]})(e);c[p]=d(a?{["@keyframes "+p]:t}:t,r?"":"."+p)}let m=r&&c.g;return r&&(c.g=c[p]),i=c[p],m?t.data=t.data.replace(m,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),p})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}x.bind({g:1});let p,m,f,b=x.bind({k:1});function h(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let l=Object.assign({},i),n=l.className||a.className;r.p=Object.assign({theme:m&&m()},l),r.o=/go\d/.test(n),l.className=x.apply(r,s)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),f&&d[0]&&f(l),p(d,l)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},_=(e,t=j)=>{C[t]=w(C[t]||k,e),N.forEach(([e,r])=>{e===t&&r(C[t])})},E=e=>Object.keys(C).forEach(t=>_(e,t)),$=(e=j)=>t=>{_(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return $(a.toasterId||(s=a.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},H=(e,t)=>S("blank")(e,t);H.error=S("error"),H.success=S("success"),H.loading=S("loading"),H.custom=S("custom"),H.dismiss=(e,t)=>{let r={type:3,toastId:e};t?$(t)(r):E(r)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let r={type:4,toastId:e};t?$(t)(r):E(r)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,r)=>{let s=H.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?H.success(a,{id:s,...r,...null==r?void 0:r.success}):H.dismiss(s),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?H.error(a,{id:s,...r,...null==r?void 0:r.error}):H.dismiss(s)}),e};var L=1e3,D=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,I=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,A=h("div")`
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
    animation: ${I} 0.15s ease-out forwards;
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
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,P=h("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,T=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,V=b`
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

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${V} 0.2s ease-out forwards;
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
`,F=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=h("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${F} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(G,null,t):t:"blank"===r?null:a.createElement(U,null,a.createElement(P,{...s}),"loading"!==r&&a.createElement(R,null,"error"===r?a.createElement(A,{...s}):a.createElement(B,{...s})))},X=h("div")`
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
`,q=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(K,{toast:e}),l=a.createElement(Z,{...e.ariaProps},g(e.message,e));return a.createElement(X,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:o,message:l}):a.createElement(a.Fragment,null,o,l))});s=a.createElement,d.p=void 0,p=s,m=void 0,f=void 0;var W=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:o,className:t,style:r},i)},Y=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(C[t]||k),i=(0,a.useRef)(C[t]);(0,a.useEffect)(()=>(i.current!==C[t]&&s(C[t]),N.push([t,s]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=L)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&H.dismiss(r.id);return}return setTimeout(()=>H.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let l=(0,a.useCallback)($(t),[t]),n=(0,a.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,a.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,a.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<l&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}})(r,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,l,n=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),u=(o=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...l});return a.createElement(W,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Y:"",style:u},"custom"===r.type?g(r.message,r):i?i(r):a.createElement(q,{toast:r,position:n}))}))},"default",0,H,"toast",0,H],5766)},7081,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(50719);let i=(0,r.forwardRef)(({value:e,onChange:i,placeholder:o="بحث...",className:l},n)=>{let[d,c]=(0,r.useState)(""),u=void 0!==e,x=u?e:d,p=e=>{u||c(e),i?.(e)};return(0,t.jsxs)("div",{className:(0,s.cn)("relative",l),children:[(0,t.jsx)(a.HiSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"}),(0,t.jsx)("input",{ref:n,value:x,onChange:e=>p(e.target.value),placeholder:o,className:"w-full bg-card border border-border rounded-[14px] pr-10 pl-9 py-2.5 text-sm text-text placeholder-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-200"}),x&&(0,t.jsx)("button",{onClick:()=>p(""),className:"absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text transition-colors",children:(0,t.jsx)(a.HiX,{className:"w-4 h-4"})})]})});i.displayName="SearchInput",e.s(["SearchInput",0,i])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:l,trend:n,sparkline:d,color:c="primary",description:u,className:x}){let p=i[c],m=void 0===n?null:"number"==typeof n?{value:Math.abs(n),positive:n>=0}:{value:n.value,positive:n.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",x),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",p.bg,p.border),children:l&&(0,t.jsx)(l,{className:(0,r.cn)("w-5 h-5",p.text)})}),m&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",m.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[m.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),m.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",p.text),children:o}),u&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:u}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:p.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:p.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:p.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},l=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:l,leftIcon:n,rightIcon:d,className:c,disabled:u,children:x,...p},m)=>(0,t.jsxs)("button",{ref:m,disabled:u||l,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],c),...p,children:[l?(0,t.jsx)(a.Spinner,{size:"sm"}):n,x,!l&&d]}));l.displayName="Button",e.s(["default",0,l])},67073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(50719);let i=(0,r.forwardRef)(({label:e,error:r,options:i,placeholder:o,className:l,...n},d)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:d,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",l),...n,children:[o&&(0,t.jsx)("option",{value:"",children:o}),i.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(a.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));i.displayName="Select",e.s(["default",0,i])},32098,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(46932),i=e.i(88653),o=e.i(50719);let l={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:n,title:d,children:c,className:u,size:x="md"}){let p=(0,r.useCallback)(e=>{"Escape"===e.key&&n()},[n]);return(0,r.useEffect)(()=>(e&&(document.addEventListener("keydown",p),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",p),document.body.style.overflow=""}),[e,p]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:n}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,s.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",l[x],u),children:[d&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:d}),(0,t.jsx)("button",{onClick:n,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(o.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,s.cn)("px-6 pb-6",!d&&"pt-6"),children:c})]})]})})}])},3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157);let a=(0,r.forwardRef)(({label:e,error:r,leftIcon:a,rightIcon:i,className:o,...l},n)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[a&&(0,t.jsx)("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none",children:a}),(0,t.jsx)("input",{ref:n,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50","shadow-[0_2px_8px_rgba(217,119,6,0.015),0_1px_0_rgba(255,255,255,0.9)_inset]","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",a&&"pr-10",i&&"pl-10",o),...l}),i&&(0,t.jsx)("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary",children:i})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));a.displayName="Input",e.s(["default",0,a])},3649,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157);let a=(0,r.forwardRef)(({label:e,error:r,className:a,...i},o)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsx)("textarea",{ref:o,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50 min-h-[100px] resize-y","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",a),...i}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));a.displayName="Textarea",e.s(["default",0,a])},98936,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),a=e.i(50719),i=e.i(37757),o=e.i(96640),l=e.i(32098),n=e.i(97591),d=e.i(7081),c=e.i(59544),u=e.i(3812),x=e.i(67073),p=e.i(3649),m=e.i(81604),f=e.i(75157),b=e.i(5766),h=e.i(22016);let g={ready:{label:"جاهز",variant:"success"},processing:{label:"قيد المعالجة",variant:"warning"},failed:{label:"فاشل",variant:"error"}};e.s(["default",0,function(){let[e,y]=(0,r.useState)(""),[v,j]=(0,r.useState)("all"),[w,N]=(0,r.useState)("all"),[k,C]=(0,r.useState)("grid"),[_,E]=(0,r.useState)(!1),$=(0,r.useMemo)(()=>({total:m.mockVideoLibrary.length,ready:m.mockVideoLibrary.filter(e=>"ready"===e.status).length,processing:m.mockVideoLibrary.filter(e=>"processing"===e.status).length,failed:m.mockVideoLibrary.filter(e=>"failed"===e.status).length,totalViews:m.mockVideoLibrary.reduce((e,t)=>e+t.views,0)}),[]),O=(0,r.useMemo)(()=>m.mockVideoLibrary.filter(t=>{let r=t.title.includes(e)||t.courseName.includes(e),s="all"===v||t.courseId===v,a="all"===w||t.status===w;return r&&s&&a}),[e,v,w]);return(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(i.PageHeader,{title:"مكتبة الملفات",description:"إدارة الفيديوهات والملفات التعليمية"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-4",children:[(0,t.jsx)(n.StatsCard,{title:"إجمالي الفيديوهات",value:$.total,icon:a.HiOutlineFilm,color:"primary"}),(0,t.jsx)(n.StatsCard,{title:"جاهزة",value:$.ready,icon:a.HiOutlineCheckCircle,color:"success"}),(0,t.jsx)(n.StatsCard,{title:"قيد المعالجة",value:$.processing,icon:a.HiOutlineServer,color:"warning"}),(0,t.jsx)(n.StatsCard,{title:"إجمالي المشاهدات",value:$.totalViews.toLocaleString("ar-EG"),icon:a.HiOutlineEye,color:"info"})]}),(0,t.jsxs)("div",{className:"flex flex-col md:flex-row gap-3 items-start md:items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex flex-1 flex-wrap gap-3 w-full",children:[(0,t.jsx)("div",{className:"flex-1 min-w-[200px]",children:(0,t.jsx)(d.SearchInput,{value:e,onChange:y,placeholder:"بحث في الفيديوهات..."})}),(0,t.jsxs)("select",{value:v,onChange:e=>j(e.target.value),className:"px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer",children:[(0,t.jsx)("option",{value:"all",children:"جميع الكورسات"}),m.mockCourses.map(e=>(0,t.jsx)("option",{value:e.id,children:e.title},e.id))]}),(0,t.jsxs)("select",{value:w,onChange:e=>N(e.target.value),className:"px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer",children:[(0,t.jsx)("option",{value:"all",children:"جميع الحالات"}),(0,t.jsx)("option",{value:"ready",children:"جاهز"}),(0,t.jsx)("option",{value:"processing",children:"قيد المعالجة"}),(0,t.jsx)("option",{value:"failed",children:"فاشل"})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex items-center bg-surface border border-border rounded-xl p-1",children:[(0,t.jsx)("button",{type:"button",onClick:()=>C("grid"),className:(0,f.cn)("p-1.5 rounded-lg transition-colors","grid"===k?"bg-primary text-white":"text-text-tertiary hover:text-text"),children:(0,t.jsx)(a.HiOutlineViewGrid,{className:"w-4 h-4"})}),(0,t.jsx)("button",{type:"button",onClick:()=>C("list"),className:(0,f.cn)("p-1.5 rounded-lg transition-colors","list"===k?"bg-primary text-white":"text-text-tertiary hover:text-text"),children:(0,t.jsx)(a.HiOutlineViewList,{className:"w-4 h-4"})})]}),(0,t.jsx)(c.default,{leftIcon:(0,t.jsx)(a.HiOutlineUpload,{className:"w-4 h-4"}),onClick:()=>E(!0),children:"رفع فيديو"})]})]}),"grid"===k?(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",children:O.map(e=>(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"group bg-surface border border-border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",children:[(0,t.jsxs)("div",{className:"relative aspect-video bg-surface-secondary overflow-hidden",children:[(0,t.jsx)("img",{src:e.thumbnail,alt:e.title,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",children:(0,t.jsx)("div",{className:"w-12 h-12 rounded-full bg-white/90 flex items-center justify-center",children:(0,t.jsx)(a.HiOutlinePlay,{className:"w-6 h-6 text-primary"})})}),(0,t.jsxs)("div",{className:"absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 text-white text-xs",children:[(0,t.jsx)(a.HiOutlineClock,{className:"w-3 h-3"}),(0,t.jsxs)("span",{children:[e.duration," دقيقة"]})]}),(0,t.jsx)("div",{className:"absolute top-2 left-2",children:(0,t.jsx)(o.Badge,{variant:g[e.status].variant,size:"sm",children:g[e.status].label})})]}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsx)("h3",{className:"text-sm font-medium text-text truncate mb-1",children:e.title}),(0,t.jsx)(h.default,{href:`/teacher/courses/${e.courseId}`,className:"text-xs text-text-tertiary truncate mb-2 hover:text-primary transition-colors block",children:e.courseName}),(0,t.jsxs)("div",{className:"flex items-center justify-between text-xs text-text-tertiary",children:[(0,t.jsx)("span",{children:(0,f.formatDate)(e.uploadDate)}),(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)(a.HiOutlineEye,{className:"w-3 h-3"}),(0,t.jsx)("span",{children:e.views.toLocaleString("ar-EG")})]})]})]})]},e.id))}):(0,t.jsx)("div",{className:"space-y-2",children:O.map(e=>(0,t.jsxs)("div",{className:"flex items-center gap-4 p-3 bg-surface border border-border rounded-xl hover:shadow-sm transition-shadow",children:[(0,t.jsx)("div",{className:"w-24 h-16 rounded-lg bg-surface-secondary overflow-hidden shrink-0",children:(0,t.jsx)("img",{src:e.thumbnail,alt:e.title,className:"w-full h-full object-cover"})}),(0,t.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text truncate",children:e.title}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary truncate",children:[(0,t.jsx)(h.default,{href:`/teacher/courses/${e.courseId}`,className:"hover:text-primary transition-colors",children:e.courseName})," · ",e.resolution," · ",e.format]})]}),(0,t.jsxs)("div",{className:"text-xs text-text-tertiary shrink-0",children:[e.duration," د"]}),(0,t.jsx)(o.Badge,{variant:g[e.status].variant,size:"sm",children:g[e.status].label}),(0,t.jsxs)("div",{className:"flex items-center gap-1 text-xs text-text-tertiary shrink-0",children:[(0,t.jsx)(a.HiOutlineEye,{className:"w-3 h-3"}),(0,t.jsx)("span",{children:e.views})]})]},e.id))}),(0,t.jsx)(l.Modal,{isOpen:_,onClose:()=>E(!1),title:"رفع فيديو جديد",subtitle:"أدخل بيانات الفيديو واختر الملف",size:"lg",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)(u.default,{label:"عنوان الفيديو",placeholder:"أدخل عنوان الفيديو"}),(0,t.jsx)(p.default,{label:"الوصف",placeholder:"وصف الفيديو مع تفاصيل المحتوى",rows:3}),(0,t.jsx)(x.default,{label:"الكورس",options:m.mockCourses.map(e=>({value:e.id,label:e.title})),placeholder:"اختر الكورس"}),(0,t.jsx)(x.default,{label:"الفصل",options:[{value:"ch-1",label:"المقدمة"},{value:"ch-2",label:"الأساسيات"},{value:"ch-3",label:"المستوى المتقدم"}],placeholder:"اختر الفصل (اختياري)"}),(0,t.jsx)("div",{className:"flex items-center justify-center p-8 rounded-xl border-2 border-dashed border-border bg-surface-secondary cursor-pointer hover:border-primary/50 transition-colors",children:(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)(a.HiOutlineUpload,{className:"w-8 h-8 mx-auto text-text-tertiary mb-2"}),(0,t.jsx)("p",{className:"text-sm text-text-secondary",children:"اسحب وأفلت الفيديو هنا أو اضغط للاختيار"}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1",children:"MP4, AVI, MKV - حد أقصى 500MB"})]})}),(0,t.jsxs)("div",{className:"pt-4 flex gap-3",children:[(0,t.jsx)(c.default,{variant:"primary",size:"lg",className:"flex-1",onClick:()=>{b.default.success("جاري رفع الفيديو..."),E(!1)},children:"رفع الفيديو"}),(0,t.jsx)(c.default,{variant:"secondary",size:"lg",onClick:()=>E(!1),children:"إلغاء"})]})]})})]})}])}]);