const mongoose = require('mongoose')

const collectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    notification: {
      type: String,
      required: false,
    },
    notifActivated: { type: Boolean, required: true },
    views: [listSchema],

    addedBy: {
      ref: 'Users',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    contactedProfileURL: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const listSchema = mongoose.Schema(
  {
    viewer: {
      ref: 'Users',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Collection', collectionSchema)
