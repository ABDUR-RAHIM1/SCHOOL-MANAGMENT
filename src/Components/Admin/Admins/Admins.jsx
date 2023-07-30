import React, { useEffect, useState } from 'react'
import Loading from "../../Loading/Loading"
import Notification from "../../../Utilities/Notification"
import "./Admins.css"
import Admin from './Admin';
import demoImg from "../../../image/demo.jpg"
import Checkbox from '../../Checkbox/Checkbox';
function Admins() {
    const [message , setMessage] =useState("")
    const [isDelete, setIsDelete] = useState(false)
    const [check, setCheck] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [admin, setAdmin] = useState([]);
    useEffect(() => {
       !isDelete && setIsLoading(true)
        fetch("http://localhost:8000/api/admin")
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                setAdmin(data);
            });
    }, [isDelete])

    const handleDeleteAdmin = (id)=>{
        fetch(`http://localhost:8000/api/admin/${id}`,{
             method : "DELETE"
        }).then(res => res.json())
        .then(data => {
            setMessage(data.message)
            setIsDelete(!isDelete)
        })
    }
    if (isLoading) {
        return <Loading />
    } 
   
    return (
        <>
        {
            message && <Notification message={message}/>
        }
    
            <div className="admins-header flex_box">
            <h2 className='text-center my-3'>List Of Admins</h2>
            <Checkbox handleCheck={()=>setCheck(!check)}/>
            </div>
            <div className='adminsContainer flex_box'>
                  {
                    admin && admin.slice().reverse().map(admin => (
                        <Admin
                         key={admin._id}
                         check={check}
                         handleDeleteAdmin={handleDeleteAdmin}
                         admin={admin}
                        />
                    ))
                  }
            </div>
        </>
    )
}

export default Admins