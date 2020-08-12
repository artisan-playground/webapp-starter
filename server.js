const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const pkg = require('./package.json')
const version = pkg.version

const app = express()

//add other middleware
app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).send(`Welcome to webapp-starter api v${version}`)
})

app.get('/api/test-cases', (req, res) => {
  res.json([
    {
      name: '006 PORTAL - cancel an order',
      fail: 0,
      success: 10,
      total: 10,
    },
    {
      name: '007 PORTAL - cancel an order',
      fail: 0,
      success: 10,
      total: 10,
    },
  ])
})

//start app
const port = process.env.PORT || 4000

app.listen(port, () => console.log(`App is listening on port ${port}.`))
