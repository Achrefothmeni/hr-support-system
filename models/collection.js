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
    notifActivated: { type: Boolean, default: false, required: true },
    views: [
      {
        viewer: {
          ref: 'Users',
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        createdAT: { require: true, type: Date, default: new Date() },
      },
    ],

    addedBy: {
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
