
const jwt = require('jsonwebtoken');
const jwtpassword = 'sidharth123'

async function authMiddleware(req,res,next){
    try {
        const AuthHeaders = req.headers["authorization"];
        const token = AuthHeaders.split(" ")[1];
        const isBearer = AuthHeaders.split(" ")[0] === "Bearer";
        if (token && isBearer) {
          const decoded = jwt.verify(token,jwtpassword);
          req.userId = decoded.userId;
          next();
        }
    } catch (error) {
        res.json(error);
    }
    
}

module.exports = {
    authMiddleware
}