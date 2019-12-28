const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/config');

module.exports.validateEmail = email => {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject("Email invalid")
    } else {
      if (email.length <= 0) {
        resolve("Email length is 0");
      } else {
        const emailRegex = new RegExp(email, 'g');
        resolve('OK');
      }
    }
  });
}

module.exports.hashPassword = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt((err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err); 
          } else {
            resolve(hash);
          }
        })
      }
    });
  });
}

module.exports.checkPassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) {
        reject(err);
      } else {
        resolve(match);
      }
    });
  });
}

module.exports.generateToken = user => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({
      ...user,
      password: null
    }, config.secret);
    if (token) {
      resolve(token);
    } else {
      reject(null);
    }
  });
}
