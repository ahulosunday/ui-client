import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Stack } from '@mui/material';
import { trackPromise } from 'react-promise-tracker';
import { per_page, startIndex } from '../../helpers/paging_indexes';
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

const ListWard = () =>{
       const [ward, setWards] = useState([]);
       const [data, setData] = useState([])
       const [page, setPage] =useState(1)
   const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
       

useEffect(()=>{
const loadItem = async e =>{
 try{
       await app.get(`/ward/${startIndex}/${per_page}/0`).then(res=>{
          setWards(res.data.res)
          setData(res.data)
        }).catch(err=>{
          showToastMessage('Error occured while loading data ...:'+ err, 'error')
        })
         }catch(err){
         showToastMessage('Error occured while loading data ...', 'error')
        }
        
    }
   
         loadItem() 
         //===============================
         if(!(permissions.indexOf("VIEW_WARDS") > -1) ){
          navigate('/')
         }

  }, [permissions, navigate, currentUser])
   const handleChange = async (e, value) => {
    e.preventDefault()
    setPage(value);
      try{
        await app.get(`/ward/${page}/${per_page}/0`).then(res=>{
          setWards(res.data.res)
          setData(res.data)
        }).catch(err=>{
          showToastMessage('Error occured while loading data ...:'+ err, 'error')
        })

      }
      catch(err){
       showToastMessage('Internal error !', 'error')
      }
  }
   
    return (
        <CRow >
        <CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LISTS OF WARDS</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new Wards.
            </p>
           
            <DocsExample href="ward/add" add="Wards List" showAdd={permissions.indexOf("ADD_WARDS") > -1? true:false}>
       <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow>
       <CTableHeaderCell>WARD</CTableHeaderCell>
        <CTableHeaderCell>CODE</CTableHeaderCell>
        <CTableHeaderCell>LGA</CTableHeaderCell>
        <CTableHeaderCell>STATE</CTableHeaderCell>
         <CTableHeaderCell>REGION</CTableHeaderCell>
          <CTableHeaderCell>COUNTRY</CTableHeaderCell>
       <CTableHeaderCell>Editedby</CTableHeaderCell>
       <CTableHeaderCell>CREATED_DATE</CTableHeaderCell>
       <CTableHeaderCell>LAST_UPDATED</CTableHeaderCell>
       <CTableHeaderCell></CTableHeaderCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
       {
        
            ward.length===0? '' : ward.map((item)=>(
            <CTableRow>
       <CTableDataCell>{item.name}</CTableDataCell>
       <CTableDataCell>{item.code}</CTableDataCell>
       <CTableDataCell>{item.lga.name}</CTableDataCell>
       <CTableDataCell>{item.state.name}</CTableDataCell>
       <CTableDataCell>{item.region.name}</CTableDataCell>
       <CTableDataCell>{item.country.name}</CTableDataCell>
        <CTableDataCell>{item.user.surname + ' ' + item.user.othername}</CTableDataCell>
        <CTableDataCell>{item.createdAt}</CTableDataCell>
        <CTableDataCell>{item.updatedAt}</CTableDataCell>
       <CTableDataCell></CTableDataCell>
       <CTableDataCell>
       <CButtonGroup>
       { permissions.indexOf("EDIT_WARDS") > -1? <CButton color="secondary" size="sm" ><Link to={`/0/ward/`}  state={item.id} className="edit" style={{color:'white', textDecoration:'none'}}> Edit</Link></CButton> : '' }
       { permissions.indexOf("DELETE_WARDS") > -1? <CButton color="danger" size="sm" > <Link to={'/delete'}  state={item.id +'&/ward&/ward/'} className="delete" style={{color:'white', textDecoration:'none'}}>Delete</Link></CButton> :''}
        </CButtonGroup></CTableDataCell>
       </CTableRow>
            ))
           
        }
      </CTableBody>
       </CTable>
     
       <Stack spacing={2}>
      <Pagination count={data.totalPages} page={page} onChange={handleChange} variant="outlined" shape="rounded"  color="secondary" />
    </Stack>
    
       </DocsExample>
       </CCardBody>
       </CCard>
       </CCol>
       </CRow>
      
      
        
        
       
       
    )
}

export default ListWard