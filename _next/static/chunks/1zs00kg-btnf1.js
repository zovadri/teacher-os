(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,96640,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={default:"bg-card border border-border text-text-secondary",neutral:"bg-surface-secondary border border-border text-text-secondary",primary:"bg-primary-100 border border-primary-200 text-primary",success:"bg-success/10 border border-success/20 text-success",warning:"bg-warning/10 border border-warning/20 text-warning",error:"bg-error/10 border border-error/20 text-error",info:"bg-info/10 border border-info/20 text-info"},i={sm:"px-2 py-0.5 text-[10px]",md:"px-2.5 py-1 text-xs"};e.s(["Badge",0,function({children:e,variant:s="default",size:o="md",className:n,dot:l=!1,pulse:c=!1}){return(0,t.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",a[s],i[o],n),children:[l&&(0,t.jsx)("span",{className:(0,r.cn)("w-1.5 h-1.5 rounded-full bg-current shrink-0",c&&"animate-pulse")}),e]})}])},39964,e=>{"use strict";var t=e.i(43476),r=e.i(75157);e.s(["Card",0,function({children:e,className:a,hover:i=!1,onClick:s}){return(0,t.jsx)("div",{onClick:s,className:(0,r.cn)("bg-card border border-border/60 rounded-[20px]","shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]","transition-all duration-300",i&&"cursor-pointer hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]",s&&"cursor-pointer",a),children:e})},"CardContent",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pb-7",a),children:e})},"CardDescription",0,function({children:e,className:a}){return(0,t.jsx)("p",{className:(0,r.cn)("text-sm text-text-secondary mt-1",a),children:e})},"CardFooter",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 py-4 border-t border-border/60",a),children:e})},"CardHeader",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("px-7 pt-7 pb-2",a),children:e})},"CardTitle",0,function({children:e,className:a}){return(0,t.jsx)("h3",{className:(0,r.cn)("text-lg font-semibold text-text",a),children:e})}])},5766,e=>{"use strict";let t,r;var a,i=e.i(71645);let s={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",a="",i="";for(let s in e){let o=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+o+";":a+="f"==s[1]?c(o,s):s+"{"+c(o,"k"==s[1]?"":t)+"}":"object"==typeof o?a+=c(o,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=o&&(s="-"==s[1]?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=c.p?c.p(s,o):s+":"+o+";")}return r+(t&&i?t+"{"+i+"}":i)+a},d={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function m(e){let t,r,a=this||{},i=e.call?e(a.p):e;return((e,t,r,a,i)=>{var s;let m=p(e),u=d[m]||(d[m]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(m));if(!d[u]){let t=m!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);d[u]=c(i?{["@keyframes "+u]:t}:t,r?"":"."+u)}let x=r&&d.g;return r&&(d.g=d[u]),s=d[u],x?t.data=t.data.replace(x,s):-1===t.data.indexOf(s)&&(t.data=a?s+t.data:t.data+s),u})(i.unshift?i.raw?(t=[].slice.call(arguments,1),r=a.p,i.reduce((e,a,i)=>{let s=t[i];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==s?"":s)},"")):i.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):i,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||s})(a.target),a.g,a.o,a.k)}m.bind({g:1});let u,x,f,h=m.bind({k:1});function b(e,t){let r=this||{};return function(){let a=arguments;function i(s,o){let n=Object.assign({},s),l=n.className||i.className;r.p=Object.assign({theme:x&&x()},n),r.o=/go\d/.test(l),n.className=m.apply(r,a)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),f&&c[0]&&f(n),u(c,n)}return t?t(i):i}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},w=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},O=(e,t=j)=>{k[t]=N(k[t]||C,e),w.forEach(([e,r])=>{e===t&&r(k[t])})},E=e=>Object.keys(k).forEach(t=>O(e,t)),$=(e=j)=>t=>{O(t,e)},H={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=e=>(t,r)=>{let a,i=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return $(i.toasterId||(a=i.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:i}),i.id},_=(e,t)=>S("blank")(e,t);_.error=S("error"),_.success=S("success"),_.loading=S("loading"),_.custom=S("custom"),_.dismiss=(e,t)=>{let r={type:3,toastId:e};t?$(t)(r):E(r)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let r={type:4,toastId:e};t?$(t)(r):E(r)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,r)=>{let a=_.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?g(t.success,e):void 0;return i?_.success(i,{id:a,...r,...null==r?void 0:r.success}):_.dismiss(a),e}).catch(e=>{let i=t.error?g(t.error,e):void 0;i?_.error(i,{id:a,...r,...null==r?void 0:r.error}):_.dismiss(a)}),e};var A=1e3,D=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,T=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,P=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${T} 0.15s ease-out forwards;
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
    animation: ${z} 0.15s ease-out forwards;
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
`,B=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,M=h`
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
}`,L=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,R=b("div")`
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
`,X=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(q,null,t):t:"blank"===r?null:i.createElement(U,null,i.createElement(B,{...a}),"loading"!==r&&i.createElement(R,null,"error"===r?i.createElement(P,{...a}):i.createElement(L,{...a})))},Y=b("div")`
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
`,G=i.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,i]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(X,{toast:e}),n=i.createElement(Z,{...e.ariaProps},g(e.message,e));return i.createElement(Y,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):i.createElement(i.Fragment,null,o,n))});a=i.createElement,c.p=void 0,u=a,x=void 0,f=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let o=i.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:o,className:t,style:r},s)},Q=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,i.useState)(k[t]||C),s=(0,i.useRef)(k[t]);(0,i.useEffect)(()=>(s.current!==k[t]&&a(k[t]),w.push([t,a]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||H[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...r,toasts:o}})(e,t),s=(0,i.useRef)(new Map).current,o=(0,i.useCallback)((e,t=A)=>{if(s.has(e))return;let r=setTimeout(()=>{s.delete(e),n({type:4,toastId:e})},t);s.set(e,r)},[]);(0,i.useEffect)(()=>{if(a)return;let e=Date.now(),i=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&_.dismiss(r.id);return}return setTimeout(()=>_.dismiss(r.id,t),a)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,i.useCallback)($(t),[t]),l=(0,i.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,i.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,i.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),p=(0,i.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:s}=t||{},o=r.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[r]);return(0,i.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:p}}})(r,o);return i.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let o,n,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),p=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return i.createElement(J,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?Q:"",style:p},"custom"===r.type?g(r.message,r):s?s(r):i.createElement(G,{toast:r,position:l}))}))},"default",0,_,"toast",0,_],5766)},98706,e=>{"use strict";var t=e.i(43476),r=e.i(75157);let a={sm:"w-8 h-8 text-xs",md:"w-10 h-10 text-sm",lg:"w-12 h-12 text-base"};e.s(["Avatar",0,function({src:e,alt:i="",name:s,size:o="md",className:n}){let l=s?s.split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase():"?";return e?(0,t.jsx)("img",{src:e,alt:i,className:(0,r.cn)("rounded-full object-cover border border-border",a[o],n)}):(0,t.jsx)("div",{className:(0,r.cn)("rounded-full bg-primary-100 text-primary flex items-center justify-center font-medium border border-primary-200",a[o],n),children:l})}])},5434,e=>{"use strict";var t=e.i(43476),r=e.i(22016),a=e.i(50719),i=e.i(98706),s=e.i(96395),o=e.i(31539),n=e.i(81604);e.s(["default",0,function({title:e,subtitle:l}){let{theme:c,toggleTheme:d}=(0,s.useThemeStore)(),p=(0,o.useSearchStore)(e=>e.toggleSearch);return(0,t.jsx)("header",{className:"sticky top-0 z-20 bg-surface/60 border-b border-border",children:(0,t.jsxs)("div",{className:"flex items-center justify-between px-6 py-4",children:[(0,t.jsxs)("div",{children:[e&&(0,t.jsx)("h1",{className:"text-xl font-semibold text-text",children:e}),l&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-0.5",children:l})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)("button",{type:"button",onClick:p,className:"p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:(0,t.jsx)(a.HiSearch,{className:"w-5 h-5"})}),(0,t.jsx)("button",{type:"button",onClick:d,className:"p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:"dark"===c?(0,t.jsx)(a.HiSun,{className:"w-5 h-5"}):(0,t.jsx)(a.HiMoon,{className:"w-5 h-5"})}),(0,t.jsxs)(r.default,{href:"/teacher/notifications",className:"relative p-2.5 rounded-xl hover:bg-surface-tertiary text-text-tertiary transition-colors",children:[(0,t.jsx)(a.HiBell,{className:"w-5 h-5"}),(0,t.jsx)("span",{className:"absolute top-2 right-2 w-2 h-2 bg-error rounded-full"})]}),(0,t.jsx)(r.default,{href:"/teacher/settings",className:"mr-3",children:(0,t.jsx)(i.Avatar,{src:n.mockTeacher.avatar,name:n.mockTeacher.name,size:"sm"})})]})]})})}])},5810,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),i=e.i(88653),s=e.i(50719),o=e.i(5766),n=e.i(5434),l=e.i(39964),c=e.i(96640);let d=[{id:1,title:"المرجع الشامل في الكيمياء",author:"أ. خالد صقر",price:250,rating:4.8,category:"external",coverColor:"from-emerald-400 to-emerald-600"},{id:2,title:"المعاصر في الفيزياء",author:"أ. أحمد سمير",price:220,rating:4.7,category:"external",coverColor:"from-blue-400 to-blue-600"},{id:3,title:"مذكرة الرياضيات البحتة",author:"أ. نبيل إبراهيم",price:80,rating:4.5,category:"notes",coverColor:"from-purple-400 to-purple-600"},{id:4,title:"مراجعة نهائية كيمياء 2026",author:"أ. خالد صقر",price:150,rating:4.9,category:"revision",coverColor:"from-rose-400 to-rose-600"},{id:5,title:"المراجعة النهائية عربي",author:"أ. محمد صلاح",price:140,rating:4.8,category:"revision",coverColor:"from-amber-400 to-amber-600"},{id:6,title:"بنك الأسئلة التفاعلي",author:"أ. محمود جلال",price:200,rating:4.6,category:"interactive",coverColor:"from-cyan-400 to-cyan-600"},{id:7,title:"الامتحان في الفيزياء",author:"أ. مينا مجدي",price:180,rating:4.4,category:"external",coverColor:"from-indigo-400 to-indigo-600"},{id:8,title:"مذكرة شرح الجيولوجيا",author:"أ. هاني جمعة",price:75,rating:4.3,category:"notes",coverColor:"from-green-400 to-green-600"},{id:9,title:"مراجعة ليلة الامتحان",author:"أ. مراد العليمي",price:120,rating:4.7,category:"revision",coverColor:"from-orange-400 to-orange-600"},{id:10,title:"التفوق في الإنجليزي",author:"أ. محمد فريد",price:190,rating:4.5,category:"external",coverColor:"from-pink-400 to-pink-600"},{id:11,title:"موسوعة العلوم المتكاملة",author:"د. محمود الجنايني",price:260,rating:4.6,category:"interactive",coverColor:"from-teal-400 to-teal-600"},{id:12,title:"إجابات النماذج الاسترشادية",author:"أ. أحمد خالد",price:95,rating:4.4,category:"notes",coverColor:"from-sky-400 to-sky-600"}],p=[{id:"all",label:"الكل"},{id:"external",label:"كتب خارجية"},{id:"notes",label:"مذكرات"},{id:"revision",label:"مراجعات"},{id:"interactive",label:"كتب تفاعلية"}],m=[{id:"p1",title:"المرجع الشامل في الكيمياء",date:"2026-07-10",price:250},{id:"p2",title:"مراجعة نهائية عربي",date:"2026-07-05",price:140},{id:"p3",title:"مذكرة الرياضيات البحتة",date:"2026-06-28",price:80}],u={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.05}}},x={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.35}}};e.s(["default",0,function(){let[e,f]=(0,r.useState)("all"),[h,b]=(0,r.useState)(""),[g,y]=(0,r.useState)("latest"),[v,j]=(0,r.useState)([]),[N,w]=(0,r.useState)(!1),C=(0,r.useMemo)(()=>{let t="all"===e?d:d.filter(t=>t.category===e);if(h.trim()){let e=h.toLowerCase();t=t.filter(t=>t.title.includes(e)||t.author.includes(e))}return"cheapest"===g?[...t].sort((e,t)=>e.price-t.price):"top"===g?[...t].sort((e,t)=>t.rating-e.rating):[...t].sort((e,t)=>t.id-e.id)},[e,h,g]),k=v.reduce((e,t)=>e+t.price,0);return(0,t.jsxs)("div",{className:"min-h-screen",children:[(0,t.jsx)(n.default,{title:"مكتبة الكتب",subtitle:"تسوق الكتب والمذكرات والمراجعات"}),(0,t.jsxs)("div",{className:"p-6 md:p-8 max-w-6xl mx-auto space-y-6",children:[(0,t.jsxs)(a.motion.div,{variants:u,initial:"hidden",animate:"visible",className:"space-y-4",children:[(0,t.jsxs)(a.motion.div,{variants:x,className:"flex items-center justify-between gap-4 flex-wrap",children:[(0,t.jsx)("div",{className:"flex gap-2 flex-wrap",children:p.map(r=>(0,t.jsx)("button",{type:"button",onClick:()=>f(r.id),className:`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${e===r.id?"border-primary bg-primary/10 text-primary":"border-border text-text-secondary hover:bg-surface-secondary"}`,children:r.label},r.id))}),(0,t.jsxs)("button",{type:"button",onClick:()=>w(!0),className:"relative inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-text hover:bg-surface-secondary transition-all",children:[(0,t.jsx)(s.HiOutlineShoppingCart,{className:"w-5 h-5"}),(0,t.jsx)("span",{children:"السلة"}),v.length>0&&(0,t.jsx)("span",{className:"absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center",children:v.length})]})]}),(0,t.jsxs)(a.motion.div,{variants:x,className:"flex items-center gap-3 flex-wrap",children:[(0,t.jsxs)("div",{className:"relative flex-1 min-w-[200px] max-w-sm",children:[(0,t.jsx)(s.HiOutlineSearch,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary"}),(0,t.jsx)("input",{type:"text",value:h,onChange:e=>b(e.target.value),placeholder:"ابحث عن كتاب أو مؤلف...",className:"w-full bg-surface border border-border rounded-lg pr-9 pl-3 py-2 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 text-xs text-text-tertiary",children:[(0,t.jsx)(s.HiOutlineFilter,{className:"w-4 h-4"}),(0,t.jsx)("span",{children:"ترتيب:"}),["latest","cheapest","top"].map(e=>(0,t.jsx)("button",{type:"button",onClick:()=>y(e),className:`px-2 py-1 rounded-md border text-[11px] transition-all ${g===e?"border-primary bg-primary/10 text-primary":"border-border text-text-tertiary hover:bg-surface-secondary"}`,children:"latest"===e?"الأحدث":"cheapest"===e?"الأقل سعراً":"الأعلى تقييماً"},e))]})]}),(0,t.jsx)(a.motion.div,{variants:u,initial:"hidden",animate:"visible",className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",children:C.map(e=>{var r;let i,n;return(0,t.jsx)(a.motion.div,{variants:x,children:(0,t.jsxs)(l.Card,{className:"overflow-hidden group h-full flex flex-col",children:[(0,t.jsxs)("div",{className:`h-32 bg-gradient-to-br ${e.coverColor} flex items-center justify-center relative`,children:[(0,t.jsx)(s.HiOutlineBookOpen,{className:"w-12 h-12 text-white/60"}),(0,t.jsx)(c.Badge,{variant:"neutral",size:"sm",className:"absolute top-2 right-2 bg-white/20 text-white border-0",children:p.find(t=>t.id===e.category)?.label})]}),(0,t.jsxs)(l.CardContent,{className:"flex-1 flex flex-col gap-2 p-5",children:[(0,t.jsx)("h3",{className:"text-sm font-bold text-text leading-snug",children:e.title}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.author}),(i=Math.floor(r=e.rating),n=r-i>=.5,(0,t.jsxs)("div",{className:"flex items-center gap-0.5",children:[Array.from({length:5}).map((e,r)=>(0,t.jsx)(s.HiOutlineStar,{className:`w-3.5 h-3.5 ${r<i?"text-amber-400 fill-amber-400":n&&r===i?"text-amber-400":"text-text-tertiary"}`},r)),(0,t.jsx)("span",{className:"text-[10px] text-text-tertiary mr-1",children:r})]})),(0,t.jsxs)("div",{className:"flex items-center justify-between mt-auto pt-2",children:[(0,t.jsxs)("span",{className:"text-sm font-bold text-primary",children:[e.price," ج.م"]}),(0,t.jsx)("button",{type:"button",onClick:()=>{v.find(t=>t.id===e.id)?o.default.error("الكتاب موجود بالفعل في السلة"):(j(t=>[...t,e]),o.default.success("تمت الإضافة إلى السلة"))},className:`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${v.find(t=>t.id===e.id)?"bg-success/10 text-success border border-success/30":"bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white"}`,children:v.find(t=>t.id===e.id)?"تمت الإضافة ✓":"أضف إلى السلة"})]})]})]})},e.id)})}),0===C.length&&(0,t.jsxs)("div",{className:"text-center py-16 text-text-tertiary",children:[(0,t.jsx)(s.HiOutlineBookOpen,{className:"w-16 h-16 mx-auto mb-3 opacity-30"}),(0,t.jsx)("p",{className:"text-sm",children:"لا توجد كتب تطابق بحثك"})]}),(0,t.jsx)(a.motion.div,{variants:x,children:(0,t.jsxs)(l.Card,{children:[(0,t.jsx)(l.CardHeader,{children:(0,t.jsx)(l.CardTitle,{children:"المشتريات السابقة"})}),(0,t.jsx)(l.CardContent,{children:(0,t.jsx)("div",{className:"space-y-3",children:m.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-4 rounded-xl bg-surface-secondary",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.title}),(0,t.jsx)("p",{className:"text-xs text-text-tertiary",children:e.date})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("span",{className:"text-sm text-primary font-bold",children:[e.price," ج.م"]}),(0,t.jsxs)("button",{type:"button",className:"flex items-center gap-1 text-xs text-primary hover:underline",children:[(0,t.jsx)(s.HiOutlineDownload,{className:"w-3.5 h-3.5"})," تحميل"]})]})]},e.id))})})]})})]}),(0,t.jsx)(i.AnimatePresence,{children:N&&(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-50 bg-black/40",onClick:()=>w(!1),children:(0,t.jsxs)(a.motion.div,{initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"spring",damping:25,stiffness:200},className:"absolute left-0 top-0 h-full w-full max-w-md bg-surface border-l border-border shadow-2xl",onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between p-4 border-b border-border",children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-text",children:"سلة المشتريات"}),(0,t.jsx)("button",{type:"button",onClick:()=>w(!1),className:"p-1.5 rounded-lg hover:bg-surface-secondary transition-colors",children:(0,t.jsx)(s.HiOutlineX,{className:"w-5 h-5 text-text-tertiary"})})]}),(0,t.jsx)("div",{className:"p-4 space-y-3 overflow-y-auto flex-1",style:{maxHeight:"calc(100% - 190px)"},children:0===v.length?(0,t.jsxs)("div",{className:"text-center py-16 text-text-tertiary",children:[(0,t.jsx)(s.HiOutlineShoppingCart,{className:"w-16 h-16 mx-auto mb-3 opacity-30"}),(0,t.jsx)("p",{className:"text-sm",children:"السلة فارغة"})]}):v.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between p-3 rounded-xl bg-surface-secondary",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:`w-10 h-10 rounded-lg bg-gradient-to-br ${e.coverColor} flex items-center justify-center`,children:(0,t.jsx)(s.HiOutlineBookOpen,{className:"w-5 h-5 text-white/70"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-text",children:e.title}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:[e.price," ج.م"]})]})]}),(0,t.jsx)("button",{type:"button",onClick:()=>{var t;return t=e.id,void(j(e=>e.filter(e=>e.id!==t)),o.default.success("تمت الإزالة من السلة"))},className:"text-xs text-error hover:underline",children:"إزالة"})]},e.id))}),v.length>0&&(0,t.jsxs)("div",{className:"absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-surface",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,t.jsx)("span",{className:"text-sm text-text-tertiary",children:"المجموع"}),(0,t.jsxs)("span",{className:"text-lg font-bold text-primary",children:[k," ج.م"]})]}),(0,t.jsxs)("button",{type:"button",onClick:()=>{0===v.length?o.default.error("السلة فارغة"):(o.default.success("تم إتمام الشراء بنجاح! سيتم التواصل معك للتوصيل."),j([]),w(!1))},className:"w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all",children:[(0,t.jsx)(s.HiOutlineCreditCard,{className:"w-5 h-5"}),"إتمام الشراء"]})]})]})})})]})]})}])}]);