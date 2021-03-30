const express = require("express");
const profiles =  require('./data/profile')
const dotenv = require('dotenv')
const settings =  require('./data/settings')
const connectDB = require('./config/db')
const colors = require('colors')
dotenv.config()
connectDB()
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', (req , res ) => {
    res.send('API is running ...')
} )

app.get('/api/profiles', (req , res ) => {
   res.json(profiles)
} )

app.get('/api/profiles/:id', (req , res ) => {
    const profile = profiles.find( p => p._id.$oid ===req.params.id)
    res.json(profile)
 } )
 app.get('/api/settings', (req , res ) => {
    res.json(settings)
 } )
 app.get('/api/settings/:id', (req , res ) => {
    const setting = settings.find( p => p._id.$oid ===req.params.id)
    res.json(setting)
 } )

//AJOUT SETTINGS
 app.post('/api/settings/add', (req, res) => {
    res.send(req.body);
  })


  const PORT =  process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT} ` .yellow.bold))