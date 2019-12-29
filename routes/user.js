const express = require('express');
const router = express.Router();

const User = require('../models/User');

const {
  checkPassword,
  generateToken,
  hashPassword,
  clearMobileNumber
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
                      role: user.role,
                      email: user.email,
                      mobile: user.mobile
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
            role,
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
                      email: email,
                      role: role
                    });
  
                    hashPassword(password)
                      .then(hashedPassword => {
                        newUser.password = hashedPassword;
  
                        newUser.save(err => {
                          if (err) {
                            throw err;
                          } else {
                            generateToken({
                              name: newUser.name,
                              role: newUser.role,
                              email: newUser.email,
                              mobile: newUser.mobile
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
