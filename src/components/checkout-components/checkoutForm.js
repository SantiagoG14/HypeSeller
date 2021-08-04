import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import '../../css/checkout.css'


const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  // TIP
  // use the cardElements onChange prop to add a handler
  // for setting any errors:

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };

    setProcessingTo(true);

    const cardElement = elements.getElement("card");

    try {
    //   const { data: clientSecret } = await axios.post("/api/payment_intents", {
    //     amount: price * 100
    //   });

      const clientSecret = 'no'

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  // Learning
  // A common ask/bug that users run into is:
  // How do you change the color of the card element input text?
  // How do you change the font-size of the card element input text?
  // How do you change the placeholder color?
  // The answer to all of the above is to use the `style` option.
  // It's common to hear users confused why the card element appears impervious
  // to all their styles. No matter what classes they add to the parent element
  // nothing within the card element seems to change. The reason for this is that
  // the card element is housed within an iframe and:
  // > styles do not cascade from a parent window down into its iframes


  return (
    <form onSubmit={handleFormSubmit} className="checkout-form">

        <div className="input-fields">
            <InputField fieldName="Name" />
            <InputField fieldName="Email" />
            <InputField fieldName="Adress" />
            <InputField fieldName="State" />
            <InputField fieldName="ZIP" />
        </div>
      <div>
        <div>
          <CardElement
            onChange={handleCardDetailsChange}
          />
        </div>
      </div>
      {checkoutError && <div>{checkoutError}</div>}
      <div>
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
            <p>{props.fieldName}</p>
            <input type="text" />
        </div>
    )
}
export default CheckoutForm;

