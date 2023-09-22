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
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import React, {useContext, useEffect, useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Alert, Stack } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from '../../../context/authContext';
import DefaultLogo from '../../../img/logo2.png'
import PayOptions from '../payment/payOptions'
import validateForm from '../../../components/validateForm';

const Logins = () => {
      const {currentUser, login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const  navigate = useNavigate();
   
    //=========================
     const [ err, setError ] = useState(null)
    const msg = useLocation().state
    const [ inputs, setInputs ] = useState({
        username: "",
        password: "",
       
    })

    const handleForgot = async e =>{
      //handle forget password here
      navigate('/forgot')
    }

   useEffect(() => {
        if (currentUser){
            return navigate("/");
        }
      setError(msg)
    },[currentUser,msg, navigate]);
    const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        }
      
   const handleSummit = async e =>{
    
             e.preventDefault()
            if(validateForm('login') === 0){
           login(inputs)
           //setError(<Alert severity="success">Redirecting, please wait ...</Alert>)
          if(!currentUser){
            setError(<Alert severity="error">Invalid Username/Password</Alert>)
            } 
           
            }
            
       
   }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center" >
      <CContainer>
        <CRow className="justify-content-center" >
          <CCol md={8} xs={12} xl={5}>
            <CCardGroup>
            
              <CCard className="p-6">
                 
                <CCardBody style={{backgroundColor:'AppWorkspace', border: '1px solid darkgreen'}}>
               
                  <CForm className="login">
                   
                    <p className="text-medium-emphasis" style={{textAlign:'center'}}>
                     <img style={{marginTop:0, borderRadius:'30px', width:'20%'}} src={DefaultLogo} alt='' />
                     <br />
                    <span style={{color:'teal'}}> e-NHIA PORTAL</span> 
                   
                </p>
                <span style={{color:'red'}}>{err}</span>
                <br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" name='username' onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        name='password'
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                                   <Stack direction="row" spacing={1} > <LoadingButton size="small"
          onClick={(e) => handleSummit(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Login
        </LoadingButton>  
        </Stack>
       

       
                      </CCol>
                      <CCol xs={12}>
                      
                                
                        <CButton color="link" className="px-0" style={{textDecoration:'none'}} onClick={handleForgot}>
                          Forgot password?
                        </CButton> | <Link to={'/register'}>Click here for new User</Link>
                      </CCol>
                    </CRow>
                  </CForm>
                 
                   
                </CCardBody>
              </CCard>
            
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Logins
