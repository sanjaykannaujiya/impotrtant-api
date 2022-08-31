const Joi = require("joi")
 const sim= Joi.object({
            deviceId:Joi.string(),
            imei:Joi.number().required(),                                                    
            serial:Joi.string().required(),
            phone_No:Joi.number().required(),
            seller:Joi.string().required(),
            operator: Joi.string().required(),
            providedBy: Joi.string().required(),
            date_activated:Joi.string().required(),
   })
   module.exports={sim}; 