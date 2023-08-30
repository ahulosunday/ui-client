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
//import { render } from '@react-email/render';
import { Link } from '@mui/material';
import { nanoid } from '../helpers/customAlphabet';


export default function FormDialogCsv(props) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState([])
   const [items, setItems] = React.useState({
    Surname:'', othername:'', email:'', phone:'', nin:''
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

  //===================================
    const html = (msg) =>{
  return(
     <html lang="en">
      <h2>REGISTRATION CONFIRMATION</h2>
      <hr />
      <body>
      <p>
      {msg}
      </p>
      <hr /> 
     Thanks.<br />
     Management Team.
      </body>
    </html>
  )
}
//=========================================
  const handleSubmit = async e =>{
    e.preventDefault() 
    try{
    
     if(file.length !== 0) {
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
                roleid:2,
                uiid: v1()
              })
            })
               if(obj.length > props.count ){
              showToastMessage('The minmun number NOT reached, please make sure you upload the corrent numbers of enrolees', 'error')
            }
            else if(obj.length > props.count ){
              showToastMessage('The maximum number EXCEEDED, please make sure you upload the corrent numbers of enrolees', 'error')
            }
            else{
              
                await app.post('/users/bulk', obj).then(res1=>{
                 showToastMessage('Transaction complted with status: ' +res1.statusText, 'success')
                
                 const obj2 = res1.data.map((q, index)=>{
              return Object.assign({
                userId: q.id,
                user_rrrId: props.user_rrrId,
                code:  nanoid
                })
                 })
                 
                 app.post('/codes/', obj2).then(res2=>{
                //send email here console.log(res2.data)
                obj.map((ob)=>{
                res2.data.map((item)=>{
                  if(item.userId !== 0){
                    const msg = "Congratulations! <br /> Your account has been created successfully. Please visit: <a href ='" + hostUrl + "'>here </a> to login.<br /> Username is your registered email,<br /> password: password@123,<br /> registration code: " + item.code
                    const to = ob.email;
                    const subject = 'Registration Code';
                    const obj3 = Object.assign({
                      msg: msg,
                      to: 'ahulosunday@gmail.com',
                      subject: subject
                    })
                  app.post('sendmail/user/auth/email/send', obj3).then(res4=>{

                  }).catch(err4=>{

                  })
                  }
                  
                })
                 })
                 }).catch(err2=>{

                 })
                 ///codes/
                 //====================user_rrrId: ,
                }).catch(err1=>{
                 showToastMessage(err1, 'error')
                })
              
          }
        
        }).catch(err=>{
          showToastMessage(err, 'error')
        })
                   
         
            }
    }
    catch(err){
  showToastMessage(err, 'error')
    }
        

  }

const emailHtml = render(html('demo style'), {
  pretty: true,
});
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
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Upload
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>UPLOAD</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload .xls, .xlsx, .csv only
          </DialogContentText>
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
    </div>
  );
}