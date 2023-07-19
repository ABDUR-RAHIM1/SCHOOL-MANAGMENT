import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img from "../../image/hero.png"
import "./Testimonial.css"
import testimonialdata from "../../Data/Testimonial.json"
import AOS from 'aos'
import 'aos/dist/aos.css';

function Testimonial() {
  
  useEffect(() => {
    AOS.init();
  }, [])
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="testimonial" 
    data-aos="fade-left"
    data-aos-duration="1500" >
      <h1>Parent Review</h1>
      <div className="sliderWrap">
      <div className="testSlider">
        <Carousel activeIndex={index} onSelect={handleSelect}>
        {
          testimonialdata.map(data => {
            return (
                <Carousel.Item className='caruselItems'>
                  <img className='slidImg' src={data.image} alt="" />
                    <h4>{data.name} </h4>
                    <p className='occupation'>{data.occupation} </p>
                    <p>{data.testimonial}</p>
                </Carousel.Item>
            )
          })
        }
        </Carousel>
        </div>
      </div>
    </div >
  );
}

export default Testimonial;