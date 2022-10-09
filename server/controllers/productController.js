const asyncHandler = require('express-async-handler');

const Product = require('../models/productModel');

// @desc    Add a product
// @route   /api/products/add-product
// @access  Private
const addProduct = asyncHandler(async (req, res) => {
  const { name, price } = req.body;

  //   Validation
  if (!name || !price) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  //   Create user
  const product = await Product.create({
    name,
    price,
  });

  if (user) {
    res.status(201).json({
      _id: product._id,
      name: product.name,
      price: product.price,
    });
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
});

module.exports = {
  addProduct,
};
