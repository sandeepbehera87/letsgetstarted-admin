const express = require('express');
const questions = require('./questions');
const user = require('./user');
const router = express.Router();

router.use('/questions',questions);
router.use('/user',user);

module.exports = router;
