import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  electionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Elections",
    required: true,
  },
  
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidates",
    required: true,
  },

  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Useraccount",
    required: true,
  },

  candidateSnapshot: {
    type: Object,
    default: null
  },

  electionSnapshot: {
    type: Object,
    default: null
  },

  position: {
    type: String,
    required: true
  },

  seen: {
    type: Boolean,
    default: false
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },

});

const Votes = mongoose.model("Votes", voteSchema);
export default Votes;

