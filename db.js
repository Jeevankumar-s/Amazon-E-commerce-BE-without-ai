const mongoose = require("mongoose");
require("dotenv").config()

console.log(process.env.MONGO_URI)

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected")
    }catch(e){
        console.log(`unable to connect mongodb ${e}`)
        process.exit(1)
    }
}

module.exports = connectDB