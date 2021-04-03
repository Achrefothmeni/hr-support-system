const mailer = require('nodemailer')
const express = require('express')
const schedule = require('node-schedule')
const router = express.Router()
const transporter = mailer.createTransport({
  service: 'hotmail',
  auth: { user: 'gachi1231@outlook.com', pass: '13051998gachi' },
})
const options = {
  from: 'gachi1231@outlook.com',
  to: 'aziv07@gmail.com',
  subject: 'email from node.js',
  text: 'you got this!',
}

router.post('/email', async (req, res) => {
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
