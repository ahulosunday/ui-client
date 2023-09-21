import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { AuthContext } from "../../context/authContext";
import app from "../../helpers/axiosConfig";
import baseURLStatic from "../../helpers/imageUrl";
import Barcode from "../../components/barcode";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
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

React.useEffect(()=>{
    const getOne = async ()=>{
        await app.get(`/user/get/0/${currentUser.id}/1/0/0/0/0`)
        .then(res=>{
      setUser(res.data)
        })
        .catch(err=>{
 setError(err)
        })
    }
    getOne()
}, [currentUser])


    return(
         <CRow>
<CCol xs={12} xl={8} style={{fontSize:'12px'}}>
           <CCard className="mb-12"  >
           
          <CCardBody>
          <DemoPaper variant="outlined">
          <p style={{textAlign:'center'}}>ENROLEE PROFILE INFORMATION</p>
          <CRow>
          <CCol xl={12}>
          <div style={{textAlign:'right'}}><img height={60} width={60}  src={`${baseURLStatic}${user.imgurl}`} /></div>
     </CCol></CRow>
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
          
          <CRow>
          <CCol xl={12} xs={12} style={{textAlign:'center'}}><br />
          <Barcode value={user.uiid} />
          </CCol></CRow>
          </DemoPaper>
          </CCardBody>
          </CCard>
            
</CCol>
</CRow>
            
    )
}