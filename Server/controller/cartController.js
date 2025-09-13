const User=require('../model/User')
const products=require('../model/products')
const cart=require('../model/cart')

async function addCart(req,res) {
    const {id}=req.params
    
    try{
        const existingCart=await cart.findOne({user:req.user._id, product:id})
        if(existingCart){
            existingCart.quantity+=1
            await existingCart.save()
            return res.status(200).json({ message: "Cart updated" });
        }
        const newCart=new cart({
            user:req.user._id,
            product:id
        }) 
        await newCart.save()
        return res.status(200).json({ message: "Added to cart" });
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"error hile adding  "+err.message})
        
    }
}

async function getCart(req,res) {
    try{
        const getCartResult=await cart.find({user:req.user._id}).populate("product")//populate replaces product with product id and reference to id in in products db
        if(getCartResult){
            console.log(getCartResult)
            return res.status(200).json({getCartResult})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"error hile adding  "+err.message})
        
    }
}

async function deleteItem(req,res) {
    const {id}=req.params
    try{
        const deleteResult=await cart.findOneAndDelete({user:req.user._id,product:id})
        if(deleteResult){
            res.status(200).json({message:"Deleted succesfully"});
        }

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"error hile adding  "+err.message})
        
    }
}
const cartController={
    addCart,
    getCart,
    deleteItem
}
module.exports=cartController