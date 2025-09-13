const mongoose=require('mongoose')

const orederScheema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products",
                required:true
            },
            quantity:{
                type:Number,
                req:true
            }
        }
    ],
    paymentMode:{
        type:String,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    }
},{timeStamps:true})

const order=mongoose.model("order",orederScheema)
module.exports=order