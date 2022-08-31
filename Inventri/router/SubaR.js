const express =  require("express");
const router = express.Router();
const{verifytoken}=require('../../Middleware/auth')
const{Subadddetails,Subgetdetails,Subupdate,Subgetdetail,Suboneuserdelt,Sublogin,Subloguser,Subregisteradddetails,Subrefresh}=require('../controller/Controller/AdminC')
router.post('/subadmin',Subadddetails);
router.get('/Subadmin',Subgetdetails);
router.put('/Subadmin/:id',Subupdate);
router.delete('/Subadmin/:id',Subgetdetail);
router.get('/Subadmin/:id',Suboneuserdelt)
router.post('/Subalogine',Sublogin);
//router.post('/Subasignup',Subregisteradddetails);
//router.post('/Subarefresh',Subrefresh);
module.exports=router


// const router=express.Router();
// const {verifytoken}=require('../../Middleware/auth')
// const {singup,login,getdetails,welcome,refresh,verifyRefreshTokens}=require('../controller/Controller/Isadmin log')
// router.post('/singup',singup)
// router.post('/login',login)
// router.get('/userget',verifytoken,getdetails)
// router.get("/welcome",welcome)
// router.post("/refresh",refresh)
// router.post('/resfreshToken/id:',verifyRefreshTokens);
// module.exports=router   
