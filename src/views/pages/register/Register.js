import React, {useContext, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { v1 } from "uuid";
import app from '../../../helpers/axiosConfig'
import {AuthContext} from "../../../context/authContext";
//import { trackPromise } from "react-promise-tracker";
import SendIcon from '@mui/icons-material/Send';
import validateForm from "../../../components/validateForm";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { AiFillAccountBook, AiFillAlert, AiFillCompass, AiFillDownCircle, AiFillEye, AiFillFolderOpen, AiFillPhone, AiTwotonePicture } from "react-icons/ai";
import showToastMessage from "../../../components/toast";
import DefaultLogo from '../../../img/logo2.png'
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Stack } from "@mui/material";
import { DocsExample } from "../../../components";


const Register = () => {
  
    const {currentUser } = useContext(AuthContext);
    const  navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (currentUser){
            return navigate("/");
        }
    },[currentUser]);
      const [ err, setError ] = useState(null)
     const [conpassword, setConpassword] = useState('')
    const [file, setFile] = useState(null)
     const [surname, setSurname] = useState('')
      const [phone, setPhone] = useState('')
       const [othername, setOthername] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [roleid, setRolid] = useState(3)
    const [uiid, setUiid] = useState(v1())
    const [ imgurl , setImgUrl] = useState("")
    const img = ['png', 'jpeg', 'jpg', 'gif']


   const handleSummit = async e =>{
        e.preventDefault()
        try{
       if(validateForm('register') === 0){
          setLoading(true)
         if(conpassword !== password){
          showToastMessage('Password mismatch found !', 'error')
          setLoading(false)
          setError('Password mismatch found !')
         }
         else{ 
          const ext = file.name.split('.')[1]
          if(file.length === 0){
            showToastMessage('Please upload passport size photograph', 'error')
            setError('Please upload passport size photograph', 'error')
            setLoading(false)
          }
          else if((file.size/1024) > 40){
            showToastMessage('Image size must not be greater than 40kb', 'error')
            setLoading(false)
            setError('Image size must not be greater than 40kb')
          }
          else if(img.includes(ext)){
            const formData = new FormData();
        formData.append('file', file)
        await app.post('/uploadfile', formData).then(async res =>{
        await app.post("/users", {username:username, password:password, email:email,uiid:uiid, roleid:roleid, imgurl:res.data.filename, surname: surname, othername: othername, phone: phone, isActive: 0})
        .then(res =>{
          setLoading(false)
             navigate("/payment/option", {state:username});
        })
        .catch(errs=>{
           setLoading(false)
             setError(errs.message )
        }) 
       }).catch(errs=>{
         setLoading(false)
        showToastMessage("No image found", 'error')
       })
         }
         else{
          showToastMessage('Invalid image format ...', 'error')
          setLoading(false)
         }
         }
        }
        }
        catch(errs){
          setLoading(false)
            setError("Something went wrong. All fields are required. please check your entry and try again") 
           
        }
        
   }

    // Function will execute on click of button
    const onButtonClick = () => {
        // using Java Script method to get csv file
        fetch('uploadList.csv').then(response => {
            response.blob().then(blob => {
                // Creating new object of csv file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'uploadList.csv';
                alink.click();
            })
        })
    }
  return (
   <div className="bg-light min-vh-100 d-flex flex-row align-items-center" >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12} xs={12} xl={8}>
            <CCard className="p-6">
              <CCardBody className="p-6" style={{backgroundColor:'AppWorkspace', border: '0.5px solid darkgreen'}}>
                <CForm className="register">
                
                    <p className="text-medium-emphasis" style={{textAlign:'center'}}>
                     <img style={{marginTop:0, borderRadius:'30px'}} src={DefaultLogo} alt='' />
                     <br />
                    <span style={{color:'teal'}}> e-NHIA PORTAL</span> 

                    <br />
                    
                   
                </p>
<CRow>
<CCol>
   <CCard className="mb-12" >
         
          <CCardBody>
            <DocsExample add="PRE-REGISTRATION FORM"> 

            
                 
                            <div style={{textAlign:'right'}} ><img className="uploadImg" alt="" src={imgurl} style={{height:'100px', width:'100px'}}  id="cxfileimg" />
           <br /> <span style={{color: 'red', fontSize: 9}}>Image size: 40kb, type: png, jpeg, jpg, gif</span>
           </div>
           <CRow>
            <CCol xl={6} xs={12}>
                   <CInputGroup className="mb-3 sm-12">
                    <CInputGroupText>
                      <AiTwotonePicture />
                    </CInputGroupText>
                    <CFormInput placeholder="Surname" title="Surname" name="surname" autoComplete="surname" onChange={e =>setSurname(e.target.value)}  />
  </CInputGroup>
  </CCol>
           <CCol xl={6} xs={12}>
                     <CInputGroup className="mb-4">
          
                    <CFormInput title="Upload passport" type="file" name="file" onChange={e =>{
            setFile(e.target.files[0])
            setImgUrl(URL.createObjectURL(e.target.files[0]));}}
                    />
                  </CInputGroup>
                  </CCol>
                 
           </CRow>
           <CRow>
           <CCol xl={6} xs={12}>
   <CInputGroup className="mb-3 sm-12">
                    <CInputGroupText>
                      <AiFillAlert />
                    </CInputGroupText>
                    <CFormInput placeholder="Othername" title="Othername" name="othername" autoComplete="othername" onChange={e =>setOthername(e.target.value)}  />
                  </CInputGroup>
                  </CCol>
                   <CCol xl={6} xs={12}>
                  <CInputGroup className="mb-3 sm-12">
                    
                    <CInputGroupText>
                      <AiFillPhone />
                    </CInputGroupText>
                    <CFormInput placeholder="Phone Number" title="Phone number" name="phone" autoComplete="phone" onChange={e =>setPhone(e.target.value)}  />
                  </CInputGroup>
                  </CCol>
                  </CRow>
                  <CRow>
                   <CCol xl={6} xs={12}>
                   <CInputGroup className="mb-3 sm-12">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" title="Email address" type="email" name="email" autoComplete="email" onChange={e =>setEmail(e.target.value)}  />
                  </CInputGroup>
                  </CCol>
                   <CCol xl={6} xs={12}>
                    <CInputGroup className="mb-3 sm-12">
                    <CInputGroupText>
                      <AiFillEye />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" title="Username" name="username" autoComplete="username" onChange={e =>setUsername(e.target.value)}  />
                  </CInputGroup>
                  </CCol>
                  </CRow>
                  <CRow>
                   <CCol xl={6} xs={12}>
                  <CInputGroup className="mb-3 sm-12">
                    <CInputGroupText>
                      <AiFillCompass />
                    </CInputGroupText>
                    <CFormInput
                      type="password" title="Password"
                      placeholder="Password"
                      name="password"
                      autoComplete="new-password"
                      onChange={e =>setPassword(e.target.value)} 
                    />
              </CInputGroup> 
              </CCol>
               <CCol xl={6} xs={12}>
               <CInputGroup className="mb-3 sm-12">
                    <CInputGroupText>
                      <AiFillCompass />
                    </CInputGroupText>
                    <CFormInput
                      type="password" title="Confirm password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={e =>setConpassword(e.target.value)} 
                      name="conpassword"
                    />
                  </CInputGroup>
                 </CCol>
                 </CRow>
                 <CRow>
                  <CCol xl={6} xs={12}>
                  <div className="d-grid">
                   <Stack direction="row" spacing={1} > <LoadingButton size="small"
          onClick={(e) => handleSummit(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
         Create
        </LoadingButton> 
        </Stack>
            </div>
            </CCol>
             <CCol xl={6} xs={12}>
              <Link style={{textDecoration:'none', textAlign:'right'}} to="/login" title="Already have an account then go to login">Already have an account?</Link> | <Link title="Download Group Registration file Format for bulk upload" onClick={onButtonClick}>< FileDownloadIcon />Download</Link>
       
             </CCol>
             </CRow>
                  </DocsExample>
            </CCardBody>
            </CCard>
</CCol>
</CRow>
<CRow>
 <CCol xl={12} xs={12} style={{textAlign:'center', color:'red'}}>{err}
 </CCol>
</CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
   </div>
  )
}

export default Register
