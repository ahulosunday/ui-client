import { CButton } from '@coreui/react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Link } from 'react-router-dom';
const EditIcon = (props) =>{
    return(<CButton color="secondary" size="sm" >
        <Link title="Edit" to={props.to}  state={props.state} style={{color:'white', textDecoration:'none'}}><CreateOutlinedIcon /></Link>
        </CButton>
    )
}
export default EditIcon