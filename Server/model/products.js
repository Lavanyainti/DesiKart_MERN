const mongoose=require('mongoose')

const productScheema=mongoose.Schema({
    thumbnailImage:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        
    },
    fabric:{
        type:String,
        
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    ratings:{
        type:[Number],
        default:[]
    }
},{
    timestamps: true
})

const products=mongoose.model("products",productScheema)
module.exports=products