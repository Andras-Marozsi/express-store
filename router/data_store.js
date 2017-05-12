const logger = require("../helpers/logger").logger.createLogger('data_store');
const helper = require("../helpers/util");
var fs = require('fs');
var express = require('express');
var router = express.Router();
var dataPath = './data/storage/';
var dataExtension = '.data';

router.get('/:fileName([a-zA-Z0-9_]+)/', function (req, res) {
  logger.info("Request for getting data: " + req.params.fileName);
  var data;
  if (helper.checkFile(dataPath + req.params.fileName + dataExtension)) {
    logger.debug("Found data: " + req.params.fileName);
    data = helper.readFile(dataPath + req.params.fileName + dataExtension);
    res.status(200)
  } else {
    logger.error('Data not found!');
    data = "No data";
  }
  res.send(data);
});

router.post('/:fileName([a-zA-Z0-9_]+)/', function (req, res) {
  logger.info("Request for storing data: " + req.params.fileName);
  try {
    if (typeof req.body !== 'string') {
      logger.debug(JSON.stringify(req.body));
    }
  } catch (ex) {
    logger.debug("Couldn't stringify the data to store, logging as is:");
    logger.debug(req.body);
  }
  helper.storeData('./data/storage/' + req.params.fileName + dataExtension, req.body);
  res.send("Successfully stored data '" + req.params.fileName + "'");
});

module.exports = router;
