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
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import { DocsExample } from '../../components';
import app from '../../helpers/axiosConfig';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { AuthContext } from '../../context/authContext';
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

export default function BulkAdd() {
    const {currentUser, permissions } = React.useContext(AuthContext);
 const state = useLocation().state
 const navigate = useNavigate
  const [checked, setChecked] = React.useState([]);
  const [msg, setMsg]= React.useState('')
   const [principal, setPrincipal] = React.useState([]);
          const [getusers, setUsers] = React.useState([]);
          const [getusersRight, setUsersRight] = React.useState([]);
                const [user_rrr, setUser_rrr]= React.useState([])
             const [IsSet, setIsSet] = React.useState(false)
             const [Count, setCount] = React.useState(0)
              const saveSelected = document.getElementById('saveSelected')
             const saveElement1 = React.useRef()
             const [code, setCode] = React.useState([])
             const uid = state.split('/')[0]
 const user_rrrId = state.split('/')[1]
 const maxNumber = state.split('/')[2]

  React.useEffect(()=>{
    if(!state){
      navigate('/renewal/rrr/')
    }
const uid = state.split('/')[0]
 const user_rrrId = state.split('/')[1]
 const maxNumber = state.split('/')[2]

const showRRR = async()=>{
  await app.get(`/codes/${user_rrrId}/code/rrr/`)
  .then(res1=>{ 
    const i = res1.data.count
  setCount(maxNumber -  i)
  }).catch(err=>{
    setCount(0)
})
}

const loadUsers = async e =>{
         await app.get('/users').then(users=>{
        setUsers(users.data);
       
        }).catch(errUser=>{
            setMsg(<Alert severity='error'>{errUser}</Alert>)
        })}

   const viewEnrolee = async ()=>{
     await app.get(`/user/get/0/${uid}/1/0/0/0/0`).then(res=>{
        setPrincipal(res.data)
     }).catch(err=>{
     setMsg(<Alert severity='error'>{err}</Alert>)
     })
    }
         viewEnrolee()
         loadUsers() 
         showRRR()
         const step2 = document.getElementById('step2');
         const saveSelected = document.getElementById('saveSelected')
       step2.style.display='block'
     saveSelected.style.display='block'
  }, [permissions, currentUser,state, navigate])

const handleUsersSave = async () =>{
  
  saveSelected.innerHTML='please wait ...'
  saveSelected.disabled= true
  const selectedUsers = getusersRight.length
  if(selectedUsers > Count ){
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
                user_rrrId: user_rrrId,
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
                  .catch(errMail=>{
                     setMsg(<Alert severity='error'>{errMail}</Alert>)
                  })

                })
                .catch(errCode=>{
                  setMsg(<Alert severity='error'>{errCode}</Alert>)
                })
  }
}
const showUpload = async()=>{
    setIsSet(true)
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
            <strong style={{color:'white'}}>ADD ENROLEES TO GOUP</strong>
          </CCardHeader>
          <CCardBody >
          <p>{msg}</p>
          <p style={{textAlign:'center', textTransform:'capitalize', fontSize:'16px'}}><b>{'Enrolee Name: ' + principal.surname + ' ' + principal.othername +'   [ ' + principal.email + ' ]' }</b></p>
            <DocsExample add="ADD MEMBER(S)"> 
<div id='step2'>
<CRow >
<CCol xs={12} xl={12}>


<p style={{textAlign:'right'}}>Upload New Enrolees <button ref ={saveElement1} onClick={showUpload} style={{cursor:'pointer'}} ><BackupIcon  /></button> {IsSet? <FormDialogCsvNew user_rrrId={user_rrrId} count ={Count}/>: ''}</p>
<p><h2>Add existing Enrolees</h2></p>
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
    <CButton id='saveSelected' onClick={handleUsersSave}>Save Selected Users</CButton><br />
    <Link to={'/renewal/rrr/'}>Back</Link>
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