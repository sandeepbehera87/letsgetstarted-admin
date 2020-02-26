const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Question = require('../models/Question');
const decrypt = require('../crypto/decryption');
const encrypt = require('../crypto/encryption');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['api-token'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

router.get('/getAllQuestions', verifyToken, function(req, res) {
  const isSessionActive = sessionChecker(req);
  if (isSessionActive) {
    jwt.verify(req.token, keys.secretOrKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        Question.find()
          .then(result => {
            const data = encrypt.dataEncryption(JSON.stringify(result));
            res.json(data);
          })
          .catch(err => {
            console.log(err);
            res.status(404).json({noquestionsfound: 'No questions found'});
          });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

router.post('/addQuestion', verifyToken, (req, res) => {
  const isSessionActive = sessionChecker(req);
  if (isSessionActive) {
    jwt.verify(req.token, keys.secretOrKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const data = decrypt.dataDecryption(req.body.data);
        const newQuestion = new Question({
          questionData: data.questionData,
        });
        newQuestion
          .save()
          .then(response => res.json(response))
          .catch(err => console.log(err));
      }
    });
  } else {
    res.sendStatus(401);
  }
});

const sessionChecker = req => {
  if (req.cookies.aasanbul) {
    return true;
  }
};

module.exports = router;
