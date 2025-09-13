const express=require('express')
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const UserRoute=require('./routes/userRoute')
const ProductRoute=require('./routes/productsRoute')
const profileRoute=require('./routes/profileRoute')
const CartRoute=require('./routes/cartRouter')
const ReviewRoute=require('./routes/reviewRoute')
const orderRoute=require('./routes/orderRoute')
const path = require('path');

app.use(cors());
app.use(express.json());
const port=process.env.PORT || 5002;


app.listen(port, ()=>{
    console.log(`Server listening at port ${port}`)
})

app.use('/api',UserRoute)
app.use('/api',ProductRoute)
app.use('/api',profileRoute)
app.use('/api',CartRoute)
app.use('/api',ReviewRoute)
app.use('/api',orderRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.connect(process.env.DB_URL).then((result)=>{
    console.log("DB connected succesfully")
}).catch(err=>{
    console.log(err)
})