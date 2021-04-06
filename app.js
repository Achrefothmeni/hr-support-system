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

const app = express()
//const routes = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const { isAuthenticatedUser, authorizedRoles } = require('./middlewares/auth')

app.get('/', (req, res) => res.send('App is working'))

app.use(auth)
app.use('/', mailingRoutes)
app.use('/', profilesRoutes)
// /me to test middleware

//app.use('/api', routes)

dotenv.config({ path: 'config/config.env' })

//connect to database
connectDatabase()
app.use(errorMiddleware)

app.listen(5000, () => console.log('Application listening on port 5000!'))
