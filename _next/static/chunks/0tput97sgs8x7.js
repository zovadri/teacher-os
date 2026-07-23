(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,o=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":s+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,n):i+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},x=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+x(e[r]);return t}return e};function m(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let m=x(e),p=c[m]||(c[m]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(m));if(!c[p]){let t=m!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(r=t[3].replace(o," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(o," ").trim();return s[0]})(e);c[p]=d(a?{["@keyframes "+p]:t}:t,r?"":"."+p)}let u=r&&c.g;return r&&(c.g=c[p]),i=c[p],u?t.data=t.data.replace(u,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),p})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}m.bind({g:1});let p,u,h,f=m.bind({k:1});function b(e,t){let r=this||{};return function(){let s=arguments;function a(i,n){let l=Object.assign({},i),o=l.className||a.className;r.p=Object.assign({theme:u&&u()},l),r.o=/go\d/.test(o),l.className=m.apply(r,s)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),h&&d[0]&&h(l),p(d,l)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},_=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},E=e=>Object.keys(k).forEach(t=>_(e,t)),O=(e=j)=>t=>{_(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return O(a.toasterId||(s=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},$=(e,t)=>H("blank")(e,t);$.error=H("error"),$.success=H("success"),$.loading=H("loading"),$.custom=H("custom"),$.dismiss=(e,t)=>{let r={type:3,toastId:e};t?O(t)(r):E(r)},$.dismissAll=e=>$.dismiss(void 0,e),$.remove=(e,t)=>{let r={type:4,toastId:e};t?O(t)(r):E(r)},$.removeAll=e=>$.remove(void 0,e),$.promise=(e,t,r)=>{let s=$.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?$.success(a,{id:s,...r,...null==r?void 0:r.success}):$.dismiss(s),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?$.error(a,{id:s,...r,...null==r?void 0:r.error}):$.dismiss(s)}),e};var D=1e3,T=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,R=f`
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
}`,I=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${R} 0.15s ease-out forwards;
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
`,z=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,P=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${z} 1s linear infinite;
`,B=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,X=f`
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

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${X} 0.2s ease-out forwards;
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
`,F=b("div")`
  position: absolute;
`,L=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,U=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${U} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(G,null,t):t:"blank"===r?null:a.createElement(L,null,a.createElement(P,{...s}),"loading"!==r&&a.createElement(F,null,"error"===r?a.createElement(I,{...s}):a.createElement(M,{...s})))},q=b("div")`
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
`,Y=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Z=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(K,{toast:e}),l=a.createElement(Y,{...e.ariaProps},g(e.message,e));return a.createElement(q,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:n,message:l}):a.createElement(a.Fragment,null,n,l))});s=a.createElement,d.p=void 0,p=s,u=void 0,h=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let n=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:n,className:t,style:r},i)},Q=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:n,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&s(k[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=D)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&$.dismiss(r.id);return}return setTimeout(()=>$.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let l=(0,a.useCallback)(O(t),[t]),o=(0,a.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,a.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,a.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),x=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:x}}})(r,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let n,l,o=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),x=(n=o.includes("top"),l=o.includes("center")?{justifyContent:"center"}:o.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...l});return a.createElement(J,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Q:"",style:x},"custom"===r.type?g(r.message,r):i?i(r):a.createElement(Z,{toast:r,position:o}))}))},"default",0,$,"toast",0,$],5766)},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:l,dot:o=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[n],l),children:[o&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:a}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",a),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(s.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},n={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},l=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:l,leftIcon:o,rightIcon:d,className:c,disabled:x,children:m,...p},u)=>(0,t.jsxs)("button",{ref:u,disabled:x||l,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],n[r],c),...p,children:[l?(0,t.jsx)(a.Spinner,{size:"sm"}):o,m,!l&&d]}));l.displayName="Button",e.s(["default",0,l])},3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157);let a=(0,r.forwardRef)(({label:e,error:r,leftIcon:a,rightIcon:i,className:n,...l},o)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[a&&(0,t.jsx)("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none",children:a}),(0,t.jsx)("input",{ref:o,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50","shadow-[0_2px_8px_rgba(217,119,6,0.015),0_1px_0_rgba(255,255,255,0.9)_inset]","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",a&&"pr-10",i&&"pl-10",n),...l}),i&&(0,t.jsx)("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary",children:i})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));a.displayName="Input",e.s(["default",0,a])},3649,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157);let a=(0,r.forwardRef)(({label:e,error:r,className:a,...i},n)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsx)("textarea",{ref:n,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50 min-h-[100px] resize-y","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",a),...i}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));a.displayName="Textarea",e.s(["default",0,a])},79432,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(5766),a=e.i(50719),i=e.i(37757),n=e.i(39964),l=e.i(96640),o=e.i(3812),d=e.i(3649),c=e.i(59544),x=e.i(81604),m=e.i(75157),p=e.i(64753);e.s(["default",0,function(){let[e,u]=(0,r.useState)(x.mockCmsPages.seo),[h,f]=(0,r.useState)(null),[b,g]=(0,r.useState)(!1),[y,v]=(0,r.useState)(""),j=(0,r.useMemo)(()=>e.keywords.split(",").map(e=>e.trim()).filter(Boolean),[e.keywords]),N=()=>{y.trim()&&!j.includes(y.trim())&&(u(e=>({...e,keywords:[...j,y.trim()].join(", ")})),v(""))},w=e.title.length,C=e.description.length;return(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(p.Breadcrumb,{items:[{label:"إدارة المحتوى",href:"/teacher/cms"},{label:"تحسين محركات البحث"}]}),(0,t.jsx)(i.PageHeader,{title:"إعدادات SEO",description:"تحسين محركات البحث والبيانات الوصفية للموقع"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[(0,t.jsxs)("div",{className:"lg:col-span-2 space-y-6",children:[(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(a.HiOutlineSearchCircle,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(n.CardTitle,{children:"البيانات الوصفية"})]})}),(0,t.jsxs)(n.CardContent,{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)(o.default,{label:"عنوان الموقع (Meta Title)",value:e.title,onChange:t=>u({...e,title:t.target.value})}),(0,t.jsxs)("div",{className:"flex items-center justify-between mt-1",children:[(0,t.jsxs)("span",{className:(0,m.cn)("text-xs",w>60?"text-error":"text-text-tertiary"),children:[w,"/60 حرف"]}),(0,t.jsx)("div",{className:"w-32 h-1 bg-surface-tertiary rounded-full overflow-hidden",children:(0,t.jsx)("div",{className:(0,m.cn)("h-full rounded-full transition-all",w>60?"bg-error":w>50?"bg-warning":"bg-success"),style:{width:`${Math.min(w/60*100,100)}%`}})})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)(d.default,{label:"الوصف (Meta Description)",value:e.description,onChange:t=>u({...e,description:t.target.value}),rows:3}),(0,t.jsxs)("div",{className:"flex items-center justify-between mt-1",children:[(0,t.jsxs)("span",{className:(0,m.cn)("text-xs",C>160?"text-error":"text-text-tertiary"),children:[C,"/160 حرف"]}),(0,t.jsx)("div",{className:"w-32 h-1 bg-surface-tertiary rounded-full overflow-hidden",children:(0,t.jsx)("div",{className:(0,m.cn)("h-full rounded-full transition-all",C>160?"bg-error":C>140?"bg-warning":"bg-success"),style:{width:`${Math.min(C/160*100,100)}%`}})})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-text mb-2",children:"الكلمات المفتاحية"}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,t.jsx)(o.default,{value:y,onChange:e=>v(e.target.value),placeholder:"أدخل كلمة مفتاحية...",onKeyDown:e=>"Enter"===e.key&&N()}),(0,t.jsx)(c.default,{variant:"primary",size:"md",onClick:N,children:"إضافة"})]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:j.map(e=>(0,t.jsxs)("span",{className:"inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-xs font-medium",children:[e,(0,t.jsx)("button",{type:"button",onClick:()=>{u(t=>({...t,keywords:j.filter(t=>t!==e).join(", ")}))},className:"hover:text-error transition-colors",children:(0,t.jsx)(a.HiOutlineX,{className:"w-3 h-3"})})]},e))})]})]})]}),(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(a.HiOutlinePhotograph,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(n.CardTitle,{children:"صورة OG (Open Graph)"})]})}),(0,t.jsx)(n.CardContent,{children:(0,t.jsxs)("div",{onClick:()=>document.getElementById("og-upload")?.click(),className:"border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-50/30 transition-all",children:[(0,t.jsx)("input",{id:"og-upload",type:"file",accept:"image/*",className:"hidden",onChange:e=>{let t=e.target.files?.[0];if(t){let e=new FileReader;e.onload=e=>f(e.target?.result),e.readAsDataURL(t)}}}),h?(0,t.jsx)("img",{src:h,alt:"OG Preview",className:"max-h-32 mx-auto rounded-lg"}):(0,t.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[(0,t.jsx)(a.HiOutlineUpload,{className:"w-8 h-8 text-text-tertiary"}),(0,t.jsx)("p",{className:"text-sm text-text-tertiary",children:"انقر لرفع صورة OG"}),(0,t.jsx)(l.Badge,{variant:"default",size:"sm",children:"1200أ—630 بكسل"})]})]})})]}),(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(a.HiOutlineGlobe,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(n.CardTitle,{children:"إعدادات إضافية"})]})}),(0,t.jsxs)(n.CardContent,{className:"space-y-4",children:[(0,t.jsx)(o.default,{label:"حساب Twitter/X",value:e.twitterHandle,onChange:t=>u({...e,twitterHandle:t.target.value}),placeholder:"@username",dir:"ltr"}),(0,t.jsx)(o.default,{label:"Google Analytics ID",value:e.googleAnalyticsId,onChange:t=>u({...e,googleAnalyticsId:t.target.value}),placeholder:"UA-XXXXXXXXX-X",dir:"ltr"}),(0,t.jsxs)("div",{className:"flex items-center justify-between py-2",children:[(0,t.jsx)("span",{className:"text-sm text-text-secondary",children:"تفعيل Sitemap"}),(0,t.jsx)("button",{type:"button",onClick:()=>u({...e,enableSitemap:!e.enableSitemap}),className:(0,m.cn)("w-12 h-6 rounded-full transition-colors relative",e.enableSitemap?"bg-primary":"bg-surface-tertiary"),children:(0,t.jsx)("span",{className:(0,m.cn)("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",e.enableSitemap?"translate-x-6":"translate-x-0.5")})})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between py-2",children:[(0,t.jsx)("span",{className:"text-sm text-text-secondary",children:"تفعيل Robots.txt"}),(0,t.jsx)("button",{type:"button",onClick:()=>u({...e,enableRobots:!e.enableRobots}),className:(0,m.cn)("w-12 h-6 rounded-full transition-colors relative",e.enableRobots?"bg-primary":"bg-surface-tertiary"),children:(0,t.jsx)("span",{className:(0,m.cn)("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",e.enableRobots?"translate-x-6":"translate-x-0.5")})})]})]})]})]}),(0,t.jsx)("div",{className:"space-y-6",children:(0,t.jsxs)(n.Card,{className:"sticky top-24",children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(a.HiOutlineEye,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(n.CardTitle,{children:"معاينة البحث"}),(0,t.jsx)(n.CardDescription,{children:"ظƒيف سيظهر موقعك في نتائج البحث"})]})}),(0,t.jsxs)(n.CardContent,{children:[(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-white border border-gray-200 shadow-sm",children:[(0,t.jsx)("p",{className:"text-xs text-green-700 mb-1",children:e.title?"teacher-os.com/":""}),(0,t.jsx)("h3",{className:"text-sm font-semibold text-blue-700 hover:underline cursor-pointer line-clamp-1",children:e.title||"عنوان الموقع"}),(0,t.jsx)("p",{className:"text-xs text-text-secondary mt-1 line-clamp-2",children:e.description||"وصف الموقع"}),j.length>0&&(0,t.jsx)("div",{className:"flex flex-wrap gap-1 mt-2",children:j.slice(0,4).map(e=>(0,t.jsxs)("span",{className:"text-xs text-text-tertiary",children:["· ",e]},e))})]}),(0,t.jsxs)("div",{className:"mt-4 p-4 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsx)("p",{className:"text-xs font-medium text-text-secondary mb-2",children:"ملخص SEO"}),(0,t.jsxs)("div",{className:"space-y-2 text-xs",children:[(0,t.jsxs)("div",{className:"flex justify-between",children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"العنوان"}),(0,t.jsxs)("span",{className:(0,m.cn)("font-medium",w>60?"text-error":"text-success"),children:[w,"/60"]})]}),(0,t.jsxs)("div",{className:"flex justify-between",children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"الوصف"}),(0,t.jsxs)("span",{className:(0,m.cn)("font-medium",C>160?"text-error":"text-success"),children:[C,"/160"]})]}),(0,t.jsxs)("div",{className:"flex justify-between",children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"الكلمات المفتاحية"}),(0,t.jsx)("span",{className:"font-medium text-text",children:j.length})]}),(0,t.jsxs)("div",{className:"flex justify-between",children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"Sitemap"}),(0,t.jsx)(l.Badge,{variant:e.enableSitemap?"success":"error",size:"sm",children:e.enableSitemap?"مفعل":"معطل"})]}),(0,t.jsxs)("div",{className:"flex justify-between",children:[(0,t.jsx)("span",{className:"text-text-tertiary",children:"Robots.txt"}),(0,t.jsx)(l.Badge,{variant:e.enableRobots?"success":"error",size:"sm",children:e.enableRobots?"مفعل":"معطل"})]})]})]})]}),(0,t.jsxs)(n.CardFooter,{className:"flex gap-3",children:[(0,t.jsx)(c.default,{variant:"primary",className:"flex-1",leftIcon:(0,t.jsx)(a.HiOutlineSave,{className:"w-4 h-4"}),onClick:()=>{g(!0),setTimeout(()=>g(!1),2e3),s.default.success("تم حفظ إعدادات SEO بنجاح")},children:b?"تم الحفظ!":"حفظ"}),(0,t.jsx)(c.default,{variant:"secondary",leftIcon:(0,t.jsx)(a.HiOutlineRefresh,{className:"w-4 h-4"}),onClick:()=>{u(x.mockCmsPages.seo),f(null)},children:"إعادة"})]})]})})]})]})}])}]);