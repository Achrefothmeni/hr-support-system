const mailer = require('nodemailer')
const express = require('express')
const schedule = require('node-schedule')
const router = express.Router()
const {
  isAuthenticatedUser,
  authorizedRoles,
  onlyAdmin,
} = require('../middlewares/auth')

const transporter = mailer.createTransport({
  service: 'hotmail',
  auth: { user: 'gachi1231@outlook.com', pass: '13051998gachi' },
})

router.post('/email', async (req, res) => {
  const { subject, content, email } = req.body
  const options = {
    from: 'gachi1231@outlook.com',
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

router.post('/schedule', async (req, res) => {
  const { subject, content, email, minutes, name } = req.body
  const options = {
    from: 'gachi1231@outlook.com',
    to: email,
    subject: subject,
    text: content,
  }

  try {
    const job = schedule.scheduleJob(name, `${minutes} * * * *`, function () {
      transporter.sendMail(options)
    })

    res.json({ msg: 'mail planed' })
  } catch (error) {
    res.status(500).json(error)
  }
})
router.put('/schedule/:id', async (req, res) => {
  try {
    const jobs = schedule.scheduledJobs[req.params.id]

    jobs.cancel()
    res.json({ msg: 'mail canceled' })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
