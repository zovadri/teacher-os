(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,37757,e=>{"use strict";var t=e.i(43476),a=e.i(75157);e.s(["PageHeader",0,function({title:e,description:s,children:r,className:i,gradient:o=!1}){return(0,t.jsxs)("div",{className:(0,a.cn)("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",i),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:(0,a.cn)("text-2xl font-bold",o?"bg-gradient-to-l from-primary to-info bg-clip-text text-transparent":"text-text"),children:e}),s&&(0,t.jsx)("p",{className:"text-sm text-text-secondary mt-1",children:s})]}),r&&(0,t.jsx)("div",{className:"flex items-center gap-3 shrink-0",children:r})]})}])},5766,e=>{"use strict";let t,a;var s,r=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let a="",s="",r="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+o+";":s+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=d.p?d.p(i,o):i+":"+o+";")}return a+(t&&r?t+"{"+r+"}":r)+s},c={},m=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+m(e[a]);return t}return e};function p(e){let t,a,s=this||{},r=e.call?e(s.p):e;return((e,t,a,s,r)=>{var i;let p=m(e),u=c[p]||(c[p]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(p));if(!c[u]){let t=p!==e?e:(e=>{let t,a,s=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(a=t[3].replace(n," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(n," ").trim();return s[0]})(e);c[u]=d(r?{["@keyframes "+u]:t}:t,a?"":"."+u)}let x=a&&c.g;return a&&(c.g=c[u]),i=c[u],x?t.data=t.data.replace(x,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),u})(r.unshift?r.raw?(t=[].slice.call(arguments,1),a=s.p,r.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):r.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):r,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}p.bind({g:1});let u,x,f,b=p.bind({k:1});function g(e,t){let a=this||{};return function(){let s=arguments;function r(i,o){let l=Object.assign({},i),n=l.className||r.className;a.p=Object.assign({theme:x&&x()},l),a.o=/go\d/.test(n),l.className=p.apply(a,s)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),f&&d[0]&&f(l),u(d,l)}return t?t(r):r}}var h=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},j="default",N=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},E=(e,t=j)=>{C[t]=N(C[t]||k,e),w.forEach(([e,a])=>{e===t&&a(C[t])})},$=e=>Object.keys(C).forEach(t=>E(e,t)),D=(e=j)=>t=>{E(t,e)},H={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,a)=>{let s,r=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||y()}))(t,e,a);return D(r.toasterId||(s=r.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===s))))({type:2,toast:r}),r.id},P=(e,t)=>O("blank")(e,t);P.error=O("error"),P.success=O("success"),P.loading=O("loading"),P.custom=O("custom"),P.dismiss=(e,t)=>{let a={type:3,toastId:e};t?D(t)(a):$(a)},P.dismissAll=e=>P.dismiss(void 0,e),P.remove=(e,t)=>{let a={type:4,toastId:e};t?D(t)(a):$(a)},P.removeAll=e=>P.remove(void 0,e),P.promise=(e,t,a)=>{let s=P.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?h(t.success,e):void 0;return r?P.success(r,{id:s,...a,...null==a?void 0:a.success}):P.dismiss(s),e}).catch(e=>{let r=t.error?h(t.error,e):void 0;r?P.error(r,{id:s,...a,...null==a?void 0:a.error}):P.dismiss(s)}),e};var A=1e3,S=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,T=b`
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
}`,z=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${S} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,_=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=b`
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
}`,L=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${_} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,R=g("div")`
  position: absolute;
`,B=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Y=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?r.createElement(q,null,t):t:"blank"===a?null:r.createElement(B,null,r.createElement(U,{...s}),"loading"!==a&&r.createElement(R,null,"error"===a?r.createElement(z,{...s}):r.createElement(L,{...s})))},Z=g("div")`
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
`,G=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,J=r.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[s,r]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=r.createElement(Y,{toast:e}),l=r.createElement(G,{...e.ariaProps},h(e.message,e));return r.createElement(Z,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof s?s({icon:o,message:l}):r.createElement(r.Fragment,null,o,l))});s=r.createElement,d.p=void 0,u=s,x=void 0,f=void 0;var Q=({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let o=r.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return r.createElement("div",{ref:o,className:t,style:a},i)},V=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,toasterId:o,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:a,pausedAt:s}=((e={},t=j)=>{let[a,s]=(0,r.useState)(C[t]||k),i=(0,r.useRef)(C[t]);(0,r.useEffect)(()=>(i.current!==C[t]&&s(C[t]),w.push([t,s]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let o=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||H[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:o}})(e,t),i=(0,r.useRef)(new Map).current,o=(0,r.useCallback)((e,t=A)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,a)},[]);(0,r.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&P.dismiss(a.id);return}return setTimeout(()=>P.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let l=(0,r.useCallback)(D(t),[t]),n=(0,r.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,r.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,r.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),m=(0,r.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},o=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<l&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,r.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,o]),{toasts:a,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:m}}})(a,o);return r.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let o,l,n=a.position||t,d=c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}),m=(o=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...l});return r.createElement(Q,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?V:"",style:m},"custom"===a.type?h(a.message,a):i?i(a):r.createElement(J,{toast:a,position:n}))}))},"default",0,P,"toast",0,P],5766)},75055,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(46932),r=e.i(50719),i=e.i(37757),o=e.i(5766);let l=[{id:"s1",name:"أحمد محمود",grade:"الثالث الثانوي",attendance:22,totalClasses:25,gpa:88.5,rank:5,totalStudents:120,strengths:["الكيمياء - الباب الأول","الفيزياء - الكهربية","الرياضيات - التفاضل"],weaknesses:["العربي - النحو","الإنجليزي - Reading"],teacherNotes:"طالب مجتهد ويحتاج تركيز أكثر على اللغة العربية.",lastUpdated:"2026-07-18"},{id:"s2",name:"مريم حسن",grade:"الثالث الثانوي",attendance:24,totalClasses:25,gpa:94.2,rank:1,totalStudents:120,strengths:["جميع المواد - تفوق ملحوظ","الرياضيات - التكامل","الكيمياء - التحليل"],weaknesses:[],teacherNotes:"طالبة متفوقة جداً. يرجى الاستمرار بنفس المستوى.",lastUpdated:"2026-07-17"},{id:"s3",name:"خالد علي",grade:"الثاني الثانوي",attendance:18,totalClasses:25,gpa:65.3,rank:78,totalStudents:120,strengths:["الفيزياء - الميكانيكا"],weaknesses:["الكيمياء - الاتزان","الرياضيات - التفاضل","العربي - البلاغة"],teacherNotes:"الطالب يحتاج متابعة مستمرة في المنزل. الحضور غير منتظم.",lastUpdated:"2026-07-18"}];e.s(["default",0,function(){let[e,n]=(0,a.useState)(null),[d,c]=(0,a.useState)(!1);return(0,t.jsxs)("div",{className:"min-h-screen bg-gradient-to-b from-surface to-surface-secondary",children:[(0,t.jsx)(DashboardHeader,{}),(0,t.jsxs)("div",{className:"p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6",children:[(0,t.jsx)(i.PageHeader,{title:"تقارير أولياء الأمور",description:"إنشاء وإرسال تقارير أداء الطلاب لأولياء الأمور",breadcrumbs:[{label:"التقارير",href:"/teacher/reports"},{label:"تقارير أولياء الأمور"}]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("h2",{className:"text-lg font-semibold text-text flex items-center gap-2",children:[(0,t.jsx)(r.HiUser,{className:"w-5 h-5 text-primary"})," الطلاب"]}),l.map((a,r)=>{var i;let o=(i=a.gpa)>=90?{label:"ممتاز",color:"bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"}:i>=80?{label:"جيد جداً",color:"bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"}:i>=70?{label:"جيد",color:"bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"}:i>=60?{label:"مقبول",color:"bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"}:{label:"ضعيف",color:"bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"};return(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.05*r},className:`bg-surface rounded-xl border p-4 cursor-pointer transition-all ${e?.id===a.id?"border-primary shadow-sm":"border-border hover:border-primary/30"}`,onClick:()=>n(a),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsx)("p",{className:"font-semibold text-text",children:a.name}),(0,t.jsx)("span",{className:`px-2 py-0.5 text-[10px] font-medium rounded-full ${o.color}`,children:o.label})]}),(0,t.jsxs)("div",{className:"flex items-center gap-4 text-xs text-text-tertiary",children:[(0,t.jsx)("span",{children:a.grade}),(0,t.jsxs)("span",{children:["حضور: ",a.attendance,"/",a.totalClasses]}),(0,t.jsxs)("span",{children:["المعدل: ",a.gpa,"%"]})]})]},a.id)})]}),e&&(0,t.jsxs)(s.motion.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},className:"bg-surface rounded-2xl border border-border overflow-hidden",children:[(0,t.jsxs)("div",{className:"p-6 border-b border-border",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-text",children:e.name}),(0,t.jsx)("p",{className:"text-sm text-text-secondary",children:e.grade})]}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsxs)("p",{className:"text-3xl font-bold text-primary",children:[e.gpa,"%"]}),(0,t.jsxs)("p",{className:"text-xs text-text-tertiary",children:["الترتيب: ",e.rank," من ",e.totalStudents]})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3 mb-4",children:[(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-xs text-text-tertiary mb-1",children:[(0,t.jsx)(r.HiCheckCircle,{className:"w-3.5 h-3.5 text-emerald-500"})," الحضور"]}),(0,t.jsxs)("p",{className:"text-lg font-bold text-text",children:[e.attendance,"/",e.totalClasses]})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-surface-secondary border border-border",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-xs text-text-tertiary mb-1",children:[(0,t.jsx)(r.HiChartBar,{className:"w-3.5 h-3.5 text-primary"})," نسبة النجاح"]}),(0,t.jsxs)("p",{className:"text-lg font-bold text-text",children:[Math.round(e.attendance/e.totalClasses*100),"%"]})]})]}),e.strengths.length>0&&(0,t.jsxs)("div",{className:"mb-3",children:[(0,t.jsxs)("p",{className:"text-xs font-medium text-emerald-600 mb-2 flex items-center gap-1",children:[(0,t.jsx)(r.HiStar,{className:"w-3.5 h-3.5"})," نقاط القوة"]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1.5",children:e.strengths.map(e=>(0,t.jsx)("span",{className:"px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-medium",children:e},e))})]}),e.weaknesses.length>0&&(0,t.jsxs)("div",{className:"mb-3",children:[(0,t.jsxs)("p",{className:"text-xs font-medium text-red-600 mb-2 flex items-center gap-1",children:[(0,t.jsx)(r.HiExclamationCircle,{className:"w-3.5 h-3.5"})," يحتاج تحسين"]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1.5",children:e.weaknesses.map(e=>(0,t.jsx)("span",{className:"px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-[10px] font-medium",children:e},e))})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50",children:[(0,t.jsx)("p",{className:"text-xs font-medium text-amber-700 dark:text-amber-400 mb-1",children:"ملاحظات المدرس"}),(0,t.jsx)("p",{className:"text-xs text-amber-600 dark:text-amber-300",children:e.teacherNotes})]})]}),(0,t.jsxs)("div",{className:"p-4 flex gap-2",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>{o.toast.success("جاري تحضير التقرير للطباعة")},className:"flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-sm font-medium text-text hover:bg-surface-secondary transition-colors",children:[(0,t.jsx)(r.HiPrinter,{className:"w-4 h-4"})," طباعة"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>{o.toast.success("تم تحميل التقرير")},className:"flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-sm font-medium text-text hover:bg-surface-secondary transition-colors",children:[(0,t.jsx)(r.HiDownload,{className:"w-4 h-4"})," PDF"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>{c(!0),setTimeout(()=>{c(!1),o.toast.success(`تم إرسال التقرير إلى ولي أمر ${e.name}`)},1500)},disabled:d,className:"flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50",children:[(0,t.jsx)(r.HiMail,{className:"w-4 h-4"})," ",d?"جاري الإرسال...":"إرسال لولي الأمر"]})]})]},e.id)]})]})]})}])}]);