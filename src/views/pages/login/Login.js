import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

import React, {useContext, useEffect, useState} from "react";

import DefaultLogo from '../../../img/logo2.png'

import ButtonBaseDemo from './image';


const Login = () => {
      
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center" >
      <CContainer>
        <CRow className="justify-content-center" >
          <CCol md={8} xs={12} xl={6}>
            <CCardGroup>
            
              <CCard className="p-6" style={{border: '1px solid darkgreen'}}>
                 <p className="text-medium-emphasis" style={{textAlign:'center'}}>
                     <img style={{marginTop:0, borderRadius:'30px'}} height={100} src={DefaultLogo} alt='' />
                     <br />
                    <span style={{color:'teal'}}> e-NHIA PORTAL</span> 
                   
                </p>
                <CCardBody style={{backgroundColor:'AppWorkspace'}}>        
                   <ButtonBaseDemo />
                   
                </CCardBody>
              </CCard>
            
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
