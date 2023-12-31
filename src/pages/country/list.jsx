import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
//import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../../components/toast';
import { Pagination, Stack, Table } from '@mui/material';
import { per_page, startIndex } from '../../helpers/paging_indexes';
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

const ListCountry = () =>{
       const [country, setCountry] = useState([]);
        const [page, setPage] = React.useState(1);
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true)
   const {currentUser, permissions } = useContext(AuthContext);
   const navigate = useNavigate()
   const [canAdd, setcanAdd]= useState(false)
  
   
useEffect(()=>{
    if(!(permissions.indexOf("VIEW_COUNTRY") > -1) ){
        navigate('/')
    }

    const load = e =>{
    if(permissions.indexOf("ADD_COUNTRY") > -1){
      setcanAdd(true) 
    }
    }
    load()

const loadItem = async e =>{
 try{
     await app.get(`/country/${startIndex}/${per_page}`)
     .then(res =>{
        setCountry(res.data.res)
        setData(res.data)
      setLoading(false)
     })
     .catch(err=>{
        showToastMessage('Error occured while trying to load data! :' + err, 'error')
     })  
    }catch(err){
         showToastMessage('Error occured, reason: ' +err, 'error')
        }
        
    }
  loadItem();
         //===============================

  }, [currentUser, permissions, navigate])
 const handleChange = async (e, value) => {
    setPage(value);
    try{
     await app.get(`/country/${page}/${per_page}`)
     .then(res =>{
        setCountry(res.data.res)
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
  nodes: country.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ),
};
    return (
           <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LIST OF COUNTRIES</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new Country.
            </p>
          <CInputGroup>
        <CInputGroupText> Search</CInputGroupText>
        <input id="search" placeholder='Search by country name' className='form-control' type="text" onChange={handleSearch} />
      </CInputGroup>

            <DocsExample href="country/add" add="Country List" showAdd={canAdd}></DocsExample>

       <CTable striped style={{fontSize:'12px'}} align="middle" responsive >
       <CTableHead>
       <CTableRow >
       <CTableHeaderCell>COUNTRY</CTableHeaderCell>
        <CTableHeaderCell>SHORTNAME</CTableHeaderCell>
       <CTableHeaderCell>CODE</CTableHeaderCell>
       <CTableHeaderCell>CURRENCY</CTableHeaderCell>
       <CTableHeaderCell>EDITEDBY</CTableHeaderCell>
       <CTableHeaderCell>CREATED_DATE</CTableHeaderCell>
       <CTableHeaderCell>LAST_UPDATED</CTableHeaderCell>
       <CTableHeaderCell></CTableHeaderCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
       <Loadings loading={loading} />
       {
        
         datas.nodes.length===0? '': datas.nodes.map((item)=>(
            <CTableRow key={item.id}>
       <CTableDataCell>{item.name}</CTableDataCell>
       <CTableDataCell>{item.shortname}</CTableDataCell>
        <CTableDataCell>{item.code}</CTableDataCell>
        <CTableDataCell>{item.currency}</CTableDataCell>
        <CTableDataCell>{item.user.surname + ' ' + item.user.othername}</CTableDataCell>
        <CTableDataCell>{item.createdAt}</CTableDataCell>
        <CTableDataCell>{item.updatedAt}</CTableDataCell>
       <CTableDataCell>
        <CButtonGroup>
      {permissions.indexOf("EDIT_COUNTRY") > -1? <CButton color="secondary" size="sm" ><Link to={`/0/country/`} state={item.id} className="edit" style={{color:'white', textDecoration:'none'}}> Edit</Link></CButton>:'' }
       {permissions.indexOf("DELETE_COUNTRY") > -1? <CButton color="danger" size="sm" ><Link to={'/delete'}  state={item.id +'&/country&/country/'} className="delete" style={{color:'white', textDecoration:'none'}}>Delete</Link></CButton> : ''}
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


      </CCardBody>
      </CCard>
      </CCol>
      </CRow>
      
        
        
       
       
    )
}

export default ListCountry;