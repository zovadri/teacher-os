(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:c=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",a[i],s[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",c&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:a,hover:s=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",a),children:e})},"CardContent",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",a),children:e})},"CardDescription",0,function({children:e,className:a}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",a),children:e})},"CardFooter",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",a),children:e})},"CardHeader",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",a),children:e})},"CardTitle",0,function({children:e,className:a}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",a),children:e})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(46932),s=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:l,sparkline:c,color:d="primary",description:m,className:u}){let p=i[d],x=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",u),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",p.bg,p.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",p.text)})}),x&&(0,t.jsxs)(a.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(s.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(s.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(a.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",p.text),children:o}),m&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:m}),c&&c.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${c.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${d}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:p.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:p.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:c.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...c)*28}`).join(" "),fill:"none",stroke:p.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${c.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...c)*28}`).join(" ")} L${c.length-1} 32 L0 32 Z`,fill:`url(#sg-${d}-${e.replace(/\s/g,"")})`})]})})]})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},n=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:n,leftIcon:l,rightIcon:c,className:d,disabled:m,children:u,...p},x)=>(0,t.jsxs)("button",{ref:x,disabled:m||n,className:(0,a.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],d),...p,children:[n?(0,t.jsx)(s.Spinner,{size:"sm"}):l,u,!n&&c]}));n.displayName="Button",e.s(["default",0,n])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=c.p?c.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},d={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e};function u(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let u=m(e),p=d[u]||(d[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!d[p]){let t=u!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);d[p]=c(s?{["@keyframes "+p]:t}:t,r?"":"."+p)}let x=r&&d.g;return r&&(d.g=d[p]),i=d[p],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),p})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}u.bind({g:1});let p,x,h,b=u.bind({k:1});function f(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;r.p=Object.assign({theme:x&&x()},n),r.o=/go\d/.test(l),n.className=u.apply(r,a)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),h&&c[0]&&h(n),p(c,n)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},S=(e,t=j)=>{k[t]=w(k[t]||C,e),N.forEach(([e,r])=>{e===t&&r(k[t])})},$=e=>Object.keys(k).forEach(t=>S(e,t)),_=(e=j)=>t=>{S(t,e)},E={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return _(s.toasterId||(a=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},H=(e,t)=>O("blank")(e,t);H.error=O("error"),H.success=O("success"),H.loading=O("loading"),H.custom=O("custom"),H.dismiss=(e,t)=>{let r={type:3,toastId:e};t?_(t)(r):$(r)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let r={type:4,toastId:e};t?_(t)(r):$(r)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,r)=>{let a=H.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?H.success(s,{id:a,...r,...null==r?void 0:r.success}):H.dismiss(a),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?H.error(s,{id:a,...r,...null==r?void 0:r.error}):H.dismiss(a)}),e};var z=1e3,L=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,I=b`
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

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,A=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${A} 1s linear infinite;
`,R=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,M=b`
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
}`,P=f("div")`
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
    animation: ${M} 0.2s ease-out forwards;
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
`,q=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,G=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(Q,null,t):t:"blank"===r?null:s.createElement(U,null,s.createElement(B,{...a}),"loading"!==r&&s.createElement(F,null,"error"===r?s.createElement(T,{...a}):s.createElement(P,{...a})))},K=f("div")`
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
`,Z=f("div")`
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
`];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(G,{toast:e}),n=s.createElement(Z,{...e.ariaProps},g(e.message,e));return s.createElement(K,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});a=s.createElement,c.p=void 0,p=a,x=void 0,h=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},J=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(k[t]||C),i=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(i.current!==k[t]&&a(k[t]),N.push([t,a]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||E[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=z)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&H.dismiss(r.id);return}return setTimeout(()=>H.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,s.useCallback)(_(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,s.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),m=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:m}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let o,n,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),m=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?J:"",style:m},"custom"===r.type?g(r.message,r):i?i(r):s.createElement(W,{toast:r,position:l}))}))},"default",0,H,"toast",0,H],5766)},67073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(50719);let i=(0,r.forwardRef)(({label:e,error:r,options:i,placeholder:o,className:n,...l},c)=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[e&&(0,t.jsx)("label",{className:"block text-sm font-medium text-text-secondary",children:e}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{ref:c,className:(0,a.cn)("w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none","transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30","hover:border-border-light",r&&"border-error/40 focus:ring-error/15 focus:border-error/50",n),...l,children:[o&&(0,t.jsx)("option",{value:"",children:o}),i.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(s.HiChevronDown,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"})]}),r&&(0,t.jsx)("p",{className:"text-xs text-error pr-1",children:r})]}));i.displayName="Select",e.s(["default",0,i])},98706,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={sm:"w-8 h-8 text-xs",md:"w-10 h-10 text-sm",lg:"w-12 h-12 text-base"};e.s(["Avatar",0,function({src:e,alt:s="",name:i,size:o="md",className:n}){let l=i?i.split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase():"?";return e?(0,t.jsx)("img",{src:e,alt:s,className:(0,r.cn)("rounded-full object-cover border border-border",a[o],n)}):(0,t.jsx)("div",{className:(0,r.cn)("rounded-full bg-primary-100 text-primary flex items-center justify-center font-medium border border-primary-200",a[o],n),children:l})}])},5434,e=>{"use strict";var t=e.i(43476),r=e.i(22016),a=e.i(50719),s=e.i(98706),i=e.i(96395),o=e.i(31539),n=e.i(81604);e.s(["default",0,function({title:e,subtitle:l}){let{theme:c,toggleTheme:d}=(0,i.useThemeStore)(),m=(0,o.useSearchStore)(e=>e.toggleSearch);return(0,t.jsx)("header",{className:"sticky top-0 z-20 bg-surface/60 border-b border-border",children:(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 py-4",children:[(0,t.jsxs)("div",{children:[e&&(0,t.jsx)("h1",{className:"text-xl font-semibold text-text",children:e}),l&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-0.5",children:l})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)("button",{type:"button",onClick:m,className:"p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:(0,t.jsx)(a.HiSearch,{className:"w-5 h-5"})}),(0,t.jsx)("button",{type:"button",onClick:d,className:"p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:"dark"===c?(0,t.jsx)(a.HiSun,{className:"w-5 h-5"}):(0,t.jsx)(a.HiMoon,{className:"w-5 h-5"})}),(0,t.jsxs)(r.default,{href:"/teacher/notifications",className:"relative p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:[(0,t.jsx)(a.HiBell,{className:"w-5 h-5"}),(0,t.jsx)("span",{className:"absolute top-2 right-2 w-2 h-2 bg-error rounded-full"})]}),(0,t.jsx)(r.default,{href:"/teacher/settings",className:"mr-3",children:(0,t.jsx)(s.Avatar,{src:n.mockTeacher.avatar,name:n.mockTeacher.name,size:"sm"})})]})]})})}])},1498,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(50719),i=e.i(5766),o=e.i(5434),n=e.i(97591),l=e.i(39964),c=e.i(96640),d=e.i(59544),m=e.i(67073);let u=[{id:"o1",name:"أحمد علي",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=ch1"},{id:"o2",name:"مريم حسن",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=ch2"},{id:"o3",name:"خالد صقر",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=ch3"},{id:"o4",name:"ندى سامي",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=ch4"},{id:"o5",name:"عمر مصطفى",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=ch5"},{id:"o6",name:"سارة أحمد",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=ch6"}],p=[{value:"chemistry",label:"كيمياء"},{value:"physics",label:"فيزياء"},{value:"math",label:"رياضيات"},{value:"arabic",label:"عربي"},{value:"english",label:"إنجليزي"}],x={chemistry:"كيمياء",physics:"فيزياء",math:"رياضيات",arabic:"عربي",english:"إنجليزي"},h=[{value:"easy",label:"سهل"},{value:"medium",label:"متوسط"},{value:"hard",label:"صعب"}],b={easy:"سهل",medium:"متوسط",hard:"صعب"},f={easy:"success",medium:"warning",hard:"error"},g=[{value:"5",label:"5 أسئلة"},{value:"10",label:"10 أسئلة"},{value:"15",label:"15 سؤال"}],y=[{value:"5",label:"5 دقائق"},{value:"10",label:"10 دقائق"},{value:"15",label:"15 دقيقة"}],v={waiting:"قيد الانتظار",active:"جاري",finished:"منتهي"},j={waiting:"neutral",active:"primary",finished:"success"},w={win:"فوز",loss:"خسارة",draw:"تعادل"},N={win:"success",loss:"error",draw:"warning"},C=[{id:"c1",opponent:u[0],subject:"math",difficulty:"medium",myScore:0,opponentScore:0,totalQuestions:10,timeLimit:10,timeRemaining:600,status:"waiting"},{id:"c2",opponent:u[1],subject:"chemistry",difficulty:"hard",myScore:3,opponentScore:2,totalQuestions:10,timeLimit:15,timeRemaining:272,status:"active"},{id:"c3",opponent:u[2],subject:"physics",difficulty:"easy",myScore:5,opponentScore:7,totalQuestions:10,timeLimit:10,timeRemaining:0,status:"finished",result:"loss"}],k=Array.from({length:8},(e,t)=>({id:`h${t+1}`,date:`2026-07-${String(18-t).padStart(2,"0")}`,opponent:u[t%6],subject:["math","chemistry","physics","arabic","english"][t%5],myScore:[5,3,4,7,2,6,8,4][t],opponentScore:[3,5,4,4,6,6,5,7][t],result:["win","loss","draw","win","loss","draw","win","loss"][t]})),S=Math.round(52.38095238095239);function $({challenge:e}){let a,[i,o]=(0,r.useState)(e.timeRemaining);return(0,r.useEffect)(()=>{if("active"!==e.status)return;o(e.timeRemaining);let t=setInterval(()=>{o(e=>e<=1?(clearInterval(t),0):e-1)},1e3);return()=>clearInterval(t)},[e.id,e.status,e.timeRemaining]),(0,t.jsxs)("span",{className:`flex items-center gap-1 text-xs font-mono font-bold ${i<60?"text-error":"text-text-tertiary"}`,children:[(0,t.jsx)(s.HiOutlineClock,{size:14}),(a=Math.floor(i/60),`${a}:${(i%60).toString().padStart(2,"0")}`)]})}let _={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.06}}},E={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,O]=(0,r.useState)(C),[H,z]=(0,r.useState)(0),[L,D]=(0,r.useState)(!1),[I,T]=(0,r.useState)({subject:"chemistry",difficulty:"medium",questions:"10",timeLimit:"10",opponentId:"o1"}),A=(0,r.useCallback)(()=>{let e=u.find(e=>e.id===I.opponentId)||u[0],t={id:`c-${Date.now()}`,opponent:e,subject:I.subject,difficulty:I.difficulty,myScore:0,opponentScore:0,totalQuestions:Number(I.questions),timeLimit:Number(I.timeLimit),timeRemaining:60*Number(I.timeLimit),status:"waiting"};O(e=>[t,...e]),i.toast.success("تم إنشاء التحدي بنجاح! في انتظار قبول الخصم.")},[I]),B=(0,r.useCallback)(()=>{let e=H%u.length;z(e=>e+1);let t=u[e],r=["chemistry","physics","math","arabic","english"],a=(H+1)%r.length,s={id:`cq-${Date.now()}`,opponent:t,subject:r[a],difficulty:["easy","medium","hard"][(H+1)%3],myScore:0,opponentScore:0,totalQuestions:10,timeLimit:10,timeRemaining:600,status:"active"};O(e=>[s,...e]),i.toast.success(`تحدي سريع مع ${t.name}!`)},[H]),R=(0,r.useCallback)(e=>{i.toast.success("جاري الدخول إلى التحدي...")},[]),M=L?k:k.slice(0,4);return(0,t.jsxs)("div",{className:"min-h-screen bg-gradient-to-b from-surface to-surface-secondary",children:[(0,t.jsx)(o.default,{title:"تحديات الطلاب",subtitle:"تنافس مع زملائك في مسابقات تعليمية"}),(0,t.jsx)("div",{className:"p-6 md:p-8 lg:p-10 max-w-5xl mx-auto space-y-6",children:(0,t.jsxs)(a.motion.div,{variants:_,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsxs)(a.motion.div,{variants:E,className:"grid grid-cols-2 sm:grid-cols-4 gap-5",children:[(0,t.jsx)(n.StatsCard,{title:"إجمالي التحديات",value:42,icon:s.HiOutlineStar,color:"primary"}),(0,t.jsx)(n.StatsCard,{title:"فوز",value:22,icon:s.HiOutlineCheckCircle,color:"success"}),(0,t.jsx)(n.StatsCard,{title:"خسارة",value:15,icon:s.HiOutlineExclamationCircle,color:"error"}),(0,t.jsx)(n.StatsCard,{title:"نسبة الفوز",value:`${S}%`,icon:s.HiOutlineChartBar,color:"info"})]}),(0,t.jsxs)(a.motion.div,{variants:E,className:"flex items-center justify-between gap-4 flex-wrap",children:[(0,t.jsx)("div",{className:"flex items-center gap-2",children:(0,t.jsxs)(c.Badge,{variant:"premium",size:"md",children:[(0,t.jsx)(s.HiFire,{className:"w-3.5 h-3.5 ml-1"}),"التسلسل الحالي: ",3," انتصارات متتالية"]})}),(0,t.jsx)(d.default,{leftIcon:(0,t.jsx)(s.HiOutlineLightningBolt,{size:18}),onClick:B,className:"bg-gradient-to-l from-amber-500 to-orange-500 text-white border-none hover:from-amber-600 hover:to-orange-600",children:"تحدي سريع"})]}),(0,t.jsx)(a.motion.div,{variants:E,children:(0,t.jsxs)(l.Card,{children:[(0,t.jsx)(l.CardHeader,{children:(0,t.jsx)(l.CardTitle,{children:"إنشاء تحدي جديد"})}),(0,t.jsxs)(l.CardContent,{children:[(0,t.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6",children:[(0,t.jsx)(m.default,{label:"المادة",value:I.subject,options:p,onChange:e=>T({...I,subject:e.target.value})}),(0,t.jsx)(m.default,{label:"الصعوبة",value:I.difficulty,options:h,onChange:e=>T({...I,difficulty:e.target.value})}),(0,t.jsx)(m.default,{label:"عدد الأسئلة",value:I.questions,options:g,onChange:e=>T({...I,questions:e.target.value})}),(0,t.jsx)(m.default,{label:"الوقت",value:I.timeLimit,options:y,onChange:e=>T({...I,timeLimit:e.target.value})}),(0,t.jsx)(m.default,{label:"الخصم",value:I.opponentId,options:u.map(e=>({value:e.id,label:e.name})),onChange:e=>T({...I,opponentId:e.target.value})})]}),(0,t.jsx)("div",{className:"mt-4 flex justify-end",children:(0,t.jsx)(d.default,{leftIcon:(0,t.jsx)(s.HiOutlinePlusCircle,{size:16}),onClick:A,children:"إنشاء"})})]})]})}),(0,t.jsx)(a.motion.div,{variants:E,children:(0,t.jsxs)(l.Card,{children:[(0,t.jsx)(l.CardHeader,{children:(0,t.jsx)(l.CardTitle,{children:"التحديات النشطة"})}),(0,t.jsx)(l.CardContent,{children:e.length>0?(0,t.jsx)("div",{className:"space-y-3",children:e.map((e,r)=>(s.HiOutlineUserGroup,(0,t.jsxs)(a.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.05*r},className:`flex items-center gap-4 p-5 rounded-xl border transition-all ${"active"===e.status?"bg-primary/5 border-primary/30":"finished"===e.status?"bg-surface border-border opacity-70":"bg-surface border-border"}`,children:[(0,t.jsxs)("div",{className:"relative shrink-0",children:[(0,t.jsx)("img",{src:e.opponent.avatar,alt:e.opponent.name,className:"w-10 h-10 rounded-full bg-surface-secondary"}),"active"===e.status&&(0,t.jsx)("span",{className:"absolute -top-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-surface"})]}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-0.5",children:[(0,t.jsx)("span",{className:"text-sm font-semibold text-text truncate",children:e.opponent.name}),(0,t.jsx)(c.Badge,{variant:j[e.status],size:"sm",children:v[e.status]}),(0,t.jsx)(c.Badge,{variant:f[e.difficulty],size:"sm",children:b[e.difficulty]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3 text-xs text-text-tertiary",children:[(0,t.jsx)("span",{children:x[e.subject]}),(0,t.jsx)("span",{children:"•"}),(0,t.jsxs)("span",{children:[e.totalQuestions," أسئلة"]}),"waiting"!==e.status&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("span",{children:"•"}),(0,t.jsxs)("span",{className:"font-semibold text-text",children:[e.myScore," - ",e.opponentScore]})]}),(0,t.jsx)("span",{children:"•"}),(0,t.jsx)($,{challenge:e})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 shrink-0",children:["waiting"===e.status&&(0,t.jsx)(c.Badge,{variant:"neutral",size:"sm",children:"في انتظار القبول"}),"finished"===e.status&&e.result&&(0,t.jsx)(c.Badge,{variant:N[e.result],size:"sm",children:w[e.result]}),("waiting"===e.status||"active"===e.status)&&(0,t.jsx)(d.default,{size:"sm",onClick:()=>R(e.id),children:"دخول"})]})]},e.id)))}):(0,t.jsxs)("div",{className:"text-center py-8 text-text-tertiary",children:[(0,t.jsx)(s.HiOutlineStar,{className:"w-12 h-12 mx-auto mb-2 opacity-40"}),(0,t.jsx)("p",{className:"text-sm",children:"لا توجد تحديات نشطة"}),(0,t.jsx)("p",{className:"text-xs mt-1",children:"أنشئ تحدياً جديداً أو ابدأ تحدياً سريعاً"})]})})]})}),(0,t.jsx)(a.motion.div,{variants:E,children:(0,t.jsxs)(l.Card,{children:[(0,t.jsxs)(l.CardHeader,{children:[(0,t.jsx)(l.CardTitle,{children:"سجل التحديات"}),(0,t.jsx)("button",{type:"button",onClick:()=>D(e=>!e),className:"text-sm text-primary hover:underline",children:L?"عرض أقل":"عرض الكل"})]}),(0,t.jsx)(l.CardContent,{children:M.length>0?(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border",children:[(0,t.jsx)("th",{className:"text-right py-3 px-2 text-text-tertiary font-medium text-xs",children:"التاريخ"}),(0,t.jsx)("th",{className:"text-right py-3 px-2 text-text-tertiary font-medium text-xs",children:"الخصم"}),(0,t.jsx)("th",{className:"text-right py-3 px-2 text-text-tertiary font-medium text-xs",children:"المادة"}),(0,t.jsx)("th",{className:"text-right py-3 px-2 text-text-tertiary font-medium text-xs",children:"النتيجة"}),(0,t.jsx)("th",{className:"text-right py-3 px-2 text-text-tertiary font-medium text-xs",children:"النتيجة"})]})}),(0,t.jsx)("tbody",{children:M.map((e,r)=>(0,t.jsxs)(a.motion.tr,{initial:{opacity:0,x:-10},animate:{opacity:1,x:0},transition:{delay:.03*r},className:"border-b border-border last:border-0 hover:bg-surface-secondary transition-colors",children:[(0,t.jsx)("td",{className:"py-3 px-2 text-text text-xs whitespace-nowrap",children:e.date}),(0,t.jsx)("td",{className:"py-3 px-2",children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("img",{src:e.opponent.avatar,alt:"",className:"w-6 h-6 rounded-full bg-surface-secondary shrink-0"}),(0,t.jsx)("span",{className:"text-text text-sm",children:e.opponent.name})]})}),(0,t.jsx)("td",{className:"py-3 px-2 text-text text-xs",children:x[e.subject]}),(0,t.jsx)("td",{className:"py-3 px-2",children:(0,t.jsxs)("span",{className:"text-text font-semibold text-xs",children:[e.myScore," - ",e.opponentScore]})}),(0,t.jsx)("td",{className:"py-3 px-2",children:(0,t.jsx)(c.Badge,{variant:N[e.result],size:"sm",children:w[e.result]})})]},e.id))})]})}):(0,t.jsxs)("div",{className:"text-center py-8 text-text-tertiary",children:[(0,t.jsx)(s.HiOutlineClock,{className:"w-12 h-12 mx-auto mb-2 opacity-40"}),(0,t.jsx)("p",{className:"text-sm",children:"لا يوجد سجل تحديات بعد"})]})})]})})]})})]})}])}]);