const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY_2);

const User = require('../models/userModel');

// @desc    Register a user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, signupFrom } = req.body;

  //   Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  //   Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //   Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   Create user
  const user = await User.create({
    name,
    email,
    memberType: 'guest',
    password: hashedPassword,
    signupFrom,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      memberType: user.memberType,
      signupFrom: user.signupFrom,
      shop: user.shop,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Send Welcome Email
// @route   /api/users/welcome
// @access  Public
const sendWelcomeMail = asyncHandler(async (req, res) => {
  const { email, name } = req.body;

  const msg = {
    to: email,
    from: 'accountservices@dillynote.com', // Change after I get StreetKode email set up
    subject: 'Welcome to StreetKode!',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<div>
              <h1>Hello ${name}!</h1>
              <h2>Welcome to StreetKode!</h2>
              <p>We're excited to have you here and hope to provide the tools you need to unleash your creativity!</p>
              <p>If you have any feedback, questions, or comments at all, please <a href="mailto:kylokyoshi@gmail.com">email</a> me!</p>
              <p>Sincerely,</p>
              <p>- Kylo Kyoshi</p>
            </div>`,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      memberType: user.memberType,
      signupFrom: user.signupFrom,
      shop: user.shop,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('invalid credentials');
  }
});

// @desc    Get Current User
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    memberType: req.user.memberType,
    shop: req.user.shop,
  };

  res.status(200).json(user);
});

// @desc    Update user
// @route   /api/users
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const { userId, memberType, shop } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: { memberType: memberType, shop: shop },
    },
    { new: true }
  );

  res.status(200).json(user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  sendWelcomeMail,
  getMe,
  updateUser,
};
