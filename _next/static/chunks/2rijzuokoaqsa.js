(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,r;var i,s=e.i(71645);let a={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",i="",s="";for(let a in e){let o=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+o+";":i+="f"==a[1]?d(o,a):a+"{"+d(o,"k"==a[1]?"":t)+"}":"object"==typeof o?i+=d(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=o&&(a="-"==a[1]?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(a,o):a+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+i},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function m(e){let t,r,i=this||{},s=e.call?e(i.p):e;return((e,t,r,i,s)=>{var a;let m=u(e),p=c[m]||(c[m]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(m));if(!c[p]){let t=m!==e?e:(e=>{let t,r,i=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?i.shift():t[3]?(r=t[3].replace(l," ").trim(),i.unshift(i[0][r]=i[0][r]||{})):i[0][t[1]]=t[2].replace(l," ").trim();return i[0]})(e);c[p]=d(s?{["@keyframes "+p]:t}:t,r?"":"."+p)}let x=r&&c.g;return r&&(c.g=c[p]),a=c[p],x?t.data=t.data.replace(x,a):-1===t.data.indexOf(a)&&(t.data=i?a+t.data:t.data+a),p})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=i.p,s.reduce((e,i,s)=>{let a=t[s];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+i+(null==a?"":a)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(i.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||a})(i.target),i.g,i.o,i.k)}m.bind({g:1});let p,x,h,f=m.bind({k:1});function b(e,t){let r=this||{};return function(){let i=arguments;function s(a,o){let n=Object.assign({},a),l=n.className||s.className;r.p=Object.assign({theme:x&&x()},n),r.o=/go\d/.test(l),n.className=m.apply(r,i)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),h&&d[0]&&h(n),p(d,n)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},w="default",j=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:i}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===i.id),toast:i});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},$=(e,t=w)=>{k[t]=j(k[t]||C,e),N.forEach(([e,r])=>{e===t&&r(k[t])})},_=e=>Object.keys(k).forEach(t=>$(e,t)),O=(e=w)=>t=>{$(t,e)},E={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let i,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return O(s.toasterId||(i=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===i))))({type:2,toast:s}),s.id},S=(e,t)=>H("blank")(e,t);S.error=H("error"),S.success=H("success"),S.loading=H("loading"),S.custom=H("custom"),S.dismiss=(e,t)=>{let r={type:3,toastId:e};t?O(t)(r):_(r)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let r={type:4,toastId:e};t?O(t)(r):_(r)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,r)=>{let i=S.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?S.success(s,{id:i,...r,...null==r?void 0:r.success}):S.dismiss(i),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?S.error(s,{id:i,...r,...null==r?void 0:r.error}):S.dismiss(i)}),e};var D=1e3,A=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,T=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,z=b("div")`
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
    animation: ${T} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,F=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${F} 1s linear infinite;
`,V=f`
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
}`,I=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${V} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,R=b("div")`
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
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:i}=e;return void 0!==t?"string"==typeof t?s.createElement(G,null,t):t:"blank"===r?null:s.createElement(R,null,s.createElement(M,{...i}),"loading"!==r&&s.createElement(B,null,"error"===r?s.createElement(z,{...i}):s.createElement(I,{...i})))},Z=b("div")`
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
`,q=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,W=s.memo(({toast:e,position:t,style:r,children:i})=>{let a=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[i,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(K,{toast:e}),n=s.createElement(q,{...e.ariaProps},g(e.message,e));return s.createElement(Z,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof i?i({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});i=s.createElement,d.p=void 0,p=i,x=void 0,h=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:i,children:a})=>{let o=s.useCallback(t=>{if(t){let r=()=>{i(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return s.createElement("div",{ref:o,className:t,style:r},a)},J=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:i,children:a,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:i}=((e={},t=w)=>{let[r,i]=(0,s.useState)(k[t]||C),a=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(a.current!==k[t]&&i(k[t]),N.push([t,i]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,i,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(i=e[t.type])?void 0:i.duration)||(null==e?void 0:e.duration)||E[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),a=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=D)=>{if(a.has(e))return;let r=setTimeout(()=>{a.delete(e),n({type:4,toastId:e})},t);a.set(e,r)},[]);(0,s.useEffect)(()=>{if(i)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let i=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(i<0){r.visible&&S.dismiss(r.id);return}return setTimeout(()=>S.dismiss(r.id,t),i)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,i,t]);let n=(0,s.useCallback)(O(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,s.useCallback)(()=>{i&&n({type:6,time:Date.now()})},[i,n]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:i=!1,gutter:s=8,defaultPosition:a}=t||{},o=r.filter(t=>(t.position||a)===(e.position||a)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...i?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,n,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:i,defaultPosition:t}),u=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?J:"",style:u},"custom"===r.type?g(r.message,r):a?a(r):s.createElement(W,{toast:r,position:l}))}))},"default",0,S,"toast",0,S],5766)},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let i={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:a="default",size:o="md",className:n,dot:l=!1,pulse:d=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",i[a],s[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",d&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:i,hover:s=!1,onClick:a}){return(0,t.jsx)("div",{onClick:a,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",s&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",a&&"cursor-pointer",i),children:e})},"CardContent",0,function({children:e,className:i}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",i),children:e})},"CardDescription",0,function({children:e,className:i}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",i),children:e})},"CardFooter",0,function({children:e,className:i}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",i),children:e})},"CardHeader",0,function({children:e,className:i}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",i),children:e})},"CardTitle",0,function({children:e,className:i}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",i),children:e})}])},97591,e=>{"use strict";var t=e.i(43476),r=e.i(75157),i=e.i(46932),s=e.i(50719);let a={primary:{bg:"bg-primary-100",text:"text-primary",border:"border-primary-200",gradient:["#D97706","#B45309"]},success:{bg:"bg-success/10",text:"text-success",border:"border-success/20",gradient:["#059669","#047857"]},warning:{bg:"bg-warning/10",text:"text-warning",border:"border-warning/20",gradient:["#EA580C","#C2410C"]},error:{bg:"bg-error/10",text:"text-error",border:"border-error/20",gradient:["#DC2626","#B91C1C"]},info:{bg:"bg-info/10",text:"text-info",border:"border-info/20",gradient:["#0EA5E9","#0284C7"]}};e.s(["StatsCard",0,function({title:e,value:o,icon:n,trend:l,sparkline:d,color:c="primary",description:u,className:m}){let p=a[c],x=void 0===l?null:"number"==typeof l?{value:Math.abs(l),positive:l>=0}:{value:l.value,positive:l.isPositive};return(0,t.jsxs)(i.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:200,damping:25},className:(0,r.cn)("bg-card border border-border/60 rounded-[20px] p-6","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",m),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between mb-4",children:[(0,t.jsx)("div",{className:(0,r.cn)("w-11 h-11 rounded-[14px] flex items-center justify-center border",p.bg,p.border),children:n&&(0,t.jsx)(n,{className:(0,r.cn)("w-5 h-5",p.text)})}),x&&(0,t.jsxs)(i.motion.div,{initial:{scale:0},animate:{scale:1},className:(0,r.cn)("flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium border",x.positive?"bg-success/10 border-success/20 text-success":"bg-error/10 border-error/20 text-error"),children:[x.positive?(0,t.jsx)(s.HiTrendingUp,{className:"w-3.5 h-3.5"}):(0,t.jsx)(s.HiTrendingDown,{className:"w-3.5 h-3.5"}),x.value,"%"]})]}),(0,t.jsx)("p",{className:"text-sm text-text-secondary mb-1",children:e}),(0,t.jsx)(i.motion.p,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{delay:.1},className:(0,r.cn)("text-[28px] font-bold leading-tight",p.text),children:o}),u&&(0,t.jsx)("p",{className:"text-xs text-text-tertiary mt-1.5",children:u}),d&&d.length>0&&(0,t.jsx)("div",{className:"mt-4 h-8",children:(0,t.jsxs)("svg",{viewBox:`0 0 ${d.length-1} 32`,className:"w-full h-full",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`sg-${c}-${e.replace(/\s/g,"")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:p.gradient[0],stopOpacity:"0.3"}),(0,t.jsx)("stop",{offset:"100%",stopColor:p.gradient[0],stopOpacity:"0"})]})}),(0,t.jsx)("path",{d:d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" "),fill:"none",stroke:p.gradient[0],strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:`${d.map((e,t)=>`${0===t?"M":"L"}${t} ${32-e/Math.max(...d)*28}`).join(" ")} L${d.length-1} 32 L0 32 Z`,fill:`url(#sg-${c}-${e.replace(/\s/g,"")})`})]})})]})}])},41740,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Progress",0,function({value:e,className:i,size:s="md"}){return(0,t.jsx)("div",{className:(0,r.cn)("w-full bg-card/80 rounded-full overflow-hidden border border-border","sm"===s?"h-1.5":"h-2.5",i),children:(0,t.jsx)("div",{className:"h-full bg-primary rounded-full transition-all duration-500",style:{width:`${Math.min(100,Math.max(0,e))}%`}})})}])},98706,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let i={sm:"w-8 h-8 text-xs",md:"w-10 h-10 text-sm",lg:"w-12 h-12 text-base"};e.s(["Avatar",0,function({src:e,alt:s="",name:a,size:o="md",className:n}){let l=a?a.split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase():"?";return e?(0,t.jsx)("img",{src:e,alt:s,className:(0,r.cn)("rounded-full object-cover border border-border",i[o],n)}):(0,t.jsx)("div",{className:(0,r.cn)("rounded-full bg-primary-100 text-primary flex items-center justify-center font-medium border border-primary-200",i[o],n),children:l})}])},5434,e=>{"use strict";var t=e.i(43476),r=e.i(22016),i=e.i(50719),s=e.i(98706),a=e.i(96395),o=e.i(31539),n=e.i(81604);e.s(["default",0,function({title:e,subtitle:l}){let{theme:d,toggleTheme:c}=(0,a.useThemeStore)(),u=(0,o.useSearchStore)(e=>e.toggleSearch);return(0,t.jsx)("header",{className:"sticky top-0 z-20 bg-surface/60 border-b border-border",children:(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 py-4",children:[(0,t.jsxs)("div",{children:[e&&(0,t.jsx)("h1",{className:"text-xl font-semibold text-text",children:e}),l&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-0.5",children:l})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)("button",{type:"button",onClick:u,className:"p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:(0,t.jsx)(i.HiSearch,{className:"w-5 h-5"})}),(0,t.jsx)("button",{type:"button",onClick:c,className:"p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:"dark"===d?(0,t.jsx)(i.HiSun,{className:"w-5 h-5"}):(0,t.jsx)(i.HiMoon,{className:"w-5 h-5"})}),(0,t.jsxs)(r.default,{href:"/teacher/notifications",className:"relative p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:[(0,t.jsx)(i.HiBell,{className:"w-5 h-5"}),(0,t.jsx)("span",{className:"absolute top-2 right-2 w-2 h-2 bg-error rounded-full"})]}),(0,t.jsx)(r.default,{href:"/teacher/settings",className:"mr-3",children:(0,t.jsx)(s.Avatar,{src:n.mockTeacher.avatar,name:n.mockTeacher.name,size:"sm"})})]})]})})}])},91519,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(46932),s=e.i(50719),a=e.i(5766),o=e.i(5434),n=e.i(39964),l=e.i(96640),d=e.i(97591),c=e.i(41740);let u=[{id:1,title:"الكيمياء - الباب الأول: العناصر الانتقالية",subject:"كيمياء",teacher:"ط£. خالد صقر",duration:45,views:3,maxViews:5,rating:4.9,watched:!1,category:"video",description:"شرح كامل للعناصر الانتقالية وخواصها",color:"from-emerald-400 to-emerald-600"},{id:2,title:"الفيزياء - الفصل الأول: التيار الكهربي",subject:"فيزياء",teacher:"ط£. أحمد سمير",duration:40,views:2,maxViews:5,rating:4.8,watched:!1,category:"video",description:"قوانين التيار الكهربي وطرق حسابه",color:"from-blue-400 to-blue-600"},{id:3,title:"التفاضل - النهايات والاتصال",subject:"رياضيات",teacher:"ط£. نبيل إبراهيم",duration:35,views:1,maxViews:5,rating:4.7,watched:!1,category:"interactive",description:"تمارين تفاعلية على النهايات",color:"from-purple-400 to-purple-600"},{id:4,title:"النحو - المبتدأ والخبر",subject:"عربي",teacher:"ط£. محمد صلاح",duration:30,views:4,maxViews:5,rating:4.9,watched:!0,category:"video",description:"قواعد المبتدأ والخبر مع الأمثلة",color:"from-amber-400 to-amber-600"},{id:5,title:"Grammar - Present Tenses",subject:"إنجليزي",teacher:"ط£. أحمد فريد",duration:25,views:0,maxViews:5,rating:4.5,watched:!1,category:"interactive",description:"الأزمنة الحالية في اللغة الإنجليزية",color:"from-rose-400 to-rose-600"},{id:6,title:"الكيمياء - الإتزان الكيميائي",subject:"كيمياء",teacher:"ط£. محمود جلال",duration:50,views:2,maxViews:3,rating:4.6,watched:!1,category:"pdf",description:"ملخص تفاعلات الإتزان مع التمارين",color:"from-cyan-400 to-cyan-600"},{id:7,title:"الفيزياء الحديثة - مقدمة",subject:"فيزياء",teacher:"ط£. مينا مجدي",duration:30,views:1,maxViews:5,rating:4.7,watched:!1,category:"video",description:"نظريات الفيزياء الحديثة",color:"from-indigo-400 to-indigo-600"},{id:8,title:"الأحياء - الخلية",subject:"أحياء",teacher:"ط£. هاني جمعة",duration:35,views:0,maxViews:5,rating:4.4,watched:!1,category:"interactive",description:"تركيب الخلية ووظائفها",color:"from-green-400 to-green-600"}],m=["الكل","فيديو","تفاعلي","PDF"],p={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.05}}},x={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,h]=(0,r.useState)("الكل"),[f,b]=(0,r.useState)(null),[g,y]=(0,r.useState)(u),v={الكل:"all",فيديو:"video",تفاعلي:"interactive",PDF:"pdf"},w="الكل"===e?g:g.filter(t=>t.category===v[e]);g.reduce((e,t)=>e+t.views,0);let j=g.filter(e=>!e.watched).length,N=(g.reduce((e,t)=>e+t.rating,0)/g.length).toFixed(1);return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(o.default,{title:"حصص تجريبية مجانية",subtitle:"جرب الدروس مجاناً قبل الاشتراك - أول 4 حصص مجاناً"}),(0,t.jsx)("div",{className:"p-6 md:p-8 max-w-6xl mx-auto space-y-6",children:(0,t.jsxs)(i.motion.div,{variants:p,initial:"hidden",animate:"visible",className:"space-y-6",children:[(0,t.jsxs)(i.motion.div,{variants:x,className:"grid grid-cols-1 sm:grid-cols-4 gap-5",children:[(0,t.jsx)(d.StatsCard,{title:"الحصص المتاحة",value:g.length,icon:s.HiOutlinePlusCircle,color:"primary"}),(0,t.jsx)(d.StatsCard,{title:"تم المشاهدة",value:g.filter(e=>e.watched).length,icon:s.HiOutlineEye,color:"success"}),(0,t.jsx)(d.StatsCard,{title:"الحصص المتبقية",value:j,icon:s.HiOutlineLockOpen,color:"warning"}),(0,t.jsx)(d.StatsCard,{title:"التقييم",value:`${N}/5`,icon:s.HiOutlineStar,color:"info"})]}),(0,t.jsxs)(i.motion.div,{variants:x,className:"flex items-center justify-between gap-4 flex-wrap",children:[(0,t.jsx)("div",{className:"flex gap-2 flex-wrap",children:m.map(r=>(0,t.jsx)("button",{type:"button",onClick:()=>h(r),className:`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${e===r?"border-primary bg-primary/10 text-primary":"border-border text-text-secondary hover:bg-surface-secondary"}`,children:r},r))}),(0,t.jsxs)(l.Badge,{variant:"premium",size:"md",children:[(0,t.jsx)(s.HiOutlineFire,{className:"w-3.5 h-3.5 ml-1"}),"أول 4 حصص مجاناً تماماً"]})]}),(0,t.jsx)(i.motion.div,{variants:p,initial:"hidden",animate:"visible",className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:w.map(e=>(0,t.jsx)(i.motion.div,{variants:x,children:(0,t.jsxs)(n.Card,{className:`h-full flex flex-col border-2 ${e.watched?"border-success/30":"border-border"}`,children:[(0,t.jsxs)("div",{className:`h-28 bg-gradient-to-br ${e.color} flex items-center justify-center relative`,children:[(0,t.jsx)(s.HiOutlineAcademicCap,{className:"w-10 h-10 text-white/60"}),(0,t.jsx)(l.Badge,{variant:"neutral",size:"sm",className:"absolute top-2 right-2 bg-white/20 text-white border-0",children:e.subject}),e.watched&&(0,t.jsxs)("div",{className:"absolute bottom-2 left-2 flex items-center gap-1 bg-success/80 text-white text-[10px] px-2 py-0.5 rounded-full",children:[(0,t.jsx)(s.HiOutlineCheckCircle,{className:"w-3 h-3"})," تمت المشاهدة"]})]}),(0,t.jsxs)(n.CardContent,{className:"flex-1 flex flex-col gap-2 p-4",children:[(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("h3",{className:"text-sm font-bold text-text leading-snug mb-1",children:e.title}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary mb-1",children:e.teacher}),(0,t.jsx)("p",{className:"text-[11px] text-text-tertiary",children:e.description})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between text-xs text-text-tertiary",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(s.HiOutlineClock,{className:"w-3.5 h-3.5"})," ",e.duration," دقيقة"]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(s.HiOutlineStar,{className:"w-3.5 h-3.5 text-amber-400"})," ",e.rating]})]}),(0,t.jsxs)("div",{className:"text-[11px] text-text-tertiary flex items-center justify-between",children:[(0,t.jsxs)("span",{children:["المشاهدات: ",e.views,"/",e.maxViews]}),(0,t.jsx)(c.Progress,{value:e.views/e.maxViews*100,size:"sm",variant:"primary",className:"w-16"})]})]}),(0,t.jsx)(n.CardFooter,{className:"p-3 pt-0",children:(0,t.jsx)("button",{type:"button",onClick:()=>{var t;b(t=e.id),a.default.success("جاري تشغيل الحصة التجريبية..."),setTimeout(()=>{y(e=>e.map(e=>e.id===t?{...e,views:e.views+1,watched:!0}:e)),b(null),a.default.success("تم مشاهدة الحصة التجريبية! متبقي "+(g.find(e=>e.id===t)?.maxViews-g.find(e=>e.id===t)?.views-1)+" مشاهدة")},2e3)},disabled:f===e.id||e.views>=e.maxViews,className:`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${e.views>=e.maxViews?"bg-surface-tertiary text-text-tertiary cursor-not-allowed":f===e.id?"bg-primary/50 text-white cursor-wait":"bg-primary text-white hover:bg-primary-dark"}`,children:f===e.id?(0,t.jsx)(t.Fragment,{children:"جاري التشغيل..."}):e.views>=e.maxViews?(0,t.jsx)(t.Fragment,{children:"انتهت المشاهدات المتاحة"}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.HiOutlinePlusCircle,{className:"w-4 h-4"})," مشاهدة الحصة التجريبية"]})})})]})},e.id))}),0===w.length&&(0,t.jsxs)("div",{className:"text-center py-16 text-text-tertiary",children:[(0,t.jsx)(s.HiOutlinePlusCircle,{className:"w-16 h-16 mx-auto mb-3 opacity-30"}),(0,t.jsx)("p",{className:"text-sm",children:"لا توجد حصص تجريبية في هذا التصنيف"})]})]})})]})}])}]);