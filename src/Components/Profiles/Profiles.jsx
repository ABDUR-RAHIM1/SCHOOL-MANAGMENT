import React, { useEffect, useState } from 'react'
import "./Profiles.css"
import {BiEdit} from "react-icons/bi"
import demoImg from "../../image/demo.jpg"
import Loading from '../Loading/Loading'
function Profiles() {
    const [isLoading , setIsLaoding] = useState(false)
    const [profile, setProfile] = useState({});
    useEffect(() => {
        setIsLaoding(true)
        const data = localStorage.getItem("userInfo");
        if (data) {
            const userInfo = JSON.parse(data);
            setProfile(userInfo)
            setIsLaoding(false)
        }
    }, [])
    if (isLoading) {
         return <Loading/>
    }
    return (
        <div className='profile'>
            <div className="student-profile">
                <img src={profile.image || demoImg} alt="" />
                <h5>Name :  {profile.name}</h5>
                <p>Email :  {profile.email}</p>
                <button type="button" className="btn btn-primary">
                  Status <span className="badge badge-dark bg-dark">log-in</span>
                </button>
            </div>
        </div>
    )
}

export default Profiles