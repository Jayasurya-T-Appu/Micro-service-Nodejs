const Router = require("express").Router;
const Validator = require("../Validator/validator");
const requestValidator = require("../Validator/requestValidator");
const TokenHandler = require("../utils/tokenHandler/token");
const companyService = require("../Services/Company.service");
class CompanyRouter {
  router;
  validator;
  tokenHandler;
  constructor() {
    this.router = new Router();
    this.validator = new Validator();
    this.companyServiceobj = new companyService();
    this.tokenHandler = new TokenHandler();
  }

  TokenVerify = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const access = this.tokenHandler.verify(token);
    if (access == null) {
      return res.sendStatus(401);
    }
    req.user = access.user;
    next();
  };

  TokenSign = (req, res, next) => {
    const Sign = this.tokenHandler.sign(req.body);
  };

  routes() {
    this.router.get("/", this.TokenVerify, (req, res) => {
      console.log("here", req.user);
      this.companyServiceobj.getAll(req, res);
    });
    this.router.post(
      "/",
      this.validator.validateRequest.bind(
        this.validator.init(requestValidator.companyCreate)
      ),
      (req, res) => {
        this.companyServiceobj.create(req, res);
      }
    );
    this.router.put(
      "/id/:id",
      this.validator.validateRequest.bind(
        this.validator.init(requestValidator.companyUpdate)
      ),
      (req, res) => {
        this.companyServiceobj.update(req, res);
      }
    );
  }
}

module.exports = CompanyRouter;
