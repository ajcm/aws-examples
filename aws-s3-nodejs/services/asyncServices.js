// Async S3 functions
var AWS = require('aws-sdk');
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });


async function listObjects(bucket, prefix, delimiter) {
    let promise = new Promise(function (resolve, reject) {

        var bucketParams = {
            Bucket: bucket,
            Delimiter: delimiter,
            Prefix: prefix
        };

        s3.listObjectsV2(bucketParams, (err, data) => {

            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        });

    });
    return promise
}

async function getObject(bucket, key) {
    let promise = new Promise(function (resolve, reject) {

        var bucketParams = {
            Bucket: bucket,
            Key: key
        };

        s3.headObject(bucketParams, function (err, data) {

            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        });

    });
    return promise
}


module.exports = { listObjects, getObject }