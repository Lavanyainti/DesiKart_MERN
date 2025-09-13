const mongoose=require('mongoose')

const cartScheema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'//it will refers to products db to load item with that is
    },
    quantity:{
        type:Number,
        default:1
    }
})

const cart=mongoose.model("cart",cartScheema)
module.exports=cart