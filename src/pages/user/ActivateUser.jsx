import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import showToastMessage from '../../components/toast';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import app from '../../helpers/axiosConfig';
import { pin } from '../../helpers/customAlphabet';
import { render } from "@react-email/render";
import hostUrl from '../../helpers/hostUrl';
import { AuthContext } from '../../context/authContext';
import validateForm from '../../components/validateForm';

export default function ActivateUser (){
 const [open, setOpen] = React.useState(true);
   const [valids, setValid] = React.useState(false)
    const {currentUser } = React.useContext(AuthContext);

    const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = ()=>{
    const username = document.getElementById('username').value
    if(username.length !== 0){
        setValid(true)
    }
  }
  const handleSubmit = async()=>{
    if(validateForm('validateForm') === 0){
    const username = document.getElementById('username').value
  await app.get(`/findUserByUsername/${username}/1/1/1/1`).then(async res =>{
      await app.put(`/activate/${res.data.id}/`, {}).then(res1=>{
 showToastMessage('User Activated successfully', 'success')
      }).catch(err1=>{
         showToastMessage('User Activation Failed', 'error')
      })
  }).catch(err=>{
showToastMessage('Username not found.', 'error')
  })
  }
  }

return (
     <div className='validateForm'>
      
      <Link onClick={handleClickOpen} style={{textDecoration:'none', color:'red'}}>Please click here to activate enrolle/user</Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Activate Enrolle/User ...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the Enrolee/User username
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {valids? <Button onClick={handleSubmit} id="continue">Activate</Button>:''}
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
