// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const userSchema = new Schema({
//     name:{
//         type:String,
//         required:true
//     },
    
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     referralCode:{
//         type:String
//     },
//     verified:Boolean,
//     roles:{
//         type: [String],
//         enum:["user",'admin'],
//         default:["user"]
//         },
// });
// module.exports = mongoose.model('user', userSchema);