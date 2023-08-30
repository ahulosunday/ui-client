import { Box, Modal, Typography } from '@mui/material';
import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import app from '../../helpers/axiosConfig';
import showToastMessage from '../../components/toast';
import { AuthContext } from '../../context/authContext';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';


const style ={
  position:'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  margin: 0,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 2,
  p:4
};
export default function ChangePort(){
 const [opens, setOpen ] = React.useState(false)
 const [imgUrl, setImgUrl] = React.useState("")
  const handleOpen =() => setOpen(true)
   const [file, setFile] = React.useState(null)
  const navigate = useNavigate()
   const {currentUser } = React.useContext(AuthContext);
  const handleClose = ()=>{
    navigate('/')
  }
  React.useEffect(()=>{
    handleOpen()
  })
  const uploadPaaport = async e=>{
     const formData = new FormData();
            formData.append('file', file)
          await app.post('/uploadfile', formData).then( async res =>{
            await app.put(`/upload/${currentUser?.id}/change`,{imgurl: res.data.filename} ).then(res1=>{
               showToastMessage('File uploaded successfully', 'success')
            }).catch(err2=>{
              showToastMessage("Unable to upload file ...: " + err2, 'error')
            })
          }).catch(err=>{
            showToastMessage("Unable to upload file ...", 'error')
          })

  }
    return(
 <Modal open={opens} aria-labelledby ="modal-modal-title" aria-descriptionby="modal-modal-description">
      <Box sx={style}>
       <CCol xs={12} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>CHANGE PROFILE PICTURE</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="Upload Profile picture">   
      <Typography className='changePassport' id="modal-modal-description" sx={{mt:2}}>
      <div style={{textAlign:'right'}}><img height={100} width={100} src={imgUrl} /></div>
      <CRow>
      <CCol xs>
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
      <CCol xs>
      <br />
       <CButton onClick={uploadPaaport}>Upload</CButton>
       <div style={{textAlign:'right'}}><Link style={{textDecoration:'none', color:'red'}} to="/" >Close</Link></div>
      </CCol>
      </CRow>
    </Typography>
      </DocsExample>
      </CCardBody>
      </CCard>
      </CCol>
      </Box>
      </Modal>
    )
}