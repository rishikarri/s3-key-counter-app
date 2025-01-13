const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({}); // Use default AWS credentials and region


exports.handler = async (event) => {
  try {
    console.log('event', event);

    const reqBodyData = JSON.parse(event.body) // TODO: add validation to make sure incoming event is valid JSON
    const data = reqBodyData.payload

    const params = {
      Bucket: process.env.BUCKET_NAME, // Replace with your S3 bucket name
      Key: 'data.json', // Replace with the desired file name in S3
      Body: JSON.stringify(data) 
    };

    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    console.log('Successfully uploaded data to S3:', response); 
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data has been uploaded to S3 successfully', event })
    };

  } catch (err) {
    console.error('Error uploading to S3:', err);
    throw err; 
  }
};