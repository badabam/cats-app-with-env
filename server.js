const app = require('./api/index')
const express = require('express')
const path = require('path')

const port = process.env.PORT || 3001
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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
