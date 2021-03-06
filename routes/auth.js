const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  getAllUsersByName
} = require('../controllers/authController')

const {
  isAuthenticatedUser,
  authorizedRoles,
  onlyAdmin,
} = require('../middlewares/auth')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const User = require('../models/user')

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').put(resetPassword)

router.route('/logout').get(logout)

router.route('/me').get(isAuthenticatedUser, getUserProfile)

router.route('/password/update').put(isAuthenticatedUser, updatePassword)

router.route('/me/update').put(isAuthenticatedUser, updateProfile)

//admin routes

router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getAllUsers)



router.route('/admin/usersByName').get(getAllUsersByName)




router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getUserDetails)
  .put(isAuthenticatedUser, authorizedRoles('admin'), updateUser)
  .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteUser)

router.route('/hrs').get([isAuthenticatedUser, onlyAdmin], async (req, res) => {
  try {
    const users = await User.find({ manager: req.user._id, admin: false }).sort(
      {
        createdAt: -1,
      }
    )
    res.json({ users })
  } catch (error) {
    res.status(500).send('server Error!')
  }
})

router.route('/add-hr').post(
  [isAuthenticatedUser, onlyAdmin],
  catchAsyncErrors(async (req, res, next) => {
    const { name, organisationName, email, password, phoneNumber } = req.body
    const user = await User.create({
      name,
      organisationName,
      email,
      password,
      phoneNumber,
      admin: false,
      manager: req.user._id,
      //if we re adding pics
      avatar: {
        public_id: '',
        url: '',
      },
    })

    res.json({ user })
  })
)

router.route('/add-hr-test').post(
  catchAsyncErrors(async (req, res, next) => {
    const { name, organisationName, email, password, phoneNumber } = req.body
    const user = await User.create({
      name,
      organisationName,
      email,
      password,
      phoneNumber,
      admin: false,
      //if we re adding pics
      avatar: {
        public_id: '',
        url: '',
      },
    })

    res.json({ user })
  })
)

router.route('/get-hrs-test').get(
  catchAsyncErrors(async (req, res, next) => {
    const users = await User.find({ admin: false }).sort({ createdAt: -1 })

    res.json({ users })
  })
)

router.route('/ban-hr/:id').put(
  [isAuthenticatedUser, onlyAdmin],
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findOne({
        manager: req.user._id,
        _id: req.params.id,
      })
      if (!user) {
        res.status(404).json({ msg: 'HR agent not found !' })
      }
      user.baned = true
      await user.save()
      res.json({ msg: 'hr baned' })
    } catch (error) {
      console.log(error.message)
      res.status(500).send('server Error!')
    }
  })
)

router.route('/ban-hr-test/:id').put(
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findOne({
        admin: false,
        _id: req.params.id,
      })
      if (!user) {
        res.status(404).json({ msg: 'HR agent not found !' })
      }
      user.baned = true
      await user.save()
      res.status(200).json({ msg: 'hr baned' })
    } catch (error) {
      console.log(error.message)
      res.status(500).send('server Error!')
    }
  })
)

router.route('/unban-hr/:id').put(
  [isAuthenticatedUser, onlyAdmin],
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findOne({
        manager: req.user._id,
        _id: req.params.id,
      })
      if (!user) {
        res.status(404).json({ msg: 'HR agent not found !' })
      }
      user.baned = false
      await user.save()
      res.status(200).json({ msg: 'hr unbaned' })
    } catch (error) {
      console.log(error.message)
      res.status(500).send('server Error!')
    }
  })
)

router.route('/remove-hr/:id').delete(
  [isAuthenticatedUser, onlyAdmin],
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findOne({
        manager: req.user._id,
        _id: req.params.id,
      })
      if (!user) {
        res.status(404).json({ msg: 'HR agent not found !' })
      }
      const removed = await user.remove()
      res.status(200).json({ removed })
    } catch (error) {
      console.log(error.message)
      res.status(500).send('server Error!')
    }
  })
)

module.exports = router
