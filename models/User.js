const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true],
      lowercase: true,
      unique: true,
    },
    name: {
      type: String,
      required: [false],
      maxlength: 50,
    },
    email: {
      type: String,
      required: [false],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
    },
    avatar: {
      type: String,
      default:
        'https://gateway.pinata.cloud/ipfs/QmeK4BXjQUTNka1pRTmWjURDEGVXC7E8uEB8xUsD2DGz2c',
    },
    userInfo: {
      type: String,
      default: 'Not updated',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
