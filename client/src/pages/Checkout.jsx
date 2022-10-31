import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { generateToken } from '../features/checkout/checkoutSlice';

import CheckoutItemSummary from '../components/CheckoutItemSummary';
import {
  setIsFirstLoad,
  setCustomerAddress,
  setCustomerAddress2,
  setCustomerCity,
  setCustomerCountryCode,
  setCustomerCountryName,
  setCustomerCountryZoneId,
  setCustomerEmail,
  setCustomerFirstName,
  setCustomerLastName,
  setCustomerSubdivisionCode,
  setCustomerSubdivisionName,
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
    isFirstLoad,
    email,
    countryName,
    countryCode,
    countryZoneId,
    firstName,
    lastName,
    address,
    address2,
    city,
    subdivisionCode,
    subdivisionName,
    zipCode,
  } = useSelector((state) => state.customerInput);
  const { shippingCountries, shippingSubdivisions } = useSelector(
    (state) => state.shipping
  );
  const { checkout } = useSelector((state) => state.checkout);

  const [isEmaiMeChecked, setIsEmailMeChecked] = useState(true);

  const handleCountryChange = (e) => {
    const _indx = e.target.selectedIndex;
    const _opEl = e.target.childNodes[_indx];
    const _zoneId = _opEl.getAttribute('id');
    const _countryCode = _opEl.getAttribute('value');
    const _countryName = _opEl.text;

    dispatch(setCustomerCountryZoneId(_zoneId));
    !isFirstLoad && dispatch(setCustomerCountryCode(_countryCode));
    dispatch(setCustomerCountryName(_countryName));
  };

  const handleSubdivisionChange = (e) => {
    const _indx = e.target.selectedIndex;
    const _opEl = e.target.childNodes[_indx];
    const _subdivisionCode = _opEl.getAttribute('value');
    const _subdivisionName = _opEl.text;

    dispatch(setCustomerSubdivisionCode(_subdivisionCode));
    dispatch(setCustomerSubdivisionName(_subdivisionName));
  };

  useEffect(() => {
    dispatch(generateToken(cart.id));
  }, [dispatch, cart]);

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/shipping');
  };

  useEffect(() => {
    dispatch(getShippingCountries());
  }, [dispatch]);

  //   Set initial country id and subdivisions
  useEffect(() => {
    const setCountriesAndSubdivisions = async () => {
      if (shippingCountries.length > 0) {
        const _initialZoneId = await shippingCountries[0].id;
        const _initialCountryCode = await shippingCountries[0].countries[0];

        isFirstLoad && dispatch(setCustomerCountryZoneId(_initialZoneId));
        isFirstLoad && dispatch(setCustomerCountryCode(_initialCountryCode));

        const checkout_id = await checkout.id;
        const _countryCode = await countryCode;
        const _zoneId = await countryZoneId;

        const chktCntryData = {
          checkoutId: checkout_id,
          countryCode: _countryCode,
          zoneId: _zoneId,
        };

        if (
          chktCntryData.checkoutId !== undefined &&
          chktCntryData.countryName !== '' &&
          chktCntryData.zoneId !== ''
        ) {
          dispatch(getShippingSubdivisions(chktCntryData));
        }
        isFirstLoad && dispatch(setIsFirstLoad(false));
      }
    };
    setCountriesAndSubdivisions();
  }, [
    dispatch,
    countryName,
    countryCode,
    checkout,
    shippingCountries,
    isFirstLoad,
    countryZoneId,
  ]);

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
        <select name='state' id='state' onChange={handleSubdivisionChange}>
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
