import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
//import { AuthContext } from "../../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import moment from "moment";
import { Pagination, Stack } from '@mui/material';
import { startIndex, per_page } from '../../helpers/paging_indexes';
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../../components/toast';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from '../../components'


const ListDependants = () =>{
  const state = useLocation().state;
    const [data, setData] = useState([])
    const {currentUser, permissions } = useContext(AuthContext);
   const navigate = useNavigate()
   
useEffect(()=>{
    if(!(permissions.indexOf("VIEW_RRR") > -1) ){
        navigate('/')
    }

const loadItem = async e =>{
 try{
         
        await app.get(`/${state}/codes/getuser_rrr/1/1/`).then(res=>{
            setData(res.data)
        }).catch(err=>{
            showToastMessage(err, 'error')
        })
    
         
    }catch(err){
         return(err.message)
        }
        
    }
   
         loadItem()
        
  }, [currentUser, permissions, navigate])
/*
  const handleChange = async (e, value) => {
    setPage(value);
    await app.get(`user-rrr/${page}/${per_page}/0`).then(res=>{
            setGetrrr(res.data.res)
            setData(res.data)
        }).catch(err=>{
            showToastMessage(err, 'error')
        })

  }
    */
    return (
      
              <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>MEMBERS OF THE GROUP</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
             View the list of enrolees that make up this payment 
            </p>
           
            <DocsExample add="Enrolee Payment List" >
           
       <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow>      
       <CTableHeaderCell>S/N</CTableHeaderCell>
      <CTableHeaderCell>REG CODE</CTableHeaderCell>
      <CTableHeaderCell>RRR NO#</CTableHeaderCell>
      <CTableHeaderCell>PAYMENT VERIFICATION NUMBER</CTableHeaderCell>
        <CTableHeaderCell>ENROLEE_NAME</CTableHeaderCell>
       <CTableHeaderCell>EMAIL_ADDR</CTableHeaderCell>
       <CTableHeaderCell>PHONE NO#</CTableHeaderCell>
          <CTableHeaderCell>DATE_CREATED</CTableHeaderCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
       {
            data.length === 0? '': data.map((item, index)=>(
            <CTableRow key={item.id}>
            <CTableDataCell>{index+1}</CTableDataCell>
       <CTableDataCell>{item.code}</CTableDataCell>
          <CTableDataCell>{item.user_rrr.rrr_number}</CTableDataCell>
             <CTableDataCell>{item.user_rrr.authNumber}</CTableDataCell>
       <CTableDataCell>{item.user.surname} {item.user.othername}</CTableDataCell>
        <CTableDataCell>{item.user.email}</CTableDataCell>
        <CTableDataCell>{item.user.phone}</CTableDataCell>
          <CTableDataCell>{moment(item.createdAt).format('Do MMMM YYYY')}</CTableDataCell>
       </CTableRow>
            ))
           
       }
      </CTableBody>
       </CTable>
       </DocsExample>
       </CCardBody>
       </CCard>
       </CCol>
       </CRow>
       
        
        
       
       
    )
}

export default ListDependants