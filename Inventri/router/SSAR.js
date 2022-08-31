const express=require("express");
const router=express.Router();
const{Sadddetails,Supdate,Sgetdetails,Sgetdetail,Soneuserdelt,Slogin}=require('../controller/Controller/AdminC')
router.post('/sadmin',Sadddetails);
router.get('/sadmin',Sgetdetails);
router.put('/sadmin/id',Supdate);
router.delete('/sadmin/id',Sgetdetail);
router.get('/sadmin/:id',Soneuserdelt)
router.post('/Slogine',Slogin)
module.exports=router