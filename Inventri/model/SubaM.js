const { model, Schema }=require("mongoose");

const SubSchema=new Schema({
    uid:{
        type: String,
        required: true,
      },
      parent_id:{
         type:Schema.Types.ObjectId,
        ref:"SSA",
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
        //unique:true,
       
    },
    role:{
        type: String,
        enum:['Admin',"user","SSA","Sub"],
        default:'Sub',
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
       // ref:'IMEI NO',
       type:String,
        trim:true
     },
     cust_id:{
        type:Schema.Types.ObjectId,
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
module.exports=model("Sub",SubSchema)

// const { boolean, required } = require('joi')

// const mongoose=require('mongoose')
// const Schema=mongoose.Schema
// const { model, Schema }=require("mongoose");
// const Subadminschema=new Schema({
//   uid:{
//     type: String,
//     required: true,
//   },
// name:{
//       type:String,
//       //  required:true,
//     },
//     email: {
//       type: String,
//       trim: true,
//       lowercase: true,
//       unique: true,
//       required: 'Email address is required',
//       // validate: [validateEmail, 'Please fill a valid email address'],
//       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
//       validate: {
//         validator: function(v) {
//             return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
//         },
//         message: "Please enter a valid email"
//     },
//     required: [true, "Email required"]
//   },
//   passwored:{
//         type:String,
//         //required:true,
      
//     },
//     isAdmin:{
//         type:Boolean,
//         default:false,
//     },
//     referralCode:{
//         type:String,
//         unique:"i",
//         default:"1"
//     },
//     role_name: {
//         type:String,
//         allowNull:[false],
//         unique: true,
//         default:0,
//       },
//       role_description:{
//         type:String,
//         allowNull: false,
//         default:0,
//       },
//       Permission:{
//         type:String,
//         through:'RolePermission',
//         as:'permissions',
//         foreignKey:'role_id',
//         default:0,
//       },
//       createdAT:{type:Date,default:Date.now,index:{expires:200}}
//     // id:{
//     //   type:Number,
//     //   allowNull:false,
//     //   primaryKey:true,
//     //   autoIncrement:true
//     // },
// })
// module.exports=model("Subadmin",Subadminschema)
// // const mongoose=require('mongoose');
// // const Schema=mongoose.Schema;
// // const RoleSchema=new Schema({
// //   roleId:{
// //     type:String,
// //     unique:true,
// //     required:[true,"Role Id required"]
// //   },
// //   type_role:{
// //     type:String,
// //     unique:true,
// //     required:[true,"Role type is required"]
// //   },
// //   rights:{
// //     name:String,
// //     //required:true,
// //     path: String,
// //     url: String
// //   },
// // });
// // module.exports=mongoose.model('Role',RoleSchema);
