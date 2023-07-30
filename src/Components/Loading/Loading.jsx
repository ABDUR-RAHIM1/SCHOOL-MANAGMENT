import React from 'react'
import "./Loading.css"
function Loading() {
  return (
    <div className="loading flex_box">
            <div className="spinner-grow text-success" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
    </div>
  )
}

export default Loading