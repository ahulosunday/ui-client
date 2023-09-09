import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import showToastMessage from '../../../components/toast';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import app from '../../../helpers/axiosConfig';
import { pin } from '../../../helpers/customAlphabet';
import { render } from "@react-email/render";
import hostUrl from '../../../helpers/hostUrl';
import { AuthContext } from '../../../context/authContext';


export default function Dialog (){
 const [open, setOpen] = React.useState(false);
   const [valids, setValid] = React.useState(false)
    const {currentUser, login } = React.useContext(AuthContext);

    const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
return (
     <div>
      
      <Link onClick={handleClickOpen} style={{textDecoration:'none', color:'gray'}}>Payment</Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Validation inprogress ...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your username and password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
          />
             <TextField
            
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            id="password"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {valids? <Button onClick={handleSubmit} id="continue">Continue</Button>:''}
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
