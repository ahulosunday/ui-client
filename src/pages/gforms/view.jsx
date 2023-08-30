import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import moment from 'moment'
import baseURLStatic from '../../helpers/imageUrl';
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../../components/toast';
import { CCard, CCardBody, CCardHeader, CCol } from '@coreui/react';
import { DocsExample } from '../../components';

const ViewForm
 = () =>{
 
     const navigate = useNavigate()
     const location = useLocation()
      const id = location.state //pathname.split("/")[1]
      const [inputs, setInputs] = useState({
      idCode:'',
       surname:'',	middlename: "",	lastname:'', sex:"",	dob:"",	marital:"",	phone:'',
       	email:'', address:"",	bloodGroup:"",	countryOrigin:"",	regionOrigin:"",	stateOrigin:"",
        	lgaOrigin:"",	regiteredCountry:"",	regiteredRegion:"",	regiteredState:"",	regiteredLga:"",
            	residentCountry:"",	residentRegion:"",	residentState:"",	residentLga:"",	gifshipId:"",
                	gifshipPackageId:"",gifshipTypeId:"",	nin:"",	hospitalId:"",	hmoId:"",	userId:'',
    })
      const [lgas, setLgas] = useState('') 
      const [states, setStates] = useState('')
      const [stateResident, setStateResident] = useState('')
      const [lgaResident, setLgaResident] = useState('')
      const [age, setAge] = useState(0)
      const [gifship, setGifship] = useState('')
      const [gifshiptype, setGifshiptype] = useState('')
      const [gifshipPkg, setGifshipPkg] = useState('')
      const [hospital, setHospitals] = useState('')
      const [hmo, setHmo] = useState('')
      const {currentUser, permissions } = useContext(AuthContext);

   useEffect(() =>{ 
      if(!(permissions.indexOf("VIEW_MEMBERSHIP_FORM") > -1)){
      navigate('/')
     }
    const formData = async e =>{
        try{
         
           trackPromise(app.get(`/register/${id}`)
           .then(res=>{
           setInputs(res.data)
           const a = moment()
           const b = moment(res.data.dob).format('MMMM YYYY')
           const diff = a.diff(b, 'years')
           setAge(diff)
           setLgas(res.data.lga.name)
           app.get(`/lookups/${res.data.residentLga}/lga`).then(resLgaR =>{
              setLgaResident(resLgaR.data.name)
           }).catch('Error occured while loading data ...', 'error')
            app.get(`/lookups/${res.data.residentState}/state`).then(resStateR=>{
              setStateResident(resStateR.data.name)
            }).catch(err2=>{
              showToastMessage('Error occured while loading data ...', 'error')
            })
           setStates(res.data.state.name)
           setGifshiptype(res.data.gifshiptype.name)
           setGifshipPkg(res.data.gifshipPackage.name)
           setGifship(res.data.gifship.name)
           setHospitals(res.data.hospital.hospitalCode + ' - ' + res.data.hospital.name )
           setHmo(res.data.hmo.code + ' - ' + res.data.hmo.name )
                }).catch(err=>{
                  showToastMessage('Error occured while loading data ...'+err, 'error')
                })
                )
          }
        catch(err){

        }
    }
   
      formData() 
       
      }, [id,permissions, navigate])

      const print =()=>{
       try {const printContents = document.getElementById('printableDiv').innerHTML
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents}
        catch(err){
          return null
        }
      }

    return (
     <CCol xs={12} style={{fontSize:'12px'}}>
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>MEMBERSHIP REGISTRATION FORM</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="Personal Information"> 
        
        <div className="gifshiplist" style={{marginTop:'30px', width:'100%'}} id='printableDiv'>
       
         <div style={{display:'block'}}>
         
         

         <table style={{width:'100%'}} >
         <tbody>
         <tr>
         <td colSpan={4}>
         <div style={{textAlign:'center'}} ><h1>MEMBERSHIP REGISTRATION FORM</h1></div>

<div style={{textAlign:'right'}}><img  alt="" src={`${baseURLStatic}${currentUser?.imgurl}`} height={100} width={100}  /></div>
         <b>PERSONAL DATA</b>
         </td></tr>
         <tr>
         <td>SURNAME:</td>
         <td>{inputs?.surname}</td>
         </tr>
         <tr>
         <td>MIDDLE NAME:</td>
         <td>{inputs?.middlename}</td>
         </tr>
         
         <tr>
         <td>OTHER NAME:</td>
         <td>{inputs?.lastname}</td>
         </tr>
         <tr>
         <td>SEX:</td>
         <td>{inputs?.sex}</td>
         </tr>
         <tr>
         <td>DATE OF BIRTH:</td>
         <td>{moment(inputs?.dob).format('MMMM Do YYYY')}</td>
         </tr>
         <tr>
         <td>AGE:</td>
         <td>{`${age}yrs`}</td>
         </tr>
           <tr>
         <td>MARITAL STATUS:</td>
         <td>{inputs?.marital}</td>
         </tr>
         <tr>
         <td>PHONE NUMBER:</td>
         <td>{inputs?.phone}</td>
         </tr>
          <tr>
         <td>EMAIL ADDR:</td>
         <td>{inputs?.email}</td>
         </tr>
         <tr>
         <td>BLOOD GROUP:</td>
         <td>{inputs?.bloodGroup}</td>
         </tr>
          <tr>
         <td>STATE OF ORIGIN:</td>
         <td>{states}</td>
         </tr>
         <tr>
         <td>LGA OF ORIGIN:</td>
         <td>{lgas}</td>
         </tr>
          <tr>
         <td>REGISTRATION DATE:</td>
         <td>{moment(inputs?.createdAt).format('MMMM Do YYYY')}</td>
         </tr>
          <tr>
         <td>TYPE OF PROGRAMME:</td>
         <td>{gifship} - {gifshiptype}</td>
         </tr>
         <tr>
         <td>TYPE OF GIFSHIP [GROUP, INDIVIDUAL, FAMILY]:</td>
         <td>{gifshipPkg}</td>
         </tr>
          <tr>
          <td>STATE OF RESIDENCE:</td>
         <td>{stateResident}</td>
         </tr>
         <tr>
         <td>LGA OF RESIDENCE:</td>
         <td>{lgaResident}</td>
         
         </tr>
         <tr>
         <td>NIN:</td>
         <td><b>{inputs?.nin}</b></td>
         </tr>
         <tr>
         <td>PRIMARY HEALTHCARE & CODE:</td>
         <td>{hospital}</td>
         </tr>
         <tr>
         <td>IDENTIFICATION NUMBER:</td>
         <td>{inputs?.idCode}</td>
         </tr>
         <tr>
         <td>HMO NAME & CODE:</td>
         <td>{hmo}</td>
         </tr>
         <tr>
         <td>ADDRESS:</td>
         <td colSpan={1}>{inputs?.address}</td>
         
         </tr>
         <tr>
         <td><br /> <br />PROSPECTIVE ENROLLEE`S SIGNATURE:</td>
         <td colSpan={1}><br /> <br />
         _________________DATE: _______________</td>
         
         </tr>
         </tbody>
         </table>
             
         </div>
        
        </div>
           
        <Link style={{color:'red', margin:'40px', marginTop:0}} id={`/print/form/${inputs.id}`} onClick={print} >Print</Link>
    
       </DocsExample>
       </CCardBody>
       </CCard>
       </CCol>
       
    )
}

export default ViewForm

