const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
router.get('/login',authController.getlogin);
router.get('/signup',authController.getsignup);
router.get('/loginemployee',authController.getloginemployee);
router.post('/logins',authController.postlogins);
router.post('/signup',authController.postsignup);
module.exports=router;