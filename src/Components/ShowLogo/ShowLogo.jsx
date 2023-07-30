import React from 'react'
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"

function ShowLogo(props) { 
  return (
    <div className='logoImg'>
             <div className="logoBtn">
              <AiFillDelete onClick={()=>props.handleLogoDelete(props.logo._id)} className='stAdminIcon text-danger' /> 
            </div>
        <img src={props.logo.logo} alt="" />
    </div>
  )
}

export default ShowLogo