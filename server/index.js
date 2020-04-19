const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const city = require('./node/api/city');
const coronadata = require('./node/api/coronadata');
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(express.json({
    limit: '2mb',
    extended : true
  }))
  // Give nuxt middleware to express
  app.use(cors())
  app.use(nuxt.render)
  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
  var minutes = 5, the_interval = minutes * 60 * 1000;
  setInterval(function() {
    console.log("Collect data after 5 minute");
  }, the_interval);
}

start()
