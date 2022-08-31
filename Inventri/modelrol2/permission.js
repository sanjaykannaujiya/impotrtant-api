// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Permission extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       Permission.belongsToMany(models.Role, {
//         through: 'RolePermission',
//         as: 'roles',
//         foreignKey: 'perm_id'
//       });
//     }
//   };
//   Permission.init({
//     perm_name:{
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false
//     },
//     perm_description:{
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     modelName:'Permission',
//   });
//   return Permission;
// };
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const permissionSchema=mongoose.Schema({
  user:{
    type:Schema.Types.ObjectId, 
    ref:'user', 
    required: true
   },
  type:{ 
     type:Schema.Types.ObjectId,
      ref:'permissionType',
       required: true 
       },
  read:{
    type: Boolean,
     default: false,
      required: true 
     },
  write:{
    type: Boolean, 
    default: false, 
    required: true 
  },
  delete:{
    type: Boolean, 
    default: false, 
    required: true 
  },
  accountUser:{
    type: Schema.Types.ObjectId, 
    ref: 'account',
    required:true
   }

});

model.exports=mongoose.model('permission', permissionSchema);