var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var s3 = new AWS.S3();

//hello
router.get('/', function(req, res, next) {
  return res.status(200).json({
    message: "hello",
  });

});


// bucket info 
router.get('/bucket', function(req, res, next) {

  var bucketParams = { 
    Bucket: process.env.S3_BUCKET 
  };   

  s3 = new AWS.S3({ apiVersion: "2006-03-01" });
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


router.get('/list', function(req, res, next) {

  var bucketParams = { 
    Bucket: process.env.S3_BUCKET ,
     //"Prefix": "xpto/",
     //"Delimiter": "/"
  };
   
   try {
    s3.listObjects(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else if (data) {
        res.status(200).json(data);
      }
   });

  }catch(err){
    console.log(err)

  }

});


router.post('/details', function(req, res, next) {

  const requestBody = req.body;

  var bucketParams = { 
    Bucket: process.env.S3_BUCKET ,
    Key: requestBody.key
     //"Delimiter": "/"
  };
   
   try {
    s3.headObject(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
        res.status(err.statusCode).json(err);
      } else if (data) {
        res.status(200).json(data);
      }
   });

  }catch(err){
    console.log(err)

  }

});


router.post('/upload', (req, res) => {
  // Log the files to the console
//  console.log(Object.entries( req.files));

  var files = Object.entries( req.files)

  files.forEach((ff, index) => {
   // console.log(`Current index: ${index}`);
 //   console.log(ff[1]);
    var file = ff[1]
    uploadFile(file.name, file.data)
  });



 // var {file } =  req.files;


  //console.log(file)


  // const params = {
  //   Bucket: 'test.paris.kitboga.net',
  //   Key: file.name,
  //   Body: file.data,
  // };

  // s3.upload(params, (err, data) => {
  //   if (err) {
  //     console.error('Error uploading file:', err);
  //   } else {
  //     console.log(`File uploaded successfully. ${data.Location}`);
  //   }
  // });



  // All good
  res.sendStatus(200);
});


const uploadFile = (key,data) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: data,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
    } else {
      console.log(`File uploaded successfully. ${data.Location}`);
    }
  });
}

module.exports = router;