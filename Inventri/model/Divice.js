const mongoose =require('mongoose')
const Schema =mongoose.Schema
const deviceSchema =new Schema({
    imei:{
        type:Number,
       // unique:true,
        required:true,
        // unique: true,
    },
      serial:{
        type:String,
        //unique:true,
        required:true,

      },
      model:{
        type:String,
        required:true,

      } ,
      manufacturer:{
        type:String,
        required:true,

      },
    //   date_added:{
    //     type:String,
    //     default:moment(new Date()).format("MMM Do YY, HH:mm"),
    // },
    // date:{           
    //   type:String,
    //   default: moment(new Date()).format("MMM Do YY, HH:mm")
    // }
   },{timestamps:true})
module.exports=mongoose.model('Device',deviceSchema)