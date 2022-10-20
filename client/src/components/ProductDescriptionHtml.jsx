import { useSelector } from 'react-redux';

const ProductDescriptionHtml = () => {
  const { productDescription } = useSelector(
    (state) => state.productDescription
  );

  return (
    <div>
      <textarea disabled value={productDescription} />
    </div>
  );
};

export default ProductDescriptionHtml;
