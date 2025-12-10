import jwt from 'jsonwebtoken'


function verifyRoute(req, res, next) {

    const token = req.cookies.token

    if(!token) return res.status(400).json({authenticated: false, message:'no token'})
    
        console.log(token);
        

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        console.log(decoded,'decoded');
        next()
        
        
    } catch (error) {
        
        res.status(400).json({message:'invalid cookies'})

    }
}

export default verifyRoute

