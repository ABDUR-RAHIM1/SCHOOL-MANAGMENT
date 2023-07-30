import "./GetNotice.css"
import React, { useContext, useEffect, useState } from 'react'
import Notification from "../../../Utilities/Notification"
import Loading from "../../Loading/Loading"
import { GlobalContext } from '../../../State/State'
import Notice from '../../Notice/Notice'
import AddNotice from "../../../Forms/AddNotice/AddNotice"
function GetNotice() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [noticeDetails, setNoticeDetails] = useState([])
  const { notice, setNotice } = useContext(GlobalContext)
//   set component state
const { component, setComponent} = useContext(GlobalContext)
  // handle delete notice
  const handleNoticeDelete = (id) => { 
    fetch(`http://localhost:8000/api/notice/${id}`, {
      method: "DELETE"
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        setMessage(data.message)
        setIsDelete(!isDelete)
      })
  };

  //  handle edit 
  const handleEditNotice =(noticeId, noticeInfo )=>{
      console.log(noticeId, noticeInfo)
      if (noticeId && noticeInfo) {
         setComponent(<AddNotice
           noticeId={noticeId}
           noticeInfo={noticeInfo}
         />)
      }
  };

  useEffect(() => {
      isDelete || message ? setLoading(false) : setLoading(true)
    fetch("http://localhost:8000/api/notice")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setNotice(data)
        setLoading(false)
      })
  }, [isDelete]); 

  //   notice details handler 
  const handleDetails = (noticeDetails) => {
    setNoticeDetails(noticeDetails)
  };

  if (loading) {
      return <Loading/>
  } ;
  return (
    <>
      {message && <Notification
        message={message}
      />}
      <div className={noticeDetails._id ? 'get-notice-container hide' : 'get-notice-container show'}>
        <h1 style={{color:"#09b128"}} className='text-center my-3'>Notice Board</h1>
        {
          notice && notice.slice().reverse().map(notice => <Notice
            key={notice._id}
            notice={notice}
            handleEditNotice={handleEditNotice}
            handleNoticeDelete={handleNoticeDelete}
            handleDetails={handleDetails}
          />)
        }
      </div>
      <div className={noticeDetails._id ? "detaailsArea show" : "detaailsArea hide"}>
        <button onClick={() => setNoticeDetails({})} className='btn btn-sm btn-danger my-3'>Close it</button>
        <h3 className='mb-4'>subject : {noticeDetails.title}</h3>
        <p>{noticeDetails.desc}</p>

        <div className="details-footer">
          <h5>director</h5>
          <p>Madrsha name : aliya madrasha </p>
          <p>Date : {noticeDetails.publishedAt}</p>
        </div>
      </div>
    </>
  )
}

export default GetNotice