import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { generateToken } from '../features/checkout/checkoutSlice';

import CheckoutItemSummary from '../components/CheckoutItemSummary';
import {
  setCustomerAddress,
  setCustomerAddress2,
  setCustomerCity,
  setCustomerEmail,
  setCustomerFirstName,
  setCustomerLastName,
  setCustomerZipCode,
} from '../features/customerInputs/customerInputSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { email, firstName, lastName, address, address2, city, zipCode } =
    useSelector((state) => state.customerInput);

  const [isEmaiMeChecked, setIsEmailMeChecked] = useState(true);
  const [state, setState] = useState('alabama');

  useEffect(() => {
    dispatch(generateToken(cart.id));
  }, [dispatch, cart]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactData = {
      email,
      firstName,
      lastName,
      address,
      address2,
      city,
      state,
      zipCode,
    };

    navigate('/shipping', { state: { contactData } });
  };

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
        <select name='country' id='country'>
          <option value='US'>USA</option>
          {/* FIXME: work out country list and state */}
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
        <label htmlFor='state'>State</label>
        <select
          name='state'
          id='state'
          onChange={(e) => setState(e.target.value)}
        >
          <option value='AL'>Alabama</option>
          <option value='NV'>Nevada</option>
          {/* FIXME: set up states or provinces depending on country chosen, and state */}
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
