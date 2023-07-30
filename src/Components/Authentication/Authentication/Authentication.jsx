import React, { useState } from 'react'
import "./Authentication.css"
import { RiAdminLine } from "react-icons/ri"
import { BsBookHalf } from "react-icons/bs"
import {AiFillBackward} from "react-icons/ai"
import AdminLogin from '../AdminLogin/AdminLogin'
import UserLogin from '../UserLogin/UserLogin'
import { useLocation, useNavigate } from 'react-router-dom'
function Authentication() {
    const location = useLocation();
    const navigate = useNavigate()
    const [show, setShow] = useState({
        adminShow: false,
        userShow: false
    });
     
    if (location.state === "admin-create") {
        show.adminShow = true 
    }
  
    const handleFormShow = (user) => {
        setShow(!show)
        if (user === "admin") {
            setShow((show) => ({
                ...show,
                adminShow: true,
                userShow: ""
            }))
        } else {
            setShow((show) => ({
                ...show,
                adminShow: "",
                userShow: true
            }))
        }
    }
    const handleBackClick =()=>{
        if (location.state === "admin-create") {
             navigate("/admin-dashboard")
        }
        setShow((show) => ({
            ...show,
            adminShow: false,
            userShow: false
        }))
    }
    return (
        <>
        <div className='Authentication'>
            {show.adminShow === !true || show.userShow === !true ? (<div className={location.state=== "admin-create" ? "opacity-0" : "authContainer flex_box"}>
                <div onClick={() => handleFormShow("admin")} className="login_container text-center">
                    <RiAdminLine className='loginIcon' />
                    <h4>As a Admin</h4>
                </div>
                <div onClick={() => handleFormShow("user")} className="login_container text-center">
                    <BsBookHalf className='loginIcon' />
                    <h4>As a Student</h4>
                </div>
            </div>
            ) : ""
            }

   </div>
      {
        (show.adminShow || show.userShow) &&
      <div> 
            <div className="formContainer">
        <AiFillBackward onClick={handleBackClick} className='backIcon'/>
                {show.adminShow &&
                    (<div className="adminForm">
                        <AdminLogin />
                    </div>)
                }

                {show.userShow && (<div className="userForm">
                    <UserLogin />
                </div>)}

            </div>
        </div>}
        </>
    
    )
}

export default Authentication