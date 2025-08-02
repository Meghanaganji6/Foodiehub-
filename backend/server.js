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
<<<<<<< HEAD

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'));

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======
app.use(cors());
>>>>>>> 222382ab02d9d7d325e8f81cdb8b9929f5433e91


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