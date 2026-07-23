(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7081,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(50719);let i=(0,r.forwardRef)(({value:e,onChange:i,placeholder:o="بحث...",className:n},l)=>{let[c,d]=(0,r.useState)(""),u=void 0!==e,p=u?e:c,m=e=>{u||d(e),i?.(e)};return(0,t.jsxs)("div",{className:(0,a.cn)("relative",n),children:[(0,t.jsx)(s.HiSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none"}),(0,t.jsx)("input",{ref:l,value:p,onChange:e=>m(e.target.value),placeholder:o,className:"w-full bg-card border border-border rounded-[14px] pr-10 pl-9 py-2.5 text-sm text-text placeholder-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-200"}),p&&(0,t.jsx)("button",{onClick:()=>m(""),className:"absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text transition-colors",children:(0,t.jsx)(s.HiX,{className:"w-4 h-4"})})]})});i.displayName="SearchInput",e.s(["SearchInput",0,i])},96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},s={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:i="default",size:o="md",className:n,dot:l=!1,pulse:c=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",a[i],s[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",c&&"animate-pulse")}),e]})}])},37757,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["PageHeader",0,function({title:e,description:a,children:s,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,r.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),a&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:a})]}),s&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:s})]})}])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=c.p?c.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},d={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let p=u(e),m=d[p]||(d[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!d[m]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);d[m]=c(s?{["@keyframes "+m]:t}:t,r?"":"."+m)}let x=r&&d.g;return r&&(d.g=d[m]),i=d[m],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}p.bind({g:1});let m,x,f,h=p.bind({k:1});function b(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;r.p=Object.assign({theme:x&&x()},n),r.o=/go\d/.test(l),n.className=p.apply(r,a)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),f&&c[0]&&f(n),m(c,n)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},O=(e,t=j)=>{C[t]=w(C[t]||k,e),N.forEach(([e,r])=>{e===t&&r(C[t])})},E=e=>Object.keys(C).forEach(t=>O(e,t)),$=(e=j)=>t=>{O(t,e)},H={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return $(s.toasterId||(a=s.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},_=(e,t)=>P("blank")(e,t);_.error=P("error"),_.success=P("success"),_.loading=P("loading"),_.custom=P("custom"),_.dismiss=(e,t)=>{let r={type:3,toastId:e};t?$(t)(r):E(r)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let r={type:4,toastId:e};t?$(t)(r):E(r)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,r)=>{let a=_.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?_.success(s,{id:a,...r,...null==r?void 0:r.success}):_.dismiss(a),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?_.error(s,{id:a,...r,...null==r?void 0:r.error}):_.dismiss(a)}),e};var S=1e3,I=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,A=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,D=h`
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

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${A} 0.15s ease-out forwards;
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
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,T=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${T} 1s linear infinite;
`,L=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,R=h`
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

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${R} 0.2s ease-out forwards;
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
}`,q=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,X=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(q,null,t):t:"blank"===r?null:s.createElement(U,null,s.createElement(B,{...a}),"loading"!==r&&s.createElement(F,null,"error"===r?s.createElement(z,{...a}):s.createElement(M,{...a})))},Y=b("div")`
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
`,G=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(X,{toast:e}),n=s.createElement(Z,{...e.ariaProps},g(e.message,e));return s.createElement(Y,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});a=s.createElement,c.p=void 0,m=a,x=void 0,f=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},Q=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(C[t]||k),i=(0,s.useRef)(C[t]);(0,s.useEffect)(()=>(i.current!==C[t]&&a(C[t]),N.push([t,a]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||H[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=S)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&_.dismiss(r.id);return}return setTimeout(()=>_.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,s.useCallback)($(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,s.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let o,n,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(J,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?Q:"",style:u},"custom"===r.type?g(r.message,r):i?i(r):s.createElement(G,{toast:r,position:l}))}))},"default",0,_,"toast",0,_],5766)},59544,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(58594);let i={primary:"bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",secondary:"bg-card border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:shadow-[0_4px_16px_rgba(217,119,6,0.03)] active:scale-[0.97]",ghost:"bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",danger:"bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",success:"bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]"},o={sm:"px-3 py-1.5 text-xs rounded-[12px]",md:"px-5 py-2.5 text-sm rounded-[14px]",lg:"px-7 py-3.5 text-base rounded-[16px]"},n=(0,r.forwardRef)(({variant:e="primary",size:r="md",isLoading:n,leftIcon:l,rightIcon:c,className:d,disabled:u,children:p,...m},x)=>(0,t.jsxs)("button",{ref:x,disabled:u||n,className:(0,a.cn)("inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none","hover:-translate-y-0.5 active:translate-y-0","disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",i[e],o[r],d),...m,children:[n?(0,t.jsx)(s.Spinner,{size:"sm"}):l,p,!n&&c]}));n.displayName="Button",e.s(["default",0,n])},40803,e=>{"use strict";var t=e.i(43476),r=e.i(75157),a=e.i(50719);e.s(["EmptyState",0,function({title:e="لا توجد بيانات",description:s="لم يتم العثور على أي عناصر بعد.",icon:i=a.HiOutlineInbox,action:o,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("flex flex-col items-center justify-center py-16 px-4 text-center",n),children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5",children:(0,t.jsx)(i,{className:"w-7 h-7 text-text-tertiary"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-text mb-1.5",children:e}),(0,t.jsx)("p",{className:"text-sm text-text-secondary max-w-sm",children:s}),o&&(0,t.jsx)("div",{className:"mt-5",children:o})]})}])},68826,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(22016),s=e.i(18566),i=e.i(5766),o=e.i(46932),n=e.i(50719),l=e.i(37757),c=e.i(96640),d=e.i(7081),u=e.i(40803),p=e.i(59544),m=e.i(81604),x=e.i(75157);let f={published:{label:"منشور",variant:"success"},draft:{label:"مسودة",variant:"default"},"coming-soon":{label:"قريباً",variant:"warning"},archived:{label:"مؤرشف",variant:"error"},hidden:{label:"مخفي",variant:"info"}},h=["الكل","أولى ثانوي","ثانية ثانوي","ثالثة ثانوي"],b=["الكل","published","draft","coming-soon","archived"];e.s(["default",0,function(){let e=(0,s.useRouter)(),[g,y]=(0,r.useState)(""),[v,j]=(0,r.useState)("الكل"),[w,N]=(0,r.useState)("الكل"),k=(0,r.useMemo)(()=>m.mockCourses.filter(e=>{let t=g.toLowerCase();return(e.title.includes(t)||e.subject.includes(t))&&("الكل"===v||e.grade===v)&&("الكل"===w||e.status===w)}),[g,v,w]);return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsx)(l.PageHeader,{title:"الكورسات",description:"إدارة وتنظيم جميع الكورسات",breadcrumbs:[{label:"لوحة التحكم",href:"/teacher"},{label:"الكورسات"}],actions:(0,t.jsx)(a.default,{href:"/teacher/courses/create",children:(0,t.jsx)(p.default,{variant:"primary",leftIcon:(0,t.jsx)(n.HiOutlinePlus,{className:"w-4 h-4"}),children:"إضافة كورس"})})}),(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row gap-5",children:[(0,t.jsx)(d.SearchInput,{value:g,onChange:y,placeholder:"بحث عن كورس...",className:"sm:max-w-xs flex-1"}),(0,t.jsx)("select",{value:v,onChange:e=>j(e.target.value),className:"px-4 py-2.5 bg-card border border-border rounded-[16px] text-sm text-text appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 ",children:h.map(e=>(0,t.jsx)("option",{value:e,children:"الكل"===e?"جميع الصفوف":e},e))}),(0,t.jsx)("select",{value:w,onChange:e=>N(e.target.value),className:"px-4 py-2.5 bg-card border border-border rounded-[16px] text-sm text-text appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 ",children:b.map(e=>(0,t.jsx)("option",{value:e,children:"الكل"===e?"جميع الحالات":f[e]?.label},e))})]}),0===k.length?(0,t.jsx)(u.EmptyState,{icon:n.HiOutlineBookOpen,title:"لا توجد كورسات",description:"لم يتم العثور على كورسات مطابقة للبحث",actionLabel:"إضافة كورس",onAction:()=>e.push("/teacher/courses/create")}):(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5",children:k.map((r,a)=>(0,t.jsx)(o.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.04*a},children:(0,t.jsxs)("div",{className:"group bg-card border border-border rounded-[24px] overflow-hidden  hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-250 cursor-pointer h-full",onClick:()=>e.push(`/teacher/courses/${r.id}`),children:[(0,t.jsxs)("div",{className:"relative h-44 overflow-hidden",children:[(0,t.jsx)("img",{src:r.image,alt:r.title,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-surface-secondary/70 to-transparent"}),(0,t.jsx)("div",{className:"absolute top-3 left-3",children:(0,t.jsx)(c.Badge,{variant:f[r.status]?.variant||"default",size:"sm",children:f[r.status]?.label})}),(0,t.jsxs)("div",{className:"absolute bottom-3 right-3 flex items-center gap-2",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1 text-xs text-white bg-black/30 px-2.5 py-1 rounded-[10px] border border-white/10",children:[(0,t.jsx)(n.HiOutlineUsers,{className:"w-3 h-3"}),r.studentsCount]}),(0,t.jsxs)("span",{className:"flex items-center gap-1 text-xs text-white bg-black/30 px-2.5 py-1 rounded-[10px] border border-white/10",children:[(0,t.jsx)(n.HiOutlineStar,{className:"w-3 h-3 text-warning"}),r.rating]})]})]}),(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h3",{className:"font-semibold text-text mb-1 truncate",children:r.title}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary mb-3 line-clamp-2 leading-relaxed",children:r.shortDescription}),(0,t.jsxs)("div",{className:"flex items-center gap-3 text-xs text-text-secondary",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(n.HiOutlineAcademicCap,{className:"w-3.5 h-3.5"}),r.grade]}),(0,t.jsx)("span",{className:"w-1 h-1 rounded-full bg-border"}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(n.HiOutlineBookOpen,{className:"w-3.5 h-3.5"}),r.lessonsCount," درس"]})]}),(0,t.jsx)("div",{className:"h-px bg-border my-3"}),(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("div",{children:r.discountPrice?(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)("span",{className:"text-sm font-bold text-text",children:(0,x.formatCurrency)(r.discountPrice)}),(0,t.jsx)("span",{className:"text-xs text-text-tertiary line-through",children:(0,x.formatCurrency)(r.price)})]}):(0,t.jsx)("span",{className:"text-sm font-bold text-text",children:r.isFree?"مجاني":(0,x.formatCurrency)(r.price)})}),(0,t.jsxs)("div",{className:"flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250",children:[(0,t.jsx)("button",{type:"button",onClick:t=>{t.stopPropagation(),e.push(`/teacher/courses/${r.id}`)},className:"p-1.5 rounded-[10px] text-text-tertiary hover:text-primary hover:bg-primary/10 transition-all",children:(0,t.jsx)(n.HiOutlinePencil,{className:"w-4 h-4"})}),(0,t.jsx)("button",{type:"button",onClick:t=>{t.stopPropagation(),e.push(`/teacher/courses/${r.id}`)},className:"p-1.5 rounded-[10px] text-text-tertiary hover:text-info hover:bg-info/10 transition-all",children:(0,t.jsx)(n.HiOutlineEye,{className:"w-4 h-4"})}),(0,t.jsx)("button",{type:"button",onClick:e=>{e.stopPropagation(),i.default.success("تم إخفاء الكورس")},className:"p-1.5 rounded-[10px] text-text-tertiary hover:text-warning hover:bg-warning/10 transition-all",children:(0,t.jsx)(n.HiOutlineEyeOff,{className:"w-4 h-4"})}),(0,t.jsx)("button",{type:"button",onClick:e=>{e.stopPropagation(),i.default.success("تم حذف الكورس")},className:"p-1.5 rounded-[10px] text-text-tertiary hover:text-error hover:bg-error/10 transition-all",children:(0,t.jsx)(n.HiOutlineTrash,{className:"w-4 h-4"})})]})]})]})]})},r.id))})]})}])}]);