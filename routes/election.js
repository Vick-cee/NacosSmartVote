import express from 'express'
const route = express.Router()
import Elections from '../model/election.js'
import Candidate from '../model/candidate.js'
import verifyRoute from './auth.js'





route.get('/api/election', async (req, res) => {
    
    try {

       
        const now = new Date()
        let elections = await Elections.find()

        elections = [...elections].reverse()

        
        for(const election of elections) {

            if(election.statue === true && now >= election.end) {
                election.completed = true
            }

            else{
                election.completed = false
            }

            await election.save()
        }

        res.status(200).json({data: elections})
        
       

    } catch(error) {

        console.log(error,'at election fetch');
        
        res.status(401).json({message:'err fetching data'})
    }

})









route.get('/api/election/poll', async (req, res) => {

    try {

        
        const elections = await Elections.find().populate('candidates')

        res.status(200).json({ data: elections })


    } catch(error) {

        console.log(error,'at election fetch');
        
        res.status(401).json({message:'err fetching data'})
    }

});






route.post('/api/election', async (req, res) => {

    try {
        const {name, position, desc, start, end, statue } = req.body
        

        const election = new Elections({
            name, position, desc, start, end, statue 
        })

        await election.save()

        console.log('new election saved');

        res.status(200).json({message:'election saved'})
        

        
    } catch (error) {

        console.log(error,'election');
        
        res.status(402).json({error:'err' + error})
    }
    
})



route.delete('/api/election/:id', async (req, res) => {

    const electionId = req.params.id


    try {

        await Candidate.deleteMany({ electionId })
        
        const deletElection = await Elections.findOneAndDelete({_id: electionId})



        if(!deletElection) {
            return res.status(200).json({message:'unable to delete'})
        }

        res.status(200).json({message:'delete succesful'})


        
    } catch (error) {

        console.log(error,'election');
        
        res.status(500).json({message:'server error occur'})
    }
    
})



route.patch('/api/election/:id', async (req, res) => {

    const electionId = req.params.id
    const statue = req.query.statue === 'true'
    


    try {
        
        const updateStatue = await Elections.findByIdAndUpdate(electionId,{
            $set: { statue }},
            {new: true}
        )

        if(!updateStatue) {

            res.status(200).json({message:'unable to update'})
        }

        await updateStatue.save()
        res.status(200).json({message:'updated successfully',data: updateStatue})

        

        
        
    } catch (error) {

        console.log(error,'election');
        
        res.status(500).json({message:'server error occur'})
    }
    
})

export default route