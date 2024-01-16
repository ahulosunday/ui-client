
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import ErrorMsg from "../errorMsg";
import app from '../../helpers/axiosConfig'
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import showToastMessage from "../../components/toast";
import {Alert, Stack } from "@mui/material";
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';
import validateForm from "../../components/validateForm";



const AddAccount_type = () =>{
    const [msg, setMsg] = useState('');
    const [update, setUpdate] = useState(false)
  const state = useLocation().state
    const [ err, setError] = useState('')
    const {currentUser, permissions } = useContext(AuthContext);
     const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [ inputs, setInputs ] = useState({
       name: "",
       id: state    
    })
 useEffect(()=>{
if(!(permissions.indexOf("ADD_ACCOUNT_TYPE") > -1)){
    navigate('/')
}

const viewOne = async(state)=>{
await app.get(`/accout/type/${state}/0`)
            .then(res=>{
               setInputs(res.data)
            })
            .catch(err=>{
               showToastMessage('Error loading the data ...' + err.err, 'error')
            })
}
if(state !== null){
  setUpdate(true)
 try{
   viewOne(state)
}
 catch(err){

 }
}
 }, [permissions])  
  
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
    const handleSubmit = async e =>{
       
         if(validateForm('account_type') === 0){
         setLoading(true)
       await app.post('/account/type/add', inputs)
       .then(res=>{
          setLoading(false)
          showToastMessage('One record added successfully.' , 'success')
          navigate('/account/type/')
       })
       .catch(errs=>{
       setLoading(false)
       setError(<Alert severity='error'>Account Type {errs}</Alert>)
        showToastMessage(errs, 'error')
       })
      
        }
    }

      const handleUpdate = async e =>{
       
         if(validateForm('account_type') === 0){
         setLoading(true)
       await app.put(`/account/type/${inputs.id}/`, inputs)
       .then(res=>{
          setLoading(false)
          showToastMessage('One record updated successfully.' , 'success')
          navigate('/account/type/')
       })
       .catch(errs=>{
       setLoading(false)
       setError(<Alert severity='error'>Account Type {errs}</Alert>)
        showToastMessage(errs, 'error')
       })
      
        }
    }
return (
          <CRow >
<CCol xs={12} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ADD ACCOUNT TYPE</strong>
          </CCardHeader>
          <CCardBody>
            
            <DocsExample add="ACCOUNT TYPE"> 
         <form className="account_type">
         <CRow>
         <CCol xs={12}>
         Type of Account
       <CFormInput type="text" name="name" placeholder="Account type" onChange={handleChange} value={inputs.name} />
         <CFormInput type="hidden" name="id" value={inputs.id} />
         </CCol>
        </CRow>
      <CRow>
      <CCol xs={12}>
      <br />
      { update? 
permissions.indexOf("ADD_ACCOUNT_TYPE") > -1? 
       <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleUpdate()}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained">
          <span>Update</span>
        </LoadingButton>       
        <Goback url='/account/type/' />
          </Stack>  :  <Goback url='/account/type/' />
      :
          permissions.indexOf("ADD_ACCOUNT_TYPE") > -1? 
       <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleSubmit()}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained">
          <span>Submit</span>
        </LoadingButton>       
        <Goback url='/account/type/' />
          </Stack>  :  <Goback url='/account/type/' />
}
      </CCol>
      </CRow>      
           <CRow><CCol>{err}</CCol></CRow>
         </form>
 </DocsExample>
 </CCardBody>
 </CCard>
 </CCol>
 </CRow>
       
    )
}

export default AddAccount_type