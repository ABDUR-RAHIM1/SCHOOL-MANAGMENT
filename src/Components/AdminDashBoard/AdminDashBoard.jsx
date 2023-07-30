import React, { useEffect, useState } from 'react'
import "./AdminDashBoard.css"
import { BsFillArrowRightCircleFill, BsBookHalf } from "react-icons/bs"
import { FaSadCry , FaTrashRestoreAlt} from "react-icons/fa"
import { BiMoney } from "react-icons/bi"
import { AiOutlineCloseCircle, AiFillHome, AiOutlineUsergroupAdd, AiOutlineUpload, AiOutlineEye, AiOutlineLogout, AiFillSetting } from "react-icons/ai"
import Sidebar from '../Sidebar/Sidebar'
import AdminHome from '../Admin/AdminHome/AdminHome'
import AddStudent from '../../Forms/AddStudent/AddStudent'
import GetStudents from '../Admin/GetStudents/GetStudents'
import UplaodResult from '../Admin/UplaodResult/UplaodResult'
import ViewResults from '../Admin/ViewResults/ViewResults'
import { useContext } from 'react'
import { GlobalContext } from '../../State/State'
import AddDue from '../Admin/AddDue/AddDue'
import GetDues from '../Admin/GetDues/GetDues'
import AddNotice from '../../Forms/AddNotice/AddNotice'
import GetNotice from '../Admin/GetNotice/GetNotice'
import AdminSettings from '../Admin/AdminSettings/AdminSettings'
import { json, useNavigate } from 'react-router-dom'
import img from "../../image/demo.jpg"
function AdminDashBoard() {
  const navigate = useNavigate()
  const [show, setShow] = useState(true) 
  const {component, setComponent} = useContext(GlobalContext)
  const [adminInfo , setAdminInfo] = useState(null)
  const handleDashBtnClick = (btnText) => {
    const text = btnText.target.innerText
    if (text === "HOME") setComponent(<AdminHome />)
    if (text === "ADD STUDENT") setComponent(<AddStudent />)
    if (text === "VIEW STUDENT") setComponent(<GetStudents />)
    if (text === "CHECK COMPLAINE") setComponent("CHECK COMPLAINE ")
    if (text === "UPLOAD NOTICE") setComponent(<AddNotice/>) 
    if (text === "VIEW NOTICE") setComponent(<GetNotice/>)
    if (text === "UPLOAD RESULT") setComponent(<UplaodResult/>)
    if (text === "VIEW RESULT") setComponent(<ViewResults/>)
    if (text === "ADD DUE") setComponent(<AddDue/>)
    if (text === "DUES") setComponent(<GetDues/>)
    if (text === "SETTINGS") setComponent(<AdminSettings/>) 
 
  };
//  log out admin 
const handleAdminLogOut =()=>{
      setTimeout(() => {
        localStorage.removeItem("adminInfo")
        navigate("/auth")
      }, 2000);
}  

//   get admininfo localstorage
useEffect(()=>{
    const data = localStorage.getItem("adminInfo");
    if (data) {
      const admin = JSON.parse(data);
       setAdminInfo(admin)
    }
} ,[])
console.log(adminInfo)
  return (
    <div className='AdminDashBoard flex_box'>
      <div className='back_Buttn mt-2'>
        {!show ? (<BsFillArrowRightCircleFill onClick={() => setShow(!show)} className="sideIcon " />)
          :
          (<AiOutlineCloseCircle onClick={() => setShow(!show)} className="sideIcon text-danger" />)}
      </div>
      <div className={!show ? "dashboardSideBar" : "dashboardSideBar2"}>
       <div className="adminInfoSidebar">
           <img src={adminInfo && adminInfo.image || img} alt="" />
           <p>{adminInfo && adminInfo.name}</p>
       </div>
        <Sidebar
          btnText="home"
          btnClass="btn sideBtn"
          icon={<AiFillHome />}
          iconClass="itemIcon"
          handleDashBtnClick={handleDashBtnClick}
        />
        <Sidebar
          btnText="Add student"
          btnClass="btn sideBtn"
          icon={<AiOutlineUsergroupAdd />}
          iconClass="itemIcon"
          handleDashBtnClick={handleDashBtnClick}
        />
        <Sidebar
          btnText="view student"
          btnClass="btn sideBtn"
          icon={<AiOutlineEye />}
          iconClass="itemIcon"
          handleDashBtnClick={handleDashBtnClick}
        />
        <Sidebar
          btnText="check complaine"
          btnClass="btn sideBtn"
          icon={<FaSadCry />}
          iconClass="itemIcon"
          handleDashBtnClick={handleDashBtnClick}
        />
        <Sidebar
          btnText="upload notice"
          btnClass="btn sideBtn"
          icon={<AiOutlineUpload />}
          iconClass="itemIcon"
          handleDashBtnClick={handleDashBtnClick}
        />
        <Sidebar
          btnText="view notice"
          btnClass="btn sideBtn"
          icon={<AiOutlineEye />}
          iconClass="itemIcon"
          handleDashBtnClick={handleDashBtnClick}
        />
              <Sidebar
          btnText="upload Result"
          btnClass="btn sideBtn"
          icon={<AiOutlineUpload />}
          iconClass="itemIcon"
          handleDashBtnClick={handleDashBtnClick}
        />
         <Sidebar
          btnText="view Result"
          btnClass="btn sideBtn"
          icon={<AiOutlineEye />}
          iconClass="itemIcon"
          handleDashBtnClick={handleDashBtnClick}
        />
              <Sidebar
          btnText="Add due"
          btnClass="btn sideBtn"
          icon={<BiMoney />}
          iconClass="itemIcon"
          handleDashBtnClick={handleDashBtnClick}
        />
        <Sidebar
          btnText="DUES"
          btnClass="btn sideBtn"
          icon={<FaTrashRestoreAlt />}
          iconClass="itemIcon"
          handleDashBtnClick={handleDashBtnClick}
        />
        <Sidebar
          btnText="Settings"
          btnClass="btn sideBtn"
          icon={<AiFillSetting />}
          iconClass="itemIcon"
          handleDashBtnClick={handleDashBtnClick}
        />
        <Sidebar
          btnText="log out"
          btnClass="btn sideBtn"
          icon={<AiOutlineLogout />}
          iconClass="itemIcon"
          handleDashBtnClick={handleAdminLogOut}
        />

      </div>
      <div className={!show ? "dashboardContent w-100" : "dashboardContent"}>
        {component}
      </div>
    </div>
  )
}

export default AdminDashBoard