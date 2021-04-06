import express from 'express'
import profiles from './data/profile.js'
import dotenv from 'dotenv'
import settings from './data/settings.js'
import settingsRoutes from './routes/settingsRoutes.js'
import connectDB from './config/db.js'
import colors from 'colors'
import SettingsModel from './models/settingsModel.js'
import cors from 'cors'

dotenv.config()
connectDB()
const app = express();
import bodyParser from "body-parser"


app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.get('/api/settings',settingsRoutes)

app.get('/', (req , res ) => {
    res.send('API is running ...')
} )

app.get('/api/settings', async (req , res) => {
   
     try {
         const allSettings = await SettingsModel.find()
         console.log( allSettings)
         res.status(200).json(allSettings)
     } catch (error) {
         res.status(404).json({ message: error.message})
     }
    } )
    app.post('/api/settings/add' , async (req, res ) => {
/*
      
      const settingName = req.body.settingName;
const adr = req.body.adress;
adr.city = req.body.adress.city,
adr.postalcode=  req.body.adress.postalcode,
adr.country =  req.body.adress.country
const newSettings = new SettingsModel({settingName });
newSettings.adress.city = adr.city
newSettings.adress.postalcode = adr.postalcode
newSettings.adress.country = adr.country
newSettings.save()
.then(() => res.json('settings added!')) 
.catch(err => res.status(400).json('Error: '+err));
  */  
/*

      let adress = new Adress({
         
         _id: new mongoose.Types.ObjectId(),
         city: req.body.adress.city,
         postalcode: req.body.adress.postalcode,
         country: req.body.adress.country
       });   
   
         adress.save().then(() => {
            let setting = new SettingsModel({
               _id: new mongoose.Types.ObjectId(),
               name: req.body.name,
               adress: adress._id

            })
         })
         setting.save().then(() => {
            console.log(result)
            res.status(201).json({ message: "Settings created"
         })
         })
         */
   
       const setting = req.body
       const newSettings = new SettingsModel(setting)
       try {
          await newSettings.save()
          res.status(201).json(newSettings)
       } catch (error) {
          res.status(409).json({message: error.message})
       }
           
    })


app.get('/api/profiles', (req , res ) => {
   res.json(profiles)
} )
/*
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
*/

  const PORT =  process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT} ` .yellow.bold))