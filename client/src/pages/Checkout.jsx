import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { generateToken } from '../features/checkout/checkoutSlice';

import CheckoutItemSummary from '../components/CheckoutItemSummary';
import {
  setCustomerAddress,
  setCustomerAddress2,
  setCustomerCity,
  setCustomerCountryCode,
  setCustomerCountryName,
  setCustomerEmail,
  setCustomerFirstName,
  setCustomerLastName,
  setCustomerSubdivision,
  setCustomerZipCode,
} from '../features/customerInputs/customerInputSlice';
import {
  getShippingCountries,
  getShippingSubdivisions,
} from '../features/shipping/shippingSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const {
    email,
    countryName,
    countryCode,
    firstName,
    lastName,
    address,
    address2,
    city,
    subdivision,
    zipCode,
  } = useSelector((state) => state.customerInput);
  const { shippingCountries, shippingSubdivisions } = useSelector(
    (state) => state.shipping
  );
  const { checkout } = useSelector((state) => state.checkout);

  const [isEmaiMeChecked, setIsEmailMeChecked] = useState(true);

  const handleCountryChange = (e) => {
    const index = e.target.selectedIndex;
    const countryElement = e.target.childNodes[index];
    const countryId = countryElement.getAttribute('id');
    const countryName = countryElement.getAttribute('value');

    dispatch(setCustomerCountryCode(countryId));
    dispatch(setCustomerCountryName(countryName));
  };

  useEffect(() => {
    dispatch(generateToken(cart.id));
  }, [dispatch, cart]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactData = {
      email,
      countryName,
      firstName,
      lastName,
      address,
      address2,
      city,
      subdivision,
      zipCode,
    };

    navigate('/shipping', { state: { contactData } });
  };

  useEffect(() => {
    dispatch(getShippingCountries());
  }, [dispatch]);

  //   Set initial country id
  useEffect(() => {
    if (shippingCountries.length > 0) {
      dispatch(setCustomerCountryCode(shippingCountries[0].id));
      dispatch(setCustomerCountryName(shippingCountries[0].countries[0]));
    }
  }, [shippingCountries, dispatch]);

  useEffect(() => {
    if (shippingCountries.length > 0) {
      const chktCntryData = {
        checkoutId: checkout.id,
        countryCode: countryName,
        zoneId: countryCode,
      };
      dispatch(getShippingSubdivisions(chktCntryData));
    }
  }, [dispatch, countryName, checkout, shippingCountries, countryCode]);

  return (
    <div>
      <h1>Contact Information</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email Address</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => dispatch(setCustomerEmail(e.target.value))}
        />
        <br />
        <label htmlFor='offers'>Email me special offers</label>
        <input
          type='checkbox'
          name='offers'
          id='offers'
          checked={isEmaiMeChecked}
          onChange={() => setIsEmailMeChecked((prev) => !prev)}
        />
        <br />
        <label htmlFor='country'>Country</label>
        <select name='country' id='country' onChange={handleCountryChange}>
          {shippingCountries &&
            shippingCountries.map((country) => (
              <option
                key={country.id}
                id={country.id}
                value={country.countries[0]}
              >
                {country.name}
              </option>
            ))}
        </select>
        <br />
        <label htmlFor='first-name'>First Name</label>
        <input
          type='text'
          id='first-name'
          value={firstName}
          onChange={(e) => dispatch(setCustomerFirstName(e.target.value))}
        />
        <label htmlFor='last-name'>Last Name</label>
        <input
          type='text'
          id='last-name'
          value={lastName}
          onChange={(e) => dispatch(setCustomerLastName(e.target.value))}
        />
        <br />
        <label htmlFor='address'>Address</label>
        <input
          type='text'
          id='address'
          value={address}
          onChange={(e) => dispatch(setCustomerAddress(e.target.value))}
        />
        <br />
        <label htmlFor='address2'>Apt, Suite, etc. (optional)</label>
        <input
          type='text'
          id='address2'
          value={address2}
          onChange={(e) => dispatch(setCustomerAddress2(e.target.value))}
        />
        <br />
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          value={city}
          onChange={(e) => dispatch(setCustomerCity(e.target.value))}
        />
        <br />
        <label htmlFor='state'>State / Subdivision</label>
        <select
          name='state'
          id='state'
          onChange={(e) => dispatch(setCustomerSubdivision(e.target.value))}
        >
          {Object.entries(shippingSubdivisions).map(
            ([subCode, subName], index) => (
              <option key={index} id={subCode} value={subCode}>
                {subName}
              </option>
            )
          )}
        </select>
        <br />
        <label htmlFor='zip'>Zip Code</label>
        <input
          type='text'
          id='zip'
          value={zipCode}
          onChange={(e) => dispatch(setCustomerZipCode(e.target.value))}
        />
        <br />
        <Link to='/cart'>{'<- Back to cart'}</Link>
        <button type='submit'>Continue to shipping</button>
      </form>
      <hr />
      <hr />
      <CheckoutItemSummary />
    </div>
  );
};

export default Checkout;
