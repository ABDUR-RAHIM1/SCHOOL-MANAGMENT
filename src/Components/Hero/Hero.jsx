import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

import hero_img from "../../image/hero_img.svg"
import "./Hero.css"
import { Link } from 'react-router-dom'
function Hero() {
  useEffect(() => {
    setTimeout(() => {
      AOS.init();
    }, 100);
  }, []);
  return (
    <div className='hero_container flex_box' 
    data-aos="fade-right"
    data-aos-duration="1500" >
      <div className="hero_text">
        <h1>welcome to our school </h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque illum natus culpa eos reiciendis fugiat illo hic labore odio veritatis, quisquam eveniet eius ipsum? Quis itaque distinctio consectetur porro minima nemo, maxime alias vero tempore ex, illum quibusdam voluptatem facilis nesciunt deserunt possimus aut deleniti ullam! Error iste cupiditate quaerat praesentium ipsam? Sit, deserunt nam repellendus sunt perspiciatis perferendis, dignissimos eos totam atque vitae aspernatur et deleniti obcaecati quod vero eveniet labore fugita eius ab quaerat at! Velit, fugiat odio, dicta excepturi labore deserunt possimus tempora, iste minus earum eligendi voluptas ipsum repellat eveniet ullam veniam cumque sunt mollitia esse corrupti! Voluptate, numquam quasi! Asperiores sunt accusamus quasi recusandae eveniet natus? Iste eum illo asperiores quas quia doloremque eaque dolor voluptatum consectetur molestias, architecto magnam corrupti.</p>
        <Link to="/about-us">
          <button className='my_btn'>Learn more</button>
        </Link>
      </div>
      <div className="hero_image" 
    data-aos="fade-left"
    data-aos-duration="1500" >
        <img src={hero_img} alt="" />
      </div>
    </div>
  )
}

export default Hero