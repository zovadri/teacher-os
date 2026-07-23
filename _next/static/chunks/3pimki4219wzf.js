(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(46932),s=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:l,sparkline:d,color:c="primary",description:p,className:u}){let m=i[c],x=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",u),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",m.bg,m.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",m.text)})}),x&&(0,t.jsxs)(a.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(s.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(s.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(a.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",m.text),children:o}),p&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:p}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:m.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:m.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:m.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function u(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let u=p(e),m=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!c[m]){let t=u!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);c[m]=d(s?{["@keyframes "+m]:t}:t,r?"":"."+m)}let x=r&&c.g;return r&&(c.g=c[m]),i=c[m],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}u.bind({g:1});let m,x,b,f=u.bind({k:1});function h(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;r.p=Object.assign({theme:x&&x()},n),r.o=/go\d/.test(l),n.className=u.apply(r,a)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),m(d,n)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},_=(e,t=j)=>{k[t]=w(k[t]||C,e),N.forEach(([e,r])=>{e===t&&r(k[t])})},$=e=>Object.keys(k).forEach(t=>_(e,t)),E=(e=j)=>t=>{_(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return E(s.toasterId||(a=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},H=(e,t)=>D("blank")(e,t);H.error=D("error"),H.success=D("success"),H.loading=D("loading"),H.custom=D("custom"),H.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):$(r)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):$(r)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,r)=>{let a=H.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?H.success(s,{id:a,...r,...null==r?void 0:r.success}):H.dismiss(a),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?H.error(s,{id:a,...r,...null==r?void 0:r.error}):H.dismiss(a)}),e};var S=1e3,I=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=f`
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
}`,z=h("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${P} 0.15s ease-out forwards;
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
`,L=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=h("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${L} 1s linear infinite;
`,R=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,T=f`
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

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${T} 0.2s ease-out forwards;
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
`,U=h("div")`
  position: absolute;
`,F=h("div")`
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
}`,X=h("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(X,null,t):t:"blank"===r?null:s.createElement(F,null,s.createElement(M,{...a}),"loading"!==r&&s.createElement(U,null,"error"===r?s.createElement(z,{...a}):s.createElement(B,{...a})))},Z=h("div")`
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
`,q=h("div")`
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
`];return{animation:t?`${f(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(K,{toast:e}),n=s.createElement(q,{...e.ariaProps},g(e.message,e));return s.createElement(Z,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});a=s.createElement,d.p=void 0,m=a,x=void 0,b=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},J=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(k[t]||C),i=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(i.current!==k[t]&&a(k[t]),N.push([t,a]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=S)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&H.dismiss(r.id);return}return setTimeout(()=>H.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,s.useCallback)(E(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,s.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),p=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:p}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,n,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),p=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:p},"custom"===r.type?g(r.message,r):i?i(r):s.createElement(W,{toast:r,position:l}))}))},"default",0,H,"toast",0,H],5766)},64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:s}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",s),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(a.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},n=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:n,leftIcon:l,rightIcon:d,className:c,disabled:p,children:u,...m},x)=>(0,t.jsxs)("button",{ref:x,disabled:p||n,className:(0,a.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],c),...m,children:[n?(0,t.jsx)(s.Spinner,{size:"sm"}):l,u,!n&&d]}));n.displayName="Button",e.s(["default",0,n])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",a[i],s[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:a,hover:s=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",a),children:e})},"CardContent",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",a),children:e})},"CardDescription",0,function({children:e,className:a}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",a),children:e})},"CardFooter",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",a),children:e})},"CardHeader",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",a),children:e})},"CardTitle",0,function({children:e,className:a}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",a),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:a,children:s,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),a&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:a})]}),s&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:s})]})}])},67073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(50719);let i=(0,r.forwardRef)(({label:e,error:r,options:i,placeholder:o,className:n,...l},d)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:d,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",n),...l,children:[o&&(0,t.jsx)("option",{value:"",children:o}),i.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(s.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));i.displayName="Select",e.s(["default",0,i])},7081,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(50719);let i=(0,r.forwardRef)(({value:e,onChange:i,placeholder:o="بحث...",className:n},l)=>{let[d,c]=(0,r.useState)(""),p=void 0!==e,u=p?e:d,m=e=>{p||c(e),i?.(e)};return(0,t.jsxs)("div",{className:(0,a.cn)("relative",n),children:[(0,t.jsx)(s.HiSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"}),(0,t.jsx)("input",{ref:l,value:u,onChange:e=>m(e.target.value),placeholder:o,className:"w-full bg-card border border-border rounded-[14px] pr-10 pl-9 py-2.5 text-sm text-text placeholder-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-200"}),u&&(0,t.jsx)("button",{onClick:()=>m(""),className:"absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text transition-colors",children:(0,t.jsx)(s.HiX,{className:"w-4 h-4"})})]})});i.displayName="SearchInput",e.s(["SearchInput",0,i])},32098,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(46932),i=e.i(88653),o=e.i(50719);let n={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:l,title:d,children:c,className:p,size:u="md"}){let m=(0,r.useCallback)(e=>{"Escape"===e.key&&l()},[l]);return(0,r.useEffect)(()=>(e&&(document.addEventListener("keydown",m),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",m),document.body.style.overflow=""}),[e,m]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(s.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:l}),(0,t.jsxs)(s.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,a.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",n[u],p),children:[d&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:d}),(0,t.jsx)("button",{onClick:l,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(o.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,a.cn)("px-6 pb-6",!d&&"pt-6"),children:c})]})]})})}])},3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157);let s=(0,r.forwardRef)(({label:e,error:r,leftIcon:s,rightIcon:i,className:o,...n},l)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[s&&(0,t.jsx)("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none",children:s}),(0,t.jsx)("input",{ref:l,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50","shadow-[0_2px_8px_rgba(217,119,6,0.015),0_1px_0_rgba(255,255,255,0.9)_inset]","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",s&&"pr-10",i&&"pl-10",o),...n}),i&&(0,t.jsx)("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary",children:i})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));s.displayName="Input",e.s(["default",0,s])},2872,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(50719),i=e.i(64753),o=e.i(37757),n=e.i(39964),l=e.i(97591),d=e.i(96640),c=e.i(59544),p=e.i(32098),u=e.i(3812),m=e.i(67073),x=e.i(7081),b=e.i(81604),f=e.i(75157),h=e.i(5766);let g=b.mockGamificationConfig.badgeCategories.flatMap(e=>e.badges.map((t,r)=>({id:`badge-${e.id}-${t}`,name:t,category:e.name,categoryIcon:e.icon,xpReward:[150,200,100,250,80][r%5],criteria:["إكمال 10 دروس","الحصول على 95%","المشاركة في 5 مناقشات","تسلسل 20 يوم"][r%4],studentsCount:[15,22,30,8,18][r%5],icon:["📖","📅","🎯","🤝","👑"][r%5]}))),y={};g.forEach((e,t)=>{let r=[1,3,5,7,2][t%5];y[e.id]=b.mockStudentXpData.slice(0,r).map((e,t)=>({id:e.studentId,name:e.studentName,date:new Date(Date.now()-864e5*t*3).toLocaleDateString("ar-EG")}))});let v=[{value:"📖",label:"📖 كتاب"},{value:"📅",label:"📅 تقويم"},{value:"🎯",label:"🎯 هدف"},{value:"🤝",label:"🤝 مصافحة"},{value:"👑",label:"👑 تاج"},{value:"🔥",label:"🔥 نار"},{value:"⭐",label:"⭐ نجمة"},{value:"💪",label:"💪 قوة"},{value:"🏅",label:"🏅 وسام"},{value:"ًںڑ€",label:"ًںڑ€ صاروخ"}];e.s(["default",0,function(){let[e,j]=(0,r.useState)(""),[w,N]=(0,r.useState)(!1),[C,k]=(0,r.useState)(null),[_,$]=(0,r.useState)({name:"",icon:"🏅",category:"أكاديمي",xpReward:100,criteria:""}),E=(0,r.useMemo)(()=>({total:g.length,categories:b.mockGamificationConfig.badgeCategories.length,totalIssued:g.reduce((e,t)=>e+t.studentsCount,0)}),[]),O=(0,r.useMemo)(()=>e?g.filter(t=>t.name.includes(e)||t.category.includes(e)):g,[e]);return(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(i.Breadcrumb,{items:[{label:"الألعاب",href:"/teacher/gamification"},{label:"الشارات"}]}),(0,t.jsx)(o.PageHeader,{title:"إدارة الشارات",description:"إنشاء وتعديل الشارات والمكافآت"}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"grid grid-cols-3 gap-4",children:[(0,t.jsx)(l.StatsCard,{title:"إجمالي الشارات",value:E.total,icon:s.HiOutlineBadgeCheck,color:"primary"}),(0,t.jsx)(l.StatsCard,{title:"التصنيفات",value:E.categories,icon:s.HiOutlineCollection,color:"info"}),(0,t.jsx)(l.StatsCard,{title:"تم إصدارها",value:E.totalIssued,icon:s.HiOutlineUsers,color:"success"})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)(x.SearchInput,{value:e,onChange:j,placeholder:"بحث عن شارة...",className:"max-w-xs"}),(0,t.jsx)(c.default,{variant:"primary",leftIcon:(0,t.jsx)(s.HiOutlinePlus,{className:"w-4 h-4"}),onClick:()=>N(!0),children:"إضافة شارة جديدة"})]}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:O.map((e,r)=>(0,t.jsx)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.03*r},children:(0,t.jsxs)(n.Card,{hover:!0,className:"relative overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary-100/30 to-transparent dark:from-primary-900/20 rounded-bl-full"}),(0,t.jsxs)("div",{className:"flex items-start justify-between relative",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/40 dark:to-primary-800/20 flex items-center justify-center text-2xl",children:e.icon}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-bold text-text",children:e.name}),(0,t.jsx)(d.Badge,{variant:"primary",size:"sm",children:e.category})]})]}),(0,t.jsxs)("div",{className:"flex gap-1",children:[(0,t.jsx)("button",{type:"button",onClick:()=>h.default.success("تم تعديل الشارة بنجاح"),className:"p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors",children:(0,t.jsx)(s.HiOutlinePencil,{size:15})}),(0,t.jsx)("button",{type:"button",onClick:()=>h.default.success("تم حذف الشارة بنجاح"),className:"p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors",children:(0,t.jsx)(s.HiOutlineTrash,{size:15})})]})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between mt-4 text-sm",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(s.HiOutlineStar,{className:"w-4 h-4 text-warning"}),(0,t.jsxs)("span",{className:"font-semibold text-text",children:["+",e.xpReward," XP"]})]}),(0,t.jsx)("span",{className:"text-text-tertiary text-xs",children:e.criteria})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between mt-3 pt-3 border-t border-border",children:[(0,t.jsxs)("span",{className:"text-xs text-text-secondary",children:[(0,t.jsx)(s.HiOutlineUsers,{className:"w-3.5 h-3.5 inline ml-1"}),e.studentsCount," طالب"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>k(C===e.id?null:e.id),className:"flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors",children:["عرض الحاصلين",(0,t.jsx)(s.HiOutlineChevronDown,{className:(0,f.cn)("w-3 h-3 transition-transform",C===e.id&&"rotate-180")})]})]}),C===e.id&&(0,t.jsx)(a.motion.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},className:"overflow-hidden mt-3 pt-3 border-t border-border",children:(0,t.jsx)("div",{className:"space-y-2 max-h-40 overflow-y-auto",children:y[e.id]?.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between text-xs px-2 py-1.5 rounded-lg hover:bg-surface-secondary",children:[(0,t.jsx)("span",{className:"font-medium text-text",children:e.name}),(0,t.jsx)("span",{className:"text-text-tertiary",children:e.date})]},e.id))})})]})},e.id))}),(0,t.jsx)(p.Modal,{isOpen:w,onClose:()=>N(!1),title:"إنشاء شارة جديدة",size:"lg",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)(u.default,{label:"اسم الشارة",value:_.name,onChange:e=>$({..._,name:e.target.value}),placeholder:"أدخل اسم الشارة"}),(0,t.jsx)(m.default,{label:"الأيقونة",options:v,value:_.icon,onChange:e=>$({..._,icon:e.target.value})}),(0,t.jsx)(m.default,{label:"التصنيف",options:b.mockGamificationConfig.badgeCategories.map(e=>({value:e.name,label:`${e.icon} ${e.name}`})),value:_.category,onChange:e=>$({..._,category:e.target.value})}),(0,t.jsx)(u.default,{label:"مكافأة XP",type:"number",value:_.xpReward,onChange:e=>$({..._,xpReward:Number(e.target.value)})}),(0,t.jsx)(u.default,{label:"معيار الحصول",value:_.criteria,onChange:e=>$({..._,criteria:e.target.value}),placeholder:"مثال: إكمال 10 دروس"}),(0,t.jsxs)("div",{className:"flex gap-3 pt-2",children:[(0,t.jsx)(c.default,{variant:"primary",className:"flex-1",onClick:()=>{N(!1),h.default.success("تم إنشاء الشارة بنجاح")},children:"إنشاء الشارة"}),(0,t.jsx)(c.default,{variant:"secondary",onClick:()=>N(!1),children:"إلغاء"})]})]})})]})}])}]);