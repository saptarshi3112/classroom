validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email));
}

validateMobile = mobile => {
  var re = /^$/g;
  return true;
}


module.exports.validateLoginModel = model => {
  return new Promise((resolve, reject) => {
    const {
      email,
      password
    } = model;
  
    let errors = {
      emailError: null,
      passwordError: null
    };

    if (email.length > 0) {
      if (validateEmail(email)) {
        errors.emailError = "Email address not valid"
      }
    } else {
      errors.emailError = "Email field blank"
    }

    if (password.length > 0) {
      errors.passwordError = "Password field blank"
    }

    if (errors.emailError || errors.passwordError) {
      resolve(errors); 
    } else {
      resolve('OK');
    }
    
    reject(null);
  });

}

module.exports.validateRegisterModel = model => {
  const {
    name,
    password,
    email,
    mobile
  } = model;

  let errors = {
    nameError: null,
    mobileError: null,
    emailError: null,
    passwordError: null
  };

  if (name.length <= 0) {
    errors.nameError = "Name field blank";
  } if (password.length <= 0) {
    errors.passwordError = "Password field blank";
  }

  if (mobile.length > 0) {
    if (validateMobile(mobile)) {
      errors.mobileError = "Mobile address not valid"
    }
  } else {
    errors.mobileError = "Mobile field blank"
  }

  if (email.length > 0) {
    if (validateEmail(email)) {
      errors.emailError = "Email address not valid"
    }
  } else {
    errors.emailError = "Email field blank"
  }

  if (errors.nameError || errors.passwordError || errors.emailError || errors.mobileError) {
    resolve(errors); 
  } else {
    resolve('OK');
  }

  reject(null);

}

module.exports.updatePasswordModel = model => {
  return new Promise((resolve, reject) => {});
}
