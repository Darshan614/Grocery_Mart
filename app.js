const path = require('path');
const express=require('express');//here require is provided by nodejs and not JS
//int the above line a function is exported from express which we take in variable express
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();  //express() function is called which returns object
const shopRoutes=require('./routes/shop');
const authRoutes=require('./routes/auth');
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