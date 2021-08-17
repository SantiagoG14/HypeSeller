import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './checkout-components/checkoutForm'
import CheckOutItems from './checkout-components/checkoutItems'
import { useApp } from '../context/AppContext'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const totalPriceReducer = (accomulator, currentItem) => accomulator + currentItem.price


const Checkout = ()=> {

    const { shoppingBag } = useApp()
    const totalPrice = shoppingBag.bag.reduce(totalPriceReducer, 0)

    return(
        <div className="checkout-container">
            <CheckOutItems shoppingBag={shoppingBag} />
            <div className="checkout-form-container">
                <Elements stripe={stripePromise} className="checkout-container">
                    <CheckoutForm price={totalPrice}/>
                </Elements>
            </div>
            
        </div>
        
    )
}




export default Checkout




