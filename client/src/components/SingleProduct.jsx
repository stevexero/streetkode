import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BrokenImage from '../assets/brokenimage.jpeg';

const SingleProduct = ({ product }) => {
  const [productId, setProductId] = useState();
  const [productImageURL, setProductImageURL] = useState();
  const [productName, setProductName] = useState();
  const [productPriceFormatted, setProductPriceFormatted] = useState();

  useEffect(() => {
    product.id === null ? setProductId('loading id') : setProductId(product.id);
  }, [product, product.id]);

  useEffect(() => {
    product.image === null
      ? setProductImageURL(BrokenImage)
      : setProductImageURL(product.image.url);
  }, [product, product.image]);

  useEffect(() => {
    product.name === null
      ? setProductName('loading name')
      : setProductName(product.name);
  }, [product, product.name]);

  useEffect(() => {
    product.price.formatted_with_symbol === null
      ? setProductPriceFormatted('loading price')
      : setProductPriceFormatted(product.price.formatted_with_symbol);
  }, [product, product.price.formatted_with_symbol]);

  return (
    <>
      {product && (
        <Link to={`/shop/${productId}`} className='btn btn-reverse btn-sm'>
          <img src={productImageURL} alt={productName} width='140px' />
          <p>{productName}</p>
          <p>{productPriceFormatted}</p>
        </Link>
      )}
    </>
  );
};

export default SingleProduct;
