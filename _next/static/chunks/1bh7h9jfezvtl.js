(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":s+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,n):i+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function u(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let u=p(e),m=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!c[m]){let t=u!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);c[m]=d(a?{["@keyframes "+m]:t}:t,r?"":"."+m)}let x=r&&c.g;return r&&(c.g=c[m]),i=c[m],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),m})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}u.bind({g:1});let m,x,h,b=u.bind({k:1});function f(e,t){let r=this||{};return function(){let s=arguments;function a(i,n){let o=Object.assign({},i),l=o.className||a.className;r.p=Object.assign({theme:x&&x()},o),r.o=/go\d/.test(l),o.className=u.apply(r,s)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),h&&d[0]&&h(o),m(d,o)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},$=(e,t=j)=>{k[t]=w(k[t]||C,e),N.forEach(([e,r])=>{e===t&&r(k[t])})},_=e=>Object.keys(k).forEach(t=>$(e,t)),O=(e=j)=>t=>{$(t,e)},E={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return O(a.toasterId||(s=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},T=(e,t)=>H("blank")(e,t);T.error=H("error"),T.success=H("success"),T.loading=H("loading"),T.custom=H("custom"),T.dismiss=(e,t)=>{let r={type:3,toastId:e};t?O(t)(r):_(r)},T.dismissAll=e=>T.dismiss(void 0,e),T.remove=(e,t)=>{let r={type:4,toastId:e};t?O(t)(r):_(r)},T.removeAll=e=>T.remove(void 0,e),T.promise=(e,t,r)=>{let s=T.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?T.success(a,{id:s,...r,...null==r?void 0:r.success}):T.dismiss(s),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?T.error(a,{id:s,...r,...null==r?void 0:r.error}):T.dismiss(s)}),e};var S=1e3,A=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,P=b`
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

  animation: ${A} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${P} 0.15s ease-out forwards;
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
`,L=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,B=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,I=b`
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
}`,F=f("div")`
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
`,R=f("div")`
  position: absolute;
`,U=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,X=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Z=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(X,null,t):t:"blank"===r?null:a.createElement(U,null,a.createElement(L,{...s}),"loading"!==r&&a.createElement(R,null,"error"===r?a.createElement(z,{...s}):a.createElement(F,{...s})))},q=f("div")`
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
`,G=f("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,W=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(Z,{toast:e}),o=a.createElement(G,{...e.ariaProps},g(e.message,e));return a.createElement(q,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:n,message:o}):a.createElement(a.Fragment,null,n,o))});s=a.createElement,d.p=void 0,m=s,x=void 0,h=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let n=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:n,className:t,style:r},i)},J=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&s(k[t]),N.push([t,s]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||E[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=S)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&T.dismiss(r.id);return}return setTimeout(()=>T.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let o=(0,a.useCallback)(O(t),[t]),l=(0,a.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,a.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,a.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),p=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:p}}})(r,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let n,o,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),p=(n=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return a.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:p},"custom"===r.type?g(r.message,r):i?i(r):a.createElement(W,{toast:r,position:l}))}))},"default",0,T,"toast",0,T],5766)},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:o,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[n],o),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),a=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:n,icon:o,trend:l,sparkline:d,color:c="primary",description:p,className:u}){let m=i[c],x=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",u),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",m.bg,m.border),children:o&&(0,t.jsx)(o,{className:(0,r.cn)("w-5 h-5",m.text)})}),x&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(a.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(a.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",m.text),children:n}),p&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:p}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:m.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:m.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:m.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},98706,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={sm:"w-8 h-8 text-xs",md:"w-10 h-10 text-sm",lg:"w-12 h-12 text-base"};e.s(["Avatar",0,function({src:e,alt:a="",name:i,size:n="md",className:o}){let l=i?i.split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase():"?";return e?(0,t.jsx)("img",{src:e,alt:a,className:(0,r.cn)("rounded-full object-cover border border-border",s[n],o)}):(0,t.jsx)("div",{className:(0,r.cn)("rounded-full bg-primary-100 text-primary flex items-center justify-center font-medium border border-primary-200",s[n],o),children:l})}])},5434,e=>{"use strict";var t=e.i(43476),r=e.i(22016),s=e.i(50719),a=e.i(98706),i=e.i(96395),n=e.i(31539),o=e.i(81604);e.s(["default",0,function({title:e,subtitle:l}){let{theme:d,toggleTheme:c}=(0,i.useThemeStore)(),p=(0,n.useSearchStore)(e=>e.toggleSearch);return(0,t.jsx)("header",{className:"sticky top-0 z-20 bg-surface/60 border-b border-border",children:(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 py-4",children:[(0,t.jsxs)("div",{children:[e&&(0,t.jsx)("h1",{className:"text-xl font-semibold text-text",children:e}),l&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-0.5",children:l})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)("button",{type:"button",onClick:p,className:"p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:(0,t.jsx)(s.HiSearch,{className:"w-5 h-5"})}),(0,t.jsx)("button",{type:"button",onClick:c,className:"p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:"dark"===d?(0,t.jsx)(s.HiSun,{className:"w-5 h-5"}):(0,t.jsx)(s.HiMoon,{className:"w-5 h-5"})}),(0,t.jsxs)(r.default,{href:"/teacher/notifications",className:"relative p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:[(0,t.jsx)(s.HiBell,{className:"w-5 h-5"}),(0,t.jsx)("span",{className:"absolute top-2 right-2 w-2 h-2 bg-error rounded-full"})]}),(0,t.jsx)(r.default,{href:"/teacher/settings",className:"mr-3",children:(0,t.jsx)(a.Avatar,{src:o.mockTeacher.avatar,name:o.mockTeacher.name,size:"sm"})})]})]})})}])},49838,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),a=e.i(50719),i=e.i(5766),n=e.i(5434),o=e.i(39964),l=e.i(96640),d=e.i(97591);let c={whatsapp:"واتساب",email:"بريد إلكتروني",sms:"رسالة نصية"},p={whatsapp:a.HiOutlinePhone,email:a.HiOutlineMail,sms:a.HiOutlineBell},u={whatsapp:"text-success",email:"text-primary",sms:"text-warning"},m={whatsapp:"bg-success/10 border-success/30",email:"bg-primary/10 border-primary/30",sms:"bg-warning/10 border-warning/30"},x={exam:"امتحانات",homework:"واجبات",reminder:"تذكيرات",result:"نتائج",promotion:"عروض وتخفيضات"},h=[{id:"p1",event:"exam",label:"مواعيد الامتحانات",description:"إشعارات بمواعيد الامتحانات القادمة",channels:["whatsapp","email"]},{id:"p2",event:"homework",label:"الواجبات الجديدة",description:"تنبيه عند إضافة واجب جديد",channels:["whatsapp"]},{id:"p3",event:"reminder",label:"تذكير بالمذاكرة",description:"تذكير يومي بخطة المذاكرة",channels:["whatsapp","sms"]},{id:"p4",event:"result",label:"إعلان النتائج",description:"إشعار فوري عند ظهور النتائج",channels:["whatsapp","email","sms"]},{id:"p5",event:"promotion",label:"العروض والخصومات",description:"أحدث عروض الكتب والكورسات",channels:["email"]}],b=[{id:"l1",message:"تذكير: امتحان الكيمياء غداً الساعة 10 صباحاً",channel:"whatsapp",status:"sent",date:"منذ 5 دقائق",type:"exam"},{id:"l2",message:"تم إضافة واجب جديد في الفيزياء",channel:"whatsapp",status:"sent",date:"منذ ساعتين",type:"homework"},{id:"l3",message:"تذكير بخطة المذاكرة اليومية",channel:"sms",status:"sent",date:"منذ 3 ساعات",type:"reminder"},{id:"l4",message:"نتيجة امتحان الرياضيات متاحة الآن",channel:"email",status:"failed",date:"منذ 5 ساعات",type:"result"},{id:"l5",message:"خصم 20% على الكتب الخارجية",channel:"whatsapp",status:"sent",date:"منذ يوم",type:"promotion"},{id:"l6",message:"تذكير: امتحان الفيزياء بعد غد",channel:"whatsapp",status:"pending",date:"قيد الإرسال",type:"exam"}],f={sent:{label:"تم الإرسال",variant:"success"},failed:{label:"فشل",variant:"error"},pending:{label:"قيد الإرسال",variant:"neutral"}},g={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.05}}},y={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,v]=(0,r.useState)(h),[j,w]=(0,r.useState)(!1),N=b.filter(e=>"sent"===e.status).length,C=b.filter(e=>"failed"===e.status).length,k=e.filter(e=>e.channels.length>0).length;return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(n.default,{title:"الإشعارات والتنبيهات",subtitle:"تحكم في إشعارات واتساب والبريد الإلكتروني"}),(0,t.jsx)("div",{className:"p-6 md:p-8 max-w-5xl mx-auto space-y-6",children:(0,t.jsxs)(s.motion.div,{variants:g,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsxs)(s.motion.div,{variants:y,className:"grid grid-cols-1 sm:grid-cols-4 gap-5",children:[(0,t.jsx)(d.StatsCard,{title:"الإشعارات المرسلة",value:N,icon:a.HiOutlineCheckCircle,color:"success"}),(0,t.jsx)(d.StatsCard,{title:"الفاشلة",value:C,icon:a.HiOutlineXCircle,color:"error"}),(0,t.jsx)(d.StatsCard,{title:"التنبيهات المفعلة",value:k,icon:a.HiOutlineClock,color:"primary"}),(0,t.jsx)(d.StatsCard,{title:"قنوات الإرسال",value:"3",icon:a.HiOutlinePhone,color:"info"})]}),(0,t.jsx)(s.motion.div,{variants:y,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)(o.CardTitle,{children:"رقم واتساب للتواصل"}),(0,t.jsxs)("button",{type:"button",onClick:()=>{w(!0),i.toast.loading("جاري إرسال إشعار تجريبي...",{id:"test"}),setTimeout(()=>{w(!1),i.toast.success("تم إرسال الإشعار التجريبي عبر واتساب!",{id:"test"})},1500)},disabled:j,className:"inline-flex items-center gap-2 px-4 py-2 bg-success text-white rounded-xl text-xs font-medium hover:bg-emerald-600 transition-all disabled:opacity-50",children:[(0,t.jsx)(a.HiOutlinePhone,{className:"w-4 h-4"}),j?"جاري الإرسال...":"إرسال إشعار تجريبي"]})]})}),(0,t.jsx)(o.CardContent,{children:(0,t.jsxs)("div",{className:"flex items-center gap-4 p-4 rounded-xl bg-success/5 border border-success/20",children:[(0,t.jsx)("div",{className:"w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center",children:(0,t.jsx)(a.HiOutlinePhone,{className:"w-6 h-6 text-success"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-bold text-text",children:"+20 10 1234 5678"}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"سيتم إرسال جميع الإشعارات إلى هذا الرقم عبر واتساب وتطبيقات التواصل"})]})]})})]})}),(0,t.jsx)(s.motion.div,{variants:y,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"إعدادات الإشعارات"})}),(0,t.jsx)(o.CardContent,{children:(0,t.jsx)("div",{className:"space-y-3",children:e.map(e=>(0,t.jsxs)("div",{className:"p-5 rounded-xl bg-surface-secondary border border-border/60",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.label}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.description})]}),(0,t.jsx)(l.Badge,{variant:"info",size:"sm",children:x[e.event]})]}),(0,t.jsx)("div",{className:"flex gap-3",children:["whatsapp","email","sms"].map(r=>{let s=p[r],i=e.channels.includes(r);return(0,t.jsxs)("button",{type:"button",onClick:()=>{var t;return t=e.id,void v(e=>e.map(e=>{if(e.id!==t)return e;let s=e.channels.includes(r);return{...e,channels:s?e.channels.filter(e=>e!==r):[...e.channels,r]}}))},className:`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${i?m[r]+" "+u[r]:"border-border text-text-tertiary bg-surface"}`,children:[(0,t.jsx)(s,{className:"w-4 h-4"}),c[r],i?(0,t.jsx)(a.HiOutlineCheckCircle,{className:"w-3 h-3"}):(0,t.jsx)(a.HiOutlineXCircle,{className:"w-3 h-3"})]},r)})})]},e.id))})})]})}),(0,t.jsx)(s.motion.div,{variants:y,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"سجل الإشعارات"})}),(0,t.jsx)(o.CardContent,{children:(0,t.jsx)("div",{className:"space-y-2",children:b.map(e=>{let r=p[e.channel],s=f[e.status];return(0,t.jsxs)("div",{className:"flex items-center gap-3 p-4 rounded-xl bg-surface-secondary border border-border/60",children:[(0,t.jsx)("div",{className:`w-9 h-9 rounded-lg flex items-center justify-center ${"sent"===e.status?"bg-success/10":"failed"===e.status?"bg-error/10":"bg-warning/10"}`,children:(0,t.jsx)(r,{className:`w-4 h-4 ${u[e.channel]}`})}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text truncate",children:e.message}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.date})]}),(0,t.jsx)(l.Badge,{variant:s.variant,size:"sm",children:s.label})]},e.id)})})})]})})]})})]})}])}]);