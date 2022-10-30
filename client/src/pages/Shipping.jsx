import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import CheckoutItemSummary from '../components/CheckoutItemSummary';

const Shipping = () => {
  const location = useLocation();
  const contactData = location.state.contactData;

  const { shippingCountries } = useSelector((state) => state.shipping);
  const { countryName } = useSelector((state) => state.customerInput);

  useEffect(() => {
    const countries = shippingCountries.map(
      (country) => Object.keys(country.subdivisions)[0]
    );

    console.log(countries); // ['US', 'MX', 'CA']
    console.log(countryName);

    // const countryName = countries.filter(
    //   (country) => country === contactData.countryName
    // );

    // console.log(countryName[0]);
  }, [shippingCountries, contactData, countryName]);

  return (
    <div>
      <label htmlFor='contact-email'>Contact</label>
      <p id='contact-email'>{location.state.contactData.email}</p>
      <label htmlFor='contact-address'>Ship To</label>
      <p id='contact-address'>
        {location.state.contactData.address},{' '}
        {location.state.contactData.address2}, {location.state.contactData.city}
        , {location.state.contactData.subdivision},{' '}
        {location.state.contactData.zipCode}
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
      <Link to='/payment' state={{ contactData }}>
        Continue to payment
      </Link>
      <hr />
      <hr />
      <CheckoutItemSummary />
    </div>
  );
};

export default Shipping;
