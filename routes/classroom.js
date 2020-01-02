const express = require('express');
const router = express.Router();

const User = require('../models/User');
const ClassRoom = require('../models/Classroom');

/** 
 *  Method to create a new classroom using 
 *  the creators email, a code will be generated
 *  that the students can use to join in the classroom.
 * 
*/
router.post('/createNewClassRoom', (req, res) => {
  const body = req.body;
  if (!body) {
    res.json({
      message: 'BODY404'
    });
  } else {
    let  {
      name,
      subject,
      creatorID,
      logo
    } = body;

    User.findById( creatorID, (err, user) => {
      if (err) {
        throw err;
      } else {

        console.log(user);

        ClassRoom.findOne({
          name: name,
          creator: user._id
        }, (err, room) => {
          if (err) {
            throw err;
          } else if (room) {
            res.json({
              message: 'ROOMALREADYEXISTS'
            });
          } else {

            if (!subject) {
              subject = "";
            } if (!logo) {
              logo = "";
            }

            let newRoom = new ClassRoom({
              name: name,
              subject: subject,
              creator: user._id,
              logo: logo
            });

            user.createdRooms.push(newRoom._id);
            user.save(err => {
              if (err) {
                throw err;
              } else {
                newRoom.codeWord = newRoom._id;
                newRoom.save(err => {
                  if (err) {
                    throw err;
                  } else {
                    res.json('SAVED');
                  }
                });
              }
            })
          }
        });
      }
    });
  }
});

/**
 * Method to join a new classroom using a token given by the student and 
 * the id of the student who will join the classroom.
 */
router.post('/joinNewClassroom', (req, res) => {
  const body = req.body;
  if (!body) {
    res.json('BODY404');
  } else {
    const {
      classCode,
      userId
    } = body;

    ClassRoom.findOne({ codeWord: classCode }, (err, room) => {
      if (err) {
        throw err;
      } else {
        if (!room) {
          res.json({
            message: 'ROOM404'
          });
        } else {
          if (userId != room.creator) {
            User.findById(userId, (err, user) => {
              if (err) {
                throw err;
              } else {
                if (!room.student.includes(user._id)) {
                  room.student.push(user._id);
                  user.joinedRooms.push(room._id);
                  user.save(err => {
                    if (err) {
                      throw err;
                    } else {
                      room.save(err => {
                        if (err) {
                          throw err;
                        } else {
                          res.json({
                            message: 'JOINEDROOM'
                          });
                        }
                      });
                    }
                  });
                } else {
                  res.json({
                    message: 'ALREADYJOINED'
                  });
                }
              }
            });
          } else {
            res.json({
              message: 'CREATORCANNOTJOIN'
            });
          }
        }
      }
    });

  }
});

/**
 * Method to get all the classrooms for the user.
 * 
*/
router.get('/getClassRoomForUser/:id', (req, res) => {
  const params = req.params;
  if (!params) {
    res.json({
      message: 'PARAM404'
    });
  } else {

  }
});

/**
 * 
 * Get all the rooms where the user,
 * is a teacher and the user is a student.
 * 
 */

router.get('/getAllClassroomsForUser/:id', (req, res) => {
  const params = req.params;
  if (!params) {
    res.json({
      message: 'PARAM404'
    });
  } else {
    
    var totalRooms = [];

  }
});

/**
 *  Method to get all details of a classroom.
 *  Populate the classroom method to get deatils of the teacher as well as the teacher.
*/
router.get('/getClassRoomDetails/:id', (req, res) => {
  const params = req.params;
  if (!params) {
    res.json({
      message: 'PARAM404'
    });
  } else {
    ClassRoom.findOne({ _id: params.id })
    .populate('creator')
    .populate('student')
    .exec((err, classroom) => {
      if (err) {
        throw err;
      } else {
        res.json({
          classroom: classroom
        });
      }
    });
  }
});

module.exports = router;
