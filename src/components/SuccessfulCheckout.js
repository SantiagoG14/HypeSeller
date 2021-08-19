import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Redirect, useLocation } from 'react-router'

export default function SuccessfulCheckout() {
    const location = useLocation()
    const cameFromCheckout = location.state !== undefined && location.state.cameFromCheckout !== undefined && location.state.cameFromCheckout

    if(cameFromCheckout) {

        const { successDetails } = location.state
        console.log( location.state.successDetails, cameFromCheckout)

        return (
            <div className="center-container">
                <div className="on-success-container">
                    <div className="return-to-home-page">
                        <Link to="/" className="return-to-home-page-link">
                            <span>
                                <span className="material-icons-outlined">
                                    keyboard_return
                                </span>
                                Continue shopping
                            </span>
                        </Link>
                
                    </div>
                    <div className="thank-you-message">
                        <h1 className="success-title">
                            thank you!
                        </h1>
                        <p>Your purchase has been processed and will ship as soon as possible</p>
                    </div>
                
                    <div className="order-details">
                        <ul className="order-details-list">
                            <li className="order-detail"><span className="order-detail-field">Items:</span>{successDetails.items}</li>
                            <li className="order-detail"><span className="order-detail-field">Total:</span>{successDetails.total}</li>
                            <li className="order-detail"><span className="order-detail-field">Order Id:</span>{successDetails.orderId}</li>
                            <li className="order-detail"><span className="order-detail-field">Order Date:</span>{successDetails.date}</li>
                        </ul>
                    </div>
                
                   <div className="feedback-email-container">
                       <Link>Send us an e-mail about your experience</Link>
                   </div>
                </div>
            </div>
        )
    }else {
        return(
            <Redirect to="/" />
        )
    }
    
}
