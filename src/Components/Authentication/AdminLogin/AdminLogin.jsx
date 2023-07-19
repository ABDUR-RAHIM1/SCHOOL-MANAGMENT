import React from 'react'
import FormInput from "../../../Utilities/FormInput"
import {RiAdminLine} from "react-icons/ri"
import "./AdminLogin.css"
function AdminLogin() {
  return (
      <form action="">
          <div className='adminLoginContainer'>
       <div className="form__header">
         <RiAdminLine className='formIcon' />
          <h4>Admin login</h4>
       </div>
       <FormInput 
        type='text'
        placeholder ="Enter Your Email"
        name = "email"
        required= "required"
        
       />
           <FormInput 
        type='password'
        placeholder ="Enter Your Password"
        name = "password"
        required= "required"
        
       />
      <button className="btn authBtn my-3">login Now</button>
    </div>
      </form>
  )
}

export default AdminLogin