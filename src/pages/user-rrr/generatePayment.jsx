  import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { DocsExample } from '../../components';
import { AuthContext } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import formatDate from '../../components/formatDate';
import { startIndex, per_page } from '../../helpers/paging_indexes';
import app from '../../helpers/axiosConfig';
import showToastMessage from '../../components/toast';
import { formatCurreny } from '../../components/formatCurrency';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ClearIcon from '@mui/icons-material/Clear';
import AddTaskIcon from '@mui/icons-material/AddTask';
import moment from 'moment';
import { Alert } from '@mui/material';
import { render } from '@react-email/render';
import hostUrl from '../../helpers/hostUrl';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


const GeneratePayment = ()=>{
const [expanded, setExpanded] = React.useState(false);
 const [checked, setChecked] = React.useState([])
 const [err, setErr] = React.useState('')
 const [getrrr, setGetrrr] = React.useState([]);
    const [page, setPage]= React.useState(1)
    const [data, setData] = React.useState([])
    const {currentUser, permissions } = React.useContext(AuthContext);
   const navigate = useNavigate()
   const [counts, setCounts] = React.useState([])
      const [merger, setMerger] = React.useState([])

const getData = async (e)=>{
  e.preventDefault()
  try{
  var plist = document.getElementById('plist').value;
   if(plist.length !== 0){
    var tdate = document.getElementById('activate_date').value;
    var activated_date = formatDate(new Date(tdate))
            var oResponse = [];
            oResponse = plist.split(',')
           
var arr = [];
var len = oResponse.length;

for (var i = 0; i < len; i++) {
  if(oResponse[i] == '') continue
  const dataLog = await app.get(`/user-rrr/${oResponse[i]}/`)
       let  expired_date= moment(Date.parse(activated_date) + ((dataLog.data.duration * 1000 * 60 * 60 * 24))).format('YYYY-MM-DD')
    arr.push({
        id: oResponse[i],
        activatedby: currentUser.id,
        activated_date: activated_date,
        expired_date: expired_date
    }); 
 
}
if(arr.length !== 0){
await app.put('/user-rrr/', arr).then(async res=>{
  //send mails ====================
  const subject = 'Registration Activation';
      const msg = render(<><h2>Congratulations!</h2><p>We are pleased to inform you that your subcription has been activated. You can head on to your registered hospital for your health services. <br /> If you encounter any further issues or have any questions, please do not hesitate to reach out to our customer support team via our customer support channels.<br /> Visit <a href={hostUrl}> here</a> to login<br /> <hr /> Thanks.<br /> Management Team.</p></>);
       
       for (var i = 0; i < len; i++) {
        var usersEmail = [] ; 
     const id = oResponse[i];
     await app.get(`/${id}/codes/getuser_rrr/1/1/`)
     .then(async resp=>{
    resp.data.map((item)=>{
    usersEmail.push(item.user.email)
}) 
//Send email here =========

                    const obj3 = Object.assign({
                      msg: msg,
                      to: usersEmail,
                      subject: subject
                    })
                   app.post('/sendmail/user/auth/email/send', obj3).then(respo=>{
                    showToastMessage('Batch complted: = ' + i + ' completed', 'success' )
                   }).catch(errs=>{
                    setErr(<Alert severity='error'>Unable to send mails</Alert>)
                   })
 })
     .catch(errp=>{
setErr(<Alert severity='error'>{errp}</Alert>)
     })
} ///loop end
 // loadItem()
 setErr(<Alert severity='success'>Transaction completed successfully</Alert>)

//navigate('/')
}).catch(err=>{
setErr(<Alert severity='error'>{err}</Alert>)
})
}
else{
  showToastMessage("No record selected, No record updated ", 'error')
}
}

  
  }
  catch(err){
setErr(<Alert severity='error'>{err}</Alert>)
  }
  alert('Transaction completed.')
}
   const [search, setSearch] = React.useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  
const datas = {
  //Merge the two arrays to one and filter==============
  nodes: counts.map((item, i) => Object.assign({}, item, getrrr[i])).filter((item) =>
    item.rrr_number.toLowerCase().includes(search.toLowerCase()
    )
  ),
};
 var sum = 0;
//console.log(counts.map((item, i) => Object.assign({}, item, getrrr[i])))
 const handleCheckAllChange = (e) => {
          setChecked( e.target.checked ? datas.nodes.map((c) => {
            var countT = 0
                 if(counts.length !== 0){
                 for (var i = 0; i < counts.length; i++) {
                  if(counts[i].id === c.id)
                  countT = (counts[i].count)
                 }}
                 if(c.maxNumber === countT)
            return c.id
            }) : []);
        };

        const handleListChange = (e, c) => {
          setChecked((prevChecked) => e.target.checked ? [...prevChecked, c.id]: prevChecked.filter((item) => item !== c.id));
        };

          React.useEffect(()=>{
    if(!(permissions.indexOf("VIEW_RRR") > -1) ){
        navigate('/')
    }
const loadItem = async e =>{
 try{
         var ids = []
        await app.get(`/rrr/not/activate/0/1/1/`).then(async res=>{
              res.data.map(async(item)=>{
              ids.push(item.id)
              })
         
             await app.get(`/codes/${ids}`)
               .then( res1=>{
                const strDescending = [...res1.data].sort((a, b) =>
                        a.id > b.id ? -1 : 1,
                      );
           
                setCounts(strDescending)
               })
                 
            setGetrrr(res.data)
        }).catch(err=>{
            showToastMessage(err, 'error')
        })
    
         
    }catch(err){
         return(err.message)
        }
        
    }

    
    loadItem()
   
      
  }, [currentUser, permissions, navigate])

  return (
 <CRow >
<CCol xs={12} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>LISTS OF PAYMENTS</strong>
          </CCardHeader>
          <CCardBody>
              <CInputGroup>
        <CInputGroupText> Search</CInputGroupText>
        <input id="search" placeholder='Search by RRR number' className='form-control' type="text" onChange={handleSearch} />
      </CInputGroup>
            <DocsExample add="Payment List">
               <p>{err}</p>
          <CTable style={{fontSize:'12px'}} align="middle" responsive>
          <CTableHead>
          <CTableRow>
          <CTableDataCell><input type='checkbox' id="selectAll"
                checked={checked.length === datas.nodes.length}
                onChange={handleCheckAllChange} /></CTableDataCell>
          <CTableDataCell>RRR NUMBER</CTableDataCell>
          <CTableDataCell>AUTH. CODE</CTableDataCell>
          <CTableDataCell>AMOUNT</CTableDataCell>
          <CTableDataCell>MAX_No#</CTableDataCell>
           <CTableDataCell>REG_No#</CTableDataCell>
           <CTableDataCell>NAME</CTableDataCell>
             <CTableDataCell>EMAIL</CTableDataCell>
          <CTableDataCell>PACKAGE</CTableDataCell>
          <CTableDataCell>DATE PAID</CTableDataCell>
        
          </CTableRow>
          </CTableHead>
          <CTableBody>
         
       {
        
            datas.nodes.length === 0? '': datas.nodes.map((item)=>{
                sum = sum + item.amount
                          
            return(
            <CTableRow key={item.id}>
            {(item.maxNumber === item.count)?
             <CTableDataCell>
            <input type="checkbox" id={item.id}
                checked={checked.includes(item.id)}
                  onChange={(e) => handleListChange(e, item)}  
                  value={item.id}
                  name="ck"/></CTableDataCell>:
                  <CTableDataCell style={{color:'red'}}><ClearIcon /></CTableDataCell>}

       <CTableDataCell>
       <Link title='View the list of enrolees under this payment' to={`/user-rrr/dependants`} state={item.id}>{item.rrr_number}</Link></CTableDataCell>
        <CTableDataCell>{item.authNumber}</CTableDataCell>
          <CTableDataCell>{formatCurreny.format(item.amount)}</CTableDataCell>
          <CTableDataCell>{item.maxNumber}</CTableDataCell>
          <CTableDataCell>{item.count}</CTableDataCell>
          <CTableDataCell>{item.user.surname + ' ' + item.user.othername}</CTableDataCell>
           <CTableDataCell>{item.user.email}</CTableDataCell>
          <CTableDataCell>{item.gifship.name + ' '+ item.gifshiptype.name + ' '+ item.gifshipPackage.name}</CTableDataCell>
          <CTableDataCell>{formatDate(new Date(item.createdAt))}</CTableDataCell>

</CTableRow>
)})}
</CTableBody>
          </CTable>
    
        <AccordionDetails>
          <Typography>
          <CFormInput type="hidden" name="plist" id="plist" value={checked.join(",")} />
           Sum: {formatCurreny.format(sum)} 
          {permissions?.indexOf("EDIT_RRR") > -1 ? <p style={{textAlign:'right'}}>Date:<input type='date' id='activate_date' readOnly title='Activation Date' value={formatDate(new Date())}></input><Link title='Activate the selected record(s)' onClick={getData}><AddTaskIcon /> Activate</Link></p>:null}
         <p style={{color:'red'}}>Note: The activation activity requires strong internet connection. You are advised to run it in the night.</p>
       
          </Typography>
        </AccordionDetails>
      
   
   </DocsExample>
   </CCardBody>
   </CCard>
   </CCol>
   </CRow>
   
  );
}


export default GeneratePayment