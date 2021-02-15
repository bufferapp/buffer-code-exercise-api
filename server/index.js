const express = require('express')
const database = require('./database')
const { getClusterPods, getRandomFailureState, failureStates } = require('./cluster')

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

app.get('/cluster/status.json', (req, res) => {
  const force = req.query.force
  const failureState = force && force in failureStates ? force : getRandomFailureState()
  const isForced = force && force in failureStates
  console.log(`cluster/status.json - ${isForced ? 'Forced ' : ''}Failure state: ${failureState}`)
  if (failureState === failureStates.Unauthenticated) {
    return res.status(403).json({
      status: 'error',
      message: 'Endpoint authentication failure',
    })
  }
  res.json({
    status: 'success',
    pods: getClusterPods(failureState),
  })
})

database.init((err) => {
  if (err) {
    throw new Error(err)
  }
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})
