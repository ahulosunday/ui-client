import React, {useContext, useEffect, useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import {trackPromise } from 'react-promise-tracker'
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Stack } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';





export const Login = ()=>{

    const {currentUser, login, perms, permissions } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const  navigate = useNavigate();
    //=========================
     const [ err, setError ] = useState(null)
    const msg = useLocation().state
    const [ inputs, setInputs ] = useState({
        username: "",
        password: "",
       
    })

   useEffect(() => {
        if (currentUser){
            return navigate("/");
        }
      setError(msg)
    },[currentUser,msg]);
    const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
        }
      
   const handleSummit = async e =>{
      
        
        try{ 
             e.preventDefault()
            setLoading(true)
           login(inputs)
             setLoading(false)
           }
        catch(errs){
            setLoading(false)
            setError("Invalid username or password");
            navigate("/login")

        }


        
       
   }
   
  return (
        <div className="auth" >
         <h1>Login</h1>
         <form style={{borderRadius:'20px'}}>
            <input type="text" placeholder="Username" onChange={handleChange} name="username" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
            <Stack direction="row" spacing={1} > <LoadingButton size="small"
          onClick={(e) => handleSummit(e)
          }
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Login
        </LoadingButton> 
        </Stack>
            <center><p style={{ color:'red', textAlign:'center'}}> {err} </p></center>
            <span>Don't you have an account? <Link to="/register">Register</Link></span>
           
               </form>
        </div>
       
    )
}

