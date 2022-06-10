const CompanyTask = require("../task/Company.task");
const Errorhandler = require("../utils/error-handler/error-handler");
class ConpanyService {
  companyTaskObj = new CompanyTask();
  errorHandler = new Errorhandler();

  getAll(req, res) {
    this.companyTaskObj
      .getAll()
      .then((result) => {
        res.status(200).json({
          status: "OK",
          message: "All Companies Fetched",
          resultData: result,
        });
      })
      .catch((err) => console.log(err));
  }

  create(req, res) {
    this.companyTaskObj
      .create(req.body)
      .then((result) => {
        res.status(201).json({
          status: "OK",
          message: "Company registered succesfully",
          resultData: result,
        });
      })
      .catch((err) => {
        this.errorHandler.getErrorMessage("Company", res, err);
      });
  }

  update(req, res) {
    this.companyTaskObj
      .update(req.params.id, req.body)
      .then((result) => {
        res.status(201).json({
          status: "OK",
          message: "Company detailes updated succesfully",
          resultData: result,
        });
      })
      .catch((err) => {
        this.errorHandler.getErrorMessage("Company", res, err);
      });
  }
}

module.exports = ConpanyService;
