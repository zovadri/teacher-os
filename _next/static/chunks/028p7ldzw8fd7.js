(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:s}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",s),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(a.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157);let s=(0,r.forwardRef)(({label:e,error:r,leftIcon:s,rightIcon:i,className:l,...o},n)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[s&&(0,t.jsx)("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none",children:s}),(0,t.jsx)("input",{ref:n,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50","shadow-[0_2px_8px_rgba(217,119,6,0.015),0_1px_0_rgba(255,255,255,0.9)_inset]","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",s&&"pr-10",i&&"pl-10",l),...o}),i&&(0,t.jsx)("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary",children:i})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));s.displayName="Input",e.s(["default",0,s])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+l+";":a+="f"==i[1]?d(l,i):i+"{"+d(l,"k"==i[1]?"":t)+"}":"object"==typeof l?a+=d(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,l):i+":"+l+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let p=u(e),x=c[p]||(c[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!c[x]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=l.exec(e.replace(o,""));)t[4]?a.shift():t[3]?(r=t[3].replace(n," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(n," ").trim();return a[0]})(e);c[x]=d(s?{["@keyframes "+x]:t}:t,r?"":"."+x)}let m=r&&c.g;return r&&(c.g=c[x]),i=c[x],m?t.data=t.data.replace(m,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),x})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}p.bind({g:1});let x,m,h,f=p.bind({k:1});function b(e,t){let r=this||{};return function(){let a=arguments;function s(i,l){let o=Object.assign({},i),n=o.className||s.className;r.p=Object.assign({theme:m&&m()},o),r.o=/go\d/.test(n),o.className=p.apply(r,a)+(n?" "+n:""),t&&(o.ref=l);let d=e;return e[0]&&(d=o.as||e,delete o.as),h&&d[0]&&h(o),x(d,o)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),y=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},C=[],w={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},_=(e,t=j)=>{k[t]=N(k[t]||w,e),C.forEach(([e,r])=>{e===t&&r(k[t])})},D=e=>Object.keys(k).forEach(t=>_(e,t)),E=(e=j)=>t=>{_(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||v()}))(t,e,r);return E(s.toasterId||(a=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},H=(e,t)=>P("blank")(e,t);H.error=P("error"),H.success=P("success"),H.loading=P("loading"),H.custom=P("custom"),H.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):D(r)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):D(r)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,r)=>{let a=H.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?H.success(s,{id:a,...r,...null==r?void 0:r.success}):H.dismiss(a),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?H.error(s,{id:a,...r,...null==r?void 0:r.error}):H.dismiss(a)}),e};var z=1e3,T=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,$=f`
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

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,A=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,F=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${A} 1s linear infinite;
`,R=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,L=f`
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
}`,q=b("div")`
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
`,M=b("div")`
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
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(G,null,t):t:"blank"===r?null:s.createElement(M,null,s.createElement(F,{...a}),"loading"!==r&&s.createElement(B,null,"error"===r?s.createElement(S,{...a}):s.createElement(q,{...a})))},J=b("div")`
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
`,W=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Y=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=y()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},l=s.createElement(K,{toast:e}),o=s.createElement(W,{...e.ariaProps},g(e.message,e));return s.createElement(J,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:l,message:o}):s.createElement(s.Fragment,null,l,o))});a=s.createElement,d.p=void 0,x=a,m=void 0,h=void 0;var Z=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let l=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:l,className:t,style:r},i)},Q=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:l,containerStyle:o,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(k[t]||w),i=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(i.current!==k[t]&&a(k[t]),C.push([t,a]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let l=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:l}})(e,t),i=(0,s.useRef)(new Map).current,l=(0,s.useCallback)((e,t=z)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&H.dismiss(r.id);return}return setTimeout(()=>H.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let o=(0,s.useCallback)(E(t),[t]),n=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,s.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},l=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=l.findIndex(t=>t.id===e.id),n=l.filter((e,t)=>t<o&&e.visible).length;return l.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)l(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,l]),{toasts:r,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}})(r,l);return s.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let l,o,n=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(l=n.includes("top"),o=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:y()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(l?1:-1)}px)`,...l?{top:0}:{bottom:0},...o});return s.createElement(Z,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Q:"",style:u},"custom"===r.type?g(r.message,r):i?i(r):s.createElement(Y,{toast:r,position:n}))}))},"default",0,H,"toast",0,H],5766)},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:a,hover:s=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",a),children:e})},"CardContent",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",a),children:e})},"CardDescription",0,function({children:e,className:a}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",a),children:e})},"CardFooter",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",a),children:e})},"CardHeader",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",a),children:e})},"CardTitle",0,function({children:e,className:a}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",a),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:a,children:s,className:i,gradient:l=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",l?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),a&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:a})]}),s&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:s})]})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},l={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},o=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:o,leftIcon:n,rightIcon:d,className:c,disabled:u,children:p,...x},m)=>(0,t.jsxs)("button",{ref:m,disabled:u||o,className:(0,a.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],l[r],c),...x,children:[o?(0,t.jsx)(s.Spinner,{size:"sm"}):n,p,!o&&d]}));o.displayName="Button",e.s(["default",0,o])},67073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(50719);let i=(0,r.forwardRef)(({label:e,error:r,options:i,placeholder:l,className:o,...n},d)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:d,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",o),...n,children:[l&&(0,t.jsx)("option",{value:"",children:l}),i.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(s.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));i.displayName="Select",e.s(["default",0,i])},3649,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157);let s=(0,r.forwardRef)(({label:e,error:r,className:s,...i},l)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsx)("textarea",{ref:l,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50 min-h-[100px] resize-y","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",s),...i}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));s.displayName="Textarea",e.s(["default",0,s])},22779,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(18566),i=e.i(5766),l=e.i(50719),o=e.i(37757),n=e.i(64753),d=e.i(39964),c=e.i(3812),u=e.i(67073),p=e.i(3649),x=e.i(59544);let m=[{value:"لغة عربية",label:"لغة عربية"},{value:"لغة إنجليزية",label:"لغة إنجليزية"},{value:"رياضيات",label:"رياضيات"},{value:"علوم",label:"علوم"},{value:"دراسات",label:"دراسات"}],h=[{value:"أولى ثانوي",label:"أولى ثانوي"},{value:"ثانية ثانوي",label:"ثانية ثانوي"},{value:"ثالثة ثانوي",label:"ثالثة ثانوي"}],f=[{value:"الأول",label:"الأول"},{value:"الثاني",label:"الثاني"}],b=[{value:"لغويات",label:"لغويات"},{value:"أدب",label:"أدب"},{value:"مهارات",label:"مهارات"},{value:"مراجعة",label:"مراجعة"}],g=[{value:"draft",label:"مسودة"},{value:"published",label:"منشور"},{value:"coming-soon",label:"قريباً"}],v=[{value:"available",label:"متاح"},{value:"locked",label:"مقفل"},{value:"coming-soon",label:"قريباً"}],y={title:"",shortDescription:"",description:"",subject:"لغة عربية",grade:"ثالثة ثانوي",term:"الأول",category:"لغويات",price:"",discountPrice:"",status:"draft",isFree:!1,requiresCode:!1},j=0,N=0;function C(){return j+=1,{id:`lesson-${j}`,title:"",duration:"30",status:"available",prerequisite:"",availableDate:""}}e.s(["default",0,function(){let e=(0,s.useRouter)(),[j,w]=(0,r.useState)(y),[k,_]=(0,r.useState)({}),[D,E]=(0,r.useState)(!1),[O,P]=(0,r.useState)(!1),[H,z]=(0,r.useState)([]),T=(e,t)=>{w(r=>({...r,[e]:t})),k[e]&&_(t=>({...t,[e]:void 0}))},$=async e=>{let t;e.preventDefault(),t={},j.title.trim()||(t.title="عنوان الكورس مطلوب"),j.shortDescription.trim()||(t.shortDescription="الوصف المختصر مطلوب"),j.description.trim()||(t.description="الوصف الكامل مطلوب"),!j.isFree&&(!j.price||0>=Number(j.price))&&(t.price="السعر مطلوب وقيمته أكبر من 0"),j.discountPrice&&Number(j.discountPrice)>=Number(j.price)&&(t.discountPrice="سعر الخصم يجب أن يكون أقل من السعر الأصلي"),_(t),0===Object.keys(t).length&&(E(!0),await new Promise(e=>setTimeout(e,1500)),E(!1),P(!0),i.default.success("تم إنشاء الكورس بنجاح!"))},I=(e,t,r)=>z(a=>a.map(a=>a.id===e?{...a,lessons:a.lessons.map(e=>e.id===t?{...e,...r}:e)}:a)),S=H.flatMap(e=>e.lessons.filter(e=>e.title.trim()).map(e=>({value:e.id,label:e.title})));return O?(0,t.jsx)(a.motion.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:"p-4 md:p-6",children:(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center py-20",children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4",children:(0,t.jsx)(l.HiOutlineCheck,{size:32,className:"text-success"})}),(0,t.jsx)("h2",{className:"text-xl font-bold text-text mb-2",children:"تم إنشاء الكورس بنجاح"}),(0,t.jsxs)("p",{className:"text-sm text-text-tertiary mb-6",children:["تم حفظ الكورس “",j.title,"” بنجاح"]}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(x.default,{variant:"primary",onClick:()=>{P(!1),w(y),z([])},children:"إنشاء كورس آخر"}),(0,t.jsx)(x.default,{variant:"secondary",onClick:()=>e.push("/teacher/courses"),leftIcon:(0,t.jsx)(l.HiOutlineArrowRight,{size:18}),children:"العودة إلى الكورسات"})]})]})}):(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(n.Breadcrumb,{items:[{label:"الكورسات",href:"/teacher/courses"},{label:"إضافة كورس جديد"}]}),(0,t.jsx)(o.PageHeader,{title:"إضافة كورس جديد"}),(0,t.jsxs)("form",{onSubmit:$,className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[(0,t.jsxs)("div",{className:"lg:col-span-2 space-y-6",children:[(0,t.jsxs)(d.Card,{children:[(0,t.jsx)(d.CardHeader,{children:(0,t.jsx)(d.CardTitle,{children:"المعلومات الأساسية"})}),(0,t.jsxs)(d.CardContent,{className:"space-y-4",children:[(0,t.jsx)(c.default,{label:"عنوان الكورس",value:j.title,onChange:e=>T("title",e.target.value),placeholder:"مثال: النحو والصرف",error:k.title}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsx)(u.default,{label:"المادة",value:j.subject,onChange:e=>T("subject",e.target.value),options:m}),(0,t.jsx)(u.default,{label:"الصف",value:j.grade,onChange:e=>T("grade",e.target.value),options:h})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsx)(u.default,{label:"الترم",value:j.term,onChange:e=>T("term",e.target.value),options:f}),(0,t.jsx)(u.default,{label:"التصنيف",value:j.category,onChange:e=>T("category",e.target.value),options:b})]})]})]}),(0,t.jsxs)(d.Card,{children:[(0,t.jsx)(d.CardHeader,{children:(0,t.jsx)(d.CardTitle,{children:"الوصف"})}),(0,t.jsxs)(d.CardContent,{className:"space-y-4",children:[(0,t.jsx)(c.default,{label:"الوصف المختصر",value:j.shortDescription,onChange:e=>T("shortDescription",e.target.value),placeholder:"وصف مختصر للكورس...",error:k.shortDescription}),(0,t.jsx)(p.default,{label:"الوصف الكامل",value:j.description,onChange:e=>T("description",e.target.value),placeholder:"وصف تفصيلي لمحتوى الكورس...",error:k.description})]})]}),(0,t.jsxs)(d.Card,{children:[(0,t.jsx)(d.CardHeader,{children:(0,t.jsx)(d.CardTitle,{children:"التسعير"})}),(0,t.jsxs)(d.CardContent,{className:"space-y-4",children:[(0,t.jsx)("div",{className:"flex items-center gap-3",children:(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:j.isFree,onChange:e=>T("isFree",e.target.checked),className:"w-4 h-4 accent-primary"}),(0,t.jsx)("span",{className:"text-sm text-text",children:"كورس مجاني"})]})}),!j.isFree&&(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsx)(c.default,{label:"السعر (جنيه)",type:"number",value:j.price,onChange:e=>T("price",e.target.value),placeholder:"0",error:k.price}),(0,t.jsx)(c.default,{label:"سعر الخصم (اختياري)",type:"number",value:j.discountPrice,onChange:e=>T("discountPrice",e.target.value),placeholder:"0",error:k.discountPrice})]})]})]}),(0,t.jsxs)(d.Card,{children:[(0,t.jsx)(d.CardHeader,{children:(0,t.jsx)(d.CardTitle,{children:"الفصول والدروس"})}),(0,t.jsxs)(d.CardContent,{className:"space-y-4",children:[0===H.length&&(0,t.jsx)("p",{className:"text-sm text-text-tertiary text-center py-4",children:"لم يتم إضافة أي فصول بعد. أضف فصلاً للبدء."}),H.map(e=>(0,t.jsxs)("div",{className:"border border-border rounded-xl overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 p-3 bg-surface-secondary",children:[(0,t.jsx)(c.default,{value:e.title,onChange:t=>{let r,a;return r=e.id,a=t.target.value,z(e=>e.map(e=>e.id===r?{...e,title:a}:e))},placeholder:"عنوان الفصل",className:"flex-1"}),(0,t.jsx)("button",{type:"button",onClick:()=>{let t;return t=e.id,z(e=>e.filter(e=>e.id!==t))},className:"p-2 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors",children:(0,t.jsx)(l.HiOutlineTrash,{size:16})})]}),(0,t.jsx)("div",{className:"divide-y divide-border/50",children:e.lessons.map(r=>(0,t.jsxs)("div",{className:"p-3 space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(c.default,{value:r.title,onChange:t=>I(e.id,r.id,{title:t.target.value}),placeholder:"عنوان الدرس",className:"flex-1"}),(0,t.jsx)(c.default,{label:"",type:"number",value:r.duration,onChange:t=>I(e.id,r.id,{duration:t.target.value}),placeholder:"المدة",className:"w-20"}),(0,t.jsx)("span",{className:"text-xs text-text-tertiary",children:"د"}),(0,t.jsx)("button",{type:"button",onClick:()=>{let t,a;return t=e.id,a=r.id,z(e=>e.map(e=>e.id===t?{...e,lessons:e.lessons.filter(e=>e.id!==a)}:e))},className:"p-2 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors",children:(0,t.jsx)(l.HiOutlineTrash,{size:14})})]}),(0,t.jsxs)("div",{className:"grid grid-cols-3 gap-3",children:[(0,t.jsx)(u.default,{label:"الحالة",value:r.status,onChange:t=>I(e.id,r.id,{status:t.target.value}),options:v}),"locked"===r.status&&(0,t.jsx)(u.default,{label:"المتطلب السابق",value:r.prerequisite,onChange:t=>I(e.id,r.id,{prerequisite:t.target.value}),options:S.filter(e=>e.value!==r.id),placeholder:"اختر الدرس المطلوب"}),"coming-soon"===r.status&&(0,t.jsx)(c.default,{label:"تاريخ الإتاحة",type:"date",value:r.availableDate,onChange:t=>I(e.id,r.id,{availableDate:t.target.value})})]})]},r.id))}),(0,t.jsx)("div",{className:"p-3 border-t border-border/50",children:(0,t.jsx)(x.default,{variant:"ghost",size:"sm",onClick:()=>{let t;return t=e.id,z(e=>e.map(e=>e.id===t?{...e,lessons:[...e.lessons,C()]}:e))},leftIcon:(0,t.jsx)(l.HiOutlinePlus,{size:14}),children:"إضافة درس"})})]},e.id)),(0,t.jsx)(x.default,{variant:"secondary",onClick:()=>z(e=>[...e,(N+=1,{id:`chapter-${N}`,title:"",lessons:[C()]})]),leftIcon:(0,t.jsx)(l.HiOutlinePlus,{size:16}),children:"إضافة فصل جديد"})]})]}),(0,t.jsxs)(d.Card,{children:[(0,t.jsx)(d.CardHeader,{children:(0,t.jsx)(d.CardTitle,{children:"إعدادات الكورس"})}),(0,t.jsxs)(d.CardContent,{className:"space-y-4",children:[(0,t.jsx)(u.default,{label:"الحالة",value:j.status,onChange:e=>T("status",e.target.value),options:g}),(0,t.jsx)("div",{className:"flex items-center gap-3",children:(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:j.requiresCode,onChange:e=>T("requiresCode",e.target.checked),className:"w-4 h-4 accent-primary"}),(0,t.jsx)("span",{className:"text-sm text-text",children:"يتطلب كود تفعيل للاشتراك"})]})})]})]})]}),(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)(d.Card,{children:[(0,t.jsx)(d.CardHeader,{children:(0,t.jsx)(d.CardTitle,{children:"صورة الكورس"})}),(0,t.jsx)(d.CardContent,{children:(0,t.jsxs)("div",{className:"aspect-video rounded-xl border-2 border-dashed border-border bg-surface-secondary flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 transition-colors",children:[(0,t.jsx)(l.HiOutlineCamera,{size:40,className:"text-text-tertiary/50 mb-2"}),(0,t.jsx)("p",{className:"text-sm text-text-tertiary",children:"اضغط لرفع صورة"}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary/60 mt-1",children:"PNG, JPG, WEBP"})]})})]}),(0,t.jsx)(d.Card,{children:(0,t.jsx)(d.CardContent,{className:"space-y-4",children:(0,t.jsxs)("div",{className:"flex flex-col gap-3",children:[(0,t.jsx)(x.default,{type:"submit",variant:"primary",size:"lg",isLoading:D,leftIcon:(0,t.jsx)(l.HiOutlineSave,{size:18}),children:D?"جاري الحفظ...":"حفظ كمسودة"}),(0,t.jsx)(x.default,{variant:"success",size:"lg",onClick:()=>{T("status","published"),$()},children:"نشر الكورس"})]})})})]})]})]})}])}]);