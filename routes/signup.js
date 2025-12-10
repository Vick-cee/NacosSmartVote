import express from 'express'
const route = express.Router()
import Useraccount from '../model/user.js'
import bcrypt from 'bcryptjs'
import transporter from '../utils/mail.js'
import dotenv from 'dotenv'
dotenv.config()



route.get('/api/admin/pending-user', async (req, res) => {

    try {

        const pendingUser = await Useraccount.find({ statue:'pending' })

        res.status(200).json({data: pendingUser})

        console.log(pendingUser);
        
    } catch (error) {

        console.log(error);
        

        res.status(500).json({message: 'error fetching pending users'})

    }
})


route.post('/api/signup', async (req, res) => {

    try {
        const { email, matric, password, username, course } = req.body

        const emailCheck = await Useraccount.findOne({email})

        if(emailCheck) return res.status(200).json({message: 'email already exist'})
        
        const hashedPassword = await bcrypt.hash(password, 10)

        
        const user = new Useraccount({

            email, 
            password: hashedPassword, 
            username, 
            course,
            statue: 'pending',
            matric: matric
            
        })

        await user.save()

        console.log('new user saved');

        res.status(200).json({message:'new user signed in', statue: 'pending'})
        

        
    } catch (error) {

        console.log(error,'could not signup');
        
        res.status(402).json({error:'err' + error})
    }
    
})




route.patch('/api/admin/approve-user', async (req, res) => {

    try {

        const { id, username, email } = req.body

        const updatedUser = await Useraccount.findByIdAndUpdate(id,{
            statue: 'active',
        },
        { new: true}
    )

    
   
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'User Approved',
        html: `<h2>Hi ${username} </h2>
        <p>
        
        you are now a verified member of nacos-smart-voting and now eligible to cast your votes you
        can now login an enjoy the experience.
        

        <h3 style="background-color:blue; padding:4rem 0rem; text-align:center; font-size:30px;">
            YOUR CHOICE,VOTE SMART
        </h3> 

        <p>www.nacos-smart-vote.com</p>
    
        </p>
        thank you.
        ` 
    }
    await transporter.sendMail(mailOptions)

    res.status(200).json({message: 'user approved', data: updatedUser})

    console.log(updatedUser,'updated user');
    
                
        
    } catch (error) {

        res.status(402).json({error:'err' + error})
        
        console.log(error);
    }
})









route.delete('/api/admin/approve-user', async (req, res) => {

    try {

        const { id, username, email } = req.body

        const updatedUser = await Useraccount.findByIdAndDelete(id)

    
   
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Approval Denied',
        html: `<h2>Hi ${username} </h2>
        <p>
        
        your account did not meet our requirement and has been suspended you can try and apply again
        check <a href="/">www.requirement.com</a> to see list of requirement to be verified.        

        <h3 style="background-color:green; padding:6rem 0rem; text-align:center; font-size:30px;">
            NACOS-SMART VOTING
        </h3> 

        <p>www.nacos-smart-vote.com</p>
    
        </p>
        thank you.
        ` 
    }
    await transporter.sendMail(mailOptions)

    res.status(200).json({message: 'approved denied', data: updatedUser})

    console.log(updatedUser,'updated user');
    
                
        
    } catch (error) {

        res.status(402).json({error:'err' + error})
        
        console.log(error);
    }
})





export default route