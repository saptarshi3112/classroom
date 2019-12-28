const mongoose = require('mongoose');
const schema = mongoose.Schema;

const classRoomSchema = new schema({
  name: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  studentEnrolled: {

  },
  teacherAssigned: {

  }
});

const model = mongoose.model('classRoom', classRoomSchema);
module.exports = model;
