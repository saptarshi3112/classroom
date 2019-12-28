const mongoose = require('mongoose');

const schema = mongoose.Schema;

const enrollmentSchema = new schema({});

const model = mongoose.model('enrollment', enrollmentSchema);
module.exports = model;