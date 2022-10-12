import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { registerShop } from '../features/shop/shopSlice';
import { updateUser } from '../features/auth/authSlice';

const RegisterShop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { shop } = useSelector((state) => state.shop);

  const [shopName, setShopName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const shopData = {
      userId: user._id,
      shopName: shopName,
    };

    dispatch(registerShop(shopData));

    setShopName('');
  };

  useEffect(() => {
    if (Object.keys(shop).length > 0) {
      const userData = {
        userId: user._id,
        memberType: 'seller',
        shop: shop._id,
      };

      dispatch(updateUser(userData));

      navigate(`/seller-home/${shop._id}`);
    }
  }, [shop, navigate, dispatch, user]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='shop-name'>shop name</label>
        <input
          type='text'
          id='shop-name'
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
        <button type='submit'>Register Shop</button>
      </form>
    </div>
  );
};

export default RegisterShop;
