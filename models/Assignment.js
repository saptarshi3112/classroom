const mongoose = require('mongoose');
const schema = mongoose.Schema;

const assignmentSchema = new schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  classroom: {
    type: schema.Types.ObjectId,
    ref: 'classRoom'
  },
  location: {
    type: String
  },
  done: {
    type: Boolean,
    default: false
  }
});

const model = mongoose.model('assignment', assignmentSchema);
module.exports = model;
