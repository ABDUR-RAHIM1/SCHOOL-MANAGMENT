import React, { useContext, useEffect, useRef, useState } from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import img from '../../image/demo.jpg'
// Import Swiper styles
import 'swiper/css';
import "./Styles.css"
import "./Review.css"
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Autoplay, Pagination,Navigation } from 'swiper/modules';
import { GlobalContext } from '../../State/State';
export default function Review() {
    const { testimonial, setTestimonial } = useContext(GlobalContext)
    useEffect(() => {
        fetch("http://localhost:8000/api/settings/testimonial")
            .then(res => res.json())
            .then(data => {
                setTestimonial(data)
            })
    }, [setTestimonial])
    return (
        <div className='reviewContainer'>
            <h1 className='text-center my-4'>Parent's Perspective on Our School</h1>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    testimonial.length > 0 && testimonial.map(testi => {
                        return (
                            <>
                                <SwiperSlide className='slider' key={testi._id}>
                                    <img src={testi.image || img} alt="" />
                                   <div className="testHeader">
                                   <h6>{testi.name || "no name"}</h6>
                                   <p>{testi.profession}</p>
                                   <div className="testiBody">
                                       <p> <q> {testi.review.length > 150 ? testi.review.slice(0,150)+". . .": testi.review}</q></p>
                                   </div>
                                   </div>
                                </SwiperSlide>
                            </>
                        )
                    })
                }
            </Swiper>
        </div>
    );
}
