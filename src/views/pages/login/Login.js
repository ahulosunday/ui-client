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
import { Stack } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from '../../../context/authContext';
import DefaultLogo from '../../../img/logo2.png'


const Login = () => {
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
          
        try{ 
             e.preventDefault()
            setLoading(true)
           login(inputs)
             setLoading(false)
           }
        catch(errs){
            setLoading(false)
            setError("Invalid username or password");
            navigate("/login")

        }


        
       
   }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center" >
      <CContainer>
        <CRow className="justify-content-center" >
          <CCol md={8} xs={12} xl={6}>
            <CCardGroup>
            
              <CCard className="p-6">
                 
                <CCardBody style={{backgroundColor:'AppWorkspace', border: '1px solid darkgreen'}}>
               
                  <CForm>
                   
                    <p className="text-medium-emphasis" style={{textAlign:'center'}}>
                     <img style={{marginTop:0, borderRadius:'30px'}} src={DefaultLogo} alt='' />
                     <br />
                    <span style={{color:'teal'}}> e-NHIA PORTAL</span> 
                   
                </p>
                <span style={{color:'red'}}>{msg}</span>
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
                      <CCol xs={6}>
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
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" style={{textDecoration:'none'}} onClick={handleForgot}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                   <span>Don't you have an account? <Link to="/register" style={{color:'red', textDecoration:'none'}}>Register</Link></span> | <span className="text-right"> <Link to="/payment/option" style={{textDecoration:'none'}}>Payment Options</Link></span>
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
