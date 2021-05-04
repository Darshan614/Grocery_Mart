module.exports = (req,res,next)=>{
    if(!isLoggedIn){
        return res.redirect('/login');
    }
    next();
}
