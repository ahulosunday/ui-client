import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import ErrorMsg from "../errorMsg";
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../../components/toast';
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';
import validateForm from '../../components/validateForm';

const EDITCountry = () =>{
    const [msg, setMsg] = useState('');
    const {currentUser,permissions } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
     const state = useLocation().state
    //const id = useLocation().pathname.split("/")[1]

    const navigate = useNavigate()
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       code: "",
       shortname: "",
       currency: "",  
       id: ""   
    })
   

          useEffect(()=>{
           
    const formData = async e =>{
        try{
         if(state !== null){
          await app.get(`/country/${state}`)
            .then(res=>{
               setInputs(res.data)
            })
            .catch(err=>{
               showToastMessage('Error loading the data ...', 'error')
            })
         
           
         }
          
           }
        catch(err){
        showToastMessage('Error loading the data ...', 'error')
        }
    }
     if(!(permissions.indexOf("EDIT_COUNTRY") > -1)){
        navigate('/')
     }
         formData()
   },[state,currentUser, permissions, navigate])
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}));
    }
    const handleUpdate = async e =>{
        try{
        if(validateForm('country') === 0 ){

         setLoading(true)
       await app.put(`/country/${inputs.id}`, inputs)
       .then(res=>{
         setLoading(false)
         showToastMessage('Updation complete', 'success')
          navigate('/country')
       })
       .catch(err=>{
         console.log(err)
         setLoading(false)
        showToastMessage('Updation failed ...' + err, 'error')
       }) 
        }
        }
        catch(errs){
         setLoading(false)
        showToastMessage(errs.message + ':  Duplicate entry is not allowed.', 'error')
        }
    }


    
    return (
<CRow >
<CCol xs={12} style={{fontSize:'12px'}} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>UPDATE COUNTRY</strong>
          </CCardHeader>
          <CCardBody >
            
            <DocsExample add="Update Country"> 
            <form className='country'>
         <CRow>
         <CCol xs={12}>
       Country
       <CFormInput required type="text" value={inputs.name} name="name" placeholder={inputs.name} onChange={handleChange}  />
         </CCol>
         <CCol sx={12}>
         Code
        <CFormInput type="text" value={inputs.code} name="code" placeholder={inputs.code} onChange={handleChange} />
        </CCol>
         </CRow>
        <CRow>
        <CCol xs={12}>
        Shortname
        <CFormInput type="text" value={inputs.shortname} name="shortname"  placeholder={inputs.shortname} onChange={handleChange} />
        </CCol>
        <CCol xs={12}>
        Currency
        <CFormInput type="text" value={inputs.currency} name="currency"  placeholder={inputs.currency} onChange={handleChange} />
               </CCol>
        </CRow>
        <br />
        { permissions.indexOf("EDIT_COUNTRY") > -1? 
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
         <Goback url='/country' />
        </Stack> : <Goback url='/country' />}
        <br />
        </form>
        </DocsExample>
        </CCardBody>
        </CCard>
        </CCol>
        </CRow>
       
    )
}

export default EDITCountry