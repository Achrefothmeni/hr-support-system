const express = require('express')

const router = express.Router()
const {
  isAuthenticatedUser,
  authorizedRoles,
  onlyAdmin,
} = require('../middlewares/auth')
const Collection = require('../models/collection')

router.post('/collections', isAuthenticatedUser, async (req, res) => {
  const { title, notification, notifActivated } = req.body

  try {
    const collection =
      notifActivated === false
        ? await Collection.create({
            title,
            notifActivated,

            addedBy: req.user._id,
          })
        : await Collection.create({
            title,
            notifActivated,

            notification,
            addedBy: req.user._id,
          })

    res.json({ collection })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.put('/views/:id', isAuthenticatedUser, async (req, res) => {
  const { v } = req.body

  try {
    const collection = await Collection.findById(req.params.id)

    if (!collection) res.status(404).json({ error: 'Collection not found !' })
    collection.views.push({ viewer: v })
    const updated = await collection.save()

    res.json({ collection: updated })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.put('/collections/:id', isAuthenticatedUser, async (req, res) => {
  const { title, notification, notifActivated, profileURL } = req.body

  try {
    const collection = await Collection.findById(req.params.id)

    if (!collection) res.status(404).json({ error: 'Collection not found !' })
    collection.title = title || collection.title
    collection.notifActivated = notifActivated || collection.notifActivated
    collection.notification =
      notifActivated === true && notification ? notification : ''
    collection.profileURL = profileURL || collection.profileURL
    const updated = await collection.save()

    res.json({ collection: updated })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
router.get('/collections', isAuthenticatedUser, async (req, res) => {
  try {
    const collections = await Collection.find({
      addedBy: { $in: [req.user._id, req.user.manager || req.user._id] },
    }).sort({ createdAt: -1 })

    res.json({ collection: collections })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.delete('/collections/:id', isAuthenticatedUser, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id)

    if (!collection) res.status(404).json({ error: 'Collection not found !' })

    const updated = await collection.remove()

    res.json({ collection: updated })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router
