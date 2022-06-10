const Router = require("express").Router;
const Validator = require("../Validator/validator");
const requestValidator = require("../Validator/requestValidator");
const RoleServiceObj = require("../Services/Role.service");

class RoleRouter {
  router;
  Validator;

  constructor() {
    this.router = new Router();
    this.validator = new Validator();
    this.roleServiceOj = new RoleServiceObj();
  }

  routes() {
    this.router.get("/", (req, res) => {
      this.roleServiceOj.getAll(req, res);
    });

    this.router.post(
      "/",
      this.validator.validateRequest.bind(
        this.validator.init(requestValidator.createRole)
      ),
      (req, res) => {
        this.roleServiceOj.create(req, res);
      }
    );

    this.router.delete("/id/:id", (req, res) => {
      this.roleServiceOj.delete(req, res);
    });
  }
}

module.exports = RoleRouter;
