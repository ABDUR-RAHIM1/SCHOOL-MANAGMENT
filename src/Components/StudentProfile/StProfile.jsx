import React from 'react'
import {AiFillDelete} from "react-icons/ai"
import DemoImg from "../../image/demo.jpg"
function StProfile(props) {
  const {_id, name, email, image, date } = props.students;
  return (
    <div className='stProfile'>
      <div className={props.check ? "adminBtn" : "adminBtn hide"}>
        <AiFillDelete onClick={()=>props.handleDeleteStudent(_id)}  className='adminBtnIcon text-danger' />
      </div>
      <img src={image || DemoImg} alt="" />
      <small>Join Date :{date}</small>
      <p>Name : {name}</p>
      <p>Email : {email}</p>
    </div>
  )
}

export default StProfile