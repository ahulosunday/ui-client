import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import FormDialog from '../../components/registrationdialog';
import FormDialogCsv from '../../components/uploadcsv';
import { Pagination, Stack } from '@mui/material';
import { trackPromise } from 'react-promise-tracker';
import { per_page, startIndex } from '../../helpers/paging_indexes';
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


const ListRegister
 = () =>{
       const [gforms, setGforms] = useState([]);
       const [newreg, setnewreg] = useState(0);
       const [page, setPage] = React.useState(1);
        const [data, setData] = useState([]);
        const [rrrId, setRrrId] = useState(0)
        const [count, setCount] = useState(0)
        const [showUpload, setShowUpload] = useState(false)
   const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
      const ids = currentUser?.id; 

useEffect(()=>{
const loadItem = async e =>{
 try{
      await app.get(`/forms/register/${startIndex}/${per_page}`)
          .then(res=>{
                setGforms(res?.data.res)
                setData(res.data)
          })
          .catch(err=>{
               showToastMessage('Error occured while trying loading data','error')
          })
          
        }catch(err){
          showToastMessage('Error occured while trying loading data. Reason:' +err,'error')
        }}
         loadItem() 
    const checkUserId = async e =>{
      try{
         const reg = await app.get(`/register/${ids}/userId`)
         setnewreg(reg?.data.length)
         }catch(err){
         return(err.message)
        }
    }
    const checkUser_rrr_code = async e =>{
        await app.get(`/${currentUser.id}/user-rrr/getuserid/rrr/rrr/`)
        .then(res=>{
          const exp = moment(res.data.expired_date).format('YYYY MM')
          const today = moment()
          const diff = today.diff(exp, 'days')
         if(diff < 0){
          app.get(`/codes/${res.data.id}/code/rrr/`).then(res1=>{
            setCount(res.data.maxNumber)
           if(res1.data.count < res.data.maxNumber) setShowUpload(true)
           setRrrId(res1.data.rows[0].user_rrrId)
          }).catch(err=>{

          })
         }
          
        }).catch(err=>{
        showToastMessage(err, 'error')
        })
    }
     checkUserId()
     checkUser_rrr_code()
     

  }, [ids, navigate])
  const handleChange = async (e, value) => {
    setPage(value);
    try{
      await app.get(`/forms/register/${page}/${per_page}`)
          .then(res=>{
                setGforms(res?.data.res)
                setData(res.data)
          })
          .catch(err=>{
               showToastMessage('Error occured while trying loading data','error')
          })
          }catch(err){
          showToastMessage('Error occured while trying loading data. Reason:' +err,'error')
        }

  }
  
    return (
       <CRow >
      <CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LIST OF ENROLEES</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the Add New button to create new Enrolee.
            </p>
           
            <DocsExample href="" add="Enrolee List"></DocsExample>
            <span style={{width:'100%', display:'flex', flexDirection:'row', gap:'10px'}}>{ newreg > 0 ?'':<FormDialog /> }   {showUpload && <FormDialogCsv user_rrrId={rrrId} count ={count}/>} </span>
    
       <CTable striped style={{fontSize:'12px'}} align="middle" responsive>
       <CTableHead>
       <CTableRow>
       <CTableDataCell>ID No#</CTableDataCell>
       <CTableDataCell>SURNAME</CTableDataCell>
       <CTableDataCell>OTHERNAME</CTableDataCell>
       <CTableDataCell>MIDDLE NAME</CTableDataCell>
        <CTableDataCell>SEX</CTableDataCell>
        <CTableDataCell>MOBILE</CTableDataCell>
        <CTableDataCell>EMAIL</CTableDataCell>
         <CTableDataCell>PRIMARY HEALTHCARE </CTableDataCell>
       <CTableDataCell>EDITEDBY</CTableDataCell>
       <CTableDataCell></CTableDataCell>
       </CTableRow>
       </CTableHead>
       <CTableBody>
       {
        permissions?.indexOf('VIEW_ALL_MEMBERS') > -1?
        gforms.length === 0? '': gforms.map((item)=>{
       return  (         
            <CTableRow key={item.id}>
            <CTableDataCell>{item.idCode}</CTableDataCell>
       <CTableDataCell>{item.surname}</CTableDataCell>
       <CTableDataCell>{item.lastname}</CTableDataCell>
       <CTableDataCell>{item.middlename}</CTableDataCell>
        <CTableDataCell>{item.sex}</CTableDataCell>
       <CTableDataCell>{item.phone}</CTableDataCell>
       <CTableDataCell>{item.email}</CTableDataCell>
       <CTableDataCell>{item.hospital.hospitalCode} - {item.hospital.name}</CTableDataCell>      
        <CTableDataCell>{item.user.surname + ' ' + item.user.othername}</CTableDataCell>
       <CTableDataCell></CTableDataCell>
       <CTableDataCell>
       <CButtonGroup>
       { permissions?.indexOf("EDIT_MEMBERSHIP_FORM") > -1? <CButton color="secondary" size="sm" > <Link to={`/${0}/register/`}  state={item.id} className="edit" style={{color:'white', textDecoration:'none'}}> Edit</Link></CButton> :''}
        { permissions?.indexOf("VIEW_MEMBERSHIP_FORM") > -1? <CButton color="info" size="sm" > <Link to={`/${item.id}/register/3`}  state={item.id} className="view" style={{color:'white', textDecoration:'none'}}>View</Link></CButton> :'' }
        { permissions?.indexOf("DELETE_MEMBERSHIP_FORM") > -1? <CButton color="danger" size="sm" ><Link to={'/delete'}  state={item.id +'&/form/register&/register/'} className="delete" style={{color:'white', textDecoration:'none'}}>Delete</Link></CButton> :''}
     </CButtonGroup>
     </CTableDataCell>
       </CTableRow>
            )
              })
              :
              gforms.length === 0? '': gforms.map((item)=>{
                    if(currentUser?.id !== item.userId) return null
               return(

            <CTableRow key={item.id}>
            <CTableDataCell>{item.idCode}</CTableDataCell>
       <CTableDataCell>{item.surname}</CTableDataCell>
       <CTableDataCell>{item.lastname}</CTableDataCell>
       <CTableDataCell>{item.middlename}</CTableDataCell>
        <CTableDataCell>{item.sex}</CTableDataCell>
       <CTableDataCell>{item.phone}</CTableDataCell>
       <CTableDataCell>{item.email}</CTableDataCell>
       <CTableDataCell>{item.hospital.hospitalCode} - {item.hospital.name}</CTableDataCell>      
        <CTableDataCell>{item.user.surname + ' ' + item.user.othername}</CTableDataCell>
       <CTableDataCell></CTableDataCell>
       <CTableDataCell>
       <CButtonGroup>
       { permissions?.indexOf("EDIT_MEMBERSHIP_FORM") > -1? <CButton color="secondary" size="sm" ><Link to={`/${0}/register/`}  state={item.id} className="edit"> Edit</Link></CButton> :''}
        { permissions?.indexOf("VIEW_MEMBERSHIP_FORM") > -1? <CButton color="info" size="sm" ><Link to={`/${item.id}/register/3`}  state={item.id} className="view">View</Link></CButton> :'' }
        { permissions?.indexOf("DELETE_MEMBERSHIP_FORM") > -1? <CButton color="danger" size="sm" ><Link to={'/delete'}  state={item.id +'&/form/register&/register/'} className="delete">Delete</Link></CButton> :''}
        </CButtonGroup></CTableDataCell>
       </CTableRow>
            )
            })
           
        }
      </CTableBody>
       </CTable>
        
       <Stack spacing={2}>
      <Pagination count={data.totalPages} page={page} onChange={handleChange} variant="outlined" shape="rounded"  color="secondary" />
    </Stack>
      
       </CCardBody>
       </CCard>
       </CCol>
       </CRow>
         
    )
}

export default ListRegister
