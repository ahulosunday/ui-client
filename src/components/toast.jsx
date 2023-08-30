import React from 'react';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  const showToastMessage = (msg, info) => {
 switch(info){
  case 'success':
 toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
  break
  case 'info':
 toast.info(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
  break
  case 'warning':
 toast.warning(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
  break
  case 'error':
 toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
  break
 }
       
    };
  
export default showToastMessage