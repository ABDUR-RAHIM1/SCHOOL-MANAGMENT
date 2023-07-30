import React, { useContext } from 'react'
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { GlobalContext } from '../../../State/State'
import UplaodResult from '../UplaodResult/UplaodResult'
function Result(props) {
    const {studentName,group,category, examTime , score, dateOfPublication, _id } = props.result;

    console.log(category)
    // set component for edit result 
    const {setComponent} = useContext(GlobalContext)
       /// handleUpdate 
       const handelUpdateBtn =(id)=>{
        if (id) {
           setComponent(<UplaodResult
            resultId={id}
            resultInfo = {props.result}
           />)
        }
        
     } 
    return (
        <>
            <tr> <td>{props.index}</td>
                <td>{studentName}</td>
                <td>{category < 10 ? "0"+  category : category || "N/A"}</td>
                <td>{group}</td>
                <td>{examTime}</td>
                <td>{score < 10 ? "0"+ score : score }</td>
                <td>{dateOfPublication}</td>
                <td className='flex_box'>
                    <BiEdit onClick={() => handelUpdateBtn( _id)} className='stAdminIcon resultBtn' />
                    <AiFillDelete onClick={() => props.handleDeleteResult( _id)} className='stAdminIcon resultBtn' />
                </td>
            </tr>
        </>
    )
}

export default Result