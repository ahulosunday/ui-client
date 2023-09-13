import { CButton } from '@coreui/react';
import BrowseGalleryOutlinedIcon from '@mui/icons-material/BrowseGalleryOutlined';
import { Link } from 'react-router-dom';
const ViewIcon = (props) =>{
    return(<CButton color="info" size="sm" >
        <Link title="View" to={props.to}  state={props.state} style={{color:'white', textDecoration:'none'}}><BrowseGalleryOutlinedIcon /></Link>
        </CButton>
    )
}
export default ViewIcon