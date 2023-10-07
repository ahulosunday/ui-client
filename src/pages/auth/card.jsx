import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableRow } from "@coreui/react";
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
import formatDate from  '../../components/formatDate';
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

      await app.get(`/getuserid/${currentUser.id}/0/1/`)
      .then(result=>{
    setuserInfo(result.data)
   
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
          <QrCode value={currentUser?.email} />
          </CCol>
          <CCol xl={10} xs={10}>
         
          <div style={{textAlign:'right'}}><img height={60} width={60}  src={`${baseURLStatic}${user.imgurl}`} /></div>
                   
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
        
        <CRow>
        <CCol xs={12} xl={12}>
 <CTable style={{fontSize:'12px'}} align="middle" responsive>
          <CTableHead>
          <CTableRow>
          <CTableDataCell>SN</CTableDataCell>
              <CTableDataCell>AUTHCODE</CTableDataCell>
                <CTableDataCell>RRR_NUMBER</CTableDataCell>
                 <CTableDataCell>DATE_ACTIVATE</CTableDataCell>
                  <CTableDataCell>EXPIRE_DATE</CTableDataCell>
          </CTableRow>
          </CTableHead>
          <CTableBody>
          {
         userInfos.length === 0? '':  userInfos.map((item, index)=>{
        
             return(
              <CTableRow>
               <CTableDataCell>{index+1}</CTableDataCell>
              <CTableDataCell>{item.authNumber}</CTableDataCell>
                <CTableDataCell>{item.rrr_number}</CTableDataCell>
                <CTableDataCell>{formatDate(new Date(item.activated_date))}</CTableDataCell>
                  <CTableDataCell>{formatDate(new Date(item.expired_date))}</CTableDataCell>

          </CTableRow>
             )
            })
          }
          </CTableBody>


</CTable>

</CCol>
        </CRow>
          </DemoPaper>
          </CCardBody>
          </CCard>
            
</CCol>

</CRow>

            
    )
}