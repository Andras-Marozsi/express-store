"use strict";
const logger = require("../helpers/logger").logger.createLogger('util.js');
let fs = require('fs');
let pathHelper = require('path');
let pathSeparator = pathHelper.sep;

/**
 * Utility class to store helper functions.
 *
 * @class Helper
 *
 */
class Helper {

  /**
   * Saves the data into the provided file(path)
   * @param path of the file to store the data
   * @param data data to be stored
   */
  static storeData(path, data) {
    path = pathHelper.resolve(path);
    logger.info('Storing data to: ' + path);
    if (typeof data == 'object') {
      data = JSON.stringify(data);
    }
    this.createFolderStructure(path);
    fs.writeFileSync(path, data);
  };

  /**
   * Checks if the given file/folder exists
   * @param path
   * @returns {boolean}
   */
  static checkFile(path) {
    path = pathHelper.resolve(path);
    logger.debug('Checking data file: ' + path);

    if (fs.existsSync(path)) {
      logger.debug('Data file found: ' + path);
      return true;
    } else {
      logger.debug('Data file NOT found: ' + path);
      return false;
    }
  };

  /**
   * Reads the content of given file
   * @param path
   */
  static readFile(path) {
    path = pathHelper.resolve(path);
    logger.debug('Checking data file: ' + path);

    return fs.readFileSync(path, 'utf8');
  };

  /**
   * Create the folder structure for the provided path
   * @param completePath The complete path of the file (can be just the folder structure as well)
   */
  static createFolderStructure(completePath) {
    var path = '';
    completePath.split(pathSeparator).map(function (folder) {
      if (folder == '.') {
        path += folder + pathSeparator;
      } else if (folder.indexOf('.') == -1) {
        path += folder + pathSeparator;
        try {
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
          }
        } catch (ex) {
          logger.error("There was an exception during the creation of the '" + path + "' folder: " + ex);
        }
      }
    });
  };

}

module.exports = Helper;
