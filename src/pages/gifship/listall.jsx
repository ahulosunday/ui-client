import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Stack } from '@mui/material';
import { per_page, startIndex } from '../../helpers/paging_indexes';
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../../components/toast';
import moment from 'moment';
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

const GifshipList = () =>{
       const [getGifship, setGifship] = useState([]);
       const [page, setPage] = React.useState(1);
        const [data, setData] = useState([]);
        const {currentUser, permissions } = useContext(AuthContext);
        const navigate = useNavigate()
        const [canAdd, setcanAdd]= useState(false)

useEffect(()=>{
   const load = e =>{
    if(permissions.indexOf("ADD_GIFSHIP_TYPE") > -1){
      setcanAdd(true) 
    }
    }
    load()
const loadItem = async e =>{
 try{
          
        await app.get(`/gifshipList/${startIndex}/${per_page}`)
        .then(res=>{
          setGifship(res.data.res);
          setData(res.data)
        
        })
        .catch(err=>{
          showToastMessage('Error occured while trying loading data', 'error')
        })
    }catch(err){
         showToastMessage('Error occured while trying loading data', 'error')
        }
        
    }
   
         loadItem() 
         //===============================ADD_GIFSHIP_TYPE
if(!(permissions.indexOf("VIEW_GIFSHIP_TYPE") > -1)){
  navigate('/')
}

  }, [permissions, currentUser, navigate])
   const handleChange = async (e, value) => {
    setPage(value);
    await app.get(`/gifshipList/${page}/${per_page}`)
        .then(res=>{
          setGifship(res.data.res);
          setData(res.data)
        })
        .catch(err=>{
          showToastMessage('Error occured while trying loading data', 'error')
        })
   }
    const [search, setSearch] = React.useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
const datas = {
  nodes: getGifship.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ),
};
    return (
                  <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LIST OF PROGRAMMES</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new Item.
            </p>
               <CInputGroup>
        <CInputGroupText> Search</CInputGroupText>
        <input id="search" placeholder='Search by Sub-Programme' className='form-control' type="text" onChange={handleSearch} />
      </CInputGroup>
            <DocsExample href="gifshipt" add="PROGRAMME" showAdd={canAdd}>
      <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow>
       <CTableHeaderCell>Programme</CTableHeaderCell>
       <CTableHeaderCell>Sub-Programme</CTableHeaderCell>
        <CTableHeaderCell>Editedby</CTableHeaderCell>
        <CTableHeaderCell>Created_At</CTableHeaderCell>
        <CTableHeaderCell>Updated_At</CTableHeaderCell>
       <CTableHeaderCell></CTableHeaderCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
       {
            datas.nodes.length ===0? '': datas.nodes.map((item)=>(
            <CTableRow key={item.id}>
       <CTableDataCell>{item.gifship.name}</CTableDataCell>
         <CTableDataCell>{item.name}</CTableDataCell>
       <CTableDataCell>{item.user.surname + ' ' + item.user.othername}</CTableDataCell>
       <CTableDataCell>{moment(item.createdAt).format('YYYY MM DD hh:ss:mm')}</CTableDataCell>
       <CTableDataCell>{moment(item.updatedAt).format('YYYY MM DD hh:ss:mm')}</CTableDataCell>
       <CTableDataCell>
       <CButtonGroup>
       { permissions.indexOf("EDIT_GIFSHIP_TYPE") > -1? <CButton color="secondary" size="sm" ><Link to={`/gifshipedit/0`} state={item.id}  style={{color:'white', textDecoration:'none'}}>Edit</Link></CButton> : ''}
        { permissions.indexOf("DELETE_GIFSHIP_TYPE") > -1? <CButton color="danger" size="sm" ><Link to={'/delete'}  state={item.id +'&/gifship-list&/gifshipList/'} style={{color:'white', textDecoration:'none'}}>Delete</Link></CButton>:''}
       </CButtonGroup>  </CTableDataCell>
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

export default GifshipList