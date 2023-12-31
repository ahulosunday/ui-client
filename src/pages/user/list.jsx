import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { per_page, startIndex } from '../../helpers/paging_indexes';
import showToastMessage from '../../components/toast';
import { Alert, Pagination, Stack } from '@mui/material';
import baseURLStatic from '../../helpers/imageUrl';
import UndoIcon from '@mui/icons-material/Undo';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
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
import Loadings from '../../components/loading';

const ListUsers = () =>{
       const [users, setUsers] = useState([]);
       const [errs, setError] = useState('')
       const [page, setPage] = useState(1)
        const [data, setData] = useState([]);
       const {currentUser, permissions } = useContext(AuthContext);
       const navigate = useNavigate()
       const [loading, setLoading] = useState(true)
       

useEffect(()=>{
const loadItem = async e =>{
 try{         
        await app.get(`/users/${startIndex}/${per_page}/0/1`).then(res=>{
           setUsers(res.data.res)
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
if(!(permissions.indexOf("VIEW_USERS") > -1)){
  navigate("/")
}
  }, [permissions, navigate, currentUser])
 
  const handleChange = async (e, value) => {
    e.preventDefault()
    setPage(value);
      try{
       await app.get(`/users/${page}/${per_page}/0/1`).then( async res=>{
           setStates(res.data.res)
           setData(res.data)
        }).catch(err=>{
          showToastMessage(err, 'error')
        })
      }
      catch(err){
       showToastMessage('Internal error !', 'error')
       setError('Internal error occured...')
      }
  }
 
    
    return (
       <CRow >
<CCol xs={12} xl={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LIST OF USERS</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new User.
            </p>
           {errs}
            <DocsExample add="List of Users" >
            <Link to='/user/activate/0/1'>Activate User</Link> 
       <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow>
       <CTableHeaderCell></CTableHeaderCell>
       <CTableHeaderCell>S/N</CTableHeaderCell>
       <CTableHeaderCell>USERNAME</CTableHeaderCell>
        <CTableHeaderCell>EMAIL</CTableHeaderCell>
         <CTableHeaderCell>SURNAME</CTableHeaderCell>
       <CTableHeaderCell>OTHERNAME</CTableHeaderCell>
       <CTableHeaderCell>PHONE NO#</CTableHeaderCell>
       <CTableHeaderCell>IS ACTIVE?</CTableHeaderCell>
       <CTableHeaderCell>CREATED_DATE</CTableHeaderCell>
       <CTableHeaderCell>LAST_UPDATED</CTableHeaderCell>
       <CTableHeaderCell>IMAGE</CTableHeaderCell>
       <CTableHeaderCell></CTableHeaderCell>
       
       </CTableRow>
       </CTableHead>
       <CTableBody>
       <Loadings loading={loading} />
       {
        
            users.length===0? '': users.map((item, index)=>(
            <CTableRow key={item.id}>
            <CTableDataCell><Link title='Deactive user' to={`/user/Deactivate/0/1/0`} state={item.id+'&'+item.username+'&/users/list'}>Deactivate</Link></CTableDataCell>
             <CTableDataCell>{index+1}</CTableDataCell>
       <CTableDataCell>{item.username}</CTableDataCell>
       <CTableDataCell>{item.email}</CTableDataCell> 
       <CTableDataCell>{item.surname}</CTableDataCell>
       <CTableDataCell>{item.othername}</CTableDataCell>
        <CTableDataCell>{item.phone}</CTableDataCell>
        <CTableDataCell>{item.isActive?'True':'False'}</CTableDataCell>
        <CTableDataCell>{item.createdAt}</CTableDataCell>
        <CTableDataCell>{item.updatedAt}</CTableDataCell>
         <CTableDataCell><img  alt="" src={ `${baseURLStatic}${item.imgurl}`} height={50} width={50}  /></CTableDataCell>
        <CTableDataCell><Link style={{color:'red'}} title='Delete this user' to={'/delete'} state={item.id + '&/users/list&/users/'} ><UndoIcon /></Link></CTableDataCell>
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

export default ListUsers