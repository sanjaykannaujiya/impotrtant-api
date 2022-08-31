const device=require('../model/Divice') 
//const Joi = require("joi")
const {devicedetails}=require('../../utils/Device')
exports.adddevice=async(req,res)=>{
    try{
        let{imei,serial,model,manufacturer,}=req.body
        const {error}=devicedetails.validate(req.body);
         if(error){ 
            res.status(400).json(error.details[0].message)
               return ; 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }else{
             const exist=await device.exists({imei:req.body.imei});
             if(exist){
                 return res.status(400).json({"error":"The device with this imei already registered!"});
             
             }else{
               
              const alluser=new device({
                imei,serial,model,manufacturer,
              })
             const saveuser =await alluser.save();
             res.status(200).json({message:"device is save successful ",saveuser}) 
           } 
        } 
          }catch(error){
             res.status(500).json(error)
             console.log(error)
           }
           }

     exports.allDivice=async(req,res)=>{ 
         try{
           // pagination
            const{page ,limit} = req.query
            const skip=(page-1)*10
             const allfind= await device.find(req.params.id).skip(skip).limit(limit)
             res.status(200).json({message:"successful",allfind})
         }catch(error){
             res.status(500).json(error)
             console.log(error)
         }
     }
     exports.updatedevice=async(req,res)=>{
        try{
            const { error}=devicedetails.validate(req.body);   
            if(error){
              res.status(402).json(error.details[0].message)
              return;
            }else{
                const putuser=await device.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
                  res.status(200).json({massage:"successful",putuser})
           }
           }catch(error){
          res.status(500).json(error)
        }
     }
    
     exports.deletedevice=async(req,res)=>{
         try{
             const deltuser= await device.findByIdAndDelete(req.params.id)
             if(deltuser==null){
               return  res.status(400).json({massage:"record not found"})
             }
             res.status(200).json({massage:"successful"})
         }catch(error){
             res.status(500).json(error)
            
         }
     }
exports.deviceone=async(req,res)=>{
      try{
          const onedevice=await device.findOne()
          if(!onedevice){
             return res.status(400).json({massage:"record not found"})
          }
          res.status(200).json({massage:"successful",onedevice})
     }catch(error){
          res.status(500).json(error)
          console.log(error)
      }
  }
