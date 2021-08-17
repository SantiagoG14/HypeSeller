import React, { useState} from 'react'

export default function Error({errorText}) {
    const [showError, setShowError] = useState(true)
    const handleErrorClick = ()=> {
        setShowError(!showError)
    }
    return (
       <div className="error-container">
           <div className={showError ? "error-card active-error" : 'error-card'}>
            <h1 className="error-text">
                <p>Sorry, {errorText},</p>
                <p>try reloading the page</p>
            </h1>
            <span className="material-icons-outlined  error-close-btn" onClick={handleErrorClick}>
                close
            </span>
           </div>
       </div>
    )
}
