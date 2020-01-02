const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/config');

module.exports.hashPassword = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt((err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err) {
            reject(err); 
          } else {
            resolve(hashedPassword);
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

module.exports.clearMobileNumber = mobile => {
  return new Promise((resolve, reject) => {
    if (mobile.length <= 9) {
      reject("Mobile Number invalid");
    }

    if (mobile.length === 11 && mobile[0] === '0') {
      resolve(mobile.substr(1, mobile.length-1));
    } else if (mobile.length === 12 && mobile[0] === '9' && mobile[1] === '1') {
      resolve(mobile.substr(2, mobile.length-1));
    } else if (mobile.length === 13 && mobile[0] === '+' && mobile[1] === '9' && mobile[2] === '1') {
      resolve(mobile.substr(3, mobile.length-1));
    } else {
      resolve(mobile);
    }
  });
};

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

module.exports.decodeToken = token => {
  return new Promise((resolve, reject) => {
    const decodeData = jwt.decode(token);
    if (!decodeData) {
      reject(null);
    } else {
      resolve(decodeData);
    }
  });
}
