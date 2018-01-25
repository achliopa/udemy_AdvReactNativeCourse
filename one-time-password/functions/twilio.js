const twilio = require('twilio');
const tokens = require('./tokens');

module.exports = new twilio.Twilio(tokens.accountSid,tokens.authToken);