var express = require('express');
var router = express.Router();
var { getObject, listObjects } = require('../services/asyncServices')

var AWS = require('aws-sdk');
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Ok
router.get('/', function (req, res, next) {
  return res.status(200).json({
    message: "Ok",
  });

});


// pre configured bucket
router.get('/bucket', (req, res, next) => {

  var bucketParams = {
    Bucket: process.env.S3_BUCKET
  };

  s3.headBucket(bucketParams, function (err, data) {

    if (!err && data){
      data['Bucket'] = process.env.S3_BUCKET
    }

    handleResponse(err, data, res);
  });

});

// Buckets
router.get('/buckets', function (req, res, next) {
  s3.listBuckets({}, (err, data) => {

    var buckets = null;

    if (!err && data && data.Buckets){
      buckets = data.Buckets
    }

    handleResponse(err, buckets, res);
  });
});


//List objects
router.post('/listObjects', async (req, res, next) => {
  const requestBody = req.body;

  const bucket = requestBody.bucket;
  const prefix = requestBody.prefix;
  const delimiter = requestBody.delimiter;

  try {
    var data = await listObjects(bucket, prefix, delimiter);
    ok(res, data);

  } catch (err) {
    handleError(err, res);
  }
});


//List objects
router.post('/listObjectDetails', async (req, res, next) => {
  const requestBody = req.body;

  const bucket = requestBody.bucket;
  const prefix = requestBody.prefix;
  const delimiter = requestBody.delimiter;

  try {

    var response = {};
    var objects = [];
    var folders = [];
    var data = await listObjects(bucket, prefix, delimiter);

    if (data && data.Contents) {
      for (const item of data.Contents) {

        try {
          var details = await getObject(bucket, item.Key);
        } catch (err) {
          console.log(err);
          break;
        }

        if (details && details.ContentType) {
          const isfolder = details.ContentType.startsWith('application/x-directory');
          item['ContentType'] = details.ContentType;
          item['isfolder'] = isfolder;
          objects.push(item);
        }
      }
    }

    var hasfolders = false;
    //CommonPrefixes
    if (data && data.CommonPrefixes) {
      for (const item of data.CommonPrefixes) {
        folders.push(item.Prefix);  
        hasfolders = true;   
      }

    }

    response['objects'] = objects;
    response['folders'] = folders;
    response['hasfolders'] = hasfolders;

    ok(res, response);

  } catch (err) {
    handleError(err, res);
  }
});


//objectDetails
router.post('/objectDetails', async function (req, res, next) {
  const requestBody = req.body;
  const bucket = requestBody.bucket;
  const key = requestBody.key;

  try {
    var details = await getObject(bucket, key);
    res.status(200).json(details)

  } catch (err) {
    console.log(err);
    handleError(err, res);
  }
});


router.post('/upload', (req, res) => {
  var files = Object.entries(req.files)

  files.forEach((ff, index) => {

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


const uploadFile = (key, data) => {
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


// aux 

function handleResponse(err, data, res) {
  if (err) {
    console.log("Error", err);
    if (err && err.statusCode) {
      res.status(err.statusCode).json(err);
    } else {
      res.status(503).json(err);
    }

  } else if (data) {
    res.status(200).json(data);
  }
}

function handleError(err, res) {
  console.log("Error", err);
  if (err && err.statusCode) {
    res.status(err.statusCode).json(err);
  } else {
    res.status(503).json(err);
  }
}

function ok(res, data) {
  res.status(200).json(data);
}
module.exports = router;