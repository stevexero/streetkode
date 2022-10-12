import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SellerNav = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <ul>
        {user && user.memberType === 'seller' && user.shop !== null && (
          <li>
            <Link to='/add-product'>Add Product</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SellerNav;
