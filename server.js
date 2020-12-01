const app = require('./api/index')
const port = process.env.PORT || 3001
const express = require('express')
const path = require('path')

// Handle React routing, return all requests to React app
app.use(express.static(path.join(__dirname, 'client/build')))

// Serve any static files
app.use(
  '/storybook',
  express.static(path.join(__dirname, 'client/storybook-static'))
)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

app.use('*', (err, req, res, next) => {
  res.status(404).send(`Nothing found on path ${req.url}.`)
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
