import React, { useEffect, useState } from 'react'
import demoImg from "../../image/demo.jpg"
function AdminProfile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("adminInfo");
        if (data) {
            const adminProfile = JSON.parse(data);
            setProfile(adminProfile)
        }
    }, [])
    return (
          <div className="profile">
           <h4 className='text-center my-3'>Your Profile</h4>
                {
                    profile && <div className='admin'>
                         <img src={profile.image || demoImg} alt="" />
                         <p>Name: {profile.name}</p>
                         <p>Email: {profile.email}</p>
                         <small className='text-light p-2 bg-info'>Status : log-in</small>
                    </div>
                }
           </div>
    )
}

export default AdminProfile