import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { captureCheckout } from '../features/checkout/checkoutSlice';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#ff0000',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const PaymentForm = ({ contactData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { checkout } = useSelector((state) => state.checkout);

  const [totalCart] = useState(null);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        checkoutId: checkout.id,
        line_items: checkout.line_items,
        customer: {
          email: contactData.email,
          firstname: contactData.firstName,
          lastname: contactData.lastName,
        },
        shipping: {
          name: 'Primary',
          street: contactData.address,
          town_city: contactData.city,
          county_state: contactData.state,
          postal_zip_code: contactData.zipCode,
          country: 'US',
        },
        billing: {
          name: 'Primary',
          street: contactData.address,
          town_city: contactData.city,
          county_state: contactData.state,
          postal_zip_code: contactData.zipCode,
          country: 'United States',
        },
        fulfillment: { shipping_method: 'free' },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      //   Capture checkout
      dispatch(captureCheckout(orderData));

      //  FIXME: navigate to thank you page and empty cart
    }
  };

  //   FIXME: set up discout code
  //   useEffect(() => {
  //     commerce.checkout
  //       .checkDiscount(checkout.id, { code: checkout.discount[0] })
  //       .then((res) => setTotalCart(res));
  //   }, [checkout]);

  return (
    <div className='PaymentForm'>
      {/* <Review checkoutToken={checkout} price={totalCart} /> */}
      <hr />
      <h6>Payment Method</h6>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement options={CARD_ELEMENT_OPTIONS} />
              <br />
              <br />
              <div className='PaymentForm-footer'>
                <div onClick={() => navigate(-1)}>
                  <p>back</p>
                </div>
                <button type='submit' disabled={!stripe}>
                  Pay
                  {totalCart === null
                    ? checkout.subtotal.formatted_with_symbol
                    : totalCart.live.total.formatted_with_symbol}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
