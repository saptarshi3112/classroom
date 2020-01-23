const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const {
  db
} = require('./config/config');

const userRouter = require('./routes/user');
const roomRouter = require('./routes/classroom');
const assignmentRouter = require('./routes/assigment');
const quizRouter = require('./routes/quiz');

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => console.log('MONGODB connected'))
.catch(err => console.error(err));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.use('/user/', userRouter);
app.use('/classroom', roomRouter);
app.use('/assignment', assignmentRouter);
app.use('/quiz', quizRouter);

const port = 5000;
app.listen(port, err => {
  if (err) {
    throw err;
  } else {
    console.log(`server on port ${port}`);
  }
});
