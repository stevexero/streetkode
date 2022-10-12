import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { RiShoppingCartLine, RiHeartLine } from 'react-icons/ri';

import { logout } from '../features/auth/authSlice';
import { openAuthModal } from '../features/modals/modalSlice';
import { resetShop } from '../features/shop/shopSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  // const { shop } = useSelector((state) => state.shop);

  const handleLoginClick = () => {
    dispatch(openAuthModal());
  };

  const handleSelect = (e) => {
    if (e === 'logout') {
      dispatch(resetShop());
      dispatch(logout());
      navigate('/');
    }
  };

  const showFavorites = () => {
    console.log('favorites');
  };

  const showCart = () => {
    console.log('cart');
  };

  return (
    <nav style={{ backgroundColor: 'lightgrey' }}>
      <ul>
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
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option value='profile'>profile</option>
              <option value='logout'>logout</option>
            </select>
          ) : (
            <button onClick={handleLoginClick}>Login</button>
          )}
        </li>
        {user && (
          <li>
            <Link to='/add-product'>Add Product</Link>
          </li>
        )}
        {user && user.memberType === 'seller' && (
          <li>
            <Link to={`/seller-home/${user.shop}`}>Seller Home</Link>
          </li>
        )}
        <li>
          <button onClick={showFavorites}>
            <RiHeartLine />
            <p>0</p>
          </button>
        </li>
        <li>
          <button onClick={showCart}>
            <RiShoppingCartLine />
            <p>0</p>
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
