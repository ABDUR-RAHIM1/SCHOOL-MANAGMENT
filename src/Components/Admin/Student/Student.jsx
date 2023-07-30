import React, { useContext, useState } from 'react'
import { BsFillArrowDownRightCircleFill } from 'react-icons/bs'
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import "./Student.css"
import demoImg from '../../../image/demo.jpg'
import { GlobalContext } from '../../../State/State'
import AddStudent from '../../../Forms/AddStudent/AddStudent'

function Student(props) {
  const { name, email, roll, photo, _id } = props.student;
  const { setComponent } = useContext(GlobalContext) // dynamic edit form
  const handleEditClick = (id) => {
    if (id) return setComponent(<AddStudent
      editStudentId={_id}
      studentData={props.student} />)
  }
  return (
    <>
      <div className='student'>
        <div className="stContent">
          <div className={props.isCheck ? "st-admin-btn flex_box" : "st-admin-btn-hide flex_box"}>
            <AiFillDelete onClick={() => props.handleStudentDelete(_id)} className='stAdminIcon' />
            <BiEdit onClick={() => handleEditClick(_id)} className='stAdminIcon' />
          </div>
          <img src={photo || demoImg} alt="student" />
          <p className='name-text'>Name : {name}</p>
          <p>Class : {props.student.class < 10 ? "0" + props.student.class : props.student.class}</p>
          <p>Roll : {roll < 10 ? "0" + roll : roll}</p>
          <p>Email : {email}</p>
          <BsFillArrowDownRightCircleFill
            onClick={() => props.handleDetails(_id)}
            className="arrowIcon" />
        </div>



      </div>


    </>
  )
}

export default Student


