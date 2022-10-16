import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProductDescriptionHtml = () => {
  const { productDescription } = useSelector(
    (state) => state.productDescription
  );

  useEffect(() => {
    console.log(productDescription);
  }, [productDescription]);

  //   return <div>{productDescription}</div>;
  return (
    <div>
      <textarea disabled value={productDescription} />
    </div>
  );
};

export default ProductDescriptionHtml;
