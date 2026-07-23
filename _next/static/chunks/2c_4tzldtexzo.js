(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(46932),i=e.i(50719);let a={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:n,icon:o,trend:c,sparkline:d,color:l="primary",description:p,className:x}){let m=a[l],u=void 0===c?null:"number"==typeof c?{value:Math.abs(c),positive:c>=0}:{value:c.value,positive:c.isPositive};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",x),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",m.bg,m.border),children:o&&(0,t.jsx)(o,{className:(0,r.cn)("w-5 h-5",m.text)})}),u&&(0,t.jsxs)(s.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",u.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[u.positive?(0,t.jsx)(i.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(i.HiTrendingDown,{className:"w-3.5 h-3.5"}),u.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(s.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",m.text),children:n}),p&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:p}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${l}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:m.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:m.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:m.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${l}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var s,i=e.i(71645);let a={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let r="",s="",i="";for(let a in e){let n=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+n+";":s+="f"==a[1]?d(n,a):a+"{"+d(n,"k"==a[1]?"":t)+"}":"object"==typeof n?s+=d(n,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=n&&(a="-"==a[1]?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=d.p?d.p(a,n):a+":"+n+";")}return r+(t&&i?t+"{"+i+"}":i)+s},l={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function x(e){let t,r,s=this||{},i=e.call?e(s.p):e;return((e,t,r,s,i)=>{var a;let x=p(e),m=l[x]||(l[x]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(x));if(!l[m]){let t=x!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?s.shift():t[3]?(r=t[3].replace(c," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(c," ").trim();return s[0]})(e);l[m]=d(i?{["@keyframes "+m]:t}:t,r?"":"."+m)}let u=r&&l.g;return r&&(l.g=l[m]),a=l[m],u?t.data=t.data.replace(u,a):-1===t.data.indexOf(a)&&(t.data=s?a+t.data:t.data+a),m})(i.unshift?i.raw?(t=[].slice.call(arguments,1),r=s.p,i.reduce((e,s,i)=>{let a=t[i];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==a?"":a)},"")):i.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):i,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||a})(s.target),s.g,s.o,s.k)}x.bind({g:1});let m,u,b,h=x.bind({k:1});function f(e,t){let r=this||{};return function(){let s=arguments;function i(a,n){let o=Object.assign({},a),c=o.className||i.className;r.p=Object.assign({theme:u&&u()},o),r.o=/go\d/.test(c),o.className=x.apply(r,s)+(c?" "+c:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),b&&d[0]&&b(o),m(d,o)}return t?t(i):i}}var y=(e,t)=>"function"==typeof e?e(t):e,g=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},k=(e,t=j)=>{$[t]=N($[t]||C,e),w.forEach(([e,r])=>{e===t&&r($[t])})},_=e=>Object.keys($).forEach(t=>k(e,t)),E=(e=j)=>t=>{k(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let s,i=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||g()}))(t,e,r);return E(i.toasterId||(s=i.id,Object.keys($).find(e=>$[e].toasts.some(e=>e.id===s))))({type:2,toast:i}),i.id},A=(e,t)=>H("blank")(e,t);A.error=H("error"),A.success=H("success"),A.loading=H("loading"),A.custom=H("custom"),A.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):_(r)},A.dismissAll=e=>A.dismiss(void 0,e),A.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):_(r)},A.removeAll=e=>A.remove(void 0,e),A.promise=(e,t,r)=>{let s=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?y(t.success,e):void 0;return i?A.success(i,{id:s,...r,...null==r?void 0:r.success}):A.dismiss(s),e}).catch(e=>{let i=t.error?y(t.error,e):void 0;i?A.error(i,{id:s,...r,...null==r?void 0:r.error}):A.dismiss(s)}),e};var D=1e3,S=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,T=h`
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

  animation: ${S} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${L} 0.15s ease-out forwards;
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
    animation: ${T} 0.15s ease-out forwards;
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
`,I=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${z} 1s linear infinite;
`,M=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=h`
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
}`,U=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,F=f("div")`
  position: absolute;
`,R=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=h`
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
`,q=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?i.createElement(Z,null,t):t:"blank"===r?null:i.createElement(R,null,i.createElement(I,{...s}),"loading"!==r&&i.createElement(F,null,"error"===r?i.createElement(P,{...s}):i.createElement(U,{...s})))},G=f("div")`
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
`,Y=i.memo(({toast:e,position:t,style:r,children:s})=>{let a=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,i]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=i.createElement(q,{toast:e}),o=i.createElement(W,{...e.ariaProps},y(e.message,e));return i.createElement(G,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof s?s({icon:n,message:o}):i.createElement(i.Fragment,null,n,o))});s=i.createElement,d.p=void 0,m=s,u=void 0,b=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:s,children:a})=>{let n=i.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return i.createElement("div",{ref:n,className:t,style:r},a)},Q=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:a,toasterId:n,containerStyle:o,containerClassName:c})=>{let{toasts:d,handlers:l}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,i.useState)($[t]||C),a=(0,i.useRef)($[t]);(0,i.useEffect)(()=>(a.current!==$[t]&&s($[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,s,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...r,toasts:n}})(e,t),a=(0,i.useRef)(new Map).current,n=(0,i.useCallback)((e,t=D)=>{if(a.has(e))return;let r=setTimeout(()=>{a.delete(e),o({type:4,toastId:e})},t);a.set(e,r)},[]);(0,i.useEffect)(()=>{if(s)return;let e=Date.now(),i=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&A.dismiss(r.id);return}return setTimeout(()=>A.dismiss(r.id,t),s)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let o=(0,i.useCallback)(E(t),[t]),c=(0,i.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,i.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),l=(0,i.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),p=(0,i.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:i=8,defaultPosition:a}=t||{},n=r.filter(t=>(t.position||a)===(e.position||a)&&t.height),o=n.findIndex(t=>t.id===e.id),c=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[c+1]:[0,c]).reduce((e,t)=>e+(t.height||0)+i,0)},[r]);return(0,i.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:c,endPause:l,calculateOffset:p}}})(r,n);return i.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:c,onMouseEnter:l.startPause,onMouseLeave:l.endPause},d.map(r=>{let n,o,c=r.position||t,d=l.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),p=(n=c.includes("top"),o=c.includes("center")?{justifyContent:"center"}:c.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return i.createElement(J,{id:r.id,key:r.id,onHeightUpdate:l.updateHeight,className:r.visible?Q:"",style:p},"custom"===r.type?y(r.message,r):a?a(r):i.createElement(Y,{toast:r,position:c}))}))},"default",0,A,"toast",0,A],5766)},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},i={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:a="default",size:n="md",className:o,dot:c=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[a],i[n],o),children:[c&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:i=!1,onClick:a}){return(0,t.jsx)("div",{onClick:a,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",i&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",a&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:i,className:a,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",a),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),i&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:i})]})}])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:i="لم يتم العثور على أي عناصر بعد.",icon:a=s.HiOutlineInbox,action:n,className:o}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",o),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(a,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:i}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},48128,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),i=e.i(50719),a=e.i(5766),n=e.i(37757),o=e.i(39964),c=e.i(96640),d=e.i(97591),l=e.i(40803);let p=[{id:"j1",date:"2026-07-18",description:"سداد اشتراك أحمد محمد",debit:2e3,credit:0,account:"صندوق",type:"receipt"},{id:"j2",date:"2026-07-18",description:"إيجار مقر السنتر",debit:0,credit:5e3,account:"مصروفات",type:"payment"},{id:"j3",date:"2026-07-17",description:"مرتب مدرس كيمياء",debit:0,credit:3500,account:"رواتب",type:"payment"},{id:"j4",date:"2026-07-17",description:"بيع كتب خارجية",debit:1500,credit:0,account:"صندوق",type:"receipt"},{id:"j5",date:"2026-07-16",description:"فاتورة كهرباء",debit:0,credit:850,account:"مصروفات",type:"payment"},{id:"j6",date:"2026-07-16",description:"سداد قسط طالب",debit:1e3,credit:0,account:"بنك",type:"receipt"},{id:"j7",date:"2026-07-15",description:"شراء أدوات مكتبية",debit:0,credit:450,account:"مصروفات",type:"payment"},{id:"j8",date:"2026-07-15",description:"اشتراك طالب جديد",debit:2500,credit:0,account:"صندوق",type:"receipt"}],x=[{name:"صندوق",balance:12500,type:"مدين"},{name:"بنك",balance:45e3,type:"مدين"},{name:"مصروفات",balance:-18500,type:"دائن"},{name:"رواتب",balance:-14500,type:"دائن"},{name:"إيرادات",balance:-52e3,type:"دائن"}],m={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.05}}},u={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,b]=(0,r.useState)("journal"),h=p.reduce((e,t)=>e+t.debit,0),f=p.reduce((e,t)=>e+t.credit,0);return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(n.PageHeader,{title:"المحاسبة",description:"دفتر اليومية - الصندوق - البنك - سندات القبض والصرف"}),(0,t.jsx)("div",{className:"p-4 md:p-6 max-w-6xl mx-auto space-y-6",children:(0,t.jsxs)(s.motion.div,{variants:m,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsxs)(s.motion.div,{variants:u,className:"grid grid-cols-1 sm:grid-cols-4 gap-3",children:[(0,t.jsx)(d.StatsCard,{title:"رصيد الصندوق",value:"12,500 ج.ظ…",icon:i.HiOutlineCash,color:"success"}),(0,t.jsx)(d.StatsCard,{title:"رصيد البنك",value:"45,000 ج.ظ…",icon:i.HiOutlineCash,color:"primary"}),(0,t.jsx)(d.StatsCard,{title:"إجمالي المدين",value:`${h.toLocaleString()} ج.ظ…`,icon:i.HiOutlineArrowUp,color:"success"}),(0,t.jsx)(d.StatsCard,{title:"إجمالي الدائن",value:`${f.toLocaleString()} ج.ظ…`,icon:i.HiOutlineArrowDown,color:"error"})]}),(0,t.jsx)(s.motion.div,{variants:u,className:"flex gap-2",children:["journal","accounts","vouchers"].map(r=>(0,t.jsx)("button",{type:"button",onClick:()=>b(r),className:`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${e===r?"border-primary bg-primary/10 text-primary":"border-border text-text-tertiary hover:bg-surface-secondary"}`,children:"journal"===r?"دفتر اليومية":"accounts"===r?"شجرة الحسابات":"سندات"},r))}),"journal"===e&&(0,t.jsx)(s.motion.div,{variants:u,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"دفتر اليومية"})}),(0,t.jsx)(o.CardContent,{children:0===p.length?(0,t.jsx)(l.EmptyState,{icon:i.HiOutlineCash,title:"لا يوجد قيود محاسبية",description:"لم يتم تسجيل أي قيود محاسبية بعد"}):(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border",children:[(0,t.jsx)("th",{className:"text-right py-2 px-2 text-xs text-text-tertiary",children:"التاريخ"}),(0,t.jsx)("th",{className:"text-right py-2 px-2 text-xs text-text-tertiary",children:"البيان"}),(0,t.jsx)("th",{className:"text-right py-2 px-2 text-xs text-text-tertiary",children:"الحساب"}),(0,t.jsx)("th",{className:"text-center py-2 px-2 text-xs text-text-tertiary",children:"مدين"}),(0,t.jsx)("th",{className:"text-center py-2 px-2 text-xs text-text-tertiary",children:"دائن"}),(0,t.jsx)("th",{className:"text-center py-2 px-2 text-xs text-text-tertiary",children:"النوع"})]})}),(0,t.jsx)("tbody",{children:p.map((e,r)=>(0,t.jsxs)("tr",{className:"border-b border-border last:border-0 hover:bg-surface-secondary transition-colors",children:[(0,t.jsx)("td",{className:"py-2.5 px-2 text-xs text-text-tertiary",children:e.date}),(0,t.jsx)("td",{className:"py-2.5 px-2 text-sm text-text",children:e.description}),(0,t.jsx)("td",{className:"py-2.5 px-2 text-xs text-text",children:e.account}),(0,t.jsx)("td",{className:"py-2.5 px-2 text-center text-sm font-mono text-success",children:e.debit>0?e.debit.toLocaleString():"-"}),(0,t.jsx)("td",{className:"py-2.5 px-2 text-center text-sm font-mono text-error",children:e.credit>0?e.credit.toLocaleString():"-"}),(0,t.jsx)("td",{className:"py-2.5 px-2 text-center",children:(0,t.jsx)(c.Badge,{variant:"receipt"===e.type?"success":"error",size:"sm",children:"receipt"===e.type?"قبض":"صرف"})})]},e.id))})]})})})]})}),"accounts"===e&&(0,t.jsx)(s.motion.div,{variants:u,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"شجرة الحسابات"})}),(0,t.jsx)(o.CardContent,{children:(0,t.jsx)("div",{className:"space-y-2",children:x.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsx)("span",{className:"text-sm font-medium text-text",children:e.name}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("span",{className:`text-sm font-bold ${e.balance>0?"text-success":"text-error"}`,children:[Math.abs(e.balance).toLocaleString()," ج.ظ…"]}),(0,t.jsx)(c.Badge,{variant:"مدين"===e.type?"success":"error",size:"sm",children:e.type})]})]},e.name))})})]})}),"vouchers"===e&&(0,t.jsx)(s.motion.div,{variants:u,children:(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)(o.CardTitle,{children:"سندات القبض والصرف"}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>a.default.success("تم إنشاء سند قبض جديد"),className:"flex items-center gap-1 px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-medium hover:bg-success/20 transition-all",children:[(0,t.jsx)(i.HiOutlinePlus,{className:"w-3.5 h-3.5"})," سند قبض"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>a.default.success("تم إنشاء سند صرف جديد"),className:"flex items-center gap-1 px-3 py-1.5 rounded-lg bg-error/10 text-error text-xs font-medium hover:bg-error/20 transition-all",children:[(0,t.jsx)(i.HiOutlinePlus,{className:"w-3.5 h-3.5"})," سند صرف"]})]})]})}),(0,t.jsx)(o.CardContent,{children:(0,t.jsx)("div",{className:"space-y-2",children:p.slice(0,6).map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:`w-9 h-9 rounded-lg flex items-center justify-center ${"receipt"===e.type?"bg-success/10":"bg-error/10"}`,children:"receipt"===e.type?(0,t.jsx)(i.HiOutlineArrowUp,{className:"w-4 h-4 text-success"}):(0,t.jsx)(i.HiOutlineArrowDown,{className:"w-4 h-4 text-error"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.description}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:[e.date," - ",e.account]})]})]}),(0,t.jsxs)("span",{className:`text-sm font-bold ${"receipt"===e.type?"text-success":"text-error"}`,children:["receipt"===e.type?"+":"-",e.debit||e.credit," ج.ظ…"]})]},e.id))})})]})})]})})]})}])}]);