import { Link } from 'react-router-dom';

const SingleProduct = ({ product }) => {
  return (
    <Link to={`/shop/${product.id}`} className='btn btn-reverse btn-sm'>
      <img src={product.image.url} alt={product.name} width='140px' />
      <p>{product.name}</p>
      <p>{product.price.formatted_with_symbol}</p>
    </Link>
  );
};

export default SingleProduct;
