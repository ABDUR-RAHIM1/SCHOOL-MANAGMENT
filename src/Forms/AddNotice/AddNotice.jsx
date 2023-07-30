import React, { useEffect, useState } from 'react'
import Spinner from "../../Components/Spinner/Spinner"
import FormInput from "../../Utilities/FormInput"
import "./AddNotice.css"
function AddNotice(props) {
    const {noticeId ,  noticeInfo} =props;
    console.log(props)
    const [message , setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [notice, setNotice] = useState({
        title: "",
        desc: ""
    })

    // set update date in inputs
    useEffect(()=>{
         if (noticeId) {
             setNotice(noticeInfo)
         }
    } ,[noticeId, noticeInfo])

    //  handle change  and set input data
    const handleChange = (e) => {
        const value = (e.target.value).toLowerCase()
        setNotice({...notice ,[e.target.name]:value })
    }
    
    //  add notice
    const handleAddNotice =(e)=>{
        e.preventDefault()
        setLoading(true)
        fetch("http://localhost:8000/api/notice",{
            method :"POST",
            headers : {
                "Content-type" :"application/json"
            },
            body : JSON.stringify(notice)
        }).then(res => res.json())
        .then(data => { 
            data.error ? setMessage(data.error) : setMessage(data.message)
            setLoading(false)
        })
    };

    //  update notice
    const handleNoticeEdit =(e)=>{
        e.preventDefault()
        setLoading(true)
        fetch(`http://localhost:8000/api/notice/${noticeId}`,{
            method :"PUT",
            headers : {
                "Content-type" :"application/json"
            },
            body : JSON.stringify(notice)
        }).then(res => res.json())
        .then(data => { 
            data.error ? setMessage(data.error) : setMessage(data.message)
            setLoading(false)
        })
    }
    return (
        <div className='addNotice AddDue'>
            <h5 className='text-light'>{noticeId ? "Edit Notice" : "Upload Notice"}</h5>
            <form onSubmit={noticeId ? handleNoticeEdit : handleAddNotice}>
                <FormInput
                    type="text"
                    name="title"
                    value={notice.title}
                    placeholder="Notice title"
                    required={noticeId  ? "" : "required"}
                    handleChange={handleChange}
                />
                <FormInput
                    type="text"
                    name="desc"
                    value={notice.desc}
                    placeholder="Notice Description"
                    required={noticeId  ? "" : "required"}
                    handleChange={handleChange}
                />
                <button className='button-63 my-3'>{noticeId ? "Update Notice" : "Add Notice"}</button>
                 {
                    loading ? <Spinner/> : (
                        message.includes("successfull") ? <p className='text-light'>{message}</p> :
                        <p className='text-warning'>{message}</p>
                    )
                 }
            </form>
        </div>
    )
}

export default AddNotice