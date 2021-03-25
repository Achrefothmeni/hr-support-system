monggose = require('mongoose')

const ActivitySchema = monggose.Schema(
  {
    type: { type: String, required: true },
    hr: { ref: 'HR', type: monggose.Schema.Types.ObjectId, required: true },
    profile: { type: String },
  },
  {
    timestamps: true,
  }
)

const Activity = monggose.model('Activity', ActivitySchema)

module.exports = Activity
