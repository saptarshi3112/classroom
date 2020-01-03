const express = require('express');
const router = express.Router();
const fs = require('fs');

const Quiz = require('../models/Quiz');
const ClassRoom = require('../models/Classroom');
const User = require('../models/User');

const zipper = require('zip-local');

// Create a new quiz for a classroom.
router.post('/addNewQuiz', (req, res) => {
  const body = req.body;
  if (!body) {
    res.json("BODY404");
  } else {

    const {
      name,
      description,
      classroom
    } = body;

    // create a quiz model and get its id /// 
    ClassRoom.findById(classroom, (err, room) => {
      if (err) {
        throw err;
      } else if (!room) {
        res.json("ROOM404");
      } else {

        Quiz.findOne({
          name: name,
          classroom: room._id
        }, (err, quiz) => {
          if (err) {
            throw err;
          } else if (quiz) {
            res.json('QUIZEXISTS');
          } else {

            let newQuiz = new Quiz({
              name: name,
              statement: description,
              classroom: room._id
            });
            
            const roomName = name+"---"+room.id+"---"+newQuiz._id;
            const quizPath = __dirname+"/../files/quizzes/";
    
            if (!fs.existsSync(quizPath+"/"+roomName)) {
              fs.mkdirSync(quizPath+"/"+roomName);
              newQuiz.location = quizPath+"/"+roomName;
    
              newQuiz.save(err => {
                if (err) {
                  throw err;
                } else {
                  res.json('QuizCreated');
                }
              });
            } else {
              res.json("Already Exists");
            }
          }
        });
      }
    })

  }
});

// Get all quizzes for a room
router.get('/getQuizzesByClassRoom/:id', (req, res) => {
  const params = req.params;
  if (!params) {
    res.json('PARAMS404');
  } else {
    Quiz.find({ classroom: params.id }, (err, quiz) => {
      if (err) {
        throw err;
      } else {
        res.json(quiz);
      }
    });
  }
});

// The submitter, classroom, quizid.
router.post('/submitQuizSolution', (req, res) => {
  const body = req.body;
  if (!body) {
    res.json('BODY404');
  } else {
    const {
      quiz,
      classroom,
      user,
      data
    } = body;

    User.findById(user, (err, user) => {
      if (err) {
        throw err;
      } else {
        ClassRoom.findById(classroom, (err, room) => {
          if (err) {
            throw err;
          } else {
            Quiz.findById(quiz, (err, quiz) => {
              if (err) {
                throw err;
              } else {
                if (!quiz.submissions.includes(user._id)) {
                  if (fs.existsSync(quiz.location)) {

                    const fileName = quiz.location+`/${user.email}---${room._id}---${quiz._id}.txt`;
                    fs.writeFileSync(fileName, data);

                    quiz.submissions.push(user._id);
                    quiz.save(err => {
                      if (err) {
                        throw err;
                      } else {
                        res.json('Written');
                      }
                    });
                    
                  } else {
                    res.json("NOPE");
                  }
                } else {
                  res.json('ALREADY GIVEN');
                }
              }
            });
          }
        });
      }
    });

  }
});

// Export all submissions for a certain quiz.
router.get('/exportFiles/quiz/:id', (req, res) => {
  const params = req.params;
  if (!params) {
    res.json('PARAMS404');
  } else {
    Quiz.findById(params.id, (err, quiz) => {
      if (err) {
        throw err;
      } else {

        zipper.zip(quiz.location, (err, zipped) => {
          if (err) {
            throw err;
          } else {
            zipped.compress();
           
            const location = __dirname+`/../files/archives/${quiz._id}.zip`;
            zipped.save(location, function(error) {
              if(!error) {
                console.log("saved successfully !");
                res.download(location);
              }
            });
          }
        });

      }
    });
  }
});

// Verify the validity of certain quizzes.
router.post('/detectSimilarity', (req, res) => {
	const body = req.body;
	if (!body) {
		res.json({
			message: 'BODY404'
		});
	} else {

		const {
			file1, 
			file2
		} = body;


	}
});

module.exports = router;

