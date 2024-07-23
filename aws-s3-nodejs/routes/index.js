var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.status(200).json({
    message: "hello",
  });

});


/* GET home page. */
router.get('/config', function(req, res, next) {

  return res.status(200).json({
    message: "config",
    'AWS_REGION': AWS.config.region,
    "AWS_ACCESS_KEY_ID": process.env.AWS_ACCESS_KEY_ID,
    "AWS_SECRET_ACCESS_KEY": process.env.AWS_SECRET_ACCESS_KEY.substr(0, 4),
    "BUCKET": process.env.BUCKET
  });

});

module.exports = router;