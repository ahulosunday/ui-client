import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../../components/toast';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { per_page, startIndex } from '../../helpers/paging_indexes';
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


const ListHmo = () =>{
       const [hmo, setHmo] = useState([]);
       const [page, setPage] = React.useState(1);
       const [data, setData] = useState([]);

   const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
       

useEffect(()=>{
const loadItem = async e =>{
 try{ 
       await app.get(`/hmos/${startIndex}/${per_page}`)
       .then(res=>{
        setHmo(res.data.res)
        setData(res.data)
       })
       .catch(err=>{
        showToastMessage('Unable to load data, reason:'+err, 'error')
       })
       
    }catch(err){
         showToastMessage('Unable to load data, reason:'+ err, 'error')
        }
        
    }
   
         loadItem() 
         //===============================
if(!(permissions.indexOf("VIEW_HMOS") > -1) || !currentUser){
  navigate('/')
}
  }, [permissions, currentUser, navigate])
  //=====================================
  const handleChange = async (e, value) => {
    setPage(value);
        await app.get(`/hmos/${page}/${per_page}`)
       .then(res=>{
        setHmo(res.data.res)
        setData(res.data)
       })
       .catch(err=>{
        showToastMessage('Unable to load data, reason:'+err, 'error')
       })
    };
    return (
       <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LISTS OF HMOs</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new HMO.
            </p>
            <DocsExample href="hmo/add" add="HMO LIST" showAdd={permissions.indexOf("ADD_HMOS") > -1? true: false}>
      <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow> 
       <CTableHeaderCell>HMO_CODE</CTableHeaderCell>
       <CTableHeaderCell>HMO_NAME</CTableHeaderCell>
       <CTableHeaderCell>HMO_ADDRESS</CTableHeaderCell>
       <CTableHeaderCell>OFFICIAL_EMAIL</CTableHeaderCell>
       <CTableHeaderCell>PHONE_NUMBER</CTableHeaderCell>
       <CTableHeaderCell>WARD</CTableHeaderCell>
       <CTableHeaderCell>LGA</CTableHeaderCell>
       <CTableHeaderCell>STATE</CTableHeaderCell>
       <CTableHeaderCell>REGION</CTableHeaderCell>
       <CTableHeaderCell>COUNTRY</CTableHeaderCell>
       <CTableHeaderCell>EDITED_BY</CTableHeaderCell>
       <CTableHeaderCell></CTableHeaderCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
       {
        
            (hmo.length ===0?'':hmo.map((item)=>(
            <CTableRow key={item.id}>
            <CTableDataCell>{item.code}</CTableDataCell>
       <CTableDataCell>{item.name}</CTableDataCell>
       <CTableDataCell>{item.address}</CTableDataCell>
       <CTableDataCell>{item.email}</CTableDataCell>
       <CTableDataCell>{item.phone}</CTableDataCell>
       <CTableDataCell>{item.ward.name}</CTableDataCell>
       <CTableDataCell>{item.lga.name}</CTableDataCell>
       <CTableDataCell>{item.state.name}</CTableDataCell>
       <CTableDataCell>{item.region.name}</CTableDataCell>
       <CTableDataCell>{item.country.name}</CTableDataCell>
        <CTableDataCell>{item.user.surname + ' ' + item.user.othername}</CTableDataCell>
       <CTableDataCell>
       <CButtonGroup>
      {permissions.indexOf("EDIT_HMOS") > -1?  <CButton color="secondary" size="sm" ><Link to={`/${0}/hmo/`}  state={item.id} className="edit" style={{color:'white', textDecoration:'none'}}> Edit</Link></CButton> :''}
        { permissions.indexOf("DELETE_HMOS") > -1?  <CButton color="danger" size="sm" ><Link to={'/delete'}  state={item.id +'&/hmo&/hmo/'} className="delete" style={{color:'white', textDecoration:'none'}}>Delete</Link></CButton>:''}
        </CButtonGroup> </CTableDataCell>
       </CTableRow>
            ))
            )
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

export default ListHmo