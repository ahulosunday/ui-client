import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
//import { AuthContext } from "../../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import moment from "moment";
import { Button, Pagination, Stack } from '@mui/material';
import { startIndex, per_page } from '../../helpers/paging_indexes';
import showToastMessage from '../../components/toast';
import DataTable from 'datatables.net-dt';

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
  CFormInput,
  CInputGroup,
  CInputGroupText,
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
import { formatCurreny } from '../../components/formatCurrency';


const ListRRRByUser = () =>{
    const [getrrr, setGetrrr] = useState([]);
    const [page, setPage]= useState(1)
    const [data, setData] = useState([])
    const state = useLocation().state
    const {currentUser, permissions } = useContext(AuthContext);
   const navigate = useNavigate()
useEffect(()=>{
  
const loadItem = async e =>{
 try{
         
        await app.get(`/rrr/${state}/0/0/1`).then(res=>{
            setGetrrr(res.data)
        }).catch(err=>{
            showToastMessage(err, 'error')
        })
    
         
    }catch(err){
         return(err.message)
        }
        
    }
   
         loadItem()
        
  }, [currentUser, state, navigate])

    const [search, setSearch] = React.useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
const datas = {
  nodes: getrrr.filter((item) =>
    (item.user.surname.toLowerCase().includes(search.toLowerCase()) || item.user.othername.toLowerCase().includes(search.toLowerCase()))
  ),
};
    return (
      
              <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>PAYMENT</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="Payment">
           <CInputGroup>
        <CInputGroupText> Search</CInputGroupText>
        <input id="search" placeholder='Search by name' className='form-control' type="text" onChange={handleSearch} />
      </CInputGroup>
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
            datas.nodes.length === 0? '': datas.nodes.map((item)=>(
            <CTableRow>
       <CTableDataCell>{item.rrr_number}</CTableDataCell>
        <CTableDataCell>{item.authNumber}</CTableDataCell>
       <CTableDataCell>{item.user.surname} {item.user.othername}</CTableDataCell>
        <CTableDataCell>{item.user.email}</CTableDataCell>
        <CTableDataCell>{item.gifship.name}</CTableDataCell>
        <CTableDataCell>{item.gifshiptype.name}</CTableDataCell>
         <CTableDataCell>{item.gifshipPackage.name}</CTableDataCell>
          <CTableDataCell>{formatCurreny.format(item.amount)}</CTableDataCell>
          <CTableDataCell>{item.minNumber}</CTableDataCell>
          <CTableDataCell>{item.maxNumber}</CTableDataCell>
          <CTableDataCell>{moment(item.activated_date).format('Do MMMM YYYY')}</CTableDataCell>
          <CTableDataCell>{moment(item.expired_date).format('Do MMMM YYYY')}</CTableDataCell>
          <CTableDataCell>{item.activated?'Active':"Inactive"}</CTableDataCell>
       {
       <CTableDataCell>
       <CButtonGroup>
       <ViewIcon to={`/user-rrr/dependants`} state={item.id} />
      </CButtonGroup> </CTableDataCell>
        }
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

export default ListRRRByUser