import React from 'react'
import "./FormInput.css"
function FormInput(props) {
  return (
    <div className='formInput'>
        <input
         type={props.type}
         name={props.name}
         placeholder={props.placeholder}
         required={props.required}
         onChange={props.handleChange}
         />
    </div>
  )
}

export default FormInput