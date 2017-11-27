function proxyRequest(req, res) {
  res.send('redirecting traffic')
}

module.exports = proxyRequest
