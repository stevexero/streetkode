const asyncHandler = require('express-async-handler');
// const nodemailer = require('nodemailer');
// const sgMail = require('@sendgrid/mail');

const User = require('../models/userModel');
const Shop = require('../models/shopModel');

// @desc    Register a shop
// @route   /api/sellershop
// @access  Private
const registerShop = asyncHandler(async (req, res) => {
  const { shopName } = req.body;

  //   Validation
  if (!shopName) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  //   Find if shop already exists
  const shopExists = await Shop.findOne({ shopName });

  if (shopExists) {
    res.status(400);
    throw new Error('Shop already exists');
  }

  //   Find if user already hase a shop
  const userId = await Shop.findOne({ user });

  if (userId) {
    res.status(400);
    throw new Error('User already has a shop');
  }

  //   Create shop
  const shop = await Shop.create({
    user: req.user.id,
    shopName,
  });

  if (shop) {
    res.status(201).json({
      _id: shop._id,
      user: shop.user,
      shopName: shop.shopName,
    });
  } else {
    res.status(400);
    throw new Error('Invalid shop data');
  }
});

// @desc    Send Welcome Email
// @route   /api/users/welcome
// @access  Public
// const sendWelcomeMail = asyncHandler(async (req, res) => {
//   const { email, name } = req.body;

//   const msg = {
//     to: email,
//     from: 'accountservices@dillynote.com', // Change after I get SmolBits email set up
//     subject: 'Welcome to SmolBits!',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: `<div>
//               <h1>Hello ${name}!</h1>
//               <h2>Welcome to SmolBits!</h2>
//               <p>I'm excited to have you here and hope to provide the tools you need to unleash your creativity!</p>
//               <p>If you have any feedback, questions, or comments at all, please <a href="mailto:kylokyoshi@gmail.com">email</a> me!</p>
//               <p>Sincerely,</p>
//               <p>- Kylo Kyoshi</p>
//             </div>`,
//   };

//   sgMail
//     .send(msg)
//     .then((response) => {
//       console.log(response[0].statusCode);
//       console.log(response[0].headers);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

// @desc    Get Shop
// @route   /api/sellershop/getShop
// @access  Private
const getShop = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const shop = await Shop.findById(req.user.shop);

  if (!shop) {
    res.status(404);

    throw new Error('Shop not found');
  }

  if (shop.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error('Not Authorized');
  }

  res.status(200).json(shop);
});

module.exports = {
  registerShop,
  //   sendWelcomeMail,
  getShop,
};
