const express = require('express')
const app = express()
const routes = require('../../routes');

app.use(routes);
module.exports = {
  path: '/api',
  handler: app
}