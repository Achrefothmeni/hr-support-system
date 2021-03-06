const mailer = require('nodemailer')
const express = require('express')
const schedule = require('node-schedule')
const Activity = require('../models/activity')

const router = express.Router()
const {
  isAuthenticatedUser,
  authorizedRoles,
  onlyAdmin,
} = require('../middlewares/auth')

const transporter = mailer.createTransport({
  service: 'gmail',

  auth: { user: 'noreplyhr9@gmail.com', pass: '13051998mf' },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
})

router.post('/email', isAuthenticatedUser, async (req, res) => {
  const { subject, content, email } = req.body
  const options = {
    from: process.env.SMTP_FROM_EMAIL,
    to: email,
    subject: subject,
    text: content,
  }
  transporter.sendMail(options, (err, info) => {
    try {
      if (err) throw new Error(err)
      else res.json(info.response)
    } catch (error) {
      res.status(500).json(err)
    }
  })
})

router.post('/schedule', isAuthenticatedUser, async (req, res) => {
  const { description, email, url, day, profile } = req.body
  const day1 = new Date(day)
  //day1.setHours(day1.getHours() + 1)

  const options = {
    from: process.env.SMTP_FROM_EMAIL,
    to: email,
    subject: 'Important :Planed Meet',
    text: `You have an important meet with ${req.user.name} ${
      req.user.admin ? 'manager' : 'HR agent'
    } of ${
      req.user.organisationName
    } in 10 minutes here is the meet link : ${url}.\n${
      description && 'Description :' + description
    }`,
  }
  const options1 = {
    from: process.env.SMTP_FROM_EMAIL,
    to: email,
    subject: 'Important :Planed Meet',
    text: `You have an important meet with ${req.user.name} ${
      req.user.admin ? 'manager' : 'HR agent'
    } of ${req.user.organisationName} Now here is the meet link : ${url}.\n${
      description && 'Description :' + description
    }`,
  }

  try {
    const meet = profile
      ? await Activity.create({
          type: 'planed-meet',
          email,
          description,
          url,
          planedFor: day1,
          user: req.user._id,
          cancelled: false,
          profile,
        })
      : await Activity.create({
          type: 'planed-meet',
          email,
          description,
          url,
          planedFor: day1,
          user: req.user._id,
          cancelled: false,
        })
    const rule = new schedule.RecurrenceRule()
    const dia = new Date(day1)
    rule.year = dia.getFullYear()
    rule.month = dia.getMonth()
    rule.date = dia.getDate()
    rule.hour = dia.getHours()
    rule.minute = dia.getMinutes() - 10
    rule.second = 0
    const job = schedule.scheduleJob(`${meet._id}1st`, rule, function () {
      transporter.sendMail(options)
    })
    const rule1 = new schedule.RecurrenceRule()
    rule1.minute = dia.getMinutes()

    rule1.year = dia.getFullYear()
    rule1.month = dia.getMonth()
    rule1.date = dia.getDate()
    rule1.hour = dia.getHours()
    rule1.second = 0

    const job1 = schedule.scheduleJob(`${meet._id}2nd`, rule1, function () {
      transporter.sendMail(options1)
    })
    res.json({ meet })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
router.put('/schedule/:id', isAuthenticatedUser, async (req, res) => {
  try {
    const jobs = schedule.scheduledJobs[`${req.params.id}1st`]
    const jobs1 = schedule.scheduledJobs[`${req.params.id}2nd`]
    jobs.cancel()
    jobs1.cancel()
    const meet = await Activity.findById(req.params.id)
    meet.cancelled = true
    meet.save()
    res.json({ msg: 'meet canceled' })
  } catch (error) {
    console.log(error)

    res.status(500).json(error)
  }
})

router.get('/meets', isAuthenticatedUser, async (req, res) => {
  try {
    const meets = await Activity.find({
      user: req.user._id,
      type: 'planed-meet',
      cancelled: false,
    }).sort({
      createdAt: -1,
    })

    res.json({ meets })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router
