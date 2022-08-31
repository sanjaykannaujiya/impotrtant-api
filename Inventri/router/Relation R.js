const express =  require("express");
const router = express.Router();
//const{user}=require('../../Middleware/auth');
const {adduser,alluser,updateuser,deleteteam,signup,login}=require('../controller/Relation C') 
router.post('/relation',adduser); 
router.get('/relation',alluser);
router.put('/relation/:id',updateuser);
router.delete('/relation/:id',deleteteam);
module.exports = router