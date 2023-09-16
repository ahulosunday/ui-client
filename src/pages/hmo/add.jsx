import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import ErrorMsg from "../errorMsg";
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../../components/toast';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';
import validateForm from '../../components/validateForm';

const AddHmo = () =>{
    const [msg, setMsg] = useState('');
    const [loading, setLoading]= useState(false)
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
     const [country, setCountry] = useState([])
    const [regions, setRegion] = useState([])
    const [states, setStates] = useState([])
    const [lgas, setLgas] = useState([])
    const [ward, setWard] = useState([])
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       code: "",
       id: "",
       phone:'', address:'', email:'', countryId:1, regionId:1, stateId:1,lgaId:1, wardId:1, types:''
    })
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
    const handleSubmit = async e =>{
        try{
          e.preventDefault()
          if(validateForm('validateForm') === 0){
          setLoading(true)
       await app.post('/hmo', inputs)
       .then(res=>{
        setLoading(false)
        if(res.status=== 200) showToastMessage('One record added successfully.', 'success')
         navigate('/hmo')
       })
       .catch(err=>{
        setLoading(false)
        showToastMessage('Can not perform the operation.Reaso: All fields are required', 'error')
       })
          }
        }
        catch(errs){
          setLoading(false)
        showToastMessage('Operation failed with error: ', 'error')
        }
    }
useEffect( ()=>{
if(!(permissions.indexOf("ADD_HMOS") > -1)){
    navigate('/')
}
const loadcountry = async e=>{
  const getCountry = await app.get('/country')
         setCountry(getCountry.data);
}
loadcountry()
}, [permissions])
     //============load region=========
    const loadRegion =async e =>{
      try{
          const countryId = e.target.value
          const getRegions = await app.get(`/region/country/${countryId}`)
          setRegion(getRegions.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load states of origin===========
    const loadStates =async e =>{
      try{
          const regionId = e.target.value
          const getStates = await app.get(`/state/region/${regionId}`)
          setStates(getStates.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load lga of origin===========
    const loadLgas =async e =>{
      try{
          const stateId = e.target.value
          const getLgas = await app.get(`/lga/state/${stateId}`)
          setLgas(getLgas.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //=========load ward
    const loadWard =async e =>{
      try{
          const LgaId = e.target.value
          const getWard = await app.get(`/ward/lga/${LgaId}`)
          setWard(getWard.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }

    
    return (

           <CRow  >
         <CCol xs={12} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ADD HMO</strong>
          </CCardHeader>
          <CCardBody className='validateForm'>
            <DocsExample add="HMO"> 
            <CRow>
            <CCol xs={12} xl={6}>
            Code
            <CFormInput type="text" name="code" placeholder="Hmo Code" onChange={handleChange} />
            </CCol>
            <CCol xs={12} xl={6}>
            Hmo Name
       <CFormInput type="text" name="name" placeholder="Hmo Name" onChange={handleChange}  />
            </CCol>
            </CRow>
            <CRow>
            <CCol xs={12}>
         HMO Type
         <CFormSelect name="types" onChange={handleChange}>
         <option value={1}>National</option>
         <option value={2}>Regional</option>
         <option value={3}>State</option>
         </CFormSelect>
         </CCol>
            </CRow>
             </DocsExample>
         <DocsExample add="Head Office Information"> 
        <CRow>
        <CCol xs={12}  xl={6}>
        Official Phone No#
       <CFormInput type="text" name="phone" placeholder="Phone Number" onChange={handleChange}  />
        </CCol>
        <CCol xs={12}  xl={6}>
        Official Email 
       <CFormInput type="email" name="email" placeholder="Email Address" onChange={handleChange}  />
        </CCol>
        </CRow>
        <CRow>
        <CCol xs={12}>
        Head Office Address
        <CFormTextarea name="address" placeholder="Address" onChange={handleChange} ></CFormTextarea>
        </CCol>
         
        </CRow>
          
        <CRow>
        <CCol xs={12}  xl={6}>
        Country
       <CFormSelect name="countryId"  onChange={handleChange} onBlur={loadRegion} >
       <option value={0} disabled selected>--select Country--</option>
      { 
      country.length === 0?'': country.map((item)=>(
        <option value={item.id}>{item.code + ' - ' + item.name} </option>
      ))
      }
      
       </CFormSelect>
        </CCol>
        <CCol xs={12}  xl={6}>
        Region
         <CFormSelect name="regionId"  onChange={handleChange} onBlur={loadStates} >
       <option value={0} disabled selected>--select Region--</option>
      { 
      regions.length===0?'':regions.map((item)=>(
        <option value={item.id}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
        </CCol>
        </CRow>
       <CRow>
       <CCol xs={12}  xl={6}>
       State 
         <CFormSelect name="stateId"  onChange={handleChange}  onBlur={loadLgas}>
       <option value={0} disabled selected>--select State--</option>
      { 
      states.length===0?'':states.map((item)=>(
        <option value={item.id}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       <CCol xs={12}  xl={6}>
       LGA
         <CFormSelect name="lgaId"  onChange={handleChange} onBlur={loadWard} >
       <option value={0} disabled selected>--select local Govt Area--</option>
      { 
      lgas.length===0?'':lgas.map((item)=>(
        <option value={item.id}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       </CRow>
       <CRow>
       <CCol xs={12}  xl={6}>
       Ward
         <CFormSelect name="wardId"  onChange={handleChange} >
        <option value={0} >--select--</option>
      { 
      ward===0?'':ward.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.wardId ===item.id? 'selelected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       <CCol xs={12}  xl={6}>
       
       </CCol>
       </CRow> 
       <CRow>
       <CCol xs={12}  xl={6}>
       <br />
       { permissions.indexOf("ADD_HMOS") > -1? 
         <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleSubmit(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Submit</span>
        </LoadingButton>
        <Goback url='/hmo' />
       </Stack> :   <Goback url='/hmo' /> 
       }
       
       </CCol>
       </CRow>
  </DocsExample>
  </CCardBody>
  </CCard>
  </CCol></CRow>
    )
}

export default AddHmo