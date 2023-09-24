import { CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
import { DocsExample } from "../../components"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";
import validateForm from "../../components/validateForm";
import formatDate from "../../components/formatDate";
import Check from "@mui/icons-material/Check";
import app from "../../helpers/axiosConfig";


const getCodes = ()=>{
 const [visible, setVisible] = useState(true)
 const {currentUser, permissions } = useContext(AuthContext);
   const [error, setError]=useState('')
   const [User_code, setUser_code] = useState([])
    const [error2, setError2]=useState('')
   const [inputs, setInputs] = useState({
    username: '', password:''
   })

    const handleSubmit = async()=>{
      if(validateForm('validateForm') === 0){
   await app.post('/signin/0', inputs).then(async res=>{
   await app.get(`/${res.data.id}/codes/getuserid/rrr/rrr/0/`)
.then(res1=>{
    setUser_code(res1.data)
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

const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
         }
 return(
        <CRow>
<CCol  xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>REGISTRATION CODES</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample add="Registration Codes">
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

<CTable className="table table-bordered" style={{fontSize:'12px'}}>
      <CTableHead>
      <CTableRow >
      <CTableHeaderCell>SN</CTableHeaderCell>
       <CTableHeaderCell>CODE</CTableHeaderCell>
        <CTableHeaderCell>DATE CREATED</CTableHeaderCell>       
           <CTableHeaderCell></CTableHeaderCell>
      </CTableRow>
      </CTableHead>
      <CTableBody>
      {User_code.length === 0? 
      <CTableRow><CTableDataCell colSpan={4} style={{textAlign:'center', color:'red'}}><CButton onClick={() => setVisible(true)} className="btn btn-sm btn-link">No record found, click here to enter username</CButton></CTableDataCell></CTableRow>
      :
User_code.map((item, index)=>{
     return(
      <CTableRow>
      <CTableDataCell>{index +1}</CTableDataCell>
<CTableDataCell>{item.code}</CTableDataCell>
<CTableDataCell>{item.createdAt}</CTableDataCell>
<CTableDataCell><Check /></CTableDataCell>

      </CTableRow>
     )
})
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

export default getCodes