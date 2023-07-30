import React, { useContext, useEffect, useState } from 'react'
import "./UplaodResult.css"
import FormInput from '../../../Utilities/FormInput'
import { GlobalContext } from '../../../State/State'
import Spinner from '../../Spinner/Spinner'
function UplaodResult(props) {
    console.log(props)
    const { resultId, resultInfo } = props;

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const { addResult, setAddresult } = useContext(GlobalContext)
    const handleResultChange = (e) => {
        const value = (e.target.value).toLowerCase()
        setAddresult({ ...addResult, [e.target.name]: value })
    }
    console.log(addResult)

    useEffect(() => {
        if (resultId && resultInfo) {
            setAddresult(resultInfo)
        }
    }, [])

    const handleAddResult = (e) => {
        setLoading(true)
        e.preventDefault();
        fetch("http://localhost:8000/api/result", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(addResult)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setLoading(false)
                setMessage(data.message)
                setTimeout(() => {
                    setMessage("")
                }, 4000);
            })
    }
    const handleEditResult = (e) => {
        setLoading(true)
        e.preventDefault()
        fetch(`http://localhost:8000/api/result/${resultId}`, {
            method: "PUT",
            headers: {
                "COntent-type": "application/json"
            },
            body: JSON.stringify(addResult)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setMessage(data.message)
                setLoading(false)
            })
    };

    return (
        <div className='uplaodResult row'>
            <div className="col-lg-6 text-right">
                <form onSubmit={resultId ? handleEditResult : handleAddResult}>
                    <h3>{resultId ? "Edit Result" : "Upload Result"} </h3>
                    <FormInput
                        type="text"
                        placeholder="Student Name"
                        name="studentName"
                        value={addResult.studentName}
                        required={resultId ? "" : "required"}
                        handleChange={handleResultChange}
                    />
                    <FormInput
                        type="text"
                        placeholder="Student Group"
                        name="group"
                        value={addResult.group}
                        required={resultId ? "" : "required"}
                        handleChange={handleResultChange}
                    />
                    <FormInput
                        type="number"
                        placeholder="Class ?"
                        name="category"
                        value={addResult.category}
                        required={resultId ? "" : "required"}
                        handleChange={handleResultChange}
                    />
                    <FormInput
                        type="number"
                        placeholder="Student Marks"
                        name="score"
                        value={addResult.score}
                        required={resultId ? "" : "required"}
                        handleChange={handleResultChange}
                    />
                    <FormInput
                        type="text"
                        placeholder="Exam Time"
                        name="examTime"
                        value={addResult.examTime}
                        required={resultId ? "" : "required"}
                        handleChange={handleResultChange}
                    />
                    <button className='button-63 my-3'> {resultId ? "Update" : "Publish"} Result</button>
                </form>
            </div>
            {
                loading ? <Spinner /> : (message ? (
                    message.includes("successful") ? (
                        <h6 className='text-success'>{message}</h6>
                    ) : (
                        <h6 className='text-danger'>{message}</h6>
                    )
                ) : null)
            }


        </div>
    )
}

export default UplaodResult