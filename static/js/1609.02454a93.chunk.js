"use strict";(self.webpackChunknhia_client=self.webpackChunknhia_client||[]).push([[1609],{12341:function(e,n,r){r.r(n),r.d(n,{default:function(){return y}});var t=r(74165),o=r(15861),i=r(29439),s=r(29019),a=r(64554),u=r(20890),c=r(72791),l=r(57689),f=r(11087),d=r(8961),h=r(30459),p=r(1012),x=r(78983),Z=r(1780),m=r(80184),v={position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:"40%",margin:0,bgcolor:"background.paper",border:"1px solid #000",boxShadow:2,p:4};function y(){var e=c.useState(!1),n=(0,i.Z)(e,2),r=n[0],y=n[1],b=c.useState(""),g=(0,i.Z)(b,2),j=g[0],w=g[1],C=c.useState(null),P=(0,i.Z)(C,2),k=P[0],N=P[1],A=((0,l.s0)(),c.useContext(p.V).currentUser);c.useEffect((function(){y(!0)}));var U=function(){var e=(0,o.Z)((0,t.Z)().mark((function e(n){var r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new FormData).append("file",k),e.next=4,d.Z.post("/uploadfile",r).then(function(){var e=(0,o.Z)((0,t.Z)().mark((function e(n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.Z.put("/upload/".concat(null===A||void 0===A?void 0:A.id,"/change"),{imgurl:n.data.filename}).then((function(e){(0,h.Z)("File uploaded successfully","success")})).catch((function(e){(0,h.Z)("Unable to upload file ...: "+e,"error")}));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).catch((function(e){(0,h.Z)("Unable to upload file ...","error")}));case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,m.jsx)(s.Z,{open:r,"aria-labelledby":"modal-modal-title","aria-descriptionby":"modal-modal-description",children:(0,m.jsx)(a.Z,{sx:v,children:(0,m.jsx)(x.b7,{xs:12,style:{fontSize:"12px"},children:(0,m.jsxs)(x.xH,{className:"mb-12",children:[(0,m.jsx)(x.bn,{style:{backgroundColor:"skyblue"},children:(0,m.jsx)("strong",{style:{color:"white"},children:"CHANGE PROFILE PICTURE"})}),(0,m.jsx)(x.sl,{children:(0,m.jsx)(Z.q3,{add:"Upload Profile picture",children:(0,m.jsxs)(u.Z,{className:"changePassport",id:"modal-modal-description",sx:{mt:2},children:[(0,m.jsx)("div",{style:{textAlign:"right"},children:(0,m.jsx)("img",{height:100,width:100,src:j})}),(0,m.jsx)(x.rb,{children:(0,m.jsxs)(x.b7,{xs:!0,children:[(0,m.jsx)("label",{children:"Passport"}),(0,m.jsx)(x.jO,{type:"file",name:"file",onChange:function(e){N(e.target.files[0]),w(URL.createObjectURL(e.target.files[0]))}})]})}),(0,m.jsx)(x.rb,{children:(0,m.jsxs)(x.b7,{xs:!0,children:[(0,m.jsx)("br",{}),(0,m.jsx)(x.u5,{onClick:U,children:"Upload"}),(0,m.jsx)("div",{style:{textAlign:"right"},children:(0,m.jsx)(f.rU,{style:{textDecoration:"none",color:"red"},to:"/",children:"Close"})})]})})]})})})]})})})})}},64554:function(e,n,r){r.d(n,{Z:function(){return v}});var t=r(87462),o=r(63366),i=r(72791),s=r(30831),a=r(22421),u=r(60104),c=r(78519),l=r(33459),f=r(80184),d=["className","component"];var h=r(55902),p=r(67107),x=r(988),Z=(0,p.Z)(),m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.themeId,r=e.defaultTheme,h=e.defaultClassName,p=void 0===h?"MuiBox-root":h,x=e.generateClassName,Z=(0,a.ZP)("div",{shouldForwardProp:function(e){return"theme"!==e&&"sx"!==e&&"as"!==e}})(u.Z);return i.forwardRef((function(e,i){var a=(0,l.Z)(r),u=(0,c.Z)(e),h=u.className,m=u.component,v=void 0===m?"div":m,y=(0,o.Z)(u,d);return(0,f.jsx)(Z,(0,t.Z)({as:v,ref:i,className:(0,s.Z)(h,x?x(p):p),theme:n&&a[n]||a},y))}))}({themeId:x.Z,defaultTheme:Z,defaultClassName:"MuiBox-root",generateClassName:h.Z.generate}),v=m},13967:function(e,n,r){r.d(n,{Z:function(){return s}});r(72791);var t=r(33459),o=r(36482),i=r(988);function s(){var e=(0,t.Z)(o.Z);return e[i.Z]||e}},78519:function(e,n,r){r.d(n,{Z:function(){return l}});var t=r(93433),o=r(87462),i=r(63366),s=r(82466),a=r(87416),u=["sx"],c=function(e){var n,r,t={systemProps:{},otherProps:{}},o=null!=(n=null==e||null==(r=e.theme)?void 0:r.unstable_sxConfig)?n:a.Z;return Object.keys(e).forEach((function(n){o[n]?t.systemProps[n]=e[n]:t.otherProps[n]=e[n]})),t};function l(e){var n,r=e.sx,a=(0,i.Z)(e,u),l=c(a),f=l.systemProps,d=l.otherProps;return n=Array.isArray(r)?[f].concat((0,t.Z)(r)):"function"===typeof r?function(){var e=r.apply(void 0,arguments);return(0,s.P)(e)?(0,o.Z)({},f,e):f}:(0,o.Z)({},f,r),(0,o.Z)({},d,{sx:n})}},78949:function(e,n,r){function t(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return n.reduce((function(e,n){return null==n?e:function(){for(var r=arguments.length,t=new Array(r),o=0;o<r;o++)t[o]=arguments[o];e.apply(this,t),n.apply(this,t)}}),(function(){}))}r.d(n,{Z:function(){return t}})},84913:function(e,n,r){function t(e){return e&&e.ownerDocument||document}r.d(n,{Z:function(){return t}})},55300:function(e,n,r){r.d(n,{Z:function(){return o}});var t=r(84913);function o(e){return(0,t.Z)(e).defaultView||window}},30831:function(e,n,r){function t(e){var n,r,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(r=t(e[n]))&&(o&&(o+=" "),o+=r);else for(n in e)e[n]&&(o&&(o+=" "),o+=n);return o}n.Z=function(){for(var e,n,r=0,o="";r<arguments.length;)(e=arguments[r++])&&(n=t(e))&&(o&&(o+=" "),o+=n);return o}}}]);
//# sourceMappingURL=1609.02454a93.chunk.js.map