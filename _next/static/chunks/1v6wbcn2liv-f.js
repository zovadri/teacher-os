(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32098,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(46932),i=e.i(88653),n=e.i(50719);let o={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:l,title:d,children:c,className:m,size:u="md"}){let x=(0,r.useCallback)(e=>{"Escape"===e.key&&l()},[l]);return(0,r.useEffect)(()=>(e&&(document.addEventListener("keydown",x),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",x),document.body.style.overflow=""}),[e,x]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:l}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,s.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",o[u],m),children:[d&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:d}),(0,t.jsx)("button",{onClick:l,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(n.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,s.cn)("px-6 pb-6",!d&&"pt-6"),children:c})]})]})})}])},41740,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Progress",0,function({value:e,className:s,size:a="md"}){return(0,t.jsx)("div",{className:(0,r.cn)("w-full bg-card/80 rounded-full overflow-hidden border border-border","sm"===a?"h-1.5":"h-2.5",s),children:(0,t.jsx)("div",{className:"h-full bg-primary rounded-full transition-all duration-500",style:{width:`${Math.min(100,Math.max(0,e))}%`}})})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:n,icon:o,trend:l,sparkline:d,color:c="primary",description:m,className:u}){let x=i[c],p=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",u),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",x.bg,x.border),children:o&&(0,t.jsx)(o,{className:(0,r.cn)("w-5 h-5",x.text)})}),p&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",p.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[p.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),p.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",x.text),children:n}),m&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:m}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:x.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:x.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:x.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":s+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,n):i+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e};function u(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let u=m(e),x=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!c[x]){let t=u!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);c[x]=d(a?{["@keyframes "+x]:t}:t,r?"":"."+x)}let p=r&&c.g;return r&&(c.g=c[x]),i=c[x],p?t.data=t.data.replace(p,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),x})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}u.bind({g:1});let x,p,b,f=u.bind({k:1});function h(e,t){let r=this||{};return function(){let s=arguments;function a(i,n){let o=Object.assign({},i),l=o.className||a.className;r.p=Object.assign({theme:p&&p()},o),r.o=/go\d/.test(l),o.className=u.apply(r,s)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),b&&d[0]&&b(o),x(d,o)}return t?t(a):a}}var y=(e,t)=>"function"==typeof e?e(t):e,g=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},E=(e,t=j)=>{k[t]=w(k[t]||C,e),N.forEach(([e,r])=>{e===t&&r(k[t])})},$=e=>Object.keys(k).forEach(t=>E(e,t)),D=(e=j)=>t=>{E(t,e)},_={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||g()}))(t,e,r);return D(a.toasterId||(s=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},O=(e,t)=>S("blank")(e,t);O.error=S("error"),O.success=S("success"),O.loading=S("loading"),O.custom=S("custom"),O.dismiss=(e,t)=>{let r={type:3,toastId:e};t?D(t)(r):$(r)},O.dismissAll=e=>O.dismiss(void 0,e),O.remove=(e,t)=>{let r={type:4,toastId:e};t?D(t)(r):$(r)},O.removeAll=e=>O.remove(void 0,e),O.promise=(e,t,r)=>{let s=O.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?y(t.success,e):void 0;return a?O.success(a,{id:s,...r,...null==r?void 0:r.success}):O.dismiss(s),e}).catch(e=>{let a=t.error?y(t.error,e):void 0;a?O.error(a,{id:s,...r,...null==r?void 0:r.error}):O.dismiss(s)}),e};var H=1e3,A=f`
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
}`,P=f`
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

  animation: ${A} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${P} 0.15s ease-out forwards;
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
`,I=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=f`
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

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
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
`,Z=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(K,null,t):t:"blank"===r?null:a.createElement(U,null,a.createElement(L,{...s}),"loading"!==r&&a.createElement(R,null,"error"===r?a.createElement(M,{...s}):a.createElement(F,{...s})))},q=h("div")`
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
`,X=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(Z,{toast:e}),o=a.createElement(W,{...e.ariaProps},y(e.message,e));return a.createElement(q,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:n,message:o}):a.createElement(a.Fragment,null,n,o))});s=a.createElement,d.p=void 0,x=s,p=void 0,b=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let n=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:n,className:t,style:r},i)},J=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&s(k[t]),N.push([t,s]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||_[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=H)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&O.dismiss(r.id);return}return setTimeout(()=>O.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let o=(0,a.useCallback)(D(t),[t]),l=(0,a.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,a.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,a.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),m=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:m}}})(r,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let n,o,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),m=(n=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return a.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:m},"custom"===r.type?y(r.message,r):i?i(r):a.createElement(X,{toast:r,position:l}))}))},"default",0,O,"toast",0,O],5766)},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:o,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[n],o),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=s.HiOutlineInbox,action:n,className:o}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",o),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},47647,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Table",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("w-full overflow-auto",s),children:(0,t.jsx)("table",{className:"w-full border-collapse",children:e})})}])},44665,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),a=e.i(50719),i=e.i(5766),n=e.i(37757),o=e.i(39964),l=e.i(96640),d=e.i(97591),c=e.i(32098),m=e.i(47647),u=e.i(41740),x=e.i(40803);let p=[{id:"y1",name:"2024-2025",startDate:"2024-09-01",endDate:"2025-06-30",semester1Start:"2024-09-01",semester1End:"2025-01-15",semester2Start:"2025-01-20",semester2End:"2025-06-30",status:"archived",studentsCount:180,coursesCount:15},{id:"y2",name:"2025-2026",startDate:"2025-09-01",endDate:"2026-06-30",semester1Start:"2025-09-01",semester1End:"2026-01-15",semester2Start:"2026-01-20",semester2End:"2026-06-30",status:"active",studentsCount:210,coursesCount:18}],b={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.04}}},f={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,h]=(0,r.useState)(p),[y,g]=(0,r.useState)("s1"),[v,j]=(0,r.useState)(!1),[w,N]=(0,r.useState)(!1),[C,k]=(0,r.useState)({name:"",startDate:"",endDate:"",semester1Start:"",semester1End:"",semester2Start:"",semester2End:""}),E=e.find(e=>"active"===e.status),$=e.filter(e=>"archived"===e.status),D=e.reduce((e,t)=>e+t.studentsCount,0),_=e.reduce((e,t)=>e+t.coursesCount,0),S=e=>{h(t=>t.map(t=>t.id===e?{...t,status:"archived"}:t)),i.default.success("تم أرشفة السنة الدراسية")};return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(n.PageHeader,{title:"النظام الدراسي",description:"إدارة السنوات الدراسية - الترمين - الترحيل"}),(0,t.jsx)("div",{className:"p-4 md:p-6 max-w-7xl mx-auto space-y-6",children:(0,t.jsxs)(s.motion.div,{variants:b,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsxs)(s.motion.div,{variants:f,className:"grid grid-cols-1 sm:grid-cols-4 gap-3",children:[(0,t.jsx)(d.StatsCard,{title:"السنوات النشطة",value:e.filter(e=>"active"===e.status).length,icon:a.HiOutlineCalendar,color:"primary"}),(0,t.jsx)(d.StatsCard,{title:"المؤرشفة",value:$.length,icon:a.HiOutlineArchive,color:"neutral"}),(0,t.jsx)(d.StatsCard,{title:"إجمالي الطلاب",value:D,icon:a.HiOutlineUserGroup,color:"success"}),(0,t.jsx)(d.StatsCard,{title:"إجمالي الكورسات",value:_,icon:a.HiOutlineBookOpen,color:"info"})]}),(0,t.jsxs)(s.motion.div,{variants:f,className:"flex items-center gap-3 flex-wrap",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>j(!0),className:"px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all flex items-center gap-2",children:[(0,t.jsx)(a.HiOutlinePlus,{className:"w-4 h-4"})," إضافة سنة دراسية"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>{i.default.success("تم نسخ الكورسات من السنة السابقة")},className:"px-4 py-2.5 border border-primary text-primary rounded-xl text-sm font-medium hover:bg-primary/5 transition-all flex items-center gap-2",children:[(0,t.jsx)(a.HiOutlineDuplicate,{className:"w-4 h-4"})," نسخ الكورسات من السنة السابقة"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>N(!0),className:"px-4 py-2.5 border border-warning text-warning rounded-xl text-sm font-medium hover:bg-warning/5 transition-all flex items-center gap-2",children:[(0,t.jsx)(a.HiOutlineSwitchHorizontal,{className:"w-4 h-4"})," ترحيل الطلاب"]})]}),E&&(0,t.jsx)(s.motion.div,{variants:f,children:(0,t.jsxs)(o.Card,{className:"border-primary/30 bg-gradient-to-l from-primary/5 to-transparent",children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsxs)(o.CardTitle,{children:["السنة النشطة: ",E.name]})}),(0,t.jsxs)(o.CardContent,{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{type:"button",onClick:()=>g("s1"),className:`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${"s1"===y?"border-primary bg-primary/10 text-primary":"border-border text-text-tertiary"}`,children:"الترم الأول"}),(0,t.jsx)("button",{type:"button",onClick:()=>g("s2"),className:`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${"s2"===y?"border-primary bg-primary/10 text-primary":"border-border text-text-tertiary"}`,children:"الترم الثاني"})]}),(0,t.jsx)("button",{type:"button",onClick:()=>S(E.id),className:"px-3 py-1.5 text-xs text-error border border-error/30 rounded-lg hover:bg-error/5 transition-all",children:"أرشفة السنة"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4 text-sm p-4 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"البداية: "}),(0,t.jsx)("span",{className:"text-text font-medium",children:"s1"===y?E.semester1Start:E.semester2Start})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"النهاية: "}),(0,t.jsx)("span",{className:"text-text font-medium",children:"s1"===y?E.semester1End:E.semester2End})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"الطلاب: "}),(0,t.jsx)("span",{className:"text-text font-medium",children:E.studentsCount})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"الكورسات: "}),(0,t.jsx)("span",{className:"text-text font-medium",children:E.coursesCount})]})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex justify-between text-xs text-text-tertiary",children:[(0,t.jsxs)("span",{children:["تقدم الترم ","s1"===y?"الأول":"الثاني"]}),(0,t.jsx)("span",{children:"65%"})]}),(0,t.jsx)(u.Progress,{value:65,size:"md"})]})]})]})}),(0,t.jsx)(s.motion.div,{variants:f,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"السنوات الدراسية"})}),(0,t.jsx)(o.CardContent,{children:0===e.length?(0,t.jsx)(x.EmptyState,{icon:a.HiOutlineCalendar,title:"لا يوجد سنوات دراسية",description:"لم يتم إضافة أي سنوات دراسية بعد"}):(0,t.jsx)(m.Table,{columns:[{key:"name",header:"السنة"},{key:"startDate",header:"تاريخ البداية"},{key:"endDate",header:"تاريخ النهاية"},{key:"studentsCount",header:"الطلاب"},{key:"coursesCount",header:"الكورسات"},{key:"status",header:"الحالة",render:e=>(0,t.jsx)(l.Badge,{variant:"active"===e.status?"success":"default",children:"active"===e.status?"نشطة":"مؤرشفة"})},{key:"actions",header:"",render:e=>"active"===e.status?(0,t.jsx)("button",{type:"button",onClick:()=>S(e.id),className:"text-xs text-error hover:text-error/80 transition-colors",children:"أرشفة"}):null}],data:e})})]})})]})}),(0,t.jsx)(c.Modal,{isOpen:v,onClose:()=>j(!1),title:"إضافة سنة دراسية جديدة",children:(0,t.jsxs)("div",{className:"space-y-4",children:[["name","startDate","endDate","semester1Start","semester1End","semester2Start","semester2End"].map(e=>(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-xs text-text-tertiary mb-1 block",children:"name"===e?"اسم السنة":"startDate"===e?"بداية السنة":"endDate"===e?"نهاية السنة":"semester1Start"===e?"بداية الترم الأول":"semester1End"===e?"نهاية الترم الأول":"semester2Start"===e?"بداية الترم الثاني":"نهاية الترم الثاني"}),(0,t.jsx)("input",{type:"name"===e?"text":"date",value:C[e],onChange:t=>k({...C,[e]:t.target.value}),className:"w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"})]},e)),(0,t.jsxs)("div",{className:"flex gap-3 pt-2",children:[(0,t.jsx)("button",{type:"button",onClick:()=>{C.name&&C.startDate?(h(e=>[...e,{...C,id:`y${Date.now()}`,status:"active",studentsCount:0,coursesCount:0}]),i.default.success("تم إضافة السنة الدراسية بنجاح"),j(!1),k({name:"",startDate:"",endDate:"",semester1Start:"",semester1End:"",semester2Start:"",semester2End:""})):i.default.error("الرجاء ملء الحقول المطلوبة")},className:"flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all",children:"إضافة"}),(0,t.jsx)("button",{type:"button",onClick:()=>j(!1),className:"flex-1 px-4 py-2.5 border border-border rounded-xl text-sm text-text-secondary hover:bg-surface-secondary transition-all",children:"إلغاء"})]})]})}),(0,t.jsx)(c.Modal,{isOpen:w,onClose:()=>N(!1),title:"ترحيل الطلاب",size:"sm",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)("p",{className:"text-sm text-text-secondary",children:"سيتم ترحيل جميع طلاب السنة الحالية إلى السنة الدراسية الجديدة."}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-warning/5 border border-warning/20 text-xs text-warning",children:["العدد المتوقع للترحيل: ",E?.studentsCount||0," طالب"]}),(0,t.jsxs)("div",{className:"flex gap-3 pt-2",children:[(0,t.jsx)("button",{type:"button",onClick:()=>{i.default.success("تم ترحيل الطلاب بنجاح"),N(!1)},className:"flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all",children:"تأكيد الترحيل"}),(0,t.jsx)("button",{type:"button",onClick:()=>N(!1),className:"flex-1 px-4 py-2.5 border border-border rounded-xl text-sm text-text-secondary hover:bg-surface-secondary transition-all",children:"إلغاء"})]})]})})]})}])}]);