import axios from 'axios';

const API_URL = 'https://api.chec.io/v1/products';

// GET ALL PRODUCTS
const getAllProducts = async () => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(API_URL, config);

  return res.data.data;
};

// GET SINGLE PRODUCT
const getProduct = async (productId) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(API_URL + productId, config);

  return res.data.data;
};

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
    {
      product: {
        name: productInfo.name,
        price: productInfo.price,
        image: productInfo.image.myFile,
      },
    },
    config
  );

  //   await axios.post(
  //     API_URL + res.data.id + '/assets',
  //     {
  //       product: {
  //         image: productInfo.image,
  //       },
  //     },
  //     config
  //   );

  return res.data;
};

const productService = {
  getAllProducts,
  getProduct,
  addProduct,
};

export default productService;
