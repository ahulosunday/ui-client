import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import app from '../helpers/axiosConfig'


const Role = ()=>{
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [ message, setMessage] = useState('')
const handleChange = e =>{
    setTitle(e.target.value)
}
    const handlSubmit = async (e) =>{
       try{
        e.preventDefault();
       const res = await app.post("/role",{name: title, description: value})
        setMessage('Request posted. Status:' + res.statusText)
        }
       catch(error){

       }
}
    return (
        <div className="write">
        <div className="content">
        <input placeholder="Role name" name="role" type="text" onChange={handleChange}/>
        <div className="editorContainer">
        <ReactQuill className="editor" placeholder="Description of the role" theme="snow" value={value} onChange={setValue} />
        </div>
        <br></br>
        <span className="add"> <button onClick={handlSubmit}>Add New</button>

        </span>
        {message === 'Request posted. Status:OK'? <i style={{color: 'green'}}>  { message}</i> : <i style={{color: 'red'}}>{ message}</i> }
       
       </div>
     
        </div>

       
    )
}

export default Role