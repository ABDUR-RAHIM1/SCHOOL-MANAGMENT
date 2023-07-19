import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MyState } from './State/State'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import Authentication from './Components/Authentication/Authentication/Authentication'
import AdminDashBoard from './Components/AdminDashBoard/AdminDashBoard'

function App() {
    return (
        <MyState>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/auth' element={<Authentication />} />
                    <Route path='/admin-dashboard' element={<AdminDashBoard />} />
                </Routes>

                <Footer/>
            </BrowserRouter>
        </MyState>
    )
}

export default App