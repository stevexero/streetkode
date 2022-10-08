import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addProduct } from '../features/products/productSlice';

const AddProduct = () => {
  const dispatch = useDispatch();

  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  const handleProductSubmit = (e) => {
    e.preventDefault();

    const productInfo = {
      name: productTitle,
      price: +productPrice,
    };

    dispatch(addProduct(productInfo));

    alert(`Woohoo! You added ${productTitle} at a price of ${productPrice}`);

    setProductTitle('');
    setProductPrice(0);
  };

  return (
    <div>
      <form onSubmit={handleProductSubmit}>
        <input
          type='text'
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
        />
        <input
          type='number'
          min='1'
          step='any'
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
