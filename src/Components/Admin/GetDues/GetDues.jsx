import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../State/State'
import Due from './Due'
import Loading from '../../Loading/Loading'
import Checkbox from '../../Checkbox/Checkbox'

function GetDues() {
    const [check , setChack] = useState(false)
    const [search, setSearch] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const { due, setDue } = useContext(GlobalContext)
    
    const handleDeleteDue = (id) => {
        fetch(`http://localhost:8000/api/due/${id}`, {
            method: "DELETE",
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setMessage(data.message)
                setIsDelete(prev => !prev);
            })
    }
    useEffect(() => {
        if (isDelete || search) {
            setLoading(false)
        } else {
            setLoading(true)
        }
        fetch("http://localhost:8000/api/due?search=" + search)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDue(data.dueAmmount)
                setLoading(false)
            })
    }, [isDelete, search]);


    const handleSearch = (e) => {
        const value = (e.target.value).toLowerCase()
        setSearch(value)
    }

    if (loading) {
        return <Loading />
    }
   console.log(check)
    return (
        <div className='getDuesContainer'>
            <div className="checbox-container">
                <Checkbox handleCheck={()=>setChack(!check)} />
            </div>
            <div className="searchBar">
                <input onChange={handleSearch} placeholder='find due' type="text" className='form-control my-3' />
            </div>
            {
                due.length <= 0 && <h2 className='mt-4'>Opps ! <span className='text-warning '>{search}</span> Not found</h2>
            }
            <table className='table'>
                {due.length > 0 && <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Class Name </th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Item Quantity</th>
                        <th>Total Due</th>
                       {check && <th>Edit/Delete</th>}
                    </tr>
                </thead>}
                {
                    Object.keys(due).length !== 0 && due.map(due => <Due
                        key={due._id}
                        due={due}
                        check={check}
                        handleDeleteDue={handleDeleteDue}
                    />)

                }
            </table>

        </div>
    )
}

export default GetDues