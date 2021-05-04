const {validationResult} = require('express-validator')
const User = require('../models/user');
const Store = require('../models/stores');
const bcrypt = require('bcryptjs')

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
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('auth/login',{
            validationErrors:errors.array(),
            errormessage:errors.array()[0].msg
        })
    }
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.status(422).render('auth/login',{
                errormessage:'Email does not exist',
                validationErrors:[]
            })
        }
        bcrypt.compare(password,user.password)
        .then(match=>{
            if(match)
            {
                req.session.isLoggedIn=true;
                req.user=user;
                let lt = user.address.latitude;
                let lg = user.address.longitude;
                console.log(lt,lg);
                Store.find({location:{$near:{$geometry:{type:"Point",coordinates:[lt,lg]},$maxDistance:1000}}})
                .then(result=>{
                    console.log("Hello1")
                    console.log("Hello1")
                    console.log("Hello1")
                    console.log("Hello1")
                    console.log("Hello1")
                    console.log(result);
                })
                .catch(err=>console.log(err))
                return res.render('store/items');
            }
            return res.render('auth/login',{
                errormessage:'Invalid email or password',
                validationErrors:[]
            })
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}
exports.postsignup = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const location = req.body.address;
    
    const mobile = req.body.mobile;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).render('auth/signup',{
            validationErrors:errors.array(),
            errormessage:errors.array()[0].msg
        })
    }
    fetch("https://api.opencagedata.com/geocode/v1/json?q="+location+"&key=f2a61737d7864cbdaf72e35b6b52430c")
    .then(response=>response.json())
    .then(data=>{
        console.log(data.results[0].geometry);

        bcrypt.hash(password,10)
        .then(hashedPassword=>{
            const user = new User({
                email:email,
                password:hashedPassword,
                mobile:mobile,
                address:{longitude:(data.results[0].geometry).lng,
                    latitude:(data.results[0].geometry).lat},
                cart:{items:[]}
            });
            console.log(user);
            return user.save();
        })
        .then(result=>{
            
            res.render("auth/login",{
                errormessage:null,
                validationErrors:[]
            });
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log("Place not found");
        console.log(err);
        res.render("auth/signup",{
            errormessage:"Location not Found",
            validationErrors:[]
        });
    })
    
}