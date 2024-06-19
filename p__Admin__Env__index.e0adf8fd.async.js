"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[140],{5966:function($,j,e){var T=e(97685),s=e(1413),D=e(45987),d=e(21770),F=e(8232),f=e(55241),E=e(97435),O=e(67294),i=e(1198),o=e(85893),g=["fieldProps","proFieldProps"],A=["fieldProps","proFieldProps"],v="text",a=function(n){var r=n.fieldProps,_=n.proFieldProps,m=(0,D.Z)(n,g);return(0,o.jsx)(i.Z,(0,s.Z)({valueType:v,fieldProps:r,filedConfig:{valueType:v},proFieldProps:_},m))},p=function(n){var r=(0,d.Z)(n.open||!1,{value:n.open,onChange:n.onOpenChange}),_=(0,T.Z)(r,2),m=_[0],C=_[1];return(0,o.jsx)(F.Z.Item,{shouldUpdate:!0,noStyle:!0,children:function(R){var c,y=R.getFieldValue(n.name||[]);return(0,o.jsx)(f.Z,(0,s.Z)((0,s.Z)({getPopupContainer:function(t){return t&&t.parentNode?t.parentNode:t},onOpenChange:function(t){return C(t)},content:(0,o.jsxs)("div",{style:{padding:"4px 0"},children:[(c=n.statusRender)===null||c===void 0?void 0:c.call(n,y),n.strengthText?(0,o.jsx)("div",{style:{marginTop:10},children:(0,o.jsx)("span",{children:n.strengthText})}):null]}),overlayStyle:{width:240},placement:"rightTop"},n.popoverProps),{},{open:m,children:n.children}))}})},h=function(n){var r=n.fieldProps,_=n.proFieldProps,m=(0,D.Z)(n,A),C=(0,O.useState)(!1),M=(0,T.Z)(C,2),R=M[0],c=M[1];return r!=null&&r.statusRender&&m.name?(0,o.jsx)(p,{name:m.name,statusRender:r==null?void 0:r.statusRender,popoverProps:r==null?void 0:r.popoverProps,strengthText:r==null?void 0:r.strengthText,open:R,onOpenChange:c,children:(0,o.jsx)("div",{children:(0,o.jsx)(i.Z,(0,s.Z)({valueType:"password",fieldProps:(0,s.Z)((0,s.Z)({},(0,E.Z)(r,["statusRender","popoverProps","strengthText"])),{},{onBlur:function(x){var t;r==null||(t=r.onBlur)===null||t===void 0||t.call(r,x),c(!1)},onClick:function(x){var t;r==null||(t=r.onClick)===null||t===void 0||t.call(r,x),c(!0)}}),proFieldProps:_,filedConfig:{valueType:v}},m))})}):(0,o.jsx)(i.Z,(0,s.Z)({valueType:"password",fieldProps:r,proFieldProps:_,filedConfig:{valueType:v}},m))},u=a;u.Password=h,u.displayName="ProFormComponent",j.Z=u},43e3:function($,j,e){e.r(j),e.d(j,{default:function(){return y}});var T=e(97857),s=e.n(T),D=e(15009),d=e.n(D),F=e(99289),f=e.n(F),E=e(5574),O=e.n(E),i=e(612),o=e(51042),g=e(39380),A=e(64040),v=e(184),a=e(5966),p=e(1413),h=e(45987),u=e(67294),l=e(1198),n=e(85893),r=["fieldProps","proFieldProps"],_=function(t,U){var S=t.fieldProps,I=t.proFieldProps,B=(0,h.Z)(t,r);return(0,n.jsx)(l.Z,(0,p.Z)({ref:U,valueType:"textarea",fieldProps:S,proFieldProps:I},B))},m=u.forwardRef(_),C=e(34994),M=e(86738),R=e(14726),c=function(){var t=(0,u.useState)(!1),U=O()(t,2),S=U[0],I=U[1],B=(0,u.useRef)(),G=function(){I(!0)},z=[{title:"\u73AF\u5883 id",dataIndex:"id"},{title:"\u73AF\u5883\u540D",dataIndex:"name"},{title:"\u73AF\u5883\u63CF\u8FF0",dataIndex:"description"},{title:"Agent \u5730\u5740",dataIndex:"agentUrl",copyable:!0},{title:"\u64CD\u4F5C",search:!1,valueType:"option",render:function(b,W,Z){return[(0,n.jsx)(M.Z,{title:"\u5220\u9664\u73AF\u5883\u4FE1\u606F",description:"\u8BF7\u786E\u8BA4\u662F\u5426\u5220\u9664\u8BE5\u73AF\u5883\u4FE1\u606F\uFF1F",onConfirm:f()(d()().mark(function N(){var P;return d()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.next=2,(0,i.iO)({id:W.id});case 2:(P=B.current)===null||P===void 0||P.reload();case 3:case"end":return L.stop()}},N)})),children:(0,n.jsx)("a",{children:"\u5220\u9664"})},Z)]}}];return(0,n.jsxs)(g._z,{children:[(0,n.jsx)(A.Z,{actionRef:B,search:!1,columns:z,request:i.hP,headerTitle:(0,n.jsx)(R.ZP,{type:"primary",onClick:G,icon:(0,n.jsx)(o.Z,{}),children:"\u65B0\u5EFA\u73AF\u5883"})}),(0,n.jsxs)(v.a,{open:S,onOpenChange:I,onFinish:function(){var K=f()(d()().mark(function b(W){var Z;return d()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return console.log(W),P.next=3,(0,i.Dk)(s()({},W));case 3:return(Z=B.current)===null||Z===void 0||Z.reload(),P.abrupt("return",!0);case 5:case"end":return P.stop()}},b)}));return function(b){return K.apply(this,arguments)}}(),title:"\u65B0\u5EFA\u73AF\u5883",children:[(0,n.jsx)(a.Z,{required:!0,name:"name",label:"\u73AF\u5883\u540D\u79F0",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u73AF\u5883\u540D"}]}),(0,n.jsx)(m,{name:"description",label:"\u73AF\u5883\u63CF\u8FF0"}),(0,n.jsx)(a.Z,{required:!0,name:"agentUrl",label:"Agent \u5730\u5740",placeholder:"\u5F62\u5982 https://loops-agent.xxxx.com",rules:[{required:!0,message:"\u8BF7\u8F93\u5165 Agent \u5730\u5740"}]}),(0,n.jsxs)(C.A.Group,{children:[(0,n.jsx)(a.Z,{name:"agentAuthUser",width:"md",label:"Agent \u8BA4\u8BC1\u8D26\u53F7",rules:[{required:!0,message:"\u8BF7\u8F93\u5165 Agent \u8BA4\u8BC1\u8D26\u53F7"}]}),(0,n.jsx)(a.Z.Password,{name:"agentAuthPasswd",width:"md",label:"Agent \u8BA4\u8BC1\u5BC6\u7801",rules:[{required:!0,message:"\u8BF7\u8F93\u5165 Agent \u8BA4\u8BC1\u5BC6\u7801"}]})]})]})]})},y=c},612:function($,j,e){e.d(j,{Dk:function(){return o},hP:function(){return O},iO:function(){return A}});var T=e(15009),s=e.n(T),D=e(97857),d=e.n(D),F=e(99289),f=e.n(F),E=e(80854);function O(a){return i.apply(this,arguments)}function i(){return i=f()(s()().mark(function a(p){return s()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.abrupt("return",(0,E.request)("/api/v1/envs",d()({method:"GET"},p||{})));case 1:case"end":return u.stop()}},a)})),i.apply(this,arguments)}function o(a,p){return g.apply(this,arguments)}function g(){return g=f()(s()().mark(function a(p,h){return s()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.abrupt("return",(0,E.request)("/api/v1/envs",d()({method:"POST",data:d()({},p)},h||{})));case 1:case"end":return l.stop()}},a)})),g.apply(this,arguments)}function A(a,p){return v.apply(this,arguments)}function v(){return v=f()(s()().mark(function a(p,h){return s()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.abrupt("return",(0,E.request)("/api/v1/envs/"+p.id,d()({method:"DELETE"},h||{})));case 1:case"end":return l.stop()}},a)})),v.apply(this,arguments)}}}]);
