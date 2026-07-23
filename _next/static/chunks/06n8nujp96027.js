(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(46932),s=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:n,icon:o,trend:d,sparkline:l,color:c="primary",description:u,className:p}){let m=i[c],x=void 0===d?null:"number"==typeof d?{value:Math.abs(d),positive:d>=0}:{value:d.value,positive:d.isPositive};return(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",p),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",m.bg,m.border),children:o&&(0,t.jsx)(o,{className:(0,r.cn)("w-5 h-5",m.text)})}),x&&(0,t.jsxs)(a.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(s.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(s.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(a.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",m.text),children:n}),u&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:u}),l&&l.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${l.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:m.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:m.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" "),fill:"none",stroke:m.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" ")} L${l.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,l=(e,t)=>{let r="",a="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":a+="f"==i[1]?l(n,i):i+"{"+l(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=l(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=l.p?l.p(i,n):i+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let p=u(e),m=c[p]||(c[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!c[m]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?a.shift():t[3]?(r=t[3].replace(d," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);c[m]=l(s?{["@keyframes "+m]:t}:t,r?"":"."+m)}let x=r&&c.g;return r&&(c.g=c[m]),i=c[m],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}p.bind({g:1});let m,x,h,b=p.bind({k:1});function f(e,t){let r=this||{};return function(){let a=arguments;function s(i,n){let o=Object.assign({},i),d=o.className||s.className;r.p=Object.assign({theme:x&&x()},o),r.o=/go\d/.test(d),o.className=p.apply(r,a)+(d?" "+d:""),t&&(o.ref=n);let l=e;return e[0]&&(l=o.as||e,delete o.as),h&&l[0]&&h(o),m(l,o)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},C=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},$=(e,t=j)=>{k[t]=w(k[t]||N,e),C.forEach(([e,r])=>{e===t&&r(k[t])})},E=e=>Object.keys(k).forEach(t=>$(e,t)),_=(e=j)=>t=>{$(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return _(s.toasterId||(a=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},S=(e,t)=>H("blank")(e,t);S.error=H("error"),S.success=H("success"),S.loading=H("loading"),S.custom=H("custom"),S.dismiss=(e,t)=>{let r={type:3,toastId:e};t?_(t)(r):E(r)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let r={type:4,toastId:e};t?_(t)(r):E(r)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,r)=>{let a=S.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?S.success(s,{id:a,...r,...null==r?void 0:r.success}):S.dismiss(a),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?S.error(s,{id:a,...r,...null==r?void 0:r.error}):S.dismiss(a)}),e};var T=1e3,D=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,A=b`
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

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${P} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=b`
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
  animation: ${B} 1s linear infinite;
`,L=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,M=b`
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

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${M} 0.2s ease-out forwards;
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
}`,Z=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,q=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(Z,null,t):t:"blank"===r?null:s.createElement(U,null,s.createElement(I,{...a}),"loading"!==r&&s.createElement(R,null,"error"===r?s.createElement(z,{...a}):s.createElement(F,{...a})))},G=f("div")`
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
`,Y=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=s.createElement(q,{toast:e}),o=s.createElement(W,{...e.ariaProps},g(e.message,e));return s.createElement(G,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:n,message:o}):s.createElement(s.Fragment,null,n,o))});a=s.createElement,l.p=void 0,m=a,x=void 0,h=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let n=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:n,className:t,style:r},i)},Q=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:n,containerStyle:o,containerClassName:d})=>{let{toasts:l,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(k[t]||N),i=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(i.current!==k[t]&&a(k[t]),C.push([t,a]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,s.useRef)(new Map).current,n=(0,s.useCallback)((e,t=T)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&S.dismiss(r.id);return}return setTimeout(()=>S.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let o=(0,s.useCallback)(_(t),[t]),d=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),l=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,s.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),d=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[d+1]:[0,d]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:l,startPause:d,endPause:c,calculateOffset:u}}})(r,n);return s.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:d,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let n,o,d=r.position||t,l=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(n=d.includes("top"),o=d.includes("center")?{justifyContent:"center"}:d.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${l*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return s.createElement(J,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Q:"",style:u},"custom"===r.type?g(r.message,r):i?i(r):s.createElement(Y,{toast:r,position:d}))}))},"default",0,S,"toast",0,S],5766)},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:o,dot:d=!1,pulse:l=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",a[i],s[n],o),children:[d&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",l&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:a,hover:s=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",a),children:e})},"CardContent",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",a),children:e})},"CardDescription",0,function({children:e,className:a}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",a),children:e})},"CardFooter",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",a),children:e})},"CardHeader",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",a),children:e})},"CardTitle",0,function({children:e,className:a}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",a),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:a,children:s,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),a&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:a})]}),s&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:s})]})}])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:s="لم يتم العثور على أي عناصر بعد.",icon:i=a.HiOutlineInbox,action:n,className:o}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",o),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:s}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},47647,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Table",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("w-full overflow-auto",a),children:(0,t.jsx)("table",{className:"w-full border-collapse",children:e})})}])},46500,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(50719),i=e.i(5766),n=e.i(37757),o=e.i(39964),d=e.i(96640),l=e.i(97591),c=e.i(47647),u=e.i(40803);let p=["مجموعة 1","مجموعة 2","مجموعة 3","مجموعة 4"],m=["الكيمياء","الفيزياء","الرياضيات","العربي","الإنجليزي"],x=["كل الطلاب","حسب المجموعة","حسب الكورس","المتأخرون","الغياب"],h=[{id:"m1",title:"تذكير بامتحان الكيمياء",audience:"مجموعة 1",date:"2026-07-20 10:00",status:"scheduled"},{id:"m2",title:"تنبيه للغياب",audience:"الطلاب الغائبين",date:"2026-07-19 08:00",status:"sent"},{id:"m3",title:"استلام واجبات",audience:"المتأخرون",date:"2026-07-22 14:00",status:"draft"},{id:"m4",title:"اجتماع أولياء الأمور",audience:"كل الطلاب",date:"2026-07-25 18:00",status:"scheduled"},{id:"m5",title:"نتائج الامتحان",audience:"مجموعة 3",date:"2026-07-18 09:00",status:"sent"}],b=[{id:"w1",student:"أحمد محمد",phone:"01001234567",message:"تذكير بموعد الامتحان",date:"2026-07-18 10:30",status:"delivered"},{id:"w2",student:"مريم أحمد",phone:"01002345678",message:"نتيجة الامتحان",date:"2026-07-17 14:00",status:"sent"},{id:"w3",student:"يوسف علي",phone:"01003456789",message:"تنبيه غياب",date:"2026-07-16 08:15",status:"failed"},{id:"w4",student:"سارة خالد",phone:"01004567890",message:"استلام واجب",date:"2026-07-15 12:45",status:"delivered"},{id:"w5",student:"عمر حسن",phone:"01005678901",message:"تأكيد الحضور",date:"2026-07-14 09:00",status:"sent"}],f=[{id:"s1",student:"ندى سامي",phone:"01006789012",message:"تنبيه بامتحان الفيزياء",date:"2026-07-18 11:00",status:"delivered"},{id:"s2",student:"عبدالرحمن نور",phone:"01007890123",message:"موعد الحصة القادمة",date:"2026-07-17 16:30",status:"sent"},{id:"s3",student:"ليلى إبراهيم",phone:"01008901234",message:"نتيجة الامتحان",date:"2026-07-16 10:00",status:"failed"},{id:"s4",student:"محمد كريم",phone:"01009012345",message:"تذكير بالواجب",date:"2026-07-15 08:30",status:"delivered"}],g=[{id:"e1",recipient:"أحمد محمد",email:"ahmed@example.com",subject:"تقرير الأداء الأكاديمي",date:"2026-07-18",status:"opened"},{id:"e2",recipient:"مريم أحمد",email:"maryam@example.com",subject:"نتائج الامتحانات",date:"2026-07-17",status:"sent"},{id:"e3",recipient:"ولاية يوسف علي",email:"parent@example.com",subject:"دعوة اجتماع",date:"2026-07-16",status:"failed"},{id:"e4",recipient:"سارة خالد",email:"sara@example.com",subject:"تقرير الحضور",date:"2026-07-15",status:"opened"},{id:"e5",recipient:"عمر حسن",email:"omar@example.com",subject:"إشعار بالقسط",date:"2026-07-14",status:"sent"}],y=[{id:"im1",sender:"أ. خالد صقر",subject:"تعديل جدول الحصص",date:"2026-07-18",read:!1},{id:"im2",sender:"الإدارة",subject:"اجتماع المدرسين",date:"2026-07-17",read:!1},{id:"im3",sender:"أ. أحمد سمير",subject:"طلب إجازة",date:"2026-07-16",read:!0},{id:"im4",sender:"شؤون الطلاب",subject:"بيان غياب الطلاب",date:"2026-07-15",read:!0},{id:"im5",sender:"المحاسبة",subject:"تسوية الرواتب",date:"2026-07-14",read:!1}],v=["رسائل","بريد داخلي","واتساب","رسائل نصية","بريد إلكتروني"],j={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.04}}},w={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,C]=(0,r.useState)("رسائل"),[N,k]=(0,r.useState)("كل الطلاب"),[$,E]=(0,r.useState)("مجموعة 1"),[_,O]=(0,r.useState)("الكيمياء"),[H,S]=(0,r.useState)(""),[T,D]=(0,r.useState)(""),A=e=>({sent:{variant:"success",label:"مرسلة"},delivered:{variant:"success",label:"تم التسليم"},opened:{variant:"primary",label:"تم الفتح"},failed:{variant:"error",label:"فشل"},scheduled:{variant:"warning",label:"مجدولة"},draft:{variant:"neutral",label:"مسودة"}})[e]||{variant:"neutral",label:e};return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(n.PageHeader,{title:"مركز التواصل",description:"الرسائل - البريد الداخلي - واتساب - رسائل نصية - بريد إلكتروني"}),(0,t.jsx)("div",{className:"p-4 md:p-6 max-w-7xl mx-auto space-y-6",children:(0,t.jsxs)(a.motion.div,{variants:j,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsxs)(a.motion.div,{variants:w,className:"grid grid-cols-1 sm:grid-cols-5 gap-3",children:[(0,t.jsx)(l.StatsCard,{title:"الرسائل المرسلة",value:12,icon:s.HiOutlineCheckCircle,color:"success"}),(0,t.jsx)(l.StatsCard,{title:"المجدولة",value:2,icon:s.HiOutlineClock,color:"warning"}),(0,t.jsx)(l.StatsCard,{title:"رسائل واتساب",value:b.length,icon:s.HiOutlineChat,color:"primary"}),(0,t.jsx)(l.StatsCard,{title:"رسائل نصية",value:f.length,icon:s.HiOutlinePhone,color:"info"}),(0,t.jsx)(l.StatsCard,{title:"بريد إلكتروني",value:g.length,icon:s.HiOutlineMail,color:"info"})]}),(0,t.jsx)(a.motion.div,{variants:w,className:"flex flex-wrap gap-2",children:v.map(r=>(0,t.jsx)("button",{type:"button",onClick:()=>C(r),className:`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${e===r?"border-primary bg-primary/10 text-primary":"border-border text-text-tertiary hover:bg-surface-secondary"}`,children:r},r))}),"رسائل"===e&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.motion.div,{variants:w,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"إنشاء رسالة جديدة"})}),(0,t.jsxs)(o.CardContent,{className:"space-y-4",children:[(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:x.map(e=>(0,t.jsx)("button",{type:"button",onClick:()=>k(e),className:`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${N===e?"border-primary bg-primary/10 text-primary":"border-border text-text-tertiary hover:bg-surface-secondary"}`,children:e},e))}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-3",children:["حسب المجموعة"===N&&(0,t.jsx)("select",{value:$,onChange:e=>E(e.target.value),className:"bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/30",children:p.map(e=>(0,t.jsx)("option",{value:e,children:e},e))}),"حسب الكورس"===N&&(0,t.jsx)("select",{value:_,onChange:e=>O(e.target.value),className:"bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/30",children:m.map(e=>(0,t.jsx)("option",{value:e,children:e},e))})]}),(0,t.jsx)("textarea",{value:H,onChange:e=>S(e.target.value),placeholder:"اكتب رسالتك هنا...",rows:4,className:"w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"}),(0,t.jsxs)("div",{className:"flex items-center gap-3 flex-wrap",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlineCalendar,{className:"w-4 h-4 text-text-tertiary"}),(0,t.jsx)("input",{type:"datetime-local",value:T,onChange:e=>D(e.target.value),className:"bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/30"})]}),(0,t.jsxs)("button",{type:"button",onClick:()=>{H.trim()?(i.default.success(`تم إرسال الرسالة إلى ${N}`),S("")):i.default.error("الرجاء كتابة الرسالة")},className:"px-6 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlinePaperAirplane,{className:"w-4 h-4"})," إرسال الآن"]}),T&&(0,t.jsx)("button",{type:"button",onClick:()=>{H.trim()&&(i.default.success("تم جدولة الرسالة"),S(""),D(""))},className:"px-6 py-2 border border-primary text-primary rounded-xl text-sm font-medium hover:bg-primary/5 transition-all",children:"جدولة"})]})]})]})}),(0,t.jsx)(a.motion.div,{variants:w,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"الرسائل المجدولة والمرسلة"})}),(0,t.jsx)(o.CardContent,{children:(0,t.jsx)("div",{className:"space-y-2",children:h.map(e=>{let r=A(e.status);return(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.title}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:[e.audience," - ",e.date]})]}),(0,t.jsx)(d.Badge,{variant:r.variant,children:r.label})]},e.id)})})})]})})]}),"واتساب"===e&&(0,t.jsx)(a.motion.div,{variants:w,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"سجل واتساب"})}),(0,t.jsx)(o.CardContent,{children:0===b.length?(0,t.jsx)(u.EmptyState,{icon:s.HiOutlineSupport,title:"لا يوجد سجل تواصل",description:"لم يتم تسجيل أي تواصل مع الطلاب أو أولياء الأمور"}):(0,t.jsx)(c.Table,{columns:[{key:"student",header:"الطالب"},{key:"phone",header:"رقم الهاتف",render:e=>(0,t.jsx)("span",{dir:"ltr",className:"text-sm",children:e.phone})},{key:"message",header:"الرسالة",render:e=>(0,t.jsx)("span",{className:"text-sm text-text-secondary truncate max-w-[200px] block",children:e.message})},{key:"date",header:"التاريخ"},{key:"status",header:"الحالة",render:e=>{let r=A(e.status);return(0,t.jsx)(d.Badge,{variant:r.variant,children:r.label})}}],data:b})})]})}),"رسائل نصية"===e&&(0,t.jsx)(a.motion.div,{variants:w,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"سجل الرسائل النصية"})}),(0,t.jsx)(o.CardContent,{children:0===f.length?(0,t.jsx)(u.EmptyState,{icon:s.HiOutlineSupport,title:"لا يوجد سجل تواصل",description:"لم يتم تسجيل أي تواصل مع الطلاب أو أولياء الأمور"}):(0,t.jsx)(c.Table,{columns:[{key:"student",header:"الطالب"},{key:"phone",header:"رقم الهاتف",render:e=>(0,t.jsx)("span",{dir:"ltr",className:"text-sm",children:e.phone})},{key:"message",header:"الرسالة",render:e=>(0,t.jsx)("span",{className:"text-sm text-text-secondary truncate max-w-[200px] block",children:e.message})},{key:"date",header:"التاريخ"},{key:"status",header:"الحالة",render:e=>{let r=A(e.status);return(0,t.jsx)(d.Badge,{variant:r.variant,children:r.label})}}],data:f})})]})}),"بريد إلكتروني"===e&&(0,t.jsx)(a.motion.div,{variants:w,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"سجل البريد الإلكتروني"})}),(0,t.jsx)(o.CardContent,{children:0===g.length?(0,t.jsx)(u.EmptyState,{icon:s.HiOutlineSupport,title:"لا يوجد سجل تواصل",description:"لم يتم تسجيل أي تواصل مع الطلاب أو أولياء الأمور"}):(0,t.jsx)(c.Table,{columns:[{key:"recipient",header:"المستلم"},{key:"email",header:"البريد",render:e=>(0,t.jsx)("span",{dir:"ltr",className:"text-sm text-text-secondary",children:e.email})},{key:"subject",header:"الموضوع"},{key:"date",header:"التاريخ"},{key:"status",header:"الحالة",render:e=>{let r=A(e.status);return(0,t.jsx)(d.Badge,{variant:r.variant,children:r.label})}}],data:g})})]})}),"بريد داخلي"===e&&(0,t.jsx)(a.motion.div,{variants:w,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"البريد الداخلي"})}),(0,t.jsx)(o.CardContent,{children:0===y.length?(0,t.jsx)(u.EmptyState,{icon:s.HiOutlineSupport,title:"لا يوجد سجل تواصل",description:"لم يتم تسجيل أي تواصل مع الطلاب أو أولياء الأمور"}):(0,t.jsx)("div",{className:"space-y-1",children:y.map(e=>(0,t.jsxs)("div",{className:`flex items-center justify-between p-3 rounded-xl border transition-all ${e.read?"bg-surface border-border":"bg-primary/5 border-primary/20"}`,children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[!e.read&&(0,t.jsx)("span",{className:"w-2 h-2 rounded-full bg-primary shrink-0"}),(0,t.jsxs)("div",{className:e.read?"mr-5":"mr-2",children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.subject}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:["من: ",e.sender," - ",e.date]})]})]}),(0,t.jsx)(d.Badge,{variant:e.read?"default":"primary",size:"sm",children:e.read?"مقروء":"جديد"})]},e.id))})})]})})]})})]})}])}]);