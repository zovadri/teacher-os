(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,r;var s,a=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},d={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e};function u(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let u=m(e),p=d[u]||(d[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!d[p]){let t=u!==e?e:(e=>{let t,r,s=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);d[p]=c(a?{["@keyframes "+p]:t}:t,r?"":"."+p)}let x=r&&d.g;return r&&(d.g=d[p]),i=d[p],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),p})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}u.bind({g:1});let p,x,f,h=u.bind({k:1});function b(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:x&&x()},n),r.o=/go\d/.test(l),n.className=u.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),f&&c[0]&&f(n),p(c,n)}return t?t(a):a}}var y=(e,t)=>"function"==typeof e?e(t):e,g=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},E=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},O=e=>Object.keys(k).forEach(t=>E(e,t)),_=(e=j)=>t=>{E(t,e)},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||g()}))(t,e,r);return _(a.toasterId||(s=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},S=(e,t)=>H("blank")(e,t);S.error=H("error"),S.success=H("success"),S.loading=H("loading"),S.custom=H("custom"),S.dismiss=(e,t)=>{let r={type:3,toastId:e};t?_(t)(r):O(r)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let r={type:4,toastId:e};t?_(t)(r):O(r)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,r)=>{let s=S.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?y(t.success,e):void 0;return a?S.success(a,{id:s,...r,...null==r?void 0:r.success}):S.dismiss(s),e}).catch(e=>{let a=t.error?y(t.error,e):void 0;a?S.error(a,{id:s,...r,...null==r?void 0:r.error}):S.dismiss(s)}),e};var I=1e3,R=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,T=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,A=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${T} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,z=h`
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
`,Q=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=h`
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

  animation: ${Q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,L=b("div")`
  position: absolute;
`,M=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,U=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${U} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(q,null,t):t:"blank"===r?null:a.createElement(M,null,a.createElement(P,{...s}),"loading"!==r&&a.createElement(L,null,"error"===r?a.createElement(A,{...s}):a.createElement(B,{...s})))},G=b("div")`
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
`,X=b("div")`
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
`];return{animation:t?`${h(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(K,{toast:e}),n=a.createElement(X,{...e.ariaProps},y(e.message,e));return a.createElement(G,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});s=a.createElement,c.p=void 0,p=s,x=void 0,f=void 0;var Z=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:o,className:t,style:r},i)},J=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=j)=>{let[r,s]=(0,a.useState)(k[t]||C),i=(0,a.useRef)(k[t]);(0,a.useEffect)(()=>(i.current!==k[t]&&s(k[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=I)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&S.dismiss(r.id);return}return setTimeout(()=>S.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let n=(0,a.useCallback)(_(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,a.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),m=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:m}}})(r,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let o,n,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),m=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return a.createElement(Z,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?J:"",style:m},"custom"===r.type?y(r.message,r):i?i(r):a.createElement(Y,{toast:r,position:l}))}))},"default",0,S,"toast",0,S],5766)},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let s={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},a={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:c=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",s[i],a[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",c&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:s,hover:a=!1,onClick:i}){return(0,t.jsx)("div",{onClick:i,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",a&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",i&&"cursor-pointer",s),children:e})},"CardContent",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",s),children:e})},"CardDescription",0,function({children:e,className:s}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",s),children:e})},"CardFooter",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",s),children:e})},"CardHeader",0,function({children:e,className:s}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",s),children:e})},"CardTitle",0,function({children:e,className:s}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",s),children:e})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:a,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),a&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:a})]})}])},64753,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["Breadcrumb",0,function({items:e,className:a}){return(0,t.jsx)("nav",{className:(0,r.cn)("flex items-center gap-1.5 text-sm text-text-secondary",a),children:e.map((e,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[r>0&&(0,t.jsx)(s.HiChevronLeft,{className:"w-3.5 h-3.5 text-text-tertiary"}),e.href?(0,t.jsx)("a",{href:e.href,className:"hover:text-text transition-colors",children:e.label}):(0,t.jsx)("span",{className:"text-text",children:e.label})]},r))})}])},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(75157),a=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},n=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:n,leftIcon:l,rightIcon:c,className:d,disabled:m,children:u,...p},x)=>(0,t.jsxs)("button",{ref:x,disabled:m||n,className:(0,s.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],d),...p,children:[n?(0,t.jsx)(a.Spinner,{size:"sm"}):l,u,!n&&c]}));n.displayName="Button",e.s(["default",0,n])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:a="لم يتم العثور على أي عناصر بعد.",icon:i=s.HiOutlineInbox,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},51312,e=>{"use strict";var t=e.i(43476),r=e.i(75157),s=e.i(50719);e.s(["ErrorState",0,function({title:e="حدث خطأ",description:a="حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",icon:i=s.HiOutlineExclamationCircle,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-error/10 border border-error/20 flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-error"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:a}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},45845,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(46932),a=e.i(50719),i=e.i(5766),o=e.i(75157),n=e.i(64753),l=e.i(37757),c=e.i(39964),d=e.i(96640),m=e.i(59544),u=e.i(40803),p=e.i(51312),x=e.i(81604);e.s(["default",0,function(){let[e,f]=(0,r.useState)(!1),[h,b]=(0,r.useState)(!1),[y,g]=(0,r.useState)(null),[v,j]=(0,r.useState)(!1),[N,w]=(0,r.useState)(!1),[C,k]=(0,r.useState)([]),E=(0,r.useRef)(null),O=(0,r.useRef)(!1),_=()=>{e||(O.current=!1,f(!0),b(!1),g(null),j(!1),w(!1),setTimeout(()=>{if(O.current)return;O.current=!0;let e=x.mockStudents[Math.floor((0,o.det)()*x.mockStudents.length)];g(e),b(!0),f(!1),i.toast.success(`تم التعرف على ${e.name}`,{position:"top-left"})},3e3),setTimeout(()=>{O.current||(O.current=!0,w(!0),f(!1),i.toast.error("فشل مسح QR كود، حاول مرة أخرى",{position:"top-left"}))},8e3))};return(0,r.useEffect)(()=>{let t,r;if(!e)return;let s=e=>{r||(r=e);let a=e-r;E.current&&(E.current.style.top=`${a%2500/2500*100}%`),t=requestAnimationFrame(s)};return t=requestAnimationFrame(s),()=>cancelAnimationFrame(t)},[e]),(0,t.jsxs)("div",{className:"p-4 md:p-6 space-y-6",children:[(0,t.jsx)(i.Toaster,{}),(0,t.jsx)(n.Breadcrumb,{items:[{label:"الحضور",href:"/teacher/attendance"},{label:"مسح QR"}]}),(0,t.jsx)(l.PageHeader,{title:"مسح QR كود",description:"مسح QR كود الطالب لتسجيل الحضور",actions:(0,t.jsx)(m.default,{type:"button",variant:"primary",onClick:_,disabled:e,leftIcon:(0,t.jsx)(a.HiOutlineQrcode,{className:"w-4 h-4"}),children:e?"جارٍ المسح...":"بدء المسح"})}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[(0,t.jsx)("div",{className:"lg:col-span-2 space-y-4",children:(0,t.jsx)(c.Card,{children:(0,t.jsx)(c.CardContent,{className:"p-0",children:(0,t.jsx)("div",{className:"relative flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden",style:{minHeight:400},children:e?(0,t.jsxs)("div",{className:"relative w-full h-full flex flex-col items-center justify-center p-8",children:[(0,t.jsxs)("div",{className:"relative w-64 h-64 border-2 border-primary/50 rounded-xl overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-black/5"}),(0,t.jsx)("div",{className:"absolute inset-0 flex items-center justify-center",children:(0,t.jsx)(a.HiOutlineCamera,{className:"w-16 h-16 text-primary/40"})}),(0,t.jsx)("div",{ref:E,className:"absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-lg shadow-primary/50",style:{top:"0%"}}),(0,t.jsx)("div",{className:"absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl"}),(0,t.jsx)("div",{className:"absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr"}),(0,t.jsx)("div",{className:"absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl"}),(0,t.jsx)("div",{className:"absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br"})]}),(0,t.jsx)("p",{className:"text-text-secondary text-sm mt-6",children:"وجه الكاميرا نحو QR كود الطالب..."}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mt-2",children:[(0,t.jsx)("div",{className:"w-2 h-2 rounded-full bg-primary animate-pulse"}),(0,t.jsx)("span",{className:"text-xs text-text-tertiary",children:"جارٍ المسح"})]})]}):N?(0,t.jsx)(p.ErrorState,{title:"فشل المسح",message:"لم يتم التعرف على QR كود. حاول مرة أخرى.",onRetry:()=>{w(!1),b(!1),g(null),_()}}):y&&!v?(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center p-8",children:[(0,t.jsx)("div",{className:"w-24 h-24 rounded-full overflow-hidden border-4 border-primary mb-4",children:(0,t.jsx)("img",{src:y.avatar,alt:"",className:"w-full h-full object-cover"})}),(0,t.jsx)("h3",{className:"text-xl font-bold text-text",children:y.name}),(0,t.jsxs)("p",{className:"text-text-secondary",children:[y.grade," - ",y.group]}),(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[(0,t.jsx)(m.default,{type:"button",onClick:()=>{y&&(j(!0),k(e=>[{id:`${y.id}-${Date.now()}`,studentName:y.name,studentImage:y.avatar,grade:y.grade,time:new Date().toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"}),success:!0},...e.slice(0,9)]),i.toast.success(`تم تسجيل حضور ${y.name}`,{position:"top-left"}))},variant:"success",size:"lg",leftIcon:(0,t.jsx)(a.HiOutlineCheck,{className:"w-5 h-5"}),children:"تأكيد الحضور"}),(0,t.jsx)(m.default,{type:"button",onClick:()=>{g(null),b(!1),w(!1),(0,i.toast)("تم إلغاء المسح",{position:"top-left"})},variant:"secondary",size:"lg",leftIcon:(0,t.jsx)(a.HiOutlineX,{className:"w-5 h-5"}),children:"إلغاء"})]})]}):v?(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center p-8",children:[(0,t.jsx)("div",{className:"w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4",children:(0,t.jsx)(a.HiOutlineCheckCircle,{className:"w-10 h-10 text-emerald-600"})}),(0,t.jsx)("h3",{className:"text-xl font-bold text-text mb-1",children:"تم تسجيل الحضور بنجاح"}),(0,t.jsx)("p",{className:"text-text-secondary text-sm",children:y?.name}),(0,t.jsx)(m.default,{type:"button",onClick:_,variant:"primary",className:"mt-6",leftIcon:(0,t.jsx)(a.HiOutlineQrcode,{className:"w-4 h-4"}),children:"مسح QR جديد"})]}):(0,t.jsx)(u.EmptyState,{icon:a.HiOutlineCamera,title:"الكاميرا في وضع الاستعداد",description:"اضغط على 'بدء المسح' لبدء مسح QR كود الطالب",action:(0,t.jsx)(m.default,{type:"button",onClick:_,variant:"primary",leftIcon:(0,t.jsx)(a.HiOutlineQrcode,{className:"w-4 h-4"}),children:"بدء المسح"})})})})})}),(0,t.jsx)("div",{className:"space-y-4",children:(0,t.jsxs)(c.Card,{children:[(0,t.jsxs)(c.CardHeader,{children:[(0,t.jsx)(c.CardTitle,{children:"عمليات المسح الأخيرة"}),(0,t.jsx)(d.Badge,{variant:"primary",size:"sm",children:C.length})]}),(0,t.jsx)(c.CardContent,{children:0===C.length?(0,t.jsx)(u.EmptyState,{icon:a.HiOutlineClock,title:"لا توجد عمليات مسح",description:"عمليات مسح QR ستظهر هنا"}):(0,t.jsx)("div",{className:"space-y-2",children:C.map((e,r)=>(0,t.jsxs)(s.motion.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.05*r},className:"flex items-center gap-3 p-3 rounded-lg bg-surface-secondary border border-border",children:[(0,t.jsx)("img",{src:e.studentImage,alt:"",className:"w-8 h-8 rounded-full bg-surface-tertiary"}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text truncate",children:e.studentName}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.grade})]}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.time}),e.success&&(0,t.jsx)(a.HiOutlineCheckCircle,{className:"w-4 h-4 text-success mt-0.5"})]})]},e.id))})})]})})]})]})}])}]);