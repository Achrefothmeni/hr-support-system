const express = require('express')
const router = express.Router()
const SettingsModel =  require('./../models/settingsModel');
const ProfileModel = require('./../models/profileModel')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')


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

   router.get('/api/profileDetail/:id', catchAsyncErrors( async (req , res,next) => {
    let id = req.params.id;
   
    const profile = await ProfileModel.findById(id)

    if (!profile) {
        
        res.status(404).json({
            error: 'profile not found'
            
          })
      }

      res.status(200).json({
        success: true,
        profile,
      })
      
     }) )


     router.get('/api/getAllProfilesByName', catchAsyncErrors( async (req , res,next) => {
        let name = req.query.name;
       
        const profiles = await ProfileModel.find({name : name})
    
        if (!profiles) {
            
            res.status(404).json({
                error: 'profile not found'
                
              })
          }
    
          res.status(200).json({
            success: true,
            profiles,
          })
          
         }) )




     
     


     router.get('/api/profiles/js', async (req , res) => {
   
      try {
          const js = await ProfileModel.find({skills:{ $elemMatch: {name: 'JavaScript'} } }).count()
          console.log( js)
          res.status(200).json(js)
      } catch (error) {
          res.status(404).json({ message: error.message})
      }
     } )
     router.get('/api/profiles/java', async (req , res) => {
   
      try {
          const java = await ProfileModel.find({skills:{ $elemMatch: {name: 'Java'  }} }).count()
          console.log( java)
          res.status(200).json(java)
      } catch (error) {
          res.status(404).json({ message: error.message})
      }
     } )
     router.get('/api/profiles/php', async (req , res) => {
   
      try {
          const php = await ProfileModel.find({skills:{ $elemMatch: {name: 'php'} } }).count()
          console.log( php)
          res.status(200).json(php)
      } catch (error) {
          res.status(404).json({ message: error.message})
      }
     } )
     router.get('/api/profiles/python', async (req , res) => {
   
      try {
          const python = await ProfileModel.find({skills:{ $elemMatch: {name: 'python' } } }).count()
          console.log( python)
          res.status(200).json(python)
      } catch (error) {
          res.status(404).json({ message: error.message})
      }
     } )
     router.get('/api/profiles/swift', async (req , res) => {
   
      try {
          const swift = await ProfileModel.find({skills:{ $elemMatch: {name: 'swift' } } }).count()
          console.log( swift)
          res.status(200).json(swift)
      } catch (error) {
          res.status(404).json({ message: error.message})
      }
     } )
     router.get('/api/profiles/android', async (req , res) => {
   
      try {
          const android = await ProfileModel.find({skills:{ $elemMatch: {name: 'android' } } }).count
     
          console.log( android)
          res.status(200).json(android)
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
