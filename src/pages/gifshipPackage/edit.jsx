import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import showToastMessage from '../../components/toast';
import { trackPromise } from 'react-promise-tracker';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormSelect, CRow } from '@coreui/react';
import { DocsExample } from '../../components';

const EditGifshipPackage = () =>{
    const [getGifship, setGifship] = useState([]);
    const [getGifshipType, setGifshipType] = useState([]);
     const [loading, setLoading] = useState(false);
    const {currentUser, permissions } = useContext(AuthContext);
     const location = useLocation()
    const navigate = useNavigate()
     const id = location.state//pathname.split("/")[2]
    const [ inputs, setInputs ] = useState({
       name: "",
       userId: currentUser?.id, 
       gifshipTypeId: "",
       gifshipId: '',
       amount: 0,
        qty: 0,
        duration:0,
        id:0,
        maxNumber:0
        
    })
    
  useEffect(()=>{
const loadItem = async e =>{
 try{
        await app.get('/gifship').then(res=>{
            setGifship(res.data);
        }).catch(err=>{
            showToastMessage(err, 'error')
        })
         
    }catch(err){
         showToastMessage('Internal error occured ... ', 'error')
        }
        
    }
    const formDate = async e =>{
 try{ 
       await app.get(`/gifshipPackage/${id}`).then(res=>{
        setInputs(res.data);
       }).catch(err=>{
        showToastMessage(err, 'error')
       })
    }catch(err){
        showToastMessage('Internal error occured ... ', 'error')
        }
        
    }
        loadItem() 
         formDate()
         
         //===============================
if(!(permissions.indexOf("EDIT_GIFSHIP_PACKAGE") > -1)){
    navigate('/')
}
  }, [id, permissions, navigate])
  const loadItemType = async e =>{
 try{
        const itemTypeId = e.target.value 
       await app.get(`/gifshipLists/${itemTypeId}`).then(res=>{
        setGifshipType(res.data);
       }).catch(err=>{
        showToastMessage(err, 'error')
       })
         }catch(err){
         showToastMessage('Internal error occured ...', 'error')
        }
        
    }
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
    const handleUpdate = async e =>{
        try{
            e.preventDefault()
            setLoading(true)
       await app.put(`/gifshipPackage/${inputs.id}`, inputs)
       .then(res =>{
        setLoading(false)
        showToastMessage('Update successful', 'success')
        navigate('/gifshipPackage')
       })
       .catch(err =>{
        setLoading(false)
         showToastMessage('Update Failed', 'error')
       })
     
        }
        catch(errs){
            setLoading(false)
        showToastMessage("Invalid data entry, check the entry and try again", 'error')
        }
    }


    
    return (
       <div className="form-horizontal">
           
                 <CRow >
<CCol xs={12} style={{fontSize:'12px'}} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>Programme Packages</strong>
          </CCardHeader>
          <CCardBody>
            
            <DocsExample add="Programme Packages"> 
       <CRow>
       <CCol xs>
       Programme
        <CFormSelect name="gifshipId" onChange={handleChange}  onBlur={loadItemType}>
        <option value={0} disabled selected>--select Programme--</option>
        {
            getGifship.length ===0? '': getGifship.map((item)=>(
            <option key={item.id} selected ={inputs.gifshipId===item.id? 'selected': ''} value={item.id}>{item.name}</option>
            ))
        }
        </CFormSelect>
        </CCol>
        <CCol xs>
        Sub-Programme
           <CFormSelect name="gifshipTypeId" onChange={handleChange} >
        <option value={0} disabled selected>--select Sub-Programme--</option>
        {
            getGifshipType.length === 0? '': getGifshipType.map((item)=>(
            <option key={item.id} selected ={inputs.gifshipTypeId===item.id? 'selected': ''} value={item.id}>{item.name}</option>
            ))
        }
        </CFormSelect>
        </CCol>
        </CRow>
       <CRow>
       <CCol xs>
       Package
        <CFormInput type="text" name="name" value={inputs.name} placeholder="Package" onChange={handleChange} />
       </CCol>
       <CCol xs>
       Amount (per Enrolee)
       <CFormInput type="number" name="amount" value={inputs.amount} placeholder="Amount per Enrolee" onChange={handleChange} />
       </CCol>
       </CRow>
       <CRow>
       <CCol xs>
       Min Number of Enrolees
        <CFormInput type="number" name="qty" value={inputs.qty} placeholder="Min Number of Enrolees" onChange={handleChange} />
       </CCol>
       <CCol xs>
       Max Number of Enrolees
       <CFormInput type="number" name="maxNumber" value={inputs.maxNumber} placeholder="Max Number of Enrolees" onChange={handleChange} />
       </CCol>
       </CRow>
       <CRow>
       <CCol xs>
       Duration in Days
       <CFormInput type="number" name="duration" value={inputs.duration} placeholder="Duration in days" onChange={handleChange} />
       </CCol>
       <CCol></CCol>
       </CRow>
    <CRow>
    <CCol>
   <br />
         { permissions.indexOf("EDIT_GIFSHIP_PACKAGE") > -1? 
       <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleUpdate(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Update</span>
        </LoadingButton>
       <Goback url='/gifshipPackage' />
        </Stack> : <Goback url='/gifshipPackage' />}
          </CCol>
    </CRow>
    </DocsExample>
    </CCardBody>
    </CCard></CCol>
    </CRow>
        <div className="gifship" style={{marginTop:'30px'}}>
         <form>
         <h1>Programme Package [{inputs.name}]</h1>
        <div className="input-group">
       <label htmlFor="gifshipId">Programme</label> 
        <select name="gifshipId" onChange={handleChange}  onBlur={loadItemType}>
        <option value={0} disabled selected>--select Programme--</option>
        {
            getGifship.length===0? '': getGifship.map((item)=>(
            <option key={item.id} value={item.id} selected ={inputs.gifshipId===item.id? 'selected': ''}>{item.name}</option>
            ))
        }
        </select>
        </div>
        <div className="input-group">
       <label htmlFor="gifshipTypeId">SubProgramme</label> 
        <select name="gifshipTypeId" onChange={handleChange} >
        <option value={0} disabled selected>--select sub Programme--</option>
        {
            getGifshipType.length===0?'':getGifshipType.map((item)=>(
            <option key={item.id} value={item.id} selected ={inputs.gifshipTypeId===item.id? 'selected': ''}>{item.name}</option>
            ))//setGifshipType
        }
        </select>
        </div>
        <div className="input-group">
       <label htmlFor="name">Package</label> 
        <input type="text" name="name" value={inputs.name} placeholder="Package" onChange={handleChange} />
       </div>
       <div className="input-group">
       <label htmlFor="name">Amount (per one)</label> 
        <input type="number" name="amount" value={inputs.amount} placeholder="Amount per person" onChange={handleChange} />
       </div>
       <div className="input-group">
       <label htmlFor="name">Min Number of Enrolees</label> 
        <input type="number" name="qty" value={inputs.qty} placeholder="Min Number of Enrolees" onChange={handleChange} />
       </div>
       <div className="input-group">
       <label htmlFor="name">Max Number of Enrolees</label> 
        <input type="number" name="maxNumber" value={inputs.maxNumber} placeholder="Max Number of Enrolees" onChange={handleChange} />
       </div>
       <div className="input-group">
       <label htmlFor="name">Duration in Days</label> 
        <input type="number" name="duration" value={inputs.duration} placeholder="Duration in days" onChange={handleChange} />
       </div>
       <div className="input-group">
       <label htmlFor="buttton"></label> 
        { permissions.indexOf("EDIT_GIFSHIP_PACKAGE") > -1? 
       <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleUpdate(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Update</span>
        </LoadingButton>
       <Goback url='/gifshipPackage' />
        </Stack> : <Goback url='/gifshipPackage' />}
        
        </div>
         </form>
        </div>
           
       </div>
       
    )
}

export default EditGifshipPackage