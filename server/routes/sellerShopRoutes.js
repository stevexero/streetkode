const express = require('express');
const router = express.Router();
const {
  registerShop,
  //   sendWelcomeMail,
  getShop,
} = require('../controllers/sellerShopController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, registerShop);

// router.post('/welcome', sendWelcomeMail);

router.get('/getShop', protect, getShop);

module.exports = router;
