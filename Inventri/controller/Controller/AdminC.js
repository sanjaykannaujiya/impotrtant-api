const admin= require('../../model/AdminM');
const ssam=require('../../model/SSAM')
const user=require('../../model/UserM');
const sub=require('../../model/SubaM')
const Joi=require("joi");
//const auth=require('../../../Middleware/auth');
const{Admindetails}=require('../../../utils/Admindetails');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { alluser } = require('../Relation C');
///////////////////////////////////////user////////////////////////////////////////////////////////////////////////////////
exports.Uadddetails=async(req,res)=>{
  try{
    let {uid,parent_id, first_name, last_name, email,role,password,phone,address_1,driving_license,emergency_contact_name,
      emergency_contact_address, emergency_contact_phone,device_IMEI,cust_id,}=req.body;  
     const{error}=Admindetails.validate(req.body)
     if (error) {
      res.status(400).json(error.details[0].message)
      return;
    }else{
      const exist=await user.exists({email:req.body.email });
      if(exist){
       res.status(402).json(" email allready registerd ")
      } 
      else{
        const salt=await bcrypt.genSalt(10);
       const hashpassword=await bcrypt.hash(req.body.password,salt);

        const alluser=new user({
          uid,parent_id, first_name,last_name,email,role,password,phone,address_1,driving_license,emergency_contact_name,
                emergency_contact_address,emergency_contact_phone,device_IMEI,cust_id,
      //  permission:false,
         password:hashpassword
        });
        const saveduser=await alluser.save()
        res.status(200).json({message:"successful",saveduser })
      }
    }
 }catch(error){
 res.status(500).json(error)
 console.log(error)
  }
}
exports.Uupdate=async(req,res)=>{
  try{
      const {error}=Admindetails.validate(req.body);   
      if(error){
        res.status(402).json(error.details[0].message)
        return;
      }else{
          const putuser=await user.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json({massage:"successful",putuser})
     }
     }catch(error){
    res.status(500).json(error)
  }
}
exports.Ugetdetails=async (req, res) => {
  try {
   /////////////////////////////////// //pagination////////////////////////////////////////////////////////
    const {page,limit}=req.query
    const skip=(page-1)*10
    const allfind=await user.find().skip(skip).limit(limit)
    res.status(200).json({message:"successful",allfind })
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}
exports.Ugetdetail=async (req, res) => {
  try {
    const deltuser=await user.findByIdAndDelete(req.params.id)
    res.status(200).json({massage:"successful" })
  } catch (error) {
    res.status(500).json(error)

  }
}
//login
exports.Uregisteradddetails=async(req,res)=>{
  try{
    let {uid,parent_id, first_name, last_name, email,role,password,phone,address_1,driving_license,emergency_contact_name,
      emergency_contact_address, emergency_contact_phone,device_IMEI,cust_id,}=req.body;  
     const{error}=Admindetails.validate(req.body)
     if (error) {
      res.status(400).json(error.details[0].message)
      return;
    }else{
      const exist=await user.exists({email:req.body.email });
      if(exist){
       res.status(402).json(" email allready registerd ")
      } 
      else{
        const salt=await bcrypt.genSalt(10);
        hashpassword=await bcrypt.hash(req.body.password, salt);
        const hashpassword= await bcrypt.hash(password ,10)
        const alluser=new user({
          uid,parent_id, first_name,last_name,email,role,password,phone,address_1,driving_license,emergency_contact_name,
      emergency_contact_address,emergency_contact_phone,device_IMEI,cust_id,
       password:hashpassword,
        });
        const saveduser=await alluser.save()
        res.status(200).json({message:"successful",saveduser })
      }
    }
 }catch(error){
 res.status(500).json(error)
 console.log(error)
  }
}

exports.Uloguser=async(req ,res)=>{
  try{
    const login=Joi.object({
      email:Joi.string().required(),
      // password:Joi.string().required()
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    })
    const sa=login.validate(req.body);
    // console.log(sa)
    if(sa.error){
      res.status(404).json("user is enter is woring") 
    }else{
      const user=await user.findOne({email:req.body.email})
      if(!user){
       res.status(422).json("email is woring")
      }else{
         const mach=await bcrypt.compare(req.body.password,user.password)
         if(!mach){
           res.status(422).json("paswor is jj")
         }else{
             const token=jwt.sign({
              id:user._id,
              isAdmin:user.isAdmin,

             },process.env.jwt_ser,{expiresIn:"24h"})
             res.status(200).json({message:"User is login ",token})
         }
      }
    }
  }catch(err){
    res.status(500).json(err)
    console.log(err)
  }
}
     /////////////////////////////////////////renewtoken/////////////////////////////////////////////////////////////////////////
     const renewtoken=async(req,res)=>{
      try{
        const secret_jwt=process.env.jwt_ser;
        const newsecret=randomstring.generate();
        // // fs.readfile(utf-8,function(err,data){
        // //   if(errr)throw err;
        // })
        const token=await jwt.sign({_id:id},process.env.jwt_ser)
        return token;

      }catch(error){
        res.status(400).send({success:false,masg:error.massage})
      }
     }


  ////////////////////////////////refreshtoken///////////////////////////////////////////////////////////////////////////////
  exports.refresh=async(req,res)=>{
    try{
      const user_id=req.body_id;
      const userdata=await user.findById({_id:user_id});
      if(userdata){
        const tokenData=await renewtoken(user_id);
        const respanse={
          user_id:user_id,
          token:tokenData
        }
        res.status(201).json({masg:"refresh token is valid",respanse})
      }else{
        res.status(401).json({msg:"this is not"})
      }

    }catch(error){
      res.status(500).json(error)
    console.log(error)
    }
  }


// exports.Uloguser=async(req ,res)=>{
//   try{
//     const login=Joi.object({
//        email:Joi.string().required(),
//       password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
//       })
//     const sa=login.validate(req.body);
//     if(sa.error){
//       res.status(404).json("user is enter is woring") 
//     }else{
//       const users=await admin.findOne({email:req.body.email})
//       if(!users){
//        res.status(422).json("email is woring")
//       }else{
//          const mach=await bcrypt.compare(req.body.password,admin.password)
//          if(!mach){
//            res.status(422).json("password is match ")
//          }else{
//              const token=jwt.sign({
//                id:admin._id ,
//              },process.env.jwt_ser,{expiresIn:"7d"})
//               // // const usertoken=new uresToken({
//               // //   token:token
//               // // })
//               // const savetoken=usertoken.save()
//              res.status(200).json({message:"user is login",token})
//          }
//          if (err) {
//           console.log(err)
//       }
//       else if (admin) {
//           console.log('recored is not found')
//       }
//       else {
//           req.session.userId=admin._id;
//           console.log(req.session.userId);
//         }
//       }
//     }
//   }catch(err){
//     res.status(500).json(err)
//     console.log(err)
//   }
// }
exports.Uoneuserdelt=async(req,res)=>{
  try{
      const Oneuser=await user.findOne().lean();
      if(!Oneuser){
         return res.status(400).json({massage:"record not found"})
      }
      res.status(200).json({massage:"successful",Oneuser})
 }catch(error){
      res.status(500).json(error)
      console.log(error)
  }
}
//////////////////////////////////////////SSAM///////////////////////////////////////////////////////////////
exports.Sadddetails=async(req,res)=>{
  try{
    let { uid,parent_id, first_name, last_name, email, role, password, phone,address_1, driving_license,emergency_contact_name,
      emergency_contact_address, emergency_contact_phone,device_IMEI,cust_id,}=req.body;  
     const{error}=Admindetails.validate(req.body)
     if (error) {
      res.status(400).json(error.details[0].message)
      return;
    }else{
      const exist=await  ssam.exists({email:req.body.email });
      if(exist){
       res.status(402).json(" email allready registerd ")
      } 
      else{
        const alluser=new ssam({
         uid, parent_id, first_name, last_name, email, role, password, phone,address_1, driving_license,emergency_contact_name,
      emergency_contact_address, emergency_contact_phone,device_IMEI,cust_id,
        });
        const saveduser=await alluser.save()
        res.status(200).json({message:"successful",saveduser })
      }
    }

  }catch(error){
 res.status(500).json(error)
 console.log(error)
  }
}

exports.Supdate=async(req,res)=>{
  try{
      const {error}=Admindetails.validate(req.body);   
      if(error){
        res.status(402).json(error.details[0].message)
        return;
      }else{
          const putuser=await ssam.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json({massage:"successful",putuser})
     }
     }catch(error){
    res.status(500).json(error)
  }
}

exports.Sgetdetails = async (req, res) => {
  try {
    //pagination
    const { page, limit } = req.query
    const skip = (page - 1) * 10
    const allfind=await ssam.find().skip(skip).limit(limit)
    res.status(200).json({ message: "successful", allfind })
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}
exports.Soneuserdelt=async(req,res)=>{
  try{
      const Oneuser=await ssam.findOne()
      if(!Oneuser){
         return res.status(400).json({massage:"record not found"})
      }
      res.status(200).json({massage:"successful",Oneuser})
 }catch(error){
      res.status(500).json(error)
      console.log(error)
  }
}
exports.Sgetdetail=async(req,res)=>{
  try{
      const deltuser=await ssam.findByIdAndDelete(req.params.id)
      if(deltuser==null){
        return  res.status(400).json({massage:"record not found"})
      }
      res.status(200).json({massage:"successful"})
  }catch(error){
      res.status(500).json(error)
     
  }
}
// exports.getdetail=async (req,res) => {
//   try {
//     const deltuser=await ssam.findByIdAndDelete(req.params.id)
//     res.status(200).json({ massage: "successful" })
//   } catch (error) {
//     res.status(500).json(error)

//   }
// }
//////////////////////////////////////////////////////////login////////////////////////////////////////////////////////////////////////////
exports.Slogin=async(req ,res)=>{
  try{
    const login=Joi.object({
    email:Joi.string().required(),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      })
    const sa=login.validate(req.body);
    if(sa.error){
      res.status(404).json("user is enter is woring") 
    }else{
      const users = await ssam.findOne({email:req.body.email})
      if(!users){
       res.status(422).json("email is woring")
      }else{
         const mach = await bcrypt.compare(req.body.password ,roft.password)
         if(!mach){
           res.status(422).json("password is match ")
         }else{
             const token=jwt.sign({
               id:ssam._id ,
             },sanjay,{expiresIn:"30h"})
              const usertoken=new uresToken({
                token:token
              })
              const savetoken=usertoken.save()
             res.status(200).json({message:"user is login",savetoken})
         }
         if(err){
          console.log(err)
      }
      else if(roft){
          console.log('recored is not found')
      }
      else{
          req.session.userId= ssam._id;
          console.log(req.session.userId);
        }
      }
    }
  }catch(err){
    res.status(500).json(err)
    console.log(err)
  }
}

////////////////////////////////////////////{AdminM}///////////////////////////////////////////////////////////////////////////////

//////////////////////////////admin signup//////////////////////////////////////////////////////////

// exports.adminsignup=async(req,res)=>{
//   try {
//     let {uid,parent_id, first_name, last_name, email, role, password, phone,address_1, driving_license,emergency_contact_name,
//       emergency_contact_address, emergency_contact_phone,device_IMEI,cust_id,}=req.body;  
//      const{error}=Admindetails.validate(req.body)
//     if (error) {
//       res.status(400).send(error.details[0].message);
//     } else {
//       const salt=await bcrypt.genSalt(10);
//       hashpassword=await bcrypt.hash(req.body.password,salt);
//       const createAdmin=new admin({
//         uid,parent_id, first_name, last_name, email, role, password, phone,address_1, driving_license,emergency_contact_name,
//       emergency_contact_address, emergency_contact_phone,device_IMEI,cust_id,
//         password:hashpassword,
//       });
//       createAdmin
//         .save()
//         .then(() => {
//           res.status(200).send({ message: "Added admin sucessfully" });
//         })
//         .catch(() => {
//           res.status(500).send({ message: "Something bad happened" });
//         });
//     }
//   } catch (e) {
//     res.status(500).send({ message: e.name });
//   }
// };
exports.adminsignup=async(req,res)=>{
  try{
    let {uid,parent_id, first_name, last_name, email,role,password,phone,address_1,driving_license,emergency_contact_name,
      emergency_contact_address, emergency_contact_phone,device_IMEI,cust_id,}=req.body;  
     const{error}=Admindetails.validate(req.body)
     if (error) {
      res.status(400).json(error.details[0].message)
      return;
    }else{
      const exist=await admin.exists({email:req.body.email });
      if(exist){
       res.status(402).json(" email allready registerd ")
      } 
      else{
        const salt=await bcrypt.genSalt(10);
       const hashpassword=await bcrypt.hash(req.body.password,salt);
       const alluser=new admin({
          uid,parent_id,first_name,last_name,email,role,password,phone,address_1,driving_license,emergency_contact_name,
                emergency_contact_address,emergency_contact_phone,device_IMEI,cust_id,
         password:hashpassword
        });
        const saveduser=await alluser.save()
        res.status(200).json({message:"successful",saveduser })
      }
    }
 }catch(error){
 res.status(500).json(error)
 console.log(error)
  }
}
///////////////////////////////////////////////////////admin login///////////////////////////////////////////////;
// exports.adminlogin=async (req, res) => {
//   try {
//     const { body } = req;
//     const adminSchema = Joi.object()
//       .keys({
//         email:Joi.string().required(),
//         password:Joi.string().required(),
//       })
//       .required();
//     const result=adminSchema.validate(body);
//    if (result.error) {
//       res.status(400).send({ message:result.error.details[0].message });
//     } else {
//       const admin=await admin.findOne({email:req.body.email });
//       if (admin) {
//         const validPassword=await bcrypt.compare(
//           req.body.password,
//           admin.password
//         );
//         if (validPassword) {
//           const p=admin._id.toString();
//           const token=jwt.sign({_id: p },process.env.jwt_ser, {
//             expiresIn:"24h",
//           });
//           res.status(200).send({message:"Login successful",token: token });
//         } else {
//           res.status(401).send({message:"Invalid password" });
//         }
//       } else {
//         res.status(401).send({message:"Invalid username" });
//       }
//     }
//   } catch (e) {
//     res.status(500).send({ message: e.name });
//   }
// };

exports.adminlogin=async(req ,res)=>{
  try{
    const login=Joi.object({
      email:Joi.string().required(),
      //phone:Joi.number().required(),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    })
    const result=login.validate(req.body);
    if(result.error){
      res.status(400).send({ message:result.error.details[0].message });
    }else{
      const user=await admin.findOne({email:req.body.email})
      if(!user){
       res.status(422).json("email is woring")
      }else{
         const mach=await bcrypt.compare(req.body.password,user.password)
      if(!mach){
           res.status(422).json("pasword is working")
         }else{
          const p=user._id.toString();
             const token=jwt.sign({p,
               id:user._id,
               role:user.role,
               email:user.email,
               phone:user.phone,
               permission:user.permission,
              // isAdmin:user.isAdmin,
          },process.env.jwt_ser,{expiresIn:"22h"})
             res.status(200).json({message:"User is login",token ,id:user._id,role:user.role,
             email:user.email,
             phone:user.phone,
             permission:user.permission,})
             
         }
      }
    }
  }catch(err){
    res.status(500).json(err)
    console.log(err)
  }
};
exports.Radddetails=async(req,res)=>{
  try{
    let {uid,parent_id, first_name, last_name, email, role, password, phone,address_1, driving_license,emergency_contact_name,
      emergency_contact_address, emergency_contact_phone,device_IMEI,cust_id,}=req.body;  
     const{error}=Admindetails.validate(req.body)
     if (error) {
      res.status(400).json(error.details[0].message)
      return;
    }else{
      const exist=await admin.exists({email:req.body.email });
      if(exist){
       res.status(402).json(" email allready registerd ")
      } 
      else{
        const alluser=new admin({
          uid,parent_id, first_name, last_name, email, role, password, phone,address_1, driving_license,emergency_contact_name,
      emergency_contact_address, emergency_contact_phone,device_IMEI,cust_id,
        });
        const saveduser=await alluser.save()
        res.status(200).json({message:"successful",saveduser })
      }
    }

  }catch(error){
 res.status(500).json(error)
 console.log(error)
  }
}

exports.Rupdate=async(req,res)=>{
  try{
      const {error}=Admindetails.validate(req.body);   
      if(error){
        res.status(402).json(error.details[0].message)
        return;
      }else{
          const putuser=await admin.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json({massage:"successful",putuser})
     }
     }catch(error){
    res.status(500).json(error)
  }
}
exports.Rgetdetails=async (req, res) =>{
  try {
    //pagination
    const { page,limit}=req.query
    const skip = (page - 1) * 10
    const allfind=await admin.find().skip(skip).limit(limit)
    res.status(200).json({ message:"successful",allfind })
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}
exports.Rgetdetail=async(req,res)=>{
  try{
      const deltuser=await admin.findByIdAndDelete(req.params.id)
      if(deltuser==null){
        return res.status(400).json({massage:"record not found"})
      }
      res.status(200).json({massage:"successful"})
  }catch(error){
      res.status(500).json(error)
     
  }
}
exports.Roneuserdelt=async(req,res)=>{
  try{
      const Oneuser=await admin.findOne()
      if(!Oneuser){
         return res.status(400).json({massage:"record not found"})
      }
      res.status(200).json({massage:"successful",Oneuser})
 }catch(error){
      res.status(500).json(error)
      console.log(error)
  }
}
exports.Rlogin=async(req ,res)=>{
  try{
    const login=Joi.object({
    email:Joi.string().required(),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      })
    const sa=login.validate(req.body);
    if(sa.error){
      res.status(404).json("user is enter is woring") 
    }else{
      const users=await admin.findOne({email:req.body.email})
      if(!users){
       res.status(422).json("email is woring")
      }else{
         const mach=await bcrypt.compare(req.body.password ,roft.password)
         if(!mach){
           res.status(422).json("password is match ")
         }else{
             const token=jwt.sign({
               id:ssam._id ,
             },sanjay,{expiresIn:"30h"})
              const usertoken=new uresToken({
                token:token
              })
              const savetoken=usertoken.save()
             res.status(200).json({message:"user is login",savetoken})
         }
         if (err) {
          console.log(err)
      }
      else if (roft) {
          console.log('recored is not found')
      }
      else {
          req.session.userId= ssam._id;
          console.log(req.session.userId);
        }
      }
    }
  }catch(err){
    res.status(500).json(err)
    console.log(err)
  }
}
///////////////////////////////////////////Subadmin///////////////////////////////////////////////////////////////////////////////////////
exports.Subadddetails=async(req,res)=>{
  try{
    let { uid,parent_id, first_name, last_name, email,role,password, phone,address_1, driving_license,emergency_contact_name,
      emergency_contact_address,emergency_contact_phone,device_IMEI,cust_id,}=req.body;  
     const{error}=Admindetails.validate(req.body)
     if (error) {
      res.status(400).json(error.details[0].message)
      return;
    }else{
      const exist=await sub.exists({email:req.body.email });
      if(exist){
       res.status(402).json(" email allready registerd ")
      } 
      else{
        const alluser=new sub({
          uid,parent_id,first_name,last_name,email,role,password,phone,address_1,driving_license,emergency_contact_name,
      emergency_contact_address, emergency_contact_phone,device_IMEI,cust_id,
        });
        const saveduser=await alluser.save()
        res.status(200).json({message:"successful",saveduser })
      }
    }

  }catch(error){
 res.status(500).json(error)
 console.log(error)
  }
}

exports.Subupdate=async(req,res)=>{
  try{
      const {error}=Admindetails.validate(req.body);   
      if(error){
        res.status(402).json(error.details[0].message)
        return;
      }else{
          const putuser=await sub.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json({massage:"successful",putuser})
     }
     }catch(error){
    res.status(500).json(error)
  }
}

exports.Subgetdetails = async (req, res) => {
  try {
    //pagination
    const { page, limit } = req.query
    const skip = (page - 1) * 10
    const allfind=await sub.find().skip(skip).limit(limit)
    res.status(200).json({ message: "successful", allfind })
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}
exports.Suboneuserdelt=async(req,res)=>{
  try{
      const Oneuser=await sub.findOne()
      if(!Oneuser){
         return res.status(400).json({massage:"record not found"})
      }
      res.status(200).json({massage:"successful",Oneuser})
 }catch(error){
      res.status(500).json(error)
      console.log(error)
  }
}
exports.Subgetdetail=async(req,res)=>{
  try{
      const deltuser=await sub.findByIdAndDelete(req.params.id)
      if(deltuser==null){
        return  res.status(400).json({massage:"record not found"})
      }
      res.status(200).json({massage:"successful"})
  }catch(error){
      res.status(500).json(error)
     
  }
}
// exports.getdetail=async (req,res) => {
//   try {
//     const deltuser=await ssam.findByIdAndDelete(req.params.id)
//     res.status(200).json({ massage: "successful" })
//   } catch (error) {
//     res.status(500).json(error)

//   }
// }
//////////////////////////////////////////////////////////login////////////////////////////////////////////////////////////////////////////
exports.Sublogin=async(req ,res)=>{
  try{
    const login=Joi.object({
    email:Joi.string().required(),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      })
    const sa=login.validate(req.body);
    if(sa.error){
      res.status(404).json("user is enter is woring") 
    }else{
      const users = await sub.findOne({email:req.body.email})
      if(!users){
       res.status(422).json("email is woring")
      }else{
         const mach = await bcrypt.compare(req.body.password ,roft.password)
         if(!mach){
           res.status(422).json("password is match ")
         }else{
             const token=jwt.sign({
               id: ssam._id ,
             },sanjay,{expiresIn:"30h"})
              const usertoken=new uresToken({
                token:token
              })
              const savetoken=usertoken.save()
             res.status(200).json({message:"user is login",savetoken})
         }
         if (err) {
          console.log(err)
      }
      else if (roft) {
          console.log('recored is not found')
      }
      else {
          req.session.userId= ssam._id;
          console.log(req.session.userId);
        }
      }
    }
  }catch(err){
    res.status(500).json(err)
    console.log(err)
  }
}