const express = require('express')
const conf = require('./config')
const routerApi = require('./routes/index')
const cors = require('cors');
const {
  errorHandler,
  logErrors,
  boomErrorHandler
} = require('./middlewares/error.handlers')

const whiteList = [
  'http://localhost:3000',
  'http://localhost:8080'
]
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("not allowed"))
    }
  }
}
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('-- Hello world from my express server')
})

app.get('/Home', (req, res) => {
  res.send('-- Home')
})

routerApi(app)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(conf.port, () => {
  console.log("--- Server run in port:", conf.port)
})
