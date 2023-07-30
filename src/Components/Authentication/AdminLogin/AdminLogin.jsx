import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import FormInput from "../../../Utilities/FormInput"
import Spinner from "../../Spinner/Spinner"
import { RiAdminLine } from "react-icons/ri"
import "./AdminLogin.css"
import { GlobalContext } from '../../../State/State'
import ResetPassword from '../../../Forms/ResetPassword/ResetPassword'
function AdminLogin() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [imgLoading, setImgLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { loginInfo, setLoginInfo } = useContext(GlobalContext);
  //  handleLoginChange 
  const handleLoginChange = (e) => {
    const value = (e.target.value).toLowerCase();
    setLoginInfo({ ...loginInfo, [e.target.name]: value })
  }
  const handleAdminSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    fetch("http://localhost:8000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(loginInfo)
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.status === true) {
          const admin = localStorage.setItem("adminInfo", JSON.stringify(data.adminInfo))
          setTimeout(() => {
            data.status && navigate("/admin-dashboard")
          }, 1000);
        }
        setIsLoading(false)
        data.error ? setMessage(data.error) : setMessage(data.message)

      })
  };
  //  handle image change 
  const handleImageChange = async (e) => {
    setImgLoading(true)
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "demo-image");
    formData.append("cloud_name", "dsrkrb3jy");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsrkrb3jy/image/upload",
      {
        method: "POST",
        body: formData,
      })
    const data = await res.json()
    setLoginInfo((prevItem) => ({
      ...prevItem,
      image: data.url
    }))
    setImgLoading(false)
  }
  //  create admin handler
  const handleAdminCreate = (e) => {
    e.preventDefault();
    setIsLoading(true)
    fetch("http://localhost:8000/api/admin", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(loginInfo)
    }).then(res => res.json())
      .then(data => {
        setIsLoading(false)
        console.log(data);
        data.error ? setMessage(data.error) : setMessage(data.message)
      })
  }
  return (
    <>
      <form onSubmit={state === "admin-create" ? handleAdminCreate : handleAdminSubmit}>
        <div className='adminLoginContainer'>
          <div className="form__header">
            <RiAdminLine className='formIcon' />
            <h4>Admin {state === "admin-create" ? "Create" : "login"}</h4>
          </div>
          {state === "admin-create" && <FormInput
            type='text'
            placeholder="Enter Name"
            name="name"
            value={loginInfo.name}
            handleChange={handleLoginChange}
            required="required"

          />}
          <FormInput
            type='text'
            placeholder="Enter Email"
            name="email"
            value={loginInfo.email}
            handleChange={handleLoginChange}
            required="required"

          />
          <FormInput
            type='password'
            placeholder="Enter Password"
            name="password"
            value={loginInfo.password}
            handleChange={handleLoginChange}
            required="required"

          />
          {
            state === "admin-create" &&

            (
              !imgLoading ?
                (<input
                  type="file"
                  name='image'
                  className='form-control my-3'
                  onChange={handleImageChange}
                />) : (
                  <div className='mt-4 loadingDiv'>
                    <Spinner />
                    <span>Image Uploading...</span>
                  </div>
                )

            )

          }
          <button disabled={imgLoading} className="btn authBtn my-3">
            {state === "admin-create" ? "Create Admin" : "login Now"}
          </button>
        </div>

        {
          isLoading ? <Spinner /> : (message.includes("successfull") ? <h6 className='text-center text-success'>{message}</h6> : <h6 className='text-center text-danger '>{message}</h6>)
        }


      </form>

      {/*  reset  password modal */}
      {

        message.includes("failed") && <h6 className='my-4 text-center'> <span className='text-danger'>Forgot password ! </span> <button onClick={() => setShow(!show)} className='btn btn-sm btn-outline-success'>Reset password</button></h6>
      }

      {
        show && <ResetPassword
        show={setShow}
        />
      }
      {/*  reset  password modal */}
    </>
  )
}

export default AdminLogin