import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import showToastMessage from '../../components/toast';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';

const AddWard = () =>{
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState([])
    const [regions, setRegion] = useState([])
    const [states, setStates] = useState([])
    const [lgas, setLgas] = useState([])
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       code: "",
       countryId: "",
       regionId: '',
       stateId: '',
       lgaId:''
            
    })
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
  
    const handleSubmit = async e =>{
        try{
            e.preventDefault()
            setLoading(true)
          await app.post('/ward', inputs).then(res=>{
          if(res.status === 200){
            setLoading(false)
            showToastMessage('Transaction completed with status: '+ res.statusText, 'success')
            navigate('/ward')
                }
          }).catch(err=>{
            setLoading(false)
            showToastMessage('Transaction failed with status: '+ err, 'error')
          })
        }
        catch(errs){
          setLoading(false)
        showToastMessage('Transaction failed', 'error')
        }
    }
    //============load region=========/region/:countryId
    const loadRegion =async e =>{
      try{
          const countryId = e.target.value
         await app.get(`/region/country/${countryId}`).then(res=>{
          setRegion(res.data);
         }).catch(err=>{
          showToastMessage('Error occured while loading data'+ err, 'error')
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
          showToastMessage('Error occured while loading data'+ err, 'error')
        })
    }catch(err){
         showToastMessage('Internal error occured while loading data', 'error')
        }
    }
        //===============load Lgas===========
    const loadLgas =async e =>{
      try{
          const lgaId = e.target.value
          await app.get(`/lga/state/${lgaId}`).then(res=>{
            setLgas(res.data);
          }).catch(err=>{
            showToastMessage('Error occured while loading data'+ err, 'error')
          })
          }catch(err){
         showToastMessage('Internal error occured while loading data', 'error')
        }
    }
    useEffect(()=>{
const loadItem = async e =>{
 try{
          
        await app.get('/country').then(res=>{
           setCountry(res.data);
         }).catch(err=>{
          showToastMessage('Error occured while loading data'+ err, 'error')
         })
        }catch(err){
         showToastMessage('Internal error occured while loading data', 'error')
        }
     
        
    } 
    loadItem()
    if(!(permissions.indexOf("ADD_WARDS") > -1)){
      navigate('/')
    }
    }, [permissions, navigate])


    
    return (
   
        <CRow >
         <CCol xs={12} xl={12} style={{fontSize:'12px'}} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ADD WARD</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="WARD"> 
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
         <CFormSelect name="stateId"  onChange={handleChange} onBlur={loadLgas} >
       <option value={0} disabled selected>--select State--</option>
      { 
      states.length ===0? '': states.map((item)=>(
        <option key={item.id} value={item.id}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
      <CCol xs={12} xl={6}>
     LGA
         <CFormSelect name="lgaId"  onChange={handleChange} >
       <option value={0} disabled selected>--select local Govt Area--</option>
      { 
       lgas.length===0? '': lgas.map((item)=>(
        <option key={item.id} value={item.id}>{item.name} </option>
      ))
      }
      
       </CFormSelect></CCol>
       </CRow>
        <CRow>
        <CCol xs={12} xl={6}>
        Ward
       <CFormInput type="text" value={inputs.name} name="name" placeholder="Ward name ..." onChange={handleChange}  />
        </CCol>
        <CCol xs={12} xl={6}>
       Code
        <CFormInput type="text" value={inputs.code} name="code" placeholder="Ward Code" onChange={handleChange} />
       </CCol>
       </CRow>
       <CRow>
   <CCol xs={12} xl={12}>
   <br />
        {permissions.indexOf("ADD_LGAS") > -1? 
       <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleSubmit(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained">
          <span>Submit</span>
        </LoadingButton> <Goback url='/ward' />
        </Stack>
        : <Goback url='/ward' />}
          
        </CCol>
         </CRow>
        </DocsExample>
           
       </CCardBody>
       </CCard>
       </CCol></CRow>
       
    )
}

export default AddWard