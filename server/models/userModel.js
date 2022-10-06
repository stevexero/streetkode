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
      // required: [true, 'please choose a source of sign up'],
      enum: ['email', 'google'],
    },
    memberType: {
      type: String,
      // required: [true, 'Please select a membership type'],
      enum: ['guest', 'seller'],
      default: 'guest',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
