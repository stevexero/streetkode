import { useSelector } from 'react-redux';

import PaymentForm from '../components/PaymentForm';

const Payment = () => {
  const { email, address, address2, city, subdivision, zipCode } = useSelector(
    (state) => state.customerInput
  );

  return (
    <div>
      <label htmlFor='contact-email'>Contact</label>
      <p id='contact-email'>{email}</p>
      <label htmlFor='contact-address'>Ship To</label>
      <p id='contact-address'>
        {address}, {address2}, {city}, {subdivision}, {zipCode}
      </p>
      <h1>Payment</h1>
      <p>All transactions are secure and encrypted</p>
      <PaymentForm />
    </div>
  );
};

export default Payment;
