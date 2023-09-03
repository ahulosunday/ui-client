"use strict";(self.webpackChunknhia_client=self.webpackChunknhia_client||[]).push([[5815],{67222:function(e,n,t){t.d(n,{Z:function(){return r},g:function(){return s}});var r=1,s=30},55815:function(e,n,t){t.r(n);var r=t(74165),s=t(15861),c=t(29439),i=t(8961),a=t(72791),d=t(57689),l=t(11087),o=t(1012),h=t(67222),u=t(30459),x=t(1582),j=t(57246),f=t(78983),p=t(1780),N=t(80184);n.default=function(){var e=(0,a.useState)([]),n=(0,c.Z)(e,2),t=n[0],T=n[1],E=(0,a.useState)(1),m=(0,c.Z)(E,2),S=m[0],Z=m[1],g=(0,a.useState)([]),v=(0,c.Z)(g,2),A=v[0],D=v[1],w=(0,a.useContext)(o.V),b=w.currentUser,y=w.permissions,k=(0,d.s0)();(0,a.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(n){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.Z.get("/state/".concat(h.Z,"/").concat(h.g,"/0")).then((function(e){T(e.data.res),D(e.data)})).catch((function(e){(0,u.Z)(e,"error")}));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),(0,u.Z)("Error occured while loading data ...","error");case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(n){return e.apply(this,arguments)}}();e(),y.indexOf("VIEW_STATES")>-1||k("/")}),[y,k,b]);var C=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(n,t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),Z(t),e.prev=2,e.next=5,i.Z.get("/state/".concat(S,"/").concat(h.g,"/0")).then((function(e){T(e.data.res),D(e.data)})).catch((function(e){(0,u.Z)(e,"error")}));case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),(0,u.Z)("Internal error !","error");case 10:case"end":return e.stop()}}),e,null,[[2,7]])})));return function(n,t){return e.apply(this,arguments)}}();return(0,N.jsx)(f.rb,{children:(0,N.jsx)(f.b7,{xs:12,children:(0,N.jsxs)(f.xH,{className:"mb-12",children:[(0,N.jsx)(f.bn,{style:{backgroundColor:"skyblue"},children:(0,N.jsx)("strong",{style:{color:"white"},children:"LIST OF STATES"})}),(0,N.jsxs)(f.sl,{children:[(0,N.jsx)("p",{className:"text-medium-emphasis small",children:"Using the Add New button to create new States."}),(0,N.jsxs)(p.q3,{href:"state/add",add:"States List",showAdd:y.indexOf("ADD_STATES")>-1,children:[(0,N.jsxs)(f.Sx,{striped:!0,style:{fontSize:"12px"},align:"middle",responsive:!0,children:[(0,N.jsx)(f.V,{children:(0,N.jsxs)(f.T6,{children:[(0,N.jsx)(f.is,{children:"STATE"}),(0,N.jsx)(f.is,{children:"CODE"}),(0,N.jsx)(f.is,{children:"REGION"}),(0,N.jsx)(f.is,{children:"COUNTRY"}),(0,N.jsx)(f.is,{children:"EDITED"}),(0,N.jsx)(f.is,{children:"CREATED_DATE"}),(0,N.jsx)(f.is,{children:"LAST_UPDATED"}),(0,N.jsx)(f.is,{})]})}),(0,N.jsx)(f.NR,{children:0===t.length?"":t.map((function(e){return(0,N.jsxs)(f.T6,{children:[(0,N.jsx)(f.NN,{children:e.name}),(0,N.jsx)(f.NN,{children:e.code}),(0,N.jsx)(f.NN,{children:e.region.name}),(0,N.jsx)(f.NN,{children:e.country.name}),(0,N.jsx)(f.NN,{children:e.user.surname+" "+e.user.othername}),(0,N.jsx)(f.NN,{children:e.createdAt}),(0,N.jsx)(f.NN,{children:e.updatedAt}),(0,N.jsx)(f.NN,{}),(0,N.jsxs)(f.NN,{children:[(0,N.jsxs)(f.Z0,{children:[y.indexOf("EDIT_STATES")>-1?(0,N.jsx)(f.u5,{color:"secondary",size:"sm",children:(0,N.jsx)(l.rU,{to:"/".concat(0,"/state/"),state:e.id,className:"edit",style:{color:"white",textDecoration:"none"},children:" Edit"})}):"",y.indexOf("DELETE_STATES")>-1?(0,N.jsx)(f.u5,{color:"danger",size:"sm",children:(0,N.jsx)(l.rU,{to:"/delete",state:e.id+"&/state&/state/",className:"delete",style:{color:"white",textDecoration:"none"},children:"Delete"})}):""]})," "]})]},e.id)}))})]}),(0,N.jsxs)("p",{children:[(0,N.jsx)("br",{}),(0,N.jsx)(x.Z,{spacing:2,children:(0,N.jsx)(j.Z,{count:A.totalPages,page:S,onChange:C,variant:"outlined",shape:"rounded",color:"secondary"})})]})]})]})]})})})}}}]);
//# sourceMappingURL=5815.71bee243.chunk.js.map