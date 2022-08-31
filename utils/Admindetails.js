const Joi=require('joi')
const Admindetails=Joi.object({
    uid:Joi.string().required(),
    parent_id:Joi.string().required(),
    first_name:Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    phone: Joi.string().required().max(10),
    address_1: Joi.array().required(),
    driving_license:Joi.string().required(),
    emergency_contact_name:Joi.string().required(),
    emergency_contact_address:Joi.string().required(),
    emergency_contact_phone:Joi.string().required(),
    device_IMEI:Joi.string().required(),
    cust_id:Joi.string().required(),
  })
module.exports={Admindetails}

// const roft=require('.././Inventri/model/UserAdminM')
// exports.adddetails=async(req,res)=>{
//     try{
//         let {parent_id, first_name, last_name, email, role, password, phone,address_1, driving_license,emergency_contact_name,
//        emergency_contact_address,emergency_contact_phone,device_IMEI,cust_id,}=req.body;
//         const user=Joi.object({
//                     parent_id:Joi.string().required(),
//                     first_name:Joi.string().required(),
//                     last_name:Joi.string().required(),
//                     email:Joi.string().required(),
//                     // role:Joi.string().required(),
//                     password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
//                     phone:Joi.string().required().max(10),
//                     address_1:Joi.array().required(),
//                     // address_2:Joi.array().required(),
//                     driving_license:Joi.string().required(),
//                     emergency_contact_name:Joi.string().required(),
//                     emergency_contact_address:Joi.string().required(),
//                     emergency_contact_phone:Joi.string().required(),
//                     device_IMEI:Joi.string().required(),
//                     cust_id:Joi.string().required(),
//         })
//            let result=user.validate(req.body)
//            if(result.error){
//               res.status(400).json(result.error.details[0].message)
//                return ; 
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }else{
//              const exist=await roft.exists({email:req.body.email});
//              if(exist){
//                  return  res.status(400).json({"error":"The email with this email already registered!"});
             
//              }else{
               
//               const alluser=new roft({
//                 parent_id, first_name, last_name, email, role, password, phone,address_1, driving_license,emergency_contact_name,
//                 emergency_contact_address, emergency_contact_phone,device_IMEI,cust_id
               
//               })
//              const saveuser =await alluser.save();
//              res.status(200).json({message:"successful ",saveuser}) 
//            }   
//          }
//          }catch(err){
//          res.status(500).json(err)
//          console.log(err)
//          }
//      }
//      exports.update=async(req, res) => {
//         try {
//         const tea=Joi.object({
//      parent_id:Joi.string().required(),
//       first_name:Joi.string().required(),
//       last_name:Joi.string().required(),
//       email:Joi.string().required(),
//       // role:Joi.string().required(),
//       password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
//       phone:Joi.string().required().max(10),
//       address_1:Joi.array().required(),
//       // address_2:Joi.array().required(),
//       driving_license:Joi.string().required(),
//       emergency_contact_name:Joi.string().required(),
//       emergency_contact_address:Joi.string().required(),
//       emergency_contact_phone:Joi.string().required(),
//       device_IMEI:Joi.string().required(),
//       cust_id:Joi.string().required(),
            
//         })
//         let result=tea.validate(req.body)
//         if(result.error){
//          res.status(400).json(result.error.details[0].message)
//         } 
//         const putuser=await roft.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
//          if(!putuser){
//            return res.status(400).json({massage:"record not found"})
//           //return;
//          }
//         res.status(200).json({massage:"successful",putuser})
//         } catch (error) {
//           res.status(500).json(error)
//         }
//       }