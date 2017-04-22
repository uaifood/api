const express = require('express')
const path = require('path')
const log = require('./libs/log')(module)
const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.get('/api', (req, res) => {
  res.send('API is running')
})

app.use((req, res, next) => {
  res.status(404)
  log.debug('Not found URL: %s', req.url)
  res.send({ error: 'Not found' })
  return
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  log.error('Internal error(%d): %s', res.statusCode, err.message)
  res.send({ error: err.message })
  return
})

app.listen(1337, () => {
  log.info('Express server listening on port 1337')
})
