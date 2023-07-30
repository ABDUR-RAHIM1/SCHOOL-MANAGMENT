import React, { useContext } from 'react'
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import "./GetDues.css"
import { GlobalContext } from '../../../State/State'
import AddDue from '../AddDue/AddDue'
function Due(props) {
    const { _id, studentName, studentClass, itemName, itemPrice, itemQuntity } = props.due
    let totalPrice = 0

    const { setComponent } = useContext(GlobalContext)
    const handleEditDue = (id) => {
        if (id) return setComponent(<AddDue
            dueId={id}
            dueInfo={props.due}
        />)
    }
    //  
    const handleClick = (price , quantity)=>{
        const newPrice = Number(price);
        const qq = Number(quantity)
        console.log(price ,"nn"+ qq)
    }
    return (
        <>

            <tbody>
                <tr>
                    <td>{studentName}</td>
                    <td>{studentClass}</td>
                    <td>{itemName.map(itName => itName)}</td>
                    <td>{itemPrice.map(itPrice => itPrice) + " - tk"}</td>
                    <td>{itemQuntity.map(itQn => itQn)}</td>
                    <td>{totalPrice || 0}</td>
                    {props.check && <td className='flex_box'>
                        <BiEdit onClick={() => handleEditDue(_id)} className='stAdminIcon resultBtn' />
                        <AiFillDelete onClick={() => props.handleDeleteDue(_id)} className='stAdminIcon resultBtn' />
                    </td>}
                    <button onClick={()=>handleClick(itemPrice, itemQuntity)}>click</button>
                </tr>
            </tbody>

        </>
    )
}

export default Due