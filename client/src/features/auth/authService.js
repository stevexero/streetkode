import axios from 'axios';

const API_URL = '/api/users/';

// REGISTER
const register = async (userData) => {
  const res = await axios.post(API_URL, userData);

  if (res.data) {
    localStorage.setItem('streetkodeuser', JSON.stringify(res.data));
  }

  return res.data;
};

// Send Welcome Email
// const sendWelcomeMail = async (userData) => {
//   const res = await axios.post(API_URL + 'welcome', userData);

//   return res.data;
// };

// LOGOUT
const logout = () => {
  localStorage.removeItem('streetkodeuser');
};

// LOGIM
const login = async (userData) => {
  const res = await axios.post(API_URL + 'login', userData);

  if (res.data) {
    localStorage.setItem('streetkodeuser', JSON.stringify(res.data));
  }

  return res.data;
};

// GET CURRENT USER
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + 'me', config);

  return res.data;
};

// Upgrade User
// const upgradeUser = async (userData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const res = await axios.patch(API_URL, userData, config);

//   return res.data;
// };

const authService = {
  register,
  logout,
  login,
  //   upgradeUser,
  getMe,
  //   sendWelcomeMail,
};

export default authService;
