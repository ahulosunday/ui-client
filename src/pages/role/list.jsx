import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Stack } from '@mui/material';
import { per_page, startIndex } from '../../helpers/paging_indexes';
import showToastMessage from '../../components/toast';
import { trackPromise } from 'react-promise-tracker';
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { DocsExample } from '../../components';
import Loadings from '../../components/loading';

const List = () =>{
       const [role, setRole] = useState([]);
       const [page, setPage] = React.useState(1);
        const [data, setData] = useState([]);
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
       

useEffect(()=>{
     if(!(permissions.indexOf("ADD_ROLES") > -1)){
      navigate('/')
     }
const loadItem = async e =>{
    try{
         
    await app.get(`/role/${startIndex}/${per_page}`)
    .then(res=>{
     setRole(res.data.res);
     setData(res.data)
     setLoading(false)
    })
    .catch(err=>{
     showToastMessage('Error occured while loading data.', 'error')
    })
    
        
    }catch(err){
         showToastMessage('Error occured while loading data.', 'error')
        }
        
    }
   
         loadItem() 
         //===============================

  }, [permissions, navigate,currentUser])
  const handleChange = async (e, value) => {
    setPage(value);
      try{
         
    trackPromise(app.get(`/role/${page}/${per_page}`)
    .then(res=>{
     setRole(res.data.res);
     setData(res.data)
    })
    .catch(err=>{
     showToastMessage('Error occured while loading data.', 'error')
    })
    )
        
    }catch(err){
         showToastMessage('Error occured while loading data.', 'error')
        }

  }
    
    return (
             <CRow >
         <CCol md={12} xs={12} xl={8} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>ADD ROLES</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="ADD ROLES" href="role/add" showAdd={permissions.indexOf("ADD_ROLES") > -1? true : false}> 
       <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow>
       <CTableHeaderCell>Name</CTableHeaderCell>
       <CTableHeaderCell>Description</CTableHeaderCell>
       <CTableHeaderCell></CTableHeaderCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
         <Loadings loading={loading} />
       {
           role.length === 0? '': role.map((item)=>(
            <CTableRow key={item.id}>
       <CTableDataCell>{item.name}</CTableDataCell>
       <CTableDataCell>{item.description}</CTableDataCell>
       <CTableDataCell>
       <CButtonGroup>
        {permissions.indexOf("EDIT_ROLE") > -1? <CButton color="secondary" size="sm" ><Link to={`/${0}/role/`}  state={item.id} className="edit" style={{color:'white', textDecoration:'none'}}> Edit</Link></CButton>: ''} 
        {permissions.indexOf("ADD_ROLES") > -1? <CButton color="primary" size="sm" ><Link to={`/${0}/role/0`}  state={item.id} className="edit" style={{color:'white', textDecoration:'none'}}> Assign Permission</Link></CButton>: ''} 
        {permissions.indexOf("DELETE_ROLE") > -1? <CButton color="danger" size="sm" ><Link to={'/delete'}  state={item.id +'&/role/list&/role/'} className="delete" style={{color:'white', textDecoration:'none'}}>Delete</Link></CButton>:''}
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

export default List