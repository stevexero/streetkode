// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckoutItemSummary from '../components/CheckoutItemSummary';

const Shipping = () => {
  //   const { shippingCountries } = useSelector((state) => state.shipping);
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
        {address}, {address2}, {city}, {subdivisionCode}, {zipCode},{' '}
        {countryName}
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
