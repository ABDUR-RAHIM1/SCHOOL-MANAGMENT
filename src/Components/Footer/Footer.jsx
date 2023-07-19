import React from 'react'
import "./Footer.css"
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs"
import { Link, useLocation } from 'react-router-dom'
function Footer() {
    const location = useLocation().pathname
    return (
        <div className='footer'>
            <div className="footer_first flex_box">
                <div className="Footerlogo">
                    <h1>logo</h1>
                </div>
                <div className="footer_nav">
                    <Link className={location === "/" ? "navItem active" : "navItem"} as={Link} to="/" >Home</Link>
                    <Link className={location === "/about-us" ? "navItem active" : "navItem"} as={Link} to="/about-us" >about us</Link>
                    <Link className={location === "/teachers" ? "navItem active" : "navItem"} as={Link} to="/teachers" >Teachers</Link>
                    <Link className={location === "/Students" ? "navItem active" : "navItem"} as={Link} to="/Students" >Students</Link>
                    <Link className={location === "/Students" ? "navItem active" : "navItem"} as={Link} to="/Students" >Classes</Link>
                    <Link className={location === "/Students" ? "navItem active" : "navItem"} as={Link} to="/Students" >programs</Link>

                </div>
            </div>
            <div className="footer_middle flex_box py-4">
                <div className="footer_icons">
                    <h4>social networks</h4>
                    <div className="icons mt-3">
                        <BsFacebook className='fIcon' />
                        <BsInstagram className='fIcon' />
                        <BsTwitter className='fIcon' />
                        <BsLinkedin className='fIcon' />
                    </div>
                </div> 
                    <form className="footer_newsletter">
                        <input className='form-control' type="eamail" placeholder='Your Email' required />
                        <input className='btn btn-success' type="submit" value="subscribe" />
                    </form> 
            </div>
            <div className="footer_last flex_box mt-4 text-light">
                <p>All Rigth reserved By Abdur rahim</p>
                <p>Created Date : 16-07-2023 </p>
            </div>
        </div>
    )
}

export default Footer