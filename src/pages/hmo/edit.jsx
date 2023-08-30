import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import ErrorMsg from "../errorMsg";
import showToastMessage from '../../components/toast';
import { trackPromise } from 'react-promise-tracker';
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';


const EditHmo
 = () =>{
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false)
    const {currentUser, permissions } = useContext(AuthContext);
     const location = useLocation()
     const id = location.state//pathname.split("/")[1]
    const [country, setCountry] = useState([])
    const [regions, setRegion] = useState([])
    const [states, setStates] = useState([])
    const [lgas, setLgas] = useState([])
    const [ward, setWard] = useState([])
    const navigate = useNavigate()
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       code: "",
       id: "",
       phone:'', address:'', email:'', countryId:'', regionId:'', stateId:'',lgaId:'', wardId:''    
    })

          useEffect(()=>{
        const formData = async e =>{
        try{
           await app.get(`/hmo/${id}`)
            .then(res =>{
               setInputs(res.data)
            })
            .catch(err=>{
               showToastMessage('Unable to load data, reason:' +err, 'error')
            })
                    
           }
        catch(err){
         showToastMessage('Unable to load data, reason:' +err, 'error')
        }
    }
         formData()
         if(!(permissions.indexOf("EDIT_HMOS") > -1)){
            navigate('/')
         }
         const loadcountry = async e=>{
         const getCountry = await app.get('/country')
         setCountry(getCountry.data);
}
         loadcountry()
   },[permissions,id, navigate])

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
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
    const handleUpdate = async e =>{
        try{
          e.preventDefault()
          setLoading(true)
    await app.put(`/hmo/${inputs.id}`, inputs)
    .then(res=>{
      setLoading(false)
      showToastMessage('Update complete.', 'success')
       navigate('/hmo')
    })
    .catch(err=>{
      setLoading(false)
      showToastMessage('Updation failed !.', 'error')
    })
        }
        catch(errs){
          setLoading(false)
        setMsg(errs.message + ':  Duplicate entry is not allowed.')
        showToastMessage('Error occured, reason: '+ errs, 'error')
        }
    }


    
    return (
      
           <CRow >
         <CCol xs={12} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>EDIT HMO</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="HMO"> 
            <CRow>
            <CCol xs>
            Code
            <CFormInput type="text" name="code" value={inputs.code} placeholder="Hmo Code" onChange={handleChange} />
            </CCol>
            <CCol xs>
            Hmo Name
       <CFormInput type="text" name="name" value={inputs.name} placeholder="Hmo Name" onChange={handleChange}  />
            </CCol>
            </CRow>
        <CRow>
        <CCol xs>
        Phone No#
       <CFormInput type="text" name="phone" value={inputs.phone} placeholder="Phone Number" onChange={handleChange}  />
        </CCol>
        <CCol xs>
        Official Email 
       <CFormInput type="email" name="email" value={inputs.email} placeholder="Email Address" onChange={handleChange}  />
        </CCol>
        </CRow>
        <CRow>
        <CCol xs>
        Address
        <CFormTextarea name="address" placeholder="Address" value={inputs.address} onChange={handleChange} ></CFormTextarea>
        </CCol>
   
        </CRow>
        <CRow>
        <CCol xs>
        Country
       <CFormSelect name="countryId"  onChange={handleChange} onBlur={loadRegion} >
       <option value={0} disabled selected>--select Country--</option>
      { 
      country.length === 0?'': country.map((item)=>(
        <option value={item.id} selected={item.id === inputs.countryId? 'selected':''}>{item.code + ' - ' + item.name} </option>
      ))
      }
      
       </CFormSelect>
        </CCol>
        <CCol xs>
        Region
         <CFormSelect name="regionId"  onChange={handleChange} onBlur={loadStates} >
       <option value={0} disabled selected>--select Region--</option>
      { 
      regions.length===0?'':regions.map((item)=>(
        <option value={item.id} selected={item.id === inputs.regionId? 'selected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
        </CCol>
        </CRow>
       <CRow>
       <CCol xs>
       State 
         <CFormSelect name="stateId"  onChange={handleChange}  onBlur={loadLgas}>
       <option value={0} disabled selected>--select State--</option>
      { 
      states.length===0?'':states.map((item)=>(
        <option value={item.id} selected={item.id === inputs.stateId? 'selected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       <CCol xs>
       LGA
         <CFormSelect name="lgaId"  onChange={handleChange} onBlur={loadWard} >
       <option value={0} disabled selected>--select local Govt Area--</option>
      { 
      lgas.length===0?'':lgas.map((item)=>(
        <option value={item.id} selected={item.id === inputs.lgaId? 'selected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       </CRow>
       <CRow>
       <CCol xs>
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
       <CCol xs>
       
       </CCol>
       </CRow> 
       <CRow>
       <CCol xs>
       <br />
       { permissions.indexOf("ADD_HMOS") > -1? 
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

export default EditHmo
