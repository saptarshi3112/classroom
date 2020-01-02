const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const Assignment = require('../models/Assignment');
const Classroom = require('../models/Classroom');

/**
 * 
 * Params: Assignment Name, ClassRoom name, Creator Id,
 *         Due Date, Students Submitted.
 * 
 */

router.post('/createNewAssignment', (req, res) => {
  const body = req.body;
  if (!body) {
    res.json({
      message: 'BODY404'
    });
  } else {

    let {
      name,
      date,
      description,
      data,
      classRoom
    } = body;

    console.log(body);

    Classroom.findById(classRoom, (err, room) => {
      if (err) {
        throw err;
      } else if (!room) {
        res.json('ROOM404');
      } else {

        const roomName = `${name}---${room.name.replace(' ', '')}---${room._id}---${room.creator._id}`;
        const pathCreation = __dirname+'/../files/assignments/'+roomName;
        if (!fs.existsSync(pathCreation)) {
          fs.mkdirSync(pathCreation);

          let newAssignment = new Assignment({
            name: name,
            description: description,
            dueDate: date,
            classroom: room._id,
            location: pathCreation
          });
  
          newAssignment.save(err => {
            if (err) {
              throw err;
            } else {
              fs.writeFileSync(pathCreation+'/'+`${roomName}.txt`, data);
              res.json('DONE');
            }
          });

        } else {
          res.json('ASSIGNMENTALREADYEXISTS');
        }

      }
    });

  }
});

router.get('/getAssigmentByRoom/:id', (req, res) => {
  const params = req.params;
  if (!params) {
    res.json('PARAM404');
  } else {
     const classRoomId = req.params.id;
     Assignment.find({ classroom: classRoomId }, (err, assignment) => {
       if (err) {
         throw err;
       } else {
         res.json(assignment);
       }
     });
  }
});

router.get('/downloadAssignment/:id', (req, res) => {
  const params = req.params;
  if (!params) {
    res.json('PARAMS404');
  } else {
    const id = params.id;
    Assignment.findById(id, (err, task) => {
      if (err) {
        throw err;
      } else {
        let location = task.location.split('/');

        let name = location[location.length-1]+'.txt';

        console.log(task.location+"/"+name);

        if (fs.existsSync(task.location+"/"+name)) {
          res.download(task.location+"/"+name);
        } else {
          res.json("Nope");
        }

      }
    });
  }
});

module.exports = router;
