const { Router } = require('express')
const { elements } = require('elementalist')
const multer = require('multer')
const path = require('path')
const targz = require('targz')

const upload = multer({ dest: '/tmp/elementalist' })
const router = Router()

// Get all elements
router.get('/elements', (req, res) => {
  res.send(elements.getAll())
})

// Create new element
router.post('/elements', upload.single('source'), (req, res) => {
  let filepath = path.resolve(req.file.path)

  targz.decompress(
    {
      src: filepath,
      dest: filepath + '-dir'
    },
    err => {
      let source = filepath + '-dir'

      let name = req.body.name || 'unnamed'
      name += `-${req.file.filename.substr(0, 8)}`
      // let element = elements.createAsync(source, name)
      let element = elements.createAsync(source, name)

      res.send(element)
    }
  )
})

module.exports = router
