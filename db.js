const mongoose = require('mongoose')
const colors = require('colors')
const connectDB = async (db) => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    console.log(colors.green('connected to ur DB'))
  } catch (err) {
    console.log(colors.red(err.message))
    process.exit(1)
  }
}

module.exports = connectDB
