const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')

const app = express()
const http = require('http').createServer(app)

const session = expressSession({
  secret: 'argentinian dragon',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: 'None',
  },
})
app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:5174', 'http://localhost:5174', 'http://192.168.1.109:5173', 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

const mediaRoutes = require('./api/media/media.routes')

const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/media', mediaRoutes)

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
  logger.info('Server is running on localhost: ' + port)
})