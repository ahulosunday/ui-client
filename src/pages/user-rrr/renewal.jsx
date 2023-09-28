import { CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
import { Alert, DialogActions, DialogContent, DialogContentText, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import app from "../../helpers/axiosConfig"
import { AuthContext } from "../../context/authContext"
import validateForm from "../../components/validateForm"
import { formatCurreny } from "../../components/formatCurrency"
import formatDate from "../../components/formatDate"
import { DocsExample } from "../../components"
import { Link, useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import moment from "moment"
import { pin } from "../../helpers/customAlphabet"
import showToastMessage from "../../components/toast"
import { render } from "@react-email/render"
import hostUrl from "../../helpers/hostUrl"

const Renewal = () =>{ 
 const navigate = useNavigate()
  const [visible, setVisible] = useState(true)
    const [visible_rrr, setVisible_rrr] = useState(false)
  const [user_rrr, setUser_rrr] = useState([])
  const [oneItem, setOneItem] = useState([])
  const [gifshiptype, setgifshiptype] = useState([])
  const [gifshipPackage, setgifshipPackage] =useState([])
  const [gifship, setgifship] = useState([])
   const {currentUser, permissions } = useContext(AuthContext);
   const [error, setError]=useState('')
   const [uid, setUid] = useState('')
    const [error2, setError2]=useState('')
   const [inputs, setInputs] = useState({
    username: '', password:''
   })
   const [inputv, setInputv] = useState({
        pay:0, authNumber:'', rrr:''
        })

    const handleSubmit = async()=>{
      if(validateForm('validateForm') === 0){
   await app.post('/signin/0', inputs).then(async res=>{
    await app.get(`/rrr/${res.data.id}/0/0/1`)
.then( async res1=>{
   await app.get(`/findUserByUsername/${inputs.username}/1/1/1/1`).then(uid=>{
 setUid(uid.data.id)
   })
    setUser_rrr(res1.data)
    setVisible(false)
}).catch(err1=>{
  setError2(<Alert severity="error">Invalid username or password</Alert>)

setVisible(true)
})
   }).catch(err=>{
  setVisible(true)
  setError2(<Alert severity="error">{err}</Alert>)

   })
      }
    
  }


const handleSubmits = async ()=>{
if(validateForm('validateForm') === 0){
  const subject = 'Registration Renewal';
      const msg = render(<><h2>Congratulations!</h2><p>We are pleased to inform you that your subcription has been renewed. Thank you for your patronage. <br /> If you encounter any further issues or have any questions, please do not hesitate to reach out to our customer support team via our customer support channels.<br /> Visit <a href={hostUrl}> here</a> to login<br /> <hr /> Thanks.<br /> Management Team.</p></>);
  
  setError(<Alert severity="info">You will be redirected soon, please wait ...</Alert>)
   let userId = document.getElementById('userId').value;
   let activated = 0;
    let activatedby = currentUser.id;
      let amount = document.getElementById('amount').value;
       let duration = document.getElementById('duration').value;
        let gifshipId = document.getElementById('gifship').value;
         let gifshipTypeId = document.getElementById('gifshiptype').value;
         let gifshipPackageId = document.getElementById('gifshipPackage').value;
           let activated_date = formatDate(new Date())
           let expired_date = document.getElementById('expired_date').value;
           let maxNumber = document.getElementById('maxNumber').value;
           let minNumber = document.getElementById('maxNumber').value;
           let oldId = document.getElementById('oldId').value;
           //handle paystack gateway payment
 const status = 'OK'
 if(status === 'OK' && inputv.pay === 0){
  //codes gotten from payment gateway should replace pin
   let rrr_number = pin;
   let authNumber = pin
   //===================================
  await app.post('/user-rrr/renew/', {rrr_number:rrr_number, 
  userId:userId,
   activated:activated, 
  activatedby:activatedby,	
  amount:amount,	duration:duration,
  	gifshipId:gifshipId,
    	gifshipTypeId:gifshipTypeId,
      	gifshipPackageId:gifshipPackageId,
        	activated_date:activated_date,	
          expired_date:expired_date, 
          maxNumber: maxNumber,
           minNumber:minNumber,
            authNumber: authNumber,
            oldId: oldId}).then(res=>{
              const obj3 = Object.assign({
                      msg: msg,
                      to: res.data,
                      subject: subject
                    })
                   app.post('/sendmail/user/auth/email/send', obj3)
             setVisible_rrr(false) 
             setError(<Alert severity="success">Transaction completed successfully</Alert>)
             navigate('/renewal/rrr/')
            }).catch(err=>{
               setVisible_rrr(false)
               setError(<Alert severity="error">{err}</Alert>)
            })
 }


 else if(inputv.pay === 1){
//contacting the Remita for validation for rrr_number and authNumber ...
  let rrr_number = document.getElementById('rrr').value; 
  let authNumber = document.getElementById('authNumber').value;
//===================================================
 await app.post('/user-rrr/renew/', {rrr_number:rrr_number, 
  userId:userId,
   activated:activated, 
  activatedby:activatedby,	
  amount:amount,	duration:duration,
  	gifshipId:gifshipId,
    	gifshipTypeId:gifshipTypeId,
      	gifshipPackageId:gifshipPackageId,
        	activated_date:activated_date,	
          expired_date:expired_date, 
          maxNumber: maxNumber,
           minNumber:minNumber,
            authNumber: authNumber,
            oldId: oldId}).then(res=>{
                 const obj3 = Object.assign({
                      msg: msg,
                      to: res.data,
                      subject: subject
                    })
                   app.post('/sendmail/user/auth/email/send', obj3)
             setVisible_rrr(false) 
             setError(<Alert severity="success">Transaction completed successfully</Alert>)
             navigate('/renewal/rrr/')
            }).catch(err=>{
               setVisible_rrr(false)
              setError(<Alert severity="error">{err}</Alert>)
            })
 }

}

}

const handleRenew  = async (e)=>{
  const id = e.target.id
   await app.get(`/user-rrr/${id}/`)
   .then(res=>{
    setOneItem(res.data)
    setgifship(res.data.gifship)
    setgifshiptype(res.data.gifshiptype)
    setgifshipPackage(res.data.gifshipPackage)
     setVisible_rrr(true)
   })  
}

 const handleChanged = (e)=>{
   setInputv(prev =>({ ...prev, [e.target.name] : e.target.value}))
 }
const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
         }
  return (
    <CRow>
<CCol  xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>PAYMENT</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="Payment">
    <form className="validateForm">
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
       <DialogContent>
       <p>{error2}</p>
          <DialogContentText>
            Enter your username and password
          </DialogContentText>
        <CModalBody>
         <TextField
            autoFocus
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />

           <TextField
            
            margin="dense"
            id="password"
            label="Password"
            type="password"
            name="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </CModalBody>
       <DialogActions>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>Continue</CButton>
        </DialogActions>
        </DialogContent>
      </CModal>

  <CModal backdrop="static" visible={visible_rrr} onClose={() => setVisible_rrr(false)}>
       <DialogContent>
       <p>{error}</p>
        <form className='validateForm'>
          <DialogContentText>
            Please enter the payment information
          </DialogContentText>
        <CModalBody>
       
             <FormControl fullWidth  variant="standard">
     <InputLabel id="Payment">Payment Options</InputLabel>
     <Select labelId="pay" id="pay" name="pay" label="Payment Option" onChange={handleChanged} value={inputv.pay}>
    <MenuItem value={0}>Direct Payment through Remita</MenuItem>
     <MenuItem value={1}>I have Paid, enter RRR & verification number </MenuItem>
     </Select>
     </FormControl>
     {inputv.pay===1?<>
        <TextField
            margin="dense"
            id="rrr"
            name="rrr"
            label="RRR Number"
            type="text"
            value={inputv.rrr}
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
            value={inputv.authNumber}
            fullWidth
            variant="standard"
            onChange={handleChanged}
          /></>
          :''

     }
          <TextField
            aria-readonly
            margin="dense"
            label="Renewal Amount"
            type="text"
            fullWidth
            value={formatCurreny.format(oneItem.maxNumber * gifshipPackage.amount)}
            variant="standard"
            
          />
          <TextField
            
            aria-readonly
            margin="dense"
            label="Programme"
            type="text"
            fullWidth
            value={gifshiptype.name}
            variant="standard"
            
          />
          <TextField
            aria-readonly
            margin="dense"
            label="Package"
            type="text"
            fullWidth
            value={gifshipPackage.name}
            variant="standard"
            
          />
            <TextField
            aria-readonly
            margin="dense"
            label="Expire Date"
            type="text"
            fullWidth
            value={moment(Date.parse(oneItem.expired_date) + ((gifshipPackage.duration * 1000 * 60 * 60 * 24))).format('YYYY-MM-DD')}
            variant="standard"
            
          />
        
         <input type="hidden"  id="oldId" value={oneItem.id} />
          <input type="hidden"  id="amount" value={oneItem.maxNumber * gifshipPackage.amount} />
          <input type="hidden"  id="gifship" value={gifship.id} />
          <input type="hidden"  id="gifshiptype" value={gifshiptype.id} />
          <input type="hidden"  id="gifshipPackage" value={gifshipPackage.id} />
          <input type="hidden"  id="maxNumber" value={oneItem.maxNumber} />
          <input type="hidden"  id="duration" value={gifshipPackage.duration} />
          <input type="hidden"  id="userId" value={oneItem.userId} />
          <input type="hidden" id="expired_date"  value={moment(Date.parse(oneItem.expired_date) + ((gifshipPackage.duration * 1000 * 60 * 60 * 24))).format('YYYY-MM-DD')} />
          
        </CModalBody>
       <DialogActions>
          <CButton color="secondary" onClick={() => setVisible_rrr(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSubmits}>Continue</CButton>
        </DialogActions>
        </form>
        </DialogContent>
      </CModal>
<p>{error}</p>

<>

{inputs.username.length === 0? '':<Link to={'/new/auth/'} className="btn btn-sm btn-primary" state={uid}>New Tariff</Link>}</>
      <CTable className="table" responsive style={{fontSize:'12px'}}>
      <CTableHead>
      <CTableRow >
      <CTableHeaderCell>SN</CTableHeaderCell>
       <CTableHeaderCell>NAME</CTableHeaderCell>
        <CTableHeaderCell>AMOUNT</CTableHeaderCell>
        <CTableHeaderCell>MAX_NUMBER</CTableHeaderCell>
         <CTableHeaderCell>REG DATE</CTableHeaderCell>
          <CTableHeaderCell>EXP DATE</CTableHeaderCell>
           <CTableHeaderCell>ACTIVE?</CTableHeaderCell>
          
           <CTableHeaderCell></CTableHeaderCell>
      </CTableRow>
      </CTableHead>
      <CTableBody>
      {user_rrr.length === 0? 
       <CTableRow><CTableDataCell colSpan={9} style={{textAlign:'center', color:'red'}}><CButton onClick={() => setVisible(true)} className="btn btn-sm btn-link">No record found, click here to enter username</CButton></CTableDataCell></CTableRow>:
      
        user_rrr.map((item, index)=>{

       return(
      <CTableRow>
      <CTableDataCell>{index +1}</CTableDataCell>
       <CTableDataCell>{item.user.surname + ' ' + item.user.othername}</CTableDataCell>
        <CTableDataCell>{formatCurreny.format(item.amount)}</CTableDataCell>
          <CTableDataCell>{item.maxNumber}</CTableDataCell>
         <CTableDataCell>{formatDate(new Date(item.createdAt))}</CTableDataCell>
          <CTableDataCell>{formatDate(new Date(item.expired_date))}</CTableDataCell>
           <CTableDataCell>{item.activated?<span style={{color:'green'}}><CheckIcon /></span>:<span style={{color:'red'}}><ClearIcon /></span>}</CTableDataCell>
                <CTableDataCell><Link  id={item.id} onClick={handleRenew}  className="btn btn-sm btn-success" style={{color:'white'}}>Renew</Link></CTableDataCell>
      </CTableRow>
  )})
}
      </CTableBody>
      </CTable>
    </form>
    </DocsExample>
    </CCardBody>
    </CCard>
    </CCol>
    </CRow>
  )
}

export default Renewal