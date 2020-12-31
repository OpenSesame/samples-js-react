const okta = require("@okta/okta-sdk-nodejs");
const dotenv = require("dotenv");
dotenv.config();

const client = new okta.Client({
  orgUrl: process.env.ORG_URL,
  token: process.env.TOKEN,
});

module.exports = client;
