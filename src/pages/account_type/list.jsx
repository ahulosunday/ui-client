import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../../components/toast';
import { Pagination, Stack, Table } from '@mui/material';
import { per_page, startIndex } from '../../helpers/paging_indexes';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from '../../components'
import Loadings from '../../components/loading';

const ListAccount_type = () =>{
       const [account_type, setAccount_type] = useState([]);
        const [loading, setLoading] = useState(true)
   const {currentUser, permissions } = useContext(AuthContext);
   const navigate = useNavigate()
   const [canAdd, setcanAdd]= useState(false)
  
   
useEffect(()=>{
    if(!(permissions.indexOf("VIEW_ACCOUNT_TYPE") > -1) ){
        navigate('/')
    }

    const load = e =>{
    if(permissions.indexOf("ADD_ACCOUNT_TYPE") > -1){
      setcanAdd(true) 
    }
    }
    load()

const loadItem = async e =>{
 try{
     await app.get('/account/type/')
     .then(res =>{
        setAccount_type(res.data)
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

const [search, setSearch] = React.useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
const datas = {
  nodes: account_type.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ),
};
    return (
           <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>TYPES OF ACCOUNT</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new Type of Account.
            </p>
          <CInputGroup>
        <CInputGroupText> Search</CInputGroupText>
        <input id="search" placeholder='Search by name' className='form-control' type="text" onChange={handleSearch} />
      </CInputGroup>

            <DocsExample href="account/type/add" add="Type of Account" showAdd={canAdd}></DocsExample>

       <CTable striped style={{fontSize:'12px'}} align="middle" responsive >
       <CTableHead>
       <CTableRow >
       <CTableHeaderCell>Account Type</CTableHeaderCell>
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
        <CTableDataCell>{item.createdAt}</CTableDataCell>
        <CTableDataCell>{item.updatedAt}</CTableDataCell>
       <CTableDataCell>
        <CButtonGroup>
      {permissions.indexOf("EDIT_ACCOUNT_TYPE") > -1? <CButton color="secondary" size="sm" ><Link to={`/account/type/add`} state={item.id} className="edit" style={{color:'white', textDecoration:'none'}}> Edit</Link></CButton>:'' }
       {permissions.indexOf("DELETE_ACCOUNT_TYPE") > -1? <CButton color="danger" size="sm" ><Link to={'/delete'}  state={item.id +'&/account/type/&/account/type/'} className="delete" style={{color:'white', textDecoration:'none'}}>Delete</Link></CButton> : ''}
       </CButtonGroup>
        </CTableDataCell>
       </CTableRow>
            ))
           
        }
      </CTableBody>
       </CTable>
    


      </CCardBody>
      </CCard>
      </CCol>
      </CRow>
      
        
        
       
       
    )
}

export default ListAccount_type;