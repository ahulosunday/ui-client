import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Link, useLocation } from "react-router-dom";
import app from "../helpers/axiosConfig";
import { Alert } from "@mui/material";
import QrCode from "./QrCode";
import formatDate from "./formatDate";
import {formatCurreny} from './formatCurrency'
import moment from "moment";
import baseURLStatic from "../helpers/imageUrl";
const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'left',
}));

export default function Receipt(){

const state = useLocation().state
 const [user, setUser] = React.useState([])
  const [user_rrr, setUser_rrr] = React.useState([])
   const [packages, setPackages] = React.useState([])
   const [gifshiptype, setgifshiptype] = React.useState([])
 const [err, setError] = React.useState('')


React.useEffect(()=>{
 const loadData = async()=>{
    
    await app.get(`/user-rrr/${state}/`)
    .then(res=>{ 
        setUser(res.data.user)
    setUser_rrr(res.data)
   setgifshiptype(res.data.gifshiptype)
    setPackages(res.data.gifshipPackage)
    })
    .catch(err=>{
setError(<Alert severity="error">{err}</Alert>)
    })
 }
 loadData()

}, [state])
 const print =()=>{
       try {const printContents = document.getElementById('printableDiv').innerHTML
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents}
        catch(err){
          return null
        }
      }
    return(<>
        <div id='printableDiv'>
         <CRow>
<CCol xs={12} xl={10} style={{fontSize:'12px'}}>
           <CCard className="mb-12"  >
           
          <CCardBody>
          <DemoPaper variant="outlined">
          <p style={{textAlign:'center'}}><b>e-NHIA 
          <br />
          PAYMENT RECEIPT
          </b>
          </p>
          
           

           <CRow>
          <CCol xs={12}>
          <table width={'100%'}>
          
         <tr style={{borderBottom:'1px solid gray'}}>
         <td colSpan={2}>
         
         <CRow >
          <CCol xs={5} >
        
        {user.uiid?<QrCode value={user.uiid} />:''}
      <b>{'Receipt No#: 0000' + user_rrr.id}</b>
          
          </CCol>
          <CCol xs={7} >
        <div style={{textAlign:'center'}}><img height={70} width={70}  src={ user.imgurl? `${baseURLStatic}${user.imgurl}`:''} /></div>
     
          </CCol>
          </CRow>
          </td>
         </tr>
          <tr>
          <td colSpan={2}>
    <CRow>
          <CCol xs={6} >
          <b>
         {user.surname + ' ' + user.othername}
         <br />
         {user.email}
         <br />
         {user.phone}
          </b>
          </CCol>
          <CCol xs={6} style={{borderLeft:'1px solid black'}}>
          <b>
          {'RRR No#: ' + user_rrr.rrr_number}
          <br />
          {'Verification No#: ' + user_rrr.authNumber}
          <br />
          {'Date: ' + formatDate(new Date(user_rrr.createdAt))}
          </b>
          </CCol>
          </CRow>       
        </td>
        </tr>
   
   <tr style={{backgroundColor:'lightblue',borderTop:'1px solid black', borderBottom:'1px solid black'}}>
   <td colSpan={2}>
 <b>DETAILS</b>  
   </td>
   </tr>
   <tr style={{borderBottom:'1px solid gray'}}>
   <td>
   Programme:
   </td>
   <td>
   {gifshiptype.name}
   </td>
   </tr>
     <tr style={{borderBottom:'1px solid gray'}}>
   <td>Package</td>
    <td>{packages.name}</td>
   </tr>
     <tr style={{borderBottom:'1px solid gray'}}>
   <td>Amount Paid</td>
    <td>{formatCurreny.format(user_rrr.amount)}</td>
   </tr>
   <tr style={{borderBottom:'1px solid gray'}}>
   <td>No of Enrolee Reg.</td>
    <td>{user_rrr.maxNumber}</td>
   </tr>
   <tr style={{borderBottom:'1px solid gray'}}>
   <td>Date of Reg.</td>
    <td>{moment(user_rrr.createdAt).format('Do MMMM YYYY')}</td>
   </tr>
   <tr style={{borderBottom:'1px solid gray'}}>
   <td>Expire Date</td>
    <td>{moment(user_rrr.expired_date).format('Do MMMM YYYY')}</td>
   </tr>
   <tr style={{borderBottom:'1px solid gray'}}>
   <td></td>
    <td></td>
   </tr>
   </table>
          </CCol>
          </CRow>
         

          </DemoPaper>
          </CCardBody>
          </CCard>
            
</CCol>
</CRow>
    </div>
    <Link onClick={print}>Print</Link>
    </>        
    )
}