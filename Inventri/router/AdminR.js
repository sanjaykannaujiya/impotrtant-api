const express =  require("express");
const router = express.Router();
const{Radddetails,Rupdate,Rgetdetails,Rgetdetail,Rlogin,Roneuserdelt,adminsignup,adminlogin}=require('../controller/Controller/AdminC')
const {verifytoken}=require('../../Middleware/auth')
router.post('/AdminBro',Radddetails);
router.put('/AdminBro/:id',Rupdate);
router.get('/AdminBro',Rgetdetails);
router.delete('/AdminBro/:id',Rgetdetail);
router.post('/Rlogine',Rlogin)
router.get('/AdminBro1',verifytoken,Roneuserdelt)
router.post('/Adminsignup',adminsignup)
router.post('/Adminlogin',adminlogin)
module.exports=router
