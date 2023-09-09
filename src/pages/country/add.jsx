
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import ErrorMsg from "../errorMsg";
import app from '../../helpers/axiosConfig'
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import showToastMessage from "../../components/toast";
import {Stack } from "@mui/material";
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';




const AddCountry = () =>{
    const [msg, setMsg] = useState('');
    const {currentUser, permissions } = useContext(AuthContext);
     const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       code: "",
       shortname: "",
       currency: "",      
    })
 useEffect(()=>{
if(!(permissions.indexOf("ADD_COUNTRY") > -1)){
    navigate('/')
}
 }, [permissions])  
  
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
    const handleSubmit = async e =>{
        try{
         setLoading(true)
       await app.post('/country', inputs)
       .then(res=>{
          setLoading(false)
          showToastMessage('One record added successfully.' , 'success')
          navigate('/country')
       })
       .catch(err=>{
       setLoading(false)
        showToastMessage('Error occured while submitting the data ...: ', 'error')
       })
      
        }
        catch(errs){
         setLoading(false)
        showToastMessage('Error occured while submitting the data ...:', 'error')
        }
    }


    
    return (
          <CRow >
<CCol xs={12} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ADD COUNTRY</strong>
          </CCardHeader>
          <CCardBody>
            
            <DocsExample add="Country"> 
         <form>
         <CRow>
         <CCol xs={12}>
         Country
       <CFormInput type="text" name="name" placeholder="Country Name" onChange={handleChange}  />
         </CCol>
         <CCol xs={12}>
         Code
        <CFormInput type="text" name="code" placeholder="Country Code" onChange={handleChange} />
         </CCol>
         </CRow>
        <CRow>
        <CCol xs={12}>
        Shortname
        <CFormInput type="text" name="shortname" placeholder="Country Shortname" onChange={handleChange} />
        </CCol>
        <CCol xs={12}>
        Currency
        <CFormInput type="text" name="currency" placeholder="Country Currency" onChange={handleChange} />
        </CCol>
        </CRow>
      <CRow>
      <CCol xs={12}>
      <br />
          {permissions.indexOf("ADD_COUNTRY") > -1? 
       <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleSubmit()
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Submit</span>
        </LoadingButton>       
        <Goback url='/country' />
          </Stack>  :  <Goback url='/country' />}
      </CCol>
      </CRow>      
            {msg=== ''? '': <ErrorMsg msg={msg} />}
         </form>
 </DocsExample>
 </CCardBody>
 </CCard>
 </CCol>
 </CRow>
       
    )
}

export default AddCountry