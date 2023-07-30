import React, { useContext, useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Hero.css"
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../State/State';
import HeroText from '../HeroText/HeroText';
function Hero() {
  const { heroContent, setHeroContent } = useContext(GlobalContext)
  useEffect(() => {
    setTimeout(() => {
      AOS.init();
    }, 100);
  }, []);

  // get hero content data 
  useEffect(() => {
    fetch("http://localhost:8000/api/settings/hero")
      .then(res => res.json())
      .then(data => { 
        setHeroContent(data.hero)
      })
  }, [setHeroContent]) 
  return (
    <div className='hero_container flex_box'  >
          
          {
            heroContent && heroContent.map(hero => <HeroText
             key={hero._id}
             hero={hero}
            />)
          }
    </div>
  )
}

export default Hero