class AppConstants {
   static passwordPolicy = {
    small:true,
    caps:true,
    num:true,
    special:true,
    min:8
    }

     static apiMessage = {
        email: {
          'any.required': [11, 'Email is required'],
          'string.empty': [12, 'Email is not allowed to be empty'],
          'string.email': [13, 'Email must be a valid email'],
        },
        password: {
          'any.required': [14, 'Password is required'],
          'string.empty': [15, 'Password is not allowed to be empty'],
        },
        loginType: {
          'any.required': [16, 'Login type is required'],
          'any.only': [17, 'Invalid Login type'],
          'string.empty': [18, 'Login type is not allowed to be empty'],
        },
      };
}

module.exports = AppConstants