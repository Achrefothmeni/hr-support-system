monggose = require('mongoose')

const HRSchema = monggose.Schema(
  {
    name: { type: String, required: true },
    cin: { type: Number, required: true, unique: true, minlength: 8 },
    phone: { type: String, required: false, unique: true, minlength: 8 },
    email: { unique: true, type: String, required: true },
    password: { type: String, required: true, minlength: 8, select: false },
    date: { type: Date, default: Date.now, required: true },
  },
  {
    timestamps: true,
  }
)

const HR = monggose.model('hr', HRSchema)

module.exports = HR
