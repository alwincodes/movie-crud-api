const authenticateToken = function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split('')[1] //(shorting operators )if auth header exist -> .split function will execute
    if(token == undefined){
        return res.status(401).json({message:"No auth token in header"})
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        //either have an error or user object we signed {email:email}
        if(err){
            return res.status(403).json({message:"Invalid Token :("})
        }
        req.user = user
        next()
    })
}

module.exports = authenticateToken;