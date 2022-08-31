const { date, number } = require('joi')
const device=require('./Divice')
const mongoose =require('mongoose')
const Schema =mongoose.Schema
const simSchema =new Schema({
    deviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:device,
        required:true,
        // unique: true,
     },
    serial:{
        type:String,
        require:true,
       
    },
    phone_No:{
        type:Number,
        require:true,
        // unique: true,
       
    },
    ser:{
        type:String,
        require:true,
       
    },
    operator:{
         type:String,
         require:true,
        
    },
    providedBy:{
        type:String,
        require:true,
       
   },
//    date_added:{
//     type:Date,
//     default:Date.now
//  },
 date_activated:{
  type:String,
  //default:moment(new Date()).format("MMM Do YY, HH:mm"),
 required:true,
 },
 imei:{
    type:Number,
   // unique:true,
    required:true,
},
},{timestamps:true})
module.exports=mongoose.model("Sim",simSchema)