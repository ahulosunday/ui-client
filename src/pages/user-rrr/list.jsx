import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
//import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import moment from "moment";
import { Pagination, Stack } from '@mui/material';
import { startIndex, per_page } from '../../helpers/paging_indexes';
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
import DeleteIcon from '../../components/deleteIcon';
import EditIcon from '../../components/editIcon';
import ViewIcon from '../../components/viewIcon';


const ListRRR = () =>{
    const [getrrr, setGetrrr] = useState([]);
    const [page, setPage]= useState(1)
    const [data, setData] = useState([])
    const {currentUser, permissions } = useContext(AuthContext);
   const navigate = useNavigate()
   
useEffect(()=>{
    if(!(permissions.indexOf("VIEW_RRR") > -1) ){
        navigate('/')
    }

const loadItem = async e =>{
 try{
         
        await app.get(`user-rrr/${startIndex}/${per_page}/0`).then(res=>{
            setGetrrr(res.data.res)
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

  const handleChange = async (e, value) => {
    setPage(value);
    await app.get(`user-rrr/${page}/${per_page}/0`).then(res=>{
            setGetrrr(res.data.res)
            setData(res.data)
        }).catch(err=>{
            showToastMessage(err, 'error')
        })

  }
    
    return (
      
              <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LISTS OF ENROLEES PAYMENTS</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new Enrolee Payment.
            </p>
           
            <DocsExample href="user-rrr/add" add="Enrolee Payment List" showAdd={permissions.indexOf("ADD_RRR") > -1? true: false}>
           
       <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow>      
       <CTableHeaderCell>RRR_NO#</CTableHeaderCell>
       <CTableHeaderCell>PAYMENT VERIFICATION NO#</CTableHeaderCell>
        <CTableHeaderCell>ENROLEE_NAME</CTableHeaderCell>
       <CTableHeaderCell>EMAIL_ADDR</CTableHeaderCell>
       <CTableHeaderCell>PROGRAMME</CTableHeaderCell>
       <CTableHeaderCell>SUB</CTableHeaderCell>
        <CTableHeaderCell>PACKAGE</CTableHeaderCell>
         <CTableHeaderCell>AMOUNT_PAID</CTableHeaderCell>
         <CTableHeaderCell>MIN_NO#</CTableHeaderCell>
          <CTableHeaderCell>MAX_NO#</CTableHeaderCell>
          <CTableHeaderCell>DATE_START</CTableHeaderCell>
           <CTableHeaderCell>EXPIRE_DATE</CTableHeaderCell>
            <CTableHeaderCell>ACTIVE</CTableHeaderCell>
     
       <CTableHeaderCell></CTableHeaderCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
       {
            getrrr.length === 0? '': getrrr.map((item)=>(
            <CTableRow>
       <CTableDataCell>{item.rrr_number}</CTableDataCell>
        <CTableDataCell>{item.authNumber}</CTableDataCell>
       <CTableDataCell>{item.user.surname} {item.user.othername}</CTableDataCell>
        <CTableDataCell>{item.user.email}</CTableDataCell>
        <CTableDataCell>{item.gifship.name}</CTableDataCell>
        <CTableDataCell>{item.gifshiptype.name}</CTableDataCell>
         <CTableDataCell>{item.gifshipPackage.name}</CTableDataCell>
          <CTableDataCell>{item.amount}</CTableDataCell>
          <CTableDataCell>{item.minNumber}</CTableDataCell>
          <CTableDataCell>{item.maxNumber}</CTableDataCell>
          <CTableDataCell>{moment(item.activated_date).format('Do MMMM YYYY')}</CTableDataCell>
          <CTableDataCell>{moment(item.expired_date).format('Do MMMM YYYY')}</CTableDataCell>
          <CTableDataCell>{item.activated?'Active':"Inactive"}</CTableDataCell>
       {
       <CTableDataCell>
       <CButtonGroup>
       {permissions.indexOf("VIEW_RRR") > -1?  <ViewIcon to={`/user-rrr/dependants`} state={item.id} />:'' }
      {permissions.indexOf("EDIT_RRR") > -1?  <EditIcon to={`/user-rrr/`} state={item.id} />:'' }
       {permissions.indexOf("DELETE_RRR") > -1? <DeleteIcon to={`/delete`}  state={item.id +'&/user-rrr/&/user-rrr/'} /> : ''}
       </CButtonGroup> </CTableDataCell>
        }
       </CTableRow>
            ))
           
        }
      </CTableBody>
       </CTable>
       <p>
       <Stack spacing={2}>
      <Pagination count={data.totalPages} page={page} onChange={handleChange} variant="outlined" shape="rounded"  color="secondary" />
    </Stack>
    </p>
       </DocsExample>
       </CCardBody>
       </CCard>
       </CCol>
       </CRow>
       
        
        
       
       
    )
}

export default ListRRR