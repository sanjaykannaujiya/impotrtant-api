const express =  require("express");
const router = express.Router();
//const {user}=require('../../utils/device')
const {adddevice,updatedevice,allDivice,deletedevice,deviceone}=require('../controller/Divice')
router.post('/device',adddevice); 
router.get('/device',allDivice);
router.put('/device/:id',updatedevice)
router.delete('/device/:id',deletedevice)
router.get('/device1',deviceone)
module.exports=router