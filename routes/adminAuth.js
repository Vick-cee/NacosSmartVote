import jwt from 'jsonwebtoken';

const verifyAdmin = (req, res, next) => {

  const adminToken = req.cookies.adminToken;

  if (!adminToken) return res.status(400).json({authenticated: false, message:'no token'})

  try {

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    req.admin = decoded;
    next();

  } catch (err) {

    return res.status(401).json({ message: 'Invalid or expired token' });

  }
};

export default verifyAdmin;