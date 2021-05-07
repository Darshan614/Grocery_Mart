const express = require('express');
const router=express.Router();
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');
router.get('/',shopController.getIndex);
router.get('/getlocation',shopController.getlocation);
router.get('/getstorelist',isAuth,shopController.getstorelist);

module.exports=router;