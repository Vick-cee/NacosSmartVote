import mongoose from 'mongoose'

const UseraccountSchema = mongoose.Schema({
    email:{ 
        type: String, 
        required: true, 
        unique: true
    },

    password:{ 
        type: String, 
        required: true
    },

    matric:{ 
        type: String, 
        unique: true, 
        default: null 
    },

    username:{ 
        type: String, 
        required: true
    },

    course:{ 
        type: String, 
        required: true
    },

    statue: {
        type: String,
        enum: ['pending', 'verified'],
        default:'pending'
    }
})



export default mongoose.model('Useraccount',UseraccountSchema) 