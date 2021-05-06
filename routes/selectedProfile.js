const express = require('express')

const router = express.Router()
const {
  isAuthenticatedUser,
  authorizedRoles,
  onlyAdmin,
} = require('../middlewares/auth')
const Profile = require('../models/profileModel')
const SelectedProfile = require('../models/selectedProfile')
const user = require('../models/user')

router.post('/selections', isAuthenticatedUser, async (req, res) => {
  const { profile, to } = req.body

  try {
    const selected = await SelectedProfile.create({
      to,
      profile,
      addedBy: req.user._id,
    })

    res.json({ selected })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.post('/events/:id', isAuthenticatedUser, async (req, res) => {
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

    const info = await Profile.findById(selected.profile)
    selected.profile = info

    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.delete('/events/:id', isAuthenticatedUser, async (req, res) => {
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

    const info = await Profile.findById(saved.profile)
    saved.profile = info

    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.post('/notes/:id', isAuthenticatedUser, async (req, res) => {
  const { note } = req.body

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

          by: req.user._id,
        })
    })
    const saved = await selected.save()

    const info = await Profile.findById(saved.profile)
    saved.profile = info

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
    console.log(saved)
    const info = await Profile.findById(saved.profile)
    saved.profile = info

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
    const info = await Profile.findById(selected[0].profile)
    selected[0].profile = info
    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
router.delete('/ratings/:id1/:id', isAuthenticatedUser, async (req, res) => {
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

router.delete('/notes/:id1/:id', isAuthenticatedUser, async (req, res) => {
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

    const info = await Profile.findById(saved.profile)
    saved.profile = info

    res.json({ selected: saved })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.put('/notes/:id1/:id', isAuthenticatedUser, async (req, res) => {
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
    const info = await Profile.findById(selected[0].profile)
    selected[0].profile = info
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

    const info = await Profile.findById(selected[0].profile)
    selected[0].profile = info
    res.json({ selected })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router
