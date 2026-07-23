(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:s}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",s),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(a.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157);let s=(0,r.forwardRef)(({label:e,error:r,leftIcon:s,rightIcon:l,className:o,...i},n)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[s&&(0,t.jsx)("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none",children:s}),(0,t.jsx)("input",{ref:n,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50","shadow-[0_2px_8px_rgba(217,119,6,0.015),0_1px_0_rgba(255,255,255,0.9)_inset]","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",s&&"pr-10",l&&"pl-10",o),...i}),l&&(0,t.jsx)("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary",children:l})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));s.displayName="Input",e.s(["default",0,s])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let l={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,i=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let l in e){let o=e[l];"@"==l[0]?"i"==l[1]?r=l+" "+o+";":a+="f"==l[1]?d(o,l):l+"{"+d(o,"k"==l[1]?"":t)+"}":"object"==typeof o?a+=d(o,t?t.replace(/([^,])+/g,e=>l.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):l):null!=o&&(l="-"==l[1]?l:l.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(l,o):l+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var l;let p=u(e),m=c[p]||(c[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!c[m]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(i,""));)t[4]?a.shift():t[3]?(r=t[3].replace(n," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(n," ").trim();return a[0]})(e);c[m]=d(s?{["@keyframes "+m]:t}:t,r?"":"."+m)}let x=r&&c.g;return r&&(c.g=c[m]),l=c[m],x?t.data=t.data.replace(x,l):-1===t.data.indexOf(l)&&(t.data=a?l+t.data:t.data+l),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let l=t[s];if(l&&l.call){let e=l(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;l=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==l?"":l)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||l})(a.target),a.g,a.o,a.k)}p.bind({g:1});let m,x,b,h=p.bind({k:1});function f(e,t){let r=this||{};return function(){let a=arguments;function s(l,o){let i=Object.assign({},l),n=i.className||s.className;r.p=Object.assign({theme:x&&x()},i),r.o=/go\d/.test(n),i.className=p.apply(r,a)+(n?" "+n:""),t&&(i.ref=o);let d=e;return e[0]&&(d=i.as||e,delete i.as),b&&d[0]&&b(i),m(d,i)}return t?t(s):s}}var y=(e,t)=>"function"==typeof e?e(t):e,g=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let l=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+l}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},_=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},R=e=>Object.keys(k).forEach(t=>_(e,t)),S=(e=j)=>t=>{_(t,e)},E={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||g()}))(t,e,r);return S(s.toasterId||(a=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},T=(e,t)=>O("blank")(e,t);T.error=O("error"),T.success=O("success"),T.loading=O("loading"),T.custom=O("custom"),T.dismiss=(e,t)=>{let r={type:3,toastId:e};t?S(t)(r):R(r)},T.dismissAll=e=>T.dismiss(void 0,e),T.remove=(e,t)=>{let r={type:4,toastId:e};t?S(t)(r):R(r)},T.removeAll=e=>T.remove(void 0,e),T.promise=(e,t,r)=>{let a=T.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?y(t.success,e):void 0;return s?T.success(s,{id:a,...r,...null==r?void 0:r.success}):T.dismiss(a),e}).catch(e=>{let s=t.error?y(t.error,e):void 0;s?T.error(s,{id:a,...r,...null==r?void 0:r.error}):T.dismiss(a)}),e};var $=1e3,H=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,A=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,D=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,I=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,F=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
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
}`,L=f("div")`
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
`,M=f("div")`
  position: absolute;
`,U=f("div")`
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
}`,W=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,q=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(W,null,t):t:"blank"===r?null:s.createElement(U,null,s.createElement(F,{...a}),"loading"!==r&&s.createElement(M,null,"error"===r?s.createElement(D,{...a}):s.createElement(L,{...a})))},G=f("div")`
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
`,Y=f("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Z=s.memo(({toast:e,position:t,style:r,children:a})=>{let l=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(q,{toast:e}),i=s.createElement(Y,{...e.ariaProps},y(e.message,e));return s.createElement(G,{className:e.className,style:{...l,...r,...e.style}},"function"==typeof a?a({icon:o,message:i}):s.createElement(s.Fragment,null,o,i))});a=s.createElement,d.p=void 0,m=a,x=void 0,b=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:a,children:l})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},l)},Q=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:l,toasterId:o,containerStyle:i,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(k[t]||C),l=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(l.current!==k[t]&&a(k[t]),w.push([t,a]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||E[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),l=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=$)=>{if(l.has(e))return;let r=setTimeout(()=>{l.delete(e),i({type:4,toastId:e})},t);l.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&T.dismiss(r.id);return}return setTimeout(()=>T.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let i=(0,s.useCallback)(S(t),[t]),n=(0,s.useCallback)(()=>{i({type:5,time:Date.now()})},[i]),d=(0,s.useCallback)((e,t)=>{i({type:1,toast:{id:e,height:t}})},[i]),c=(0,s.useCallback)(()=>{a&&i({type:6,time:Date.now()})},[a,i]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:l}=t||{},o=r.filter(t=>(t.position||l)===(e.position||l)&&t.height),i=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<i&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=l.get(e.id);t&&(clearTimeout(t),l.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,i,n=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(o=n.includes("top"),i=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...i});return s.createElement(J,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Q:"",style:u},"custom"===r.type?y(r.message,r):l?l(r):s.createElement(Z,{toast:r,position:n}))}))},"default",0,T,"toast",0,T],5766)},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:a,hover:s=!1,onClick:l}){return(0,t.jsx)("div",{onClick:l,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",l&&"cursor-pointer",a),children:e})},"CardContent",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",a),children:e})},"CardDescription",0,function({children:e,className:a}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",a),children:e})},"CardFooter",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",a),children:e})},"CardHeader",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",a),children:e})},"CardTitle",0,function({children:e,className:a}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",a),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:a,children:s,className:l,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",l),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),a&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:a})]}),s&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:s})]})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(58594);let l={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},i=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:i,leftIcon:n,rightIcon:d,className:c,disabled:u,children:p,...m},x)=>(0,t.jsxs)("button",{ref:x,disabled:u||i,className:(0,a.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",l[e],o[r],c),...m,children:[i?(0,t.jsx)(s.Spinner,{size:"sm"}):n,p,!i&&d]}));i.displayName="Button",e.s(["default",0,i])},67073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(50719);let l=(0,r.forwardRef)(({label:e,error:r,options:l,placeholder:o,className:i,...n},d)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:d,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",i),...n,children:[o&&(0,t.jsx)("option",{value:"",children:o}),l.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(s.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));l.displayName="Select",e.s(["default",0,l])},28539,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(5766),s=e.i(50719),l=e.i(37757),o=e.i(39964),i=e.i(3812),n=e.i(67073),d=e.i(59544),c=e.i(81604),u=e.i(64753);let p=[{value:"Cairo",label:"Cairo"},{value:"Noto Sans Arabic",label:"Noto Sans Arabic"},{value:"Tajawal",label:"Tajawal"},{value:"Almarai",label:"Almarai"},{value:"Readex Pro",label:"Readex Pro"}],m=[{value:"rounded-none",label:"بدون تدوير"},{value:"rounded-sm",label:"صغير"},{value:"rounded-md",label:"متوسط"},{value:"rounded-lg",label:"كبير"},{value:"rounded-xl",label:"كبير جداً"},{value:"rounded-2xl",label:"ضخم"},{value:"rounded-full",label:"دائري بالكامل"}],x=[{value:"none",label:"بدون حركة"},{value:"subtle",label:"خفيف"},{value:"smooth",label:"ناعم"},{value:"dynamic",label:"ديناميكي"},{value:"playful",label:"مرح"}],b=[{value:"boxed",label:"مربع (Boxed)"},{value:"fullwidth",label:"عرض كامل"}],h=[{value:"default",label:"افتراضي"},{value:"glass",label:"زجاجي (Glass)"},{value:"solid",label:"صلب"},{value:"transparent",label:"شفاف"}],f=[{value:"light",label:"فاتح"},{value:"dark",label:"داكن"},{value:"colored",label:"ملون"}];e.s(["default",0,function(){let[e,y]=(0,r.useState)(c.mockCmsPages.theme),[g,v]=(0,r.useState)(!1),j=(0,r.useMemo)(()=>({fontFamily:e.fontFamily,borderRadius:"rounded-none"===e.borderRadius?"0":"rounded-sm"===e.borderRadius?"2px":"rounded-md"===e.borderRadius?"6px":"rounded-lg"===e.borderRadius?"8px":"rounded-xl"===e.borderRadius?"12px":"rounded-2xl"===e.borderRadius?"16px":"9999px"}),[e]);return(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(u.Breadcrumb,{items:[{label:"إدارة المحتوى",href:"/teacher/cms"},{label:"المظهر"}]}),(0,t.jsx)(l.PageHeader,{title:"إعدادات المظهر",description:"تخصيص ألوان المنصة والخطوط والأنماط"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[(0,t.jsxs)("div",{className:"lg:col-span-2 space-y-6",children:[(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlineColorSwatch,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(o.CardTitle,{children:"الألوان"})]})}),(0,t.jsxs)(o.CardContent,{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-text mb-2",children:"اللون الأساسي"}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("input",{type:"color",value:e.primaryColor,onChange:t=>y({...e,primaryColor:t.target.value}),className:"w-12 h-12 rounded-xl border border-border cursor-pointer bg-transparent"}),(0,t.jsx)(i.default,{value:e.primaryColor,onChange:t=>y({...e,primaryColor:t.target.value}),className:"flex-1"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-text mb-2",children:"اللون الثانوي"}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("input",{type:"color",value:e.secondaryColor,onChange:t=>y({...e,secondaryColor:t.target.value}),className:"w-12 h-12 rounded-xl border border-border cursor-pointer bg-transparent"}),(0,t.jsx)(i.default,{value:e.secondaryColor,onChange:t=>y({...e,secondaryColor:t.target.value}),className:"flex-1"})]})]})]})]}),(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlinePencil,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(o.CardTitle,{children:"الخطوط والأنماط"})]})}),(0,t.jsxs)(o.CardContent,{className:"space-y-4",children:[(0,t.jsx)(n.default,{label:"نوع الخط",options:p,value:e.fontFamily,onChange:t=>y({...e,fontFamily:t.target.value})}),(0,t.jsx)(n.default,{label:"تدوير الزوايا",options:m,value:e.borderRadius,onChange:t=>y({...e,borderRadius:t.target.value})}),(0,t.jsx)(n.default,{label:"نمط الحركة",options:x,value:e.animationStyle,onChange:t=>y({...e,animationStyle:t.target.value})})]})]}),(0,t.jsxs)(o.Card,{children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlineTemplate,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(o.CardTitle,{children:"التخطيط"})]})}),(0,t.jsxs)(o.CardContent,{className:"space-y-4",children:[(0,t.jsx)(n.default,{label:"عرض التخطيط",options:b,value:e.layoutWidth,onChange:t=>y({...e,layoutWidth:t.target.value})}),(0,t.jsx)(n.default,{label:"نمط الرأس",options:h,value:e.headerStyle,onChange:t=>y({...e,headerStyle:t.target.value})}),(0,t.jsx)(n.default,{label:"نمط التذييل",options:f,value:e.footerStyle,onChange:t=>y({...e,footerStyle:t.target.value})})]})]})]}),(0,t.jsx)("div",{className:"space-y-6",children:(0,t.jsxs)(o.Card,{className:"sticky top-24",children:[(0,t.jsx)(o.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(s.HiOutlinePhotograph,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(o.CardTitle,{children:"معاينة حية"})]})}),(0,t.jsx)(o.CardContent,{children:(0,t.jsxs)("div",{className:"rounded-xl border-2 border-border overflow-hidden transition-all",style:{fontFamily:j.fontFamily},children:[(0,t.jsx)("div",{className:`p-4 ${"glass"===e.headerStyle?"bg-white/80 backdrop-blur-sm":"solid"===e.headerStyle?"bg-white":"transparent"===e.headerStyle?"bg-transparent":"bg-gray-100"} border-b border-border`,children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold",style:{backgroundColor:e.primaryColor},children:"T"}),(0,t.jsx)("span",{className:"font-bold text-sm",children:"TeacherOS"})]}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("div",{className:"w-2 h-2 rounded-full bg-text-tertiary"}),(0,t.jsx)("div",{className:"w-2 h-2 rounded-full bg-text-tertiary"})]})]})}),(0,t.jsxs)("div",{className:"p-6 space-y-4 bg-white",children:[(0,t.jsx)("div",{className:"flex gap-3",children:["الرئيسية","الكورسات","الامتحانات"].map(e=>(0,t.jsx)("span",{className:"text-xs text-text-secondary hover:text-text cursor-pointer transition-colors",children:e},e))}),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)("div",{className:"h-4 w-3/4 rounded-full bg-gray-200",style:{borderRadius:j.borderRadius}}),(0,t.jsx)("div",{className:"h-3 w-1/2 rounded-full bg-gray-100",style:{borderRadius:j.borderRadius}}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{type:"button",className:"px-4 py-2 text-white text-xs rounded-lg",style:{backgroundColor:e.primaryColor,borderRadius:j.borderRadius},children:"ابدأ الآن"}),(0,t.jsx)("button",{type:"button",className:"px-4 py-2 text-xs rounded-lg border border-gray-200",style:{borderRadius:j.borderRadius},children:"اعرف المزيد"})]})]})]}),(0,t.jsx)("div",{className:`p-3 text-center text-xs ${"dark"===e.footerStyle?"bg-gray-900 text-white":"colored"===e.footerStyle?"bg-indigo-600 text-white":"bg-gray-100 text-gray-600"}`,children:"© 2025 TeacherOS. جميع الحقوق محفوظة."})]})}),(0,t.jsxs)(o.CardFooter,{className:"flex gap-3",children:[(0,t.jsx)(d.default,{variant:"primary",className:"flex-1",leftIcon:(0,t.jsx)(s.HiOutlineSave,{className:"w-4 h-4"}),onClick:()=>{v(!0),setTimeout(()=>v(!1),2e3),a.default.success("تم حفظ المظهر بنجاح")},children:g?"تم الحفظ!":"حفظ التغييرات"}),(0,t.jsx)(d.default,{variant:"secondary",leftIcon:(0,t.jsx)(s.HiOutlineRefresh,{className:"w-4 h-4"}),onClick:()=>{y(c.mockCmsPages.theme)},children:"إعادة تعيين"})]})]})})]})]})}])}]);