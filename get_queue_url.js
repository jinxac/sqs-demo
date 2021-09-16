// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Set the region 
AWS.config.update({region: AWS.config.region});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2020-09-16'});

var params = {
  QueueName: 'SDK_QUEUE'
};

sqs.getQueueUrl(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});