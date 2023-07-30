import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import demoImg from "../../../image/demo.jpg"
import { GlobalContext } from '../../../State/State'
import Student from '../Student/Student'
import "./GetStudents.css"
import Loading from '../../Loading/Loading'
import Checkbox from '../../Checkbox/Checkbox'
import Notification from '../../../Utilities/Notification'

function GetStudents() {  
   const [isDelete , setIsDelete] = useState(false)
   const [message , setMessage] = useState('')
   const [isCheck , setIsCheck] = useState(false)
   const [clickImg, setClickImg] = useState(false)
   const [loading, setLoading] = useState(false)
   const { student, setStudent } = useContext(GlobalContext)
   const reverseStudent = student.slice().reverse();
   const [details, setDetails] = useState([])
   const [search , setSearch] = useState("")  
      //  admin btn checkbox condition
   const handleCheck =()=>{
      setIsCheck(!isCheck)
  }
    //  search student 
    const handleSearchBlur =(e)=>{
      const value = (e.target.value).toLowerCase()
      setSearch(value)
   }
   // get students
   useEffect(() => {
        isDelete || search ? setLoading(false) : setLoading(true)
      fetch("http://localhost:8000/api/student?search="+search)
         .then(res => res.json())
         .then(data => { 
            setStudent(data.student)
            setLoading(false)
         })

   }, [setStudent, search, isDelete]) 

   //  student details 
   const handleDetails = async (stId) => {
      const studentId = stId
      const FindStudent = await student.find(st => st._id === studentId)
      setDetails(FindStudent)
   }
  
   //  delete students
  const handleStudentDelete =(id)=>{
     console.log("first" , id)
     fetch(`http://localhost:8000/api/student/${id}`, {
       method :"DELETE",
     }).then(res => res.json())
     .then(data => {
        console.log(data)
        setIsDelete(!isDelete)
        setMessage(data.message)
        setTimeout(() => {
          setMessage("")
        }, 3000);
     })
  }

  
   // loading spinner
   if (loading) {
      return <Loading />
   }
 
   return (
      <>
      {
         message && <Notification
           message={message}
         />
      }
         <div className={details._id ? 'studnets-container hide' : 'studnets-container show'}>
            <div className="checbox-container">
            <Checkbox
            handleCheck={handleCheck}
            />
            </div>
             <h3 className='text-center mb-2'>List Of Students</h3>
            <div className="searchBar flex_box">
               <input onChange={handleSearchBlur} className='form-control my-2' type="search" placeholder='Find Student' />
                
            </div>
            <div className='flex_box getStudentContainer'>
               {
                  student ? reverseStudent.map(st =>
                     <Student
                        key={st._id}
                        student={st}
                        isCheck={isCheck} 
                        handleStudentDelete={handleStudentDelete}
                        handleDetails={handleDetails}
                     />)
                     : <h3 className='text-center text-danger'>Shomthing went wrong</h3>
               }

               {
                  student.length <= 0 && <h3 className='mt-4'> <span className='text-danger'>{search}</span> Not Found </h3>
               }
            </div>
         </div>

         <div className={details._id ? "student-details-show" : "student-details-hide"}>
            <AiOutlineClose onClick={() => setDetails([])} className='imgCLosedBtn' />
            <h3 className='text-center my-3 text-light'>Student Information</h3>
            <div className="stInfoWrap">
               <div className="dImg text-center">
                  <img className={clickImg ? "dImgBigger" : ""} onClick={() => setClickImg(!clickImg)} src={details.photo || demoImg} alt="" />
               </div>
               <div className="detailsBody  p-3">
                  <table className='table table-hover table-light table-responsive'>
                     <thead className='bg-primary'>
                        <tr>
                           <th>#No</th>
                           <th>Key</th>
                           <th>Info</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className='table-secondary'>
                           <td>01</td>
                           <td >Name</td>
                           <td> {details.name}</td>
                        </tr>
                        <tr>
                           <td>02</td>
                           <td>Class</td>
                           <td> {details.class < 10 ? "0" + details.class : details.class}</td>
                        </tr>
                        <tr className='table-danger'>
                           <td>03</td>
                           <td>Roll</td>
                           <td>{details.roll < 10 ? "0" + details.roll : details.roll}</td>
                        </tr>
                        <tr >
                           <td>04</td>
                           <td>Group</td>
                           <td> {details.group}</td>
                        </tr>
                        <tr >
                           <td>05</td>
                           <td>Birth Date </td>
                           <td > {details.birthDate}</td>
                        </tr>
                        <tr>
                           <td>06</td>
                           <td>Session </td>
                           <td> {details.session}</td>
                        </tr>
                        <tr>
                           <td>07</td>
                           <td>Phone </td>
                           <td> {"+880 " + details.phone}</td>
                        </tr>
                        <tr>
                           <td>08</td>
                           <td>Blood Group </td>
                           <td> {details.bloodGroup || "N/A"}</td>
                        </tr>
                        <tr>
                           <td>09</td>
                           <td>Religion </td>
                           <td> {details.religion}</td>
                        </tr>
                        <tr>
                           <td>10</td>
                           <td> Guardian Name  </td>
                           <td> {details.guardianName}</td>
                        </tr>
                        <tr>
                           <td>11</td>
                           <td> Guardian Phone  </td>
                           <td> {"+880 " + details.guardianPhone || "N/A"}</td>
                        </tr>
                        <tr>
                           <td>12</td>
                           <td> Emergency Contact  </td>
                           <td> {"+880 " + details.emergencyContact}</td>
                        </tr>
                        <tr>
                           <td>13</td>
                           <td> Guardian Email  </td>
                           <td> {details.guardianEmail || "N/A"}</td>
                        </tr>
                        <tr>
                           <td>14</td>
                           <td> address  </td>
                           <td> {details.address || "N/A"}</td>
                        </tr>
                        <tr>
                           <td>15</td>
                           <td> Admission Date  </td>
                           <td> {details.admissionDate || "N/A"}</td>
                        </tr>
                     </tbody>
                  </table>

               </div>
            </div>
         </div>
      </>
   )
}

export default GetStudents