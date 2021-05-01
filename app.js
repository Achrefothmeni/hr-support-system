const express = require('express')
const bodyParser = require('body-parser')
const errorMiddleware = require('./middlewares/error')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')
const auth = require('./routes/auth')
const mailingRoutes = require('./routes/emailing')
const profilesRoutes = require('./routes/profile')
const router = express.Router()
const cookieParser = require('cookie-parser')
const collectionRoutes = require('./routes/collection')
const selectedProfilesRoutes = require('./routes/selectedProfile')
const app = express()
//const routes = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const { isAuthenticatedUser, authorizedRoles } = require('./middlewares/auth')
dotenv.config()
//connect to database
connectDatabase()
app.use(errorMiddleware)
app.get('/', (req, res) => res.send('App is working'))

app.use(auth)
app.use('/', mailingRoutes)
app.use('/', profilesRoutes)
app.use('/', selectedProfilesRoutes)
// /me to test middleware
app.use('/', collectionRoutes)
//app.use('/api', routes)

/*if (process.env.NODE_ENV === 'production') {
  app.use(express.static('argon-dashboard-react-master/build'))
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
}*/

app.listen(process.env.PORT, () => console.log('Application Started Working'))
