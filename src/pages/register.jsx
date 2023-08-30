import React, {useContext, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { v1 } from "uuid";
import app from '../helpers/axiosConfig'
import { textAlign } from "@mui/system";
import {AuthContext} from "../context/authContext";
import { trackPromise } from "react-promise-tracker";




const Register = ()=>{
    const {currentUser } = useContext(AuthContext);
    const  navigate = useNavigate();


    useEffect(() => {
        if (currentUser){
            return navigate("/");
        }
    },[currentUser]);
      const [ err, setError ] = useState(null)

    const [file, setFile] = useState(null)
     const [surname, setSurname] = useState('')
      const [phone, setPhone] = useState('')
       const [othername, setOthername] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [roleid, setRolid] = useState(2)
    const [uiid, setUiid] = useState(v1())
    const [ imgurl , setImgUrl] = useState("")
    
    
   const handleSummit = async e =>{
        e.preventDefault()
      
        try{
      
        const formData = new FormData();
        formData.append('file', file)
       trackPromise( app.post('/uploadfile', formData).then(res=>{
       app.post("/users", {username:username, password:password, email:email,uiid:uiid, roleid:roleid, imgurl:res.data.filename, surname: surname, othername: othername, phone: phone, isActive: 0})
        .then(res =>{
             navigate("/login", {state:'Please wait for confirmation of your Payment.'})
        })
        .catch(errs=>{
             setError(errs.message )
        }) 
       }).catch(errs=>{
        setError("No image found")
       }))
       
        }
        catch(errs){
            setError("Something went wrong. All fields are required. please check your entry and try again" + errs) 
           
        }
       
   }


    return (
        <div className="auth" style={{marginTop:'30px', marginBottom: '30px'}}>
         
         <form style={{borderRadius:'20px'}}>
           <center>
           <h3>Please SignUp</h3>
           <img className="uploadImg" alt="" src={imgurl}   id="cxfileimg" /></center> 
            <span style={{color: 'red', fontSize: 9}}>Image size: 5kb, type: png, jpeg, jpg, gif</span>
           <input type="text" name="surname" placeholder="Surname" required onChange={e =>setSurname(e.target.value)} />
           <input type="text" name="othername" placeholder="Lastname" required onChange={e =>setOthername(e.target.value)} />
            <input type="number" placeholder="Phone" name="phone" onChange={e =>setPhone(e.target.value)} required /> 
            <input type="email" name="email" placeholder="Email Address" required onChange={e =>setEmail(e.target.value)} />
             <input type="text" placeholder="Username" name="username" onChange={e =>setUsername(e.target.value)} required /> 
            <input type="password" name="password" placeholder="Password" required onChange={e =>setPassword(e.target.value)} />
           <input type="file" name="file" onChange={e =>{
            setFile(e.target.files[0])
            setImgUrl(URL.createObjectURL(e.target.files[0]));
         }
            
         }
         />
         
            <button onClick={handleSummit}>Register</button>
            {(err) && <p style={{ color:'red', textAlign:'center', fontSize:'10px'}}> {err} </p>}
            <span>Already have an account? <Link to="/login">Login</Link></span>
         </form>
        </div>
       
    )
}

export default Register
