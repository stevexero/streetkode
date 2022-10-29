import { useLocation } from 'react-router-dom';

import PaymentForm from '../components/PaymentForm';

const Payment = () => {
  const location = useLocation();
  const contactData = location.state.contactData;

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
      <h1>Payment</h1>
      <p>All transactions are secure and encrypted</p>
      <PaymentForm contactData={contactData} />
    </div>
  );
};

export default Payment;
