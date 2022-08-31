const { required }=require('joi')
// const mongoose =require('mongoose')
// const Schema=mongoose.Schema
const { model, Schema }=require("mongoose");
///const SubaM=require('./SubaM')
const device=require('./Divice')
const AdminSchema=new Schema({
    uid:{
        type: String,
        required: true,
      },
    parent_id:{
    type:Schema.Types.ObjectId,
    //     type:mongoose.Schema.Types.ObjectId,
///ref:"",
         type:String,
         required:true,
    //     // unique:true,
        
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
        match:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        },
    role:{
        type: String,
        enum:['Admin',"user","SSA","Sub"],
        default:'Admin',
       },
      phone:{
         type:String,
         required:true,
       // type: Number, min:1, index:true
    },
    address_1:{
        type:Array,
        required:true,
    },
        
    // address_2:[{
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
        type:Schema.Types.ObjectId,
       ref:device,
        type:String,
         trim:true
     },
     cust_id:{
        type:Schema.Types.ObjectId,
        type:String,
       // ref:'User Id',
        require:true,
     },
     permission: {
        type: String,
        enum:['isActivate','isdisable',"IsSuspended","isdelete"],
        default:"isActivate",
        required:true,
      },
    // permission:[
    //     {
    //     //    type: {  type: Schema.Types.ObjectId, ref: 'permissionType', required: true  },
    //         type: {  type: Schema.Types.ObjectId, ref: 'isActivate', required: true  },
    //         read: { type: Boolean, default: false, required: true  },
    //         write: { type: Boolean, default: false, required: true },
    //         delete: { type: Boolean, default: false, required: true },
    //     }
    // ],
    
  },{timestamps:true})
  module.exports=model("Admin",AdminSchema);