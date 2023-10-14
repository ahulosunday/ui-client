import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CSVReader } from 'react-papaparse'
import app from '../../helpers/axiosConfig'
  import * as XLSX from "xlsx";
import { v1 } from "uuid";
import { trackPromise } from 'react-promise-tracker';
import { render } from '@react-email/render';
import { Alert, Link } from '@mui/material';
import showToastMessage from '../../components/toast';
import validateForm from '../../components/validateForm';
import { AuthContext } from '../../context/authContext';


export default function FormDialogCsvLgas(props) {
  const [open, setOpen] = React.useState(false);
    const {currentUser, permissions } = React.useContext(AuthContext);
  const [file, setFile] = React.useState([])
  const [err, setError] = React.useState('')
  var doc = document.getElementById('wait');
  const saveElement = React.useRef()
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
  const handleSubmits = async e =>{
    doc.innerHTML = 'Initializing ...';
    e.preventDefault() 
    try{
    if(validateForm('validateForms') === 0){
doc.innerHTML ='please wait ...';
     if(file.length !== 0) {
      const ext = file.name.split('.')[1]
      if((ext === 'csv') || (ext === 'xlsx') || (ext === 'xls')) {
         readExcel(file);
         if(items.length === 0){
            return false;
         }
         else{
             const obj = items.map((d, index)=>{ //name , code, countryId, regionId, stateId, userId
              return Object.assign({
                name: d.Name,
                code: d.Code,
                countryId: props.countryId,
                regionId: props.regionId,
                stateId: props.stateId,
                userId :currentUser.id
               
              });
            });
            //send record to database ====
            await app.post('/lga/bulk', obj).then(res=>{
             setError(<Alert severity='success'>Save successfully</Alert>)
             doc.innerHTML = 'Save';
            }).catch(err=>{
setError(<Alert severity='error'>Unable to Save: {err}</Alert>)
doc.innerHTML = 'Save';
            })

         }
      }
     }
    }
    }
    catch(err){
        doc.innerHTML = 'Save';
       // showToastMessage('Error occured: ' + err, 'error');
    }
  }
         

 
  return (
    <div xs={12} xl={6}>
    <form className='validateForms'>
      <Button className='btn-link' onClick={handleClickOpen}>
     Click here to upload LGAs.
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bulk Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload .xls, .xlsx, .csv files only
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
          <Button onClick={handleSubmits} ref={saveElement} id='wait' >Save</Button>
       
        </DialogActions>
      </Dialog>
     
      </form>
    </div>
  );
}
