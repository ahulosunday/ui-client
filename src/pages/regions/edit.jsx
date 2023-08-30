import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import SendIcon from '@mui/icons-material/Send';
import showToastMessage from '../../components/toast';
import { trackPromise } from 'react-promise-tracker';
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';

const EditRegion = () =>{
    const [loading, setLoading] = useState(false);
     const [country, setCountry] = useState([]);
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
     const state = useLocation().state
    // const id = useLocation().pathname.split("/")[1]
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id,
      countryId: '', 
      id: '',    
    })
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
    const handleUpdate = async e =>{
        try{
        e.preventDefault();
        setLoading(true)
       await app.put(`/region/${inputs.id}`, inputs)
       .then(res=>{
        if(res.statusText === 'OK'){
          setLoading(false)
          showToastMessage('Update complete ...', 'success')
         navigate('/region')
      }
       })
       .catch(err=>{
        setLoading(false)
        showToastMessage('Update failed ...: ' + err, 'error')
       })  
        }
        catch(errs){
            showToastMessage('Update failed ...: ', 'error')
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
     const formData = async e =>{
        try{
         
         await app.get(`/region/${state}`)
          .then(res=>{
            setInputs(res.data)
          })
          .catch(err=>{
            showToastMessage('Error occured while loading data ...: ' + err, 'error')
          })
         
           
           }
        catch(err){
           showToastMessage('Error occured while loading data ..', 'error')
        }
    }
     if(!(permissions.indexOf("EDIT_REGIONS") > -1)){
      navigate('/')
     }
         formData()
    loadItem()
    }, [state, permissions, navigate])


    
    return (
       <CRow >
<CCol xs={12} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>EDIT REGIONS</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="Regions"> 
       <CRow>
       <CCol xs>
       Country
       <CFormSelect name="countryId"  onChange={handleChange} >
       <option value="0" disabled selected>--select Country--</option>
      { 
      country.length ===0 ? '': country.map((item)=>(
        <option key={item.id} value={item.id} selected={(inputs.countryId === item.id)?'selected':''}>{item.code + ' - ' + item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       <CCol xs>
       Region
        <CFormInput type="text" value={inputs.name} name="name" placeholder="Region" onChange={handleChange} />
       </CCol>
       </CRow>
     <CRow>
     <CCol xs>
    <br />
       {permissions.indexOf("EDIT_REGIONS") > -1? 
       <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleUpdate(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="start"
          variant="contained"
        >
          <span>Submit</span>
        </LoadingButton>
                  <Goback url='/region' />
        </Stack>
       :           <Goback url='/region' />}

       </CCol>
    </CRow>
       </DocsExample>
       </CCardBody>
       </CCard>
       </CCol>
       </CRow>
    )
}

export default EditRegion