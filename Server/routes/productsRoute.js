const express=require('express')
const route=express.Router();

const multer=require('multer')
const path=require('path');
const { addProduct, getProduct, getProductById, addRating } = require('../controller/ProductsController');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'uploads/')
    },
    filename:(req,file,cb)=>{
            cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload=multer({storage});

route.post('/addproduct',upload.single('thumbnailImage'),addProduct)
route.get('/getProduct', getProduct)
route.get('/getProductById/:id',getProductById)
route.put('/addRating/:id',addRating);
module.exports=route