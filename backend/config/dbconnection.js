const dotenv=require("dotenv")
const mongoose=require("mongoose")
dotenv.config()
console.log(process.env.DB_URI)

const dbConnect= async ()=>{
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log("DB Connected✅")
    }
    catch(err){
        console.log("error❌",err)
    }
}

module.exports=dbConnect