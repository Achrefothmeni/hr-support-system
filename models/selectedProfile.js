const mongoose = require('mongoose')

const selectedSchema = mongoose.Schema(
  {
    profile: {
      ref: 'Profile',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    to: {
      ref: 'Collection',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    events: [
      {
        title: {
          type: String,
          required: true,
        },
        color: { type: String, required: true },
        notes: [
          {
            note: {
              type: String,
              required: true,
              by: {
                ref: 'User',
                type: mongoose.Schema.Types.ObjectId,
                required: true,
              },
            },
          },
          { timestamps: true },
        ],
        ratings: [
          {
            rate: { type: Number, required: true },
            by: {
              ref: 'User',
              type: mongoose.Schema.Types.ObjectId,
              required: true,
            },
          },
          { timestamps: true },
        ],
      },
      { timestamps: true },
    ],

    addedBy: {
      ref: 'Users',
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('SelectedProfile', selectedSchema)
