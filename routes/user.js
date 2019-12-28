const express = require('express');
const router = express.Router();

const User = require('../models/User');

const {
  validateEmail,
  checkPassword,
  generateToken,
  hashPassword,
  cleanMobileNumberAndEmail
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
                    generateToken(user)
                      .then(token => {
                        res.json({
                          token: token
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
