import axios from 'axios';

const API_URL = 'https://api.chec.io/v1/carts';

// CREATE CART
const createCart = async () => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(API_URL, config);

  return res.data;
};

const cartService = {
  createCart,
};

export default cartService;
