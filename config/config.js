const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: path.resolve(__dirname, '../.env')});


 class Appconfig {

    mongoProperties

    constructor(){
        this.mongoProperties = {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME
        };
        this.applicationProperties = {
            name: process.env.APPLICATION_NAME,
            version: process.env.APPLICATION_VERSION,
            port: process.env.APPLICATION_PORT,
            jwtSecret: process.env.JWT_SECRET,
            jwtExp: process.env.JWT_EXP,  
    };
    this.logProperties = {
        level: process.env.LOG_LEVEL,
        directory: process.env.LOG_DIRECTORY,
      };
}
getMongoProperties(){
    return this.mongoProperties
}
getApplicationProperties() {
    return this.applicationProperties
}

getLogProperties(){
    return this.logProperties
}
static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}
module.exports = Appconfig

