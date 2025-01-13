const { LambdaClient, CreateFunctionCommand } = require('@aws-sdk/client-lambda');
const fs = require('fs').promises; 
const JSZip = require('jszip'); 

const lambdaClient = new LambdaClient({}); 

const filePath = 'iac/s3Readers/index.js'; // Replace with the actual path to your file

async function createLambdaFunction() {
  try {
    const data = await fs.readFile(filePath); 
    const zip = new JSZip();
    zip.file('index.js', data); 
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' }); 

    const params = {
      FunctionName: 's3-keys-length2', 
      Runtime: 'nodejs18.x', 
      Handler: 'index.handler', 
      Role: 'arn:aws:iam::443370697679:role/LambdaS3ReadRole7', // s3 reader role
      Code: {
        ZipFile: zipBuffer 
      }
    };

    const command = new CreateFunctionCommand(params);

    const response = await lambdaClient.send(command); 
    console.log('Lambda function created successfully:', response.FunctionName);

  } catch (err) {
    console.error('Error creating Lambda function:', err);
  }
}

createLambdaFunction();