
const mongoose  = require("mongoose");


const Schema = new mongoose.Schema({

     userName : {
        type: String,
        required:true,
        min: [3, 'min length 3'],
        max:[20, 'max length 20'],
     },
     Email:{
        type:String,
        required:true,
         min : [6, 'min length 6'],
         max: [18, 'min length 18'],
         unique:true
     },
     password:{
        type:String,
        required:true,
        min:[8, 'min length 8'],
        max:[21, 'min length 21'],
     },
},
   {timestamps:true}
);

const userModel = mongoose.model("Signup", Schema);
module.exports = userModel;