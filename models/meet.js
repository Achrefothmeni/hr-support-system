const mongoose = require('mongoose')

const meetSchema = mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  planedFor: {
    type: Date,
    required: true,
  },
  user: {
    ref: 'Users',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

module.exports = mongoose.model('Meet', meetSchema)
