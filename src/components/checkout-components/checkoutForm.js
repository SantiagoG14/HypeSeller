import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import '../../css/checkout.css'
import { cloudFunctions } from "../../firebase";
import { useHistory } from "react-router";

const CheckoutForm = ({ price }) => {
  const [isProcessing, setProcessingTo] = useState(false)
  const [checkoutError, setCheckoutError] = useState()
  const history = useHistory()

  const stripe = useStripe()
  const elements = useElements()

  // TIP
  // use the cardElements onChange prop to add a handler
  // for setting any errors:

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError()
  }

  const handleFormSubmit = async ev => {
    ev.preventDefault()

    if(price === 0) {
      setCheckoutError('do not have any items in shopping cart')
      return
    }

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    }

   

    setProcessingTo(true)

    const cardElement = elements.getElement("card")

    try {
      const {data:clientSecret } = await cloudFunctions.paymentIntent({amount:price*100})

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      })

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message)
        setProcessingTo(false)
        return
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      })

      if (error) {
        setCheckoutError(error.message)
        setProcessingTo(false)
        return
      }


      const { data:successDetails } = await cloudFunctions.successfulCheckout({billingDetails: billingDetails})
      onSuccessfulCheckout(successDetails)
      setProcessingTo(false)

    } catch (err) {
      setCheckoutError(err.message)
    }
  }


const cardElementOptions = {

  CustomFontSource: {
    family: 'Heebo',
    scr: 'url(https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;800;900&display=swap)'
  },
  style:{
    base:{
      outline: 'solid 1px black',
      fontSize: '1rem',
      fontWeight: '400',
      width: '100%'
    },

    invalid: {
      color: '#FF2F2F'
    },

    
  },

  hidePostalCode: true,
  
}

const onSuccessfulCheckout = (successDetails) => {
  history.push('/success', {cameFromCheckout: true, successDetails})
}

  return (
    <form onSubmit={handleFormSubmit} className="checkout-form">
        <h1 className="form-title">CHECKOUT</h1>
        <div className="input-fields">
            <InputField fieldName="Name" type="text"/>
            <InputField fieldName="Email" type="email"/>
            <InputField fieldName="Address" type="text" />
            <InputField fieldName="City" type="text"/>
            <InputField fieldName="State" type="text"/>
            <InputField fieldName="ZIP" type="text"/>
        </div>
      <div>
        <div className="card-element-container">
          <CardElement
            onChange={handleCardDetailsChange}
            options={cardElementOptions}
          />
        </div>
      </div>
      {checkoutError && <div>{checkoutError}</div>}
      <div className="checkout-btn-container">
        {/* TIP always disable your submit button while processing payments */}
        <button disabled={isProcessing || !stripe} className="checkout-btn">
          {isProcessing ? "Processing..." : `Pay $${price}`}
        </button>
      </div>
    </form>
  );
};

const InputField = (props)=>{
    return(
        <div className="checkout-input-field">
            <label htmlFor={props.fieldName.toLowerCase()}>{props.fieldName}</label>
            <input type={props.type} id={props.fieldName.toLowerCase()} name={props.fieldName.toLowerCase()} required/>
        </div>
    )
}


export default CheckoutForm

