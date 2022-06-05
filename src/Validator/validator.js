 const Errorhandler = require('../utils/error-handler/error-handler')
 class Validator {
    validator
  
    init(Schema) {
      this.validator = Schema;
      return this;
    }
  
    getRequestData(req) {
      let reqData;
      const { method } = req;
      const { path } = req.route;
      switch (method) {
        case 'POST':
        case 'PUT':
          reqData = req.body;
          break;
        case 'GET':
        case 'DELETE':
          reqData = (path === '/' || path === '/id/:id') ? req.query : req.params;
          break;
        default:
          reqData = req.body;
      }
  
      return reqData;
    }
  
    validateRequest(req, res, next) {
      const reqData = this.getRequestData(req);
      const r = this.validator.validate(reqData);
      if (r.error) {
       
        Errorhandler.getValidationErrorMessage(r.error, res)
      } else {
        next();
      }
    }
  }
  module.exports = Validator