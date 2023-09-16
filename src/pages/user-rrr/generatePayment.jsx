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
const GeneratePayment = ()=>{
const [expanded, setExpanded] = React.useState(false);
 const [getrrr, setGetrrr] = React.useState([]);
    const [page, setPage]= React.useState(1)
    const [data, setData] = React.useState([])
    const {currentUser, permissions } = React.useContext(AuthContext);
   const navigate = useNavigate()
   
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
       
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
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
          <CTableDataCell>ACTIVE?</CTableDataCell>
          </CTableRow>
          </CTableHead>
          <CTableBody>
       {
       
            datas.nodes.length === 0? '': datas.nodes.map((item)=>{
                sum = sum + item.amount
            return(
            <CTableRow key={item.id}>
             <CTableDataCell><input type='checkbox' name='id' id={item.id} /></CTableDataCell>
       <CTableDataCell>{item.rrr_number}</CTableDataCell>
        <CTableDataCell>{item.authNumber}</CTableDataCell>
          <CTableDataCell>{formatCurreny.format(item.amount)}</CTableDataCell>
          <CTableDataCell>{item.maxNumber}</CTableDataCell>
          <CTableDataCell>{item.gifship.name + ' '+ item.gifshiptype.name + ' '+ item.gifshipPackage.name}</CTableDataCell>
          <CTableDataCell>{formatDate(new Date(item.createdAt))}</CTableDataCell>
<CTableDataCell>{item.activated?'Active':"Inactive"}</CTableDataCell>
         
</CTableRow>
)})}
</CTableBody>
          </CTable>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Sum: {formatCurreny.format(sum)} 
           <p style={{textAlign:'right'}}><Link to={''}>Activate selected item(s)</Link></p>
          </Typography>
        </AccordionDetails>
      </Accordion>
   
   </DocsExample>
   </CCardBody>
   </CCard>
   </CCol>
   </CRow>
   
  );
}


export default GeneratePayment