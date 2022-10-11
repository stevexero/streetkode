import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { openAuthModal, switchToSignUp } from '../features/modals/modalSlice';

const SellWithUs = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLoginClick = () => {
    dispatch(switchToSignUp());
    dispatch(openAuthModal());
  };

  return (
    <div>
      <h1>Set up shop on StreetKode</h1>
      <p>Brief overview of what we're looking for</p>
      <ul>
        <li>- Emerging designer</li>
        <li>- Original designs</li>
        <li>- Ships direct from you</li>
        <li>- No third party fullfillment</li>
      </ul>
      {user && user.memberType === 'guest' ? (
        <Link to='/register-shop'>Register Shop</Link>
      ) : user && user.memberType === 'seller' ? (
        <Link to='/seller-home'>Seller Home</Link>
      ) : (
        <>
          <p>Please register or login first</p>
          <button onClick={handleLoginClick}>Sign Up</button>
        </>
      )}
    </div>
  );
};

export default SellWithUs;
