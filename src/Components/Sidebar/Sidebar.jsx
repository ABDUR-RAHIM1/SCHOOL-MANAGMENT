import React from 'react'
import "./SideBar.css"
function Sidebar(props) {
    return (
        <div onClick={props.handleDashBtnClick}>
            <button  className={props.btnClass}>
                <span className={props.iconClass}>{props.icon}</span>
                {props.btnText}
            </button>
        </div>
    )
}

export default Sidebar