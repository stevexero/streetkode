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
// import {
//   getShippingCountries,
//   getShippingOptions,
// } from '../features/shipping/shippingSlice';

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

const PaymentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { checkout } = useSelector((state) => state.checkout);
  const {
    email,
    // countryName,
    countryCode,
    // countryZoneId,
    firstName,
    lastName,
    address,
    address2,
    city,
    subdivision,
    zipCode,
  } = useSelector((state) => state.customerInput);

  const [totalCart] = useState(null);
  //   const [shippingOptions, setShippingOptions] = useState([]);
  //   const [shippingOption, setShippingOption] = useState();

  //   const options = shippingOptions.map((sO) => ({
  //     id: sO.id,
  //     label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  //   }));

  //   const fetchShippingOptions = async (checkoutId, country, region = null) => {
  //     const options = await dispatch(
  //       getShippingOptions(checkout.id, { country, region })
  //     );

  //     setShippingOptions(options);
  //     setShippingOption(options[0].id);
  //   };

  // eslint-disable-line react-hooks/exhaustive-deps

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
          email: email,
          firstname: firstName,
          lastname: lastName,
        },
        shipping: {
          name: 'Primary',
          street: address + ' ' + address2,
          town_city: city,
          county_state: subdivision,
          postal_zip_code: zipCode,
          country: countryCode,
        },
        billing: {
          name: 'Primary',
          street: address + ' ' + address2,
          town_city: city,
          county_state: subdivision,
          postal_zip_code: zipCode,
          country: countryCode,
        },
        // fulfillment: { shipping_method: 'free' },
        // FIXME: work on fulfillment zones when shipping to multiple countries
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      //   Capture checkout
      dispatch(captureCheckout(orderData));

      localStorage.removeItem('streetkodecart');

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
