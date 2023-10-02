import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import { AiTwotonePlusCircle } from "react-icons/ai";
import showToastMessage from '../../components/toast';
import { trackPromise } from 'react-promise-tracker';
import SendIcon from '@mui/icons-material/Send';
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { DocsExample } from '../../components';
import validateForm from '../../components/validateForm';

const AssignPermissions = () =>{
  const location = useLocation()
    const [loading, setLoading] = useState(false);
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
         
           await app.get(`/role/${id}`)
           .then(res=>{
             setInputs(res.data)
           })
           .catch(err=>{
            showToastMessage('Unable to load the role data', 'error')
           })
          
          }
        catch(err){
           showToastMessage('Unable to load the role data', 'error')
        }
    }
     const arrays =[] 
    const rolePermission = async e =>{
        try{
       
          await app.get(`/${id}/role-permissions`)
          .then(res=>{
            res.data.map((item)=>{
               arrays.push(item.permissionId)
               return arrays;
            })
           setAssignedPerms(arrays)
          })
          .catch(err=>{
            showToastMessage('Unable to load the permission data', 'error')
          })
            
          }
        catch(err){
         showToastMessage('Unable to load the permission data', 'error')
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
    await app.get('/permissions')
     .then(res=>{
      setPerms(res.data)
     })
     .catch(err=>{
      showToastMessage('Unable to load the permission data', 'error')
     })
        

    }
  const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
    }
    const handleUpdate = async e =>{
        
        try{
          e.preventDefault()
          setLoading(true)
            var permlist = document.getElementById('permlist').value;
            var arr = [];
            arr = permlist.split(',')
            const obj = arr.map((permissionId, index)=>{
              return Object.assign({
                permissionId,
                roleId: id
              })
            }) 
              
       await app.post(`/role-permissions/`, obj)
       .then(res=>{
        setLoading(false)
        showToastMessage('Permission(s) assigned successfully', 'success')
        navigate('/role/list')
       }).then(err=>{
        setLoading(false)
        showToastMessage(err, 'error')
       })
        }
      
        catch(errs){
        showToastMessage( "Invalid data entry, check the entry and try again", "error")
        }
    }

      //Delete==============
  const handleDelete = async e =>{
    try{
    const permissionId = e.target.id
  await app.delete(`/${permissionId}/${id}/role-permissions`).then(res=>{
    showToastMessage('One record deleted succesfully', 'info')
    navigate('/role/list')
  }).catch(err=>{
   showToastMessage(err, 'error')
  })
  
    }
    catch(err){
    showToastMessage( "Unable to delete the selected permission", 'error')
    
    }
    
  }

     const handleCheckAllChange = (e) => {
          setChecked( e.target.checked ? perms.map((c) => c.id) : []);
        };

        const handlePermissionChange = (e, c) => {
          setChecked((prevChecked) => e.target.checked ? [...prevChecked, c.id]: prevChecked.filter((item) => item !== c.id));
        };
   
    return (
       <form method='post'>
      <CRow >
         <CCol md={12} xs={12} xl={6} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ASSIGN PERMISSIONS</strong>
          </CCardHeader>
          <CCardBody className='validateForm'>
            <DocsExample add="Assign Permissions"> 
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
       <CCol xs={12} xl={12}> <br />
       {permissions.indexOf("EDIT_ROLE") > -1? 
      <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleUpdate(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Update
        </LoadingButton>
        <Goback url='/role/list' />
        </Stack>
        : <Goback url='/role/list' />}
          </CCol>
       </CRow>
        </DocsExample>
        </CCardBody>
        </CCard>
        </CCol>

       <CCol md={12} xs={12} xl={6} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>PERMISSIONS</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="Permissions"> 
      
       <CTable striped style={{fontSize:'12px'}} align="middle" responsive> 
      <CTableHead>
       <CTableRow>
        <CTableHeaderCell><input type='checkbox' id="selectAll"
                checked={checked.length === perms.length}
                onChange={handleCheckAllChange} /></CTableHeaderCell>
       <CTableHeaderCell>Name</CTableHeaderCell>
       <CTableHeaderCell>Description</CTableHeaderCell>
       <CTableHeaderCell></CTableHeaderCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
       {
           perms.length === 0? '': perms.map((item)=>{
          if(assignedperms.indexOf(item.id) >-1) 
                 return (
             <CTableRow key={item.id}>
       <CTableDataCell><Link style={{color:'green'}}><AiTwotonePlusCircle /></Link></CTableDataCell>     
       <CTableDataCell >{item.name}</CTableDataCell>
       <CTableDataCell>{item.description}</CTableDataCell>
       <CTableDataCell >{permissions.indexOf("ADD_ROLES") > -1?<Link style={{color:'red', textDecoration:'none'}} onClick={handleDelete} state={item.id}  id ={item.id+'_'+id} >Remove</Link>:''}</CTableDataCell>
        </CTableRow>
       
          )
          else    return (
            <CTableRow key={item.id}>
       <CTableDataCell><input type="checkbox" id={item.id}
                checked={checked.includes(item.id)}
                  onChange={(e) => handlePermissionChange(e, item)}  
                  value={item.id}
                  name="ck"/></CTableDataCell>     
       <CTableDataCell >{item.name}</CTableDataCell>
       <CTableDataCell>{item.description}</CTableDataCell>
       <CTableDataCell></CTableDataCell>
        </CTableRow>
          )
        })
}
</CTableBody>
       </CTable>
       <CFormInput type="hidden" name="permlist" id="permlist" value={checked.join(",")} />
      </DocsExample>
      </CCardBody></CCard>
      </CCol>
        </CRow>
        </form>
       
    )
}

export default AssignPermissions