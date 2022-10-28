import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { generateToken } from '../features/checkout/checkoutSlice';

import CheckoutItemSummary from '../components/CheckoutItemSummary';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);

  const [email, setEmail] = useState('');
  const [isEmaiMeChecked, setIsEmailMeChecked] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('alabama');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    dispatch(generateToken(cart.id));
  }, [dispatch, cart]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactData = {
      email,
      firstName,
      lastName,
      company,
      address,
      address2,
      city,
      state,
      zipCode,
      phone,
    };

    navigate('/shipping', { state: { contactData } });

    // FIXME: Save info to session storage in order to repopulate form if user navigates back
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
          onChange={(e) => setEmail(e.target.value)}
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
          <option value='USA'>USA</option>
          {/* FIXME: work out country list and state */}
        </select>
        <br />
        <label htmlFor='first-name'>First Name</label>
        <input
          type='text'
          id='first-name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor='last-name'>Last Name</label>
        <input
          type='text'
          id='last-name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <label htmlFor='company'>Company (optional)</label>
        <input
          type='text'
          id='company'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <br />
        <label htmlFor='address'>Address</label>
        <input
          type='text'
          id='address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <label htmlFor='address2'>Apt, Suite, etc. (optional)</label>
        <input
          type='text'
          id='address2'
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <br />
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
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
          onChange={(e) => setZipCode(e.target.value)}
        />
        <br />
        <label htmlFor='phone-number'>Phone Number</label>
        <input
          type='text'
          id='phone-number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
