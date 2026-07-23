(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:s="لم يتم العثور على أي عناصر بعد.",icon:i=a.HiOutlineInbox,action:n,className:o}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",o),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:s}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(46932),s=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:n,icon:o,trend:l,sparkline:d,color:c="primary",description:x,className:m}){let p=i[c],u=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",m),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",p.bg,p.border),children:o&&(0,t.jsx)(o,{className:(0,r.cn)("w-5 h-5",p.text)})}),u&&(0,t.jsxs)(a.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",u.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[u.positive?(0,t.jsx)(s.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(s.HiTrendingDown,{className:"w-3.5 h-3.5"}),u.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(a.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",p.text),children:n}),x&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:x}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:p.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:p.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:p.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":a+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,n):i+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},x=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+x(e[r]);return t}return e};function m(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let m=x(e),p=c[m]||(c[m]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(m));if(!c[p]){let t=m!==e?e:(e=>{let t,r,a=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);c[p]=d(s?{["@keyframes "+p]:t}:t,r?"":"."+p)}let u=r&&c.g;return r&&(c.g=c[p]),i=c[p],u?t.data=t.data.replace(u,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),p})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}m.bind({g:1});let p,u,h,g=m.bind({k:1});function b(e,t){let r=this||{};return function(){let a=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;r.p=Object.assign({theme:u&&u()},o),r.o=/go\d/.test(l),o.className=m.apply(r,a)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),h&&d[0]&&h(o),p(d,o)}return t?t(s):s}}var f=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},S=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},_=e=>Object.keys(k).forEach(t=>S(e,t)),E=(e=j)=>t=>{S(t,e)},H={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return E(s.toasterId||(a=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},$=(e,t)=>O("blank")(e,t);$.error=O("error"),$.success=O("success"),$.loading=O("loading"),$.custom=O("custom"),$.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):_(r)},$.dismissAll=e=>$.dismiss(void 0,e),$.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):_(r)},$.removeAll=e=>$.remove(void 0,e),$.promise=(e,t,r)=>{let a=$.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?f(t.success,e):void 0;return s?$.success(s,{id:a,...r,...null==r?void 0:r.success}):$.dismiss(a),e}).catch(e=>{let s=t.error?f(t.error,e):void 0;s?$.error(s,{id:a,...r,...null==r?void 0:r.error}):$.dismiss(a)}),e};var P=1e3,D=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,X=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,A=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,T=b("div")`
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
    animation: ${X} 0.15s ease-out forwards;
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
`,L=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,z=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${L} 1s linear infinite;
`,I=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=g`
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
}`,M=b("div")`
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
`,G=b("div")`
  position: absolute;
`,R=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,F=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${F} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,q=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(U,null,t):t:"blank"===r?null:s.createElement(R,null,s.createElement(z,{...a}),"loading"!==r&&s.createElement(G,null,"error"===r?s.createElement(T,{...a}):s.createElement(M,{...a})))},K=b("div")`
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
`,Z=b("div")`
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
`];return{animation:t?`${g(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=s.createElement(q,{toast:e}),o=s.createElement(Z,{...e.ariaProps},f(e.message,e));return s.createElement(K,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:n,message:o}):s.createElement(s.Fragment,null,n,o))});a=s.createElement,d.p=void 0,p=a,u=void 0,h=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let n=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:n,className:t,style:r},i)},J=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(k[t]||C),i=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(i.current!==k[t]&&a(k[t]),w.push([t,a]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||H[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,s.useRef)(new Map).current,n=(0,s.useCallback)((e,t=P)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&$.dismiss(r.id);return}return setTimeout(()=>$.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let o=(0,s.useCallback)(E(t),[t]),l=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,s.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),x=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:x}}})(r,n);return s.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let n,o,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),x=(n=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return s.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:x},"custom"===r.type?f(r.message,r):i?i(r):s.createElement(W,{toast:r,position:l}))}))},"default",0,$,"toast",0,$],5766)},41740,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Progress",0,function({value:e,className:a,size:s="md"}){return(0,t.jsx)("div",{className:(0,r.cn)("w-full bg-card/80 rounded-full overflow-hidden border border-border","sm"===s?"h-1.5":"h-2.5",a),children:(0,t.jsx)("div",{className:"h-full bg-primary rounded-full transition-all duration-500",style:{width:`${Math.min(100,Math.max(0,e))}%`}})})}])},98706,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={sm:"w-8 h-8 text-xs",md:"w-10 h-10 text-sm",lg:"w-12 h-12 text-base"};e.s(["Avatar",0,function({src:e,alt:s="",name:i,size:n="md",className:o}){let l=i?i.split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase():"?";return e?(0,t.jsx)("img",{src:e,alt:s,className:(0,r.cn)("rounded-full object-cover border border-border",a[n],o)}):(0,t.jsx)("div",{className:(0,r.cn)("rounded-full bg-primary-100 text-primary flex items-center justify-center font-medium border border-primary-200",a[n],o),children:l})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},n={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},o=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:o,leftIcon:l,rightIcon:d,className:c,disabled:x,children:m,...p},u)=>(0,t.jsxs)("button",{ref:u,disabled:x||o,className:(0,a.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],n[r],c),...p,children:[o?(0,t.jsx)(s.Spinner,{size:"sm"}):l,m,!o&&d]}));o.displayName="Button",e.s(["default",0,o])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:o,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",a[i],s[n],o),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:a,hover:s=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",a),children:e})},"CardContent",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",a),children:e})},"CardDescription",0,function({children:e,className:a}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",a),children:e})},"CardFooter",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",a),children:e})},"CardHeader",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",a),children:e})},"CardTitle",0,function({children:e,className:a}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",a),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:a,children:s,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),a&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:a})]}),s&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:s})]})}])},3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157);let s=(0,r.forwardRef)(({label:e,error:r,leftIcon:s,rightIcon:i,className:n,...o},l)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[s&&(0,t.jsx)("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none",children:s}),(0,t.jsx)("input",{ref:l,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50","shadow-[0_2px_8px_rgba(217,119,6,0.015),0_1px_0_rgba(255,255,255,0.9)_inset]","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",s&&"pr-10",i&&"pl-10",n),...o}),i&&(0,t.jsx)("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary",children:i})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));s.displayName="Input",e.s(["default",0,s])},38982,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["TabPanel",0,function({children:e,active:a,className:s}){return a?(0,t.jsx)("div",{className:(0,r.cn)("mt-4",s),children:e}):null},"Tabs",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)(a),children:e})}])},81425,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(50719),i=e.i(37757),n=e.i(39964),o=e.i(97591),l=e.i(38982),d=e.i(96640),c=e.i(98706),x=e.i(41740),m=e.i(59544),p=e.i(3812),u=e.i(81604),h=e.i(75157),g=e.i(5766),b=e.i(22016),f=e.i(40803);e.s(["default",0,function(){let[e,y]=(0,r.useState)(u.mockGamificationConfig.xpPerLesson),[v,j]=(0,r.useState)(u.mockGamificationConfig.xpPerExam),[N,w]=(0,r.useState)(u.mockGamificationConfig.xpPerHomework),[C,k]=(0,r.useState)(u.mockGamificationConfig.xpStreakBonus),S=(0,r.useMemo)(()=>({totalXp:u.mockStudentXpData.reduce((e,t)=>e+t.totalXp,0),activeStudents:u.mockStudentXpData.length,avgLevel:Math.round(u.mockStudentXpData.reduce((e,t)=>e+t.level,0)/u.mockStudentXpData.length),topStudent:u.mockStudentXpData[0]}),[]),_=(0,r.useMemo)(()=>u.mockStudentXpData.slice(0,3),[]),E=["bg-gray-400","bg-green-400","bg-emerald-500","bg-teal-500","bg-blue-500","bg-indigo-500","bg-violet-500","bg-purple-500","bg-fuchsia-500","bg-pink-500","bg-rose-500","bg-red-500","bg-orange-500","bg-amber-500","bg-yellow-500","bg-yellow-400","bg-amber-300","bg-orange-300","bg-red-300","bg-rose-300","bg-purple-300","bg-violet-300","bg-indigo-300","bg-blue-300","bg-teal-300"];return(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(i.PageHeader,{title:"نظام التحديات والمكافآت",description:"XPطŒ المستويات، الشارات، والإنجازات"}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"grid grid-cols-2 lg:grid-cols-4 gap-4",children:[(0,t.jsx)(o.StatsCard,{title:"إجمالي XP الممنوح",value:S.totalXp.toLocaleString("ar-EG"),icon:s.HiOutlineStar,color:"primary"}),(0,t.jsx)(o.StatsCard,{title:"الطلاب النشطون",value:S.activeStudents,icon:s.HiOutlineUsers,color:"success"}),(0,t.jsx)(o.StatsCard,{title:"متوسط المستوى",value:S.avgLevel,icon:s.HiOutlineAcademicCap,color:"info"}),(0,t.jsx)(o.StatsCard,{title:"أفضل طالب",value:S.topStudent.studentName,icon:s.HiStar,color:"warning"})]}),(0,t.jsx)(l.Tabs,{tabs:[{id:"leaderboard",label:"لوحة المتصدرين",icon:(0,t.jsx)(s.HiStar,{className:"w-4 h-4"})},{id:"badges",label:"الشارات والإنجازات",icon:(0,t.jsx)(s.HiOutlineBadgeCheck,{className:"w-4 h-4"})},{id:"levels",label:"المستويات",icon:(0,t.jsx)(s.HiOutlineChartSquareBar,{className:"w-4 h-4"})},{id:"settings",label:"الإعدادات",icon:(0,t.jsx)(s.HiOutlineCog,{className:"w-4 h-4"})}],children:r=>(0,t.jsxs)(t.Fragment,{children:["leaderboard"===r&&(0===u.mockStudentXpData.length?(0,t.jsx)(f.EmptyState,{icon:s.HiOutlineStar,title:"لا توجد بيانات ألعاب",description:"لم يتم تسجيل أي نشاط ألعاب بعد"}):(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:_.map((e,r)=>(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1*r},className:(0,h.cn)("relative bg-surface border-2 rounded-xl p-6 text-center",0===r?"border-yellow-400 shadow-lg shadow-yellow-400/10":1===r?"border-gray-300":"border-amber-600"),children:[0===r&&(0,t.jsx)("div",{className:"absolute -top-3 left-1/2 -translate-x-1/2 text-2xl",children:"👑"}),(0,t.jsx)("div",{className:"flex justify-center mb-3 mt-2",children:(0,t.jsx)(c.Avatar,{name:e.studentName,size:"xl"})}),(0,t.jsx)("h3",{className:"font-bold text-text text-lg",children:e.studentName}),(0,t.jsxs)("div",{className:"flex items-center justify-center gap-2 mt-2",children:[(0,t.jsxs)(d.Badge,{variant:"warning",size:"sm",children:[(0,t.jsx)(s.HiOutlineStar,{className:"w-3 h-3 ml-1"}),e.totalXp.toLocaleString("ar-EG")," XP"]}),(0,t.jsxs)(d.Badge,{variant:"primary",size:"sm",children:["مستوى ",e.level]})]}),(0,t.jsxs)("div",{className:"flex items-center justify-center gap-4 mt-3 text-xs text-text-tertiary",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(s.HiOutlineFire,{className:"w-3 h-3"}),e.streak," يوم"]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(s.HiOutlineBadgeCheck,{className:"w-3 h-3"}),e.badges," شارة"]})]})]},e.studentId))}),(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsx)(n.CardTitle,{children:"جميع المتصدرين"})}),(0,t.jsx)(n.CardContent,{children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border",children:[(0,t.jsx)("th",{className:"text-right px-3 py-3 font-semibold text-text-secondary",children:"الترتيب"}),(0,t.jsx)("th",{className:"text-right px-3 py-3 font-semibold text-text-secondary",children:"الطالب"}),(0,t.jsx)("th",{className:"text-right px-3 py-3 font-semibold text-text-secondary",children:"XP"}),(0,t.jsx)("th",{className:"text-right px-3 py-3 font-semibold text-text-secondary",children:"المستوى"}),(0,t.jsx)("th",{className:"text-right px-3 py-3 font-semibold text-text-secondary",children:"الشارات"}),(0,t.jsx)("th",{className:"text-right px-3 py-3 font-semibold text-text-secondary",children:"التسلسل"}),(0,t.jsx)("th",{className:"text-right px-3 py-3 font-semibold text-text-secondary",children:"XP أسبوعي"}),(0,t.jsx)("th",{className:"text-right px-3 py-3 font-semibold text-text-secondary",children:"آخر نشاط"})]})}),(0,t.jsx)("tbody",{children:u.mockStudentXpData.map((e,r)=>(0,t.jsxs)("tr",{className:(0,h.cn)("border-b border-border last:border-0 hover:bg-surface-secondary transition-colors",r<3&&"bg-primary-50/30 dark:bg-primary-900/10"),children:[(0,t.jsx)("td",{className:"px-3 py-3",children:(0,t.jsx)("span",{className:(0,h.cn)("inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",0===r?"bg-yellow-100 text-yellow-700":1===r?"bg-gray-200 text-gray-600":2===r?"bg-amber-100 text-amber-700":"bg-surface-tertiary text-text-tertiary"),children:e.rank})}),(0,t.jsx)("td",{className:"px-3 py-3",children:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(c.Avatar,{name:e.studentName,size:"sm"}),(0,t.jsx)("span",{className:"font-medium text-text",children:e.studentName})]})}),(0,t.jsx)("td",{className:"px-3 py-3",children:(0,t.jsx)("span",{className:"font-bold text-text",children:e.totalXp.toLocaleString("ar-EG")})}),(0,t.jsx)("td",{className:"px-3 py-3",children:(0,t.jsxs)(d.Badge,{variant:"primary",size:"sm",children:["مستوى ",e.level]})}),(0,t.jsx)("td",{className:"px-3 py-3",children:e.badges}),(0,t.jsx)("td",{className:"px-3 py-3",children:(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)(s.HiOutlineFire,{className:(0,h.cn)("w-4 h-4",e.streak>=30?"text-warning":"text-text-tertiary")}),(0,t.jsxs)("span",{className:e.streak>=30?"text-warning font-medium":"text-text-secondary",children:[e.streak," يوم"]})]})}),(0,t.jsx)("td",{className:"px-3 py-3 text-text-secondary",children:e.weeklyXp.toLocaleString("ar-EG")}),(0,t.jsx)("td",{className:"px-3 py-3 text-xs text-text-tertiary",children:(0,h.formatDate)(e.lastActive)})]},e.studentId))})]})})})]})]})),"badges"===r&&(0===u.mockAchievements.length&&u.mockGamificationConfig.badgeCategories.every(e=>0===e.badges.length)?(0,t.jsx)(f.EmptyState,{icon:s.HiOutlineStar,title:"لا توجد بيانات ألعاب",description:"لم يتم تسجيل أي نشاط ألعاب بعد"}):(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"flex items-center gap-6 text-sm",children:[(0,t.jsx)(b.default,{href:"/teacher/gamification/badges",className:"text-primary hover:underline font-medium",children:"إدارة الشارات"}),(0,t.jsx)(b.default,{href:"/teacher/gamification/achievements",className:"text-primary hover:underline font-medium",children:"إدارة الإنجازات"})]}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:u.mockGamificationConfig.badgeCategories.map(e=>(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("span",{className:"text-2xl",children:e.icon}),(0,t.jsx)(n.CardTitle,{children:e.name})]})}),(0,t.jsxs)(n.CardContent,{children:[(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:e.badges.map(e=>(0,t.jsx)(d.Badge,{variant:"premium",size:"md",children:e},e))}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary mt-3",children:[e.badges.length," شارة"]})]})]},e.id))}),(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsx)(n.CardTitle,{children:"الإنجازات"})}),(0,t.jsx)(n.CardContent,{children:(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",children:u.mockAchievements.map(e=>(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-surface-secondary border border-border hover:border-primary/30 transition-colors",children:[(0,t.jsx)("div",{className:"text-3xl mb-2",children:e.icon}),(0,t.jsx)("h4",{className:"font-semibold text-text text-sm",children:e.name}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1",children:e.description}),(0,t.jsxs)("div",{className:"flex items-center justify-between mt-3",children:[(0,t.jsxs)(d.Badge,{variant:"warning",size:"sm",children:["+",e.xpReward," XP"]}),(0,t.jsx)("span",{className:"text-xs text-text-tertiary",children:e.criteria.type.replace("_"," ")})]})]},e.id))})})]})]})),"levels"===r&&(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsx)(n.CardTitle,{children:"شجرة المستويات"})}),(0,t.jsx)(n.CardContent,{children:(0,t.jsx)("div",{className:"space-y-2",children:u.mockGamificationConfig.levels.map((e,r)=>{let s=r<u.mockGamificationConfig.levels.length-1?u.mockGamificationConfig.levels[r+1].xpRequired:e.xpRequired;return(0,t.jsxs)(a.motion.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.03*r},className:"flex items-center gap-4 p-3 rounded-xl hover:bg-surface-secondary transition-colors",children:[(0,t.jsx)("div",{className:(0,h.cn)("w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0",E[r%E.length]),children:e.level}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("span",{className:"font-medium text-text",children:e.name}),(0,t.jsxs)("span",{className:"text-xs text-text-tertiary",children:[e.xpRequired.toLocaleString("ar-EG")," XP"]})]}),(0,t.jsx)(x.Progress,{value:e.xpRequired,max:s,size:"sm",variant:r<5?"primary":r<10?"success":r<15?"warning":"error",className:"mt-1"})]})]},e.level)})})})]}),"settings"===r&&(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsx)(n.CardTitle,{children:"إعدادات XP"})}),(0,t.jsxs)(n.CardContent,{className:"space-y-5 max-w-lg",children:[(0,t.jsx)(p.default,{label:"XP لكل درس",type:"number",value:e,onChange:e=>y(Number(e.target.value)),leftIcon:(0,t.jsx)(s.HiOutlineStar,{className:"w-4 h-4"})}),(0,t.jsx)(p.default,{label:"XP لكل امتحان",type:"number",value:v,onChange:e=>j(Number(e.target.value)),leftIcon:(0,t.jsx)(s.HiOutlineStar,{className:"w-4 h-4"})}),(0,t.jsx)(p.default,{label:"XP لكل واجب",type:"number",value:N,onChange:e=>w(Number(e.target.value)),leftIcon:(0,t.jsx)(s.HiOutlineStar,{className:"w-4 h-4"})}),(0,t.jsx)(p.default,{label:"مكافأة التسلسل (Streak)",type:"number",value:C,onChange:e=>k(Number(e.target.value)),leftIcon:(0,t.jsx)(s.HiOutlineFire,{className:"w-4 h-4"})}),(0,t.jsx)("div",{className:"pt-2",children:(0,t.jsx)(m.default,{variant:"primary",onClick:()=>g.default.success("تم حفظ إعدادات XP بنجاح"),children:"حفظ الإعدادات"})})]})]})]})})]})}])}]);