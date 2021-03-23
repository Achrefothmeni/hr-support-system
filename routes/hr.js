const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const HR = require('../models/hr')
const colors = require('colors')
const bcrypt = require('bcryptjs')
//getting all hrs

router.get('/', async (req, res) => {
  try {
    const hrs = await HR.find({}).sort({
      date: -1,
    })
    res.json({ hrs })
  } catch (error) {
    console.error(colors.red(error.message))
    res.status(500).send('server Error!')
  }
})

//add hr-agent

router.post(
  '/',

  [
    check('name', 'HR name is required!').notEmpty(),
    check('email', 'Valid HR email is required!').isEmail(),
    check('cin', 'valid cin is required').isNumeric().isLength({ min: 8 }),
    check(
      'password',
      'Password is required with at least 8 characters'
    ).isLength({ min: 8 }),
  ],

  async (req, res) => {
    console.log(colors.yellow(req.body))
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() })
    }
    const { name, email, phone, cin, password } = req.body

    try {
      let hr = await HR.findOne({ email })

      if (hr) {
        return res.status(400).json({ msg: 'Email already used!' })
      }
      if (phone) hr = new HR({ name, cin, phone, password, email })
      else hr = new HR({ name, cin, password, email })
      const salt = await bcrypt.genSalt(15)

      hr.password = await bcrypt.hash(password, salt)

      const added = await hr.save()
      res.json(added)
    } catch (error) {
      console.error(error.message)

      res.status(500).send('server error!')
    }
  }
)

router.put('/:id', async (req, res) => {
  const { name, email, phone, cin, password } = req.body

  try {
    let hrs = await HR.findById(req.params.id)
    if (!hrs) res.status(404).send('Contact not found!')

    hrs.name = name || hrs.name
    hrs.email = email || hrs.email
    hrs.phone = phone || hrs.phone
    hrs.cin = cin || hrs.cin
    if (password) {
      const salt = await bcrypt.genSalt(15)

      hrs.password = await bcrypt.hash(password, salt)
    }
    const updated = await hrs.save()
    res.json(updated)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('server error!')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const hr = await HR.findById(req.params.id)

    if (!hr) res.status(404).send('HR not found!')

    const deleted = await hr.delete()
    res.json(deleted)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('server error!')
  }
})

module.exports = router
