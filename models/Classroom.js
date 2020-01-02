const mongoose = require('mongoose');
const schema = mongoose.Schema;

const classRoomSchema = new schema({
  name: {
    type: String
  },
  subject: {
    type: String,
    default: ''
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  creator: {
    type: schema.Types.ObjectId,
    ref: 'user'
  },
  logo: {
    type: String,
    default: ''
  },
  codeWord: {
    type: String,
    default: null
  },
  student: [
    {
      type: schema.Types.ObjectId,
      ref: 'user'
    }
  ]
});

const model = mongoose.model('classRoom', classRoomSchema);
module.exports = model;
