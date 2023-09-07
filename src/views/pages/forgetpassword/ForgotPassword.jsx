import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass, cilMedicalCross } from '@coreui/icons'
import showToastMessage from '../../../components/toast'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
    const [inputs, setInputs]=useState({email: ''})
    const navigate = useNavigate()
    const handleReset = async e =>{
        if(inputs.email === ''){
            showToastMessage('Invalid email address', 'error')
        }
        else{
             showToastMessage('The password link has been sent to your email. Kindly follow the instruction therein to reset your password.', 'success')
          navigate('/login')
          }
         }
        
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
         }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6} xs={12} xl={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">Recovery</h1>
              <h4 className="pt-3">Don't worry, we will help you recover your password !</h4>
              <p className="text-medium-emphasis float-start">
                Kindly provide your registered email address.
              </p>
            </div>
            <CInputGroup className="input-prepend">
              <CInputGroupText>
            @
              </CInputGroupText>
              <CFormInput type="email" name='email' placeholder="Enter your registered email address ..." onChange={handleChange} />
              <CButton color="info" style={{cursor:'pointer'}} onClick={handleReset}>Search</CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
