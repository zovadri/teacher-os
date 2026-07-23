(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:s="لم يتم العثور على أي عناصر بعد.",icon:i=a.HiOutlineInbox,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:s}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(46932),s=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:l,sparkline:d,color:c="primary",description:p,className:u}){let m=i[c],x=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",u),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",m.bg,m.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",m.text)})}),x&&(0,t.jsxs)(a.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(s.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(s.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(a.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",m.text),children:o}),p&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:p}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:m.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:m.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:m.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function u(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let u=p(e),m=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!c[m]){let t=u!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);c[m]=d(s?{["@keyframes "+m]:t}:t,r?"":"."+m)}let x=r&&c.g;return r&&(c.g=c[m]),i=c[m],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}u.bind({g:1});let m,x,b,h=u.bind({k:1});function f(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;r.p=Object.assign({theme:x&&x()},n),r.o=/go\d/.test(l),n.className=u.apply(r,a)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),m(d,n)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},_=(e,t=j)=>{k[t]=w(k[t]||C,e),N.forEach(([e,r])=>{e===t&&r(k[t])})},E=e=>Object.keys(k).forEach(t=>_(e,t)),$=(e=j)=>t=>{_(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return $(s.toasterId||(a=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},A=(e,t)=>H("blank")(e,t);A.error=H("error"),A.success=H("success"),A.loading=H("loading"),A.custom=H("custom"),A.dismiss=(e,t)=>{let r={type:3,toastId:e};t?$(t)(r):E(r)},A.dismissAll=e=>A.dismiss(void 0,e),A.remove=(e,t)=>{let r={type:4,toastId:e};t?$(t)(r):E(r)},A.removeAll=e=>A.remove(void 0,e),A.promise=(e,t,r)=>{let a=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?A.success(s,{id:a,...r,...null==r?void 0:r.success}):A.dismiss(a),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?A.error(s,{id:a,...r,...null==r?void 0:r.error}):A.dismiss(a)}),e};var S=1e3,D=h`
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
}`,P=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,T=f("div")`
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
    animation: ${P} 0.15s ease-out forwards;
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
`,L=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,B=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,I=h`
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

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,X=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(K,null,t):t:"blank"===r?null:s.createElement(U,null,s.createElement(L,{...a}),"loading"!==r&&s.createElement(F,null,"error"===r?s.createElement(T,{...a}):s.createElement(R,{...a})))},Z=f("div")`
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
`,W=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(X,{toast:e}),n=s.createElement(q,{...e.ariaProps},g(e.message,e));return s.createElement(Z,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});a=s.createElement,d.p=void 0,m=a,x=void 0,b=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},J=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(k[t]||C),i=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(i.current!==k[t]&&a(k[t]),N.push([t,a]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=S)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&A.dismiss(r.id);return}return setTimeout(()=>A.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,s.useCallback)($(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,s.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),p=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:p}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,n,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),p=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:p},"custom"===r.type?g(r.message,r):i?i(r):s.createElement(W,{toast:r,position:l}))}))},"default",0,A,"toast",0,A],5766)},41740,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Progress",0,function({value:e,className:a,size:s="md"}){return(0,t.jsx)("div",{className:(0,r.cn)("w-full bg-card/80 rounded-full overflow-hidden border border-border","sm"===s?"h-1.5":"h-2.5",a),children:(0,t.jsx)("div",{className:"h-full bg-primary rounded-full transition-all duration-500",style:{width:`${Math.min(100,Math.max(0,e))}%`}})})}])},32098,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(46932),i=e.i(88653),o=e.i(50719);let n={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:l,title:d,children:c,className:p,size:u="md"}){let m=(0,r.useCallback)(e=>{"Escape"===e.key&&l()},[l]);return(0,r.useEffect)(()=>(e&&(document.addEventListener("keydown",m),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",m),document.body.style.overflow=""}),[e,m]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(s.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:l}),(0,t.jsxs)(s.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,a.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",n[u],p),children:[d&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:d}),(0,t.jsx)("button",{onClick:l,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(o.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,a.cn)("px-6 pb-6",!d&&"pt-6"),children:c})]})]})})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},n=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:n,leftIcon:l,rightIcon:d,className:c,disabled:p,children:u,...m},x)=>(0,t.jsxs)("button",{ref:x,disabled:p||n,className:(0,a.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],c),...m,children:[n?(0,t.jsx)(s.Spinner,{size:"sm"}):l,u,!n&&d]}));n.displayName="Button",e.s(["default",0,n])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",a[i],s[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:a,hover:s=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",a),children:e})},"CardContent",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",a),children:e})},"CardDescription",0,function({children:e,className:a}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",a),children:e})},"CardFooter",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",a),children:e})},"CardHeader",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",a),children:e})},"CardTitle",0,function({children:e,className:a}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",a),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:a,children:s,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),a&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:a})]}),s&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:s})]})}])},67073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(50719);let i=(0,r.forwardRef)(({label:e,error:r,options:i,placeholder:o,className:n,...l},d)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:d,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",n),...l,children:[o&&(0,t.jsx)("option",{value:"",children:o}),i.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(s.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));i.displayName="Select",e.s(["default",0,i])},26769,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(50719),i=e.i(5766),o=e.i(37757),n=e.i(39964),l=e.i(96640),d=e.i(40803),c=e.i(97591),p=e.i(41740),u=e.i(32098),m=e.i(59544),x=e.i(67073),b=e.i(75157);let h=["السبت","الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"],f=["bg-primary/10 border-primary/20 text-primary","bg-success/10 border-success/20 text-success","bg-purple-500/10 border-purple-500/20 text-purple-400","bg-warning/10 border-warning/20 text-warning","bg-error/10 border-error/20 text-error"],g=[{day:0,start:"08:00",end:"09:30",subject:"الكيمياء",teacher:"أ. خالد صقر",room:"قاعة A",group:"مجموعة 1",color:f[0]},{day:0,start:"10:00",end:"11:30",subject:"الفيزياء",teacher:"أ. أحمد سمير",room:"قاعة B",group:"مجموعة 2",color:f[1]},{day:1,start:"08:00",end:"09:30",subject:"الرياضيات",teacher:"أ. نبيل إبراهيم",room:"قاعة A",group:"مجموعة 1",color:f[2]},{day:1,start:"10:00",end:"11:30",subject:"الكيمياء",teacher:"أ. خالد صقر",room:"قاعة C",group:"مجموعة 3",color:f[0]},{day:2,start:"09:00",end:"10:30",subject:"العربي",teacher:"أ. محمد صلاح",room:"قاعة B",group:"مجموعة 2",color:f[3]},{day:2,start:"11:00",end:"12:30",subject:"الإنجليزي",teacher:"أ. أحمد فريد",room:"قاعة A",group:"مجموعة 1",color:f[4]},{day:3,start:"08:00",end:"09:30",subject:"الفيزياء",teacher:"أ. مينا مجدي",room:"قاعة B",group:"مجموعة 3",color:f[1]},{day:3,start:"10:00",end:"11:30",subject:"الرياضيات",teacher:"أ. نبيل إبراهيم",room:"قاعة C",group:"مجموعة 2",color:f[2]},{day:4,start:"09:00",end:"10:30",subject:"الكيمياء",teacher:"أ. محمود جلال",room:"قاعة A",group:"مجموعة 2",color:f[0]}],y=[{id:"t1",name:"أ. خالد صقر",subject:"الكيمياء",hours:6},{id:"t2",name:"أ. أحمد سمير",subject:"الفيزياء",hours:4},{id:"t3",name:"أ. نبيل إبراهيم",subject:"الرياضيات",hours:5},{id:"t4",name:"أ. محمد صلاح",subject:"العربي",hours:3},{id:"t5",name:"أ. أحمد فريد",subject:"الإنجليزي",hours:3}],v=[{id:"r1",name:"قاعة A",capacity:30,occupancy:87},{id:"r2",name:"قاعة B",capacity:25,occupancy:72},{id:"r3",name:"قاعة C",capacity:20,occupancy:65},{id:"r4",name:"قاعة D",capacity:35,occupancy:91}],j=["الكيمياء","الفيزياء","الرياضيات","العربي","الإنجليزي"],w=["مجموعة 1","مجموعة 2","مجموعة 3","مجموعة 4"],N=["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];e.s(["default",0,function(){let[e,C]=(0,r.useState)(g),[k,_]=(0,r.useState)(0),[E,$]=(0,r.useState)("all"),[O,H]=(0,r.useState)("all"),[A,S]=(0,r.useState)(!1),[D,z]=(0,r.useState)({day:0,start:"08:00",end:"09:30",subject:j[0],teacher:y[0].name,room:v[0].name,group:w[0]}),P=e.filter(e=>("all"===E||e.teacher===E)&&("all"===O||e.room===O));return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsx)(o.PageHeader,{title:"جدول الحصص",description:"إدارة جدول السنتر بالكامل - المدرسين والقاعات والمجموعات"}),(0,t.jsxs)(a.motion.div,{initial:"hidden",animate:"visible",variants:{hidden:{},visible:{transition:{staggerChildren:.05}}},className:"space-y-6",children:[(0,t.jsxs)(a.motion.div,{variants:{hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}},className:"grid grid-cols-1 sm:grid-cols-4 gap-5",children:[(0,t.jsx)(c.StatsCard,{title:"إجمالي الحصص",value:e.length,icon:s.HiOutlineCalendar,color:"primary"}),(0,t.jsx)(c.StatsCard,{title:"المدرسين",value:y.length,icon:s.HiOutlineUserGroup,color:"success"}),(0,t.jsx)(c.StatsCard,{title:"القاعات",value:v.length,icon:s.HiOutlineAcademicCap,color:"info"}),(0,t.jsx)(c.StatsCard,{title:"المجموعات",value:w.length,icon:s.HiOutlineClock,color:"warning"})]}),(0,t.jsxs)(a.motion.div,{variants:{hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}},className:"flex items-center justify-between gap-4 flex-wrap",children:[(0,t.jsxs)("div",{className:"flex gap-2 flex-wrap items-center",children:[(0,t.jsx)("span",{className:"text-xs text-text-tertiary",children:"تصفية:"}),(0,t.jsx)(x.default,{options:[{value:"all",label:"كل المدرسين"},...y.map(e=>({value:e.name,label:e.name}))],value:E,onChange:e=>$(e.target.value),className:"w-36"}),(0,t.jsx)(x.default,{options:[{value:"all",label:"كل القاعات"},...v.map(e=>({value:e.name,label:e.name}))],value:O,onChange:e=>H(e.target.value),className:"w-32"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(m.default,{variant:"secondary",size:"sm",onClick:()=>_(e=>e-1),children:"← الأسبوع السابق"}),(0,t.jsxs)("span",{className:"text-xs font-medium text-text",children:["الأسبوع ",Math.abs(k)+1]}),(0,t.jsx)(m.default,{variant:"secondary",size:"sm",onClick:()=>_(e=>e+1),children:"الأسبوع التالي →"})]})]}),(0,t.jsx)(a.motion.div,{variants:{hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}},children:(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)(n.CardTitle,{children:"الجدول الأسبوعي"}),(0,t.jsx)(m.default,{variant:"primary",size:"sm",leftIcon:(0,t.jsx)(s.HiOutlinePlus,{className:"w-4 h-4"}),onClick:()=>S(!0),children:"إضافة حصة"})]})}),(0,t.jsx)(n.CardContent,{children:0===P.length?(0,t.jsx)(d.EmptyState,{icon:s.HiOutlineCalendar,title:"لا يوجد جدول",description:"لم يتم إضافة أي حصص في الجدول بعد"}):(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs min-w-[800px] border-collapse",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{className:"w-16 p-2 border border-border bg-card text-text-tertiary font-medium",children:"الوقت"}),h.map((e,r)=>(0,t.jsx)("th",{className:(0,b.cn)("p-2 border border-border text-center font-medium",r>=5?"text-error":"text-text"),children:e},e))]})}),(0,t.jsx)("tbody",{children:N.map((r,a)=>(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"p-2 border border-border text-text-tertiary font-mono text-[10px] text-center",children:r}),h.map((o,n)=>{let l=P.filter(e=>e.day===n&&e.start===r);return(0,t.jsx)("td",{className:"p-1 border border-border align-top min-h-[60px]",children:l.map((r,a)=>(0,t.jsxs)("div",{className:(0,b.cn)("relative rounded-[12px] p-2 mb-1 text-[10px] leading-tight border group",r.color),children:[(0,t.jsx)("p",{className:"font-semibold",children:r.subject}),(0,t.jsx)("p",{className:"opacity-80",children:r.teacher}),(0,t.jsxs)("p",{className:"opacity-70",children:[r.room," • ",r.group]}),(0,t.jsx)("button",{type:"button",onClick:()=>{var t;return t=e.indexOf(r),void(C(e=>e.filter((e,r)=>r!==t)),i.default.success("تم حذف الحصة"))},className:"absolute -top-1 -left-1 w-4 h-4 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",children:(0,t.jsx)(s.HiOutlineX,{className:"w-2.5 h-2.5"})})]},a))},`${n}-${a}`)})]},r))})]})})})]})}),(0,t.jsxs)(a.motion.div,{variants:{hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}},className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsx)(n.CardTitle,{children:"المدرسون"})}),(0,t.jsx)(n.CardContent,{children:(0,t.jsx)("div",{className:"space-y-2",children:y.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-[14px] bg-card/40 border border-border",children:[(0,t.jsx)("span",{className:"text-sm font-medium text-text",children:e.name}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-xs text-text-tertiary",children:e.subject}),(0,t.jsxs)(l.Badge,{variant:"primary",size:"sm",children:[e.hours," ساعة/أسبوع"]})]})]},e.id))})})]}),(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsx)(n.CardTitle,{children:"القاعات"})}),(0,t.jsx)(n.CardContent,{children:(0,t.jsx)("div",{className:"space-y-2",children:v.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-[14px] bg-card/40 border border-border",children:[(0,t.jsx)("span",{className:"text-sm font-medium text-text",children:e.name}),(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsxs)("span",{className:"text-xs text-text-tertiary",children:[e.capacity," مقعد"]}),(0,t.jsx)(p.Progress,{value:e.occupancy,size:"sm",variant:e.occupancy>85?"error":"primary",className:"w-16"}),(0,t.jsxs)("span",{className:"text-xs text-text-tertiary",children:[e.occupancy,"%"]})]})]},e.id))})})]})]})]}),(0,t.jsx)(u.Modal,{isOpen:A,onClose:()=>S(!1),title:"إضافة حصة جديدة",size:"md",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsx)(x.default,{label:"اليوم",options:h.map((e,t)=>({value:String(t),label:e})),value:String(D.day),onChange:e=>z({...D,day:Number(e.target.value)})}),(0,t.jsx)(x.default,{label:"المادة",options:j.map(e=>({value:e,label:e})),value:D.subject,onChange:e=>z({...D,subject:e.target.value})}),(0,t.jsx)(x.default,{label:"بداية",options:N.map(e=>({value:e,label:e})),value:D.start,onChange:e=>z({...D,start:e.target.value})}),(0,t.jsx)(x.default,{label:"نهاية",options:N.map(e=>({value:e,label:e})),value:D.end,onChange:e=>z({...D,end:e.target.value})}),(0,t.jsx)(x.default,{label:"المدرس",options:y.map(e=>({value:e.name,label:e.name})),value:D.teacher,onChange:e=>z({...D,teacher:e.target.value})}),(0,t.jsx)(x.default,{label:"القاعة",options:v.map(e=>({value:e.name,label:e.name})),value:D.room,onChange:e=>z({...D,room:e.target.value})}),(0,t.jsx)(x.default,{label:"المجموعة",options:w.map(e=>({value:e,label:e})),value:D.group,onChange:e=>z({...D,group:e.target.value}),className:"col-span-2"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3 p-4 rounded-[12px] bg-warning/5 border border-warning/10 text-xs text-warning",children:[(0,t.jsx)(s.HiOutlineExclamationCircle,{className:"w-4 h-4 shrink-0"})," سيتم التحقق من تعارض المواعيد تلقائياً"]}),(0,t.jsxs)("div",{className:"flex gap-4 pt-2",children:[(0,t.jsx)(m.default,{variant:"primary",className:"flex-1",onClick:()=>{e.some(e=>e.day===D.day&&e.room===D.room&&e.start===D.start)?i.default.error("تعارض في الموعد! القاعة محجوزة في هذا الوقت."):e.some(e=>e.day===D.day&&e.teacher===D.teacher&&e.start===D.start)?i.default.error("تعارض في موعد المدرس!"):(C(e=>[...e,{...D,color:f[j.indexOf(D.subject)%f.length]}]),i.default.success("تمت إضافة الحصة بنجاح"),S(!1))},children:"إضافة"}),(0,t.jsx)(m.default,{variant:"secondary",onClick:()=>S(!1),children:"إلغاء"})]})]})})]})}])}]);