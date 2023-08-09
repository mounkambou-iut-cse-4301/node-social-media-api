const express=require("express");
const app =express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute=require('./routes/users')
const authRoute=require('./routes/auth')
dotenv.config();
const port=process.env.PORT

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>
console.log("DB Connection Successfull")
).catch((err)=>{
    console.log(err);
})

// midlleware
app.use(express.json()) // body parser when you make post request
app.use(helmet()) // Helmet helps secure Express apps by setting HTTP response headers.
app.use(morgan("common"));

app.use("api/users",userRoute)
app.use("api/auth",authRoute)
app.listen(port,()=>{
    console.log(`Backend server is running on ${port}`);
})