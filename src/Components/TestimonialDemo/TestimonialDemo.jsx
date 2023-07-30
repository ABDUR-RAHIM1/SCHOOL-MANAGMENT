import React, { useState } from 'react'
import { AiFillDelete } from "react-icons/ai" 

function TestimonialDemo(props) {
    const { _id, name, image, review } = props.testi;
    const txt = 50;
    const [details , setDetails] = useState(false)
    console.log(details)
    return (
        <div className='testiDemoAdmin testi-animation'>
            <div className="testiDeleteBtn">
                <AiFillDelete onClick={()=>props.handleDeletTesti(_id)} className='stAdminIcon text-danger' /> 
            </div>
            <img title='Click Me' onClick={()=>setDetails(!details)} src={image} alt="" />
            <p>{name}</p>
            <p>{details ? review: review.slice(0, txt)} </p>
        </div>
    )
}

export default TestimonialDemo