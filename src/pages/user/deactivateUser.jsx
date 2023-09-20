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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import app from '../../helpers/axiosConfig';
import { pin } from '../../helpers/customAlphabet';
import { render } from "@react-email/render";
import hostUrl from '../../helpers/hostUrl';
import { AuthContext } from '../../context/authContext';
import validateForm from '../../components/validateForm';

export default function DeactivateUser (){
 const [open, setOpen] = React.useState(true);
   const [valids, setValid] = React.useState(false)
    const {currentUser } = React.useContext(AuthContext);
    const navigate = useNavigate()
    const states = useLocation().state
    const id = states.split('&')[0]
    const name = states.split('&')[1]
    const back = states.split('&')[2]
    const handleClose = () => {
        try{
             setOpen(false);
    navigate(`${back}`)
        }
        catch(err){
            return
        }
   
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(()=>{
   if(id !== 0 || id !== '')
   setValid(true)
  }, [id])
  const handleSubmit = async()=>{
      await app.put(`/deactivate/${id}/1/1`, {} ).then(res=>{
        if(res.data.err)showToastMessage(res.data.err, 'error')
  else showToastMessage('User deactivated successfully', 'success')
      }).catch(err1=>{
         showToastMessage('User Deactivation Failed', 'error')
      })
  }
  

return (
     <div className='validateForm'>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Deactivate Enrolle/User ...</DialogTitle>
        <DialogContent>
          <DialogContentText>
          You are about to deactivate this user
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={name}
            label="Username"
            type="text"
            disabled
            fullWidth
            value={name}
            variant="standard"
           
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {valids? <Button onClick={handleSubmit} id="continue">Deactivate</Button>:''}
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
