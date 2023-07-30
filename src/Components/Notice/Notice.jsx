import React from 'react'
import { Link } from "react-router-dom"
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"

function Notice(props) {
    const { _id, title, desc, publishedAt } = props.notice;

    return (
        <div className='notice  flex_box'>
            
            <div className="notice-content">
                <Link onClick={() => props.handleDetails(props.notice)}>
                    <h4>{title.length > 30 ? title.slice(0, 30) : title}</h4>
                </Link>
                <p>{desc.length > 150 ? desc.slice(0, 150) + ". . ." : desc}</p>
                <small>{publishedAt}</small>
            </div>
            <div className="notice-btn flex_box">
                <BiEdit onClick={()=>props.handleEditNotice(_id, props.notice)} className='stAdminIcon resultBtn' />
                <AiFillDelete onClick={() => props.handleNoticeDelete(_id)} className='stAdminIcon resultBtn' />
            </div>
        </div>
    )
}

export default Notice