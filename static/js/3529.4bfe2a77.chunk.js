"use strict";(self.webpackChunknhia_client=self.webpackChunknhia_client||[]).push([[3529],{67222:function(e,n,r){r.d(n,{Z:function(){return t},g:function(){return s}});var t=1,s=30},3529:function(e,n,r){r.r(n);var t=r(74165),s=r(15861),i=r(29439),c=r(8961),a=r(72791),d=r(1012),o=r(57689),l=r(11087),h=r(1582),u=r(57246),x=r(67222),f=(r(2323),r(30459)),p=r(72426),j=r.n(p),g=r(78983),m=r(1780),Z=r(80184);n.default=function(){var e=(0,a.useState)([]),n=(0,i.Z)(e,2),r=n[0],p=n[1],E=a.useState(1),N=(0,i.Z)(E,2),w=N[0],y=N[1],v=(0,a.useState)([]),P=(0,i.Z)(v,2),S=P[0],b=P[1],I=(0,a.useContext)(d.V),Y=I.currentUser,_=I.permissions,D=(0,o.s0)(),k=(0,a.useState)(!1),A=(0,i.Z)(k,2),T=A[0],M=A[1];(0,a.useEffect)((function(){_.indexOf("ADD_GIFSHIP_TYPE")>-1&&M(!0);var e=function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.Z.get("/gifshipList/".concat(x.Z,"/").concat(x.g)).then((function(e){p(e.data.res),b(e.data)})).catch((function(e){(0,f.Z)("Error occured while trying loading data","error")}));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),(0,f.Z)("Error occured while trying loading data","error");case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(n){return e.apply(this,arguments)}}();e(),_.indexOf("VIEW_GIFSHIP_TYPE")>-1||D("/")}),[_,Y,D]);var O=function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n,r){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(r),e.next=3,c.Z.get("/gifshipList/".concat(w,"/").concat(x.g)).then((function(e){p(e.data.res),b(e.data)})).catch((function(e){(0,f.Z)("Error occured while trying loading data","error")}));case 3:case"end":return e.stop()}}),e)})));return function(n,r){return e.apply(this,arguments)}}();return(0,Z.jsx)(g.rb,{children:(0,Z.jsx)(g.b7,{xs:12,children:(0,Z.jsxs)(g.xH,{className:"mb-12",children:[(0,Z.jsx)(g.bn,{style:{backgroundColor:"skyblue"},children:(0,Z.jsx)("strong",{style:{color:"white"},children:"LIST OF PROGRAMMES"})}),(0,Z.jsxs)(g.sl,{children:[(0,Z.jsx)("p",{className:"text-medium-emphasis small",children:"Using the Add New button to create new Item."}),(0,Z.jsxs)(m.q3,{href:"gifshipt",add:"PROGRAMME",showAdd:T,children:[(0,Z.jsxs)(g.Sx,{striped:!0,style:{fontSize:"12px"},align:"middle",responsive:!0,children:[(0,Z.jsx)(g.V,{children:(0,Z.jsxs)(g.T6,{children:[(0,Z.jsx)(g.is,{children:"Programme"}),(0,Z.jsx)(g.is,{children:"Sub-Programme"}),(0,Z.jsx)(g.is,{children:"Editedby"}),(0,Z.jsx)(g.is,{children:"Created_At"}),(0,Z.jsx)(g.is,{children:"Updated_At"}),(0,Z.jsx)(g.is,{})]})}),(0,Z.jsx)(g.NR,{children:0===r.length?"":r.map((function(e){return(0,Z.jsxs)(g.T6,{children:[(0,Z.jsx)(g.NN,{children:e.gifship.name}),(0,Z.jsx)(g.NN,{children:e.name}),(0,Z.jsx)(g.NN,{children:e.user.surname+" "+e.user.othername}),(0,Z.jsx)(g.NN,{children:j()(e.createdAt).format("YYYY MM DD hh:ss:mm")}),(0,Z.jsx)(g.NN,{children:j()(e.updatedAt).format("YYYY MM DD hh:ss:mm")}),(0,Z.jsxs)(g.NN,{children:[(0,Z.jsxs)(g.Z0,{children:[_.indexOf("EDIT_GIFSHIP_TYPE")>-1?(0,Z.jsx)(g.u5,{color:"secondary",size:"sm",children:(0,Z.jsx)(l.rU,{to:"/gifshipedit/0",state:e.id,style:{color:"white",textDecoration:"none"},children:"Edit"})}):"",_.indexOf("DELETE_GIFSHIP_TYPE")>-1?(0,Z.jsx)(g.u5,{color:"danger",size:"sm",children:(0,Z.jsx)(l.rU,{to:"/delete",state:e.id+"&/gifship-list&/gifshipList/",style:{color:"white",textDecoration:"none"},children:"Delete"})}):""]}),"  "]})]},e.id)}))})]}),(0,Z.jsx)("p",{children:(0,Z.jsx)(h.Z,{spacing:2,children:(0,Z.jsx)(u.Z,{count:S.totalPages,page:w,onChange:O,variant:"outlined",shape:"rounded",color:"secondary"})})})]})]})]})})})}}}]);
//# sourceMappingURL=3529.4bfe2a77.chunk.js.map