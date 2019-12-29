const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const {
  db
} = require('./config/config');

const userRouter = require('./routes/user');

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', err => {
  if (err) {
    throw err;
  } else {
    console.log('mongodb running');
  }
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.use('/user/', userRouter);

const port = 5000;
app.listen(port, err => {
  if (err) {
    throw err;
  } else {
    console.log(`server on port ${port}`);
  }
});
