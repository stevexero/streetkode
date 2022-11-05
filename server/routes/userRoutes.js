const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  sendWelcomeMail,
  sendVerificationThankYouMail,
  getMe,
  updateUser,
  verifyUser,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', loginUser);

router.post('/welcome', sendWelcomeMail);

router.post('/verification-thank-you', sendVerificationThankYouMail);

router.get('/me', protect, getMe);

router.patch('/', protect, updateUser);

router.patch('/verify/:verifyId', protect, verifyUser);

module.exports = router;
