const Store = require('../models/stores');
exports.getIndex=(req,res,next)=>{
    res.render('shop/shop');
}

exports.getlocation=(req,res,next)=>{
    res.render('shop/location');
}

exports.getstorelist=(req,res,next)=>{
    console.log("inside storelist");
    console.log(req.user,"here is the user");
    let lt = req.user.address.latitude;
    let lg = req.user.address.longitude;
    console.log(lt,lg);
    Store.find({location:{$near:{$geometry:{type:"Point",coordinates:[lt,lg]},$maxDistance:1000}}})
    .then(result=>{
        console.log(result);
                    
        return res.render('shop/list',{
            storearray:result
        });
    })
    .catch(err=>console.log(err))
    
}