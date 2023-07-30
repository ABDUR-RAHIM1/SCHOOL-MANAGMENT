import { createContext, useState } from "react";
import AdminHome from "../Components/Admin/AdminHome/AdminHome";
import demoImg from "../image/demo.jpg"
export const GlobalContext = createContext()

export const MyState = ({ children }) => {
   const [imgLoding, setImgLoading] = useState(false);
   const [addStudent, setAddStudent] = useState({
      name: "", email: "", phone: "", class: "", group: "", session: "", bloodGroup: "", address: "", birthDate: "", guardianName: "", guardianEmail: "", guardianPhone: "", emergencyContact: "", religion: "", photo: ""

   });
   const [student , setStudent] = useState([])
const [addResult , setAddresult] = useState({
    studentName :"",
    group : "",
    score : "",
    category:"",
    examTime : ""
})
const [due ,setDue] = useState([])
const [notice , setNotice] = useState([])
const [getLogo , setGetLogo] = useState([demoImg])
const [heroContent , setHeroContent] = useState([])
const [isDelete, setIsDelete] = useState(false)
const [testimonial, setTestimonial] =useState([])
const [component, setComponent] = useState(<AdminHome />)
//  login 
const [loginInfo , setLoginInfo] = useState({
   name : "",
   email : '',
   password : "",
   image : ""
})
const [admin , setAdmin] = useState({})
   const value = {
      imgLoding, setImgLoading, 
      addStudent, setAddStudent,
      student , setStudent,
      addResult , setAddresult, 
      component, setComponent,
      due ,setDue,
      notice , setNotice,
      //  settings part
      isDelete, setIsDelete,
      getLogo , setGetLogo,
      heroContent , setHeroContent,
      testimonial, setTestimonial,
      //  login 
      loginInfo , setLoginInfo ,
      admin , setAdmin, 
   }

   return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}