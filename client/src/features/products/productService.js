import axios from 'axios';

const API_URL = 'https://api.chec.io/v1/products';

// ADD PRODUCT
const addProduct = async (productInfo) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.post(
    API_URL,
    { product: { name: productInfo.name, price: productInfo.price } },
    config
  );

  return res.data;
};

const productService = {
  addProduct,
};

export default productService;
