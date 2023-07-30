import React, { useEffect, useState } from 'react'
import hero_img from "../../image/hero_img.svg"
import { Link } from 'react-router-dom'
function HeroText(props) {
    const [noticeData , setNoticeShow] = useState()
    const {title , desc , add ,image} = props.hero;
    useEffect(() => {
        const noticeData = localStorage.getItem('notice');
        if (noticeData) {
          setNoticeShow(JSON.parse(noticeData));
        }
      }, []);
    return (
        <>
            <div className="hero_text">
                <h1>{title} </h1>
                <p>{desc}</p>
                <Link to="/about-us">
                    <button className='my_btn'>Learn more</button>
                </Link>
               {noticeData && <div className="hero-add">
                    <marquee><h5>{add}</h5></marquee>
                </div>}
            </div>
            <div className="hero_image" >
                <img src={image || hero_img} alt="" />
            </div>
        </>
    )
}

export default HeroText