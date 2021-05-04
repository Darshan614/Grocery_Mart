const path = require('path');
const express=require('express');//here require is provided by nodejs and not JS
//int the above line a function is exported from express which we take in variable express
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const app = express();  //express() function is called which returns object
const store = new MongoDBStore({
    uri:'mongodb://localhost:27017/groce',
    collection:'sessions'
})
const shopRoutes=require('./routes/shop');
const authRoutes=require('./routes/auth');
app.use(session({secret:'my secret',resave:false,saveUninitialized:false,store:store}));
// app.use((req,res,next)=>{
//     res.locals.isAuthenticated=req.session.isLoggedIn;
//     next();
// })
app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user=>{
        if(!user){
            return next();
        }
        req.user = user;
        next();
    })
    .catch(err=>{
        next(new Error(err));
    })
})
app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use(shopRoutes);
app.use(authRoutes);
mongoose.connect("mongodb://localhost:27017/groce",{
    useNewUrlParser:true,
	useUnifiedTopology:true
})
.then(result=>{
    console.log("groce started");
    app.listen(4200,function(){
        console.log("Hello");
    });
})
.catch(error=>console.log(error.message));