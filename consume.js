const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const https = require('https');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/037286235234/SDK_QUEUE',
  handleMessage: async (message) => {
    console.log("testing", message);
    // do some work with `message`
  },
  sqs: new AWS.SQS({
    httpOptions: {
      agent: new https.Agent({
        keepAlive: true
      })
    }
  })
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();