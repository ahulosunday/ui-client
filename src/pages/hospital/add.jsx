import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import showToastMessage from '../../components/toast';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';

const AddHospital = () =>{
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState([])
    const [regions, setRegion] = useState([])
    const [states, setStates] = useState([])
    const [lgas, setLgas] = useState([])
    const [wards, setWards] = useState([])
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
    const [ inputs, setInputs ] = useState({
       name: '',
       address: '',
       contactAddress: '',
       phone: '',
       email: '',
       userId: currentUser?.id,
       hospitalCode: "",
       countryId: "",
       regionId: '',
       stateId: '',
       lgaId: '',
       bank:'',
       accnumber:'',
       sortCode:'',
       wardId:''
    })
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
  
    const handleSubmit = async e =>{
   
        try{
            e.preventDefault()
            setLoading(true)
     await app.post('/hospital', inputs)
        .then(res=>{
           if(res.status === 200){
            setLoading(false)
            showToastMessage('Transaction completed with status: '+res.statusText, 'success')
           navigate('/hospitals')
      }
        })
        .catch(err=>{
          setLoading(false)
           showToastMessage('Operation failed. Reason: Duplicate data might be found or all fields are required ... ', 'error')
        })
       
     
         
        }
        catch(errs){
       setLoading(false)
         showToastMessage('Operation failed with:'+ errs, 'error')
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
         showToastMessage('Error occured ...', 'error')
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
         showToastMessage('Error occured ...', 'error')
        }
    }
    //===============load lga===========
    const loadLgas =async e =>{
      try{
          const stateId = e.target.value
          await app.get(`/lga/state/${stateId}`).then(res=>{
            setLgas(res.data);
          }).catch(err=>{
            showToastMessage(err, 'error')
          })
        }catch(err){
         showToastMessage('Error occured ...', 'error')
        }
    }
       //===============load ward===========
    const loadWards =async e =>{
      try{
          const lgaId = e.target.value
       await app.get(`/ward/lga/${lgaId}`).then(res=>{
        setWards(res.data);
      }).catch(err=>{
        showToastMessage(err, 'error')
      })
      }catch(err){
         showToastMessage('Error occred ...', 'error')
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
         showToastMessage('Error occured ...', 'error')
        }
     } 
    loadItem()
    if(!(permissions.indexOf("ADD_HOSPITAL") > -1)){
      navigate('/')
    }
    }, [permissions, navigate])


    
    return (
       <CRow >
<CCol xs={12} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ADD ACCREDITED PRIMARY HEALTHCARE</strong>
          </CCardHeader>
          <CCardBody>
            
            <DocsExample add="Update Hospital"> 
            <form>
            <CRow>
                <CCol xl={6} xs={12}>
              Facility Code
                  <CFormInput type="text" value={inputs.hospitalCode} name="hospitalCode" placeholder="Primary Healthcare Code" onChange={handleChange}  />
                </CCol>
                <CCol xl={6} xs={12}>
                Facility Name
                  <CFormInput type="text" value={inputs.name} name="name" placeholder="Primary Healthcare Name" onChange={handleChange}/>
                </CCol>
              </CRow>
                 <CRow>
                <CCol xl={6} xs={12}>
              Mobile
                  <CFormInput type="text" value={inputs.phone} name="phone" placeholder="Primary Healthcare Mobile" onChange={handleChange}  />
                </CCol>
                <CCol xl={6} xs={12}>
               Email
                  <CFormInput type="email" value={inputs.email} name="email" placeholder="Primary Healthcare Email" onChange={handleChange}/>
                </CCol>
              </CRow>
       
      <CRow>
      <CCol xl={6} xs={12}>
     Country
       <CFormSelect name="countryId"  onChange={handleChange} onBlur={loadRegion} >
       <option value={0} disabled selected>--select Country--</option>
      { 
      country.map((item)=>(
        <option value={item.id}>{item.code + ' - ' + item.name} </option>
      ))
      }
      
       </CFormSelect>
      </CCol >
      <CCol xl={6} xs={12}>
          Region
         <CFormSelect name="regionId"  onChange={handleChange} onBlur={loadStates} >
       <option value={0} disabled selected>--select Region--</option>
      { 
      regions.map((item)=>(
        <option value={item.id}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
      </CCol>
      </CRow>
    <CRow>
    <CCol xl={6} xs={12}>
State
         <CFormSelect name="stateId"  onChange={handleChange} onBlur={loadLgas}>
       <option value={0} disabled selected>--select State--</option>
      { 
      states.map((item)=>(
        <option value={item.id}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
    </CCol>
    <CCol xl={6} xs={12}>
         LGA
         <CFormSelect name="lgaId"  onChange={handleChange}  onBlur={loadWards}>
       <option value={0} disabled selected>--select Lga--</option>
      { 
      lgas.map((item)=>(
        <option value={item.id}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
    </CCol>
    </CRow>
    <CRow>
    <CCol xl={6} xs={12}>
    Ward
         <CFormSelect name="wardId"  onChange={handleChange}>
       <option value={0} disabled selected>--select State--</option>
      { 
      wards.map((item)=>(
        <option value={item.id}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
    </CCol>
    <CCol xl={6} xs={12}>
    Bank
       <CFormInput type="text" name="bank" onChange={handleChange} />

    </CCol>
    </CRow>
       <CRow>
       <CCol xl={6} xs={12}>
     AccNo#
         <CFormInput type="text" name="accnumber" onChange={handleChange} />
       </CCol>
       <CCol xl={6} xs={12}>
  SortCode
       <CFormInput type="text" name="sortCode" onChange={handleChange} />
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
          onClick={(e) => handleSubmit(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Submit</span>
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

export default AddHospital