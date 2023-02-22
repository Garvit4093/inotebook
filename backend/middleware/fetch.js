const jwt=require('jsonwebtoken');
const JWT_token="Garvitgupta79";
const fetch=(req,res,next)=>{
    //get user from jwt token and add id to req
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_token);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using valid token"})
    }
}
module.exports=fetch