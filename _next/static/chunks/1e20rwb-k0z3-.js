(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,a;var r,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,l=(e,t)=>{let a="",r="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+o+";":r+="f"==i[1]?l(o,i):i+"{"+l(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=l(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=l.p?l.p(i,o):i+":"+o+";")}return a+(t&&s?t+"{"+s+"}":s)+r},c={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e};function p(e){let t,a,r=this||{},s=e.call?e(r.p):e;return((e,t,a,r,s)=>{var i;let p=u(e),m=c[p]||(c[p]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(p));if(!c[m]){let t=p!==e?e:(e=>{let t,a,r=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?r.shift():t[3]?(a=t[3].replace(d," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);c[m]=l(s?{["@keyframes "+m]:t}:t,a?"":"."+m)}let x=a&&c.g;return a&&(c.g=c[m]),i=c[m],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),a=r.p,s.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}p.bind({g:1});let m,x,b,g=p.bind({k:1});function h(e,t){let a=this||{};return function(){let r=arguments;function s(i,o){let n=Object.assign({},i),d=n.className||s.className;a.p=Object.assign({theme:x&&x()},n),a.o=/go\d/.test(d),n.className=p.apply(a,r)+(d?" "+d:""),t&&(n.ref=o);let l=e;return e[0]&&(l=n.as||e,delete n.as),b&&l[0]&&b(n),m(l,n)}return t?t(s):s}}var y=(e,t)=>"function"==typeof e?e(t):e,f=(t=0,()=>(++t).toString()),v=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},j="default",w=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},H=(e,t=j)=>{C[t]=w(C[t]||k,e),N.forEach(([e,a])=>{e===t&&a(C[t])})},$=e=>Object.keys(C).forEach(t=>H(e,t)),_=(e=j)=>t=>{H(t,e)},E={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=e=>(t,a)=>{let r,s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||f()}))(t,e,a);return _(s.toasterId||(r=s.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===r))))({type:2,toast:s}),s.id},S=(e,t)=>I("blank")(e,t);S.error=I("error"),S.success=I("success"),S.loading=I("loading"),S.custom=I("custom"),S.dismiss=(e,t)=>{let a={type:3,toastId:e};t?_(t)(a):$(a)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let a={type:4,toastId:e};t?_(t)(a):$(a)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,a)=>{let r=S.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?y(t.success,e):void 0;return s?S.success(s,{id:r,...a,...null==a?void 0:a.success}):S.dismiss(r),e}).catch(e=>{let s=t.error?y(t.error,e):void 0;s?S.error(s,{id:r,...a,...null==a?void 0:a.error}):S.dismiss(r)}),e};var D=1e3,A=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,O=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,M=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=h("div")`
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
    animation: ${O} 0.15s ease-out forwards;
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
`,P=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,T=h("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,L=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,z=g`
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
}`,q=h("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${z} 0.2s ease-out forwards;
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
`,F=h("div")`
  position: absolute;
`,R=h("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,U=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=h("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${U} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Z=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(K,null,t):t:"blank"===a?null:s.createElement(R,null,s.createElement(T,{...r}),"loading"!==a&&s.createElement(F,null,"error"===a?s.createElement(B,{...r}):s.createElement(q,{...r})))},G=h("div")`
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
`,W=h("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=s.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(Z,{toast:e}),n=s.createElement(W,{...e.ariaProps},y(e.message,e));return s.createElement(G,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});r=s.createElement,l.p=void 0,m=r,x=void 0,b=void 0;var Y=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let o=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:o,className:t,style:a},i)},J=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,toasterId:o,containerStyle:n,containerClassName:d})=>{let{toasts:l,handlers:c}=((e,t="default")=>{let{toasts:a,pausedAt:r}=((e={},t=j)=>{let[a,r]=(0,s.useState)(C[t]||k),i=(0,s.useRef)(C[t]);(0,s.useEffect)(()=>(i.current!==C[t]&&r(C[t]),N.push([t,r]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||E[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=D)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,a)},[]);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&S.dismiss(a.id);return}return setTimeout(()=>S.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let n=(0,s.useCallback)(_(t),[t]),d=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),l=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,s.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=t||{},o=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),d=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[d+1]:[0,d]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,s.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,o]),{toasts:a,handlers:{updateHeight:l,startPause:d,endPause:c,calculateOffset:u}}})(a,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:d,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(a=>{let o,n,d=a.position||t,l=c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(o=d.includes("top"),n=d.includes("center")?{justifyContent:"center"}:d.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${l*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(Y,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?J:"",style:u},"custom"===a.type?y(a.message,a):i?i(a):s.createElement(X,{toast:a,position:d}))}))},"default",0,S,"toast",0,S],5766)},96640,e=>{"use strict";var t=e.i(43476),a=e.i(75157);let r={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:d=!1,pulse:l=!1}){return(0,t.jsxs)("span",{className:(0,a.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",r[i],s[o],n),children:[d&&(0,t.jsx)("span",{className:(0,a.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",l&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),a=e.i(75157);e.s(["Card",0,function({children:e,className:r,hover:s=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,a.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",r),children:e})},"CardContent",0,function({children:e,className:r}){return(0,t.jsx)("div",{className:(0,a.cn)("px-7 pb-7",r),children:e})},"CardDescription",0,function({children:e,className:r}){return(0,t.jsx)("p",{className:(0,a.cn)("text-sm text-text-secondary mt-1",r),children:e})},"CardFooter",0,function({children:e,className:r}){return(0,t.jsx)("div",{className:(0,a.cn)("px-7 py-4 border-t border-border/60",r),children:e})},"CardHeader",0,function({children:e,className:r}){return(0,t.jsx)("div",{className:(0,a.cn)("px-7 pt-7 pb-2",r),children:e})},"CardTitle",0,function({children:e,className:r}){return(0,t.jsx)("h3",{className:(0,a.cn)("text-lg font-semibold text-text",r),children:e})}])},97591,e=>{"use strict";var t=e.i(43476),a=e.i(75157),r=e.i(46932),s=e.i(50719);let i={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:d,sparkline:l,color:c="primary",description:u,className:p}){let m=i[c],x=void 0===d?null:"number"==typeof d?{value:Math.abs(d),positive:d>=0}:{value:d.value,positive:d.isPositive};return(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,a.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",p),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,a.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",m.bg,m.border),children:n&&(0,t.jsx)(n,{className:(0,a.cn)("w-5 h-5",m.text)})}),x&&(0,t.jsxs)(r.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,a.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(s.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(s.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(r.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,a.cn)("text-[28px] font-bold leading-tight",m.text),children:o}),u&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:u}),l&&l.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${l.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:m.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:m.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" "),fill:"none",stroke:m.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${l.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...l)*28}`).join(" ")} L${l.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},32098,e=>{"use strict";var t=e.i(43476),a=e.i(71645),r=e.i(75157),s=e.i(46932),i=e.i(88653),o=e.i(50719);let n={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};e.s(["Modal",0,function({open:e,onClose:d,title:l,children:c,className:u,size:p="md"}){let m=(0,a.useCallback)(e=>{"Escape"===e.key&&d()},[d]);return(0,a.useEffect)(()=>(e&&(document.addEventListener("keydown",m),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",m),document.body.style.overflow=""}),[e,m]),(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)(s.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:d}),(0,t.jsxs)(s.motion.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:30},className:(0,r.cn)("relative w-full bg-card/90 backdrop-blur-2xl border border-border rounded-[20px] shadow-[0_24px_80px_rgba(217,119,6,0.06)]",n[p],u),children:[l&&(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 pt-6 pb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-text",children:l}),(0,t.jsx)("button",{onClick:d,className:"p-1.5 rounded-[10px] hover:bg-card/80 text-text-secondary hover:text-text transition-colors",children:(0,t.jsx)(o.HiX,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:(0,r.cn)("px-6 pb-6",!l&&"pt-6"),children:c})]})]})})}])},64753,e=>{"use strict";var t=e.i(43476),a=e.i(75157),r=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:s}){return(0,t.jsx)("nav",{className:(0,a.cn)("flex items-center gap-1.5 text-sm text-text-secondary",s),children:e.map((e,a)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[a>0&&(0,t.jsx)(r.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},a))})}])},84200,e=>{"use strict";var t=e.i(43476),a=e.i(71645),r=e.i(46932),s=e.i(88653),i=e.i(5766),o=e.i(64753),n=e.i(39964),d=e.i(96640),l=e.i(97591),c=e.i(32098);let u={projector:"بروجيكتور",whiteboard:"سبورة",ac:"تكييف",smartBoard:"سبورة ذكية"},p=["saturday","sunday","monday","tuesday","wednesday","thursday"],m={saturday:"السبت",sunday:"الأحد",monday:"الإثنين",tuesday:"الثلاثاء",wednesday:"الأربعاء",thursday:"الخميس"},x=[8,9,10,11,12,13,14,15,16],b={available:"bg-green-500",occupied:"bg-yellow-500",maintenance:"bg-red-500"},g={available:"متاح",occupied:"مشغول",maintenance:"صيانة"},h=["projector","whiteboard","ac","smartBoard"],y=[{id:"a",name:"قاعة A",capacity:30,equipment:["projector","whiteboard","ac"],status:"available"},{id:"b",name:"قاعة B",capacity:25,equipment:["projector","whiteboard","ac","smartBoard"],status:"occupied"},{id:"c",name:"قاعة C",capacity:40,equipment:["projector","ac","smartBoard"],status:"available"},{id:"d",name:"قاعة D",capacity:20,equipment:["whiteboard","ac"],status:"maintenance"},{id:"e",name:"قاعة E",capacity:35,equipment:["projector","whiteboard","ac","smartBoard"],status:"occupied"},{id:"f",name:"قاعة F",capacity:50,equipment:["projector","whiteboard","ac"],status:"available"}],f=[{id:"b01",roomId:"a",day:"saturday",startHour:8,endHour:10,teacher:"أ. أحمد",group:"المجموعة 1",purpose:"محاضرة",date:"2026-07-19"},{id:"b02",roomId:"a",day:"sunday",startHour:10,endHour:12,teacher:"أ. سارة",group:"المجموعة 2",purpose:"ورشة",date:"2026-07-20"},{id:"b03",roomId:"b",day:"saturday",startHour:9,endHour:11,teacher:"أ. محمد",group:"المجموعة 3",purpose:"محاضرة",date:"2026-07-19"},{id:"b04",roomId:"b",day:"monday",startHour:13,endHour:15,teacher:"أ. ليلى",group:"المجموعة 4",purpose:"اجتماع",date:"2026-07-21"},{id:"b05",roomId:"c",day:"sunday",startHour:8,endHour:10,teacher:"أ. خالد",group:"المجموعة 5",purpose:"محاضرة",date:"2026-07-20"},{id:"b06",roomId:"c",day:"tuesday",startHour:11,endHour:13,teacher:"أ. نور",group:"المجموعة 6",purpose:"ورشة",date:"2026-07-22"},{id:"b07",roomId:"e",day:"saturday",startHour:12,endHour:14,teacher:"أ. هدى",group:"المجموعة 7",purpose:"محاضرة",date:"2026-07-19"},{id:"b08",roomId:"e",day:"wednesday",startHour:9,endHour:11,teacher:"أ. عمر",group:"المجموعة 8",purpose:"اجتماع",date:"2026-07-23"},{id:"b09",roomId:"f",day:"sunday",startHour:14,endHour:16,teacher:"أ. رنا",group:"المجموعة 9",purpose:"ورشة",date:"2026-07-20"},{id:"b10",roomId:"f",day:"thursday",startHour:8,endHour:10,teacher:"أ. سامي",group:"المجموعة 10",purpose:"محاضرة",date:"2026-07-24"},{id:"b11",roomId:"a",day:"wednesday",startHour:11,endHour:13,teacher:"أ. مريم",group:"المجموعة 11",purpose:"ورشة",date:"2026-07-23"},{id:"b12",roomId:"b",day:"thursday",startHour:10,endHour:12,teacher:"أ. كريم",group:"المجموعة 12",purpose:"محاضرة",date:"2026-07-24"},{id:"b13",roomId:"c",day:"saturday",startHour:14,endHour:16,teacher:"أ. دينا",group:"المجموعة 13",purpose:"اجتماع",date:"2026-07-19"},{id:"b14",roomId:"e",day:"tuesday",startHour:8,endHour:10,teacher:"أ. يوسف",group:"المجموعة 14",purpose:"محاضرة",date:"2026-07-22"},{id:"b15",roomId:"f",day:"monday",startHour:11,endHour:13,teacher:"أ. هاني",group:"المجموعة 15",purpose:"ورشة",date:"2026-07-21"}];e.s(["default",0,function(){let[e,v]=(0,a.useState)(f),[j,w]=(0,a.useState)(null),[N,k]=(0,a.useState)(!1),[C,H]=(0,a.useState)(null),[$,_]=(0,a.useState)([]),[E,I]=(0,a.useState)(0),[S,D]=(0,a.useState)(16),[A,O]=(0,a.useState)(""),[M,B]=(0,a.useState)("saturday"),[P,T]=(0,a.useState)(8),[L,z]=(0,a.useState)(10),[q,F]=(0,a.useState)(""),[R,U]=(0,a.useState)(""),[K,Z]=(0,a.useState)(""),G=(0,a.useMemo)(()=>y.filter(e=>(!(E>0)||!(e.capacity<E))&&(!($.length>0)||!!$.every(t=>e.equipment.includes(t)))),[E,$]),W=(0,a.useMemo)(()=>({total:y.length,available:y.filter(e=>"available"===e.status).length,occupied:y.filter(e=>"occupied"===e.status).length,maintenance:y.filter(e=>"maintenance"===e.status).length}),[]),X=(0,a.useCallback)(e=>{_(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])},[]),Y=(0,a.useCallback)((t,a,r,s,i)=>e.some(e=>e.roomId===t&&e.day===a&&e.id!==i&&r<e.endHour&&e.startHour<s),[e]),J=(0,a.useCallback)(e=>{H(e),O(""),B("saturday"),T(8),z(10),F(""),U(""),Z(""),k(!0)},[]),Q=(0,a.useCallback)(()=>{if(!C)return;if(Y(C,M,P,L))return void i.default.error("تعارض! هذه القاعة محجوزة في هذا الوقت");let e=`b${String(S).padStart(2,"0")}`;D(e=>e+1);let t={id:e,roomId:C,day:M,startHour:P,endHour:L,teacher:q||"غير محدد",group:R||"غير محدد",purpose:K||"غير محدد",date:A||new Date().toISOString().split("T")[0]};v(e=>[...e,t]),k(!1),i.default.success("تم الحجز بنجاح")},[C,M,P,L,q,R,K,A,Y,S]),V=new Date().toISOString().split("T")[0],ee=(0,a.useMemo)(()=>e.filter(e=>e.date===V).sort((e,t)=>e.startHour-t.startHour),[e,V]);return(0,t.jsxs)("div",{dir:"rtl",className:"space-y-6 p-6",children:[(0,t.jsx)(o.Breadcrumb,{items:[{label:"القاعات",href:"/teacher/classrooms"},{label:"حجوزات القاعات"}]}),(0,t.jsx)(DashboardHeader,{title:"حجوزات القاعات",description:"إدارة حجوزات القاعات الدراسية"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[(0,t.jsx)(l.StatsCard,{title:"إجمالي القاعات",value:W.total}),(0,t.jsx)(l.StatsCard,{title:"متاح الآن",value:W.available}),(0,t.jsx)(l.StatsCard,{title:"مشغول",value:W.occupied}),(0,t.jsx)(l.StatsCard,{title:"صيانة",value:W.maintenance})]}),(0,t.jsx)(n.Card,{className:"p-4",children:(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-4",children:[h.map(e=>(0,t.jsxs)("label",{className:"flex items-center gap-2 text-sm cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:$.includes(e),onChange:()=>X(e),className:"accent-blue-600"}),u[e]]},e)),(0,t.jsxs)("div",{className:"flex items-center gap-2 mr-4",children:[(0,t.jsx)("span",{className:"text-sm whitespace-nowrap",children:"أقل سعة:"}),(0,t.jsx)("input",{type:"number",min:0,max:100,value:E,onChange:e=>I(Math.max(0,Number(e.target.value))),className:"w-20 px-2 py-1 border rounded-md text-sm dark:bg-gray-800 dark:border-gray-700"})]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:(0,t.jsx)(s.AnimatePresence,{children:G.map(e=>(0,t.jsx)(r.motion.div,{layout:!0,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},children:(0,t.jsxs)(n.Card,{className:"p-4 cursor-pointer hover:shadow-lg transition-shadow",onClick:()=>w(e),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,t.jsx)("h3",{className:"text-lg font-bold",children:e.name}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:`w-3 h-3 rounded-full ${b[e.status]}`}),(0,t.jsx)("span",{className:"text-xs text-gray-500 dark:text-gray-400",children:g[e.status]})]})]}),(0,t.jsxs)("p",{className:"text-sm text-gray-500 dark:text-gray-400 mb-2",children:["السعة: ",e.capacity," طالب"]}),(0,t.jsx)("div",{className:"flex gap-1 flex-wrap",children:e.equipment.map(e=>(0,t.jsx)(d.Badge,{variant:"outline",children:u[e]},e))}),(0,t.jsx)("button",{onClick:t=>{t.stopPropagation(),J(e.id)},className:"mt-3 w-full py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"حجز"})]})},e.id))})}),(0,t.jsxs)(n.Card,{className:"p-4",children:[(0,t.jsx)("h3",{className:"text-lg font-bold mb-3",children:"حجوزات اليوم"}),0===ee.length?(0,t.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"لا توجد حجوزات اليوم"}):(0,t.jsx)("div",{className:"space-y-2",children:ee.map(e=>{let a=y.find(t=>t.id===e.roomId);return(0,t.jsxs)("div",{className:"flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg",children:[(0,t.jsxs)("div",{className:"font-medium",children:[a?.name," ",(0,t.jsx)("span",{className:"mx-1 text-gray-400",children:"|"})," ",e.startHour,":00 - ",e.endHour,":00"]}),(0,t.jsxs)("div",{className:"text-sm text-gray-500 dark:text-gray-400",children:[e.teacher," — ",e.purpose]})]},e.id)})})]}),(0,t.jsx)(s.AnimatePresence,{children:j&&(0,t.jsx)(c.Modal,{onClose:()=>w(null),children:(0,t.jsxs)(r.motion.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},className:"bg-white dark:bg-gray-950 rounded-2xl p-6 max-w-4xl w-full mx-auto max-h-[90vh] overflow-auto",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,t.jsxs)("h2",{className:"text-xl font-bold",children:["الجدول الأسبوعي — ",j.name]}),(0,t.jsx)("button",{onClick:()=>w(null),className:"text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl leading-none",children:"×"})]}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm border-collapse",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{className:"p-2 border dark:border-gray-700 text-center",children:"الوقت"}),p.map(e=>(0,t.jsx)("th",{className:"p-2 border dark:border-gray-700 text-center",children:m[e]},e))]})}),(0,t.jsx)("tbody",{children:x.map(a=>(0,t.jsxs)("tr",{children:[(0,t.jsxs)("td",{className:"p-2 border dark:border-gray-700 text-center font-medium",children:[a,":00"]}),p.map(r=>{let s=e.filter(e=>e.roomId===j.id&&e.day===r&&e.startHour<=a&&a<e.endHour);return(0,t.jsx)("td",{className:"p-1 border dark:border-gray-700 text-center align-top",children:s.map(e=>(0,t.jsxs)("div",{className:"bg-blue-100 dark:bg-blue-900/40 rounded px-1 py-0.5 text-xs mb-0.5 leading-tight",children:[e.teacher,(0,t.jsx)("br",{}),e.purpose]},e.id))},r)})]},a))})]})})]})})}),(0,t.jsx)(s.AnimatePresence,{children:N&&(0,t.jsx)(c.Modal,{onClose:()=>k(!1),children:(0,t.jsxs)(r.motion.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},className:"bg-white dark:bg-gray-950 rounded-2xl p-6 max-w-lg w-full mx-auto",children:[(0,t.jsx)("h2",{className:"text-xl font-bold mb-4",children:"حجز قاعة"}),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm mb-1",children:"التاريخ"}),(0,t.jsx)("input",{type:"date",value:A,onChange:e=>O(e.target.value),className:"w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm mb-1",children:"اليوم"}),(0,t.jsx)("select",{value:M,onChange:e=>B(e.target.value),className:"w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700",children:p.map(e=>(0,t.jsx)("option",{value:e,children:m[e]},e))})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm mb-1",children:"بداية"}),(0,t.jsx)("select",{value:P,onChange:e=>T(Number(e.target.value)),className:"w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700",children:x.map(e=>(0,t.jsxs)("option",{value:e,children:[e,":00"]},e))})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm mb-1",children:"نهاية"}),(0,t.jsx)("select",{value:L,onChange:e=>z(Number(e.target.value)),className:"w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700",children:x.filter(e=>e>P).map(e=>(0,t.jsxs)("option",{value:e,children:[e,":00"]},e))})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm mb-1",children:"المعلم"}),(0,t.jsx)("input",{type:"text",value:q,onChange:e=>F(e.target.value),placeholder:"اسم المعلم",className:"w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm mb-1",children:"المجموعة"}),(0,t.jsx)("input",{type:"text",value:R,onChange:e=>U(e.target.value),placeholder:"اسم المجموعة",className:"w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm mb-1",children:"الغرض"}),(0,t.jsx)("input",{type:"text",value:K,onChange:e=>Z(e.target.value),placeholder:"محاضرة / ورشة / اجتماع",className:"w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"})]}),(0,t.jsx)("button",{onClick:Q,className:"w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"تأكيد الحجز"})]})]})})})]})}])}]);