const Errorhandler = require("../utils/error-handler/error-handler");
const RoleTask = require("../task/Role.task");
class RoleService {
  roleTaskObj = new RoleTask();
  errorHandler = new Errorhandler();

  getAll(req, res) {
    this.roleTaskObj
      .getAll()
      .then((result) => {
        res.status(200).json({
          status: "OK",
          message: "All roles fetched",
          resultData: result,
        });
      })
      .catch((err) => {
        this.errorHandler.getErrorMessage("Role", res, err);
      });
  }

  create(req, res) {
    this.roleTaskObj
      .create(req.body)
      .then((result) => {
        res.status(201).json({
          status: "OK",
          message: " Role created succesfully",
          resultData: result,
        });
      })
      .catch((err) => {
        this.errorHandler.getErrorMessage("Role", res, err);
      });
  }

  delete(req, res) {
    this.roleTaskObj
      .delete(req.params.id)
      .then((result) => {
        res.status(201).json({
          status: "OK",
          message: "Role Deleated",
          resultData: result,
        });
      })
      .catch((err) => {
        this.errorHandler.getErrorMessage("Role", res, err);
      });
  }
}

module.exports = RoleService;
