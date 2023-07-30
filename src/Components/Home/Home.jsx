import React from 'react'
import "./Home.css"
import Hero from '../Hero/Hero'   
import Review from '../Review/Review'
import GiveReview from '../GiveReview/GiveReview'
function Home() {
  return (
    <div className='homeContainer'>
        <Hero/> 
        <Review/> 
        <GiveReview/> 
    </div>
  )
}

export default Home