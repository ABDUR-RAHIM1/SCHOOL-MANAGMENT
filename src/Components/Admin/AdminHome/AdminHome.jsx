import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Admins from '../Admins/Admins'
import AdminProfile from "../../AdminProfile/AdminProfile";
import StudentProfile from '../../StudentProfile/StudentProfile';
function AdminHome() {
  const [showCompo, setShowCompo] = useState(false)
  return (
    <>

      <div className='adminHomeContainer'>
          <AdminProfile /> 
        <button onClick={()=>setShowCompo(!showCompo) } className="btn btn-success btn-lg">
          {
            showCompo ? "See Students" : "See Admins"
          }
        </button>
        <Link to="/auth" state="admin-create">
          <button className="btn btn-lg btn-primary my-4">Create A Admin</button>
        </Link>
        {showCompo  ? <Admins />  :
          <StudentProfile /> }
      </div>
    </>
  )
}

export default AdminHome