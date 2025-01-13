

const AWS = require('aws-sdk');

const iam = new AWS.IAM();

const roleName = 'LambdaS3ReadRole7'; 
const bucketArn = process.env.BUCKET_NAME 

const createRoleParams = {
  RoleName: roleName,
  AssumeRolePolicyDocument: JSON.stringify({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  })
};

iam.createRole(createRoleParams, (createRoleError, createRoleData) => {
  if (createRoleError) {
    console.error("Error creating IAM role:", createRoleError);
  } else {
    console.log("IAM role created successfully:", createRoleData.Role.Arn);

    const policyDocument = JSON.stringify({
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "s3:GetObject"
          ],
          "Resource": [
            `${bucketArn}/*` // Allows reading of objects within the bucket
          ]
        }
      ]
    });

    const createPolicyParams = {
      PolicyName: `${roleName}-S3WritePolicy`,
      PolicyDocument: policyDocument
    };

    iam.createPolicy(createPolicyParams, (createPolicyError, createPolicyData) => {
      if (createPolicyError) {
        console.error("Error creating policy:", createPolicyError);
      } else {
        console.log("Policy created successfully:", createPolicyData.Policy.Arn);

        const attachPolicyParams = {
          RoleName: roleName,
          PolicyArn: createPolicyData.Policy.Arn
        };

        iam.attachRolePolicy(attachPolicyParams, (attachError, attachData) => {
          if (attachError) {
            console.error("Error attaching policy to role:", attachError);
          } else {
            console.log("Policy attached successfully:", attachData);
          }
        });
      }
    });
  }
});