import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import showToastMessage from '../../components/toast';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormSelect, CRow } from '@coreui/react';
import { DocsExample } from '../../components';
import validateForm from '../../components/validateForm';

const GifshipEdit = () =>{
  const location = useLocation()
  const [loading, setLoading] = useState(false)
   const [getGifship, setGifship] = useState([]);
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
     const id = location.state//pathname.split("/")[2]
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       gifshipId: "",
       id:'',
      
        
    })
      
      useEffect(()=>{
        const loadItem = async e =>{
 try{
          
        await app.get('/gifship').then(res=>{
             setGifship(res.data);
        }).catch(err=>{
            showToastMessage(err, 'error')
        })
        
    }catch(err){
         showToastMessage('Internal error occured ...', 'error')
        }
        
    }
    const formData = async e =>{
        try{
         await app.get(`/gifshipedit/${id}`).then(res=>{
            setInputs(res.data)
         }).catch(err=>{
            showToastMessage(err, 'error')
         })
         }
        catch(err){
        showToastMessage('Internal error occured ...', 'error')
        }
    }
     formData()
     loadItem() 
if(!(permissions.indexOf("EDIT_GIFSHIP_TYPE") > -1)){
    navigate('/')
}

      },[permissions, navigate, id])
    
  const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
    const handleUpdate = async e =>{
        try{
            e.preventDefault()
            if(validateForm('gifshipm') === 0){
            setLoading(true)
       await app.put(`/gifshipList/${inputs.id}`, inputs).then(res=>{
        setLoading(false)
        showToastMessage('Transaction completed with status: '+ res.statusText, 'success')
        navigate('/gifship-list')
       })
        }
        }
        catch(errs){
         setLoading(false)
         showToastMessage('Internal error occured ...', 'error')
        }
    }


    
    return (
                 <CRow >
<CCol xs={12} xl={12} style={{fontSize:'12px'}} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>EDIT [{inputs.name}]</strong>
          </CCardHeader>
          <CCardBody className='gifshipm'>
            
            <DocsExample add="Country"> 
            <CRow>
            <CCol xs={12}>
            Programme
            <CFormSelect name="gifshipId" onChange={handleChange} >
        <option value={0} disabled>--select Category--</option>
        {
            getGifship.length===0? '': getGifship.map((item)=>(
            <option key={item.id} selected={item.id === inputs.gifshipId? 'selected': ''} value={item.id}>{item.name}</option>
            ))
        }
        </CFormSelect>
            </CCol>
            <CCol xs={12}>
            Sub:
            <CFormInput type="text" value={inputs.name} name="name" placeholder={inputs.name} onChange={handleChange} />
      
            </CCol>
            </CRow>   
            <CRow>
            <CCol xs={12}>
           <br />
       {permissions.indexOf("EDIT_GIFSHIP_TYPE") > -1? 
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
       <Goback url='/gifship-list' />
        </Stack>
        : <Goback url='/gifship-list' />}
            </CCol>
            </CRow>
     </DocsExample>
     </CCardBody>
     </CCard>
     </CCol>
     </CRow>
     
           
       
       
    )
}

export default GifshipEdit