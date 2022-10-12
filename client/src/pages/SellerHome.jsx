import { useSelector } from 'react-redux';

import SellerNav from '../components/SellerNav';

const SellerHome = () => {
  const { shop } = useSelector((state) => state.shop);

  return (
    <div>
      <SellerNav />
      {shop.shopName}
    </div>
  );
};

export default SellerHome;
