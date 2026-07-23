(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",a[i],s[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:a,children:s,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),a&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:a})]}),s&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:s})]})}])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function u(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let u=p(e),m=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!c[m]){let t=u!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);c[m]=d(s?{["@keyframes "+m]:t}:t,r?"":"."+m)}let x=r&&c.g;return r&&(c.g=c[m]),i=c[m],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}u.bind({g:1});let m,x,b,h=u.bind({k:1});function f(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;r.p=Object.assign({theme:x&&x()},n),r.o=/go\d/.test(l),n.className=u.apply(r,a)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),m(d,n)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},E=(e,t=j)=>{C[t]=w(C[t]||k,e),N.forEach(([e,r])=>{e===t&&r(C[t])})},$=e=>Object.keys(C).forEach(t=>E(e,t)),_=(e=j)=>t=>{E(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return _(s.toasterId||(a=s.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},S=(e,t)=>H("blank")(e,t);S.error=H("error"),S.success=H("success"),S.loading=H("loading"),S.custom=H("custom"),S.dismiss=(e,t)=>{let r={type:3,toastId:e};t?_(t)(r):$(r)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let r={type:4,toastId:e};t?_(t)(r):$(r)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,r)=>{let a=S.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?S.success(s,{id:a,...r,...null==r?void 0:r.success}):S.dismiss(a),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?S.error(s,{id:a,...r,...null==r?void 0:r.error}):S.dismiss(a)}),e};var P=1e3,A=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=h`
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
}`,L=f("div")`
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
    animation: ${I} 0.15s ease-out forwards;
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
`,T=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,z=h`
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
}`,R=f("div")`
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
`,U=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(G,null,t):t:"blank"===r?null:s.createElement(U,null,s.createElement(T,{...a}),"loading"!==r&&s.createElement(F,null,"error"===r?s.createElement(L,{...a}):s.createElement(R,{...a})))},Z=f("div")`
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
`,X=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(K,{toast:e}),n=s.createElement(W,{...e.ariaProps},g(e.message,e));return s.createElement(Z,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});a=s.createElement,d.p=void 0,m=a,x=void 0,b=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},J=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(C[t]||k),i=(0,s.useRef)(C[t]);(0,s.useEffect)(()=>(i.current!==C[t]&&a(C[t]),N.push([t,a]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=P)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&S.dismiss(r.id);return}return setTimeout(()=>S.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,s.useCallback)(_(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,s.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),p=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:p}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,n,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),p=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:p},"custom"===r.type?g(r.message,r):i?i(r):s.createElement(X,{toast:r,position:l}))}))},"default",0,S,"toast",0,S],5766)},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:s="لم يتم العثور على أي عناصر بعد.",icon:i=a.HiOutlineInbox,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:s}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(46932),s=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:l,sparkline:d,color:c="primary",description:p,className:u}){let m=i[c],x=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",u),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",m.bg,m.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",m.text)})}),x&&(0,t.jsxs)(a.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(s.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(s.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(a.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",m.text),children:o}),p&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:p}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:m.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:m.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:m.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},n=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:n,leftIcon:l,rightIcon:d,className:c,disabled:p,children:u,...m},x)=>(0,t.jsxs)("button",{ref:x,disabled:p||n,className:(0,a.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],c),...m,children:[n?(0,t.jsx)(s.Spinner,{size:"sm"}):l,u,!n&&d]}));n.displayName="Button",e.s(["default",0,n])},7081,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(50719);let i=(0,r.forwardRef)(({value:e,onChange:i,placeholder:o="بحث...",className:n},l)=>{let[d,c]=(0,r.useState)(""),p=void 0!==e,u=p?e:d,m=e=>{p||c(e),i?.(e)};return(0,t.jsxs)("div",{className:(0,a.cn)("relative",n),children:[(0,t.jsx)(s.HiSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"}),(0,t.jsx)("input",{ref:l,value:u,onChange:e=>m(e.target.value),placeholder:o,className:"w-full bg-card border border-border rounded-[14px] pr-10 pl-9 py-2.5 text-sm text-text placeholder-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-200"}),u&&(0,t.jsx)("button",{onClick:()=>m(""),className:"absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text transition-colors",children:(0,t.jsx)(s.HiX,{className:"w-4 h-4"})})]})});i.displayName="SearchInput",e.s(["SearchInput",0,i])},79649,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(22016),s=e.i(18566),i=e.i(5766),o=e.i(46932),n=e.i(50719),l=e.i(37757),d=e.i(97591),c=e.i(96640),p=e.i(7081),u=e.i(40803),m=e.i(59544),x=e.i(81604);let b={active:{label:"نشط",variant:"success"},closed:{label:"مغلق",variant:"error"},draft:{label:"مسودة",variant:"default"}},h=["الكل","active","draft","closed"];e.s(["default",0,function(){let e=(0,s.useRouter)(),[f,g]=(0,r.useState)(""),[y,v]=(0,r.useState)("الكل"),j=(0,r.useMemo)(()=>x.mockExams.filter(e=>{let t=f.toLowerCase();return e.title.includes(t)&&("الكل"===y||e.status===y)}),[f,y]);return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsx)(l.PageHeader,{title:"الامتحانات",description:"إدارة الامتحانات والاختبارات",breadcrumbs:[{label:"لوحة التحكم",href:"/teacher"},{label:"الامتحانات"}],actions:(0,t.jsx)(a.default,{href:"/teacher/exams/create",children:(0,t.jsx)(m.default,{variant:"primary",leftIcon:(0,t.jsx)(n.HiOutlinePlus,{className:"w-4 h-4"}),children:"إضافة امتحان"})})}),(0,t.jsxs)(o.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",children:[(0,t.jsx)(d.StatsCard,{title:"إجمالي الامتحانات",value:x.mockExams.length,icon:n.HiOutlineClipboardCheck,color:"primary",trend:10,sparkline:[20,25,22,30,28,35,32,40,38,42,45,48]}),(0,t.jsx)(d.StatsCard,{title:"الامتحانات النشطة",value:x.mockExams.filter(e=>"active"===e.status).length,icon:n.HiOutlineChartSquareBar,color:"success",trend:15,sparkline:[5,8,6,12,10,15,13,18,16,20,22,25]}),(0,t.jsx)(d.StatsCard,{title:"متوسط الدرجات",value:`${Math.round(x.mockExams.reduce((e,t)=>e+t.analytics.averageGrade,0)/x.mockExams.length)}%`,icon:n.HiOutlineAcademicCap,color:"info"}),(0,t.jsx)(d.StatsCard,{title:"متوسط المدة",value:`${Math.round(x.mockExams.reduce((e,t)=>e+t.duration,0)/x.mockExams.length)} د`,icon:n.HiOutlineClock,color:"warning"})]}),(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row gap-5",children:[(0,t.jsx)(p.SearchInput,{value:f,onChange:g,placeholder:"بحث عن امتحان...",className:"sm:max-w-xs flex-1"}),(0,t.jsx)("select",{value:y,onChange:e=>v(e.target.value),className:"px-4 py-2.5 bg-card border border-border rounded-[16px] text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all appearance-none cursor-pointer ",children:h.map(e=>(0,t.jsx)("option",{value:e,children:"الكل"===e?"جميع الحالات":b[e]?.label},e))})]}),0===j.length?(0,t.jsx)(u.EmptyState,{icon:n.HiOutlineClipboardCheck,title:"لا توجد امتحانات",description:"لم يتم العثور على امتحانات مطابقة للبحث",actionLabel:"إضافة امتحان",onAction:()=>e.push("/teacher/exams/create")}):(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5",children:j.map((r,a)=>{let s=x.mockCourses.find(e=>e.id===r.courseId);return(0,t.jsx)(o.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.03*a},children:(0,t.jsxs)("div",{className:"group bg-card border border-border rounded-[24px] p-6  hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-250 cursor-pointer h-full",onClick:()=>e.push(`/teacher/exams/${r.id}`),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:"w-11 h-11 rounded-[16px] bg-exams/10 border border-exams/20 flex items-center justify-center shrink-0",children:(0,t.jsx)(n.HiOutlineClipboardCheck,{className:"w-5 h-5 text-exams"})}),(0,t.jsx)(c.Badge,{variant:b[r.status]?.variant||"default",size:"sm",children:b[r.status]?.label})]}),(0,t.jsx)("h3",{className:"font-semibold text-text mb-0.5 truncate",children:r.title}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary mb-4",children:s?.title||"كورس عام"}),(0,t.jsx)("div",{className:"grid grid-cols-3 gap-4 mb-4",children:[{label:"دقيقة",value:r.duration},{label:"درجة",value:r.totalGrade},{label:"سؤال",value:r.questions.length}].map(e=>(0,t.jsxs)("div",{className:"p-3 rounded-[14px] bg-card border border-border text-center",children:[(0,t.jsx)("p",{className:"font-bold text-text text-sm",children:e.value}),(0,t.jsx)("p",{className:"text-[10px] text-text-tertiary",children:e.label})]},e.label))}),(0,t.jsxs)("div",{className:"flex items-center justify-between pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity duration-250",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)("button",{type:"button",onClick:t=>{t.stopPropagation(),e.push(`/teacher/exams/${r.id}`)},className:"p-1.5 rounded-[10px] text-text-tertiary hover:text-primary hover:bg-primary/10 transition-all",children:(0,t.jsx)(n.HiOutlineEye,{className:"w-4 h-4"})}),(0,t.jsx)("button",{type:"button",onClick:t=>{t.stopPropagation(),e.push(`/teacher/exams/${r.id}`)},className:"p-1.5 rounded-[10px] text-text-tertiary hover:text-warning hover:bg-warning/10 transition-all",children:(0,t.jsx)(n.HiOutlinePencil,{className:"w-4 h-4"})}),(0,t.jsx)("button",{type:"button",onClick:e=>{e.stopPropagation(),i.default.success("تم نسخ الامتحان")},className:"p-1.5 rounded-[10px] text-text-tertiary hover:text-info hover:bg-info/10 transition-all",children:(0,t.jsx)(n.HiOutlineDuplicate,{className:"w-4 h-4"})})]}),(0,t.jsx)("button",{type:"button",onClick:e=>{e.stopPropagation(),i.default.success("تم حذف الامتحان")},className:"p-1.5 rounded-[10px] text-text-tertiary hover:text-error hover:bg-error/10 transition-all",children:(0,t.jsx)(n.HiOutlineTrash,{className:"w-4 h-4"})})]})]})},r.id)})})]})}])}]);