import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import showToastMessage from '../../components/toast';
import { trackPromise } from 'react-promise-tracker';
import SendIcon from '@mui/icons-material/Send';
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';

const Edit = () =>{
  const location = useLocation()
    const [loading, setLoading] = useState(false);
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
            showToastMessage('Unable to load the data ...', 'error')
           })
          }
        catch(err){
          showToastMessage('Unable to load the data ...', 'error')
        }
    }
    if(!(permissions.indexOf("EDIT_ROLE") > -1)){
      navigate('/')
    }
     
         formData()
   },[permissions, id, navigate])
    
  const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
    }
    const handleUpdate = async e =>{
        try{
          e.preventDefault()
          setLoading(true)
         await app.put(`/role/${inputs.id}`, inputs)
        .then(res=>{
          setLoading(false)
          showToastMessage('The selected record is edited successfully', 'success')
          navigate('/role/list')
        })
        .catch(err=>{
          setLoading(false)
          showToastMessage('Unable to edit the selected record.', 'error')
        })
        }
        catch(errs){
          setLoading(false)
        showToastMessage('Unable to edit the selected record.', 'error')
        }
    }

    
    return (
  <CRow >
         <CCol md={12} xs={12} xl={6} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ADD ROLES</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="Regions"> 
        <CRow>
        <CCol xs>  
       
       <label htmlFor="name">Role</label> 
       <CFormInput type="text" readOnly value={inputs.name} placeholder={inputs.name} name="name"  onChange={handleChange} />
       </CCol>
       </CRow>
        <CRow>
        <CCol xs>
       <label htmlFor="description">Description</label> 
        <CFormInput type="text" placeholder={inputs.description} value={inputs.description} name="description"  onChange={handleChange} />
       </CCol>
       </CRow>
       <CRow>
       <CCol>
       <br />
       {permissions.indexOf("EDIT_ROLE") > -1?
        <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleUpdate(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Update</span>
        </LoadingButton>
         <Goback url='/role/list' />
        </Stack> :  <Goback url='/role/list' />}
 </CCol>
  </CRow>
  </DocsExample>
  </CCardBody>
  </CCard>
  </CCol>
  </CRow>
  )
}

export default Edit