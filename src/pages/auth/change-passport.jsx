import { Alert, Box, Modal, Typography } from '@mui/material';
import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import app from '../../helpers/axiosConfig';
import showToastMessage from '../../components/toast';
import { AuthContext } from '../../context/authContext';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';
import validateForm from '../../components/validateForm';
import baseURLStatic from '../../helpers/imageUrl';

const style ={
  position:'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  margin: 0,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 2,
  p:4
};
export default function ChangePort(){
 const [opens, setOpen ] = React.useState(false)
 const [err, setError ] = React.useState('')
 const [imgUrl, setImgUrl] = React.useState("")
  const handleOpen =() => setOpen(true)
   const [file, setFile] = React.useState(null)
  const navigate = useNavigate()
   const {currentUser } = React.useContext(AuthContext);
       const img = ['png', 'jpeg', 'jpg', 'gif', 'PNG', 'JPEG', 'JPG', 'GIF']
      

  const handleClose = ()=>{
    navigate('/')
  }
  React.useEffect(()=>{
    handleOpen()
  })
  const uploadPaaport = async e=>{
  
      if(validateForm('upload') === 0){
    const ext = file.name.split('.')[1]
          if(file.length === 0){
            setError(<Alert severity='error'>Please upload passport size photograph</Alert>)
          }
          else if((file.size/1024) > 100){
            setError(<Alert severity='error'>Image size must not be greater than 100kb</Alert>)
          }
          else if(img.includes(ext)){
     const formData = new FormData();
            formData.append('file', file)
          await app.post('/uploadfile', formData).then( async res =>{
            await app.put(`/upload/${currentUser?.id}/change`,{imgurl: res.data.filename} ).then(res1=>{
              if(res1.data.err) setError(<Alert severity='error'>{res1.data.err}</Alert>)
              else setError(<Alert severity='success'>File uploaded successfully</Alert>)
            }).catch(err2=>{
              setError(<Alert severity='error'>Unable to upload file ...:</Alert>)
            })
          }).catch(err=>{
            setError(<Alert severity='error'>Unable to upload file: {err.err}</Alert>)
          })
          }
          else{
            setError(<Alert severity='error'>Invalid image format ...</Alert>)
          }
    }

  }
    return(
 <Modal open={opens} aria-labelledby ="modal-modal-title" aria-descriptionby="modal-modal-description">
      <Box sx={style}>
       <CCol xs={12} xl={12} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>CHANGE PROFILE PICTURE</strong>
          </CCardHeader>
          <CCardBody className='upload'>
            <DocsExample add="Upload Profile picture">   
      <Typography className='changePassport' id="modal-modal-description" sx={{mt:2}}>
      <div style={{textAlign:'right'}}><img height={60} width={60}  src={ imgUrl? imgUrl : `${baseURLStatic}${currentUser?.imgurl}`} />
      <br />
      <span style={{color: 'red', fontSize: 9}}>Image size: 100kb, type: png, jpeg, jpg, gif</span>
      </div>
      
      <CRow>
      <CCol xs={12} xl={7}>
       <label>Passport</label>
      <CFormInput type="file" name="file" onChange={e =>{
            setFile(e.target.files[0])
            setImgUrl(URL.createObjectURL(e.target.files[0]));
         }
            
         }
         />
      </CCol>
      </CRow>
      <CRow>
      <CCol xs={12} xl={12}>
      <br />
       <CButton onClick={uploadPaaport}>Upload</CButton>
       <div style={{textAlign:'right'}}><Link style={{textDecoration:'none', color:'red'}} to="/" >Close</Link></div>
      </CCol>
      </CRow>
      <CRow>
      <CCol xl={12} xs={12}>
      {err}
      </CCol></CRow>
    </Typography>
      </DocsExample>
      </CCardBody>
      </CCard>
      </CCol>
      </Box>
      </Modal>
    )
}