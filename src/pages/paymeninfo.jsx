
import {React, useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext} from "../context/authContext"




const PaymentInfo = ()=>{
   //const {currentUser, permissions } = useContext(AuthContext);
    //const navigate = useNavigate();

  
    return (
        <div className="home">
            <div className="posts">
            <center><h2>PAYMENT PROCESS</h2>
            <img style={{height: '200px', width: '200px', marginTop:0}} src={`../logo/logo.png`} alt='' />

            
            </center>
            
                {/*
                    messages.map((post) =>(
                        <div className="post" key={post.id}>
                            <div className="img">
                            <img src={ Logo} alt ="" />
                            </div>
                            <div className="content">
                                <Link className="link" to={`/single/${post.id}`}>
                                    <h1>{post.primary}</h1>  
                                </Link>
                                    <p>{post.secondary}</p>
                                  <Link to={`/single/${post.id}`}>
                                        <button>Read more ...</button>
                                       
                                    </Link>
                                    
                                
                               

                            </div>

                            </div>
                    ))
                */}

            </div>
        </div>
        
    )
}

export default PaymentInfo