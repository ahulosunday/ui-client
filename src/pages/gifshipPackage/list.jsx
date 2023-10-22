import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Stack } from '@mui/material';
import { trackPromise } from 'react-promise-tracker';
import { per_page, startIndex } from '../../helpers/paging_indexes';
import showToastMessage from '../../components/toast';
import moment from 'moment'
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


const GifshipPackageList = () =>{
       const [getGifship, setGifship] = useState([]);
        const [page, setPage] = React.useState(1);
        const [data, setData] = useState([]);
       const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
       

useEffect(()=>{
const loadItem = async e =>{
 try{
          
       await app.get(`/gifshipPackage/${startIndex}/${per_page}`)
       .then(res=>{
        setGifship(res.data.res);
        setData(res.data)
        setLoading(false)
       })
       .catch(err=>{
        showToastMessage('Error occured while loading data', 'error')
       })  
    }catch(err){
        showToastMessage('Error occured while loading data', 'error')
        }
        
    }
   
         loadItem() 
         //===============================
if(!(permissions.indexOf("VIEW_GIFSHIP_PACKAGE") > -1)){
  navigate('/')
}
  }, [permissions, currentUser, navigate])
  const handleChange = async (e, value) => {
        setPage(value);
        await app.get(`/gifshipPackage/${page}/${per_page}`)
       .then(res=>{
        setGifship(res.data.res);
        setData(res.data)
       })
       .catch(err=>{
        showToastMessage('Error occured while loading data', 'error')
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
<CCol xs={12} xl={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LIST OF PACKAGES</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new Item.
            </p>
               <CInputGroup>
        <CInputGroupText> Search</CInputGroupText>
        <input id="search" placeholder='Search by package' className='form-control' type="text" onChange={handleSearch} />
      </CInputGroup>
            <DocsExample href="gifshipPackage/add" add="PROGRAMME PACKAGE" showAdd={permissions.indexOf("VIEW_GIFSHIP_PACKAGE") > -1? true : false}>
      <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow>
       <CTableHeaderCell>Programme</CTableHeaderCell>
       <CTableHeaderCell>SubProgramme</CTableHeaderCell>
       <CTableHeaderCell>Package</CTableHeaderCell>
       <CTableHeaderCell>Amount(per person)</CTableHeaderCell>
        <CTableHeaderCell>Duration (Days)</CTableHeaderCell>
        <CTableHeaderCell>Editedby</CTableHeaderCell>
        <CTableHeaderCell>Created_Date</CTableHeaderCell>
        <CTableHeaderCell>Updated_Date</CTableHeaderCell>
       <CTableHeaderCell></CTableHeaderCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
         <Loadings loading={loading} />
       {
            datas.nodes.map((item)=>(
            <CTableRow>
       <CTableDataCell>{item.gifship.name}</CTableDataCell>
         <CTableDataCell>{item.gifshiptype.name}</CTableDataCell>
         <CTableDataCell>{item.name}</CTableDataCell>
          <CTableDataCell>{item.amount}</CTableDataCell>
          <CTableDataCell>{item.duration}</CTableDataCell>
       <CTableDataCell>{item.user.surname + ' ' + item.user.othername}</CTableDataCell>
       <CTableDataCell>{moment(item.createdAt).format('YYYY MM DD hh:ss:mm')}</CTableDataCell>
       <CTableDataCell>{moment(item.updatedAt).format('YYYY MM DD hh:ss:mm')}</CTableDataCell>
       <CTableDataCell>
       <CButtonGroup>
      {permissions.indexOf("EDIT_GIFSHIP_PACKAGE") > -1? <CButton color='primary' size='sm'><Link to={`/gifshipPackage/${0}/edit`}  state={item.id}  style={{color:'white', textDecoration:'none'}}>Edit</Link></CButton> :''}
        { permissions.indexOf("DELETE_GIFSHIP_PACKAGE") > -1? <CButton color='danger' size='sm'><Link to={'/delete'}  state={item.id +'&/gifshipPackage&/gifshipPackage/'} style={{color:'white', textDecoration:'none'}}>Delete</Link></CButton>:''}
        </CButtonGroup> </CTableDataCell>
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

export default GifshipPackageList