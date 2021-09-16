// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');



// Set the region 
AWS.config.update({region: AWS.config.region});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2020-09-16'});

var queueURL = "https://sqs.us-east-2.amazonaws.com/037286235234/SDK_QUEUE";

var params = {
 AttributeNames: [
    "SentTimestamp"
 ],
 MaxNumberOfMessages: 10,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: queueURL,
 VisibilityTimeout: 20,
 WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function(err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };
    sqs.deleteMessage(deleteParams, function(err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }
});