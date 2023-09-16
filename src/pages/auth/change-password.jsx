import app from '../../helpers/axiosConfig'
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';
import { Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import showToastMessage from '../../components/toast';
import Goback from '../../components/goback';
import validateForm from '../../components/validateForm'
const ChangePassword = () =>{
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false)
    const {currentUser, permissions, logout } = useContext(AuthContext);
    const navigate = useNavigate()
const [ inputs, setInputs ] = useState({
       username: currentUser?.username,
       password: "",
       conpassword: '',
       id:currentUser?.id,
       cpassword: ''
    })
 const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
    }
    const handleUpdate = async e =>{
    try{
       if(validateForm('password') === 0){
        if(!(inputs.password === inputs.conpassword)) {
           showToastMessage("Password mismatch found!", 'error')
        }
        else
        if(inputs.password ==='' || inputs.conpassword === '') showToastMessage("Password required !", 'error')
         setLoading(true)
        const res = await app.put(`/changepassword/${inputs.id}`, inputs).then(res=>{
          setLoading(false)
          showToastMessage('Password changed successfully', 'success')
        }).catch(err=>{
          setLoading(false)
           showToastMessage('Password change failed ...: '+ err, 'error')
        })
       
     if(res.status === 200){if ( logout()){
            navigate("/")
           } }

       }
    }
    catch(errs){
        setMsg("Unable to change the password!. Reason: " + errs.code)
    }

    }
return(
  <CRow >
<CCol xs={12} xl={8} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>CHANGE PASSWORD</strong>
          </CCardHeader>
          <CCardBody className='password'>
            
            <DocsExample add="Change Password"> 

            <CRow>
            <CCol xs={12} xl={12}>
            Username
             <CFormInput type="text" readOnly name="username" value={currentUser.username} />
            </CCol>
            </CRow>
            <CRow>
            <CCol xs={12} xl={12}>
            Current Password
             <CFormInput type="password" name="cpassword" value={inputs.cpassword} onChange={handleChange} />
            </CCol>
            </CRow>
            <CRow>
            <CCol xs={12} xl={12}>
            New Password
     <CFormInput type="password" name="password" value={inputs.password} onChange={handleChange} />
            </CCol>
            </CRow>
            <CRow>
            <CCol xs={12} xl={12}>
             Confirm Password
     <CFormInput type="password" name="conpassword" value={inputs.conpassword} id="conpassword" onChange={handleChange} />
            </CCol>
            </CRow>
            <CRow>
            <CCol>
            <br />
            <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleUpdate()
          }
endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>CHANGE</span>
        </LoadingButton>       
        <Goback url='/' />
          </Stack> 
            </CCol>
            </CRow>
            </DocsExample>
            </CCardBody>
            </CCard>
            </CCol>
            </CRow>


)

}
export default ChangePassword