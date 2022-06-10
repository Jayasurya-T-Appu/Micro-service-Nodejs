const companyModel = require("../models/Company.model");
const TokenHandler = require("../utils/tokenHandler/token");
class CompanyTask {
  tokenHandler;
  constructor() {
    this.tokenHandler = new TokenHandler();
  }
  getAll() {
    return new Promise((resolve, reject) => {
      companyModel
        .find()
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  create(data) {
    data.role = "admin";

    return new Promise((resolve, reject) => {
      companyModel
        .create(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  update(id, data) {
    return new Promise((resolve, reject) => {
      companyModel
        .findByIdAndUpdate(id, data, { new: true })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = CompanyTask;
