const used=require('.././Inventri/model/AdminM')
exports.isAdmin=async(req,res,next)=>{
  const admin=await used.findOne({
    user_id:req.user_id,
    password:req.user.password,
  });
  if (!admin) {
    res.send("You are not admin");
  } else {
    next();
  }
};