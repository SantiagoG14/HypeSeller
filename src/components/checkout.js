import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './product-page-components/checkoutForm'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const Checkout = ()=> {
    return(
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}




export default Checkout




