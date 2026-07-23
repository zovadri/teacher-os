(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e};function p(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let p=m(e),u=c[p]||(c[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!c[u]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?a.shift():t[3]?(r=t[3].replace(n," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(n," ").trim();return a[0]})(e);c[u]=d(s?{["@keyframes "+u]:t}:t,r?"":"."+u)}let x=r&&c.g;return r&&(c.g=c[u]),i=c[u],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),u})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}p.bind({g:1});let u,x,h,f=p.bind({k:1});function b(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let l=Object.assign({},i),n=l.className||s.className;r.p=Object.assign({theme:x&&x()},l),r.o=/go\d/.test(n),l.className=p.apply(r,a)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),h&&d[0]&&h(l),u(d,l)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},_=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},E=e=>Object.keys(k).forEach(t=>_(e,t)),O=(e=j)=>t=>{_(t,e)},H={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return O(s.toasterId||(a=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},$=(e,t)=>P("blank")(e,t);$.error=P("error"),$.success=P("success"),$.loading=P("loading"),$.custom=P("custom"),$.dismiss=(e,t)=>{let r={type:3,toastId:e};t?O(t)(r):E(r)},$.dismissAll=e=>$.dismiss(void 0,e),$.remove=(e,t)=>{let r={type:4,toastId:e};t?O(t)(r):E(r)},$.removeAll=e=>$.remove(void 0,e),$.promise=(e,t,r)=>{let a=$.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?$.success(s,{id:a,...r,...null==r?void 0:r.success}):$.dismiss(a),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?$.error(s,{id:a,...r,...null==r?void 0:r.error}):$.dismiss(a)}),e};var T=1e3,A=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,I=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,S=b("div")`
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
`,L=f`
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
`,R=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=f`
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
}`,B=b("div")`
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
    animation: ${F} 0.2s ease-out forwards;
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
`,U=b("div")`
  position: absolute;
`,M=b("div")`
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
}`,K=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,q=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(K,null,t):t:"blank"===r?null:s.createElement(M,null,s.createElement(z,{...a}),"loading"!==r&&s.createElement(U,null,"error"===r?s.createElement(S,{...a}):s.createElement(B,{...a})))},J=b("div")`
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
`,V=b("div")`
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
`];return{animation:t?`${f(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(q,{toast:e}),l=s.createElement(V,{...e.ariaProps},g(e.message,e));return s.createElement(J,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:l}):s.createElement(s.Fragment,null,o,l))});a=s.createElement,d.p=void 0,u=a,x=void 0,h=void 0;var Z=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},Q=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(k[t]||C),i=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(i.current!==k[t]&&a(k[t]),w.push([t,a]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||H[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=T)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&$.dismiss(r.id);return}return setTimeout(()=>$.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let l=(0,s.useCallback)(O(t),[t]),n=(0,s.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,s.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,s.useCallback)(()=>{a&&l({type:6,time:Date.now()})},[a,l]),m=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<l&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:m}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,l,n=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),m=(o=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...l});return s.createElement(Z,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Q:"",style:m},"custom"===r.type?g(r.message,r):i?i(r):s.createElement(Y,{toast:r,position:n}))}))},"default",0,$,"toast",0,$],5766)},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:l,dot:n=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",a[i],s[o],l),children:[n&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:a,hover:s=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",a),children:e})},"CardContent",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",a),children:e})},"CardDescription",0,function({children:e,className:a}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",a),children:e})},"CardFooter",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",a),children:e})},"CardHeader",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",a),children:e})},"CardTitle",0,function({children:e,className:a}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",a),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:a,children:s,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),a&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:a})]}),s&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:s})]})}])},64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:s}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",s),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(a.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},l=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:l,leftIcon:n,rightIcon:d,className:c,disabled:m,children:p,...u},x)=>(0,t.jsxs)("button",{ref:x,disabled:m||l,className:(0,a.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],c),...u,children:[l?(0,t.jsx)(s.Spinner,{size:"sm"}):n,p,!l&&d]}));l.displayName="Button",e.s(["default",0,l])},3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157);let s=(0,r.forwardRef)(({label:e,error:r,leftIcon:s,rightIcon:i,className:o,...l},n)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[s&&(0,t.jsx)("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none",children:s}),(0,t.jsx)("input",{ref:n,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50","shadow-[0_2px_8px_rgba(217,119,6,0.015),0_1px_0_rgba(255,255,255,0.9)_inset]","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",s&&"pr-10",i&&"pl-10",o),...l}),i&&(0,t.jsx)("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary",children:i})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));s.displayName="Input",e.s(["default",0,s])},98706,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={sm:"w-8 h-8 text-xs",md:"w-10 h-10 text-sm",lg:"w-12 h-12 text-base"};e.s(["Avatar",0,function({src:e,alt:s="",name:i,size:o="md",className:l}){let n=i?i.split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase():"?";return e?(0,t.jsx)("img",{src:e,alt:s,className:(0,r.cn)("rounded-full object-cover border border-border",a[o],l)}):(0,t.jsx)("div",{className:(0,r.cn)("rounded-full bg-primary-100 text-primary flex items-center justify-center font-medium border border-primary-200",a[o],l),children:n})}])},53554,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(5766),s=e.i(50719),i=e.i(37757),o=e.i(39964),l=e.i(96640),n=e.i(98706),d=e.i(64753),c=e.i(3812),m=e.i(59544),p=e.i(81604);let u=[{key:"facebook",label:"فيسبوك",placeholder:"https://facebook.com/..."},{key:"twitter",label:"تويتر",placeholder:"https://twitter.com/..."},{key:"youtube",label:"يوتيوب",placeholder:"https://youtube.com/..."},{key:"whatsapp",label:"واتساب",placeholder:"https://wa.me/..."},{key:"telegram",label:"تيليجرام",placeholder:"https://t.me/..."}];e.s(["default",0,function(){let[e,x]=(0,r.useState)(p.mockCmsPages.branding),[h,f]=(0,r.useState)(null),[b,g]=(0,r.useState)(null),[y,v]=(0,r.useState)(!1),j=(0,r.useRef)(null),N=(0,r.useRef)(null);return(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(d.Breadcrumb,{items:[{label:"إدارة المحتوى",href:"/teacher/cms"},{label:"العلامة التجارية"}]}),(0,t.jsx)(i.PageHeader,{title:"العلامة التجارية",description:"إدارة الشعار والاسم والروابط الاجتماعية"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[(0,t.jsxs)("div",{className:"lg:col-span-2 space-y-6",children:[(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlinePhotograph,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(o.CardTitle,{children:"الشعار والفافيكون"})]})}),(0,t.jsxs)(o.CardContent,{className:"space-y-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text mb-2",children:"شعار الموقع (Logo)"}),(0,t.jsxs)("div",{onClick:()=>j.current?.click(),className:"border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-50/30 transition-all",children:[(0,t.jsx)("input",{ref:j,type:"file",accept:"image/*",onChange:e=>{let t=e.target.files?.[0];if(t){let e=new FileReader;e.onload=e=>f(e.target?.result),e.readAsDataURL(t)}},className:"hidden"}),h?(0,t.jsx)("img",{src:h,alt:"Logo",className:"max-h-24 mx-auto rounded-lg"}):(0,t.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[(0,t.jsx)(s.HiOutlineUpload,{className:"w-8 h-8 text-text-tertiary"}),(0,t.jsx)("p",{className:"text-sm text-text-tertiary",children:"انقر لرفع الشعار"}),(0,t.jsx)(l.Badge,{variant:"default",size:"sm",children:"PNG, SVG, JPG"})]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text mb-2",children:"أيقونة الموقع (Favicon)"}),(0,t.jsxs)("div",{onClick:()=>N.current?.click(),className:"border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-50/30 transition-all w-40",children:[(0,t.jsx)("input",{ref:N,type:"file",accept:"image/*",onChange:e=>{let t=e.target.files?.[0];if(t){let e=new FileReader;e.onload=e=>g(e.target?.result),e.readAsDataURL(t)}},className:"hidden"}),b?(0,t.jsx)("img",{src:b,alt:"Favicon",className:"w-12 h-12 mx-auto rounded-lg"}):(0,t.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[(0,t.jsx)(s.HiOutlineUpload,{className:"w-6 h-6 text-text-tertiary"}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"رفع الفافيكون"})]})]})]})]})]}),(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlineGlobe,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(o.CardTitle,{children:"معلومات العلامة التجارية"})]})}),(0,t.jsxs)(o.CardContent,{className:"space-y-4",children:[(0,t.jsx)(c.default,{label:"اسم العلامة التجارية",value:e.brandName,onChange:t=>x({...e,brandName:t.target.value}),leftIcon:(0,t.jsx)(s.HiOutlineGlobe,{className:"w-4 h-4"})}),(0,t.jsx)(c.default,{label:"الشعار (Slogan)",value:e.brandSlogan,onChange:t=>x({...e,brandSlogan:t.target.value})})]})]}),(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlineLink,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(o.CardTitle,{children:"روابط التواصل الاجتماعي"})]})}),(0,t.jsx)(o.CardContent,{className:"space-y-4",children:u.map(r=>(0,t.jsx)(c.default,{label:r.label,placeholder:r.placeholder,value:e.socialLinks[r.key]||"",onChange:e=>{var t,a;return t=r.key,a=e.target.value,void x(e=>({...e,socialLinks:{...e.socialLinks,[t]:a}}))},dir:"ltr"},r.key))})]}),(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlineMail,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(o.CardTitle,{children:"معلومات الاتصال"})]})}),(0,t.jsxs)(o.CardContent,{className:"space-y-4",children:[(0,t.jsx)(c.default,{label:"البريد الإلكتروني",value:e.contactEmail,onChange:t=>x({...e,contactEmail:t.target.value}),leftIcon:(0,t.jsx)(s.HiOutlineMail,{className:"w-4 h-4"}),dir:"ltr"}),(0,t.jsx)(c.default,{label:"رقم الهاتف",value:e.contactPhone,onChange:t=>x({...e,contactPhone:t.target.value}),leftIcon:(0,t.jsx)(s.HiOutlinePhone,{className:"w-4 h-4"}),dir:"ltr"})]})]})]}),(0,t.jsx)("div",{className:"space-y-6",children:(0,t.jsxs)(o.Card,{className:"sticky top-24",children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsx)(o.CardTitle,{children:"معاينة العلامة التجارية"})}),(0,t.jsxs)(o.CardContent,{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-4 p-4 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsx)(n.Avatar,{src:h||void 0,name:e.brandName,size:"lg"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-bold text-text",children:e.brandName}),(0,t.jsx)("p",{className:"text-xs text-text-secondary",children:e.brandSlogan})]})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsx)("p",{className:"text-xs text-text-tertiary mb-2",children:"البريد"}),(0,t.jsx)("p",{className:"text-sm text-text font-medium",dir:"ltr",children:e.contactEmail})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsx)("p",{className:"text-xs text-text-tertiary mb-2",children:"الهاتف"}),(0,t.jsx)("p",{className:"text-sm text-text font-medium",dir:"ltr",children:e.contactPhone})]}),(0,t.jsx)("div",{className:"flex items-center gap-2 flex-wrap",children:Object.entries(e.socialLinks).filter(([,e])=>e&&"#"!==e).map(([e])=>(0,t.jsx)(l.Badge,{variant:"info",size:"sm",children:e},e))})]}),(0,t.jsxs)(o.CardFooter,{className:"flex gap-3",children:[(0,t.jsx)(m.default,{variant:"primary",className:"flex-1",leftIcon:(0,t.jsx)(s.HiOutlineSave,{className:"w-4 h-4"}),onClick:()=>{v(!0),setTimeout(()=>v(!1),2e3),a.default.success("تم حفظ العلامة التجارية بنجاح")},children:y?"تم الحفظ!":"حفظ"}),(0,t.jsx)(m.default,{variant:"secondary",leftIcon:(0,t.jsx)(s.HiOutlineRefresh,{className:"w-4 h-4"}),onClick:()=>{x(p.mockCmsPages.branding),f(null),g(null)},children:"إعادة"})]})]})})]})]})}])}]);