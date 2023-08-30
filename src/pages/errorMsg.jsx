import { useNavigate } from "react-router-dom"

const ErrorMsg = (props) =>{

    return(
        <span style={{color: 'red'}}>{props.msg}</span>
    )
}
export default ErrorMsg