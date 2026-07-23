(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32098,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(46932),i=e.i(88653),n=e.i(50719);let l={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:o,title:d,children:c,className:u,size:x="md"}){let m=(0,r.useCallback)(e=>{"Escape"===e.key&&o()},[o]);return(0,r.useEffect)(()=>(e&&(document.addEventListener("keydown",m),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",m),document.body.style.overflow=""}),[e,m]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:o}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,s.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",l[x],u),children:[d&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:d}),(0,t.jsx)("button",{onClick:o,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(n.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,s.cn)("px-6 pb-6",!d&&"pt-6"),children:c})]})]})})}])},64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:a}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",a),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(s.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,o=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":s+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,n):i+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function x(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let x=u(e),m=c[x]||(c[x]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(x));if(!c[m]){let t=x!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(r=t[3].replace(o," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(o," ").trim();return s[0]})(e);c[m]=d(a?{["@keyframes "+m]:t}:t,r?"":"."+m)}let p=r&&c.g;return r&&(c.g=c[m]),i=c[m],p?t.data=t.data.replace(p,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),m})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}x.bind({g:1});let m,p,h,b=x.bind({k:1});function f(e,t){let r=this||{};return function(){let s=arguments;function a(i,n){let l=Object.assign({},i),o=l.className||a.className;r.p=Object.assign({theme:p&&p()},l),r.o=/go\d/.test(o),l.className=x.apply(r,s)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),h&&d[0]&&h(l),m(d,l)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},E=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},S=e=>Object.keys(k).forEach(t=>E(e,t)),_=(e=j)=>t=>{E(t,e)},H={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return _(a.toasterId||(s=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},z=(e,t)=>O("blank")(e,t);z.error=O("error"),z.success=O("success"),z.loading=O("loading"),z.custom=O("custom"),z.dismiss=(e,t)=>{let r={type:3,toastId:e};t?_(t)(r):S(r)},z.dismissAll=e=>z.dismiss(void 0,e),z.remove=(e,t)=>{let r={type:4,toastId:e};t?_(t)(r):S(r)},z.removeAll=e=>z.remove(void 0,e),z.promise=(e,t,r)=>{let s=z.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?z.success(a,{id:s,...r,...null==r?void 0:r.success}):z.dismiss(s),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?z.error(a,{id:s,...r,...null==r?void 0:r.error}):z.dismiss(s)}),e};var A=1e3,I=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,$=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,D=b`
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

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${$} 0.15s ease-out forwards;
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
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,P=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,B=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,L=b`
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
    animation: ${L} 0.2s ease-out forwards;
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
`,G=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(U,null,t):t:"blank"===r?null:a.createElement(G,null,a.createElement(M,{...s}),"loading"!==r&&a.createElement(R,null,"error"===r?a.createElement(T,{...s}):a.createElement(F,{...s})))},V=f("div")`
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
`,X=f("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Y=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(K,{toast:e}),l=a.createElement(X,{...e.ariaProps},g(e.message,e));return a.createElement(V,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:n,message:l}):a.createElement(a.Fragment,null,n,l))});s=a.createElement,d.p=void 0,m=s,p=void 0,h=void 0;var Z=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let n=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:n,className:t,style:r},i)},J=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:n,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&s(k[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||H[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=A)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&z.dismiss(r.id);return}return setTimeout(()=>z.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let l=(0,a.useCallback)(_(t),[t]),o=(0,a.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,a.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,a.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:u}}})(r,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let n,l,o=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),u=(n=o.includes("top"),l=o.includes("center")?{justifyContent:"center"}:o.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...l});return a.createElement(Z,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:u},"custom"===r.type?g(r.message,r):i?i(r):a.createElement(Y,{toast:r,position:o}))}))},"default",0,z,"toast",0,z],5766)},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:l,dot:o=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[n],l),children:[o&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},67073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(50719);let i=(0,r.forwardRef)(({label:e,error:r,options:i,placeholder:n,className:l,...o},d)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:d,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",l),...o,children:[n&&(0,t.jsx)("option",{value:"",children:n}),i.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(a.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));i.displayName="Select",e.s(["default",0,i])},51312,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["ErrorState",0,function({title:e="حدث خطأ",description:a="حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",icon:i=s.HiOutlineExclamationCircle,action:n,className:l}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",l),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-error/10 border border-error/20 flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-error"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},n={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},l=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:l,leftIcon:o,rightIcon:d,className:c,disabled:u,children:x,...m},p)=>(0,t.jsxs)("button",{ref:p,disabled:u||l,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],n[r],c),...m,children:[l?(0,t.jsx)(a.Spinner,{size:"sm"}):o,x,!l&&d]}));l.displayName="Button",e.s(["default",0,l])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=s.HiOutlineInbox,action:n,className:l}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",l),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},88442,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["CardSkeleton",0,function({count:e=3}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-10 h-10 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-5 flex-1 bg-card/80 animate-pulse rounded-[8px]"})]}),(0,t.jsx)("div",{className:"h-4 w-3/4 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-1/2 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"Skeleton",0,function({className:e,variant:s="text"}){return(0,t.jsx)("div",{className:(0,r.cn)("animate-pulse bg-card/80","circular"===s&&"rounded-full","text"===s&&"h-4 rounded-[8px]","rectangular"===s&&"rounded-[14px]",e)})},"StatsSkeleton",0,function({count:e=4}){return(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"bg-card border border-border rounded-[16px] p-5 space-y-3 ",children:[(0,t.jsx)("div",{className:"w-11 h-11 rounded-[12px] bg-card/80 animate-pulse"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-8 w-32 bg-card/80 animate-pulse rounded-[8px]"})]},r))})},"TableSkeleton",0,function({rows:e=5}){return(0,t.jsxs)("div",{className:"border border-border rounded-[16px] overflow-hidden",children:[(0,t.jsx)("div",{className:"bg-card/50 border-b border-border px-4 py-3",children:(0,t.jsx)("div",{className:"h-4 w-32 bg-card/80 animate-pulse rounded-[8px]"})}),Array.from({length:e}).map((e,r)=>(0,t.jsxs)("div",{className:"border-b border-border last:border-b-0 px-4 py-3 flex items-center gap-4",children:[(0,t.jsx)("div",{className:"h-4 flex-1 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-20 bg-card/80 animate-pulse rounded-[8px]"}),(0,t.jsx)("div",{className:"h-4 w-16 bg-card/80 animate-pulse rounded-[8px]"})]},r))]})}])},43874,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(50719),a=e.i(5766),i=e.i(39964),n=e.i(37757),l=e.i(96640),o=e.i(59544),d=e.i(67073),c=e.i(32098),u=e.i(88442),x=e.i(40803),m=e.i(51312),p=e.i(81604),h=e.i(64753),b=e.i(75157);let f={"multiple-choice":"اختيار من متعدد","true-false":"صواب/خطأ","fill-blank":"ملء الفراغ",essay:"مقالي",ordering:"ترتيب",matching:"مطابقة"};e.s(["default",0,function(){let{loading:e,error:g,retry:y}=function(){let[e,t]=(0,r.useState)(!0),[s,a]=(0,r.useState)(null),i=(0,r.useCallback)(()=>{t(!0),a(null),setTimeout(()=>{try{if((0,b.det)()>.1)t(!1);else throw Error("فشل تحميل الامتحانات")}catch(e){a(e.message),t(!1)}},500)},[]);return(0,r.useEffect)(()=>{i()},[i]),{loading:e,error:s,retry:i}}(),[v,j]=(0,r.useState)(""),[N,w]=(0,r.useState)({includeHeader:!0,includeFooter:!0,includeStudentInfo:!0,showAnswers:!1,showGrade:!0,fontSize:"medium",columns:1}),[C,k]=(0,r.useState)(!1),[E,S]=(0,r.useState)([]),_=(0,r.useMemo)(()=>[{value:"",label:"اختر الامتحان..."},...p.mockExams.map(e=>({value:e.id,label:e.title}))],[]),H=(0,r.useMemo)(()=>p.mockExams.find(e=>e.id===v),[v]),O=(0,r.useMemo)(()=>v?p.mockExamVersions.filter(e=>e.examId===v):[],[v]),z=e=>{w(t=>({...t,[e]:!t[e]}))};return g?(0,t.jsxs)("div",{className:"p-4 md:p-6",children:[(0,t.jsx)(n.PageHeader,{title:"طباعة الامتحان",description:"إعدادات طباعة الامتحانات والاختبارات"}),(0,t.jsx)(m.ErrorState,{description:g,onRetry:y})]}):(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",dir:"rtl",children:[(0,t.jsx)(h.Breadcrumb,{items:[{label:"الامتحانات",href:"/teacher/exams"},{label:"طباعة الامتحان"}]}),(0,t.jsx)(n.PageHeader,{title:"طباعة الامتحان",description:"إعدادات طباعة الامتحانات والاختبارات",actions:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)(o.default,{variant:"success",onClick:()=>{H&&a.default.success("جاري تحضير الطباعة...")},rightIcon:(0,t.jsx)(s.HiOutlinePrinter,{size:18}),children:"طباعة"}),(0,t.jsx)(o.default,{variant:"primary",onClick:()=>{H&&a.default.success("جاري طباعة كراسة الإجابة...")},rightIcon:(0,t.jsx)(s.HiOutlineDocumentText,{size:18}),children:"طباعة كراسة الإجابة"}),(0,t.jsx)(o.default,{variant:"secondary",onClick:()=>k(!0),rightIcon:(0,t.jsx)(s.HiOutlineDocumentDuplicate,{size:18}),children:"طباعة نسخ متعددة"})]})}),(0,t.jsx)(i.Card,{children:(0,t.jsx)(i.CardContent,{className:"space-y-4",children:(0,t.jsx)(d.default,{label:"اختر الامتحان",options:_,value:v,onChange:e=>j(e.target.value)})})}),e&&(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[(0,t.jsx)(i.Card,{children:(0,t.jsxs)(i.CardContent,{className:"space-y-4",children:[(0,t.jsx)(u.Skeleton,{className:"h-6 w-1/3"}),Array.from({length:6},(e,r)=>(0,t.jsx)(u.Skeleton,{className:"h-10 w-full"},r))]})}),(0,t.jsx)(i.Card,{children:(0,t.jsxs)(i.CardContent,{className:"space-y-4",children:[(0,t.jsx)(u.Skeleton,{className:"h-6 w-1/3"}),(0,t.jsx)(u.Skeleton,{className:"h-80 w-full"})]})})]}),!e&&!H&&(0,t.jsx)(x.EmptyState,{icon:s.HiOutlinePrinter,title:"اختر امتحاناً",description:"اختر امتحاناً من القائمة أعلاه لبدء إعدادات الطباعة"}),!e&&H&&(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[(0,t.jsxs)(i.Card,{children:[(0,t.jsx)(i.CardHeader,{children:(0,t.jsxs)(i.CardTitle,{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlineAdjustments,{className:"text-primary",size:20}),"إعدادات الطباعة"]})}),(0,t.jsxs)(i.CardContent,{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-lg bg-surface-secondary",children:[(0,t.jsx)("span",{className:"text-sm text-text",children:"عرض الرأس والتذييل"}),(0,t.jsx)("button",{type:"button",onClick:()=>z("includeHeader"),className:(0,b.cn)("w-10 h-5 rounded-full transition-colors relative",N.includeHeader?"bg-primary":"bg-surface-tertiary"),children:(0,t.jsx)("span",{className:(0,b.cn)("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all",N.includeHeader?"left-0.5":"right-0.5")})})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-lg bg-surface-secondary",children:[(0,t.jsx)("span",{className:"text-sm text-text",children:"إظهار الإجابات"}),(0,t.jsx)("button",{type:"button",onClick:()=>z("showAnswers"),className:(0,b.cn)("w-10 h-5 rounded-full transition-colors relative",N.showAnswers?"bg-primary":"bg-surface-tertiary"),children:(0,t.jsx)("span",{className:(0,b.cn)("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all",N.showAnswers?"left-0.5":"right-0.5")})})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-lg bg-surface-secondary",children:[(0,t.jsx)("span",{className:"text-sm text-text",children:"إظهار الدرجات"}),(0,t.jsx)("button",{type:"button",onClick:()=>z("showGrade"),className:(0,b.cn)("w-10 h-5 rounded-full transition-colors relative",N.showGrade?"bg-primary":"bg-surface-tertiary"),children:(0,t.jsx)("span",{className:(0,b.cn)("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all",N.showGrade?"left-0.5":"right-0.5")})})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-lg bg-surface-secondary",children:[(0,t.jsx)("span",{className:"text-sm text-text",children:"معلومات الطالب"}),(0,t.jsx)("button",{type:"button",onClick:()=>z("includeStudentInfo"),className:(0,b.cn)("w-10 h-5 rounded-full transition-colors relative",N.includeStudentInfo?"bg-primary":"bg-surface-tertiary"),children:(0,t.jsx)("span",{className:(0,b.cn)("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all",N.includeStudentInfo?"left-0.5":"right-0.5")})})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,t.jsx)(d.default,{label:"حجم الخط",options:[{value:"small",label:"صغير"},{value:"medium",label:"متوسط"},{value:"large",label:"كبير"}],value:N.fontSize,onChange:e=>w(t=>({...t,fontSize:e.target.value}))}),(0,t.jsx)(d.default,{label:"عدد الأعمدة",options:[{value:"1",label:"عمود واحد"},{value:"2",label:"عمودان"}],value:String(N.columns),onChange:e=>w(t=>({...t,columns:Number(e.target.value)}))})]})]})]}),(0,t.jsxs)(i.Card,{children:[(0,t.jsx)(i.CardHeader,{children:(0,t.jsxs)(i.CardTitle,{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlineEye,{className:"text-primary",size:20}),"معاينة الطباعة"]})}),(0,t.jsx)(i.CardContent,{children:(0,t.jsxs)("div",{className:(0,b.cn)("border border-border rounded-xl p-6 bg-white space-y-4","small"===N.fontSize?"text-xs":"large"===N.fontSize?"text-base":"text-sm"),children:[N.includeHeader&&(0,t.jsxs)("div",{className:"text-center border-b border-border pb-3 mb-3",children:[(0,t.jsx)("h3",{className:"font-bold text-text text-lg",children:H.title}),(0,t.jsxs)("p",{className:"text-text-tertiary",children:[H.questions.length," أسئلة | ",H.totalGrade," درجة | المدة: ",H.duration," دقيقة"]})]}),N.includeStudentInfo&&(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3 text-sm border-b border-border pb-3 mb-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"اسم الطالب: "}),(0,t.jsx)("span",{className:"border-b border-dotted border-text-tertiary px-4",children:"............"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"التاريخ: "}),(0,t.jsx)("span",{className:"border-b border-dotted border-text-tertiary px-4",children:"............"})]})]}),(0,t.jsxs)("div",{className:(0,b.cn)(2===N.columns?"grid grid-cols-2 gap-4":"space-y-3"),children:[H.questions.slice(0,6).map((e,r)=>(0,t.jsx)("div",{className:"p-3 rounded-lg bg-surface-secondary",children:(0,t.jsxs)("div",{className:"flex items-start gap-2",children:[(0,t.jsxs)("span",{className:"font-bold text-text shrink-0",children:[r+1,"."]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-text",children:e.text}),(0,t.jsxs)("div",{className:"flex gap-2 mt-1",children:[(0,t.jsx)(l.Badge,{size:"sm",variant:"info",children:f[e.type]}),N.showGrade&&(0,t.jsxs)(l.Badge,{size:"sm",children:[e.grade," درجات"]})]}),N.showAnswers&&e.choices&&(0,t.jsx)("div",{className:"mt-2 p-2 rounded-lg bg-success/5 border border-success/20",children:(0,t.jsxs)("span",{className:"text-success text-xs",children:["الإجابة: ",e.choices.find(e=>e.isCorrect)?.text]})})]})]})},e.id)),H.questions.length>6&&(0,t.jsxs)("p",{className:"text-center text-text-tertiary text-sm",children:["... و ",H.questions.length-6," أسئلة أخرى"]})]}),N.includeFooter&&(0,t.jsx)("div",{className:"text-center border-t border-border pt-3 mt-3 text-text-tertiary text-xs",children:(0,t.jsx)("p",{children:"TeacherOS - نظام تشغيل المدرس | الصفحة 1 من 1"})})]})})]})]}),(0,t.jsx)(c.Modal,{isOpen:C,onClose:()=>k(!1),title:"طباعة نسخ متعددة",size:"md",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)("p",{className:"text-sm text-text-secondary",children:"اختر النسخ التي تريد طباعتها:"}),0===O.length?(0,t.jsx)("p",{className:"text-text-tertiary text-sm",children:"لا توجد نسخ متاحة لهذا الامتحان"}):(0,t.jsx)("div",{className:"space-y-2",children:O.map(e=>(0,t.jsxs)("label",{className:(0,b.cn)("flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",E.includes(e.id)?"border-primary bg-primary/5":"border-border hover:bg-surface-secondary"),children:[(0,t.jsx)("input",{type:"checkbox",checked:E.includes(e.id),onChange:()=>S(t=>t.includes(e.id)?t.filter(t=>t!==e.id):[...t,e.id]),className:"w-4 h-4 rounded border-border text-primary focus:ring-primary"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-sm font-medium text-text",children:e.label}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:[e.questions.length," أسئلة - ",e.totalGrade," درجة"]})]})]},e.id))}),(0,t.jsxs)("div",{className:"flex gap-3 justify-end",children:[(0,t.jsx)(o.default,{variant:"secondary",onClick:()=>k(!1),children:"إلغاء"}),(0,t.jsxs)(o.default,{variant:"primary",onClick:()=>{0===E.length?a.default.error("يرجى اختيار نسخة واحدة على الأقل"):(a.default.success(`جاري طباعة ${E.length} نسخ`),k(!1))},disabled:0===E.length,rightIcon:(0,t.jsx)(s.HiOutlinePrinter,{size:18}),children:["طباعة (",E.length,")"]})]})]})})]})}])}]);