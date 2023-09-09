import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";
import ErrorMsg from "../../pages/errorMsg";
import { v1 } from "uuid";
import moment from "moment";
import baseURLStatic from '../../helpers/imageUrl';
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../../components/toast';
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { DocsExample } from '../../components';

const EditRegister = () =>{
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false)
    const [hmo, setHmo]= useState([])
     const [file, setFile] = useState(null)
      const [ imgurl , setImgUrl] = useState(null)
      const[rrrCode, setrrrCode] = useState([])
    //Register============
    const [registercountry, setRegisterCountry] = useState([])
    const [registerregions, setRegisterRegion] = useState([])
    const [registerstates, setRegisterStates] = useState([])
    const [registerlgas, setRegisterLgas] = useState([])
    const [registerWard, setRegisterWard] = useState([])
    //Resident======================================
    const [residentcountry, setResidentCountry] = useState([])
    const [residentregions, setResidentRegion] = useState([])
    const [residentstates, setResidentStates] = useState([])
    const [residentlgas, setResidentLgas] = useState([])
    const [residentWard, setResidentWard] = useState([])
    //Origin=========================================
    const [country, setCountry] = useState([])
    const [regions, setRegion] = useState([])
    const [states, setStates] = useState([])
    const [lgas, setLgas] = useState([])
     const [ward, setWard] = useState([])
    //========================
    const [fifships, setGifships] = useState([])
     const [fifshipTpyes, setGifshipTypes] = useState([])
      const [fifshipPkgs, setGifshipPkgs] = useState([])
      const [hospitals, setHospitals] =  useState([])
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()
     const id = location.state//pathname.split("/")[1]
    const [ inputs, setInputs ] = useState({
      id:'',
      idCode:Date.now(),
       surname: currentUser?.surname,	middlename: "",	lastname:currentUser?.othername, sex:"",	dob:"",	marital:"",	phone:currentUser?.phone,
       	email:currentUser?.email, address:"",	bloodGroup:"",	countryOrigin:"",	regionOrigin:"",	stateOrigin:"",
        	lgaOrigin:"",wardOrigin:"",	regiteredCountry:"",	regiteredRegion:"",	regiteredState:"",	regiteredLga:"", regiteredWard:"",
            	residentCountry:"",	residentRegion:"",	residentState:"",	residentLga:"",residentWard:"",	gifshipId:"",
                	gifshipPackageId:"",gifshipTypeId:"",	nin:"",	hospitalId:"",	hmoId:"",	userId:currentUser?.id,
    })
      
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        
    }
  
    const handleUpdate = async e =>{
        try{
        e.preventDefault()
        setLoading(true)
        trackPromise(app.put(`/register/${inputs.id}/`, inputs).then(res=>{
          if(res.status === 200){
            setLoading(false)
          showToastMessage('Transaction completed with status: '+ res.statusText, 'success')
           navigate('/form/register')
      }
        }).catch(err=>{
          setLoading(false)
          showToastMessage('Transaction failed ...', 'error')
        })
        )
       
         
        }
        catch(errs){
          setLoading(false)
        setMsg('Duplicate or data violation found. Please check the entry and try again.')
        showToastMessage('Duplicate or data violation found. Please check the entry and try again.', 'error')
        }
    }
     
    //===============load Gifship Type===========
    const loadGifshipType =async e =>{
      try{
          const gifshipId = e.target.value
          const getgifshipId = await app.get(`/gifshipLists/${gifshipId}`)
          setGifshipTypes(getgifshipId.data);
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load Gifship Pkg===========
    const loadGifshipTypePkg =async e =>{
      try{
          const id = e.target.value
          const gifshipPackageIds = await app.get(`/gifshipPackageList/${id}`)
          setGifshipPkgs(gifshipPackageIds.data);
    }catch(err){
         setMsg(err.message)
        }
    }
     //============load region=========
    const loadRegionOrigin =async e =>{
      try{
          const countryId = e.target.value
          const getRegions = await app.get(`/region/country/${countryId}`)
          setRegion(getRegions.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load states of origin===========
    const loadStatesOrigin =async e =>{
      try{
          const regionId = e.target.value
          const getStates = await app.get(`/state/region/${regionId}`)
          setStates(getStates.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load lga of origin===========
    const loadLgasOrigin =async e =>{
      try{
          const stateId = e.target.value
          const getLgas = await app.get(`/lga/state/${stateId}`)
          setLgas(getLgas.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //=========load ward
    const loadWardOrigin =async e =>{
      try{
          const LgaId = e.target.value
          const getWard = await app.get(`/ward/lga/${LgaId}`)
          setWard(getWard.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }

     //============load region resident=========
    const loadRegionResident =async e =>{
      try{
          const countryId = e.target.value
          const getRegions = await app.get(`/region/country/${countryId}`)
          setResidentRegion(getRegions.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load states===========
    const loadStatesResident =async e =>{
      try{
          const regionId = e.target.value
          const getStates = await app.get(`/state/region/${regionId}`)
          setResidentStates(getStates.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load lga of origin===========
    const loadLgasResident =async e =>{
      try{
          const stateId = e.target.value
          const getLgas = await app.get(`/lga/state/${stateId}`)
          setResidentLgas(getLgas.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load lga of origin===========
    const loadWardResident =async e =>{
      try{
          const lgaId = e.target.value
          const getWard = await app.get(`/ward/lga/${lgaId}`)
          setResidentWard(getWard.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }

    //=====================end here
    //============load region Register=========
    const loadRegionRegister =async e =>{
      try{
          const countryId = e.target.value
          const getRegions = await app.get(`/region/country/${countryId}`)
          setRegisterRegion(getRegions.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load states===========
    const loadStatesRegister =async e =>{
      try{
          const regionId = e.target.value
          const getStates = await app.get(`/state/region/${regionId}`)
          setRegisterStates(getStates.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load lga===========
    const loadLgasRegister =async e =>{
      try{
          const stateId = e.target.value
          const getLgas = await app.get(`/lga/state/${stateId}`)
          setRegisterLgas(getLgas.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //===============load ward===========
    const loadWardRegister =async e =>{
      try{
          const lgaId = e.target.value
          const getWard = await app.get(`/ward/lga/${lgaId}`)
          setRegisterWard(getWard.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
   
   
    //load hospitals ============
    const loadHospital = async e =>{
 try{
  const lga = e.target.value
         const hospital = await app.get(`/hospital/${inputs.residentCountry}/${inputs.residentRegion}/${inputs.residentState}/${inputs.residentLga}/lga`)
         setHospitals(hospital.data)
         }catch(err){
         return(err.message)
        }
        
    }
 
    //=============================
    useEffect(()=>{
           if(!(permissions.indexOf("EDIT_MEMBERSHIP_FORM") > -1)){
      navigate('/')
     }
     const activePackage = async e =>{
      try{
        trackPromise(
          app.get(`/code/${inputs.userId}/0/`,{})
          .then(res=>{
            setrrrCode(res.data.user_rrr)
          })
          .catch(err=>{

          })
        )
      }
      catch(err){

      }
     }
     activePackage()
const loadItem = async e =>{
 try{
          
        const getCountry = await app.get('/country')
         setCountry(getCountry.data);
         setRegisterCountry(getCountry.data)
         setResidentCountry(getCountry.data)
       
    }catch(err){
         setMsg(err.message)
        }
     
        
    } 
    
    //============load gifship
    const loadGifship =async e =>{
      try{
          
          const getifships = await app.get(`/gifship`)
          setGifships(getifships.data);
       
    }catch(err){
         setMsg(err.message)
        }
    }
    //======================Load Hmo
    const loadHmo = async e =>{
 try{
         
        const hmos = await app.get('/hmos')
         setHmo(hmos.data)
         
    }catch(err){
         return(err.message)
        }
        
    }
    const formData = async e =>{
        try{
        if(id !== null){ const res = await app.get(`/register/${id}`)
           setInputs(res.data)}
           }
        catch(err){

        }
    }
     
    formData()
    loadHmo() 
    loadItem()
    loadGifship()
   
    }, [currentUser, permissions, id])


    
    return (
 <CRow >
        <CCol xs={12} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>MEMBERSHIP REGISTRATION FORM</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="Personal Information"> 
         
         
         <div style={{textAlign: 'right'}}><img  alt="" src={ imgurl? imgurl : `${baseURLStatic}${currentUser?.imgurl}`} height={100} width={100}  /></div>
        
         <CRow>
         <CCol xl={6} xs={12} >
      <label htmlFor="code"><b>NIN</b></label> 
        <CFormInput type="text" value={inputs.nin} name="nin" placeholder="NIN" onChange={handleChange}  />
        </CCol>
          <CCol xl={6} xs={12}>
          <h5>ID No#: {inputs.idCode}</h5>
      </CCol>
         </CRow>

       <CRow>
       <CCol xl={6} xs={12}>
       <label htmlFor="name">Surname</label> 
       <CFormInput type="text" value={inputs.surname} readOnly name="surname" placeholder="Surname" onChange={handleChange}  />
        </CCol>
        
        <CCol xl={6} xs={12}>
        <label htmlFor="code">Middlename</label> 
        <CFormInput type="text" value={inputs.middlename} name="middlename" placeholder="Middle Name" onChange={handleChange} />
     </CCol>
       </CRow>
        <CRow>
        <CCol xl={6} xs={12}>
       <label htmlFor="name">Lastname</label> 
       <CFormInput type="text" value={inputs.lastname} readOnly name="lastname" placeholder="Last Name" onChange={handleChange}  />
        </CCol>
        <CCol xl={6} xs={12}>
        <label htmlFor="code">Phone</label> 
        <CFormInput type="text" value={inputs.phone} readOnly name="phone" placeholder="Phone" onChange={handleChange} />
       </CCol>
       </CRow>
       <CRow>
       <CCol xl={6} xs={12}>
       <label htmlFor="name">Gender</label> 
       <CFormSelect  name="sex" onChange={handleChange}  >
       <option value={''} >--select--</option>
       <option value={'Male'} selected={inputs.sex ==='Male'? 'selelected':''}>Male</option>
       <option value={'Female'} selected={inputs.sex ==='Female'? 'selelected':''}>Female</option>
       </CFormSelect>
       </CCol>
       <CCol xl={6} xs={12}>
        <label htmlFor="code">Marital Status</label> 
        <CFormSelect  name="marital" onChange={handleChange}  >
       <option value={''} >--select--</option>
       <option value={'Single'} selected={inputs.marital ==='Single'? 'selelected':''} >Single</option>
       <option value={'Married'} selected={inputs.marital ==='Married'? 'selelected':''} >Married</option>
       <option value={'Others'} selected={inputs.marital ==='Others'? 'selelected':''} >Others</option>
       </CFormSelect>
         </CCol>
         </CRow>
          <CRow>
          <CCol xl={6} xs={12}>
       <label htmlFor="name">DoB</label> 
       <CFormInput type="date" value={moment(inputs.dob).format('YYYY-MM-DD')} name="dob" placeholder="Date of birth" onChange={handleChange}  />
        </CCol>
        <CCol xl={6} xs={12}>
        <label htmlFor="code">Email</label>
        <CFormInput type="email" value={inputs.email} readOnly name="email" placeholder="Email Address" onChange={handleChange} />
       </CCol>
       </CRow>
       <CRow>
       <CCol xl={6} xs={12}>
       <label htmlFor="name">Blood Group</label> 
       <CFormInput type="text" value={inputs.bloodGroup} name="bloodGroup" placeholder="Blood Group" onChange={handleChange}  />
        </CCol>
        <CCol xl={6} xs={12}>   
        <label htmlFor="name">Address</label> 
       <CFormTextarea value={inputs.address} name="address"  placeholder="Address" onChange={handleChange}  ></CFormTextarea>
       </CCol>
       </CRow>
      </DocsExample>
      <DocsExample add='Citizenship Information'>
         <CRow>
         <CCol xl={6} xs={12}>
       <label htmlFor="name">Country</label> 
       <CFormSelect name="countryOrigin"  onChange={handleChange} onBlur={loadRegionOrigin} >
       <option value={0} >--select--</option>
      { 
       country.length === 0? '' : country.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.countryOrigin ===item.id? 'selelected':''}>{item.code + ' - ' + item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
        <CCol xl={6} xs={12}>
       <label htmlFor="name">Region</label> 
         <CFormSelect name="regionOrigin"  onChange={handleChange} onBlur={loadStatesOrigin} >
       <option value={0} >--select--</option>
      { 
      regions.length === 0? '' : regions.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.regionOrigin ===item.id? 'selelected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect></CCol>
       </CRow>
       
       <CRow>
       <CCol xl={6} xs={12}>
       <label htmlFor="name">State</label> 
         <CFormSelect name="stateOrigin"  onChange={handleChange} onBlur={loadLgasOrigin}>
        <option value={0} >--select--</option>
      
      { 
      states.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.stateOrigin ===item.id? 'selelected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       <CCol xl={6} xs={12}>
       <label htmlFor="name">LGA</label> 
         <CFormSelect name="lgaOrigin"  onChange={handleChange} onBlur={loadWardOrigin} >
        <option value={0} >--select--</option>
      { 
      lgas.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.lgaOrigin ===item.id? 'selelected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       </CRow>

       <CRow>
       <CCol xl={6} xs={12}>
       <label htmlFor="name">Ward</label> 
         <CFormSelect name="wardOrigin"  onChange={handleChange} >
        <option value={0} >--select--</option>
      { 
      ward.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.wardOrigin ===item.id? 'selelected':''}>{item.name} </option>
      ))
      }
      </CFormSelect>
       </CCol>
       <CCol xl={6} xs={12}>
      <CFormLabel style={{color:'red'}}>Note: All fields are required</CFormLabel>
       </CCol>
       </CRow>
      </DocsExample>
      <DocsExample add="GIFSHIP">
       <CRow>
       <CCol xl={6} xs={12}>
       <label htmlFor="name">HMO</label> 
       <CFormSelect  name="hmoId" onChange={handleChange}  >
       <option value={0} >--select--</option>
        {
       
        hmo.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.hmoId ===item.id? 'selelected':''}>{item.name} </option>
      ))
      }
       </CFormSelect>
       </CCol>
       <CCol xl={6} xs={12}>
        <label htmlFor="code">Programme</label> 
        <CFormSelect  name="gifshipId" onChange={handleChange} onBlur={loadGifshipType} >
       <option value={0} >--select--</option>
       {
       
        fifships.map((item)=>{

        if(item.id !== rrrCode.gifshipId) return null
      return ( <option value={item.id} key={item.id} selected={inputs.gifshipId ===item.id? 'selelected':''}>{item.name} </option>
       )})
      }
       
       </CFormSelect>
       </CCol>
       </CRow>
        
          <CRow>
          <CCol xl={6} xs={12}>
       <label htmlFor="gifshipTypeId">Sub</label> 
       <CFormSelect  name="gifshipTypeId" onChange={handleChange} onBlur={loadGifshipTypePkg}  >
       <option value={0} >--select--</option>
       {
       
        fifshipTpyes.map((item)=>{
          if(item.id !== rrrCode.gifshipTypeId) return null
        return(
        <option value={item.id} key={item.id} selected={inputs.gifshipTypeId ===item.id? 'selelected':''}>{item.name} </option>
      )})
      }
       </CFormSelect>
       </CCol>
       <CCol xl={6} xs={12}>
        <label htmlFor="code">Package</label> 
        <CFormSelect  name="gifshipPackageId" onChange={handleChange} >
        <option value={0} >--select--</option>
       {
       
        fifshipPkgs.map((item)=>{
           if(item.id !== rrrCode.gifshipPackageId) return null
        return(
        <option value={item.id} key={item.id} selected={inputs.gifshipPackageId ===item.id? 'selelected':''}>{item.name} </option>
      )})
      }
       </CFormSelect>
     </CCol>
        </CRow>
      </DocsExample>
      <DocsExample add="Place of Residence">
 <CRow>
 <CCol xl={6} xs={12}>
        
       <label htmlFor="name">Country</label> 
       <CFormSelect name="residentCountry"  onChange={handleChange} onBlur={loadRegionResident} >
       <option value={0} >--select--</option>
      { 
      residentcountry.map((item)=>(
        <option value={item.id} key={item.id} selected={ inputs.residentCountry === item.id? 'selected': ''}>{item.code + ' - ' + item.name} </option>
      ))
      }
      
       </CFormSelect>
    </CCol>
    <CCol xl={6} xs={12}>
       <label htmlFor="name">Region</label> 
         <CFormSelect name="residentRegion"  onChange={handleChange} onBlur={loadStatesResident} >
       <option value={0} >--select--</option>
      { 
      residentregions.map((item)=>(
        <option value={item.id} key={item.id} selected ={ inputs.residentRegion === item.id? 'selected': ''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       </CRow>
       <CRow>
       
       <CCol xl={6} xs={12}>
       <label htmlFor="name">State</label> 
         <CFormSelect name="residentState"  onChange={handleChange} onBlur={loadLgasResident}>
       <option value={0} >--select--</option>
      { 
      residentstates.map((item)=>(
        <option value={item.id} key={item.id} selected ={ inputs.residentState === item.id? 'selected': ''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       <CCol xl={6} xs={12}>
       <label htmlFor="name">LGA</label> 
         <CFormSelect name="residentLga"  onChange={handleChange} onBlur={loadWardResident} >
       <option value={0} >--select--</option>
      { 
      residentlgas.map((item)=>(
        <option value={item.id} key={item.id} selected ={ inputs.residentLga === item.id? 'selected': ''}>{item.name} </option>
      ))
      }
      
       </CFormSelect></CCol>
       </CRow>
       <CRow>
       <CCol xl={6} xs={12}>
       <label htmlFor="name">Ward</label> 
         <CFormSelect name="residentWard"  onChange={handleChange} onBlur={loadHospital} >
        <option value={0} >--select--</option>
      { 
      residentWard.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.residentWard ===item.id? 'selelected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
<CCol></CCol>
       </CRow>
       </DocsExample>
        <DocsExample add="Primary Healthcare">
      
          <CRow>
          <CCol xl={6} xs={12}>
        <label htmlFor="code">Primary Healthcare</label> 
        <CFormSelect  name="hospitalId" onChange={handleChange}  >
       <option value={0} >--select--</option>
      { 
      hospitals.map((item)=>(
        <option value={item.id} key={item.id} selected={ inputs.hospitalId === item.id? 'selected': ''}>{item.hospitalCode + ' - ' + item.name} </option>
      ))
      }
       </CFormSelect>
         </CCol>
         </CRow>
        </DocsExample>
      <DocsExample add="Place of Registration">
        <CRow>
        <CCol xl={6} xs={12}>
       <label htmlFor="name">Country</label> 
       <CFormSelect name="regiteredCountry"  onChange={handleChange} onBlur={loadRegionRegister} >
      <option value={0} >--select--</option>
      { 
      registercountry.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.regiteredCountry ===item.id? 'selelected':''}>{item.code + ' - ' + item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       <CCol xl={6} xs={12}>        
       <label htmlFor="name">Region</label> 
         <CFormSelect name="regiteredRegion"  onChange={handleChange} onBlur={loadStatesRegister} >
       <option value={0} >--select--</option>
      { 
      registerregions.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.regiteredRegion ===item.id? 'selelected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       </CRow>
       
       <CRow>
       <CCol xl={6} xs={12}>
       <label htmlFor="name">State</label> 
         <CFormSelect name="regiteredState"  onChange={handleChange} onBlur={loadLgasRegister}>
      <option value={0} >--select--</option>
      { 
      registerstates.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.regiteredState ===item.id? 'selelected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       <CCol xl={6} xs={12}>
       <label htmlFor="name">Lga</label> 
         <CFormSelect name="regiteredLga"  onChange={handleChange}  onBlur={loadWardRegister}>
      <option value={0} >--select--</option>
      { 
      registerlgas.map((items)=>(
        <option value={items.id} key={items.id} selected={items.id ===inputs.regiteredLga? 'selelected':''}>{items.name} </option>
      ))
      }
      
       </CFormSelect></CCol>
       </CRow>
       <CRow>
       <CCol xl={6} xs={12}>
              <label htmlFor="name">Ward</label> 
         <CFormSelect name="registeredWard"  onChange={handleChange} >
        <option value={0} >--select--</option>
      { 
      registerWard.map((item)=>(
        <option value={item.id} key={item.id} selected={inputs.residentWard ===item.id? 'selelected':''}>{item.name} </option>
      ))
      }
      
       </CFormSelect>
       </CCol>
       <CCol xl={6} xs={12}>
       <label htmlFor="name"></label> 
       <CFormInput type='text' style={{color:'red', border:'none'}} value={'Note: All fields are required'} disabled />
       </CCol>
       </CRow>
      </DocsExample>
             
<DocsExample add="FINALIZE">
 <Stack direction="row" spacing={1}> <LoadingButton size="small"
          onClick={(e) => handleUpdate(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>update</span>
        </LoadingButton>
        <Goback url='/form/register' />
       </Stack> 
         
   
     {msg=== ''? '': <ErrorMsg msg={msg} />}
</DocsExample>
            </CCardBody>
            </CCard>
            </CCol>
            </CRow>      
       
    )
}

export default EditRegister