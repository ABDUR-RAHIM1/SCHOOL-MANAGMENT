import React, { useState } from 'react'
import Spinner from '../Spinner/Spinner'
import "./GiveReview.css"
import Notification from '../../Utilities/Notification'
function GiveReview() {
    const [message , setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [imageLoading , setImgLoading] = useState(false)
    const [testimonialText, setTestimonialText] = useState({
        name: "",
        profession: "",
        review: "",
        image: ""
      })
     const handellogoChange = async (e, inputType) => { 
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
          setTestimonialText((preTest) => ({
            ...preTest,
            image: data.secure_url
          }))
        
        setImgLoading(false)
      };
    
    const handleTesti =(e)=>{
        setTestimonialText({...testimonialText,[e.target.name] :e.target.value })
    }
    const handleTestimonialAdd =(e)=>{
        setLoading(true)
        e.preventDefault()
        fetch("http://localhost:8000/api/settings/testimonial", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(testimonialText)
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            setLoading(false)
            data.error ? setMessage(data.error) : setMessage(data.message)
          }).catch(err => {
            setMessage("failed to fatch data")
          })
    }

    console.log(testimonialText)
   
  return (
    <div className='giveReviewContainer'>
     {message &&  <Notification message={message}/>}
<form onSubmit={handleTestimonialAdd}>
            <input onChange={handleTesti}
              className='form-control my-3'
              name='name'
              type="text"
              value={testimonialText.name}
              required
              placeholder='Name'
            />
            <input onChange={handleTesti}
              className='form-control my-3'
              name='profession'
              type="text"
              value={testimonialText.profession}
              required
              placeholder='profession'
            />
            <textarea onChange={handleTesti}
              className='form-control my-3'
              name='review'
              type="text"
              value={testimonialText.review}
              required
              placeholder='testimonial description'
            />
            {!imageLoading ?
              <input onChange={handellogoChange} name='heroImage' className='form-control' type="file" /> :
              <div className='mt-4 laodingDiv'> <Spinner /> <span>Image Uploading . . . </span></div>
            }
            <button className='btn btn-success my-3'>post now</button>
            {
              loading && <Spinner />
            }
          </form>

    </div>
  )
}

export default GiveReview