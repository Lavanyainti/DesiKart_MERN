const order=require('../model/order')
const cart=require('../model/cart')

async function addOrder(req,res) {
    const {paymentMode}=req.body;

   try{
     const cartItems=await cart.find({user:req.user._id}).populate("product")

    const items=cartItems.map((item)=>({
        product:item.product,
        quantity:item.quantity
    }))

     const totalAmount = cartItems.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
        }, 0);

    const newOrder=new order({
        user:req.user._id,
        items,
        paymentMode,
        totalAmount
    })

    await newOrder.save();
     // Clear the cart after placing order
    await cart.deleteMany({ user: req.user._id });

    if(paymentMode==="COD"){
         return res.status(200).json({
            message: "Order placed successfully!",
            totalAmount
        });
    }

     return res.status(200).json({
            message: "Order placed and payment successful!",
            totalAmount
        });
   }catch(err){
    console.log(err)
        return res.status(500).json({message:"error while getting product "+err.message})
    }
}

async function getOrder(req,res) {
    try{
        const orderResult=await order.find({user:req.user._id}).populate('items.product');
        if(orderResult){
            console.log(orderResult)
            return res.status(200).json({orderResult})
        }
    }catch(err){
    console.log(err)
        return res.status(500).json({message:"error while getting product "+err.message})
    }
}

const orderController={
    addOrder,
    getOrder
}
module.exports=orderController