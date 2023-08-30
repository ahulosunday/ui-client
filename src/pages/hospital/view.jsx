import app from '../../helpers/axiosConfig'
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Goback from "../../components/goback";

const ViewHospital = () =>{
   const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate()
     const location = useLocation()
      const id = location.state//pathname.split("/")[1]
      const [inputs, setInputs] = useState([])
      const [lgas, setLgas] = useState('')
      const [regions, setRegions] = useState('')
      const [states, setStates] = useState('')
      const [countries, setCountries] = useState('')

    useEffect(()=>{

      if(!(permissions.indexOf("VIEW_HOSPITAL") > -1)){
     navigate('/')
      }
    }, [currentUser, permissions]);

     const formData = async e =>{
        try{
         
           const res = await app.get(`/hospital/${id}/hospital`)
           setInputs(res.data)
           
           setLgas(inputs.lga.name)
           setStates(inputs.state.name)
           setRegions(inputs.region.name)
           setCountries(inputs.country.name)    
          }
        catch(err){

        }
    }
    
      formData()

    return (
       <div className="form-horizontal">
        
        <div className="gifship" style={{marginTop:'30px'}}>
       
         <form>
         <h1><u>{inputs.name}</u></h1>
         <div className="input-label">
       <div htmlFor="name">Hospital Code:</div> 
       <span>{inputs.hospitalCode}</span>
         
       </div>
       <div className="input-label">
       <div htmlFor="code">Hospital Name:</div> 
        <span>{inputs.name}</span>
       </div>
         <div className="input-label">
       <div htmlFor="name">Mobile:</div> 
    <span>{inputs.phone}</span>
       </div>
       <div className="input-label">
       <div htmlFor="code">Email Address</div> 
        <span>{inputs.email}</span>
       </div>
         <div className="input-label">
       <div htmlFor="name">Address:</div> 
       <span>{inputs.address}</span>
        
       </div>
       <div className="input-label">
       <div htmlFor="code">Contact Address:</div> 
     <span>{inputs.contactAddress}</span>
       </div>
        <div className="input-label">
       <div htmlFor="code">Lga:</div> 
     <span>{lgas}</span>
       </div>
       <div className="input-label">
       <div htmlFor="code">State:</div> 
     <span>{states}</span>
       </div>
       <div className="input-label">
       <div htmlFor="code">Region:</div> 
     <span>{regions}</span>
       </div>
       <div className="input-label">
       <div htmlFor="code">Country:</div> 
     <span>{countries}</span>
       </div>
        <div className="input-label">
       <div htmlFor="buttton"></div> 
          <Goback url='/hospitals' />
        </div>
    
         </form>
        
        </div>
           
       </div>
       
    )
}

export default ViewHospital
