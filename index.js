const express = require('express')
const path = require('path')
const log = require('./libs/log')(module)
const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.get('/api', (req, res) => {
  res.send('API is running')
})

app.listen(1337, () => {
  log.info('Express server listening on port 1337')
})
