import express from 'express'
import multer from 'multer'
import * as path from 'path'
import * as elements from './elements'

const upload = multer({ dest: 'temp/' })
const app = express()

// app.use(bodyParser())

app.post('/elementalist', upload.single('source'), (req, res) => {
  let source = path.resolve(req.file.path)
  let name = req.body.name || 'unnamed'
  name += `-${req.file.filename.substr(0, 8)}`
  let element = elements.create(source, name)

  res.send(element)
})

app.get('/elementalist/elements.json', (req, res) => {
  res.send(elements.getAll())
})

// app.get('/elementalist(/*)?', (req, res) => {
//   res.send('this is a react app')
// })


app.use('/:service/*path', (req, res) => {

  res.send('reverse proxy biiiitch')
})


app.listen(8081, () => console.log('server online'))