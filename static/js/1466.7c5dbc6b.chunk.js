"use strict";(self.webpackChunknhia_client=self.webpackChunknhia_client||[]).push([[1466],{67222:function(e,n,r){r.d(n,{Z:function(){return t},g:function(){return s}});var t=1,s=30},31466:function(e,n,r){r.r(n);var t=r(74165),s=r(15861),c=r(29439),i=r(8961),a=r(72791),o=r(57689),d=r(11087),l=r(1012),u=r(67222),h=(r(2323),r(30459)),x=r(1582),f=r(57246),j=r(78983),p=r(1780),g=r(80184);n.default=function(){var e=(0,a.useState)([]),n=(0,c.Z)(e,2),r=n[0],N=n[1],E=(0,a.useContext)(l.V),Z=E.currentUser,m=E.permissions,w=(0,o.s0)(),v=a.useState(1),D=(0,c.Z)(v,2),S=D[0],O=D[1],b=(0,a.useState)([]),y=(0,c.Z)(b,2),T=y[0],k=y[1],I=(0,a.useState)(!1),R=(0,c.Z)(I,2);R[0],R[1];(0,a.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.Z.get("/region/".concat(u.Z,"/").concat(u.g,"/0")).then((function(e){N(e.data.res),k(e.data)})).catch((function(e){(0,h.Z)("Error occured while loading data ..."+e,"error")}));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),(0,h.Z)("Error occured while loading data ...","error");case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(n){return e.apply(this,arguments)}}();e(),m.indexOf("VIEW_REGIONS")>-1||w("/")}),[m,w,Z]);var A=function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n,r){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O(r),e.prev=1,e.next=4,i.Z.get("/region/".concat(S,"/").concat(u.g,"/0")).then((function(e){N(e.data.res),k(e.data)})).catch((function(e){(0,h.Z)("Error occured while loading data ..."+e,"error")}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),(0,h.Z)("Error occured while loading data ...","error");case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(n,r){return e.apply(this,arguments)}}();return(0,g.jsx)(j.rb,{children:(0,g.jsx)(j.b7,{xs:12,children:(0,g.jsxs)(j.xH,{className:"mb-12",children:[(0,g.jsx)(j.bn,{style:{backgroundColor:"skyblue"},children:(0,g.jsx)("strong",{style:{color:"white"},children:"LIST OF REGIONS"})}),(0,g.jsxs)(j.sl,{children:[(0,g.jsx)("p",{className:"text-medium-emphasis small",children:"Using the Add New button to create new regions."}),(0,g.jsxs)(p.q3,{href:"region/add",add:"Regions List",showAdd:m.indexOf("ADD_REGIONS")>-1,children:[(0,g.jsxs)(j.Sx,{striped:!0,style:{fontSize:"12px"},align:"middle",responsive:!0,children:[(0,g.jsx)(j.V,{children:(0,g.jsxs)(j.T6,{children:[(0,g.jsx)(j.is,{children:"REGION"}),(0,g.jsx)(j.is,{children:"COUNTRY"}),(0,g.jsx)(j.is,{children:"EDITEDBY"}),(0,g.jsx)(j.is,{children:"CREATED_DATE"}),(0,g.jsx)(j.is,{children:"LAST_UPDATED"}),(0,g.jsx)(j.is,{})]})}),(0,g.jsx)(j.NR,{children:0===r.length?"":r.map((function(e){return(0,g.jsxs)(j.T6,{children:[(0,g.jsx)(j.NN,{children:e.name}),(0,g.jsx)(j.NN,{children:e.country.name}),(0,g.jsx)(j.NN,{children:e.user.surname+" "+e.user.othername}),(0,g.jsx)(j.NN,{children:e.createdAt}),(0,g.jsx)(j.NN,{children:e.updatedAt}),(0,g.jsx)(j.NN,{children:(0,g.jsxs)(j.Z0,{children:[m.indexOf("EDIT_REGIONS")>-1?(0,g.jsx)(j.u5,{color:"secondary",size:"sm",children:(0,g.jsx)(d.rU,{to:"/".concat(0,"/region/"),state:e.id,className:"edit",style:{color:"white",textDecoration:"none"},children:" Edit"})}):"",m.indexOf("DELETE_REGIONS")>-1?(0,g.jsx)(j.u5,{color:"danger",size:"sm",children:(0,g.jsx)(d.rU,{to:"/delete",state:e.id+"&/region&/region/",className:"delete",style:{color:"white",textDecoration:"none"},children:"Delete"})}):""]})})]},e.id)}))})]}),(0,g.jsx)(x.Z,{spacing:2,children:(0,g.jsx)(f.Z,{count:T.totalPages,page:S,onChange:A,variant:"outlined",shape:"rounded",color:"secondary"})})]})]})]})})})}}}]);
//# sourceMappingURL=1466.7c5dbc6b.chunk.js.map