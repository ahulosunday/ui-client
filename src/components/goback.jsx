import LoadingButton from "@mui/lab/LoadingButton/LoadingButton"
import { useNavigate } from "react-router-dom"
import SendIcon from '@mui/icons-material/Cancel';


const Goback = (props) =>{
     const navigate = useNavigate()
const handleBack = e =>{

   navigate(props.url)
}

    return(
        <LoadingButton
          color="secondary"
          onClick={handleBack}
          variant="contained"
          style={{backgroundColor:'gray'}}
           endIcon={<SendIcon />}
          loadingPosition="end"
        >
          <span>CANCEL</span>
        </LoadingButton>
        
    )
}
export default Goback