import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CSVReader } from 'react-papaparse'
import app from '../helpers/axiosConfig';
  import * as XLSX from "xlsx";
import showToastMessage from "./toast";
import { v1 } from "uuid";
import { trackPromise } from 'react-promise-tracker';
import hostUrl from '../helpers/hostUrl';
import { render } from '@react-email/render';
import { Alert, Link } from '@mui/material';
import { nanoid, pin } from '../helpers/customAlphabet';
import validateForm from './validateForm';

export default function FormDialogCsv(props) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState([])
  const [err, setError] = React.useState('')
   const [items, setItems] = React.useState({
    Surname:'', Othername:'', Email:'', Phone:'', NIN:''
   });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        showToastMessage(error, 'error')
        reject(error);
      };
    });

    promise.then(d => {
      setItems(d);
       }).catch(err=>{
     showToastMessage(err, 'error')
    });
  };

//=========================================
  const handleSubmit = async e =>{
    e.preventDefault() 
    if(validateForm('validateForm') === 0){
     if(file.length !== 0) {
      const ext = file.name.split('.')[1]
      if((ext === 'csv') || (ext === 'xlsx') || (ext === 'xls')) {
         readExcel(file);
      let pass = ''
        await app.get(`/hashed/change/pass/${'password@123'}/ok/ww`).then( async res=>{
             const obj = items.map((d, index)=>{
              return Object.assign({
                Surname: d.Surname,
                othername: d.Othername,
                email: d.Email,
                username: d.Email,
                phone: d.Phone,
                password :res.data,
                imgurl: 'images.png',
                isActive: 1,
                roleid:3,
                uiid: v1()
              })
            })
               if(obj.length < props.count ){
              setError(<Alert severity='error'>The minmun number NOT reached, please make sure you upload the correct numbers of enrolees</Alert>)
            }
            else if(obj.length > props.count ){
              setError(<Alert severity='error'>The maximum number EXCEEDED, please make sure you upload the correct numbers of enrolees</Alert>)
            }
            else{
              
                await app.post('/users/bulk', obj).then(res1=>{
                 showToastMessage('Transaction completed with status: ' +res1.statusText, 'success')
                
                 const obj2 = res1.data.map((q, index)=>{
              return Object.assign({
                userId: q.id,
                user_rrrId: props.user_rrrId,
                code:  pin+index
                })
                 })
            
                 app.post('/codes/', obj2).then(res2=>{
                //send email here console.log(res2.data)
                res1.data.map((ob)=>{
                res2.data.map((item)=>{
                  if(item.userId === ob.id){
                  const msg = render(<><h2>Congratulations!</h2><p>We are pleased to inform you that your account has been created successfully.<br />Username: is your registered email,<br /> password: password@123 <br />Registration code: {item.code} <br /> You will be notified appropriately when your registration is activated.<br /> If you encounter any further issues or have any questions, please do not hesitate to reach out to our customer support team via our customer support channels.<br /> Visit <a href={hostUrl}> here</a> to login and complete your registration <br /> <hr /> Thanks.<br /> Management Team.</p></>);
        
                    const to = ob.email;
                    const subject = 'Registration Code';
                    const obj3 = Object.assign({
                      msg: msg,
                      to: to,
                      subject: subject
                    })
                  app.post('/sendmail/user/auth/email/send', obj3).then(res4=>{
                  handleClose()

                  }).catch(err4=>{
                   setError(<Alert severity='error'>Unable to send mail, Networt error ...</Alert>)
                  })
                  }
                  
                })
                 })
                 }).catch(err2=>{
setError(<Alert severity='error'>{err2.err}</Alert>)
                 })
                 ///codes/
                 //====================user_rrrId: ,
                }).catch(err1=>{
                 setError(<Alert severity='error'>{err1.err}</Alert>)
                })
              
          }
        
        }).catch(err=>{
          setError(<Alert severity='info'>{'Reading data ..., click Save to effect chanhes'}</Alert>)
        })
        
                   
         
            }
            else{
              setError(<Alert severity='error'>Invalid file format (csv, xlxs, xls only</Alert>)
            }
    }}
        

  }

  const handleEmial = async e =>{
          const obj = Object.assign({
                      msg:emailHtml,
                      to: 'ahulosunday@gmail.com',
                      subject:'Registartion',
                      
                    })
                  app.post('sendmail/user/auth/email/send', obj).then(res=>{
                      showToastMessage(res, 'success')
                     
                  }).catch(err=>{
                        showToastMessage(err, 'error')
                  })
  }
//<Link to='/form/register/add' className="addnew">Registration</Link>
  return (
    <div xs={12} xl={6}>
    <form className='validateForm'>
      <Button variant="outlined" onClick={handleClickOpen}>
        Upload
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>UPLOAD</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload .xls, .xlsx, .csv only
          </DialogContentText>
           <p> {err}</p>
          <TextField
            autoFocus
            margin="dense"
            id="file"
            name='file'
            label="Upload"
            type="file"
            fullWidth
            variant="standard"
            onChange={e =>{setFile(e.target.files[0])}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
       
        </DialogActions>
      </Dialog>
     
      </form>
    </div>
  );
}