const http = require('http')

http
  .createServer((req, res) => {
    if (req.url === '/shutdown') process.exit(0)
    res.end(`hello ed how are you today?`)
  })
  .listen(3000)
