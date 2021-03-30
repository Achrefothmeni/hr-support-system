const express = require('express')
require('dotenv').config()
//const connectDB = require('./db.js')
const colors = require('colors/safe')
const app = express()
const hrsRoutes = require('./routes/hr')

//connectDB(process.env.DB)
app.use(express.json({ extended: false }))

app.get('/api', (req, res) => res.json({ msg: 'welcome to ur endpoint!' }))
app.use('/api/hrs', hrsRoutes)
const port = process.env.PORT || 5000
app.listen(port, () =>
  console.log(colors.green('server started on PORT :' + port))
)
