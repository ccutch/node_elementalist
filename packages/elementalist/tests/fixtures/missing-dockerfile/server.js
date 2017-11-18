const http = require('http')


http.createServer((req, res) => {
  res.end('THIS IS WORKING! :)')
}).listen(3000)