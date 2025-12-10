import mongoose from 'mongoose'

const ElectionSchema = mongoose.Schema({
    name:{ type: String, required: true},
    position:{ type: String, required: true},
    desc:{ type: String, required: true},
    start:{ type: Date, required: true},
    end:{ type: Date, required: true},
    statue: { type: Boolean, },
    completed: {type: Boolean, default: false},
    candidates: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Candidates'
        }
    ]
},

{timestamps:true})



export default mongoose.model('Elections',ElectionSchema)