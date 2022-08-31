// const mongoose =require('mongoose')
// const Schema=mongoose.Schema
const { model, Schema }=require("mongoose");
const device=require('./Divice')
const UserSchema =new Schema({
    uid:{
        type: String,
        required: true,
      },
      parent_id:{
        type:Schema.Types.ObjectId,
        ref:"user",
        type:String,
        required:true,
        //unique:true,
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
        //unique:true,
    },
    email:{
        type:String,
        required:true,
        match:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        //unique:true,
       
    },
    role:{
        type: String,
        enum:['Admin',"user","SSA","Sub"],
        default:'user',
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
        //type:mongoose.Schema.Types.ObjectId,
        type:String,
       // ref:'User Id',
        require:true,
     },
     permission:{
        type:String,
        enum:['isActivate','isdisable',"IsSuspended","isdelete"],
        default:"isdisable",
        required:true,
      },
      isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})
module.exports=model("User",UserSchema)