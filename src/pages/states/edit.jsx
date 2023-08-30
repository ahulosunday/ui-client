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


const EditStates = () =>{
 const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState([])
    const {currentUser, permissions } = useContext(AuthContext);
       const state = useLocation().state
    const navigate = useNavigate()
     const [regions, setRegion] = useState([])
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       code: "",
       countryId: "",
       id: '',
       regionId: ''
            
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
            showToastMessage('Error occured while loading Country data ...', 'error')
          })  
    }catch(err){
         showToastMessage('Error occured ...', 'error')
        }
    }
    //=============================
     const handleUpdate = async e =>{
       e.preventDefault()
        try{
          setLoading(true)
       await app.put(`/state/${inputs.id}`, inputs)
       .then(res=>{
        if(res.status === 200){
          setLoading(false)
          showToastMessage('One record has been updated successfully', 'success')
          navigate('/state')
        }
       })
       .catch(err=>{
        setLoading(false)
       showToastMessage('Unable to perform the operation ..., ' + err, 'error')
       })
        }
        catch(errs){
          setLoading(false)
       showToastMessage("Invalid data entry, check the entry and try again", 'error')
        }
    }
    useEffect(()=>{
const loadItem = async e =>{
 try{
          
      await app.get('/country').then(res=>{
        setCountry(res.data);
       }).catch(err=>{
        showToastMessage(err, 'error')
       })}catch(err){
         showToastMessage('Error occured ...', 'error')
        }
        } 

    const formData = async e =>{
        try{
         if(state !== null){
         trackPromise(app.get(`/state/${state}`)
         .then(res=>{
          setInputs(res.data)
         })
         .catch(err=>{
          showToastMessage('Unable to load the selected data, ...' + err, 'error')
         })
         )}
        }
        catch(err){
         showToastMessage('Error occured while loading data ...', 'error')
        }
    }
    if(!(permissions.indexOf("EDIT_STATES") > -1)){
      navigate('/')
    }
    formData()
    loadItem()
    }, [state, permissions, navigate])

    return (
           <CRow >
         <CCol xs={12} style={{fontSize:'12px'}} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>EDIT STATES</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="States"> 
            <CRow>
            <CCol xs>
            Country
              <CFormSelect name="countryId"  onChange={handleChange} onBlur={loadRegion} >
       <option value={0} disabled selected>--select Country--</option>
      { 
      country.map((item)=>(
        <option key={item.id} selected={(inputs.countryId === item.id)?'selected':''} value={item.id}>{item.code + ' - ' + item.name} </option>
      ))
      }
      
       </CFormSelect>
            </CCol>
            <CCol xs>
            Region
            <CFormSelect name="regionId"  onChange={handleChange} >
       <option value={0} disabled selected>--select Region--</option>
      { 
      regions.map((item)=>(
        <option value={item.id} selected={(inputs.regionId === item.id)?'selected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs>
             State 
       <CFormInput type="text" value={inputs.name} name="name" placeholder="State Name" onChange={handleChange}  />
     
            </CCol>
            <CCol xs>
            Code 
        <CFormInput type="text" value={inputs.code} name="code" placeholder="State Code" onChange={handleChange} />
            </CCol>
             
            </CRow>
            <CRow>
            <CCol xs>
           <br />
       { permissions.indexOf("ADD_STATES") > -1? 
       <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleUpdate(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="start"
          variant="contained"
        >
          <span>Submit</span>
        </LoadingButton> <Goback url='/state' />
        </Stack>:
        <Goback url='/state' />}
       </CCol>
            </CRow>
            </DocsExample>
            </CCardBody>
            </CCard>
            </CCol>
            </CRow>
    
       
    )
}

export default EditStates