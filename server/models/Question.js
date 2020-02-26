const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  questionData: Object,
});

module.exports = Question = mongoose.model(
  'questions',
  QuestionSchema,
  'questions',
);
