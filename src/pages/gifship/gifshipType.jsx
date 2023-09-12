import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import showToastMessage from '../../components/toast';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormSelect, CRow } from '@coreui/react';
import { DocsExample } from '../../components';

const GifshipType = () =>{
    const [getGifship, setGifship] = useState([]);
     const [loading, setLoading] = useState(false);
      const {currentUser, permissions } = useContext(AuthContext);
          const navigate = useNavigate()
               const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       gifshipId: "",
        
    })
    
  useEffect(()=>{
const loadItem = async e =>{
 try{
       await app.get('/gifship',null).then(res=>{
            setGifship(res.data);
        }).catch(err=>{
            showToastMessage(err, 'error')
        })
         
    }catch(err){
        showToastMessage('Internal error occured ...', 'error')
        }
        
    }
   
         loadItem() 
         //===============================
         if(!(permissions.indexOf("ADD_GIFSHIP_TYPE") > -1)){
            navigate('/')
         }

  }, [permissions, navigate])
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
    const handleSubmit = async e =>{
       e.preventDefault()
       setLoading(true)
        try{
       await app.post('/gifship-type', inputs).then(res=>{
         setLoading(false)
         showToastMessage('Transaction completed with status:' + res.statusText, 'success')
         navigate('/gifship-list')
       }).catch(err=>{
         setLoading(false)
         showToastMessage('Transaction failed, reason:' + err, 'error')
       })
     }
        catch(errs){
         setLoading(false)
         showToastMessage('Transaction failed ...', 'error')
        }
    }


    
    return (
                <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>SUB-PROGRAMMES</strong>
          </CCardHeader>
          <CCardBody>
            
            <DocsExample add="SUB-PROGRAMME"> 
       <CRow>
       <CCol xs={12}>
       Programme
       <CFormSelect name="gifshipId" onChange={handleChange} >
        <option value={0} disabled selected>--select Category--</option>
        {
            getGifship.length===0? '': getGifship.map((item)=>(
            <option key={item.id} value={item.id}>{item.name}</option>
            ))
        }
        </CFormSelect>
       </CCol>
       </CRow>
       <CRow>
       <CCol xs={12}>
       Sub: 
       <CFormInput type="text" name="name" placeholder="" onChange={handleChange} />
       </CCol>
       </CRow>
       <CRow>
       <CCol xs={12}>
       <br />
       { permissions.indexOf("ADD_GIFSHIP_TYPE") > -1? 
        <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleSubmit(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>submit</span>
        </LoadingButton>
       <Goback url='/gifship-list' />
        </Stack> :
        <Goback url='/gifship-list' />}
       </CCol>
       </CRow>
        </DocsExample>
        </CCardBody>
        </CCard>
        </CCol>
        </CRow>
      
       
    )
}

export default GifshipType