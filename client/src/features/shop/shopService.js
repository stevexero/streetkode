import axios from 'axios';

const API_URL = '/api/sellershop/';

// REGISTER SHOP
const registerShop = async (shopData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${(shopData, token)}`,
    },
  };

  const res = await axios.post(API_URL, shopData, config);

  return res.data;
};

// Send Welcome Email
// const sendWelcomeMail = async (userData) => {
//   const res = await axios.post(API_URL + 'welcome', userData);

//   return res.data;
// };

// GET SHOP
const getShop = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${(data, token)}`,
    },
  };

  const res = await axios.get(API_URL + 'getShop', data, config);

  return res.data;
};

const shopService = {
  registerShop,
  getShop,
  //   sendWelcomeMail,
};

export default shopService;
