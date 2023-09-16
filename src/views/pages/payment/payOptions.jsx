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
import { CButton } from '@coreui/react';
import { AuthContext } from '../../../context/authContext';
import validateForm from '../../../components/validateForm';

export default function PayOptions (){
 const [open, setOpen] = React.useState(true);
   const [valids, setValid] = React.useState(false)
    const [ inputs, setInputs ] = React.useState({username:'', password:''})
    const  navigate = useNavigate();
         const {currentUser, login } = React.useContext(AuthContext);
         const [errExp, setErrExp] = React.useState('')


    const handleClose = () => {
    setOpen(false);
    navigate('/login')
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e)=>{
     setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
     setValid(true)
  }
  const handleSubmit = async()=>{
    try{
      if(validateForm('validateForm') === 0){
   await app.post('/signin/0', inputs).then(res=>{
    navigate("/payment/option", {state:inputs.username});
   }).catch(err=>{
    //showToastMessage('Unable to identify the user', 'error')
    setErrExp('Username or Password is incorrect')
   })
      }
    }
    catch(errExpl){
      setErrExp(errExpl)
    }
  }
return (
     <div className='validateForm'>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User authentication</DialogTitle>
        <DialogContent>
        
          <DialogContentText>
            Enter your username and password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
             <TextField
            
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            name="password"
            onChange={handleChange}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {valids? <Button onClick={handleSubmit} id="continue">Continue</Button>:''}
          
        </DialogActions>
        <p style={{color:'red', textAlign:'center'}}>{errExp}</p>
      </Dialog>
    </div>
  );
}
