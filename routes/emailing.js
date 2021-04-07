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

router.post('/email', isAuthenticatedUser, async (req, res) => {
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
  transporter.sendMail(options, (err, info) => {
    try {
      const job = schedule.scheduleJob(
        `${req.body.minutes} * * * *`,
        function () {
          transporter.sendMail(options, (err, info) => {
            if (err) throw new Error(err)
          })
        }
      )
      res.json({ msg: 'mail planed' })
    } catch (error) {
      res.status(500).json(err)
    }
  })
})

module.exports = router
