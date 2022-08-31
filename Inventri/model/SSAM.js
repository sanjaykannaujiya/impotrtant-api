const { defaults, string, required } = require('joi')
// const mongoose =require('mongoose')
// const Schema =mongoose.Schema
const { model, Schema }=require("mongoose");
const SaSchema =new Schema({
    uid: {
        type: String,
        required: true,
      },
  parent_id:{
        //type:mongoose.Schema.Types.ObjectId,
        type:String,
         ref:"SSA",
        required:true,
    },
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
       },
    // role:{
    //     type:String,
    //     default:true,
    //  },
    phone:{
         type:String,
         required:true,
    },
     address_1:[{
        type:Array,
        required:true,
 }],
    //    address_2:[{
    //     type:Array,
    //     required:true,

    // }],
    driving_license:{
        type:String,
        required:true,
    },
    emergency_contact_name:{
        type:String,
        required:true,
    },
    emergency_contact_address:{
        type:String,
        required:true,
    },
    emergency_contact_phone:{
        type:String,
        required:true,
    },
    device_IMEI:{
        //type:mongoose.Schema.Types.ObjectId,
       // ref:'IMEI NO',
       type:String,
        required:true
     },
     cust_id:{
        //type:mongoose.Schema.Types.ObjectId,
        type:String,
       // ref:'User Id',
        required:true
     },
     role:{
        type: String,
        enum: ['Admin',"user","SSA","Sub"],
        default:'SSA'
    },
    //verified:Boolean,
    // roles:{
    //     type: [String],
    //     enum:["user",'admin'],
    //     default:["user"]
    //     },
},{timestamps:true})
module.exports=model("Sas",SaSchema)