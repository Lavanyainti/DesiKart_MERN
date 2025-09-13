const products=require('../model/products')

async function addProduct(req,res) {
    const {title, name, price,brand,fabric,description, category}=req.body
    let thumbnailImage=req.file ? req.file.filename : null;

    try{
        const newProduct=new products({
        thumbnailImage,
        title,
        name,
        price,
        brand,
        fabric,
        description,
        category
    })
    const result=await newProduct.save();
    if(result){
        return res.status(200).json({message:"Product added successfully"})
    }
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"error hile adding  "+err})
        
    }
}

async function getProduct(req,res) {
    try{
        const productResult=await products.find({})
        
        if(productResult){
            console.log(productResult)
            return res.status(200).json({productResult})
        }
    }catch(err){
        return res.status(500).json({message:"error while getting products "+err})
    }
}

async function getProductById(req,res) {
    const {id}=req.params;
    try{
        const getProductByIdResult=await products.findById(id)
        if(getProductByIdResult){
            console.log(getProductByIdResult)
            return res.status(200).json({getProductByIdResult})
        }
    }catch(err){
        return res.status(500).json({message:"error while getting product "+err})
    }
}

async function addRating(req,res) {
    const {id}=req.params;
    const {rating}=req.body
   try{
     const product=await products.findById(id)
    product.ratings.push(rating);  // Only updates ratings array
    const result=await product.save(); // Saves the update to DB
    if(result){
        return res.status(200).json({message:"Rating added successfully"})
    }
   }catch(err){
        return res.status(500).json({message:"error while getting product "+err})
    }
}
const ProductController={
    addProduct,
    getProduct,
    getProductById,
    addRating
}
module.exports=ProductController