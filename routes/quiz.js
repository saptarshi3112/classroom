const express = require('express');
const router = express.Router();

const Quiz = require('../models/Quiz');

router.post('/addNewQuiz', (req, res) => {
  const body = req.body;
  if (!body) {
    res.json("BODY404");
  } else {

    const {
      name,
      statement,
      classroom
    } = body;



  }
});

module.exports = router;
