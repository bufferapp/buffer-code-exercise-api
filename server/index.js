const express = require('express')
const database = require('./database')

const app = express()
const PORT = 8888

app.set('json spaces', 2)

app.get('/', (req, res) => {
  res.json({ status: 'awesome' })
})

app.get('/getTweets', (req, res) => {
  const ids = req.query.ids ? req.query.ids.split(',') : []
  const tweets = ids.map(id => database.getById('tweets', id))
  res.json(tweets)
})

database.init((err) => {
  if (err) {
    throw new Error(err)
  }
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})
