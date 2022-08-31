const Joi = require("joi")
 const  devicedetails= Joi.object({
    imei:Joi.number().required(),
    serial:Joi.string().required(),
    model:Joi.string().required(),
    manufacturer: Joi.string().required(),
   })
module.exports={devicedetails}; 