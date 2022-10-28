import axios from 'axios';

// GENERATE TOKEN
const generateToken = async (id) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(
    `https://api.chec.io/v1/checkouts/${id}?type=cart`,
    config
  );

  return res.data;
};

// CAPTURE CHECKOUT
const captureCheckout = async (orderData) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  console.log(orderData);

  const res = await axios.post(
    `https://api.chec.io/v1/checkouts/${orderData.checkoutId}`,
    orderData,
    config
  );

  return res.data;
};

const checkoutService = {
  generateToken,
  captureCheckout,
};

export default checkoutService;
