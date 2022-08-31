const express =  require("express");
const router = express.Router();
const{verifytoken}=require('../../Middleware/auth')
const{Uadddetails,Uupdate,Ugetdetails,Ugetdetail,Uoneuserdelt,Uloguser,Uregisteradddetails,refresh}=require('../controller/Controller/AdminC')
router.post('/useradmin',Uadddetails);
router.get('/useradmin',Ugetdetails);
router.put('/useradmin/:id',Uupdate);
router.delete('/useradmin/:id',Ugetdetail);
router.get('/useradmin/:id',Uoneuserdelt)
router.post('/userlogine',Uloguser);
router.post('/usersignup',Uregisteradddetails);
router.post('/userrefresh',refresh,);
module.exports=router
//Permission  is useradmin 


