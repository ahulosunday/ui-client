import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import ErrorMsg from "../errorMsg";
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import showToastMessage from '../../components/toast';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';


const AddRegion = () =>{
    const [loading, setLoading] = useState(false);
     const [country, setCountry] = useState([]);
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
      countryId: '',     
    })
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
    const handleSubmit = async e =>{
       e.preventDefault()
       setLoading(true)
        try{
         await app.post('/region', inputs)
        .then(res=>{
          setLoading(false)
          showToastMessage('One record added successfully.', 'success')
           navigate('/region')
        })
        .catch(err=>{
          setLoading(false)
          showToastMessage('Error occured ...' +err, 'error')
        })
        }
        catch(errs){
          setLoading(false)
        showToastMessage('Error occured ...' +errs, 'error')
        }
    }
     useEffect(()=>{
const loadItem = async e =>{
 try{
          
        const getCountry = await app.get('/country')
         setCountry(getCountry.data);
       
    }catch(err){
         showToastMessage(err.message, 'error')
        }
     
        
    } 
    loadItem()
    if(!(permissions.indexOf("ADD_REGIONS") > -1)){
      navigate('/')
    }
    }, [permissions, navigate])
    return (
        <CRow >
         <CCol xs={12} xl={12} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ADD REGIONS</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="Regions"> 
       <CRow>
       <CCol xs={12} xl={6}>
       Country
       <CFormSelect name="countryId"  onChange={handleChange} >
       <option value="0" disabled selected>--select Country--</option>
      { 
      country.length ===0 ? '': country.map((item)=>(
        <option key={item.id} value={item.id}>{item.code + ' - ' + item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       <CCol xs={12} xl={6}>
       Region
        <CFormInput type="text" name="name" placeholder="Region" onChange={handleChange} />
       </CCol>
       </CRow>
    <CRow>
    <CCol xs={12} xl={6}>
   <br />
       {permissions.indexOf("ADD_REGIONS") > -1? 
      <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleSubmit(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="start"
          variant="contained"
        >
          <span>Submit</span>
        </LoadingButton>
        <Goback url='/region' />
        </Stack>:
        <Goback url='/region' />}
     </CCol>
    </CRow>
       </DocsExample>
       </CCardBody>
       </CCard>
       </CCol>
       </CRow>
    )
}

export default AddRegion