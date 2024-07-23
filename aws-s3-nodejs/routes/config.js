
var express = require('express');
var router = express.Router();


// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the Region 
//AWS.config.update({region: 'eu-west-3'});

//var s3 = new AWS.S3();

/* GET home page. */
router.get('/env', function(req, res, next) {

  return res.status(200).json(process.env);
});



/* GET home page. */
router.get('/aws', function(req, res, next) {

  return res.status(200).json({
    message: "config",
    'AWS_REGION': AWS.config.region,
    "AWS_ACCESS_KEY_ID": process.env.AWS_ACCESS_KEY_ID,
    "AWS_SECRET_ACCESS_KEY": process.env.AWS_SECRET_ACCESS_KEY,
    "BUCKET": process.env.BUCKET
  });

});



/* GET home page. */
router.get('/bucket', function(req, res, next) {

// Create S3 service object
s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Set the parameters for S3.getBucketCors
var bucketParams = { 
  Bucket: process.env.S3_BUCKET 
};

// call S3 to retrieve CORS configuration for selected bucket
s3.headBucket(bucketParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else if (data) {

    res.status(200).json({
      "bucket":  process.env.S3_BUCKET,
      "headBucket": data
    });
  }
});


});

module.exports = router;