const jwt=require('jsonwebtoken');
const UserToken=require('../Inventri/model/SubaM');
const generateTokens=async(user)=>{
    try{
        const payload={_id:user._id,roles:user.roles};
        const accessToken=jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY ,
            {expiresIn:"7d"}
        );
        const refreshToken=jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            {expiresIn:"3d"}
        );
        const userToken=await UserToken.findOne({userld:user._id});
        if(userToken) await userToken.remove();
        await new UserToken({userId:user._id,token:refreshToken}).save();

        return Promise.resolve({accessToken ,refreshToken});
    }catch(err){
       return Promise.reject(err);
    }
} 
module.exports=generateTokens;
