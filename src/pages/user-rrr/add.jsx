import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {  useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import moment from "moment";
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../../components/toast';

import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { render } from '@react-email/render';
import hostUrl from '../../helpers/hostUrl';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';
import { pin } from '../../helpers/customAlphabet';
import validateForm from '../../components/validateForm';

const AddUserRRR = () =>{ 
  const {currentUser, permissions } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [getusers, setUsers] = useState([]);
    const [regs, setRegs] = useState([]);
     const [msg, setMsg] = useState('');
   const [email , setEmail ] = useState(currentUser.email)
    const [isActive, setActive] = useState(false)
    const [isActiveMsg, setActiveMsg] = useState('')
      const [amount, setAmount] = useState(0)
   
    const navigate = useNavigate()
      const [getGifship, setGifship] = useState([]);
     const [gifshipTpyes, setGifshipTypes] = useState([])
      const [gifshipPkgs, setGifshipPkgs] = useState([])
    const [ inputs, setInputs ] = useState({
       rrr_number:'',
       	userId:'',	activated:'',
        	activatedby:'',	amount:0,
            	duration:0,	gifshipId:0,
                	gifshipTypeId:0,	gifshipPackageId:0,
                    	activated_date:'',	expired_date:'', authNumber:''
        
    })
    
  useEffect(()=>{
const loadUsers = async e =>{
 try{
          
        const users = await app.get('/users')
         setUsers(users.data);
        
    }catch(err){
         setMsg(err.message)
        }
        
    }
    const loadItem = async e =>{
 try{
          
        const gifship = await app.get('/gifship')
         setGifship(gifship.data);
    }catch(err){
         setMsg(err.message)
        }
        
    }
    
   
         loadItem() 
    loadUsers() 
     
         
         //===============================
if(!(permissions.indexOf("ADD_RRR") > -1)){
    navigate('/')
}
  }, [permissions, navigate, currentUser])
    //===============load Gifship Type===========
    const loadGifshipType =async e =>{
      try{
          const gifshipId = e.target.value
          if(gifshipId){
          const getgifshipId = await app.get(`/gifshipLists/${gifshipId}`)
          setGifshipTypes(getgifshipId.data);
          }
         
    }catch(err){
         setMsg(err.message)
        }
    }
   
    //===============load Gifship Pkg===========
    const loadGifshipTypePkg =async e =>{
      try{
          const id = e.target.value
          if(id){
          const gifshipPackageIds = await app.get(`/gifshipPackageList/${id}`)

          setGifshipPkgs(gifshipPackageIds.data);
          }
          else setGifshipPkgs([])
    }catch(err){
         setMsg(err.message)
        }
    }
    const getOnePkg = async e =>{

        try{
            const id = e.target.value
            const res = await app.get(`/gifshipPackage/${id}`)
            setAmount(res.data)
          
        }
        catch(err){

        }
    }
  const loadRegistration = async e =>{
 try{
        const Id = e.target.value 
        const regs = await app.get(`/register/${Id}/userId`)
         setRegs(regs.data)

     const active = await app.get(`/user-rrr/${Id}/0/`)
     if(active.data[0]?.length === 0) setActive(false)
     const st = moment(active.data[0]?.expired_date).format('MMMM YYYY')
      const a = moment()
      const diff = a.diff(st, 'days')
      if(diff > -1){
         setActive(false)
         }
      else{
         setActive(true)
         setActiveMsg('You still have active payment on your account. If you continue it will override the existing one. Expired date: ' + moment(active.data[0].expired_date).format('Do MMMM YYYY') )
         showToastMessage('You still have active payment on your account. If you continue it will override the existing one. Expired date: ' + moment(active.data[0].expired_date).format('Do MMMM YYYY'), 'warning')
         }
        }catch(err){
         setMsg(err.message)
        }
        
    }

        
    
    
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
         }


//=========================================

       
    const handleSubmit = async e =>{
      e.preventDefault()
      
        try{
          if(validateForm('validateForm') === 0){
            setLoading(true)
        let  rrr_number= document.getElementById('rrr_number').value
       	let  userId= document.getElementById('userId').value
        let  activated = 0
        let  activatedby= currentUser?.id
        let  amount= document.getElementById('amount').value
        let  amt= document.getElementById('amt').value
        let  duration= document.getElementById('duration').value
        let  gifshipId= document.getElementById('gifshipId').value
        let  gifshipTypeId= document.getElementById('gifshipTypeId').value
        let  gifshipPackageId= document.getElementById('gifshipPackageId').value
        let  activated_date= document.getElementById('activated_date').value
        let  minNumber= document.getElementById('minNumber').value
        let  maxNumber= document.getElementById('maxNumber').value
        let authNumber= document.getElementById('authNumber').value
        let  expired_date= moment(Date.parse(activated_date) + ((duration * 1000 * 60 * 60 * 24))).format('YYYY-MM-DD')

       await app.post('/user-rrr/', {rrr_number:rrr_number, userId:userId, activated:activated, activatedby:activatedby,	amount:amount,	duration:duration,	gifshipId:gifshipId,	gifshipTypeId:gifshipTypeId,	gifshipPackageId:gifshipPackageId,	activated_date:activated_date,	expired_date:expired_date, maxNumber:(amount/maxNumber), minNumber:minNumber, authNumber: authNumber})
       .then(async res =>{
        setLoading(false)
        let insertedId = res.data.id;
        let code = pin;
        await app.put(`/activate/${userId}/`,{}).then( async res1=>{
         await app.post('/code/0', {user_rrrId: insertedId, userId: user.id, code:code })
          .then(async res2 =>{
            setLoading(false)
           const emailHtml = render(<><h2>Congratulations!</h2><p>We are pleased to inform you that your account has been created successfully.<br />Username is your registered username <br />Password: ******** <br />Registration code: { code } <br /> You will be notified appropriately when your registration is activated.<br /> If you encounter any further issues or have any questions, please do not hesitate to reach out to our customer support team via our customer support channels.<br /> Visit <a href={hostUrl}> here</a> to login and complete your registartion <br /> <hr /> Thanks.<br /> Management Team.</p></>);
            await app.post('/sendmail/user/auth/email/send',{to: email, msg: emailHtml, subject: 'Registration Confirmation'})
              
          })
          .catch(err =>{
            setLoading(false)
            showToastMessage('Unable to renerate code: ' + err, 'error')
          })
           showToastMessage('User activated successfuly', 'success')
        })
      
        navigate('/user-rrr/', {state : "ok"})
       }).catch(err =>{
        setLoading(false)
        showToastMessage(err, 'error')
       })
        }
        }
        catch(errs){
          setLoading(false)
        setMsg("Invalid data entry, check the entry and try again.")
        }
    }


    
    return (
  
          <CRow >
         <CCol xs={12} style={{fontSize:'12px'}} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>MANAGE ENROLEE PAYMENT VIA RRR</strong>
          </CCardHeader>
          <CCardBody className='validateForm'>
          <span style={{color:'red'}}>{msg}</span>
            <DocsExample add="Payment Capturing ..."> 
            <CRow>
            <CCol xs={12} xl={4}>
        RRR NO#
        <CFormInput type="text" id="rrr_number" name="rrr_number" placeholder="RRR Number" onChange={handleChange} />
       </CCol>
       <CCol xs={12} xl={3}>
       Payment Confirmation Code
       <CFormInput type="text" id="authNumber" name="authNumber" placeholder="Payment confirmation code" onChange={handleChange} />
    
       </CCol>
            <CCol xs={12} xl={5}>
     Enrolee
        <CFormSelect name="userId" id="userId" onChange={handleChange} onBlur={loadRegistration}>
        <option value={0} disabled selected>--select User--</option>
        {
           (getusers.length ===0 ?'': getusers.map((item)=>(
            <option key={item.id} value={item.id}>{item.surname}  {item.othername} - {item.email} </option>
            ))
           )
        }
        </CFormSelect>
        </CCol>
        </CRow>
      <CRow>
      <CCol xs={12} xl={6}>
      Programme
        <CFormSelect name="gifshipId"  id="gifshipId" onChange={handleChange} onBlur={loadGifshipType} >
         <option disabled>-- select --</option>
         {
            (getGifship.length ===0? '':getGifship.map((r)=>{
                return(
        <option value={r.id} key={r.id}  selected>{r.name}</option>
       
                )
            })
            )}
         </CFormSelect>
        </CCol>  <CCol xs={12} xl={6} >
       Sub-Programme 
        <CFormSelect name="gifshipTypeId" id="gifshipTypeId" onChange={handleChange} onBlur={loadGifshipTypePkg} >
        <option disabled>-- select --</option>

       {
       (gifshipTpyes ===0?'':gifshipTpyes.map((r)=>{

      return(
        <option value={r.id} key={r.id} selected>{r.name}</option>
      )
        
}))}
       
        </CFormSelect>
        </CCol>
        </CRow>
        <CRow>
        <CCol xs={12} xl={6}>
        Package
        <CFormSelect name="gifshipPackageId" id="gifshipPackageId" onChange={handleChange} onBlur={getOnePkg} >
        <option disabled>-- select --</option>
       {
       (gifshipPkgs.length ===0?'':gifshipPkgs.map((r)=>{

      return(
        <option value={r.id} key={r.id} selected>{r.name}</option>
      )
        
}))}
        </CFormSelect>
       </CCol>
       <CCol xs={12} xl={6}>
       Min. Amount
        <CFormInput type="number" name="amt" id="amt" value={(amount.amount * amount.qty).toFixed(2)} readOnly/>
        <CFormInput type="hidden" name="minNumber" id="minNumber" value={amount.qty} readOnly/>
         <CFormInput type="hidden" name="maxNumber" id="maxNumber" value={amount.amount} readOnly/>
       </CCol>
       </CRow>
      <CRow>
        <CCol xs={12} xl={6}>Duration in Days 
        <CFormInput type="number" name="duration" id="duration" readOnly value={amount.duration} onChange={handleChange} />
       </CCol>
   <CCol xs={12} xl={6}>
   Amount Paid
        <CFormInput type="number" name="amount" id="amount" value={inputs.amount} placeholder="Amount paid" onChange={handleChange} />
       </CCol>
       </CRow>
        <CRow>
        <CCol xs={12} xl={6}>Start Date
        <CFormInput type="date" name="activated_date" id="activated_date" placeholder="Start date" onChange={handleChange} />
       </CCol>
<CCol>
        { isActive && <span style={{color:'red'}}>{isActiveMsg}</span>}
      </CCol>
      </CRow>
      <CRow>
      <CCol>
      <br />
             {permissions?.indexOf("ADD_RRR") > -1 && (inputs.amount >= (amount.amount * amount.qty)) && (inputs.amount % (amount.amount * amount.qty)) === 0 ? 
       <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleSubmit(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>update</span>
        </LoadingButton>
        <Goback url='/user-rrr/' />
       </Stack> :   <Goback url='/user-rrr/' />}
        <span style={{color:'red', marginLeft:'20%'}}>{msg}</span>
        </CCol>
        </CRow>
       </DocsExample></CCardBody></CCard></CCol></CRow>
       
    )
}

export default AddUserRRR