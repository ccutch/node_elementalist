const express = require('express')
import backend from 'elementalist-backend/src/app'
// import frontend from 'elementalist-frontend/app'

const port = process.env.PORT || 8080
const app = express()

app.use('/elementalist-api', backend)
// app.use('/elementalist', backend)

app.listen(port, () => console.log(`Elementalist running at 0.0.0.0:${port}`))
