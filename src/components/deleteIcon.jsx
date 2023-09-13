import { CButton } from '@coreui/react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Link } from 'react-router-dom';
const DeleteIcon = (props) =>{
    return(<CButton color="danger" size="sm" >
        <Link title="Delete" to={props.to}  state={props.state} style={{color:'white', textDecoration:'none'}}><DeleteForeverOutlinedIcon /></Link>
        </CButton>
    )
}
export default DeleteIcon