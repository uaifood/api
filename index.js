const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.get('/api', (req, res) => {
  res.send('API is running')
})

app.listen(1337, () => {
  console.log('Express server listening on port 1337')
})
