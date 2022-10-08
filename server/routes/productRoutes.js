const express = require('express');
const router = express.Router();
const { addProduct } = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');

router.post('/add-product', protect, addProduct);

module.exports = router;
