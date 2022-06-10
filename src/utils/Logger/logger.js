const AppConfig = require("../../../config/config");

const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");

class Logger {
  instance;

  static Level = {
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
  };

  level;

  logger;

  getInstance() {
    if (!this.instance) {
      this.instance = this;
    }
    return this.instance;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    const logConfig = AppConfig.getInstance().getLogProperties();

    //log Level
    console.log();
    switch (logConfig.level) {
      case "error":
        Logger.LEVEL = Logger.Level.ERROR;
        break;
      case "warn":
        Logger.LEVEL = Logger.Level.WARN;
        break;
      case "info":
        Logger.LEVEL = Logger.Level.INFO;
        break;
      case "debug":
        Logger.LEVEL = Logger.Level.DEBUG;
        break;
      default:
        Logger.LEVEL = Logger.Level.INFO;
        break;
    }

    //log Directory

    const logDirectory = logConfig.directory;

    const options = {
      exitOnError: false,
      level: logConfig.defaultLevel,
      format: format.json(),
      defaultMeta: { service: "Scipi-enterprice-api" },
      transports: [
        new transports.DailyRotateFile({
          name: "error-file",
          filename: `${logDirectory}/error-%DATE%.log`,
          datePattern: "YYYY-MM-DD-HH",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
          showLevel: true,
          timestamp: true,
          level: "error", // error and below to rotate
          levelOnly: true,
        }),
        new transports.DailyRotateFile({
          name: "all-file",
          filename: `${logDirectory}/all-%DATE%.log`,
          datePattern: "YYYY-MM-DD-HH",
          zippedArchive: true,
          maxSize: "40m",
          maxFiles: "7d",
          showLevel: true,
          timestamp: true,
        }),
      ],
    };
    this.logger = createLogger(options);
    if (process.env.NODE_ENV === "development") {
      this.logger.add(new transports.Console(), {
        colorize: true,
        showLevel: true,
        timestamp: true,
        level: "error", // error and below to console
      });
    }
  }
  error(msg) {
    if (Logger.LEVEL >= Logger.Level.ERROR) {
      this.logger.error(msg);
    }
  }
  warn(msg) {
    if (Logger.LEVEL >= Logger.Level.WARN) {
      this.logger.warn(msg);
    }
  }
  info(msg) {
    if (Logger.LEVEL >= Logger.Level.INFO) {
      this.logger.info(msg);
    }
  }
  debug(msg) {
    if (Logger.LEVEL >= Logger.Level.DEBUG) {
      this.logger.debug(msg);
    }
  }
}

module.exports = Logger;
