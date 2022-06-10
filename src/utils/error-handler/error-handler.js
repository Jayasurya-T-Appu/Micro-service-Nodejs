const Logger = require("../Logger/logger");
const AppConstants = require("../../constants/app-constants");
const _ = require("loadsh");

const log = new Logger();

const logger = log.getInstance();

class ErrorHandler {
  getErrorMessage(model, res, err) {
    if (err === "Not Found") {
      return res.status(404).json({
        status: "Failed",
        message: `${model} Not Found`,
      });
    }

    if (err.code === 11000) {
      return res.status(409).json({
        status: "Failed",
        message: `${model} already exists.`,
      });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      if (err.message.indexOf("not a valid enum value") !== -1) {
        const keys = err.message.match(/(?!^)`.*?`/g);
        if (keys.length === 2) {
          const field = keys[1].split(".");
          let message = `${keys[0]} is not a valid value for the field ${field[0]}`;
          message = message.replace(/`/g, "");
          return res.status(500).json({
            status: "ValidationError",
            data: message,
          });
        }
      }

      return res.status(500).json({
        status: "ValidationError",
        data: err.toString().replace("ValidationError: ", "").split(", "),
      });
    }

    // 404 not found error
    if (err.name === "CastError") {
      return res.status(404).json({
        status: "Failed",
        message: `${model} Not Found`,
      });
    }

    // Default to 500 server error
    logger.error(`Error occured: ${err}`);
    return res.status(500).json({
      status: "Internal Server Error",
      message: err,
    });
  }

  static getValidationErrorMessage(errorMsg, res) {
    const { message, path, type, context } = errorMsg.details[0];
    let msg = _.capitalize(message.replace(/['"]+/g, ""));
    let code = 400;
    const errMsg = AppConstants?.apiMessage?.[path[0]]?.[type];
    if (!_.isEmpty(errMsg) && _.isArray(errMsg)) {
      [code, msg] = errMsg;
      if (path[0] === "name") {
        msg = msg.replace("{{limit}}", context.limit);
      }
    }
    return res.status(400).json({
      status: "Failed",
      errorCode: code,
      message: msg,
    });
  }
}

module.exports = ErrorHandler;
