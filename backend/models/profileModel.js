const mongoose = require('mongoose')
const profileSchema = mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
    },
    positions: [
        {
            title: { type: String , required: true }, 
            date: { type: Date , required: true }, 
            company: { type: String , required: true }, 
        }
    ],
    skills: [
        {
            name: { type: String , required: true }, 
  
        }
    ],
  

},{
    timestamps: true
})


const Profile = mongoose.model('Profile' ,profileSchema)

export default Profile