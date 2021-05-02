const {validationResult} = require('express-validator')

const fetch = require('node-fetch');
exports.getlogin = (req,res,next)=>{
    res.render('auth/login',{
        errormessage:null,
        validationErrors:[]
    });
}
exports.getsignup = (req,res,next)=>{
    res.render('auth/signup',{
        errormessage:null,
        validationErrors:[]
    });
}
exports.getloginemployee = (req,res,next)=>{
    res.render('auth/loginemployee');
}
exports.postlogins = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('auth/login',{
            validationErrors:errors.array(),
            errormessage:errors.array()[0].msg
        })
    }
    res.render('store/items');
}
exports.postsignup = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const cpassword = req.body.cpassword;
    const mobile = req.body.mobile;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).render('auth/signup',{
            validationErrors:errors.array(),
            errormessage:errors.array()[0].msg
        })
    }
    fetch("https://api.opencagedata.com/geocode/v1/json?q="+address+"&key=f2a61737d7864cbdaf72e35b6b52430c")
    .then(response=>response.json())
    .then(data=>{
        console.log(data.results[0].geometry);
        res.render("auth/login");
        })
    .catch(err=>{
        console.log("Place not found");
        console.log(err);
        res.render("auth/signup",{
            errormessage:"Location not Found"
        });
    })
    
}