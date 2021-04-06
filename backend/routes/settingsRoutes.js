import  express from 'express'
import {getSettings , createSettings} from '../controller/settingsController.js'
const router = express.Router()
router.get('/',getSettings)


export default router