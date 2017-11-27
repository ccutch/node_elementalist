const express = require('express')
const startup = require('./startup')
const routes = require('./routes')
const proxyService = require('./proxy-service')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('../../webpack.config')

const app = express()
const { NODE_ENV: env = 'development' } = process.env
const compiler = webpack(config)

if (env !== 'production') {
  app.use(
    '/_elem/',
    webpackDevMiddleware(compiler, {
      hotOnly: true,
      inline: true
    })
  )
}

// Serve static files, aka react app
app.use('/_elem/', express.static('public'))

app.use(startup.checkState)
// Serve api supporting react app
app.use('/_elem/api', routes)
app.use(proxyService)

// app.listen(port, () => console.log('server is online'))
module.exports = app
