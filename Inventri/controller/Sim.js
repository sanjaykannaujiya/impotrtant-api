const doom=require('../model/Sim') 
const {sim}=require('../../utils/Simdetails')
exports.addsim=async(req,res)=>{
    try{
        let{serial,phone_No,seller,operator,providedBy,deviceId, date_activated,imei}=req.body
         let result=sim.validate(req.body)
           if(result.error){
               res.status(400).json(result.error.details[0].message)
               return ;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
             }else{
             const exist=await doom.exists({phone_No:req.body.phone_No});
             if(exist){
                 return res.status(400).json({"error":"The sim with this phone already registered!"})
             
             }else{
               
              const alluser=new doom({
                serial,phone_No,seller,operator,providedBy,deviceId,date_activated,imei
              })
             const saveuser =await alluser.save();
             res.status(200).json({message:"sim is save successful",saveuser}) 
           } 
             
         }
             
         }catch(err){
             res.status(500).json(err)
             console.log(err)
         }
     }
     exports.allsim=async(req,res)=>{ 
            try{
                //pageination
            const {page ,limit} = req.query
            const skip = (page-1)*10
            const allfind= await doom.find().skip(skip).limit(limit)
            if(!allfind){
                res.status(400).json({massage:"record not found"})
             }
             res.status(200).json({message:"successful",allfind})
         }catch(error){
             res.status(500).json(error)
             console.log(error)
         }
     }
     exports.updatsim=async(req,res)=>{
        try{
            const {error}=sim.validate(req.body);   
            if(error){
              res.status(402).json(error.details[0].message)
              return;
            }else{
                const putuser=await doom.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
                  res.status(200).json({massage:"successful",putuser})
           }
           }catch(error){
          res.status(500).json(error)
        }
     }
   exports.deletesim=async(req,res)=>{
         try{
             const deltuser= await doom.findByIdAndDelete(req.params.id)
             if(!deltuser){
                res.status(400).json({massage:"record not found"})
             }
             res.status(200).json({massage:"successful"})
      }catch(error){
             res.status(500).json(error)
         }
     }
     
