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

app.get('/kubectl', (req, res) => {
  const N_STATES = 4;
  const state = req.query.state ? Number(req.query.state) : Math.floor(Math.random() * N_STATES)

  switch (state) {
    case 1:
      // Simulate permissions error
      res.set('Content-Type', 'text/html').send(401, `<html>You do not have permission to access that content</html>`)
      break;

    case 2:
      // Simulate generic server error
      res.set('Content-Type', 'text/plain').send(500, 'Something went wrong')
      break;

    case 3:
      // Simulate timeout
      res.set('Content-Type', 'text/plain').send(504, `Unable to connect to the server: dial tcp 54.209.35.138:443: i/o timeout`)

    default:
      // Regular output
      const output = require('./kubectl');
      res.set('Content-Type', 'text/plain').send(200, output);
      break;
  }
})

database.init((err) => {
  if (err) {
    throw new Error(err)
  }
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})
