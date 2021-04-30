const express = require('express');
const router=express.Router();
const shopController = require('../controllers/shop')
router.get('/',shopController.getIndex);
router.get('/getlocation',shopController.getlocation);
module.exports=router;