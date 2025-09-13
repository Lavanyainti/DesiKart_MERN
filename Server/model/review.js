const mongoose=require('mongoose')

const reviewScheema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{ timestamps: true })

const review=mongoose.model('review',reviewScheema)
module.exports=review