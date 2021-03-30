const mongoose = require('mongoose')
const settingsSchema = mongoose.Schema({


    adress: {
      
        city: { type: String , required:true },
        postalCode: { type: String , required:true },
        country: { type: String , required:true },
    },
 
    skills: [
        {
            name: { type: String , required: true }, 
        }
    ],

        timestamps: true
    
})


const Settings = mongoose.model('Settings' ,orderSchema)

module.exports =  Settings