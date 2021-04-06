import mongoose from 'mongoose'
const settingsSchema = mongoose.Schema({

    settingName: { type: String , required:true },
    
      
        city: { type: String , required:true },
        postalCode: { type: String , required:true },
        country: { type: String , required:true },
   
    
 
    skills: [
        {
            name: { type: String  }, 
        }
    ],

},{
    timestamps: true
}
)


const Settings = mongoose.model('Settings' ,settingsSchema)
export default Settings
