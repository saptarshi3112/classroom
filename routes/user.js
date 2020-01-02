const express = require('express');
const router = express.Router();

const User = require('../models/User');

const {
  checkPassword,
  generateToken,
  hashPassword,
  clearMobileNumber,
  decodeToken
} = require('../controllers/userController');

const {
  validateLoginModel,
  validateRegisterModel,
  validateUpdatePasswordModel
} = require('../validators/userValidator');

router.post('/signInUser', (req, res) => {
  const body = req.body;
  if (!body) {
    res.json({
      message: 'BODY404'
    });
  } else {
    validateLoginModel(body)
      .then(result => {
        if (result !== 'OK') {
          res.json({
            message: result
          });

        } else {
          const {
            email,
            password
          } = body;

          User.findOne({
            email: email 
          }, (err, user) => {
            if (err) {
              throw err;
            } else if (!user) {
              res.json({
                message: 'USER404'
              });
            } else {

              checkPassword(password, user.password)
              .then(match => {
                if (match) {
                  generateToken({
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    id: user._id
                  })
                    .then(token => {
                      res.json({
                        token: `Bearer ${token}`
                      });
                    })
                    .catch(err => console.error(err));
                } else {
                  res.json({
                    message: 'PASSWORDINVALID'
                  });
                }
              })
              .catch(err => console.error(err));
            }
          });
        }
      })
      .catch(err => console.error(err));
  }
});

router.post('/signUpUser', (req, res) => {
  const body = req.body;
  if (!body) {
    res.json({
      message: 'BODY404'
    });
  } else {

    validateRegisterModel(body)
    .then(result => {

      if (result !== 'OK') {
        res.json({
          message: result
        })
      } else {

        const {
          name,
          mobile,
          email, 
          password
        } = body;

        clearMobileNumber(mobile)
        .then(editMobile => {
          User.findOne({
            $or: [
              { email: email },
              { mobile: editMobile }
            ]
          }, (err, user) => {
            if (err) {
              throw err;
            } else if (user) {
              res.json({
                message: 'USERALREADYEXISTS'
              });
            } else {
              
              clearMobileNumber(mobile)
                .then(mobile => {
                  
                  let newUser = new User({
                    name: name,
                    mobile: mobile,
                    email: email
                  });

                  hashPassword(password)
                    .then(hashedPassword => {
                      newUser.password = hashedPassword;

                      newUser.save(err => {
                        if (err) {
                          throw err;
                        } else {
                          console.log(newUser);
                          generateToken({
                            name: newUser.name,
                            email: newUser.email,
                            mobile: newUser.mobile,
                            id: newUser._id
                          }).then(token => {
                            res.json({
                              token: `Bearer ${token}`
                            });
                          })
                          .catch(err => console.error(err));
                        }
                      });
                    })
                    .catch(err => console.error(err));
                })
                .catch(err => console.error(err));
            }
          });
        })
        .catch(err => console.error(err));
      }

    })
    .catch(err => console.error(err));
  }
});

router.get('/getUserDetailsFromToken', (req, res) => {
  const header = req['headers'];
  if (!header) {
    res.json({
      message: "HEADER404"
    });
  } else {
    const token = header.token;
    decodeToken(token)
    .then(data => {
      res.json({
        data: data
      });
    })
    .catch(err => console.error(err));
  }
});

router.get('/getUserDetailsFromId/:id', (req, res) => {
  const params = req['params'];
  if (!params) {
    res.json({
      message: 'BODY404'
    });
  } else {
    User.findById(params.id)
      .populate('joinedRooms')
      .populate('createdRooms')
      .exec((err, user) => {
        if (err) {
          throw err;
        } else {
          res.json({
            user: user
          });
        }
      });
  }
})

router.post('/password/updatePassword', (req, res) => {
  const body = req.body;
  if (!body) {
    res.json({
      message: 'BODY404'
    });
  } else {
    validateUpdatePasswordModel(body);
  }
});

module.exports = router;
