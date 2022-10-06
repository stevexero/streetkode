import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../features/auth/authSlice';
import { openAuthModal } from '../features/modals/modalSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLoginClick = () => {
    dispatch(openAuthModal());
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <nav style={{ backgroundColor: 'lightgrey' }}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          {user ? (
            <button onClick={handleLogoutClick}>Logout</button>
          ) : (
            <button onClick={handleLoginClick}>Login</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
