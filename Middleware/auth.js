 const { required } = require("joi");
 const jwt=require('jsonwebtoken')
 exports.verifytoken=async(req,res,next)=>{
  let p=req.header("thorization");
  if(p){
    p=p.split(" ")
    const token=p[1];
    if(token=="undifined"){
     res.status(422).json({massage:"this is true"})
       }
    try{
      const decoded=jwt.verify(token,process.env.jwt_ser);
      req.token=decoded;
      next();
   }catch(error){
      res.status(500).json({"error":error})
    }
  }else{
    return res.status(403).json({massage:"this is autharison"})
  }
}

// exports.verifytoken=async(req,res,next)=>{
//   try{
//     let p=req.header("thorization");
//     if(p){
//       p=p.split(" ")
//       const token=p[1];
//       if(token=="undifined"){
//         res.status(422).json({massage:"this is true"})
//       }else{
//         const decoded=jwt.verify(token,process.env.jwt_ser);
//         req.token=decoded;
//         if(!decoded){
//           res.status.json({massage:"this is not"})
//         }
//         next();
//        }
//        res.status(200).json({massage:"this ia verifyed",decoded})
//      }
//  }catch(error){
//   res.status(500).json(error)
//   console.log(error)
//   }
// }

