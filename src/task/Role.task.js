const RoleModel = require("../models/Role.model");

class RoleTask {
  getAll() {
    return new Promise((resolve, reject) => {
      RoleModel.find()
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }
  create(data) {
    return new Promise((resolve, reject) => {
      RoleModel.create(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      RoleModel.deleteOne({ _id: id })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => [reject(err)]);
    });
  }
}

module.exports = RoleTask;
