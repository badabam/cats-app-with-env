const axios = require('axios')
const express = require('express')
const path = require('path')

const app = express()
const apiKey = process.env.API_KEY

const sendAxiosError = (res) => (error) =>
  res.status(error.response.status || 500).json(error.response.data)

app.get('*', (req, res, next) => {
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  next()
})

app.get('/api/cats/random', (req, res) => {
  axios
    .get('https://api.thecatapi.com/v1/images/search')
    .then((result) => {
      res.json(result.data)
    })
    .catch(sendAxiosError(res))
})

app.get('/api/cats/:image_id/vote/:direction', (req, res) => {
  const { image_id, direction } = req.params
  const value = direction === 'up' ? 1 : 0

  axios
    .post('https://api.thecatapi.com/v1/votes', {
      image_id,
      value,
    })
    .then((result) => {
      res.json(result.data)
    })
    .catch(sendAxiosError(res))
})

app.get('/api/cats/breeds', (req, res) => {
  axios
    .get('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': apiKey,
      },
    })
    .then((result) => {
      console.log(result.data.length)
      res.json(result.data)
    })
    .catch(sendAxiosError(res))
})

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

module.exports = app
