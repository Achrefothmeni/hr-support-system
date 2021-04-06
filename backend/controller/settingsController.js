import SettingsModel from '../models/settingsModel.js'
export const getSettings = async (req , res) => {
  /*
    try {
        const allSettings = await SettingsModel.find()
        console.log( allSettings)
        res.status(200).json(allSettings)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
    */
   console.log('THIS IS WORKING <3')
}

export const createSettings = (req , res) => {
    res.send('POST creation')
}