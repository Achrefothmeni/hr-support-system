const express = require('express')
const bodyParser = require('body-parser')
const errorMiddleware = require('./middlewares/error')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')
const auth = require('./routes/auth')
const mailingRoutes = require('./routes/emailing')
const profilesRoutes = require('./routes/profile')
const cors = require('cors')
const router = express.Router()
const cookieParser = require('cookie-parser')
const collectionRoutes = require('./routes/collection')
const selectedProfilesRoutes = require('./routes/selectedProfile')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(cors({ origin: process.env.LINK }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
try {
  io.on('connect', function (socket) {
    socket.on('userConnected', function (userId) {
      socket.join(userId)

      app.set('socketio', io)
    })
    socket.on('userDisconnected', function (userId) {
      socket.leave(userId)
    })
  })
} catch (error) {
  console.log(error)
}

const message = function (userId, data) {
  io.sockets.to(String(userId)).emit('message', data)
}

const { isAuthenticatedUser, authorizedRoles } = require('./middlewares/auth')
dotenv.config()
//connect to database
connectDatabase()
//app.get('/', (req, res) => res.send('App is working'))
app.use(errorMiddleware)
app.use(auth)
app.use('/', mailingRoutes)
app.use('/', profilesRoutes)
app.use('/', selectedProfilesRoutes)
// /me to test middleware
app.use('/', collectionRoutes)
//app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./argon-dashboard-react-master/build'))
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        'argon-dashboard-react-master',
        'build',
        'index.html'
      )
    )
  })
}

server.listen(process.env.PORT, () =>
  console.log('Application Started Working')
)
exports.message = message
