import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';



const ViewAssignPermissions = () =>{
  const location = useLocation()
    const [msg, setMsg] = useState('');
     const [perms, setPerms] = useState([{id:'', name:'', description: ''},])
     const [assignedperms, setAssignedPerms] = useState([])
       const [checked, setChecked] = useState([])
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
     const id = location.state//apathname.split("/")[1]
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       description: "", 
       id: "",
    })
      
      useEffect(()=>{
    
    const formData = async e =>{
        try{
         
           const res = await app.get(`/role/${id}`)
           setInputs(res.data)
          }
        catch(err){

        }
    }
     const arrays =[] 
    const rolePermission = async e =>{
        try{
       
           const res = await app.get(`/${id}/role-permissions`)
            res.data.map((item)=>{
               arrays.push(item.permissionId)
            })
       setAssignedPerms(arrays)
          }
        catch(err){

        }
    }
 
    if(!(permissions.indexOf("ADD_ROLES") > -1)){
      navigate('/')
    }
        loadPerm()
         formData()
         rolePermission()
   },[permissions, id, navigate,])
     
        
     
    

     const loadPerm = async e =>{
        const res = await app.get('/permissions')
        setPerms(res.data)

    }
  const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
    }
    const handleUpdate = async e =>{
        try{
            var permlist = document.getElementById('permlist').value;
            var arr = [];
            arr = permlist.split(',')
 
            const obj = arr.map((permissionId, index)=>{
              return Object.assign({
                permissionId,
                roleId: id
              })
            }) 
              
      const p = await app.post(`/role-permissions/`,(obj));
       if(p){
        navigate('/role/list')
       } 
        }
        catch(errs){
setMsg( errs.message + ": Invalid data entry, check the entry and try again")
        }
    }

     const handleCheckAllChange = (e) => {
          setChecked( e.target.checked ? perms.map((c) => c.id) : []);
        };

        const handlePermissionChange = (e, c) => {
          setChecked((prevChecked) => e.target.checked ? [...prevChecked, c.id]: prevChecked.filter((item) => item !== c.id));
        };
   
    return (
       
    <CRow >
         <CCol md={12} xs={12} xl={6} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>EDIT ASSIGNED PERMISSIONS</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="EDIT ASSIGNED PERMISSIONS"> 
        <CRow>
        <CCol xs={12} xl={12}>
       <label htmlFor="name">Role</label> 
       <CFormInput type="text" value={inputs.name} placeholder={inputs.name} readOnly name="name"  onChange={handleChange} />
        </CCol>
        </CRow>

        <CRow>
        <CCol xs={12} xl={12}>
       <label htmlFor="description">Description</label> 
        <CFormInput type="text" placeholder={inputs.description} readOnly value={inputs.description} name="description"  onChange={handleChange} />
       </CCol>
       </CRow>
   <CRow>
   
   <CCol xs={12} xl={12}>
       {permissions.indexOf("EDIT_ROLE") > -1? <button type="button" onClick={handleUpdate}>Update</button> : ''}
         <Goback url='/role/list' />
        
       <span>{msg}</span>
         </CCol></CRow>
         </DocsExample>
         </CCardBody>
         </CCard>
         </CCol>
          <CCol xs={6} style={{fontSize:'12px'}}>
           <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>EDIT ASSIGNED PERMISSIONS</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="EDIT ASSIGNED PERMISSIONS"> 
 <CTable> 
      
       <CTableHead>
       <CTableRow>
        <CTableDataCell><input type='checkbox' id="selectAll"
                checked={checked.length === perms.length}
                onChange={handleCheckAllChange} /></CTableDataCell>
       <CTableDataCell>Name</CTableDataCell>
       <CTableDataCell>Description</CTableDataCell>
      </CTableRow>
      
       </CTableHead>
       <CTableBody>
       
       {
           perms.map((item)=>{
          if(assignedperms.indexOf(item.id) >-1) 
                 return (
           

            <CTableRow>
       <CTableDataCell><a style={{color:'red'}}><AiTwotonePlusCircle /></a><input type="checkbox" id={item.id}
                checked={checked.includes(item.id)}
                  onChange={(e) => handlePermissionChange(e, item)}  
                  value={item.id}
                  name="ck"/></CTableDataCell>     
       <CTableDataCell >{item.name}</CTableDataCell>
       <CTableDataCell>{item.description}</CTableDataCell>
        </CTableRow>
          )

          else    return (
           

            <CTableRow>
       <CTableDataCell><input type="checkbox" id={item.id}
                checked={checked.includes(item.id)}
                  onChange={(e) => handlePermissionChange(e, item)}  
                  value={item.id}
                  name="ck"/></CTableDataCell>     
       <CTableDataCell >{item.name}</CTableDataCell>
       <CTableDataCell>{item.description}</CTableDataCell>
        </CTableRow>

          )  
         

        })
}


      </CTableBody>
       </CTable>
       <input type="hidden" name="permlist" id="permlist" value={checked.join(",")} />
        

            </DocsExample>
          </CCardBody>
          </CCard>
          </CCol></CRow>
          

      
       
       
    )
}

export default ViewAssignPermissions