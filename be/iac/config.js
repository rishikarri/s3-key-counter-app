// running node config.js - gets connected to aws account
// to change aws account - update aws config file 
const AWS = require('aws-sdk');
// console.log('hi')

// Configure the SDK globally

AWS.config.update({
    region: 'us-east-1', // Replace with your desired region
  });
  
  // Create an S3 client
  const s3 = new AWS.S3();
  
  // Example: List all buckets
  s3.listBuckets((err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });