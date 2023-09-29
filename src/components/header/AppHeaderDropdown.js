import React, { useContext } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilPen,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import baseURLStatic from '../../helpers/imageUrl'
import BasicSpeedDial from '../speedDial'
import { Button } from '@mui/material'
const AppHeaderDropdown = () => {

    const {logout, currentUser } = useContext(AuthContext);

const navigate = useNavigate()
      
      const handleLogout = async e =>{
       // e.preventDefault()
        try{
         
           if ( logout()){
            navigate("/login")
           }
           
        }
        catch(errs){
            return (errs)
        }
       }
       const handleChangePassword = async e=>{
        navigate('/change-passport')
       }
  return (
    <CDropdown variant="nav-item" title='LogOut'> <BasicSpeedDial />
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false} title='Logout'>
        <CAvatar alt={currentUser?.email} src={`${baseURLStatic}${currentUser?.imgurl}`} size="md" />
        {currentUser?.email}
      </CDropdownToggle>
  <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
        User Settings
        
        </CDropdownHeader>
        <CDropdownItem >
          <CIcon icon={cilLockLocked} className="me-2" />
          <Button className='btn btn-link' onClick={handleLogout}>LogOut</Button>
        </CDropdownItem>
        
      </CDropdownMenu> 
    </CDropdown>
  )
}

export default AppHeaderDropdown
