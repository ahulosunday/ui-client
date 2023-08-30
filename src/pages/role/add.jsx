import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import showToastMessage from "../../components/toast";
import {Stack } from "@mui/material";
import { trackPromise } from 'react-promise-tracker';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';

const Add = () =>{
    const [loading, setLoading] = useState(false)
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
   
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       description: "",
        
    })
    useEffect( () =>{
   
     if(!(permissions.indexOf("ADD_ROLES") > -1)){
      navigate('/')
     }
    }, [permissions, navigate])

   
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
   
    const handleSubmit = async e =>{
        try{
            e.preventDefault() 
            setLoading(true) 
            await app.post('/role', inputs)
            .then(res=>{
                 if(res.status === 200){
                    setLoading(false)
                    showToastMessage('One record added successfully', 'success')
                    navigate('/role/list')
             }

            })
            .catch(err=>{
                setLoading(false)
                showToastMessage('Operation failed. Check your entries and try agin' +err, 'error')
            })    
       }
        catch(errs){
            setLoading(false)
       showToastMessage('Operation failed. Check your entries and try agin', 'error')
        }
    }
    return (
        <CRow >
         <CCol xs={6} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ADD ROLES</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="ADD ROLES"> 
        <CRow>
        <CCol xs>
       <label htmlFor="name">Role</label> 
       <CFormInput type="text" name="name" placeholder="Role name" onChange={handleChange} />
        </CCol>
        </CRow>
        <CRow>
         <CCol xs>
       <label htmlFor="description">Description</label> 
        <CFormInput type="text" name="description" placeholder="Description" onChange={handleChange} />
        </CCol>
       </CRow>
       <CRow>
       <CCol xs>
       <br />
        <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleSubmit(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Submit</span>
        </LoadingButton> <Goback url='/role/list' />
        </Stack>
        </CCol>
        </CRow>
</DocsExample>
</CCardBody>
</CCard>
</CCol>
</CRow>    
    )
}

export default Add