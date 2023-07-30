import React, { useContext, useEffect, useState } from 'react'
import FormInput from '../../Utilities/FormInput'
import "./AddStudent.css"
import { GlobalContext } from '../../State/State'
import Spinner from '../../Components/Spinner/Spinner'

function AddStudent(props) {
    const { editStudentId, studentData } = props 
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [imgLoding, setImgLoading] = useState(false)
    const { addStudent, setAddStudent } = useContext(GlobalContext)

    useEffect(() => {
        if (editStudentId) {
            setAddStudent(studentData);
        }
    }, [studentData, editStudentId]); 
    
    const handelImageChange = async (e) => {
        setImgLoading(true)
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "demo-image");
        formData.append("cloud_name", "dsrkrb3jy");
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dsrkrb3jy/image/upload",
            {
                method: "POST",
                body: formData,
            })
        const data = await res.json()
        setAddStudent((prevItem) => ({
            ...prevItem,
            photo: data.url
        }))
        setImgLoading(false)
    }

    const handleAddStudentChange = (e) => {
        const value = (e.target.value.toLowerCase())
        setAddStudent((prevStudent) => ({
            ...prevStudent,
            [e.target.name]:value,
        }));
    };
    const handleAddStudentSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const resposne = await fetch("http://localhost:8000/api/student", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(addStudent)
        })
        const data = await resposne.json()
        setLoading(false)
        setMessage(data.message)
    }

    // handle update student 
    const handleUpdateStudent = (e) => {
        e.preventDefault()
        setLoading(true)
        fetch(`http://localhost:8000/api/student/${editStudentId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(addStudent)
        }).then(res => res.json())
            .then(data => { 
                setLoading(false)
                setMessage(data.message)
            })
    }

    return (
        <div className='add-student-form'>
            <form onSubmit={editStudentId ? handleUpdateStudent : handleAddStudentSubmit}>
                <legend>{editStudentId ? "Update Student form" : "Student form"}</legend>
                <fieldset>
                    <div className="row">
                        <div className="col-md-6">
                            <FormInput
                                type="text"
                                name="name"
                                placeholder="Student Name"
                                required={editStudentId ? "" : "required"}
                                value={addStudent.name}
                                handleChange={handleAddStudentChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                type="email"
                                name="email"
                                placeholder="Student Email"
                                required={editStudentId ? "" : "required"}
                                value={addStudent.email}
                                handleChange={handleAddStudentChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                type="number"
                                name="phone"
                                placeholder="Student Phone"
                                required={editStudentId ? "" : "required"}
                                value={addStudent.phone}
                                handleChange={handleAddStudentChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                type="number"
                                name="roll"
                                placeholder="Student Roll"
                                required={editStudentId ? "" : "required"}
                                value={addStudent.roll}
                                handleChange={handleAddStudentChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormInput
                                type="text"
                                name="class"
                                placeholder="Class"
                                required={editStudentId ? "" : "required"}
                                value={addStudent.class}
                                handleChange={handleAddStudentChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormInput
                                type="text"
                                name="group"
                                placeholder="Group Name"
                                required={editStudentId ? "" : "required"}
                                value={addStudent.group}
                                handleChange={handleAddStudentChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                type="text"
                                name="session"
                                placeholder="session"
                                required={editStudentId ? "" : "required"}
                                value={addStudent.session}
                                handleChange={handleAddStudentChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                type="text"
                                name="bloodGroup"
                                placeholder="Blood Group"
                                value={addStudent.bloodGroup}
                                handleChange={handleAddStudentChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormInput
                                type="text"
                                name="address"
                                placeholder="Address"
                                required={editStudentId ? "" : "required"}
                                value={addStudent.address}
                                handleChange={handleAddStudentChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormInput
                                type="date"
                                name="birthDate"
                                placeholder="Birth Date"
                                required={editStudentId ? "" : "required"}
                                min="2010-01-01"
                                value={addStudent.birthDate}
                                handleChange={handleAddStudentChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                type="text"
                                name="guardianName"
                                placeholder="Guardian Name"
                                required={editStudentId ? "" : "required"}
                                value={addStudent.guardianName}
                                handleChange={handleAddStudentChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                type="email"
                                name="guardianEmail"
                                placeholder="Guardian Email"
                                value={addStudent.guardianEmail}
                                handleChange={handleAddStudentChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                type="number"
                                name="guardianPhone"
                                placeholder="Guardian Phone"
                                value={addStudent.guardianPhone}
                                handleChange={handleAddStudentChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                type="number"
                                name="emergencyContact"
                                placeholder="Emergency Contact"
                                required={editStudentId ? "" : "required"}
                                value={addStudent.emergencyContact}
                                handleChange={handleAddStudentChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                type="text"
                                name="religion"
                                placeholder="religion"
                                required={editStudentId ? "" : "required"}
                                value={addStudent.religion}
                                handleChange={handleAddStudentChange}
                            />
                        </div>
                        <div className="col-md-6">
                            {!imgLoding ? <FormInput
                                type="file"
                                name="photo"
                                placeholder="Proifle picture" 
                                handelImageChange={handelImageChange}
                            /> : <div className='mt-4 laodingDiv'> <Spinner /> <span>Image Uploading . . . </span></div>}
                        </div>
                    </div>
                    {
                        editStudentId ?
                            <button disabled={imgLoding === true} type='submit' className="button-63 my-3">Update</button>
                            : <button disabled={imgLoding === true} type='submit' className="button-63 my-3">Add Student</button>
                    }
                </fieldset>
            </form>
            <div className="text-center">
                {
                    loading ? <Spinner /> : <span className='fw-bold'>{message}</span>
                }
            </div>
        </div>
    )
}

export default AddStudent