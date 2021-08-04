import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './checkout-components/checkoutForm'
import CheckOutItems from './checkout-components/checkoutItems'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const Checkout = ({shoppingBag})=> {
    return(
        <div className="checkout-container">
            <Elements stripe={stripePromise} className="checkout-container">
                <CheckoutForm />
            </Elements>
            <CheckOutItems shoppingBag={shoppingBag}/>
        </div>
        
    )
}




export default Checkout




