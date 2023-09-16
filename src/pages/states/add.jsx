import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import SendIcon from '@mui/icons-material/Send';
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import showToastMessage from '../../components/toast';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';
import validateForm from '../../components/validateForm';

const AddStates = () =>{
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState([])
    const [regions, setRegion] = useState([])
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
       code: "",
       countryId: "",
       regionId: '',
            
    })
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
  
    const handleSubmit = async e =>{
       e.preventDefault()
        try{
          if(validateForm('validateForm') === 0){
          setLoading(true)
     await app.post('/state', inputs).then(res=>{
        setLoading(false)
        showToastMessage('One record added successfully.', 'success')
         navigate('/state')
      }).catch(err=>{
        setLoading(false)
        showToastMessage('Unable to add record. Reason: All fields are required ...', 'error')
      })
        }
        }
        catch(errs){
        setLoading(false)
        showToastMessage('Unable to add record.', 'error')
        }
    }
    //============load region=========/region/:countryId
    const loadRegion =async e =>{
      try{
          const countryId = e.target.value
          const getRegions = await app.get(`/region/country/${countryId}`)
          setRegion(getRegions.data);
       
    }catch(err){
        
        showToastMessage('Unable to load regions data.', 'error')
        }
    }
    useEffect(()=>{
const loadItem = async e =>{
 try{
          
        const getCountry = await app.get('/country')
         setCountry(getCountry.data);
         
       
    }catch(err){
        showToastMessage('Unable to load country data.', 'error')
        }
     
        
    } 
    if(!(permissions.indexOf("ADD_STATES") > -1)){
      navigate('/')
    }
    loadItem()
    }, [permissions, navigate])


    
    return (
         <CRow >
         <CCol xs={12} style={{fontSize:'12px'}} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ADD STATES</strong>
          </CCardHeader>
          <CCardBody className='validateForm'>
            <DocsExample add="States"> 
            <CRow>
            <CCol xs>
            Country
              <CFormSelect name="countryId"  onChange={handleChange} onBlur={loadRegion} >
       <option value={0} disabled selected>--select Country--</option>
      { 
      country.map((item)=>(
        <option key={item.id} value={item.id}>{item.code + ' - ' + item.name} </option>
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
        <option value={item.id}>{item.name} </option>
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
          onClick={(e) => handleSubmit(e)
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

export default AddStates