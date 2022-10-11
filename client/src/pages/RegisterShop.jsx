import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { registerShop } from '../features/shop/shopSlice';

const RegisterShop = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

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
