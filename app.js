import express from 'express'
const app = express()
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'


// dotenv uri
const MONGO_URI = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET 


// mongodb connection
mongoose.connect(MONGO_URI)
.then(() => console.log('mongodb connected at app'))
.catch((err) => console.log(err,'mongodb not connected at app'))


// imported route
import loginRoute from './routes/login.js'
import votingRoute from './routes/voteRoute.js'
import signupRoute from './routes/signup.js'
import candidateRoute from './routes/candidate.js'
import electionRoute from './routes/election.js'
import adminLoginRoute from './routes/adminlogin.js'

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

// Get current directory
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)





//app.use(express.static(path.resolve(__dirname,'/voting')))


app.use('/',loginRoute)
app.use('/',signupRoute)
app.use('/',votingRoute)
app.use('/',candidateRoute)
app.use('/',electionRoute)
app.use('/',adminLoginRoute)
app.use('/upload',express.static('upload'))


app.use('/',(
    createProxyMiddleware({
        target:'http://localhost:5173',
        changeOrigin: true
    })
))


export default app
