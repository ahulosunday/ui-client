import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import {React, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext} from '../context/authContext'

const DefaultLayout = () => {
    const {currentUser, permissions } = useContext(AuthContext);
    const navigate = useNavigate();
   useEffect(()=>{
   
const loadItem = async e =>{
 try{
         if (!currentUser){
          navigate('/login')
         }
    }catch(err){
         return(err.message)
        }
        
    }

         loadItem() 
         //===============================

  }, [currentUser, navigate, permissions])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
