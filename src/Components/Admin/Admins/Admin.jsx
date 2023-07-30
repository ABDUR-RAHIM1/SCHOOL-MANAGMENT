import React from 'react'
import {AiFillDelete} from "react-icons/ai"
import demoImg from "../../../image/demo.jpg"
function Admin(props) {
    const {_id , name, email , image} = props.admin;
  return (
    <div className='admin'>
         <div className={props.check ? "adminBtn" : "adminBtn hide"}>
            <AiFillDelete onClick={()=>props.handleDeleteAdmin(_id)}  className='adminBtnIcon text-danger' /> 
          </div>
         <img src={image || demoImg} alt="" />
         <h6> Name :{name}</h6>
         <p>Email : {email}</p>
    </div>
  )
}

export default Admin