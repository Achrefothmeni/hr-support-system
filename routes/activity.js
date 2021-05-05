const express = require('express')
const router = express.Router()
const ActivityModel =  require('./../models/activity')

router.post('/api/activity/add' , async (req, res ) => {
    const activity = req.body.activity
    console.log(activity);
    const newActivity = new ActivityModel(activity)
    try {
      const   {profile} =  activity
        const verif = await ActivityModel.findOne({
            profile, type: "Like"
        })
        if (verif === null) {
          newActivity.type = "Like"
          newActivity.profile = activity.profile
         await newActivity.save()
         res.status(201).json(newActivity)
        }

    } catch (error) {
       res.status(409).json({message: error.message})
    }

 })
 router.route('/api/activity/delete/:id' , ).delete(async (req, res, next) => {
    
  
  try {
    console.log('aaselma')
    const   {profile} =  activity
    const activity = await ActivityModel.findOne({
      profile,
    })
    console.log('test delete react'+activity)
    if (!activity) {
      res.status(404).json({ msg: 'activity  not found !' })
    }
    const removed = await activity.remove()
    res.status(200).json({ removed })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('server Error!')
  }
})
 router.put('/api/activity/:id',async (req, res, next) => {
      try {
        const activity = await ActivityModel.findOne({
          activity: req.activity._id,
          _id: req.params.id,
        })
        if (!activity) {
          res.status(404).json({ msg: 'activity not found !' })
        }
        activity.type = "mail"
        await user.save()
        res.json({ msg: 'activity updated' })
      } catch (error) {
        console.log(error.message)
        res.status(500).send('server Error!')
      }
    })


    router.get('/api/activities', async (req , res) => {

      try {
          const allActivities = await ActivityModel.find()
          console.log( allActivities)
          res.status(200).json(allActivities)
      } catch (error) {
          res.status(404).json({ message: error.message})
      }
     } )
    module.exports = router
