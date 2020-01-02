const mongoose = require('mongoose');
const schema = mongoose.Schema;

const assignmentSchema = new schema({
  name: {
    type: String
  },
  dueDate: {
    type: Date,
    required: true
  },
  submittedBy: [{
    type: schema.Types.ObjectId,
    ref: 'user'
  }],
  defaulter: [{
    type: schema.Types.ObjectId,
    ref: 'user'
  }],
  classroom: {
    type: schema.Types.ObjectId,
    ref: 'classRoom'
  }
});

const model = mongoose.model('assignment', assignmentSchema);
module.exports = model;
