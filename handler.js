'use strict';

const axios = require('axios');
const AWS = require('aws-sdk');

const ssm = new AWS.SSM();

const request = {
  Name: '/verification/slack/webhook/sugaya'
}


module.exports.postSlack = async (event, context) => {
  
  // const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
  const message = "v3";
  
  try {
    const parameterStore = await ssm.getParameter(request).promise();
    const slackWebhookUrl = parameterStore.Parameter.Value
    console.log("slackWebhookUrl")
    console.log(slackWebhookUrl)
    //リクエスト送信
    await axios.post(slackWebhookUrl, { text: message });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Slackの通知に成功しました',
        input: event,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Slackの通知に失敗しました。',
        input: event,
      }),
    };
  }
};