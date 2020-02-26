const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const decrypt = require('../crypto/decryption');
const encrypt = require('../crypto/encryption');
const resp = require('../bin/response');
const Error = require('../bin/error');
const error = new Error('Something went wrong', 403);
require('dotenv').config();

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const data = decrypt.dataDecryption(req.body.registrationData);
  User.findOne({email: data.email}).then(user => {
    if (user) {
      return res.status(400).json({error: 'Email already exists'});
    } else {
      const newUser = new User({
        email: data.email,
        mobile: data.mobile,
        password: data.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              resp.sendResponse(
                res,
                200,
                'registration/success',
                'User registration successful',
                'Success',
              ),
            )
            .catch(err => error);
        });
      });
    }
  });
});

// @route   GET api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const data = decrypt.dataDecryption(req.body.userData);
  const email = data.email;
  const password = data.password;

  // Find user by email
  User.findOne({email}).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {id: user.id, email: user.email}; // Create JWT Payload
        jwt.sign({payload}, keys.secretOrKey, (err, token) => {
          const dataToSend = encrypt.dataEncryption(
            JSON.stringify({
              success: true,
              token: 'Bearer ' + token,
            }),
          );
          res.json(dataToSend);
        });
      } else {
        return res.status(400).json({error: 'Password incorrect'});
      }
    });
  });
});

// @route   GET api/user/logout
// @desc    Logout User
// @access  Public
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({});
});

router.get('/connect', (req, res, next) => {
  //res.writeHead(200, {clientKey: process.env.clientKey});
  res.setHeader('clientKey', process.env.clientKey);
  res.json({});
  next();
});

module.exports = router;
