import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { RiShoppingCartLine, RiHeartLine } from 'react-icons/ri';

import { logout } from '../features/auth/authSlice';
import { openAuthModal, openCartModal } from '../features/modals/modalSlice';
import { resetShop } from '../features/shop/shopSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const [selectedValue, setSelectedValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');

  const handleLoginClick = () => {
    dispatch(openAuthModal());
  };

  const handleSelect = (e) => {
    setSelectedValue(e);
  };

  const showFavorites = () => {
    console.log('favorites');
  };

  const showCart = () => {
    dispatch(openCartModal());
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    if (selectedValue === 'logout') {
      dispatch(resetShop());
      dispatch(logout());
      navigate('/');
      setDisplayValue('');
      setSelectedValue('');
    } else if (selectedValue === 'seller-home') {
      navigate(`/seller-home/${user.shop}`);
      setDisplayValue('Seller Home');
      setSelectedValue('');
    } else if (selectedValue === 'profile') {
      navigate(`/profile/${user._id}`);
      setDisplayValue('User Profile');
      setSelectedValue('');
    }
  }, [dispatch, navigate, selectedValue, user]);

  return (
    <nav
      style={{ width: '100%', padding: '1rem', backgroundColor: 'lightgrey' }}
    >
      <ul
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/shop'>Shop</Link>
        </li>
        <li>
          {user ? (
            <select
              name='user-menu'
              id='user-menu'
              value={selectedValue}
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option value={displayValue} defaultChecked>
                {displayValue}
              </option>
              <option value='profile'>profile</option>
              {user && user.memberType === 'seller' && (
                <option value='seller-home'>Seller Home</option>
              )}
              <option value='logout'>logout</option>
            </select>
          ) : (
            <button onClick={handleLoginClick}>Login</button>
          )}
        </li>
        <li>
          <button onClick={showFavorites} style={{ display: 'flex' }}>
            <RiHeartLine />
            <p>0</p>
          </button>
        </li>
        <li>
          <button onClick={showCart} style={{ display: 'flex' }}>
            <RiShoppingCartLine />
            <p>{cart.total_items}</p>
          </button>
        </li>
        {user && user.memberType === 'seller' ? null : (
          <li>
            <Link to='/sell-with-us'>Sell with us!</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
