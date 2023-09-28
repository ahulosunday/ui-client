import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import { DocsExample } from '../../components';
import app from '../../helpers/axiosConfig';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AuthContext } from '../../context/authContext';
import validateForm from '../../components/validateForm';
import formatDate from '../../components/formatDate';
import { pin } from '../../helpers/customAlphabet';
import hostUrl from '../../helpers/hostUrl';
import { render } from '@react-email/render';
import FormDialogCsvNew from '../../components/uploadcsvNew';
import BackupIcon from '@mui/icons-material/Backup';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function NewRegWithTransfer() {
    const {currentUser, permissions } = React.useContext(AuthContext);
 const state = useLocation().state
 const navigate = useNavigate
  const [checked, setChecked] = React.useState([]);
  const [msg, setMsg]= React.useState('')
   const [msgCalc, setMsgCalc]= React.useState('')
    const [msgGateway, setMsgGateway]= React.useState('')
  const [getGifship, setGifship] = React.useState([]);
   const [principal, setPrincipal] = React.useState([]);
     const [gifshipTpyes, setGifshipTypes] = React.useState([])
      const [gifshipPkgs, setGifshipPkgs] = React.useState([])
          const [getusers, setUsers] = React.useState([]);
          const [getusersRight, setUsersRight] = React.useState([]);
             const [amount, setAmount] = React.useState(0)
             const [packages, setPackage]= React.useState([])
                const [user_rrr, setUser_rrr]= React.useState([])
             const [amountDue, setAmountDue] = React.useState(0)
             const [IsSet, setIsSet] = React.useState(false)
             const [Count, setCount] = React.useState(0)
             const doc = document.getElementById('btnSave');
              const docSave = document.getElementById('btn');
              const saveSelected = document.getElementById('saveSelected')
             const saveElement = React.useRef()
             const saveElement1 = React.useRef()
  const [ inputs, setInputs ] = React.useState({
       rrr_number:'',
       	userId: state,	activated:0,
        	activatedby:currentUser.id,	amount:0,
            	duration:0,	gifshipId:0,
                	gifshipTypeId:0,	gifshipPackageId:0,
                    	activated_date:formatDate(new Date()),	expired_date:formatDate(new Date()),
                       authNumber:'', minNumber:1, maxNumber:0
        
    })
const [inputv, setInputv] = React.useState({
        pay:0, authNumber:'', rrr:''
        })


const handleChange = e =>{
        setInputs(prev =>({ ...prev, [e.target.name] : e.target.value}))
         }
 const handleChanged = (e)=>{
   setInputv(prev =>({ ...prev, [e.target.name] : e.target.value}))
 }
  React.useEffect(()=>{
    if(!state){
      navigate('/renewal/rrr/')
    }

const loadUsers = async e =>{
         await app.get('/users').then(users=>{
        setUsers(users.data);
       
        }).catch(errUser=>{
            setMsg(<Alert severity='error'>{errUser}</Alert>)
        })}

    const loadItem = async e =>{
        await app.get('/gifship').then(gifship=>{
            setGifship(gifship.data);
        }).catch(errgifship=>{
          setMsg(<Alert severity='error'>{errgifship}</Alert>)
        })}

    const viewEnrolee = async ()=>{
     await app.get(`/user/get/0/${state}/1/0/0/0/0`).then(res=>{
        setPrincipal(res.data)
     }).catch(err=>{
     setMsg(<Alert severity='error'>{err}</Alert>)
     })
    }
         viewEnrolee()
         loadItem() 
         loadUsers() 
         const docSave = document.getElementById('btn');
          const step1 = document.getElementById('step1');
         const step2 = document.getElementById('step2');
         const saveSelected = document.getElementById('saveSelected')
       step2.style.display='none'
     step1.style.display='block'
     docSave.style.display='none'
     saveSelected.style.display='none'
  }, [permissions, currentUser, state, navigate])

      const loadGifshipTypePkg =async e =>{
          const id = e.target.value
          if(id){
          await app.get(`/gifshipPackageList/${id}`).then(gifshipPackageIds=>{
             setGifshipPkgs(gifshipPackageIds.data);
          })
          .catch(errgifshipPackageIds=>{
            setGifshipPkgs([])
          })
          }}

     const loadGifshipType =async e =>{
    
          const gifshipId = e.target.value
          if(gifshipId){
          await app.get(`/gifshipLists/${gifshipId}`).then(getgifshipId=>{
             setGifshipTypes(getgifshipId.data);
          }).catch(errgetgifshipId=>{

          })
         
          }
         }
const getOnePkg = async e =>{
        const id = e.target.value
             await app.get(`/gifshipPackage/${id}`)
             .then(async res=>{
              await app.get(`/rrr/${res.data.gifshipId}/${res.data.gifshipTypeId}/${res.data.id}/${state}/b/1/`)
              .then(data=>{
                if(data.data.length > 0){
                  setPackage(data.data)
                    doc.disabled = true;
                  setMsg(<Alert severity='info'>You have already registered for this package. Please use <Link to={'/renewal/rrr/'}>renew option</Link> to make your payment</Alert>)
                }
                else{
                 setMsg('')
                }
              })
              .catch(errs=>{
                setMsg(<Alert severity='error'>{errs}</Alert>)
              })
             
             setAmount(res.data)
             })
             .catch(err=>{
              setMsg(<Alert severity='error'>{err}</Alert>)
    })}
    
 const calc = ()=>{
    if(inputs.minNumber === '0'){
       doc.disabled = true;
      setMsgCalc(<Alert severity='error'>Number of enrolee can not be zero.</Alert>)
    }
    else if(inputs.minNumber > amount.maxNumber){
      doc.disabled = true;
      setMsgCalc(<Alert severity='error'>Maximum exceeded, please try another package.</Alert>)
    }
    else{ 
      setMsgCalc('')
      doc.disabled = false;
      if(inputs.minNumber < amount.qty)
      setAmountDue(amount.qty * amount.amount)
      else  setAmountDue(inputs.minNumber * amount.amount)
       if(inputs.minNumber < '0')
     {setMsgCalc(<Alert severity='error'>Number of enrolee can not be negative.</Alert>)
       doc.disabled = true;}
    }
   if(msg.length !== 0 ){ 
     doc.disabled = true;
   }
 }
const handleSave = async () =>{
 if(validateForm('validateForm') === 0){
   docSave.innerHTML= 'please wait ...'
    docSave.disabled = true
  await app.post('/user-rrr/code', inputs)
  .then( async res=>{
    setUser_rrr(res.data)
    //send mail here =======================
    const Htmlmsg = render(<><h2>Congratulations!</h2><p>We are pleased to inform you that your subscription has been completed successfully.<br />You will be notified appropriately when your subscription is activated.<br /> If you encounter any further issues or have any questions, please do not hesitate to reach out to our customer support team via our customer support channels.<br /> Visit <a href={hostUrl}> here</a> to login. <br /> <hr /> Thanks.<br /> Management Team.</p></>);
                    const to = principal.email;
                    const subject = 'Subscription Complete';
                    const obj3 = Object.assign({
                      msg: Htmlmsg,
                      to: to,
                      subject: subject
                    })
                await app.post('/sendmail/user/auth/email/send', obj3)
    setMsg(<Alert severity='success'>Transaction completed successfully</Alert>)
     const step1 = document.getElementById('step1');
         const step2 = document.getElementById('step2');
        step2.style.display='block'
     step1.style.display='none'
     saveSelected.style.display='block'
  })
  .catch(err=>{
    setMsg(<Alert severity='error'>Transaction Failed: {err}</Alert>)
  })

 }
}
const validate = ()=>{
  
  if(validateForm('validateForm') === 0){
    doc.innerHTML= 'please wait ...'
    if(inputv.pay === 0){
      setMsgGateway('')
// direct payment using payment gateway
 setInputs(authNumber =>({ ...authNumber, ['authNumber'] : pin + '01'}))
     setInputs(rrr_number =>({ ...rrr_number, ['rrr_number'] : pin}))
    }
    else if(inputv.pay === 1){
      //contacting the Remita for validation ...
     setInputs(authNumber =>({ ...authNumber, ['authNumber'] : inputv.authNumber}))
     setInputs(rrr_number =>({ ...rrr_number, ['rrr_number'] : inputv.rrr}))
    }
 
     setInputs(amount =>({ ...amount, ['amount'] : document.getElementById('amount').value}))//
     setInputs(minNumber =>({ ...minNumber, ['minNumber'] : document.getElementById('minNumber').value}))
      setInputs(maxNumber =>({ ...maxNumber, ['maxNumber'] : document.getElementById('minNumber').value}))
      setInputs(duration =>({ ...duration, ['duration'] : document.getElementById('duration').value}))
  
  doc.style.display='none'
  saveElement.current.click()
  docSave.style.display='block'
  }
  else{
   doc.style.display='block'
setMsgGateway(<Alert severity='error'>Fill in the form correctly. All fields required</Alert>)
  }
  
}

const handleUsersSave = async () =>{
  const count = inputs.maxNumber
  saveSelected.innerHTML='please wait ...'
  saveSelected.disabled= true
  const selectedUsers = getusersRight.length
  if(selectedUsers > (count -1)){
     saveSelected.innerHTML='Save Selected Users'
  saveSelected.disabled= false
   setMsg(<Alert severity='error'>Maximum number exceeded</Alert>)
  }
  else{
     saveSelected.innerHTML='please wait ...'
  saveSelected.disabled= true
         const obj2 = getusersRight.map((q, index)=>{
              return Object.assign({
                userId: q.id,
                user_rrrId: user_rrr.user_rrrId,
                code:  pin+index
                })
                 })
      setIsSet(false)
                await app.post('/codes/', obj2).then(res2=>{
                  const msg = render(<><h2>Congratulations!</h2><p>We are pleased to inform you that your subscription has been completed successfully.<br />You will be notified appropriately when your subscription is activated.<br /> If you encounter any further issues or have any questions, please do not hesitate to reach out to our customer support team via our customer support channels.<br /> Visit <a href={hostUrl}> here</a> to login <br /> <hr /> Thanks.<br /> Management Team.</p></>);
         const subject = 'Registration Code';
      //Load users email address
                    var arr = []
                getusersRight.map((item)=>{
                  arr.push(item.email)
                })
                const obj3 = Object.assign({
                      msg: msg,
                      to: arr,
                      subject: subject
                    })
                    //send mails to users
                  app.post('/sendmail/user/auth/email/send', obj3)
                  .then(mail=>{
                    setMsg(<Alert severity='success'>Transaction completed successfully, details sent to the emails</Alert>)
                     saveSelected.innerHTML='Save Selected Users'
  saveSelected.disabled= false
                  })

                })
                .catch(errCode=>{
                  setMsg(<Alert severity='error'>{errCode}</Alert>)
                })
  }
}
const showUpload = async()=>{

  await app.get(`/codes/${user_rrr.user_rrrId}/code/rrr/`)
  .then(res1=>{ 
    setIsSet(true)
    saveElement1.current.click()
    const i = res1.data.count
  setCount(inputs.maxNumber -  i)

 
  }).catch(err=>{
    setCount(0)
    setIsSet(false)
})
}

 const [search, setSearch] = React.useState('');
  const [searchRight, setSearchRight] = React.useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleSearchRight = (event) => {
    setSearchRight(event.target.value);
  };
  
const datas = {
  nodes: getusers.filter((item) =>
    (item.surname.toLowerCase().includes(search.toLowerCase()) || item.othername.toLowerCase().includes(search.toLowerCase()))
  ),
};
const datasRight = {
  nodes: getusersRight.filter((item) =>
    (item.surname.toLowerCase().includes(searchRight.toLowerCase()) || item.othername.toLowerCase().includes(searchRight.toLowerCase()))
  ),
};
  const leftChecked = intersection(checked, getusers);
  const rightChecked = intersection(checked, getusersRight);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setUsersRight(getusersRight.concat(leftChecked));
    setUsers(not(getusers, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setUsers(getusers.concat(rightChecked));
    setUsersRight(not(getusersRight, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items, searchField) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
     {searchField}
      <List
        sx={{
          width: 400,
          height: 330,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.surname} ${value.othername}`} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
 <CRow >
         <CCol xs={12} style={{fontSize:'12px'}} >
        <CCard className="mb-12" >
         <CCardHeader style={{backgroundColor:'skyblue'}}>
            <strong style={{color:'white'}}>MANAGE ENROLEE PAYMENT</strong>
          </CCardHeader>
          <CCardBody >
          <p>{msg}</p>
          <p>{msgCalc}</p>
          <p>{msgGateway}</p>
          <p style={{textAlign:'center', textTransform:'capitalize', fontSize:'16px'}}><b>{'Enrolee Name: ' + principal.surname + ' ' + principal.othername +'   [ ' + principal.email + ' ]' }</b></p>
            <DocsExample add="Payment Capturing ..."> 
   <div id='step1' className='validateForm'>
      <CRow>
      <CCol xs={12} xl={6}>
      Programme
        <CFormSelect name="gifshipId"  id="gifshipId" onChange={handleChange} onBlur={loadGifshipType} >
         <option disabled>-- select --</option>
         {
            (getGifship.length ===0? '':getGifship.map((r)=>{
                return(
        <option value={r.id} key={r.id}  selected>{r.name}</option>
       
                )
            })
            )}
         </CFormSelect>
        </CCol>  <CCol xs={12} xl={6} >
       Sub-Programme 
        <CFormSelect name="gifshipTypeId" id="gifshipTypeId" onChange={handleChange} onBlur={loadGifshipTypePkg} >
        <option disabled>-- select --</option>

       {
       (gifshipTpyes ===0?'':gifshipTpyes.map((r)=>{

      return(
        <option value={r.id} key={r.id} selected>{r.name}</option>
      )
        
}))}
       
        </CFormSelect>
        </CCol>
        </CRow>
        <CRow>
        <CCol xs={12} xl={6}>
        Package
        <CFormSelect name="gifshipPackageId" id="gifshipPackageId" onChange={handleChange} onBlur={getOnePkg} >
        <option disabled>-- select --</option>
       {
       (gifshipPkgs.length ===0?'':gifshipPkgs.map((r)=>{

      return(
        <option value={r.id} key={r.id} selected>{r.name}</option>
      )
        
}))}
        </CFormSelect>
       </CCol>
       <CCol xs={12} xl={6}>
       Min. Amount 
        <CFormInput type="number" name="amt" id="amt" value={(amount.amount * amount.qty).toFixed(2)} readOnly />

       </CCol>
       </CRow>
      <CRow>
        <CCol xs={12} xl={6}>Duration in Days 
        <CFormInput type="number" name="duration" id="duration" readOnly value={amount.duration} onChange={handleChange} />
       </CCol>
   <CCol xs={12} xl={3}>
   No# of Enrolee  [ Min: {amount.qty} Max:  {amount.maxNumber}]
        <CFormInput type="number" name="minNumber" id="minNumber" readOnly={inputs.gifshipPackageId !== 0?false : true} value={inputs.minNumber} placeholder={'No of enrolee'} onKeyUp={calc} onChange={e =>{handleChange(e); calc()}} />
       </CCol>
       <CCol xs={12} xl={3}>
   Amount Due:
        <CFormInput type="number" name="amount" readOnly id="amount" value={amountDue? amountDue:amount.amount * amount.qty} placeholder="Amount Due" onChange={handleChange} />
       </CCol>
       </CRow>
       <CRow>
       <CCol xl={12} xs={12}>
        
             <FormControl fullWidth  variant="standard">
     <InputLabel id="Payment">Payment Options</InputLabel>
     <Select labelId="pay" id="pay" name="pay" label="Payment Option" onChange={handleChanged} value={inputv.pay}>
    <MenuItem value={0}>Direct Payment through Remita</MenuItem>
     <MenuItem value={1}>I have Paid, enter RRR & verification number </MenuItem>
     </Select>
     </FormControl>
     {inputv.pay===1?<>
        <CFormInput
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
          <CFormInput
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
       </CCol>
     
       </CRow>
       <CRow>
       <CCol xl={12} xs={12}>
       <br />

       <CButton className='btn btn-info' ref={saveElement} style={{color:'white'}} id='btnSave' onClick={validate}>Validate</CButton>
       <CButton className='btn btn-success' style={{color:'white'}} id='btn' onClick={handleSave}>Save Changes</CButton>
      
       {msgGateway}
       </CCol>
       </CRow>
</div>
<div id='step2'>
<CRow >
<CCol xs={12} xl={12}>
<p><h2>Add existing Enrolees</h2></p>

<p>Upload New Enrolees <button ref ={saveElement1} onClick={showUpload} style={{cursor:'pointer'}} ><BackupIcon  /></button> {IsSet? <FormDialogCsvNew user_rrrId={user_rrr.user_rrrId} count ={Count}/>: ''}</p>
<Grid container spacing={2} justifyContent="center" alignItems="center" >
      <Grid item>{customList('Users', datas.nodes, <input id="search" placeholder='Search by Surname or Othername' className='form-control' type="text" onChange={handleSearch} />)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Selected Users', datasRight.nodes, <input id="searchRight" placeholder='Search by Surname or Othername' className='form-control' type="text" onChange={handleSearchRight} />)}</Grid>
    </Grid>

    <p>
    <br />
    <CButton id='saveSelected' onClick={handleUsersSave}>Save Selected Users</CButton>
    <Link to={'/'}>Back</Link>
    <p>{msg}</p>
    </p>
    </CCol>
</CRow>
</div>
    </DocsExample>
    </CCardBody>
    </CCard>
    </CCol>
    </CRow>
    
  );
}