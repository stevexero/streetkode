import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { generateToken } from '../features/checkout/checkoutSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { checkout } = useSelector((state) => state.checkout);

  const [email, setEmail] = useState('');
  const [isEmaiMeChecked, setIsEmailMeChecked] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [discountCode, setDiscountCode] = useState('');

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
      phone,
    };

    navigate('/shipping', { state: { contactData } });
  };

  const handleDiscountCodeSubmit = (e) => {
    e.preventDefault();

    console.log(discountCode);
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
        <select name='state' id='state'>
          <option value='alabama'>Alabama</option>
          <option value='nevada'>Nevada</option>
          {/* FIXME: set up states or provinces depending on country chosen, and state */}
        </select>
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
      <div>
        {checkout &&
          checkout.line_items &&
          checkout.line_items.length > 0 &&
          checkout.line_items.map((item) => (
            <div key={item.id}>
              <img src={item.image.url} alt={item.name} width='100px' />
              <p>{item.name}</p>
              {item.selected_options.length > 1
                ? item.selected_options.map((opt) => (
                    <p key={opt.id}>{opt.option_name}</p>
                  ))
                : item.selected_options.length === 1 && (
                    <p key={item.selected_options[0].id}>
                      {item.selected_options[0].option_name}
                    </p>
                  )}
              <p>{item && item.price && item.price.formatted_with_symbol}</p>
            </div>
          ))}
        <br />
        <hr />
        <br />
        <form onSubmit={handleDiscountCodeSubmit}>
          <label htmlFor='discount-code'>Discount Code</label>
          <input
            type='text'
            id='discount-code'
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button type='submit'>Apply</button>
        </form>
        <br />
        <hr />
        <br />
        <label htmlFor='subtotal'>Subtotal</label>
        <p>
          {checkout &&
            checkout.subtotal &&
            checkout.subtotal.formatted_with_symbol}
        </p>
        <label htmlFor='shipping'>Shipping</label>
        <p>Calculated at next step</p>
      </div>
    </div>
  );
};

export default Checkout;
