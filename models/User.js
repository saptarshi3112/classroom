const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  dateOfJoining: {
    type: Date,
    default: Date.now()
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
  joinedRooms: [{
    type: schema.Types.ObjectId,
    ref: 'classRoom'
  }],
  createdRooms: [{
    type: schema.Types.ObjectId,
    ref: 'classRoom'
  }]
});

const model = mongoose.model('user', userSchema);
module.exports = model;
