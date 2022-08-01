const { createHmac } = require('crypto');

var aws = require('aws-sdk');
require('dotenv').config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'ap-south-1', // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const S3_BUCKET = process.env.Bucket;
// Now lets export this function so we can call it from somewhere else
const sign_s3 = async (req, res) => {
  const s3 = new aws.S3(); // Create a new instance of S3

  const { fileType, fileName } = req.body;

  const time = new Date().getTime().toString();
  const ip = req.socket.remoteAddress.toString();

  const str = `${fileName}${ip}${time}`;

  const hmac = createHmac('sha256', process.env.JWT_SECRET);
  const randomID = hmac.update(str).digest('base64url');

  const Key = `${randomID}.${fileType}`;
  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read',
  };
  s3.getSignedUrlPromise('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${Key}`,
    };
    // Send it all back
    res.json({ success: true, data: { returnData } });
  });
};

module.exports = sign_s3;
