const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [100, 'Your name cannot exceed 100 charachers'],
    },
    organisationName: {
      type: String,
      required: [true, 'Please enter your organisation name'],
      maxLength: [100, 'Your name cannot exceed 100 charachers'],
    },

    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email adress'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Your password must be longer than 6 characters'],
      //when display dont show password
      select: false,
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Please enter your phone number'],
    },
    avatar: {
      public_id: {
        type: String,
        //required: true
      },
      url: {
        type: String,
        //required: true
      },
    },
    baned: {
      type: Boolean,
      default: false,
      required: false,
    },
    admin: {
      type: Boolean,
      default: false,
      required: true,
    },
    manager: {
      ref: 'Users',
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

//encrypting password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//return JWT
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  })
}

//generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  //generate getJwtToken
  const resetToken = crypto.randomBytes(20).toString('hex')
  //hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  //set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

  return resetToken
}

module.exports = mongoose.model('User', userSchema)
