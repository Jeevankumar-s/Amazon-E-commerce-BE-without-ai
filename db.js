const mongoose = require("mongoose");
require("dotenv").config()

console.log(process.env.MONGO_URI)

async function connectDB(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/your-db-name");
        console.log("mongodb connected")
    }catch(e){
        console.log(`unable to connect mongodb ${e}`)
        process.exit(1)
    }
}

module.exports = connectDB