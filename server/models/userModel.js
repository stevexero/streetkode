const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    signupFrom: {
      type: String,
      enum: ['email', 'google'],
    },
    memberType: {
      type: String,
      enum: ['guest', 'seller'],
      default: 'guest',
    },
    verifyId: {
      type: String,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
