import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import showToastMessage from '../../components/toast';
import { trackPromise } from 'react-promise-tracker';
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';

const EditHospital = () =>{
    const [loading, setLoading] = useState(false);
    const [mgs, setMsg] = useState('')
    const [country, setCountry] = useState([])
    const [regions, setRegion] = useState([])
    const [states, setStates] = useState([])
    const [lgas, setLgas] = useState([])
    const [wards, setWards] = useState([])
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
     const location = useLocation()
      const id = location.state//pathname.split("/")[1]
    const [ inputs, setInputs ] = useState({
       name: "",
       address: "",
       contactAddress: "",
       phone: "",
       email: "",
       userId: currentUser?.id,
       hospitalCode: "",
       countryId: "",
       regionId: "",
       stateId: "",
       lgaId: "",
       id:"",
       bank:'',
       accnumber:'',
       sortCode:'',
       wardId:''
    })
      

    useEffect(()=>{
const loadItem = async e =>{
 try{
          
        const getCountry = await app.get('/country')
         setCountry(getCountry.data);
       
    }catch(err){
         setMsg(err.message)
        }
     
        
    } 
    const formData = async e =>{
        try{
         // e.preventDefault();
         
           await app.get(`/hospital/${id}`)
           .then(res=>{
            setInputs(res.data[0])
           })
           .catch(err=>{
            showToastMessage('Error occured.'+err, 'error')
           })
           
        }
        catch(err){
          showToastMessage('Error occured.'+err, 'error')
        }
    }
    formData()
    loadItem()
    if(!(permissions.indexOf("EDIT_HOSPITAL") > -1)){
      navigate('/')
    }
    }, [permissions, id, navigate])
    const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
  
       const handleUpdate = async e =>{
        try{
         e.preventDefault()
         setLoading(true)
     await app.put(`/hospital/${inputs.id}`, inputs)
      .then(res=>{
        if(res.status === 200){
          setLoading(false)
          showToastMessage('Updation completes with status: ' +res.statusText, 'success')
        navigate('/hospitals')
       }
      })
      .catch(err=>{
        setLoading(false)
        showToastMessage('Updation failed ...', 'error')
      })

      
       
        }
        catch(errs){
          showToastMessage('Invalid data entry, check the entry and try again', 'error')
         setMsg("Invalid data entry, check the entry and try again")
        }
    }
    //============load region=========/region/:countryId
    const loadRegion =async e =>{
      try{
          const countryId = e.target.value
          const getRegions = await app.get(`/region/country/${countryId}`)
          setRegion(getRegions.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load states===========
    const loadStates =async e =>{
      try{
          const regionId = e.target.value
          const getStates = await app.get(`/state/region/${regionId}`)
          setStates(getStates.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load lga===========
    const loadLgas =async e =>{
      try{
          const stateId = e.target.value
          const getLgas = await app.get(`/lga/state/${stateId}`)
          setLgas(getLgas.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
     //===============load ward===========
    const loadWards =async e =>{
      try{
          const lgaId = e.target.value
          const getLgas = await app.get(`/ward/lga/${lgaId}`)
          setWards(getLgas.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    
    return (
     <CRow >
<CCol xs={12} style={{fontSize:'12px'}} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>UPDATE ACCREDITED PRIMARY HEALTHCARE</strong>
          </CCardHeader>
          <CCardBody>
            
            <DocsExample add="Update Hospital"> 
            <form>
            <CRow>
                <CCol xs>
              Facility Code
                  <CFormInput type="text" value={inputs.hospitalCode} name="hospitalCode" placeholder="Primary Healthcare Code" onChange={handleChange}  />
                </CCol>
                <CCol xs>
                Facility Name
                  <CFormInput type="text" value={inputs.name} name="name" placeholder="Primary Healthcare Name" onChange={handleChange}/>
                </CCol>
              </CRow>
                 <CRow>
                <CCol xs>
              Mobile
                  <CFormInput type="text" value={inputs.phone} name="phone" placeholder="Primary Healthcare Mobile" onChange={handleChange}  />
                </CCol>
                <CCol xs>
               Email
                  <CFormInput type="email" value={inputs.email} name="email" placeholder="Primary Healthcare Email" onChange={handleChange}/>
                </CCol>
              </CRow>
       
      <CRow>
      <CCol xs>
     Country
       <CFormSelect name="countryId"  onChange={handleChange} onBlur={loadRegion} >
       <option value={0} disabled selected>--select Country--</option>
      { 
      country.map((item)=>(
        <option value={item.id} selected={item.id===inputs.countryId? 'selected':''}>{item.code + ' - ' + item.name} </option>
      ))
      }
      
       </CFormSelect>
      </CCol >
      <CCol xs>
          Region
         <CFormSelect name="regionId"  onChange={handleChange} onBlur={loadStates} >
       <option value={0} disabled selected>--select Region--</option>
      { 
      regions.map((item)=>(
        <option value={item.id} selected={item.id===inputs.regionId? 'selected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
      </CCol>
      </CRow>
    <CRow>
    <CCol xs>
State
         <CFormSelect name="stateId"  onChange={handleChange} onBlur={loadLgas}>
       <option value={0} disabled selected>--select State--</option>
      { 
      states.map((item)=>(
        <option value={item.id} selected={item.id===inputs.stateId? 'selected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
    </CCol>
    <CCol xs>
         LGA
         <CFormSelect name="lgaId"  onChange={handleChange}  onBlur={loadWards}>
       <option value={0} disabled selected>--select Lga--</option>
      { 
      lgas.map((item)=>(
        <option value={item.id} selected={item.id===inputs.lgaId? 'selected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
    </CCol>
    </CRow>
    <CRow>
    <CCol xs>
    Ward
         <CFormSelect name="wardId"  onChange={handleChange}>
       <option value={0} disabled selected>--select State--</option>
      { 
      wards.map((item)=>(
        <option value={item.id} selected={item.id===inputs.wardId? 'selected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
    </CCol>
    <CCol xs>
    Bank
       <CFormInput type="text" value={inputs.bank} name="bank" onChange={handleChange} />

    </CCol>
    </CRow>
       <CRow>
       <CCol xs>
     AccNo#
         <CFormInput type="text" value={inputs.accnumber} name="accnumber" onChange={handleChange} />
       </CCol>
       <CCol xs>
  SortCode
       <CFormInput type="text" value={inputs.sortCode} name="sortCode" onChange={handleChange} />
       </CCol>
       </CRow>
         <CRow>
      <CCol>Address
      
       <CFormTextarea value={inputs.address} name="address" rows={3} placeholder="Primary Healthcare Address" onChange={handleChange}  ></CFormTextarea>
       </CCol>  
       </CRow>
     <CRow>
     <CCol>
      Contact Address
      <CFormTextarea value={inputs.contactAddress} name="contactAddress" rows={3} placeholder="Primary Healthcare contact Address" onChange={handleChange}  ></CFormTextarea>
     </CCol>
     </CRow>
<CRow>
<CCol>
<br />
       {permissions.indexOf("ADD_HOSPITAL") > -1?
         <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleUpdate(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>UPDATE</span>
        </LoadingButton>
       <Goback url='/hospitals' />
       </Stack> :  <Goback url='/hospitals' />}
       </CCol>
    </CRow>
         </form>
        </DocsExample>
        </CCardBody>
        </CCard>
        </CCol>
        </CRow>
       
    )
}

export default EditHospital