import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { openAuthModal } from '../features/modals/modalSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(openAuthModal());
  };

  return (
    <nav style={{ backgroundColor: 'lightgrey' }}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <button onClick={handleLoginClick}>Open Modal</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
