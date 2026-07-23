(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=s.HiOutlineInbox,action:o,className:l}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",l),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},l=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:l,leftIcon:n,rightIcon:d,className:c,disabled:p,children:x,...m},u)=>(0,t.jsxs)("button",{ref:u,disabled:p||l,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],c),...m,children:[l?(0,t.jsx)(a.Spinner,{size:"sm"}):n,x,!l&&d]}));l.displayName="Button",e.s(["default",0,l])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function x(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let x=p(e),m=c[x]||(c[x]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(x));if(!c[m]){let t=x!==e?e:(e=>{let t,r,s=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(r=t[3].replace(n," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(n," ").trim();return s[0]})(e);c[m]=d(a?{["@keyframes "+m]:t}:t,r?"":"."+m)}let u=r&&c.g;return r&&(c.g=c[m]),i=c[m],u?t.data=t.data.replace(u,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),m})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}x.bind({g:1});let m,u,f,h=x.bind({k:1});function b(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let l=Object.assign({},i),n=l.className||a.className;r.p=Object.assign({theme:u&&u()},l),r.o=/go\d/.test(n),l.className=x.apply(r,s)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),f&&d[0]&&f(l),m(d,l)}return t?t(a):a}}var y=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),g=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},E=(e,t=j)=>{C[t]=N(C[t]||k,e),w.forEach(([e,r])=>{e===t&&r(C[t])})},O=e=>Object.keys(C).forEach(t=>E(e,t)),I=(e=j)=>t=>{E(t,e)},_={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},A=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||v()}))(t,e,r);return I(a.toasterId||(s=a.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},H=(e,t)=>A("blank")(e,t);H.error=A("error"),H.success=A("success"),H.loading=A("loading"),H.custom=A("custom"),H.dismiss=(e,t)=>{let r={type:3,toastId:e};t?I(t)(r):O(r)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let r={type:4,toastId:e};t?I(t)(r):O(r)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,r)=>{let s=H.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?y(t.success,e):void 0;return a?H.success(a,{id:s,...r,...null==r?void 0:r.success}):H.dismiss(s),e}).catch(e=>{let a=t.error?y(t.error,e):void 0;a?H.error(a,{id:s,...r,...null==r?void 0:r.error}):H.dismiss(s)}),e};var S=1e3,P=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,$=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,D=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${z} 0.15s ease-out forwards;
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
`,T=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,R=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,L=h`
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
}`,F=b("div")`
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
`,B=b("div")`
  position: absolute;
`,U=b("div")`
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
}`,X=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,q=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(X,null,t):t:"blank"===r?null:a.createElement(U,null,a.createElement(T,{...s}),"loading"!==r&&a.createElement(B,null,"error"===r?a.createElement(D,{...s}):a.createElement(F,{...s})))},Y=b("div")`
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
`,G=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=g()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(q,{toast:e}),l=a.createElement(Z,{...e.ariaProps},y(e.message,e));return a.createElement(Y,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:o,message:l}):a.createElement(a.Fragment,null,o,l))});s=a.createElement,d.p=void 0,m=s,u=void 0,f=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:o,className:t,style:r},i)},Q=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(C[t]||k),i=(0,a.useRef)(C[t]);(0,a.useEffect)(()=>(i.current!==C[t]&&s(C[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||_[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=S)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&H.dismiss(r.id);return}return setTimeout(()=>H.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let l=(0,a.useCallback)(I(t),[t]),n=(0,a.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,a.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,a.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),p=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<l&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:p}}})(r,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,l,n=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),p=(o=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:g()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...l});return a.createElement(J,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Q:"",style:p},"custom"===r.type?y(r.message,r):i?i(r):a.createElement(G,{toast:r,position:n}))}))},"default",0,H,"toast",0,H],5766)},7081,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(50719);let i=(0,r.forwardRef)(({value:e,onChange:i,placeholder:o="بحث...",className:l},n)=>{let[d,c]=(0,r.useState)(""),p=void 0!==e,x=p?e:d,m=e=>{p||c(e),i?.(e)};return(0,t.jsxs)("div",{className:(0,s.cn)("relative",l),children:[(0,t.jsx)(a.HiSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"}),(0,t.jsx)("input",{ref:n,value:x,onChange:e=>m(e.target.value),placeholder:o,className:"w-full bg-card border border-border rounded-[14px] pr-10 pl-9 py-2.5 text-sm text-text placeholder-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-200"}),x&&(0,t.jsx)("button",{onClick:()=>m(""),className:"absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text transition-colors",children:(0,t.jsx)(a.HiX,{className:"w-4 h-4"})})]})});i.displayName="SearchInput",e.s(["SearchInput",0,i])},32098,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(46932),i=e.i(88653),o=e.i(50719);let l={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:n,title:d,children:c,className:p,size:x="md"}){let m=(0,r.useCallback)(e=>{"Escape"===e.key&&n()},[n]);return(0,r.useEffect)(()=>(e&&(document.addEventListener("keydown",m),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",m),document.body.style.overflow=""}),[e,m]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:n}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,s.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",l[x],p),children:[d&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:d}),(0,t.jsx)("button",{onClick:n,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(o.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,s.cn)("px-6 pb-6",!d&&"pt-6"),children:c})]})]})})}])},67073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(50719);let i=(0,r.forwardRef)(({label:e,error:r,options:i,placeholder:o,className:l,...n},d)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:d,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",l),...n,children:[o&&(0,t.jsx)("option",{value:"",children:o}),i.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(a.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));i.displayName="Select",e.s(["default",0,i])},3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157);let a=(0,r.forwardRef)(({label:e,error:r,leftIcon:a,rightIcon:i,className:o,...l},n)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[a&&(0,t.jsx)("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none",children:a}),(0,t.jsx)("input",{ref:n,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50","shadow-[0_2px_8px_rgba(217,119,6,0.015),0_1px_0_rgba(255,255,255,0.9)_inset]","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",a&&"pr-10",i&&"pl-10",o),...l}),i&&(0,t.jsx)("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary",children:i})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));a.displayName="Input",e.s(["default",0,a])},3649,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157);let a=(0,r.forwardRef)(({label:e,error:r,className:a,...i},o)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsx)("textarea",{ref:o,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50 min-h-[100px] resize-y","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",a),...i}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));a.displayName="Textarea",e.s(["default",0,a])},33288,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(5766),a=e.i(50719),i=e.i(37757),o=e.i(32098),l=e.i(7081),n=e.i(59544),d=e.i(3812),c=e.i(67073),p=e.i(3649),x=e.i(40803),m=e.i(81604),u=e.i(75157);e.s(["default",0,function(){let[e,f]=(0,r.useState)(""),[h,b]=(0,r.useState)(null),[y,v]=(0,r.useState)(!1),[g,j]=(0,r.useState)(!0),N=(0,r.useMemo)(()=>{let e;return e=new Map,m.mockMessages.forEach(t=>{let r=e.get(t.conversationId)||[];r.push(t),e.set(t.conversationId,r)}),Array.from(e.entries()).map(([e,t])=>{let r=[...t].sort((e,t)=>t.createdAt.getTime()-e.createdAt.getTime())[0];return{id:e,participantName:r.senderName,participantAvatar:r.senderAvatar,participantId:r.senderId,lastMessage:r.content,lastMessageDate:r.createdAt,unread:!r.read,isStarred:r.isStarred,messages:t}})},[]),w=(0,r.useMemo)(()=>e.trim()?N.filter(t=>t.participantName.includes(e)):N,[e,N]),k=(0,r.useMemo)(()=>N.find(e=>e.id===h),[h,N]);return(0,t.jsxs)("div",{className:"h-[calc(100vh-5rem)] flex flex-col",children:[(0,t.jsx)(i.PageHeader,{title:"الرسائل",description:"التواصل مع الطلاب وأولياء الأمور"}),(0,t.jsxs)("div",{className:"flex gap-6 flex-1 min-h-0",children:[(0,t.jsxs)("div",{className:(0,u.cn)("w-full md:w-80 lg:w-96 shrink-0 flex flex-col bg-card border border-border rounded-[24px] overflow-hidden",!g&&"hidden md:flex"),children:[(0,t.jsx)("div",{className:"p-5 border-b border-border space-y-4",children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsx)(l.SearchInput,{value:e,onChange:f,placeholder:"بحث في المحادثات..."})}),(0,t.jsx)(n.default,{variant:"primary",size:"sm",leftIcon:(0,t.jsx)(a.HiOutlinePlus,{className:"w-4 h-4"}),onClick:()=>v(!0),children:"جديدة"})]})}),(0,t.jsx)("div",{className:"flex-1 overflow-y-auto divide-y divide-border/50",children:0===w.length?(0,t.jsx)(x.EmptyState,{icon:a.HiOutlineInbox,title:"لا يوجد رسائل",description:"لم يتم تبادل أي رسائل بعد"}):w.map(e=>(0,t.jsx)("button",{type:"button",onClick:()=>{b(e.id),j(!1)},className:(0,u.cn)("w-full text-right p-5 transition-all duration-200","hover:bg-card/40",h===e.id&&"bg-primary/5"),children:(0,t.jsxs)("div",{className:"flex items-start gap-4",children:[(0,t.jsxs)("div",{className:"relative shrink-0",children:[(0,t.jsx)("div",{className:"w-11 h-11 rounded-full bg-primary/10 border border-primary/20 overflow-hidden",children:(0,t.jsx)("img",{src:e.participantAvatar,alt:"",className:"w-full h-full object-cover"})}),e.unread&&(0,t.jsx)("span",{className:"absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-card"})]}),(0,t.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between gap-2",children:[(0,t.jsx)("span",{className:(0,u.cn)("text-sm truncate",e.unread?"font-semibold text-text":"text-text-secondary"),children:e.participantName}),(0,t.jsx)("span",{className:"text-[11px] text-text-tertiary shrink-0",children:(0,u.formatRelativeTime)(e.lastMessageDate)})]}),(0,t.jsx)("p",{className:(0,u.cn)("text-xs truncate mt-0.5",e.unread?"text-text":"text-text-tertiary"),children:e.lastMessage})]}),e.isStarred&&(0,t.jsx)(a.HiOutlineStar,{className:"w-3.5 h-3.5 text-warning shrink-0 mt-1"})]})},e.id))})]}),(0,t.jsx)("div",{className:(0,u.cn)("flex-1 bg-card border border-border rounded-[24px] overflow-hidden flex flex-col",g&&"hidden md:flex"),children:k?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-5 py-4 border-b border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsx)("button",{type:"button",className:"md:hidden p-1 text-text-tertiary hover:text-text transition-colors",onClick:()=>j(!0),children:(0,t.jsx)(a.HiOutlineChevronRight,{className:"w-5 h-5"})}),(0,t.jsx)("div",{className:"w-10 h-10 rounded-full bg-primary/10 border border-primary/20 overflow-hidden",children:(0,t.jsx)("img",{src:k.participantAvatar,alt:"",className:"w-full h-full object-cover"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:k.participantName}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"متصل الآن"})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("button",{type:"button",onClick:()=>s.default.success("تم تحديث الحالة"),className:"p-2 rounded-[12px] text-text-tertiary hover:text-warning hover:bg-card/60 transition-all",children:(0,t.jsx)(a.HiOutlineStar,{className:"w-4 h-4"})}),(0,t.jsx)("button",{type:"button",onClick:()=>s.default.success("تم حذف المحادثة"),className:"p-2 rounded-[12px] text-text-tertiary hover:text-error hover:bg-card/60 transition-all",children:(0,t.jsx)(a.HiOutlineTrash,{className:"w-4 h-4"})})]})]}),(0,t.jsx)("div",{className:"flex-1 overflow-y-auto p-5 space-y-4",children:k.messages.map(e=>(0,t.jsx)("div",{className:(0,u.cn)("flex","t-1"===e.senderId?"justify-start":"justify-end"),children:(0,t.jsxs)("div",{className:(0,u.cn)("max-w-[75%] p-4 rounded-[20px]","t-1"===e.senderId?"bg-primary/20 border border-primary/30 text-text rounded-tr-sm":"bg-card border border-border rounded-tl-sm"),children:[(0,t.jsx)("p",{className:"text-sm",children:e.content}),(0,t.jsxs)("div",{className:(0,u.cn)("flex items-center gap-2 mt-1.5","t-1"===e.senderId?"justify-end":"justify-start"),children:[(0,t.jsx)("span",{className:(0,u.cn)("text-[11px]","t-1"===e.senderId?"text-primary/60":"text-text-tertiary"),children:(0,u.formatRelativeTime)(e.createdAt)}),e.attachments.length>0&&(0,t.jsx)(a.HiOutlinePaperClip,{className:"w-3 h-3 text-text-tertiary"})]})]})},e.id))}),(0,t.jsx)("div",{className:"p-5 border-t border-border",children:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("input",{type:"text",placeholder:"اكتب رسالتك...",className:"flex-1 bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-250"}),(0,t.jsx)("button",{type:"button",className:"p-2.5 rounded-[12px] text-text-tertiary hover:text-primary hover:bg-card/60 transition-all",children:(0,t.jsx)(a.HiOutlinePaperClip,{className:"w-5 h-5"})}),(0,t.jsx)(n.default,{variant:"primary",size:"md",leftIcon:(0,t.jsx)(a.HiOutlinePaperAirplane,{className:"w-4 h-4"}),onClick:()=>s.default.success("تم إرسال الرسالة"),children:"إرسال"})]})})]}):(0,t.jsx)("div",{className:"flex-1 flex items-center justify-center",children:(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("div",{className:"w-20 h-20 rounded-[24px] bg-card border border-border flex items-center justify-center mx-auto mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]",children:(0,t.jsx)(a.HiOutlinePaperAirplane,{className:"w-8 h-8 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-2",children:"اختر محادثة"}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-6",children:"اختر محادثة من القائمة لعرض الرسائل"}),(0,t.jsx)(n.default,{onClick:()=>v(!0),leftIcon:(0,t.jsx)(a.HiOutlinePlus,{className:"w-4 h-4"}),children:"بدء محادثة جديدة"})]})})})]}),(0,t.jsx)(o.Modal,{isOpen:y,onClose:()=>v(!1),title:"رسالة جديدة",size:"lg",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)(c.default,{label:"إلى",options:m.mockStudents.slice(0,20).map(e=>({value:e.id,label:e.name})),placeholder:"اختر المستلم"}),(0,t.jsx)(d.default,{label:"الموضوع",placeholder:"عنوان الرسالة"}),(0,t.jsx)(p.default,{label:"نص الرسالة",placeholder:"اكتب رسالتك هنا...",rows:5}),(0,t.jsxs)("div",{onClick:()=>s.default.success("قريباً..."),className:"flex items-center gap-2 p-3.5 rounded-[16px] bg-card border border-border cursor-pointer hover:bg-card/80 transition-all",children:[(0,t.jsx)(a.HiOutlinePaperClip,{className:"w-4 h-4 text-text-tertiary"}),(0,t.jsx)("span",{className:"text-sm text-text-tertiary",children:"إرفاق ملف"})]}),(0,t.jsxs)("div",{className:"pt-4 flex gap-4",children:[(0,t.jsx)(n.default,{variant:"primary",size:"lg",className:"flex-1",leftIcon:(0,t.jsx)(a.HiOutlinePaperAirplane,{className:"w-4 h-4"}),onClick:()=>{s.default.success("تم إرسال الرسالة"),v(!1)},children:"إرسال"}),(0,t.jsx)(n.default,{variant:"secondary",size:"lg",onClick:()=>v(!1),children:"إلغاء"})]})]})})]})}])}]);