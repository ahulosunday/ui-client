import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { AuthContext } from "../../context/authContext";
import app from "../../helpers/axiosConfig";
import baseURLStatic from "../../helpers/imageUrl";
import Barcodes from "../../components/barcode";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import QrCode from "../../components/QrCode";
const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'left',
}));

export default function Profile(){
 const {currentUser, permissions } = React.useContext(AuthContext);
 const [user, setUser] = React.useState([])
 const [err, setError] = React.useState('')
 const [userInfos, setuserInfo]= React.useState([])

React.useEffect(()=>{
    const getOne = async ()=>{
        await app.get(`/user/get/0/${currentUser?.id}/1/0/0/0/0`)
        .then(res=>{
      setUser(res.data)
      })
        .catch(err=>{
 setError(err)
        })
    }
    const userInfo = async ()=>{

      await app.get(`/register/${currentUser?.id}/userId/auth/f`)
      .then(result=>{
    setuserInfo(result.data[0])
   
      })
      .catch(errs=>{

      })
    }
    getOne()
    userInfo()
}, [currentUser])


    return(
         <CRow>
<CCol xs={12} xl={8} style={{fontSize:'12px'}}>
           <CCard className="mb-12"  >
           
          <CCardBody>
          <DemoPaper variant="outlined">
          <p style={{textAlign:'center'}}><b>ENROLEE BASIC PROFILE INFORMATION</b></p>
          <CRow>
           <CCol xl={2} xs={2}>
          <QrCode value={currentUser.uiid} />
          </CCol>
          <CCol xl={10} xs={10}>
         
          <div style={{textAlign:'right'}}><img height={60} width={60}  src={`${baseURLStatic}${user.imgurl}`} /></div>
      <span style={{textAlign:'center'}}><b >{userInfos.length !== 0 ? 'ID No#: ' + userInfos.idCode: 'ID No#: NHIA/FCT/0005656'}</b></span>
      </CCol>
     </CRow>
     <hr />
          <CRow>
          <CCol>
          NAME:
          </CCol>
          <CCol>
          {user.surname + ' ' + user.othername}
          </CCol>
          </CRow>
          <CRow>
          <CCol>
          PHONE:
          </CCol>
          <CCol>
          {user.phone}
          </CCol>
          </CRow>
          <CRow>
          <CCol>
          EMAIL ADDRESS:
          </CCol>
          <CCol>
          {user.email}
          </CCol>
          </CRow>
<CRow>
          <CCol>
          STAUS:
          </CCol>
          <CCol>
          {user.isActive === 1?<CheckIcon />:<ClearIcon />}
          </CCol>
          </CRow>
        
          </DemoPaper>
          </CCardBody>
          </CCard>
            
</CCol>
</CRow>
            
    )
}