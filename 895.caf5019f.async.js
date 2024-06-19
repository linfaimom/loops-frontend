"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[895],{83832:function(ee,M,e){e.d(M,{S:function(){return $}});var t=e(1413),P=e(45987),D=e(75081),Z=e(67294),I=e(85893),W=["isLoading","pastDelay","timedOut","error","retry"],$=function(y){var V=y.isLoading,m=y.pastDelay,n=y.timedOut,i=y.error,r=y.retry,d=(0,P.Z)(y,W);return(0,I.jsx)("div",{style:{paddingBlockStart:100,textAlign:"center"},children:(0,I.jsx)(D.Z,(0,t.Z)({size:"large"},d))})}},76509:function(ee,M,e){e.d(M,{X:function(){return P}});var t=e(67294),P=(0,t.createContext)({})},81643:function(ee,M,e){e.d(M,{Z:function(){return t}});const t=P=>P?typeof P=="function"?P():P:null},7134:function(ee,M,e){e.d(M,{C:function(){return de}});var t=e(67294),P=e(93967),D=e.n(P),Z=e(9220),I=e(42550),W=e(74443),$=e(53124),j=e(35792),y=e(98675),V=e(25378),n=t.createContext({}),i=e(6731),r=e(14747),d=e(91945),u=e(45503);const l=o=>{const{antCls:c,componentCls:v,iconCls:s,avatarBg:p,avatarColor:K,containerSize:R,containerSizeLG:x,containerSizeSM:b,textFontSize:S,textFontSizeLG:L,textFontSizeSM:k,borderRadius:g,borderRadiusLG:h,borderRadiusSM:B,lineWidth:q,lineType:te}=o,X=(Q,N,ne)=>({width:Q,height:Q,borderRadius:"50%",[`&${v}-square`]:{borderRadius:ne},[`&${v}-icon`]:{fontSize:N,[`> ${s}`]:{margin:0}}});return{[v]:Object.assign(Object.assign(Object.assign(Object.assign({},(0,r.Wf)(o)),{position:"relative",display:"inline-flex",justifyContent:"center",alignItems:"center",overflow:"hidden",color:K,whiteSpace:"nowrap",textAlign:"center",verticalAlign:"middle",background:p,border:`${(0,i.bf)(q)} ${te} transparent`,"&-image":{background:"transparent"},[`${c}-image-img`]:{display:"block"}}),X(R,S,g)),{"&-lg":Object.assign({},X(x,L,h)),"&-sm":Object.assign({},X(b,k,B)),"> img":{display:"block",width:"100%",height:"100%",objectFit:"cover"}})}},E=o=>{const{componentCls:c,groupBorderColor:v,groupOverlapping:s,groupSpace:p}=o;return{[`${c}-group`]:{display:"inline-flex",[`${c}`]:{borderColor:v},"> *:not(:first-child)":{marginInlineStart:s}},[`${c}-group-popover`]:{[`${c} + ${c}`]:{marginInlineStart:p}}}},f=o=>{const{controlHeight:c,controlHeightLG:v,controlHeightSM:s,fontSize:p,fontSizeLG:K,fontSizeXL:R,fontSizeHeading3:x,marginXS:b,marginXXS:S,colorBorderBg:L}=o;return{containerSize:c,containerSizeLG:v,containerSizeSM:s,textFontSize:Math.round((K+R)/2),textFontSizeLG:x,textFontSizeSM:p,groupSpace:S,groupOverlapping:-b,groupBorderColor:L}};var a=(0,d.I$)("Avatar",o=>{const{colorTextLightSolid:c,colorTextPlaceholder:v}=o,s=(0,u.TS)(o,{avatarBg:v,avatarColor:c});return[l(s),E(s)]},f),_=function(o,c){var v={};for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&c.indexOf(s)<0&&(v[s]=o[s]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var p=0,s=Object.getOwnPropertySymbols(o);p<s.length;p++)c.indexOf(s[p])<0&&Object.prototype.propertyIsEnumerable.call(o,s[p])&&(v[s[p]]=o[s[p]]);return v};const G=(o,c)=>{const[v,s]=t.useState(1),[p,K]=t.useState(!1),[R,x]=t.useState(!0),b=t.useRef(null),S=t.useRef(null),L=(0,I.sQ)(c,b),{getPrefixCls:k,avatar:g}=t.useContext($.E_),h=t.useContext(n),B=()=>{if(!S.current||!b.current)return;const O=S.current.offsetWidth,C=b.current.offsetWidth;if(O!==0&&C!==0){const{gap:U=4}=o;U*2<C&&s(C-U*2<O?(C-U*2)/O:1)}};t.useEffect(()=>{K(!0)},[]),t.useEffect(()=>{x(!0),s(1)},[o.src]),t.useEffect(B,[o.gap]);const q=()=>{const{onError:O}=o;(O==null?void 0:O())!==!1&&x(!1)},{prefixCls:te,shape:X,size:Q,src:N,srcSet:ne,icon:z,className:se,rootClassName:oe,alt:le,draggable:Ee,children:ve,crossOrigin:Oe}=o,ue=_(o,["prefixCls","shape","size","src","srcSet","icon","className","rootClassName","alt","draggable","children","crossOrigin"]),T=(0,y.Z)(O=>{var C,U;return(U=(C=Q!=null?Q:h==null?void 0:h.size)!==null&&C!==void 0?C:O)!==null&&U!==void 0?U:"default"}),Ce=Object.keys(typeof T=="object"?T||{}:{}).some(O=>["xs","sm","md","lg","xl","xxl"].includes(O)),me=(0,V.Z)(Ce),Pe=t.useMemo(()=>{if(typeof T!="object")return{};const O=W.c4.find(U=>me[U]),C=T[O];return C?{width:C,height:C,fontSize:C&&(z||ve)?C/2:18}:{}},[me,T]),A=k("avatar",te),fe=(0,j.Z)(A),[he,ye,_e]=a(A,fe),xe=D()({[`${A}-lg`]:T==="large",[`${A}-sm`]:T==="small"}),pe=t.isValidElement(N),Se=X||(h==null?void 0:h.shape)||"circle",Me=D()(A,xe,g==null?void 0:g.className,`${A}-${Se}`,{[`${A}-image`]:pe||N&&R,[`${A}-icon`]:!!z},_e,fe,se,oe,ye),De=typeof T=="number"?{width:T,height:T,fontSize:z?T/2:18}:{};let re;if(typeof N=="string"&&R)re=t.createElement("img",{src:N,draggable:Ee,srcSet:ne,onError:q,alt:le,crossOrigin:Oe});else if(pe)re=N;else if(z)re=z;else if(p||v!==1){const O=`scale(${v})`,C={msTransform:O,WebkitTransform:O,transform:O};re=t.createElement(Z.Z,{onResize:B},t.createElement("span",{className:`${A}-string`,ref:S,style:Object.assign({},C)},ve))}else re=t.createElement("span",{className:`${A}-string`,style:{opacity:0},ref:S},ve);return delete ue.onError,delete ue.gap,he(t.createElement("span",Object.assign({},ue,{style:Object.assign(Object.assign(Object.assign(Object.assign({},De),Pe),g==null?void 0:g.style),ue.style),className:Me,ref:L}),re))};var H=t.forwardRef(G),Y=e(50344),w=e(96159),J=e(55241);const ie=o=>{const{size:c,shape:v}=t.useContext(n),s=t.useMemo(()=>({size:o.size||c,shape:o.shape||v}),[o.size,o.shape,c,v]);return t.createElement(n.Provider,{value:s},o.children)};var ae=o=>{const{getPrefixCls:c,direction:v}=t.useContext($.E_),{prefixCls:s,className:p,rootClassName:K,style:R,maxCount:x,maxStyle:b,size:S,shape:L,maxPopoverPlacement:k="top",maxPopoverTrigger:g="hover",children:h}=o,B=c("avatar",s),q=`${B}-group`,te=(0,j.Z)(B),[X,Q,N]=a(B,te),ne=D()(q,{[`${q}-rtl`]:v==="rtl"},N,te,p,K,Q),z=(0,Y.Z)(h).map((oe,le)=>(0,w.Tm)(oe,{key:`avatar-key-${le}`})),se=z.length;if(x&&x<se){const oe=z.slice(0,x),le=z.slice(x,se);return oe.push(t.createElement(J.Z,{key:"avatar-popover-key",content:le,trigger:g,placement:k,overlayClassName:`${q}-popover`,destroyTooltipOnHide:!0},t.createElement(H,{style:b},`+${se-x}`))),X(t.createElement(ie,{shape:L,size:S},t.createElement("div",{className:ne,style:R},oe)))}return X(t.createElement(ie,{shape:L,size:S},t.createElement("div",{className:ne,style:R},z)))};const ce=H;ce.Group=ae;var de=ce},66330:function(ee,M,e){var t=e(67294),P=e(93967),D=e.n(P),Z=e(92419),I=e(81643),W=e(53124),$=e(20136),j=function(n,i){var r={};for(var d in n)Object.prototype.hasOwnProperty.call(n,d)&&i.indexOf(d)<0&&(r[d]=n[d]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,d=Object.getOwnPropertySymbols(n);u<d.length;u++)i.indexOf(d[u])<0&&Object.prototype.propertyIsEnumerable.call(n,d[u])&&(r[d[u]]=n[d[u]]);return r};const y=(n,i,r)=>!i&&!r?null:t.createElement(t.Fragment,null,i&&t.createElement("div",{className:`${n}-title`},(0,I.Z)(i)),t.createElement("div",{className:`${n}-inner-content`},(0,I.Z)(r))),V=n=>{const{hashId:i,prefixCls:r,className:d,style:u,placement:l="top",title:E,content:f,children:a}=n;return t.createElement("div",{className:D()(i,r,`${r}-pure`,`${r}-placement-${l}`,d),style:u},t.createElement("div",{className:`${r}-arrow`}),t.createElement(Z.G,Object.assign({},n,{className:i,prefixCls:r}),a||y(r,E,f)))},m=n=>{const{prefixCls:i,className:r}=n,d=j(n,["prefixCls","className"]),{getPrefixCls:u}=t.useContext(W.E_),l=u("popover",i),[E,f,a]=(0,$.Z)(l);return E(t.createElement(V,Object.assign({},d,{prefixCls:l,hashId:f,className:D()(r,a)})))};M.ZP=m},55241:function(ee,M,e){var t=e(67294),P=e(93967),D=e.n(P),Z=e(21770),I=e(15105),W=e(81643),$=e(33603),j=e(96159),y=e(53124),V=e(83062),m=e(66330),n=e(20136),i=function(l,E){var f={};for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&E.indexOf(a)<0&&(f[a]=l[a]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var _=0,a=Object.getOwnPropertySymbols(l);_<a.length;_++)E.indexOf(a[_])<0&&Object.prototype.propertyIsEnumerable.call(l,a[_])&&(f[a[_]]=l[a[_]]);return f};const r=l=>{let{title:E,content:f,prefixCls:a}=l;return t.createElement(t.Fragment,null,E&&t.createElement("div",{className:`${a}-title`},(0,W.Z)(E)),t.createElement("div",{className:`${a}-inner-content`},(0,W.Z)(f)))},u=t.forwardRef((l,E)=>{var f,a;const{prefixCls:_,title:G,content:F,overlayClassName:H,placement:Y="top",trigger:w="hover",children:J,mouseEnterDelay:ie=.1,mouseLeaveDelay:ge=.1,onOpenChange:ae,overlayStyle:ce={}}=l,de=i(l,["prefixCls","title","content","overlayClassName","placement","trigger","children","mouseEnterDelay","mouseLeaveDelay","onOpenChange","overlayStyle"]),{getPrefixCls:o}=t.useContext(y.E_),c=o("popover",_),[v,s,p]=(0,n.Z)(c),K=o(),R=D()(H,s,p),[x,b]=(0,Z.Z)(!1,{value:(f=l.open)!==null&&f!==void 0?f:l.visible,defaultValue:(a=l.defaultOpen)!==null&&a!==void 0?a:l.defaultVisible}),S=(g,h)=>{b(g,!0),ae==null||ae(g,h)},L=g=>{g.keyCode===I.Z.ESC&&S(!1,g)},k=g=>{S(g)};return v(t.createElement(V.Z,Object.assign({placement:Y,trigger:w,mouseEnterDelay:ie,mouseLeaveDelay:ge,overlayStyle:ce},de,{prefixCls:c,overlayClassName:R,ref:E,open:x,onOpenChange:k,overlay:G||F?t.createElement(r,{prefixCls:c,title:G,content:F}):null,transitionName:(0,$.m)(K,"zoom-big",de.transitionName),"data-popover-inject":!0}),(0,j.Tm)(J,{onKeyDown:g=>{var h,B;t.isValidElement(J)&&((B=J==null?void 0:(h=J.props).onKeyDown)===null||B===void 0||B.call(h,g)),L(g)}})))});u._InternalPanelDoNotUseOrYouWillBeFired=m.ZP,M.Z=u},20136:function(ee,M,e){var t=e(14747),P=e(50438),D=e(97414),Z=e(79511),I=e(8796),W=e(91945),$=e(45503);const j=m=>{const{componentCls:n,popoverColor:i,titleMinWidth:r,fontWeightStrong:d,innerPadding:u,boxShadowSecondary:l,colorTextHeading:E,borderRadiusLG:f,zIndexPopup:a,titleMarginBottom:_,colorBgElevated:G,popoverBg:F,titleBorderBottom:H,innerContentPadding:Y,titlePadding:w}=m;return[{[n]:Object.assign(Object.assign({},(0,t.Wf)(m)),{position:"absolute",top:0,left:{_skip_check_:!0,value:0},zIndex:a,fontWeight:"normal",whiteSpace:"normal",textAlign:"start",cursor:"auto",userSelect:"text",transformOrigin:"var(--arrow-x, 50%) var(--arrow-y, 50%)","--antd-arrow-background-color":G,width:"max-content",maxWidth:"100vw","&-rtl":{direction:"rtl"},"&-hidden":{display:"none"},[`${n}-content`]:{position:"relative"},[`${n}-inner`]:{backgroundColor:F,backgroundClip:"padding-box",borderRadius:f,boxShadow:l,padding:u},[`${n}-title`]:{minWidth:r,marginBottom:_,color:E,fontWeight:d,borderBottom:H,padding:w},[`${n}-inner-content`]:{color:i,padding:Y}})},(0,D.ZP)(m,"var(--antd-arrow-background-color)"),{[`${n}-pure`]:{position:"relative",maxWidth:"none",margin:m.sizePopupArrow,display:"inline-block",[`${n}-content`]:{display:"inline-block"}}}]},y=m=>{const{componentCls:n}=m;return{[n]:I.i.map(i=>{const r=m[`${i}6`];return{[`&${n}-${i}`]:{"--antd-arrow-background-color":r,[`${n}-inner`]:{backgroundColor:r},[`${n}-arrow`]:{background:"transparent"}}}})}},V=m=>{const{lineWidth:n,controlHeight:i,fontHeight:r,padding:d,wireframe:u,zIndexPopupBase:l,borderRadiusLG:E,marginXS:f,lineType:a,colorSplit:_,paddingSM:G}=m,F=i-r,H=F/2,Y=F/2-n,w=d;return Object.assign(Object.assign(Object.assign({titleMinWidth:177,zIndexPopup:l+30},(0,Z.w)(m)),(0,D.wZ)({contentRadius:E,limitVerticalRadius:!0})),{innerPadding:u?0:12,titleMarginBottom:u?0:f,titlePadding:u?`${H}px ${w}px ${Y}px`:0,titleBorderBottom:u?`${n}px ${a} ${_}`:"none",innerContentPadding:u?`${G}px ${w}px`:0})};M.Z=(0,W.I$)("Popover",m=>{const{colorBgElevated:n,colorText:i}=m,r=(0,$.TS)(m,{popoverBg:n,popoverColor:i});return[j(r),y(r),(0,P._y)(r,"zoom-big")]},V,{resetStyle:!1,deprecatedTokens:[["width","titleMinWidth"],["minWidth","titleMinWidth"]]})}}]);