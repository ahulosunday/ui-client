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
        {/*<CAvatar alt={currentUser?.email} src={currentUser? `${baseURLStatic}${currentUser?.imgurl}` : null} size="md" />
        */}{currentUser?.email}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
        User Settings
        
        </CDropdownHeader>
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          LogOut
        </CDropdownItem>
        
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
