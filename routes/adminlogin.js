// routes/admin.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../model/adminSchema.js';
const route = express.Router();
const JWT_SECRET = process.env.JWT_SECRET
import verifyAdmin  from './adminAuth.js'





route.get('/api/admin-auth', verifyAdmin, async (req, res) => {

  return res.json({ authenticated: true, adminUser: req.admin})

   
})



route.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminUser = await Admin.findOne({ email });
    if (!adminUser) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const adminToken = jwt.sign(
      { id: adminUser._id, email: adminUser.email, isAdmin: true },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.cookie('adminToken', adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Admin login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});




route.post('/api/admin/signup', async (req, res) => {

    try {
        const {email, password} = req.body
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const admin = new Admin({
            email, password: hashedPassword
        })

        await admin.save()

        console.log('admin saved to database');

        res.status(200).json({message:'admin signed in'})
        

        
    } catch (error) {

        console.log(error,'at signup');
        
        res.status(402).json({error:'err' + error})
    }
    
})

export default route;