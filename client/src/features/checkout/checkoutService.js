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

const checkoutService = {
  generateToken,
};

export default checkoutService;
