import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import showToastMessage from './toast';
import { trackPromise } from 'react-promise-tracker';
import app from '../helpers/axiosConfig';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async e =>{
    try{
      const code = document.getElementById('code').value
      if(code === '' || code === null){
        showToastMessage('Please enter valid registration Code','error')
      }
      else{
        trackPromise(
          app.get(`/code/${code}/`,{})
          .then(res =>{
            const data = res.data
            if(data === null){
            showToastMessage('Invalid Regitration code found!', 'error')
            }
            else
          {const diff = moment().subtract(Date(data.user_rrr.expired_date), 'years')
          if(diff < 0) showToastMessage( 'Registration has expired','error')
          else{
            navigate('/form/register/add', {state:data.user_rrr})
          }}
          })
          .catch(err=>{
            showToastMessage(err, 'error')
          })
        )
      }

    }
    catch(err){
 showToastMessage(err, 'error')
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Registration
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>REGISTRATION CODE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the registration code sent to you to continue
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Registration Code"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Continue</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}