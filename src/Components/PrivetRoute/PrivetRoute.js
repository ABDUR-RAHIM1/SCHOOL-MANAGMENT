import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivetRoute({children}) {
    const data = localStorage.getItem("adminInfo")
    const admin = JSON.parse(data) 
    return admin && admin.email ? children : <Navigate to="/auth" />
}

export default PrivetRoute
 
 