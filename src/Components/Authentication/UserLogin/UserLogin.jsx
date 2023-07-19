import React from 'react'
import FormInput from '../../../Utilities/FormInput'
import {BsBookHalf} from "react-icons/bs"
function UserLogin() {
  return (
    <form>
       <div className="form__header">
         <BsBookHalf className='formIcon' />
          <h4>User login</h4>
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
    </form>
  )
}

export default UserLogin