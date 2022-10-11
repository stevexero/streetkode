import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';

import { getProduct, reset } from '../features/products/productSlice';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { product, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log('error: ');
      console.log(message);
    }

    dispatch(getProduct(productId));
  }, [dispatch, isError, message, productId]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div>
      <BackButton url='/shop' />
      {Object.keys(product).length > 0 ? (
        <>
          <h1>{product.name}</h1>
          <img src={product.image.url} alt={product.name} />
          <h2>{product.price.formatted_with_symbol}</h2>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default ProductPage;
