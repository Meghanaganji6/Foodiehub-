const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const connectDB=require('./config/db')
const path = require('path');



dotenv.config()

connectDB()

const app=express()

app.use(express.json())

const cors = require('cors');
app.use(cors());


app.use("/api/auth", require("./routes/auth"));
app.use("/api/menu", require("./routes/menu"));
app.use("/api/orders", require("./routes/order"));

app.use(express.static(path.join(__dirname, "../frontend")));


app.get('/',(req,res)=>{
    res.send('Foodiehub backend is running')
})

const port=5000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
}) 