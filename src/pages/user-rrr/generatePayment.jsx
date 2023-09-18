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
const GeneratePayment = ()=>{
const [expanded, setExpanded] = React.useState(false);
 const [getrrr, setGetrrr] = React.useState([]);
    const [page, setPage]= React.useState(1)
    const [data, setData] = React.useState([])
    const {currentUser, permissions } = React.useContext(AuthContext);
   const navigate = useNavigate()
   

  const handleChanged = async (e, value) => {
    setPage(value);
    await app.get(`/rrr/not/activate/0/1/1/`).then(res=>{
            setGetrrr(res.data)
        }).catch(err=>{
            showToastMessage(err, 'error')
        })

  }
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const getCount = async (user_rrrId)=>{
    try{
      const count = await app.get(`/codes/${user_rrrId}/code/rrr/`)
      return(count.data.count)
    }
    catch(err){
      return (0)
    }
    
  }
  React.useEffect(()=>{
    if(!(permissions.indexOf("VIEW_RRR") > -1) ){
        navigate('/')
    }

const loadItem = async e =>{
 try{
         
        await app.get(`/rrr/not/activate/0/1/1/`).then(res=>{
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


   const [search, setSearch] = React.useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  
const datas = {
  nodes: getrrr.filter((item) =>
    item.createdAt.toLowerCase().includes(search.toLowerCase()
    )
  ),
};
 var sum = 0;
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
        <input id="search" placeholder='Search by Date' className='form-control' type="text" onChange={handleSearch} />
      </CInputGroup>
            <DocsExample add="Payment List">
       
  
          <CTable style={{fontSize:'12px'}} align="middle" responsive>
          <CTableHead>
          <CTableRow>
          <CTableDataCell><input type='checkbox' name='id' /></CTableDataCell>
          <CTableDataCell>RRR NUMBER</CTableDataCell>
          <CTableDataCell>AUTH. CODE</CTableDataCell>
          <CTableDataCell>AMOUNT</CTableDataCell>
          <CTableDataCell>No#</CTableDataCell>
          <CTableDataCell>PACKAGE</CTableDataCell>
          <CTableDataCell>DATE PAID</CTableDataCell>
          <CTableDataCell>STATUS</CTableDataCell>
          </CTableRow>
          </CTableHead>
          <CTableBody>
       {
       
            datas.nodes.length === 0? '': datas.nodes.map((item)=>{
                sum = sum + item.amount

            return(
            <CTableRow key={item.id}>
             <CTableDataCell>{getCount(item.id) === item.maxNumber ? <input type='checkbox' name='id' id={item.id} />: null}</CTableDataCell>
       <CTableDataCell><Link title='View the list of enrolees under this payment' to={`/user-rrr/dependants`} state={item.id}>{item.rrr_number}</Link></CTableDataCell>
        <CTableDataCell>{item.authNumber}</CTableDataCell>
          <CTableDataCell>{formatCurreny.format(item.amount)}</CTableDataCell>
          <CTableDataCell>{item.maxNumber}</CTableDataCell>
          <CTableDataCell>{item.gifship.name + ' '+ item.gifshiptype.name + ' '+ item.gifshipPackage.name}</CTableDataCell>
          <CTableDataCell>{formatDate(new Date(item.createdAt))}</CTableDataCell>
<CTableDataCell>{getCount(item.id) === item.maxNumber ? <CheckBoxIcon  />:<ClearIcon />}</CTableDataCell>

</CTableRow>
)})}
</CTableBody>
          </CTable>
    
        <AccordionDetails>
          <Typography>
           Sum: {formatCurreny.format(sum)} 
           <p style={{textAlign:'right'}}><Link to={''}>Activate selected payment</Link></p>
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