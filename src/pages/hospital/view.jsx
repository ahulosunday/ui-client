import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from '../../components'

const ViewHospital = () =>{
   const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
     const location = useLocation()
      const id = location.state//pathname.split("/")[1]
      const [inputs, setInputs] = useState([])
      const [lgas, setLgas] = useState('')
      const [regions, setRegions] = useState('')
      const [states, setStates] = useState('')
      const [countries, setCountries] = useState('')

    useEffect(()=>{

      if(!(permissions.indexOf("VIEW_HOSPITAL") > -1)){
     navigate('/')
      }
    }, [currentUser, permissions]);

     const formData = async e =>{
        try{
         
           const res = await app.get(`/hospital/${id}/hospital`)
           setInputs(res.data)
           
           setLgas(inputs.lga.name)
           setStates(inputs.state.name)
           setRegions(inputs.region.name)
           setCountries(inputs.country.name)    
          }
        catch(err){

        }
    }
    
      formData()

    return (
            <CRow >
<CCol xs={12} xl={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ACCREDITED PRIMARY HEALTHCARE</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              This page display the details of the selected hospital
            </p>
           
            <DocsExample  add="Hospital">
         <h1>{inputs.name}</h1>
         <CRow xs={6} xl={4}>
       <CCol >Hospital Code:</CCol> 
       <CCol>{inputs.hospitalCode}</CCol>
         
       </CRow>
       <CRow  xs={6} xl={4}>
       <CCol htmlFor="code">Hospital Name:</CCol> 
        <CCol>{inputs.name}</CCol>
       </CRow>
         <CRow  xs={6} xl={4}>
       <CCol htmlFor="name">Mobile:</CCol> 
    <CCol>{inputs.phone}</CCol>
       </CRow>
       <CRow  xs={6} xl={4}>
       <CCol htmlFor="code">Email Address</CCol> 
        <CCol>{inputs.email}</CCol>
       </CRow>
         <CRow  xs={6} xl={4}>
       <CCol htmlFor="name">Address:</CCol> 
       <CCol>{inputs.address}</CCol>
        
       </CRow>
       <CRow  xs={6} xl={4}>
       <CCol htmlFor="code">Contact Address:</CCol> 
     <CCol>{inputs.contactAddress}</CCol>
       </CRow>
        <CRow  xs={6} xl={4}>
       <CCol htmlFor="code">Lga:</CCol> 
     <CCol>{lgas}</CCol>
       </CRow>
       <CRow  xs={6} xl={4}>
       <CCol htmlFor="code">State:</CCol> 
     <CCol>{states}</CCol>
       </CRow>
       <CRow  xs={6} xl={4}>
       <CCol htmlFor="code">Region:</CCol> 
     <CCol>{regions}</CCol>
       </CRow>
       <CRow  xs={6} xl={4}>
       <CCol htmlFor="code">Country:</CCol> 
     <CCol>{countries}</CCol>
       </CRow>
       
          <Goback url='/hospitals' />
      
    
        </DocsExample>
        </CCardBody>
        </CCard>
        </CCol>
        </CRow>
        
       
    )
}

export default ViewHospital
