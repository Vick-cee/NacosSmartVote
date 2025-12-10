import mongoose from 'mongoose'

const CandiatesSchema = mongoose.Schema({
    name:{ type: String, required: true},
    position:{ type: String, required: true},
    manifesto: {type: String},
    level: {type: String},
    department:{ type: String},
    image: {type: String},
    votes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Votes', required: true}],
    electionId: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Elections', required: true
        }
    ]
},

{timestamps:true})



export default mongoose.model('Candidates',CandiatesSchema)