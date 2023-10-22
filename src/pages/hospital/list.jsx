import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import showToastMessage from '../../components/toast';
import { trackPromise } from 'react-promise-tracker';
import { Pagination, Stack } from '@mui/material';
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
import Loadings from '../../components/loading';

const ListHospital = () =>{
       const [hositals, setHospitals] = useState([]);
       const [page, setPage] = React.useState(1);
        const [data, setData] = useState([]);
        const [canAdd, setcanAdd]= useState(false)
          const [loading, setLoading]= useState(true)
          
   const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
       

useEffect(()=>{
  const load = e =>{
    if(permissions.indexOf("EDIT_HOSPITAL") > -1){
      setcanAdd(true) 
    }

  }
  load()
const loadItem = async e =>{
 try{
        await app.get(`/hospital/${startIndex}/${per_page}/0`)
        .then(res=>{
          setHospitals(res.data.res)
          setData(res.data)
          setLoading(false)
        })
        .catch(err=>{
          showToastMessage('Unable to load data !', 'error')
        })        
         
    }catch(err){
         showToastMessage('Unable to load data !', 'error')
        }
        
    }
   
         loadItem() 
         //===============================
if(!(permissions.indexOf("VIEW_HOSPITAL") > -1)){
  navigate('/')
}
  }, [permissions, currentUser, navigate])
const handleChange = async (e, value) => {
    setPage(value);
    try{
      await app.get(`/hospital/${page}/${per_page}/0`)
        .then(res=>{
          setHospitals(res.data.res)
          setData(res.data)
        })
     .catch(err=>{
        showToastMessage('Error occured while trying to load data !'+err, 'error')
     }) 
    }catch(err){
        showToastMessage('Error occured, reason: ' +err, 'error')
        }

 }

     const [search, setSearch] = React.useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
const datas = {
  nodes: hositals.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ),
};
    return (
   
      <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LIST OF ACCREDITED PRIMARY HEALTHCARE</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new hospital.
            </p>
            <CInputGroup>
        <CInputGroupText> Search</CInputGroupText>
        <input id="search" placeholder='Search by HOSPITAL NAME' className='form-control' type="text" onChange={handleSearch} />
      </CInputGroup>
            <DocsExample href="hospital/add" add="Hospital List" showAdd={canAdd}>
               <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow>
       <CTableHeaderCell>CODE</CTableHeaderCell>
       <CTableHeaderCell>HOSPITAL NAME</CTableHeaderCell>
       <CTableHeaderCell>ADDRESS</CTableHeaderCell>
        <CTableHeaderCell>CONTACT ADDRESS</CTableHeaderCell>
        <CTableHeaderCell>MOBILE</CTableHeaderCell>
        <CTableHeaderCell>EMAIL</CTableHeaderCell>
         <CTableHeaderCell>WARD</CTableHeaderCell>
        <CTableHeaderCell>LGA</CTableHeaderCell>
        <CTableHeaderCell>STATE</CTableHeaderCell>
         <CTableHeaderCell>BANK</CTableHeaderCell>
          <CTableHeaderCell>ACCNO#</CTableHeaderCell>
       <CTableHeaderCell>ACTIONS</CTableHeaderCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
       <Loadings loading = { loading} />
       {
        
            datas.nodes.length === 0? '':datas.nodes.map((item)=>(
            <CTableRow>
       <CTableDataCell>{item.hospitalCode}</CTableDataCell>
       <CTableDataCell>{item.name}</CTableDataCell>
       <CTableDataCell>{item.address}</CTableDataCell>
        <CTableDataCell>{item.contactAddress}</CTableDataCell>
       <CTableDataCell>{item.phone}</CTableDataCell>
       <CTableDataCell>{item.email}</CTableDataCell>
       <CTableDataCell>{item.ward.name}</CTableDataCell>
       <CTableDataCell>{item.lga.name}</CTableDataCell>
       <CTableDataCell>{item.state.name}</CTableDataCell>
       <CTableDataCell>{item.bank}</CTableDataCell>
       <CTableDataCell>{item.accnumber}</CTableDataCell>
  
       <CTableDataCell>  
       

             
 <CButtonGroup >
       { permissions.indexOf("EDIT_HOSPITAL") > -1? <CButton color="secondary" size="sm" ><Link to={`/${0}/hospital/`}  state={item.id} style={{color:'white', textDecoration:'none'}}> Edit</Link></CButton> :''}
        { permissions.indexOf("VIEW_HOSPITAL") > -1?<CButton color="info" size="sm"><Link to={`/${0}/hospital/view`}  state={item.id} className="view" style={{color:'white', textDecoration:'none'}}>View</Link></CButton>:'' }
       { permissions.indexOf("DELETE_HOSPITAL") > -1? <CButton color="danger" size="sm"><Link to={'/delete'}  state={item.id +'&/hospital&/hospital/'} className="delete" style={{color:'white', textDecoration:'none'}}>Delete</Link></CButton> :''}
        
        
               
              </CButtonGroup>
           
        </CTableDataCell>
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

export default ListHospital