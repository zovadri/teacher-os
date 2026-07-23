(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":s+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,n):i+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function m(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let m=u(e),x=c[m]||(c[m]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(m));if(!c[x]){let t=m!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);c[x]=d(a?{["@keyframes "+x]:t}:t,r?"":"."+x)}let p=r&&c.g;return r&&(c.g=c[x]),i=c[x],p?t.data=t.data.replace(p,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),x})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}m.bind({g:1});let x,p,h,f=m.bind({k:1});function b(e,t){let r=this||{};return function(){let s=arguments;function a(i,n){let o=Object.assign({},i),l=o.className||a.className;r.p=Object.assign({theme:p&&p()},o),r.o=/go\d/.test(l),o.className=m.apply(r,s)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),h&&d[0]&&h(o),x(d,o)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},D=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},_=e=>Object.keys(k).forEach(t=>D(e,t)),E=(e=j)=>t=>{D(t,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return E(a.toasterId||(s=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},H=(e,t)=>O("blank")(e,t);H.error=O("error"),H.success=O("success"),H.loading=O("loading"),H.custom=O("custom"),H.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):_(r)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):_(r)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,r)=>{let s=H.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?H.success(a,{id:s,...r,...null==r?void 0:r.success}):H.dismiss(s),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?H.error(a,{id:s,...r,...null==r?void 0:r.error}):H.dismiss(s)}),e};var P=1e3,$=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,M=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,T=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${$} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${z} 0.15s ease-out forwards;
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
    animation: ${M} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,S=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,A=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${S} 1s linear infinite;
`,F=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=f`
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
}`,L=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,R=b("div")`
  position: absolute;
`,Y=b("div")`
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
}`,K=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${U} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,X=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(K,null,t):t:"blank"===r?null:a.createElement(Y,null,a.createElement(A,{...s}),"loading"!==r&&a.createElement(R,null,"error"===r?a.createElement(T,{...s}):a.createElement(L,{...s})))},q=b("div")`
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
`,G=b("div")`
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
`];return{animation:t?`${f(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(X,{toast:e}),o=a.createElement(G,{...e.ariaProps},g(e.message,e));return a.createElement(q,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:n,message:o}):a.createElement(a.Fragment,null,n,o))});s=a.createElement,d.p=void 0,x=s,p=void 0,h=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let n=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:n,className:t,style:r},i)},Q=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&s(k[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=P)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&H.dismiss(r.id);return}return setTimeout(()=>H.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let o=(0,a.useCallback)(E(t),[t]),l=(0,a.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,a.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,a.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}})(r,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let n,o,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),u=(n=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return a.createElement(J,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Q:"",style:u},"custom"===r.type?g(r.message,r):i?i(r):a.createElement(Z,{toast:r,position:l}))}))},"default",0,H,"toast",0,H],5766)},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:n="md",className:o,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[n],o),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:n=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",n?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},n={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},o=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:o,leftIcon:l,rightIcon:d,className:c,disabled:u,children:m,...x},p)=>(0,t.jsxs)("button",{ref:p,disabled:u||o,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],n[r],c),...x,children:[o?(0,t.jsx)(a.Spinner,{size:"sm"}):l,m,!o&&d]}));o.displayName="Button",e.s(["default",0,o])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=s.HiOutlineInbox,action:n,className:o}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",o),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),n&&(0,t.jsx)("div",{className:"mt-5",children:n})]})}])},64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:a}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",a),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(s.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},32098,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(46932),i=e.i(88653),n=e.i(50719);let o={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:l,title:d,children:c,className:u,size:m="md"}){let x=(0,r.useCallback)(e=>{"Escape"===e.key&&l()},[l]);return(0,r.useEffect)(()=>(e&&(document.addEventListener("keydown",x),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",x),document.body.style.overflow=""}),[e,x]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:l}),(0,t.jsxs)(a.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,s.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",o[m],u),children:[d&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:d}),(0,t.jsx)("button",{onClick:l,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(n.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,s.cn)("px-6 pb-6",!d&&"pt-6"),children:c})]})]})})}])},67073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(50719);let i=(0,r.forwardRef)(({label:e,error:r,options:i,placeholder:n,className:o,...l},d)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:d,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",o),...l,children:[n&&(0,t.jsx)("option",{value:"",children:n}),i.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(a.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));i.displayName="Select",e.s(["default",0,i])},3812,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157);let a=(0,r.forwardRef)(({label:e,error:r,leftIcon:a,rightIcon:i,className:n,...o},l)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[a&&(0,t.jsx)("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none",children:a}),(0,t.jsx)("input",{ref:l,className:(0,s.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50","shadow-[0_2px_8px_rgba(217,119,6,0.015),0_1px_0_rgba(255,255,255,0.9)_inset]","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",a&&"pr-10",i&&"pl-10",n),...o}),i&&(0,t.jsx)("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary",children:i})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));a.displayName="Input",e.s(["default",0,a])},57032,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),a=e.i(50719),i=e.i(37757),n=e.i(39964),o=e.i(96640),l=e.i(59544),d=e.i(32098),c=e.i(67073),u=e.i(3812),m=e.i(40803),x=e.i(81604),p=e.i(75157),h=e.i(22016),f=e.i(5766),b=e.i(64753);let g=["السبت","الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"],y=[{id:"sched-1",courseId:"c-1",courseName:"النحو والصرف",lessonName:"درس 1: المقدمة",date:new Date(2025,6,20),time:"10:00",duration:45,notes:"مراجعة سريعة للدرس السابق",autoPublish:!0},{id:"sched-2",courseId:"c-1",courseName:"النحو والصرف",lessonName:"درس 2: الشرح",date:new Date(2025,6,22),time:"10:00",duration:45,notes:"",autoPublish:!1},{id:"sched-3",courseId:"c-2",courseName:"البلاغة والأدب",lessonName:"درس 1: المقدمة",date:new Date(2025,6,21),time:"14:00",duration:60,notes:"تجهيز العرض التقديمي",autoPublish:!0},{id:"sched-4",courseId:"c-6",courseName:"التعبير والإنشاء",lessonName:"درس 3: التطبيق",date:new Date(2025,6,23),time:"12:00",duration:30,notes:"",autoPublish:!0},{id:"sched-5",courseId:"c-4",courseName:"قواعد النحو المتقدم",lessonName:"درس 1: مقدمة",date:new Date(2025,6,25),time:"09:00",duration:50,notes:"اختبار قصير في نهاية الدرس",autoPublish:!1}];e.s(["default",0,function(){let[e,v]=(0,r.useState)(y),[j,N]=(0,r.useState)(!1),[w,C]=(0,r.useState)(new Date(2025,6)),[k,D]=(0,r.useState)(!0),[_,E]=(0,r.useState)({courseId:"",lessonName:"",date:"",time:"",duration:45,notes:""}),[I,O]=(0,r.useState)("list"),H=new Date(w.getFullYear(),w.getMonth(),1),P=new Date(w.getFullYear(),w.getMonth()+1,0),$=H.getDay(),z=P.getDate(),M=w.toLocaleDateString("ar-EG",{month:"long",year:"numeric"}),T=x.mockCourses.map(e=>({value:e.id,label:e.title})),S=(0,r.useMemo)(()=>[...e].sort((e,t)=>e.date.getTime()-t.date.getTime()),[e]),A=(0,r.useMemo)(()=>S.filter(e=>e.date>=new Date),[S]);return(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(b.Breadcrumb,{items:[{label:"الكورسات",href:"/teacher/courses"},{label:"جدول الكورسات"}]}),(0,t.jsx)(i.PageHeader,{title:"جدولة الدروس",description:"تخطيط وجدولة الدروس للطلاب"}),(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)(o.Badge,{variant:"info",size:"md",children:[e.length," درس مجدول"]}),(0,t.jsxs)(o.Badge,{variant:"success",size:"md",children:[A.length," قادم"]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1 p-1 bg-surface border border-border rounded-xl",children:[(0,t.jsx)("button",{type:"button",onClick:()=>O("list"),className:(0,p.cn)("px-3 py-1.5 text-xs rounded-lg transition-colors","list"===I?"bg-primary text-white":"text-text-secondary"),children:"قائمة"}),(0,t.jsx)("button",{type:"button",onClick:()=>O("grid"),className:(0,p.cn)("px-3 py-1.5 text-xs rounded-lg transition-colors","grid"===I?"bg-primary text-white":"text-text-secondary"),children:"تقويم"})]}),(0,t.jsx)(l.default,{variant:"primary",leftIcon:(0,t.jsx)(a.HiOutlinePlus,{className:"w-4 h-4"}),onClick:()=>N(!0),children:"جدولة درس جديد"})]})]}),"grid"===I?(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center justify-between w-full",children:[(0,t.jsx)("button",{type:"button",onClick:()=>C(new Date(w.getFullYear(),w.getMonth()-1,1)),className:"p-1.5 rounded-lg hover:bg-surface-secondary text-text-tertiary",children:(0,t.jsx)(a.HiOutlineChevronRight,{className:"w-5 h-5"})}),(0,t.jsx)(n.CardTitle,{children:M}),(0,t.jsx)("button",{type:"button",onClick:()=>C(new Date(w.getFullYear(),w.getMonth()+1,1)),className:"p-1.5 rounded-lg hover:bg-surface-secondary text-text-tertiary",children:(0,t.jsx)(a.HiOutlineChevronLeft,{className:"w-5 h-5"})})]})}),(0,t.jsx)(n.CardContent,{children:(0,t.jsxs)("div",{className:"grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden",children:[g.map(e=>(0,t.jsx)("div",{className:"bg-surface-secondary px-2 py-2 text-center text-xs font-semibold text-text-secondary",children:e},e)),Array.from({length:$},(e,r)=>(0,t.jsx)("div",{className:"bg-surface-secondary/50 p-2 min-h-[80px]"},`empty-${r}`)),Array.from({length:z},(r,s)=>{let a=s+1,i=e.filter(e=>{let t=e.date;return t.getFullYear()===w.getFullYear()&&t.getMonth()===w.getMonth()&&t.getDate()===a}),n=new Date().getDate()===a&&new Date().getMonth()===w.getMonth()&&new Date().getFullYear()===w.getFullYear();return(0,t.jsxs)("div",{className:(0,p.cn)("bg-surface p-1.5 min-h-[80px] border-b border-l border-border/50 transition-colors",n&&"bg-primary-50 dark:bg-primary-900/10 ring-1 ring-primary/30"),children:[(0,t.jsx)("span",{className:(0,p.cn)("text-xs font-medium px-1.5 py-0.5 rounded",n&&"bg-primary text-white"),children:a}),(0,t.jsxs)("div",{className:"mt-1 space-y-0.5",children:[i.slice(0,2).map(e=>(0,t.jsx)(h.default,{href:`/teacher/courses/${e.courseId}`,className:"text-[10px] px-1 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 truncate leading-tight block hover:opacity-80 transition-opacity",children:e.courseName},e.id)),i.length>2&&(0,t.jsxs)("span",{className:"text-[10px] text-text-tertiary px-1",children:["+",i.length-2]})]})]},a)})]})})]}):(0,t.jsxs)(n.Card,{children:[(0,t.jsxs)(n.CardHeader,{children:[(0,t.jsx)(n.CardTitle,{children:"الدروس المجدولة"}),(0,t.jsx)(n.CardDescription,{children:"جميع الدروس حسب تاريخ الجدولة"})]}),(0,t.jsx)(n.CardContent,{children:0===S.length?(0,t.jsx)(m.EmptyState,{icon:a.HiOutlineCalendar,title:"لا توجد دروس مجدولة",description:"قم بجدولة أول درس الآن",action:(0,t.jsx)(l.default,{variant:"primary",leftIcon:(0,t.jsx)(a.HiOutlinePlus,{className:"w-3 h-3"}),onClick:()=>N(!0),children:"جدولة درس"})}):(0,t.jsx)("div",{className:"space-y-2",children:S.map((e,r)=>(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.03*r},className:"flex items-center gap-4 p-4 rounded-xl bg-surface-secondary border border-border hover:border-primary/30 transition-colors",children:[(0,t.jsxs)("div",{className:"w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex flex-col items-center justify-center shrink-0",children:[(0,t.jsx)("span",{className:"text-xs font-bold text-primary",children:e.date.getDate()}),(0,t.jsx)("span",{className:"text-[10px] text-primary/70",children:g[e.date.getDay()]})]}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("h4",{className:"font-semibold text-text text-sm",children:e.lessonName}),(0,t.jsx)(h.default,{href:`/teacher/courses/${e.courseId}`,children:(0,t.jsx)(o.Badge,{variant:"info",size:"sm",className:"cursor-pointer hover:opacity-80 transition-opacity",children:e.courseName})})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3 mt-1 text-xs text-text-tertiary",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(a.HiOutlineClock,{className:"w-3 h-3"}),e.time]}),(0,t.jsxs)("span",{children:[e.duration," دقيقة"]}),e.notes&&(0,t.jsxs)("span",{className:"truncate max-w-[200px]",children:["· ",e.notes]})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(o.Badge,{variant:e.autoPublish?"success":"warning",size:"sm",children:e.autoPublish?"نشر تلقائي":"يدوي"}),(0,t.jsx)("button",{type:"button",className:"p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors",children:(0,t.jsx)(a.HiOutlinePencil,{size:14})}),(0,t.jsx)("button",{type:"button",onClick:()=>{var t;return t=e.id,void(v(e=>e.filter(e=>e.id!==t)),f.default.success("تم حذف الدرس من الجدولة"))},className:"p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors",children:(0,t.jsx)(a.HiOutlineTrash,{size:14})})]})]},e.id))})})]}),(0,t.jsxs)(n.Card,{children:[(0,t.jsx)(n.CardHeader,{children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(a.HiOutlineEye,{className:"w-5 h-5 text-primary"}),(0,t.jsx)(n.CardTitle,{children:"النشر التلقائي"})]})}),(0,t.jsx)(n.CardContent,{children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:"النشر التلقائي عند حلول الموعد"}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:"عند تفعيله، سيتم نشر الدرس تلقائياً للطلاب في تاريخ وميعاد الجدولة"})]}),(0,t.jsx)("button",{type:"button",onClick:()=>D(!k),className:(0,p.cn)("w-12 h-6 rounded-full transition-colors relative",k?"bg-primary":"bg-surface-tertiary"),children:(0,t.jsx)("span",{className:(0,p.cn)("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",k?"translate-x-6":"translate-x-0.5")})})]})})]}),(0,t.jsx)(d.Modal,{isOpen:j,onClose:()=>N(!1),title:"جدولة درس جديد",size:"lg",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)(c.default,{label:"اختر الكورس",options:T,value:_.courseId,onChange:e=>E({..._,courseId:e.target.value}),placeholder:"اختر الكورس"}),(0,t.jsx)(u.default,{label:"اسم الدرس",value:_.lessonName,onChange:e=>E({..._,lessonName:e.target.value}),placeholder:"مثال: درس 4: التطبيقات"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsx)(u.default,{label:"التاريخ",type:"date",value:_.date,onChange:e=>E({..._,date:e.target.value})}),(0,t.jsx)(u.default,{label:"الوقت",type:"time",value:_.time,onChange:e=>E({..._,time:e.target.value})})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsx)(u.default,{label:"المدة (دقيقة)",type:"number",value:_.duration,onChange:e=>E({..._,duration:Number(e.target.value)})}),(0,t.jsx)("div",{className:"flex items-end pb-3",children:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("span",{className:"text-sm text-text-secondary",children:"نشر تلقائي"}),(0,t.jsx)("button",{type:"button",onClick:()=>D(!k),className:(0,p.cn)("w-10 h-5 rounded-full transition-colors relative",k?"bg-primary":"bg-surface-tertiary"),children:(0,t.jsx)("span",{className:(0,p.cn)("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",k?"translate-x-5":"translate-x-0.5")})})]})})]}),(0,t.jsx)(u.default,{label:"ملاحظات (اختياري)",value:_.notes,onChange:e=>E({..._,notes:e.target.value}),placeholder:"ملاحظات للدرس..."}),(0,t.jsxs)("div",{className:"flex gap-3 pt-2",children:[(0,t.jsx)(l.default,{variant:"primary",className:"flex-1",leftIcon:(0,t.jsx)(a.HiOutlineCheck,{className:"w-4 h-4"}),onClick:()=>{if(!_.courseId||!_.lessonName||!_.date||!_.time)return;let e=x.mockCourses.find(e=>e.id===_.courseId);v(t=>[...t,{id:`sched-${Date.now()}`,courseId:_.courseId,courseName:e?.title||"",lessonName:_.lessonName,date:new Date(_.date),time:_.time,duration:_.duration,notes:_.notes,autoPublish:k}]),f.default.success("تمت إضافة الدرس إلى الجدولة بنجاح"),N(!1),E({courseId:"",lessonName:"",date:"",time:"",duration:45,notes:""})},children:"إضافة إلى الجدول"}),(0,t.jsx)(l.default,{variant:"secondary",leftIcon:(0,t.jsx)(a.HiOutlineX,{className:"w-4 h-4"}),onClick:()=>N(!1),children:"إلغاء"})]})]})})]})}])}]);