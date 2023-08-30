import axios from 'axios'
import { createContext, useEffect, useState } from "react"
import app from '../helpers/axiosConfig'
import { trackPromise } from 'react-promise-tracker';
import showToastMessage from '../components/toast';

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) =>{
 const [currentUser, setCurrentUser ] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [permissions, setPermissions ] = useState([]);
 const login = async(inputs)=>{
        try{
           await app.post("/auth/login", inputs)
         .then(res =>{
             setCurrentUser(res.data)
         })
         .catch(errs=>{
        showToastMessage(errs+'!', 'error')
         });
    
         }
        catch(error){
           showToastMessage("Unidentified error occured ...", 'error')
        }
        
    }
    //logout ====================admin@gmail.com
    const logout = async()=>{
        try{
         trackPromise(app.post("/logout")
        .then(res=>{
        setCurrentUser(null)
        setPermissions(null)
        showToastMessage(res, 'info')
        }).catch(err=>{
            showToastMessage(err, 'error')
        }))
        
        
        }
        catch(err){
           
        showToastMessage('Error logging out ...', 'error')
        }
         
        
    }
    //ROLES============
    const RoleList = async(roleId)=>{

        try{ 
            var arr = []
           await app.get(`/${roleId}/role-permissions`)
            .then(res=>{
             res.data.map((post) =>(
             arr = [...arr,post.permission.name ]
             )) 
             setPermissions(arr)
            }).catch(err=>{
             showToastMessage('Internal data loading failed ...', 'error')
            
            })}
        catch(error){
            showToastMessage('Sorry, internal data loading failed,  ...', 'error')
        }
    }

    useEffect( () =>{
         localStorage.setItem("user", JSON.stringify(currentUser))
         if(currentUser) RoleList(currentUser?.roleid)

    }, [currentUser])
return ( <AuthContext.Provider value ={{ currentUser, permissions, login, logout }}>
{children}
</AuthContext.Provider>
);
}
