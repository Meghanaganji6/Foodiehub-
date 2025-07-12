const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const connectDB=require('./config/db')



dotenv.config()

connectDB()

const app=express()

app.use(express.json())

app.use("/api/auth", require("./routes/auth"));

app.get('/',(req,res)=>{
    res.send('Foodiehub backend is running')
})

const port=5000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
}) 