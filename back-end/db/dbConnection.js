//connect node js to mongoose
const mongoose = require('mongoose');
const connectDB = async ()=>{
   try{
    await mongoose.connect('mongodb://127.0.0.1:27017/database1')
    console.log("Connected to MongoDB")
    }
   
   catch(error){
    console.log("Error in connection",error)
   }
}
module.exports = connectDB;
