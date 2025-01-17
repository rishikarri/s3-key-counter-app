const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");

const region = 'us-east-1'; 

const s3Client = new S3Client({ region });

const listBuckets = async () => {
  try {
    const command = new ListBucketsCommand({});
    const data = await s3Client.send(command); 
    console.log("Success", data.Buckets);
  } catch (err) {
    console.log("Error", err);
  }
};

listBuckets();