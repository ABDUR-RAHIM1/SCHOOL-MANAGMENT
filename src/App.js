import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { GlobalContext, MyState } from './State/State'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import Authentication from './Components/Authentication/Authentication/Authentication'
import AdminDashBoard from './Components/AdminDashBoard/AdminDashBoard'
import UserDashboard from './Components/UserDashboard/UserDashboard' 
import PrivetRoute from './Components/PrivetRoute/PrivetRoute' 

function App() {
    return (
        <MyState>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/auth' element={<Authentication />} />
                    <Route path='/admin-dashboard' element={<PrivetRoute>
                        <AdminDashBoard />
                    </PrivetRoute>} />
                    <Route path='/user-dashboard' element={<UserProtected>
                         <UserDashboard/>
                    </UserProtected>} /> 
                </Routes>

                <Footer/>
            </BrowserRouter>
        </MyState>
    )
}

export default App

const UserProtected = ({children})=>{
    const data = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(data)
    console.log(userInfo)
     return userInfo && userInfo.email ? children : <Navigate  to="/auth"/>
}