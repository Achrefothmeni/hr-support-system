const express = require('express')

const router = express.Router()
const {
  isAuthenticatedUser,
  authorizedRoles,
  onlyAdmin,
} = require('../middlewares/auth')
const Profile = require('../models/profileModel')
const SelectedProfile = require('../models/selectedProfile')

router.post('/selections', async (req, res) => {
  const { profile, to, addedBy } = req.body

  try {
    const selected = await SelectedProfile.create({
      to,
      profile,
      addedBy,
    })

    res.json({ selected })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.post('/events/:id', async (req, res) => {
  const {
    title,

    color,
  } = req.body

  try {
    //add user test condition
    const selected = await SelectedProfile.findById(req.params.id)
    if (!selected) res.status(404).json({ error: 'Profile not found !' })
    selected.events.push({ title, color })
    const saved = await selected.save()
    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.delete('/events/:id', async (req, res) => {
  try {
    //add user test condition
    const selected = await SelectedProfile.findOne({
      'events._id': req.params.id,
    })
    if (!selected) res.status(404).json({ error: 'Profile not found !' })
    selected.events.splice(
      selected.events.findIndex((i) => i._id == req.params._id),
      1
    )
    const saved = await selected.save()
    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.post('/notes/:id', async (req, res) => {
  const {
    note,

    by,
  } = req.body

  try {
    //add user test condition
    const selected = await SelectedProfile.findOne({
      'events._id': req.params.id,
    })
    if (!selected) res.status(404).json({ error: 'Profile not found !' })
    selected.events.map((e) => {
      if (e._id == req.params.id)
        e.notes.push({
          note,

          by,
        })
    })
    const saved = await selected.save()
    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.post('/ratings/:id', isAuthenticatedUser, async (req, res) => {
  const { rate } = req.body

  try {
    //add user test condition

    const selected = await SelectedProfile.findOne({
      'events._id': req.params.id,
    })
    if (!selected) res.status(404).json({ error: 'Profile not found !' })
    selected.events.map((e) => {
      if (e._id == req.params.id)
        e.ratings.push({
          rate,

          by: req.user._id,
        })
    })

    const saved = await selected.save()
    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.put('/ratings/:id1/:id', isAuthenticatedUser, async (req, res) => {
  const { rate } = req.body

  try {
    //add user test condition
    const selected = await SelectedProfile.findOne({
      'events._id': req.params.id1,
      'events.ratings._id': req.params.id,
    })
    if (!selected) res.status(404).json({ error: 'Rating not found !' })
    selected.events[
      selected.events.findIndex((i) => i._id == req.params.id1)
    ].ratings.map((e) => {
      if (e._id == req.params.id) {
        e.rate = rate
      }
    })
    const saved = await selected.save()
    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
router.delete('/ratings/:id1/:id', async (req, res) => {
  const { rate } = req.body

  try {
    //add user test condition
    const selected = await SelectedProfile.findOne({
      'events.ratings._id': req.params.id,
      'events._id': req.params.id1,
    })
    if (!selected) res.status(404).json({ error: 'Rating not found !' })
    const x = selected.events.findIndex((i) => i._id == req.params.id1)
    selected.events[x].ratings.splice(
      selected.events[x].ratings.findIndex((i) => i._id == req.params.id),
      1
    )
    const saved = await selected.save()
    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.delete('/notes/:id1/:id', async (req, res) => {
  try {
    //add user test condition
    const selected = await SelectedProfile.findOne({
      'events._id': req.params.id1,
      'events.notes._id': req.params.id,
    })
    if (!selected) res.status(404).json({ error: 'Note not found !' })

    const x = selected.events.findIndex((i) => i._id == req.params.id1)
    selected.events[x].notes.splice(
      selected.events[x].notes.findIndex((i) => i._id == req.params.id),
      1
    )

    const saved = await selected.save()

    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.put('/notes/:id1/:id', async (req, res) => {
  const { note } = req.body

  try {
    //add user test condition
    const selected = await SelectedProfile.findOne({
      'events._id': req.params.id1,
      'events.notes._id': req.params.id,
    })
    if (!selected) res.status(404).json({ error: 'Note not found !' })
    selected.events[
      selected.events.findIndex((i) => i._id == req.params.id1)
    ].notes.map((e) => {
      if (e._id == req.params.id) e.note = note
    })
    const saved = await selected.save()
    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.get('/selection/:id', isAuthenticatedUser, async (req, res) => {
  try {
    const selected = await SelectedProfile.find({
      to: req.params.id,
    })
    selected.profile = await Profile.findById(selected.profile)
    res.json({ selected })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router
