import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
    CButton,
  CCard,
  CCardBody,
  CContainer,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cibAmericanExpress, cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { DocsExample } from '../../../components'
import DefaultLogo from '../../../img/logo2.png'
import ToggleClick from './GifshipModal'
import { useLocation, useNavigate } from 'react-router-dom'
import app from '../../../helpers/axiosConfig'
import { nanoid, pin } from '../../../helpers/customAlphabet';

const SelectOptions = () => {
   const state = useLocation().state
   const [username, setUsername] = useState('')
   const [getGifship, setGifship] = useState([]);
   const navigate = useNavigate()

   useEffect(()=>{
    
    setUsername(state)
    const loadItem = async e =>{
 try{
          
       await app.get(`/getGifshipPackagesAll/1/1/all/1`)
       .then(res=>{
        setGifship(res.data);
       })
       .catch(err=>{
        showToastMessage('Something went wrong while trying to load data...', 'error')
       })  
    }catch(err){
        showToastMessage('Error occured while loading data', 'error')
        }
        
    }
    loadItem();

       



    
   },[navigate]);

  return (
    <div style={{marginTop:'1%'}}>
    <div  className="bg-light min-vh-100 d-flex flex-row align-items-center"  md={12} xs={12} xl={12}>
      <CContainer >
      <CRow className="justify-content-center">
      <CCol xl={8} xs={12}>
      <p className="text-medium-emphasis" style={{textAlign:'center'}}>
                     <img style={{marginTop:0, borderRadius:'30px'}} src={DefaultLogo} alt='' />
                     <br />
                    <span style={{color:'teal'}}> e-NHIA PORTAL</span> 

                    <br />
                    
                   
                </p>
      </CCol>
      </CRow>
        <CRow className="justify-content-center">
          <CCol xs={12} xl={12}>
            <CCard className="mx-4">
              <CCardBody className="p-4" style={{backgroundColor:'AppWorkspace'}}>
              <DocsExample add="SELECT THE PROGRAMMES"> 
<CRow>

     <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
         <CIcon icon={cibAmericanExpress} />
            </>
          }
          title="GIFSHIP"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
              {
                username===null? '': getGifship.length === 0? '': getGifship.map((item)=>{
                  return(
                      <CDropdownItem key={item.id}><ToggleClick user={username} option={item.id} name={item.name} /></CDropdownItem>
                
                  );
                })
              }
                
               
              </CDropdownMenu>
            </CDropdown>
          }
      />
      </CCol>
       <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
         <CIcon icon={cibAmericanExpress} />
            </>
          }
          title="ADD DEPENDANT"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Individual</CDropdownItem>
                <CDropdownItem >Family</CDropdownItem>
                <CDropdownItem>Group</CDropdownItem>
               
              </CDropdownMenu>
            </CDropdown>
          }
      />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
         <CIcon icon={cibAmericanExpress} />
            </>
          }
          title="EXTRA DEPENDANT"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Individual</CDropdownItem>
                <CDropdownItem >Family</CDropdownItem>
                <CDropdownItem>Group</CDropdownItem>
               
              </CDropdownMenu>
            </CDropdown>
          }
      />
      </CCol>
       <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
         <CIcon icon={cibAmericanExpress} />
            </>
          }
          title="ACCREDITATION"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Individual</CDropdownItem>
                <CDropdownItem >Family</CDropdownItem>
                <CDropdownItem>Group</CDropdownItem>
               
              </CDropdownMenu>
            </CDropdown>
          }
      />
      </CCol>
</CRow>
</DocsExample>
</CCardBody>
</CCard>
</CCol>
</CRow>
</CContainer>
</div>
</div>

  )}
  export default SelectOptions;