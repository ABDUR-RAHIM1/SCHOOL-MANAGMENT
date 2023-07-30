import React, { useEffect, useState } from 'react'
import "./UserDashboard.css"
import { BsFillArrowRightCircleFill, BsBookHalf } from "react-icons/bs"
import { FaSadCry } from "react-icons/fa"
import { AiOutlineCloseCircle,  AiOutlineUsergroupAdd ,AiOutlineLogin } from "react-icons/ai"
import {MdSpatialAudio} from "react-icons/md" 
import {FaCloudShowersHeavy, FaStopwatch} from "react-icons/fa"
import Sidebar from '../Sidebar/Sidebar'
import AdminHome from '../Admin/AdminHome/AdminHome'
import { useNavigate } from 'react-router-dom'
import Profiles from '../Profiles/Profiles'
import DemoImg from "../../image/demo.jpg"
function UserDashBoard() {
    const [show, setShow] = useState(true)
    const [user , setUser] = useState(null)
    const [component, setComponent] = useState(<Profiles/>)
    const navigate = useNavigate()
    const handleDashBtnClick = (e) => {
        const text = e.target.innerText 
        if (text === "PROFILE") setComponent(<Profiles/>)
        if (text === "ATTENDENNCE") setComponent("ATTENDENNCE ")
        if (text === "TIME TABLE") setComponent("TIME TABLE ")
        if (text === "RESULT") setComponent("RESULT ")
        if (text === "COMPLAINE") setComponent("COMPLAINE ") 
    }

    //  handle log  out
    const handleLogOutUser =()=>{
         localStorage.removeItem("userInfo")
         setTimeout(() => {
            navigate("/auth")
         }, 1500);
    };

    //  profile photo set in sidebar 
    useEffect(()=>{
         const data = localStorage.getItem("userInfo");
         if (data) {
             const userProfile = JSON.parse(data)
             setUser(userProfile)
         }
    } ,[])
    console.log(user)
    return (
        <div className='AdminDashBoard flex_box'>
            <div className='back_Buttn mt-2'>
                {!show ? (<BsFillArrowRightCircleFill onClick={() => setShow(!show)} className="sideIcon" />)
                    :
                    (<AiOutlineCloseCircle onClick={() => setShow(!show)} className="sideIcon text-danger" />)}
            </div>
            <div className={!show ? "dashboardSideBar" : "dashboardSideBar2"}>
                <div className="adminInfoSidebar">
                     <img src={user && user.image || DemoImg} alt="" />
                     <p>{user && user.name}</p>
                </div>
                <Sidebar
                    btnText="profile"
                    btnClass="btn sideBtn"
                    icon={<AiOutlineUsergroupAdd />}
                    iconClass="itemIcon"
                    handleDashBtnClick={handleDashBtnClick}
                />
                <Sidebar
                    btnText="Attendennce"
                    btnClass="btn sideBtn"
                    icon={<MdSpatialAudio />}
                    iconClass="itemIcon"
                    handleDashBtnClick={handleDashBtnClick}
                />
                <Sidebar
                    btnText="time table"
                    btnClass="btn sideBtn"
                    icon={<FaStopwatch />}
                    iconClass="itemIcon"
                    handleDashBtnClick={handleDashBtnClick}
                />
                <Sidebar
                    btnText="result"
                    btnClass="btn sideBtn"
                    icon={<FaCloudShowersHeavy />}
                    iconClass="itemIcon"
                    handleDashBtnClick={handleDashBtnClick}
                />
                <Sidebar
                    btnText="complaine"
                    btnClass="btn sideBtn"
                    icon={<FaSadCry />}
                    iconClass="itemIcon"
                    handleDashBtnClick={handleDashBtnClick}
                />
                <Sidebar
                    btnText="Log Out"
                    btnClass="btn sideBtn"
                    icon={<AiOutlineLogin />}
                    iconClass="itemIcon"
                    handleDashBtnClick={handleLogOutUser}
                />
           
           


            </div>
            <div className={!show ? "dashboardContent w-100" : "dashboardContent"}>
                {component}
            </div>
        </div>
    )
}

export default UserDashBoard