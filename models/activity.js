const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  planedFor: {
    type: Date,
    required: false,
  },
  user: {
    ref: 'Users',
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  contactedProfileURL: {
    type: String,
    required: false,
  },
  type: {
    type: String,

    required: true,
  },
  cancelled: { type: Boolean, required: false },
})

module.exports = mongoose.model('Activity', activitySchema)
