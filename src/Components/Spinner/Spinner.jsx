import React from 'react'

function Spinner() {
    return (
        <div>
            <div className="spinner-border spinner-border-md text-danger" role="status">
                <span className="visually">...</span>
            </div>
        </div>
    )
}

export default Spinner