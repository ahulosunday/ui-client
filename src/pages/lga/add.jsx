import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import showToastMessage from '../../components/toast';
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';
import validateForm from '../../components/validateForm';
import FormDialogCsvLgas from './bulk';
const AddLga = () =>{
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState([])
    const [regions, setRegion] = useState([])
    const [states, setStates] = useState([])
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       code: "",
       countryId: "",
       regionId: '',
       stateId: '',
            
    })
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
  
    const handleSubmit = async e =>{
       e.preventDefault()
        try{
          if(validateForm('validateForm') === 0){
      setLoading(true)
      await app.post('/lga', inputs).then(res=>{
        if(res.status === 200){
          setLoading(false)
          showToastMessage('Transaction completed with status: '+ res.statusText, 'success')
         navigate('/lga')
      }
      }).catch(err=>{
        setLoading(false)
        showToastMessage('Transaction failed with status: '+ err, 'error')
      })
      }
        }
        catch(errs){
        showToastMessage('Transaction failed with internal error ', 'error')
        }
    }
    //============load region=========/region/:countryId
    const loadRegion =async e =>{
      try{
          const countryId = e.target.value
        await app.get(`/region/country/${countryId}`).then(res=>{
          setRegion(res.data);
         }).catch(err=>{
          showToastMessage(err, 'error')
         })
    }catch(err){
         showToastMessage('Internal error occured ...', 'error')
        }
    }
    //===============load states===========
    const loadStates =async e =>{
      try{
          const regionId = e.target.value
         await app.get(`/state/region/${regionId}`).then(res=>{
          setStates(res.data);
         }).catch(err=>{
          showToastMessage(err, 'error')
         })
    }catch(err){
         showToastMessage('Innternal error occured ...', 'error')
        }
    }
    useEffect(()=>{
const loadItem = async e =>{
 try{
          
        await app.get('/country').then(res=>{
           setCountry(res.data);
         }).catch(err=>{
          showToastMessage(err, 'error')
         })
    }catch(err){
         showToastMessage('Internal error occured ...', 'error')
        }
     
        
    } 
    loadItem()
    if(!(permissions.indexOf("ADD_LGAS") > -1)){
      navigate('/')
    }
    }, [permissions, navigate])


    
    return (
     <CRow >
         <CCol xs={12} xl={12} style={{fontSize:'12px'}} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ADD LGAs</strong>
          </CCardHeader>
          <CCardBody className='validateForm'>
            <DocsExample add="LGA"> 
             <CRow>
            <CCol xs={12} xl={6}>
            Country
       <CFormSelect name="countryId"  onChange={handleChange} onBlur={loadRegion} >
       <option value={0} disabled selected>--select Country--</option>
      { 
      country.length ===0? '' : country.map((item)=>(
        <option key={item.id} value={item.id}>{item.code + ' - ' + item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       <CCol xs={12} xl={6}>
        Region
         <CFormSelect name="regionId"  onChange={handleChange} onBlur={loadStates} >
       <option value={0} disabled selected>--select Region--</option>
      { 
       regions.length===0? '' : regions.map((item)=>(
        <option key={item.id} value={item.id}>{item.name} </option>
      ))
      }
      </CFormSelect></CCol>
       </CRow>
       <CRow>
       <CCol xs={12} xl={6}>
State
         <CFormSelect name="stateId"  onChange={handleChange} >
       <option value={0} disabled selected>--select State--</option>
      { 
      states.length ===0? '': states.map((item)=>(
        <option key={item.id} value={item.id}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
<CCol xs={12} xl={6}>
   Lga
       <CFormInput type="text" value={inputs.name} name="name" placeholder="Lga Name" onChange={handleChange}  />
        </CCol>       
       </CRow>

   <CRow>
   
        <CCol xs={12} xl={6}>
     Code
        <CFormInput type="text" value={inputs.code} name="code" placeholder="Lga Code" onChange={handleChange} />
       </CCol>

       <CCol xl={6} xs={12}>
       Use this for bulk upload of LGAs. Select Country, Region and State. (Format: Name, Code)
      <FormDialogCsvLgas countryId={inputs.countryId} regionId={inputs.regionId} stateId={inputs.stateId} />
       </CCol>
       </CRow>
       <CRow>
       <CCol xs={12} xl={6}>
    <br />
        {permissions.indexOf("ADD_LGAS") > -1? 
           <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleSubmit(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Submit</span>
        </LoadingButton> <Goback url='/lga' />
        </Stack>
        : <Goback url='/lga' />}
        </CCol>
        </CRow>
      </DocsExample></CCardBody></CCard></CCol></CRow>  
        
    )
}

export default AddLga