var express = require('express');
var AWS = require('aws-sdk');

var router = express.Router();

/* hello */
router.get('/', function(req, res, next) {
  return res.status(200).json({
    message: "hello",
  });

});


/* AWS keys */
router.get('/config', function(req, res, next) {
  return res.status(200).json({
    message: "config",
    'AWS_REGION': AWS.config.region,
    "AWS_ACCESS_KEY_ID": process.env.AWS_ACCESS_KEY_ID,
    "AWS_SECRET_ACCESS_KEY": process.env.AWS_SECRET_ACCESS_KEY.substr(0, 4) + "...",
    "BUCKET": process.env.BUCKET
  });

});


/* Env keys */
router.get('/env', function(req, res, next) {
  return res.status(200).json({
    environment: process.env
  });

});


module.exports = router;