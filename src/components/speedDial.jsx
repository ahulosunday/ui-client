import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddToHomeScreenRounded from '@mui/icons-material/AddToHomeScreenRounded'
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const actions = [
  { icon: <PersonRemoveAlt1OutlinedIcon />, name: 'Logout' },
  
];

export default function BasicSpeedDial() {
    const {logout, currentUser } = React.useContext(AuthContext);
   
 
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
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', top: 50, right: 16 }}
        icon={<HttpsOutlinedIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleLogout}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}