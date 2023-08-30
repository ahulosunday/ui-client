import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { per_page, startIndex } from '../../helpers/paging_indexes';
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../../components/toast';
import { Pagination, Stack } from '@mui/material';
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


const ListRegion = () =>{
   const [region, setRegion] = useState([]);
   const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
     const [page, setPage] = React.useState(1);
        const [data, setData] = useState([]);
        const [canAdd, setcanAdd] = useState(false)

useEffect(()=>{
const loadItem = async e =>{
 try{
         
        await app.get(`/region/${startIndex}/${per_page}/0`)
        .then(res=>{
          setRegion(res.data.res)
          setData(res.data)
        }).catch(err=>{
          showToastMessage('Error occured while loading data ...' + err, 'error')
        })
    }catch(err){
        showToastMessage('Error occured while loading data ...', 'error')
        }
        
    }
   
         loadItem() 
         //===============================
         if(!(permissions.indexOf("VIEW_REGIONS") > -1)){
          navigate('/')
         }

  }, [permissions, navigate, currentUser])
    const handleChange = async (e, value) => {
    setPage(value);
    try{
     await app.get(`/region/${page}/${per_page}/0`)
        .then(res=>{
          setRegion(res.data.res)
          setData(res.data)
        }).catch(err=>{
          showToastMessage('Error occured while loading data ...' + err, 'error')
        })

    }
    catch(errs){
     showToastMessage('Error occured while loading data ...', 'error')
    }

    }
    return (
             <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LIST OF REGIONS</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new regions.
            </p>
           
            <DocsExample href="region/add" add="Regions List" showAdd={permissions.indexOf("ADD_REGIONS") > -1? true:false}>
       <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow>
       <CTableHeaderCell>REGION</CTableHeaderCell>
        <CTableHeaderCell>COUNTRY</CTableHeaderCell>
       <CTableHeaderCell>EDITEDBY</CTableHeaderCell>
       <CTableHeaderCell>CREATED_DATE</CTableHeaderCell>
       <CTableHeaderCell>LAST_UPDATED</CTableHeaderCell>
       <CTableHeaderCell></CTableHeaderCell>
       </CTableRow>
</CTableHead>
<CTableBody>
       {
        
            region.length === 0? '': region.map((item)=>(
            <CTableRow key={item.id}>
       <CTableDataCell>{item.name}</CTableDataCell>
       <CTableDataCell>{item.country.name}</CTableDataCell>
        <CTableDataCell>{item.user.surname + ' ' + item.user.othername}</CTableDataCell>
        <CTableDataCell>{item.createdAt}</CTableDataCell>
        <CTableDataCell>{item.updatedAt}</CTableDataCell>
       <CTableDataCell>
        <CButtonGroup >
       { permissions.indexOf("EDIT_REGIONS") > -1? <CButton color="secondary" size="sm" ><Link to={`/${0}/region/`} state={item.id} className="edit" style={{color:'white', textDecoration:'none'}}> Edit</Link></CButton> : ''}
        { permissions.indexOf("DELETE_REGIONS") > -1? <CButton color="danger" size="sm" ><Link to={'/delete'}  state={item.id +'&/region&/region/'} className="delete" style={{color:'white', textDecoration:'none'}}>Delete</Link></CButton> : ''}
        </CButtonGroup>
         </CTableDataCell>
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
     </CCard></CCol></CRow>
        
        
       
       
    )
}

export default ListRegion