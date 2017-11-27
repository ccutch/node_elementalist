const elementalist = require('elementalist')

async function bootstrap() {
  await elementalist.bootstrap()
}

function checkState(req, res, next) {
  console.log(elementalist.state)
  if (elementalist.state !== 'ready') {
    res.send(`Server is ${elementalist.state}`)
    return
  }

  next()
}

module.exports = {
  bootstrap,
  checkState
}
