import app from '../../helpers/axiosConfig';
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import showToastMessage from '../../components/toast';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';

const EditWard = () =>{
    const [loading, setLoading] = useState(false);
     const location = useLocation()
      const [country, setCountry] = useState([])
      const [states, setStates] = useState([])
       const [lgas, setLgas] = useState([])
    const {currentUser, permissions } = useContext(AuthContext);
      const id = location.state//location.pathname.split("/")[1]
    const navigate = useNavigate()
     const [regions, setRegion] = useState([])
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       code: "",
       countryId: "",
       id: '',
       regionId: '',
       stateId: '',
       lgaId:''
            
    })
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
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
        showToastMessage('Internal error occured ...', 'error')
        }
    }
     //===============load Lgas===========
    const loadLgas =async e =>{
      try{
          const lgaId = e.target.value
          await app.get(`/lga/state/${lgaId}`).then(res=>{
             setLgas(res.data);
          }).catch(err=>{
            showToastMessage(err, 'error')
          })
         }catch(err){
         showToastMessage('Internal error occured ...', 'error')
        }
    }
    //=============================
     const handleUpdate = async e =>{
        try{
          e.preventDefault()
          setLoading(true)
       await app.put(`/ward/${inputs.id}`, inputs).then(res=>{
        if(res.status === 200){
          setLoading(false)
          showToastMessage('Transaction completed with status: ' + res.statusText, 'success')
          navigate('/ward')
        }
        }).catch(err=>{
          showToastMessage('Transaction failed: ' + err, 'error')
        })}
        catch(errs){
          showToastMessage('Internal error occured ...', 'error')
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
    const formData = async e =>{
        try{
         
          await app.get(`/ward/${id}`).then(res=>{
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
    if(!(permissions.indexOf("EDIT_WARDS") > -1)){
      navigate('/')
    }
    }, [permissions, navigate, id])
 
 return (
  
         <CRow >
         <CCol xs={12} xl={12} style={{fontSize:'12px'}} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>EDIT WARDS</strong>
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
        <option key={item.id} selected={(inputs.countryId === item.id)?'selected':''} value={item.id}>{item.code + ' - ' + item.name} </option>
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
        <option key={item.id} selected={(inputs.regionId === item.id)?'selected':''} value={item.id}>{item.name} </option>
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
        <option key={item.id} selected={(inputs.stateId === item.id)?'selected':''} value={item.id}>{item.name} </option>
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
        <option key={item.id} selected={(inputs.lgaId === item.id)?'selected':''} value={item.id}>{item.name} </option>
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
   <CCol xs={12} xl={6}>
   <br />
        {permissions.indexOf("ADD_LGAS") > -1? 
       <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleUpdate(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained">
          <span>Update</span>
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

export default EditWard