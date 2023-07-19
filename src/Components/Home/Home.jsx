import React from 'react'
import "./Home.css"
import Hero from '../Hero/Hero'
import Testimonial from '../Testimonial/Testimonial'   
function Home() {
  return (
    <div className='homeContainer'>
        <Hero/> 
        <Testimonial/> 
    </div>
  )
}

export default Home