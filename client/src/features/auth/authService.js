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
const sendWelcomeMail = async (userData) => {
  const res = await axios.post(API_URL + 'welcome', userData);

  return res.data;
};

// Send Verification Thank You Email
const sendVerificationThankYouMail = async (userData) => {
  const res = await axios.post(API_URL + 'verification-thank-you', userData);

  return res.data;
};

// LOGOUT
const logout = () => {
  localStorage.removeItem('streetkodeuser');
};

// LOGIN
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

// Update User
const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.patch(API_URL, userData, config);

  if (res.data) {
    localStorage.setItem('streetkodeuser', JSON.stringify(res.data));
  }

  return res.data;
};

// Verify User
const verifyUser = async (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.patch(
    API_URL + `verify/${user.verifyId}`,
    { userId: user._id },
    config
  );

  if (res.data) {
    localStorage.setItem('streetkodeuser', JSON.stringify(res.data));
  }

  return res.data;
};

const authService = {
  register,
  logout,
  login,
  updateUser,
  getMe,
  sendWelcomeMail,
  sendVerificationThankYouMail,
  verifyUser,
};

export default authService;
