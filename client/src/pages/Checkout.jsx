import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateToken } from '../features/checkout/checkoutSlice';

const Checkout = () => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(generateToken(cart.id));
  }, [dispatch, cart]);

  return <div>Checkout</div>;
};

export default Checkout;
