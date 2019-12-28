const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true
  },
  role: {
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
  password: {
    type: String,
    required: true
  }
});

const model = mongoose.model('user', userSchema);
module.exports = model;
