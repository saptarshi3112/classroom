const mongoose = require('mongoose');
const schema = mongoose.Schema;

const quizSchema = new schema({
  name: {
    type: String
  },
  statement: {
    type: String
  },
  location: {
    type: String
  },
  classroom: {
    type: schema.Types.ObjectId,
    ref: 'classRoom'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  submissions: [{
    type: schema.Types.ObjectId,
    ref: 'user'
  }]
});

const model = mongoose.model('quiz', quizSchema);
module.exports = model;
