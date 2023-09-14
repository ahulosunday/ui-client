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
import { pin } from '../../../helpers/customAlphabet';
import { render } from "@react-email/render";
import hostUrl from '../../../helpers/hostUrl';
import app from '../../../helpers/axiosConfig';

const Page404 = () => {
    const [inputs, setInputs]=useState({email: ''})
    const navigate = useNavigate()
    const handleReset = async e =>{
      var doc = document.getElementById('wait');
   doc.innerHTML ="please wait ...";
   doc.disabled = true;
        if(inputs.email === ''){
            showToastMessage('Invalid email address', 'error')
            doc.innerHTML ="Search";
            doc.disabled = false;
        }
        else{
             await app.get(`/find/email/1/${inputs.email}/1/1/1/1`)
             .then(async res=>{
              if(res.data.length === 0){
                doc.innerHTML ="Search";
            doc.disabled = false;
                showToastMessage('Unable to associate this email with any account in our portal, check your email and try again', 'error')
              }
              else{
                const newpass = pin;
             await app.put(`/Resetpassword/${res.data.id}/1/0`, {username:res.data.username, password: newpass})
             .then( async change=>{
              const emailHtml = render(<><h2>Recovery password request!</h2><p>Dear {res.data.surname}, <br />Your password has been reset successfully.<br />Username: {res.data.username} <br />New password: {newpass} <br />Note: Your are adviced to change the password after logged in.<br /> Visit <a href={hostUrl}> here</a> to login. <br /> <hr /> Thanks.<br /> Management Team.</p></>);
             await app.post('/sendmail/user/auth/email/send',{to: inputs.email, msg: emailHtml, subject: 'Reset password'})
             .then(pss=>{
              showToastMessage('The password link has been sent to your email. Kindly follow the instruction therein to reset your password.', 'success')
               navigate('/login')
             })
              
             })
        
              }
             })
             .catch(err=>{
              doc.innerHTML ="Search";
            doc.disabled = false;
              showToastMessage('Internal Error: unable to associate this email with any account in our portal, check your email and try again', 'error')
            
             })
             
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
              <CButton color="info" style={{cursor:'pointer'}} onClick={handleReset} id = "wait">Search</CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
