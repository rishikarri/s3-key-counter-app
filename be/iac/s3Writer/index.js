const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({}); // Use default AWS credentials and region

exports.handler = async (event) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME, // Replace with your S3 bucket name
      Key: 'data.json' // Replace with the desired file name in S3
    };

    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    const data = JSON.parse(await response.Body.transformToString()); // Read and parse the object from S3

    const numberOfKeys = Object.keys(data).length; 

    return {
      statusCode: 200,
      body: JSON.stringify({ numKeys: numberOfKeys })
    };

  } catch (err) {
    console.error('Error reading from S3:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error reading from S3', error: err.message })
    };
  }
};