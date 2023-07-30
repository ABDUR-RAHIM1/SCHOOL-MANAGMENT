import React, { useContext, useEffect, useState } from 'react'
import "./AdminSettings.css"
import Notification from '../../../Utilities/Notification'
import Spinner from '../../Spinner/Spinner'
import { GlobalContext } from '../../../State/State'
import ShowLogo from '../../ShowLogo/ShowLogo'
import TestimonialDemo from '../../TestimonialDemo/TestimonialDemo'

function AdminSettings() {
  const [noticeShow, setNoticeShow] = useState(true)
  const { getLogo } = useContext(GlobalContext)
  const { isDelete, setIsDelete } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [logo, setLogo] = useState("")
  const [imageLoading, setImgLoading] = useState(false)
  const { testimonial } = useContext(GlobalContext)
  console.log(testimonial)
  //  testimonial sldier input handler
  const [testimonialText, setTestimonialText] = useState({
    name: "",
    profession: "",
    review: "",
    image: ""
  })

  //  hero text updated
  const [heroText, setHeroText] = useState({
    title: "",
    desc: "",
    add: "",
    image: '',
  })

  //  set show notice handler 
  useEffect(() => {
    const x = localStorage.setItem("notice", JSON.stringify(noticeShow))
  }, [setNoticeShow])
  useEffect(() => {
    const noticeData = localStorage.getItem('notice');
    if (noticeData) {
      setNoticeShow(JSON.parse(noticeData));
    }
  }, []);

  //  uplado logo 
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
    if (inputType === "logo-img") {
      setLogo(data.secure_url)
    } else if (inputType === "hero-img") {
      setHeroText((preText) => ({
        ...preText,
        image: data.secure_url
      }));
    } else if (inputType === "testi") {
      setTestimonialText((preTest) => ({
        ...preTest,
        image: data.secure_url
      }))
    }
    setImgLoading(false)
  };
  const handleUplaodLogo = (e) => {
    setLoading(true)
    e.preventDefault()
    fetch("http://localhost:8000/api/settings/logo", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ logo })
    }).then(res => res.json())
      .then(data => {
        setLoading(false)
        data.error ? setMessage(data.error) : setMessage(data.message)
        setTimeout(() => {
          setMessage("")
        }, 2000);
      })
  }

  const handleLogoDelete = (id) => {
    fetch(`http://localhost:8000/api/settings/logo/${id}`, {
      method: "DELETE"
    }).then(res => res.json())
      .then(data => {
        setMessage(data.message)
        setIsDelete(!isDelete)
        setTimeout(() => {
          setMessage("")
        }, 2000);
      })
  }

  //  hero content changer
  const handleHeroChange = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setHeroText({ ...heroText, [name]: value })
  }

  // fetcch hero data
  useEffect(() => {
    fetch("http://localhost:8000/api/settings/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data.hero && data.hero.length > 0) {
          // Set the heroText state only if data.hero is not empty
          setHeroText(data.hero[0]);
        }
      });
  }, []);


  //  add hero content 
  const handleAddHero = (e) => {
    setLoading(true)
    e.preventDefault();
    fetch(`http://localhost:8000/api/settings/hero/${heroText._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(heroText)
    }).then(res => res.json())
      .then(data => {
        setLoading(false)
        setMessage(data.message)

      })
  }

  //  handle testumonial delete 
  const handleDeletTesti = (id) => {
    console.log("delete", id)
    fetch(`http://localhost:8000/api/settings/testimonial/${id}`, {
      method: "DELETE"
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        setMessage(data.message)
      })
  }

  if (message) {
    setTimeout(() => {
      setMessage("")
    }, 3000);
  }
  return (
    <>
      {
        message && <Notification message={message} />
      }
      <h2 style={{ color: "#09b128" }} className='mb-4 text-center'>Change Your settings</h2>
      <div className='settings'>

        <div className="settings-logo settings-common">
          <h6>Upload logo</h6>

          <form onSubmit={handleUplaodLogo}>
            {!imageLoading ?
              <input onChange={(e) => handellogoChange(e, "logo-img")} name='logo' className='form-control' type="file" /> :
              <div className='mt-4 laodingDiv'> <Spinner /> <span>Image Uploading . . . </span></div>
            }
            <button disabled={imageLoading} className='btn btn-success my-3'>Upload logo</button>
            {loading ? <Spinner /> : ""}
          </form>
          <div className="my-3 flex_box">

            <div className="logoShowContainer">
              {
                getLogo && getLogo.slice().reverse().map(logo => <ShowLogo
                  key={logo._id}
                  logo={logo}
                  handleLogoDelete={handleLogoDelete}
                />)
              }
            </div>
          </div>

        </div>

        {/* hero section */}
        <div className="settings-hero settings-common">
          <div className="hero-header flex_box">
            <h6>Hero Section</h6>
            <button onClick={() => setNoticeShow(!noticeShow)} className='btn btn-sm btn-warning'>Notice {noticeShow ? "hide" : "show"} </button>
          </div>
          <form onSubmit={handleAddHero}>
            <input onChange={handleHeroChange}
              className='form-control my-3'
              type="text"
              name='title'
              value={heroText.title}
              placeholder='Hero Title'
            />
            <textarea onChange={handleHeroChange}
              className='form-control my-3'
              type="text"
              name='desc'
              value={heroText.desc}
              placeholder='Hero Description'
            />
            <input onChange={handleHeroChange}
              className='form-control my-3'
              type="text"
              name='add'
              value={heroText.add}
              placeholder='Advertise'
            />
            {!imageLoading ?
              <input onChange={(e) => handellogoChange(e, "hero-img")} name='heroImage' className='form-control' type="file" /> :
              <div className='mt-4 laodingDiv'> <Spinner /> <span>Image Uploading . . . </span></div>
            }
            <button disabled={imageLoading} className='btn btn-success my-3'>Update</button>
          </form>
          {
            loading ? <Spinner /> : ""
          }
        </div>
        {/* hero section */}

        {/*  testimonial part  */}
        <div className="settings-testimonial settings-common">
          <h6>testimonial</h6>
          <div className="sliderDemo flex_box">

            {
              testimonial.length > 0 ? testimonial.slice().reverse().map(testi => (
                <TestimonialDemo
                  key={testi._id}
                  testi={testi}
                  handleDeletTesti={handleDeletTesti}
                />
              ))
                : <h6 className='text-danger'>Testimonial loading . . .</h6>
            }
          </div>
        </div>
        {/*  slider part  end  */}
      </div>
    </>
  )
}

export default AdminSettings