import React, { useContext, useEffect, useState } from 'react'
import Loading from "../../Loading/Loading"
import Notification from "../../../Utilities/Notification"
import "./ViewResults.css" 
import Result from '../Result/Result'
function ViewResults() { 
    const [message , setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [ isDelete , setIsDelete] =  useState(false)
    const [sort, setSort] = useState("")
    const [result, setResult] = useState([])

    useEffect(() => {
         sort || message ?  setLoading(false) : setLoading(true)
        fetch("http://localhost:8000/api/result?search=" + sort)
            .then(res => res.json())
            .then(data => {
                setResult(data.result)
                setLoading(false)
            })
    }, [sort, isDelete])


    // delete result 

    const handleDeleteResult = (id)=>{ 
         fetch(`http://localhost:8000/api/result/${id}`, {
            method : "DELETE"
         }).then(res => res.json())
         .then(data => { 
            setMessage(data.message)
            setIsDelete(!isDelete)
            setTimeout(() => {
                setMessage("")
            }, 3000);
         })
    } 

  

    const handleMonthChange = (e) => {
        const value = (e.target.value).toLowerCase()
        setSort(value)
    }
    if (loading) {
        return <Loading />
    }
    return (
        <div className='results'>

            {
                 message && <Notification message={message}/>
            }
           
            <select onChange={handleMonthChange} >
                <option value={sort}>Select Month</option>
                <option >January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
            </select> 

            <table className='table table-striped mt-3 table-hover table-responsive'>
                {!result.length <= 0 && <thead className='table-danger bordered'>
                    <tr>
                        <th>#No</th>
                        <th>Name</th>
                        <th>class</th>
                        <th>Group</th>
                        <th>exam Date</th>
                        <th>Marks</th>
                        <th>Published</th>
                        <th>Update/delete</th>
                    </tr>
                </thead>}
                <tbody>
                    {
                        result.map((result, index) => <Result 
                            key={result._id}
                            result={result}
                            index={index+1}
                            handleDeleteResult={handleDeleteResult}
                            />)
                    }
                </tbody>
            </table>
            {
                result.length <= 0 && <h3 className='mt-4'>No result found of <span className='text-warning'> {sort}</span> Month</h3>
            }
        </div>
    )
}

export default ViewResults