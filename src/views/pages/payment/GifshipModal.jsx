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
import { FormControl, InputLabel, MenuItem, Radio, Select, RadioGroup, Alert} from '@mui/material';
import validateForm from '../../../components/validateForm';
import formatDate from '../../../components/formatDate';

export default function ToggleClick (props){
 const [open, setOpen] = React.useState(false);
 const [user, setUser] = React.useState([]);
  const navigate = useNavigate()
  const [ amount, setAmount ] = React.useState(0)
  const [gifship, setGifship] = React.useState([])
  const [valids, setValid] = React.useState(false)
  const [errExp, setErrExp] = React.useState('')
  const [max, setMax] = React.useState(0)
  let date = new Date().toJSON().slice(0, 10);
  const [ inputs, setInputs ] = React.useState({
        pay:0,
        sdate: date,
        rrr:'',
        authNumber:''
       
       
    })


  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(()=>{
    const loads = async () =>{
       await app.get(`/gifshipPackage/${props.option}`)
       .then(res=>{
     setMax(res.data.maxNumber)
        
    })
    .catch(errs=>{
setErrExp('Something went wrong, try again later, if error persists then contact admin')
    })
    }
    loads()

  }, [props.option])

 const handleChanged = (e)=>{
   setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
 }
  const handleSubmit = async ()=>{
    try{
     // if(validateForm('validateForm') === 0){
     const num = document.getElementById('number').value;
    const sdate = formatDate(new Date()) //document.getElementById('sdate').value;
     const amount = document.getElementById('amount').value;
     //const authNumber = document.getElementById('authNumber').value;
     //code must be 11 digits
   let code = pin;
   var doc = document.getElementById('continue');
 if(num > max) {
  doc.innerHTML ="continue";
   doc.disabled = true;
   setErrExp('Maximum number of enrolees for the selected option is exceeded')
   return
 }
 else{
  doc.innerHTML ="continue";
   doc.disabled = false;
 }
   
   doc.innerHTML ="You will be redirected soon, contacting payment gateway, please wait ...";
   doc.disabled = true;
   //implement payment gateway here ----------------
   showToastMessage('Validating your payment, please wait ...', 'info')
 // payWithPaystack()

 const status = 'OK'
 if(status === 'OK' && inputs.pay === 0){
  let  expired_date= moment(Date.parse(sdate) + ((gifship.duration * 1000 * 60 * 60 * 24))).format('YYYY-MM-DD')
  await app.post('/user-rrr/', {rrr_number:code, userId:user.id, activated:1, activatedby:user.id,	amount:amount,	duration:gifship.duration,	gifshipId:gifship.gifshipId,	gifshipTypeId:gifship.gifshipTypeId,	gifshipPackageId:gifship.id,	activated_date:sdate,	expired_date:expired_date, maxNumber:num, minNumber:num, authNumber: code})
       .then(async res =>{
        showToastMessage('Transaction completed with status: OK, Registration details has been sent to your email ...', 'success')
        const emailHtml = render(<><h2>Congratulations!</h2><p>We are pleased to inform you that your account has been created successfully.<br />Username: {user.username} <br />Password: ******** <br /> You will be notified appropriately when your registration is activated.<br /> If you encounter any further issues or have any questions, please do not hesitate to reach out to our customer support team via our customer support channels.<br /> Visit <a href={hostUrl}> here</a> to login. <br /> <hr /> Thanks.<br /> Management Team.</p></>);
             await app.post('/sendmail/user/auth/email/send',{to: user.email, msg: emailHtml, subject: 'Registration Completed'})
              navigate('/login')
       /*
        let insertedId = res.data.id;
        await app.put(`/activate/${user.id}/`,{}).then( async res1=>{
         await app.post('/code/0', {user_rrrId: insertedId, userId: user.id, code:code })
         .then(red=>{
          showToastMessage('Transaction completed with status: OK, Registration details has been sent to your email ...', 'success')
         }).catch(errs=>{
         
         })
          .then(async res2 =>{
          
            const emailHtml = render(<><h2>Congratulations!</h2><p>Your account has been created successfully.<br />Username: {user.username} <br />password: ****** <br /> Registration code: {code}<br /> Visit <a href={hostUrl}> here</a> to login. <br /> <hr /> Thanks.<br /> Management Team.</p></>);
             await app.post('/sendmail/user/auth/email/send',{to: user.email, msg: emailHtml, subject: 'Registration Confirmation'})
              navigate('/login')
          })
        })
        */
       }).catch(err3=>{
         setErrExp('Something went wrong ...:' + err3)
           doc.innerHTML ="continue";
   doc.disabled = false;
       })
 }
 else if(inputs.pay === 1){
//contacting the Remita for validation ...
showToastMessage('Validating your payment  RRR and payment verification code , please wait ...', 'info')
const RRRValid = 'OK';
if(RRRValid === 'OK'){
  if(inputs.rrr.length !== 11 ){
    setErrExp('Invalid RRR Number format, enter the RRR number correctly ...')
    return
  }
let  expired_date= moment(Date.parse(sdate) + ((gifship.duration * 1000 * 60 * 60 * 24))).format('YYYY-MM-DD')
  await app.post('/user-rrr/', {rrr_number:inputs.rrr, userId:user.id, activated:1, activatedby:user.id,	amount:amount,	duration:gifship.duration,	gifshipId:gifship.gifshipId,	gifshipTypeId:gifship.gifshipTypeId,	gifshipPackageId:gifship.id,	activated_date:sdate,	expired_date:expired_date, maxNumber:num, minNumber:num, authNumber:inputs.authNumber})
       .then(async res =>{
        showToastMessage('Transaction completed with status: OK, Registration details has been sent to your email ...', 'success')
        const emailHtml = render(<><h2>Congratulations!</h2><p>We are pleased to inform you that your account has been created successfully.<br />Username: {user.username} <br />Password: ******** <br /> You will be notified appropriately when your registration is activated.<br /> If you encounter any further issues or have any questions, please do not hesitate to reach out to our customer support team via our customer support channels.<br /> Visit <a href={hostUrl}> here</a> to login. <br /> <hr /> Thanks.<br /> Management Team.</p></>);
             await app.post('/sendmail/user/auth/email/send',{to: user.email, msg: emailHtml, subject: 'Registration Completed'})
              navigate('/login')
       /*
        let insertedId = res.data.id;
        await app.put(`/activate/${user.id}/`,{}).then( async res1=>{
         await app.post('/code/0', {user_rrrId: insertedId, userId: user.id, code:code })
         .then(red=>{
          showToastMessage('Transaction completed with status: OK, Registration details has been sent to your email ...', 'success')
         }).catch(errs=>{
         
         })
          .then(async res2 =>{
          
            const emailHtml = render(<><h2>Congratulations!</h2><p>Your account has been created successfully.<br />Username: {user.username} <br />password: ****** <br /> Registration code: {code}<br /> Visit <a href={hostUrl}> here</a> to login. <br /> <hr /> Thanks.<br /> Management Team.</p></>);
             await app.post('/sendmail/user/auth/email/send',{to: user.email, msg: emailHtml, subject: 'Registration Confirmation'})
              navigate('/login')
          })
        })
        */
       }).catch(err3=>{
         setErrExp('Something went wrong ...:' + err3)
         doc.innerHTML ="continue";
   doc.disabled = false;
       })
}
else{
  doc.innerHTML ="continue";
   doc.disabled = false;
   setErrExp('Unable to validate the payment. Transaction completed with status: FAILED ...')
}
 }
 else{
  doc.innerHTML ="continue";
   doc.disabled = false;
   setErrExp('Transaction completed with status: FAILED ...')
 }
//}
  }
catch(errEx){
setErrExp(errEx)
doc.innerHTML ="continue";
   doc.disabled = false;
}
}

const calculate = async ()=>{
 const num = document.getElementById('number').value;
 const option = props.option
  try{
    await app.get(`/findUserByUsername/${props.user}/1/1/1/1`)
       .then(async res=>{
        setUser(res.data)
        const active = await app.get(`/user-rrr/${res.data.id}/0/`)
     if(active.data[0]?.length === 0) setValid(true)
     const st = moment(active.data[0]?.expired_date).format('MMMM YYYY')
      const a = moment()
      const diff = a.diff(st, 'days')
      if(diff > -1){
         setValid(true)
         }
      else{
         setValid(false)
          showToastMessage('You still have active payment on your account. If you continue it will override the existing one. Expired date: ' + moment(active.data[0].expired_date).format('Do MMMM YYYY'), 'warning')
        setErrExp('You still have active payment on your account. If you continue it will override the existing one. Expired date: ' + moment(active.data[0].expired_date).format('Do MMMM YYYY'))
         }

       })
       .catch(err=>{
        //showToastMessage(err, 'warning')
        setErrExp(err)
       })

       await app.get(`/gifshipPackage/${option}`)
       .then(res=>{
        setGifship(res.data);
        if(num > res.data.maxNumber){
          showToastMessage('please choose another package, maximum exceeded ...', 'error')
          setErrExp('Please choose another package, maximum exceeded ...')
          setValid(false)
        }
        else if(num < res.data.qty){
          setAmount(res.data.qty * res.data.amount)
          setValid(true)
        }
        else if(num > res.data.qty){
          setAmount(num * res.data.amount)
          setValid(true)
        }
        else if( num === 0){
          setValid(false)
        }

       })
       .catch(err=>{
        showToastMessage(err.message, 'error')
        setErrExp(err)
       })  
    }catch(err){
        showToastMessage(err.message, 'error')
        setErrExp(err)
        }

  }
   
  return (
     <div className='validateForm'>
      <Link onClick={handleClickOpen} style={{textDecoration:'none'}}>{props.name}</Link>
      <Dialog open={open} onClose={handleClose}>
    {errExp.length === 0? null: <Alert severity="error">{errExp}</Alert>}
        <DialogTitle> You selected {props.name} Package</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the Number of enrolee, Maximum = {max} enrolees
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="number"
            name="number"
            placeholder={'Number of Enrolee, maximum is ' + max + ' enrolees'}
            label="Number of Enrolee "
            type="number"
            onChange={calculate}
            fullWidth
            variant="standard"
          />
             <TextField
            aria-readonly
            margin="dense"
            label="Amount Due"
            type="text"
            value={'N'+Intl.NumberFormat().format(amount)}
            fullWidth
            variant="standard"
          />
            <TextField
          name="amount"
            id="amount"
            type="hidden"
            value={amount}
            
          />
           {/*<TextField
            margin="dense"
            id="sdate"
            name="sdate"
            label="Start Date"
            type="date"
            value={inputs.sdate}
            fullWidth
            variant="standard"
            onChange={handleChanged}
          />*/}
     <FormControl fullWidth  variant="standard">
     <InputLabel id="Payment">Payment Options</InputLabel>
     <Select labelId="pay" id="pay" name="pay" label="Payment Option" onChange={handleChanged}>
   
    <MenuItem value={0}>Direct Payment through Remita</MenuItem>
     <MenuItem value={1}>I have Paid, enter RRR & verification number </MenuItem>
     </Select>
     </FormControl>
     {inputs.pay===1?<>
        <TextField
            margin="dense"
            id="rrr"
            name="rrr"
            label="RRR Number"
            type="text"
            value={inputs.rrr}
            fullWidth
            variant="standard"
            onChange={handleChanged}
          />
          <TextField
            margin="dense"
            id="authNumber"
            name="authNumber"
            label="Payment Confirn Code"
            type="text"
            value={inputs.authNumber}
            fullWidth
            variant="standard"
            onChange={handleChanged}
          /></>
          :''

     }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {valids? <Button onClick={handleSubmit} id="continue">Continue</Button>:''}
          
        </DialogActions>
      </Dialog>
    </div>
  );
  }
