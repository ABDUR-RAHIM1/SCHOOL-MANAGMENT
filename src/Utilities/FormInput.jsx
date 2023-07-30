import React from 'react'
import "./FormInput.css"
function FormInput(props) {
  return (
    <div className='formInput'>
        <input
        className={props.type === "file" ? "form-control" : ""}
         type={props.type}
         name={props.name}
         value={props.value || ""}
         placeholder={props.placeholder}
         required={props.required} 
         onChange={props.type !== "file" ? props.handleChange : props.handelImageChange}
         />
    </div>
  )
}

export default FormInput