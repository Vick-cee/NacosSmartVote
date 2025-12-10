
import express from "express";
import Votes from "../model/vote.js";
import Elections from "../model/election.js";
import Candidates from "../model/candidate.js";
import verifyRoute from "./auth.js";

const route = express.Router();


route.get('/api/vote', verifyRoute, async (req, res) => {

  try {
    let vote = await Votes.find({voterId: req.user.userId})

    vote = [...vote].reverse()

    res.json({ data: vote })

  } catch (err) {

    res.json({ message:'could not fetch data' })

    console.log(err, 'at get request for vote');
    
  }

})




route.post("/api/vote", verifyRoute, async (req, res) => {

  
  try {

      const { electionId, candidateId, position } = req.body;    
      const voterId = req.user.userId


      

      const alreadyVoted = await Votes.findOne({ position, electionId, voterId });

      if (alreadyVoted) return res.status(400).json({ message: "voted" });

      const election = await Elections.findById(electionId)
      const candidate = await Candidates.findById(candidateId)

      // create new vote
      const vote = new Votes({
        electionId,
        candidateId,
        position,
        voterId,
        electionSnapshot: {
          name: election.name,
          position: election.position,
          start: election.start,
          end: election.end
        },
        candidateSnapshot: {
          name: candidate.name,
          position: candidate.position,
          image: candidate.image,
          level: candidate.level
         
        },
        seen: false

      });
      await vote.save();

      await Candidates.findByIdAndUpdate(candidateId,{
        $push:{ votes: voterId }
      })

      res.status(200).json({ message: "Vote submitted successfully", data: vote });

  } catch (error) {

      console.log(error);
      res.status(500).json({ message: "Error submitting vote" });

  }

})



route.patch('/api/vote/seen', verifyRoute, async (req, res) => {

  try {

    const { id } = req.body

    const vote = await Votes.findOneAndUpdate({voterId: req.user.userId, _id: id },{
      $set: {seen: true}
    })


    res.json({ data: vote })

  } catch (err) {

    res.json({ message:'could not fetch data' })

    console.log(err, 'at get request for vote');
    
  }

})












export default route;
