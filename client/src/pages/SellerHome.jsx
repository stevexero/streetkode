import { useSelector } from 'react-redux';

const SellerHome = () => {
  const { shop } = useSelector((state) => state.shop);

  return <div>{shop.shopName}</div>;
};

export default SellerHome;
