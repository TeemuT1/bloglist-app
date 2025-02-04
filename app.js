const config = require('./utils/config')
const express = require('express')
const path = require('path')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to,', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(express.static(path.resolve(__dirname, './bloglist-frontend/build')))
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './bloglist-frontend/build', 'index.html'))
})

app.use(middleware.unknownEndpoint)
app.use((error, request, response, next) => {middleware.errorHandler(error, request, response, next)})

module.exports = app