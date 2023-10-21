import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { per_page, startIndex } from '../../helpers/paging_indexes';
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
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const ListStates = () =>{
  
       const [stated, setStates] = useState([]);
       const [page, setPage] = useState(1)
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true)
          const [color, setColor] = useState("#ffffff");
       const {currentUser, permissions } = useContext(AuthContext);
       const navigate = useNavigate()
       

useEffect(()=>{
const loadItem = async e =>{
 try{         
        await app.get(`/state/${startIndex}/${per_page}/0`).then(res=>{
           setStates(res.data.res)
           setData(res.data)
           setLoading(false)
        }).catch(err=>{
          showToastMessage(err, 'error')
        })
        
         
    }catch(err){
         showToastMessage('Error occured while loading data ...', 'error')
        }
        
    }
   
         loadItem() 
         //===============================
if(!(permissions.indexOf("VIEW_STATES") > -1)){
  navigate("/")
}
  }, [permissions, navigate, currentUser])
 
  const handleChange = async (e, value) => {
    e.preventDefault()
    setPage(value);
      try{
       await app.get(`/state/${page}/${per_page}/0`).then(res=>{
           setStates(res.data.res)
           setData(res.data)
        }).catch(err=>{
          showToastMessage(err, 'error')
        })
      }
      catch(err){
       showToastMessage('Internal error !', 'error')
      }
  }
     const [search, setSearch] = React.useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
const datas = {
  nodes: stated.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ),
};
    return (
       <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LIST OF STATES</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new States.
            </p>
           <CInputGroup>
        <CInputGroupText> Search</CInputGroupText>
        <input id="search" placeholder='Search by State Name' className='form-control' type="text" onChange={handleSearch} />
      </CInputGroup>
            <DocsExample href="state/add" add="States List" showAdd={permissions.indexOf("ADD_STATES") > -1? true:false}>
       <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow>
       <CTableHeaderCell>STATE</CTableHeaderCell>
        <CTableHeaderCell>CODE</CTableHeaderCell>
         <CTableHeaderCell>REGION</CTableHeaderCell>
       <CTableHeaderCell>COUNTRY</CTableHeaderCell>
       <CTableHeaderCell>EDITED</CTableHeaderCell>
       <CTableHeaderCell>CREATED_DATE</CTableHeaderCell>
       <CTableHeaderCell>LAST_UPDATED</CTableHeaderCell>
       <CTableHeaderCell></CTableHeaderCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
       <ClipLoader
        color={color}
        loading={loading}
       cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
       {
        
            datas.nodes.length===0? '': datas.nodes.map((item)=>(
            <CTableRow key={item.id}>
       <CTableDataCell>{item.name}</CTableDataCell>
       <CTableDataCell>{item.code}</CTableDataCell>
       <CTableDataCell>{item.region.name}</CTableDataCell>
       <CTableDataCell>{item.country.name}</CTableDataCell>
        <CTableDataCell>{item.user.surname + ' ' + item.user.othername}</CTableDataCell>
        <CTableDataCell>{item.createdAt}</CTableDataCell>
        <CTableDataCell>{item.updatedAt}</CTableDataCell>
       <CTableDataCell></CTableDataCell>
       <CTableDataCell>
       <CButtonGroup>
      {permissions.indexOf("EDIT_STATES") > -1? <CButton color="secondary" size="sm" ><Link to={`/${0}/state/`} state={item.id} className="edit" style={{color:'white', textDecoration:'none'}}> Edit</Link></CButton> : ''}
        { permissions.indexOf("DELETE_STATES") > -1? <CButton color="danger" size="sm" ><Link to={'/delete'}  state={item.id +'&/state&/state/'} className="delete" style={{color:'white', textDecoration:'none'}}>Delete</Link></CButton> : ''}
        </CButtonGroup> </CTableDataCell>
       </CTableRow>
            ))
           
        }
      </CTableBody>
     </CTable>
       <p>
       <br />
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

export default ListStates