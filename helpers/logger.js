// ----------------- Logger -----------------
var winston = require('winston'),
  fs = require('fs'),
  logDir = 'log',
  logger = {},
  offset = new Date().getTimezoneOffset() * 60000,
  timeStamp = (new Date(Date.now() - offset)).toISOString().slice(0, -5).replace('T', '_').replace(/:/g, '-');

try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
} catch (ex) {
  console.log("There was an exception during the creation of the '" + logDir + "' folder: " + ex);
}

logger.globalLogger = new (winston.Logger)(loggerSettings('globalLogger'));

logger.createLogger = function (label) {
  winston.loggers.add(label, loggerSettings(label));
  return winston.loggers.get(label);
};

function loggerSettings(label) {
  return {
    transports: [
      new (winston.transports.Console)({
        level: process.env.CONSOLE_LOG_LEVEL || 'debug',
        colorize: process.env.CONSOLE_LOG_COLOR || 'all',
        label: label,
        timestamp: function () {
          return (new Date(Date.now() - offset)).toISOString().slice(0, -1).replace('T', '_');
        }
      }),
      new (winston.transports.File)({
        filename: process.env.LOG_FILE_FOR_EXECUTION || "./" + logDir + "/" + "log_" + timeStamp + ".log",
        timestamp: true,
        maxsize: 1024 * 1024 * 10, // 10MB
        label: label,
        level: process.env.FILE_LOG_LEVEL || 'debug'
      })
    ]
  }
}

module.exports.logger = logger;
