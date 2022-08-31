const express = require('express');
const router = express.Router();
const{userSignup,userlogin,userverifyOTP,resendOTP,findAllUser,findOne,verifyRefreshTokens,loggeduser} = require('../../controller/Controller/Admin log');
router.post('/userSignup',userSignup);
router.post('/userlogin' ,userlogin);
router.post('/userverifyOTP',userverifyOTP);
router.post('/resendOTP',resendOTP);
router.get('/findAllUser',findAllUser);
router.get('/findOne/:id',findOne);
router.post('/resfreshToken',verifyRefreshTokens);
router.delete('/Logged',loggeduser)
module.exports=router;