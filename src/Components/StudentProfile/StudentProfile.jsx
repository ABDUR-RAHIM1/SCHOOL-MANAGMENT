import React, { useEffect, useState } from 'react'
import "./StudentProfile.css"
import Checkbox from '../Checkbox/Checkbox'
import StProfile from './StProfile';
import Loading from '../Loading/Loading';
function StudentProfile() {
  const [check, setCheck] = useState(false)
  const [isDelete , setIsDelete]  = useState(false)
  const [isLoading , setIsloading] = useState(false)
    const [stProfile, setStProfile] = useState([]);
    useEffect(()=>{
     !isDelete &&  setIsloading(true)
         fetch("http://localhost:8000/api/student/profile")
         .then(res => res.json())
         .then(data => {
            setStProfile(data)
            setIsloading(false)
         })
    } ,[isDelete]);

//  delete student 
const handleDeleteStudent = (id)=>{
  
   fetch(`http://localhost:8000/api/student/profile/${id}`, {
    method : "DELETE"
   }).then(res => res.json())
   .then(data => {
     setIsDelete(!isDelete)
   })
}


    if (isLoading) {
       return <Loading/>
    }
  return (
    <>
   <div className="stPrfole-header flex_box">
   <h2 className='text-center my-4'>List of students</h2>
    <Checkbox
     handleCheck={()=> setCheck(!check)}
    />
   </div>
    <div className='student-profile-container flex_box'>
          {
            stProfile.map(st => (
                 <StProfile
                 key={st._id}
                 check={check}
                 handleDeleteStudent={handleDeleteStudent}
                  students={st}
                 />
            ))
          }
    </div>
    </>
  )
}

export default StudentProfile