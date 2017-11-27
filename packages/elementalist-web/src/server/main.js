const app = require('./server')
const startup = require('./startup')
const { PORT: port = 3000 } = process.env

startup.bootstrap().then(() => {
  app.listen(port, () => console.log('server is online'))
})
