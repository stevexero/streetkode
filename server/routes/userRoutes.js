const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  //   sendWelcomeMail,
  getMe,
  updateUser,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', loginUser);

// router.post('/welcome', sendWelcomeMail);

router.get('/me', protect, getMe);

router.patch('/', protect, updateUser);

module.exports = router;
