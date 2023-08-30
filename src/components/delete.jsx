import { Link, useLocation, useNavigate } from "react-router-dom";
import {  AiFillCloseSquare } from "react-icons/ai";
import { Box, Modal, Typography } from '@mui/material';
import * as React from 'react';
import app from '../helpers/axiosConfig';
import { trackPromise } from "react-promise-tracker";
import showToastMessage from "./toast";

const style ={
  position:'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: '#f0dfdf',
  border: '1px solid red',
  boxShadow: 1,
  p:4
};

const Delete = ()=>{
    const state = useLocation().state
    const navigate = useNavigate()
   const back = state.split('&')[1]
   const id = state.split('&')[0]
   const url = state.split('&')[2]

   //====================
   const [opens, setOpen ] = React.useState(false)
  const handleOpen =() => setOpen(true)
  React.useEffect(()=>{
    handleOpen()
  })
  //======================
 
const handleDelete = async e =>{
    
    try{
  
    trackPromise(app.delete(`${url+id}`)
                .then(res =>{
                  showToastMessage('Transaction completed with status: ' + res.statusText, 'info')
                   navigate(`${back}`)

                })
                .catch(err =>{
                   showToastMessage('Transaction completed with status: ' + err, 'error')
                })
    )
   
   
    }
    catch(err){
    showToastMessage('Transaction completed with status: ' + err, 'error')
    }
    
  }
return(
  <Modal className="error-page" open={opens} aria-labelledby ="modal-modal-title" aria-descriptionby="modal-modal-description">
      <Box sx={style}>
      <Typography id="modal-modal-description" sx={{mt:-1}}>
             <div style={{textAlign:'right'}} ><Link style={{textDecoration:'none'}} to={back}><AiFillCloseSquare /></Link></div>
    <div style={{color:'red', textTransform:'uppercase', margin:0}}>Deleting ...</div>
    <div className="error-body">
    <span>Are you sure that you want to delete the seleted record, this action can not be rolled back. Do you want to continue ...?</span>
    </div>
    <div className="button">
    <button style={{ border: '1px solid red', cursor: 'pointer', width: '70px',color: 'red', height:'30px'}} onClick={handleDelete}>Delete</button>
    </div>
   
      </Typography>
      </Box>
      </Modal>

)



}
export default Delete