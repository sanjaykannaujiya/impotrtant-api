const express =  require("express");
const router = express.Router();
const {addsim,allsim,updatsim,deletesim}=require('../controller/Sim')
router.post('/sim',addsim); 
router.get('/sim',allsim);
router.put('/sim/:id',updatsim)
router.delete('/sim/:id',deletesim)

module.exports=router