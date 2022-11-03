import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckoutItemSummary from '../components/CheckoutItemSummary';
import { getShippingOptions } from '../features/shipping/shippingSlice';

const Shipping = () => {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.checkout);
  const { countryCode } = useSelector((state) => state.customerInput);
  const { shippingOptions } = useSelector((state) => state.shipping);

  useEffect(() => {
    const shippingData = {
      checkoutId: checkout.id,
      countryCode: countryCode,
    };

    dispatch(getShippingOptions(shippingData));
  }, [dispatch, countryCode, checkout]);

  useEffect(() => {
    console.log(shippingOptions);
  }, [shippingOptions]);

  const {
    email,
    countryName,
    address,
    address2,
    city,
    subdivisionCode,
    zipCode,
  } = useSelector((state) => state.customerInput);

  return (
    <div>
      <label htmlFor='contact-email'>Contact</label>
      <p id='contact-email'>{email}</p>
      <label htmlFor='contact-address'>Ship To</label>
      <p id='contact-address'>
        {address} {address2 !== '' && <span>, {address2}</span>}, {city},{' '}
        {subdivisionCode}, {zipCode}, {countryName}
      </p>
      <h1>Shipping Method</h1>
      {/* <input
        type='radio'
        name='shipping-options'
        id='ground-shipping'
        defaultChecked
      />
      <label htmlFor='ground-shipping'>Ground Shipping - $0.00</label>
      <input type='radio' name='shipping-options' id='express-shipping' />
      <label htmlFor='express-shipping'>Express Shipping - $11.95</label> */}
      {/* FIXME: add shipping rates set by shop */}
      {shippingOptions &&
        shippingOptions.length > 0 &&
        shippingOptions.map((shpOpts) => (
          <div key={shpOpts.id}>
            <input
              type='radio'
              name='shipping-options'
              id={shpOpts.description}
            />
            <label htmlFor={shpOpts.description}>
              {shpOpts.description} - {shpOpts.price.formatted_with_symbol}
            </label>
          </div>
        ))}
      <br />
      <Link to='/checkout'>{'<- Back to information'}</Link>
      <br />
      <Link to='/payment'>Continue to payment</Link>
      <hr />
      <hr />
      <CheckoutItemSummary />
    </div>
  );
};

export default Shipping;
