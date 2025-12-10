import express from 'express'
const route = express.Router()
import Candidates from '../model/candidate.js'
import Elections from '../model/election.js'
import Votes from '../model/vote.js'
import upload from '../upload.js'
import verifyRoute from './auth.js'



route.get('/api/user/candidate', verifyRoute, async (req, res) => {

        
    try {
        
        let candidates = await Candidates.find()

        candidates = [...candidates].reverse()

        res.status(200).json({data: candidates})


    } catch(error) {

        console.log(error,'at election fetch');
        
        res.status(401).json({message:'err fetching data'})
    }

});






route.get('/api/candidate', async (req, res) => {

    
    try {

        
        const candidates = await Candidates.find().populate('electionId')

        res.status(200).json({ data: candidates })


    } catch(error) {

        console.log(error,'at election fetch');
        
        res.status(401).json({message:'err fetching data'})
    }

});











route.post('/api/candidate', upload.single('image'), async (req, res) => {

    try {
        const {name, position, manifesto, level, department, electionId} = req.body

        const imageUrl = req.file ? `/upload/${req.file.filename}` : '';
       

        const candidate = new Candidates({
            name,
            position, 
            manifesto, 
            level, 
            department, 
            image: imageUrl, 
            electionId
        })

        await candidate.save()


        await Elections.findByIdAndUpdate(electionId,{
            $push: { candidates: candidate._id}
        })

        console.log('new candidate saved');

        res.status(200).json({message:'election saved'})
        

        
    } catch (error) {

        console.log(error,'candidate');
        
        res.status(402).json({error:'err' + error})
    }
    
})









route.delete('/api/candidate/:id', async (req, res) => {

    const candidateId = req.params.id

    console.log(candidateId)

    try {

        const candidate = await Candidates.findByIdAndDelete(candidateId)

        if(!candidate) return res.status(500).json({message:'candidate not found'})

        await Elections.findByIdAndUpdate(candidate.electionId,{
            $pull:{ candidates: candidate._id}
        })
        

        res.status(200).json({message:'candidate deleted'})
        

        
    } catch (error) {

        console.log(error,'candidate');
        
        res.status(402).json({error:'err' + error})
    }
    
})

export default route