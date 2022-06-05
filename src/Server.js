const express = require('express');
const bodyParser = require('body-parser')
const AppConfig = require('../config/config')
const CompanyRouter = require('./router/Company.router')
const Employeerouter = require('./router/Employee.router')
const TokenHandler = require('./utils/tokenHandler/token')
class Server {
    expressApp = express()

    router = express.Router()

    companyRouter
    employeeRouter
    appConfigObj
    tokenHandler
    constructor() {
        this.appConfigObj = new AppConfig();
        this.tokenHandler = new TokenHandler()
        this.companyRouter = new CompanyRouter()
        this.employeeRouter = new Employeerouter()
        this.employeeRouter.routes()
        this.companyRouter.routes()
        this.config()
        this.routes()
    }

 config() {
        // express middleware

        this.expressApp.use(
          bodyParser.urlencoded({ extended: true, limit: '15mb' }),
        );
        this.expressApp.use(bodyParser.json({ limit: '50mb' }));
    
   /*      this.expressApp.use(compression());
        this.expressApp.use(helmet()); */
    
        this.expressApp.use((request, response, next) => {
          const userData = request.body && request.body.userData;
          if (userData) {
            delete request.body.userData;
            request.userData = userData;
          }
    
          response.header('Access-Control-Allow-Origin', '*');
          response.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
          );
          next();
        });
      
      }
     
      

    routes(){
        const appProperties = this.appConfigObj.getApplicationProperties()
        const appVersion = appProperties.version

        //Router for Company Service
    
        this.expressApp.use(`/v${appVersion}/company`,this.companyRouter.router)
        this.expressApp.use(`/v${appVersion}/employee`,this.employeeRouter.router)
    }
}
module.exports = new Server().expressApp