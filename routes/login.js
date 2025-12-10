import express from 'express'
const route = express.Router()
import Useraccount from '../model/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import verifyRoute from './auth.js'
import verifyAdmin from './adminAuth.js'


route.get('/api/check-auth', verifyRoute, async (req, res) => {

    return res.json({ authenticated: true, user: req.user})

})


route.post('/api/user/logout',async (req, res) => {

    res.clearCookie('token',{
        httpOnly: true,
        secure: false,
        sameSite:'lax',
        path:'/'
    })

    res.status(200).json({message:'user logout successful'})

})



route.post('/api/admin/logout', async (req, res) => {

    res.clearCookie('adminToken',{
        httpOnly: true,
        secure: false,
        sameSite:'Strict',
        path:'/'
    })

    res.status(200).json({message:'admin logout successful'})

})






route.post('/api/login', async (req, res) => {

    try {
        const {email, password} = req.body

        if(!email || !password) return;


        const user = await Useraccount.findOne({email})
        if(!user) return res.status(401).json({message: 'invalid user try again'})
        
        const isMatch = await bcrypt.compare(password, user.password) 
        if(!isMatch) return res.status(200).json({message: 'unverified'})

        if(user.statue === 'pending') return res.status(200).json({message:'pending', data: user.statue})

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                username: user.username,
                matric: user.matric,
                level: user.level,
                course: user.course,
                statue: user.statue,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: '1d'
            }
        )

        
        // cookies for logged in user
        res.cookie('token',token,{
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/'
        })

        res.status(200).json({message: 'logged in successfully', userId: user._id, email: user.email, token})

        
    } catch (error) {

        res.status(402).json({error:'err' + error})
    }
    
})

export default route

