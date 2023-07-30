import React, { useEffect, useState } from 'react'
import "./AddDue.css"
import FormInput from '../../../Utilities/FormInput'
import Spinner from '../../Spinner/Spinner'
function AddDue(props) {
    const {dueInfo , dueId} = props
    console.log(dueId , dueInfo)

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [deueValue, setDueValue] = useState({
        studentName: "",
        studentClass: "",
        itemName: "",
        itemPrice: "",
        itemQuntity: ""
    })
    useEffect(() => {
        if (dueId) {
          setDueValue(dueInfo);
        }
      }, [dueId, dueInfo]);
 
    const handleDueChange = (e) => {
        const value = (e.target.value).toLowerCase()
        setDueValue({ ...deueValue, [e.target.name]: value })
    }
    const handleDueSAdd = (e) => {
        setLoading(true)
        e.preventDefault()
        fetch("http://localhost:8000/api/due", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(deueValue)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setLoading(false)
                setMessage(data.message)
                setTimeout(() => {
                    setMessage("")
                }, 3000);
            })
            console.log(deueValue)
    }
    const handleUpdateDue = (e)=>{
        setLoading(true)
        e.preventDefault()
        fetch(`http://localhost:8000/api/due/${dueId}`, {
            method :"PUT",
            headers : {
                "content-type" :"application/json"
            },
            body: JSON.stringify(deueValue)
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            setLoading(false)
            setMessage(data.message)
        })
    }
    return (
        <div className='AddDue'>
      
            <form onSubmit={dueId ? handleUpdateDue : handleDueSAdd}>
                <h5 className='text-center my-3 text-light'>
                    {dueId ? "Edit Due" : "Add Due"}
                </h5>
                <FormInput
                    type="text"
                    name="studentName"
                    value={deueValue.studentName}
                    placeholder="Student Name"
                    required={dueId ? "" : "required"}
                    handleChange={handleDueChange}
                />
                <FormInput
                    type="text"
                    name="studentClass"
                    value={deueValue.studentClass}
                    placeholder="Class ?"
                    required={dueId ? "" : "required"}
                    handleChange={handleDueChange}
                />
                <FormInput
                    type="text"
                    name="itemName"
                    value={deueValue.itemName}
                    placeholder="Name of items . pen, book, chalk"
                    required={dueId ? "" : "required"}
                    handleChange={handleDueChange}
                />
                <FormInput
                    type="number"
                    name="itemPrice"
                    value={deueValue.itemPrice}
                    placeholder="Price of items 1,2,3"
                    required={dueId ? "" : "required"}
                    handleChange={handleDueChange}
                />
                <FormInput
                    type="number"
                    name="itemQuntity"
                    value={deueValue.itemQuntity}
                    placeholder="Quantity of items 1,2,3"
                    required={dueId ? "" : "required"}
                    handleChange={handleDueChange}
                />
                <button className='button-63 my-3'>
                    {dueId ? "Update Due" : "Add Due"}
                </button>
            </form>
            {loading && <Spinner />}

            {
                message && !loading ? <h6 className='text-light text-uppercase'>{message}</h6> : ""
            }
        </div>
    )
}

export default AddDue