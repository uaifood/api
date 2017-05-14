const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const winston = require('winston')

module.exports = (app) => {
  app.use(express.static(path.join(__dirname, "public")))
  app.use(bodyParser.json())

  log = {
    stream: {
      write: message => winston.info(message)
    }
  }

  app.use((req, res, next) => {
    res.status(404)
    console.log('Not found URL: %s', req.url)
    res.send({ error: 'Not found' })
    return
  })

  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    console.log('Internal error(%d): %s', res.statusCode, err.message)
    res.send({ error: err.message })
    return
  })
}
