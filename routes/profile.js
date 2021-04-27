const express = require('express')
const router = express.Router()
const SettingsModel =  require('./../models/settingsModel');
const ProfileModel = require('./../models/profileModel')

router.get('/api/settings', async (req , res) => {
   
    try {
        const allSettings = await SettingsModel.find()
        console.log( allSettings)
        res.status(200).json(allSettings)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
   } )

   router.get('/api/profiles', async (req , res) => {
   
      try {
          const allProfiles = await ProfileModel.find()
          console.log( allProfiles)
          res.status(200).json(allProfiles)
      } catch (error) {
          res.status(404).json({ message: error.message})
      }
     } )

   
   router.post('/api/settings/add' , async (req, res ) => {   
      const setting = req.body
      console.log(setting);
      const newSettings = new SettingsModel(setting)
      try {
         await newSettings.save()
         res.status(201).json(newSettings)
      } catch (error) {
         res.status(409).json({message: error.message})
      }
          
   })


   router.post('/api/profile/add' , async (req, res ) => {   
      const profile = req.body
      
      const newProfile = new ProfileModel(profile)
      try {
         await newProfile.save()
         res.status(201).json(newProfile)
      } catch (error) {
         res.status(409).json({message: error.message})
      }
          
   })

module.exports = router
