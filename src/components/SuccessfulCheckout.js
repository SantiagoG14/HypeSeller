import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Redirect, useLocation } from 'react-router'

export default function SuccessfulCheckout({ items, total, orderId, orderDate }) {
    const location = useLocation()
    const successfulCheckout = location.state ? true : false

    useEffect(()=>{
        console.log(successfulCheckout, location.state)
    })

    if(successfulCheckout) {
        return (
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
                        <li className="order-detail"><span className="order-detail-field">Items:</span>{items}</li>
                        <li className="order-detail"><span className="order-detail-field">Total:</span>{total}</li>
                        <li className="order-detail"><span className="order-detail-field">Order Id:</span>{orderId}</li>
                        <li className="order-detail"><span className="order-detail-field">Order Date:</span>{orderDate}</li>
                    </ul>
                </div>
                
               <div className="feedback-email-container">
                   <Link>Send us an e-mail about your experience</Link>
               </div>
            </div>
        )
    }else {
        return(
            <Redirect to="/checkout" />
        )
    }
    
}
