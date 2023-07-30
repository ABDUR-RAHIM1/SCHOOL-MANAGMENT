import React, { useContext, useState } from 'react'
import FormInput from '../../../Utilities/FormInput'
import { BsBookHalf } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../../State/State'
import Spinner from '../../Spinner/Spinner'
import ResetPassword from '../../../Forms/ResetPassword/ResetPassword'
function UserLogin() {
  const mavigate = useNavigate()
  const [show, setShow] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLaoding] = useState(false)
  const [imgLoading, setImgLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { loginInfo, setLoginInfo } = useContext(GlobalContext)

  const handelImageChange = async (e) => {
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

  const handleUserChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }
  const handleUserSubmit = (e) => {
    e.preventDefault()
    setIsLaoding(true)
    fetch("http://localhost:8000/api/student/profile/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(loginInfo)
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        setIsLaoding(false)
        setMessage(data.message)

        if (data.status) {
          const UserData = JSON.stringify(data.profile);
          localStorage.setItem("userInfo", UserData)
          setTimeout(() => {
            mavigate("/user-dashboard")
          }, 1500);
        }
      })
  };
  //  create a new user
  const handleUserCreate = (e) => {
    e.preventDefault();
    setIsLaoding(true)
    fetch("http://localhost:8000/api/student/profile", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(loginInfo)
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        setIsLaoding(false)
        data.error ? setMessage(data.error) : setMessage(data.message)
      })
  }

  const handleFormChange = () => {
    setIsLogin(!isLogin)
    setMessage("")
  }
  return (
    <form onSubmit={isLogin ? handleUserCreate : handleUserSubmit}>
      <div className="form__header">
        <BsBookHalf className='formIcon' />
        <h4>{isLogin ? "Create New Account" : "User login"}</h4>
      </div>
      {isLogin && <FormInput
        type='name'
        placeholder="Enter Your Name"
        name="name"
        value={loginInfo.name}
        required="required"
        handleChange={handleUserChange}

      />}
      <FormInput
        type='email'
        placeholder="Enter Your Email"
        name="email"
        value={loginInfo.email}
        required="required"
        handleChange={handleUserChange}

      />
      <FormInput
        type='password'
        placeholder="Enter Your Password"
        name="password"
        value={loginInfo.password}
        required="required"
        handleChange={handleUserChange}

      />
      {
        isLogin &&
        (!imgLoading ? <input type="file"
          name='image'
          onChange={handelImageChange}
          className='form-control my-3'
        />
          : <div className='mt-4 laodingDiv'> <Spinner /> <span>Image Uploading . . . </span></div>
        )
      }

      <button disabled={imgLoading} className="btn authBtn my-3">

        {isLoading ? <span className='text-light'>Checking</span> : <span>{isLogin ? "Create Account" : "login now"}</span>}

      </button>
      {
        message && <h6 className={message.includes("successfull") ? "text-success text-center" : "text-center text-danger"}>{message}</h6>
      }

      {/* foraget password */}
      {

        message.includes("failed") && <h6 className='my-4 text-center'> <span className='text-danger'>Forgot password ! </span> <button onClick={() => setShow(!show)} className='btn btn-sm btn-outline-success'>Reset password</button></h6>
      }
      {/* foraget password */}

      <ins className='create-account-btn'>
        <h6 onClick={handleFormChange} className='text-center mt-4'>
          {
            isLogin ? "log-in now" : "Create a new Account"
          }
        </h6>
      </ins>
      {/* reset password modal */}
         {
           show && <ResetPassword
           show={setShow}
           />
         }
      {/* reset password modal */}
      
    </form>
  )
}

export default UserLogin