import axios from 'axios';

const API_URL = 'https://api.chec.io/v1/carts/';

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

// GET CART
const getCart = async (cartId) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(API_URL + cartId, config);

  return res.data;
};

// ADD TO CART
const addToCart = async (cartData) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.post(
    `https://api.chec.io/v1/carts/${cartData.cartId}`,
    cartData.isFlagOptionsOrVariantId === 'flagOptions'
      ? {
          id: cartData.productId,
          options: cartData.options,
        }
      : cartData.isFlagOptionsOrVariantId === 'flagVariantId' && {
          id: cartData.productId,
          variant_id: cartData.variant_id,
        },
    config
  );

  return res.data;
};

const cartService = {
  createCart,
  getCart,
  addToCart,
};

export default cartService;
