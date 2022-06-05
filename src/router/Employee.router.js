const Router = require('express').Router
const Validator = require('../Validator/validator')
const requestValidator = require('../Validator/requestValidator')
const TokenHandler = require('../utils/tokenHandler/token')
const EmployeeService = require('../Services/Employee.service')
const Errorhandler = require('../utils/error-handler/error-handler')

class EmployeeRouter {
    router 
    validator
    TokenHandler
    employeeServiceObj
    constructor() {
        this.router = new Router()
        this.validator = new Validator()
        this.TokenHandler = new TokenHandler()
        this.employeeServiceObj = new EmployeeService()

    }

    TokenVerify = (req, res, next) => {
        const authHeader = req.headers['authorization']
        if(authHeader){
            const token =authHeader && authHeader.split(' ')[1]
        const access = this.tokenHandler.verify(token)
        if( access == null){
          return res.sendStatus(401)
        }
        req.user = access.user
        next()
        }
        return res.sendStatus(401)
       }

       TokenSign = (req, res, next) => {
           console.log("req,", req.body);
          

       }
       routes() {
        this.router.get('/',this.TokenVerify,(req, res) => {
            console.log("here",req.user);
            this.employeeServiceObj.getAll(req, res)
        })
        this.router.post('/',this.validator.validateRequest.bind(
            this.validator.init(requestValidator.employeeCreate)), 
            this.TokenSign,
            (req, res)=> {
             this.employeeServiceObj.create(req,res)
        })
     }
}

module.exports = EmployeeRouter