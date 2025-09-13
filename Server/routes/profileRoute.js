const express=require('express');
const route=express.Router();
const middleware=require('../Middleware/middleware')
const multer=require('multer')
const path=require('path');
const { addProfile, getProfile } = require('../controller/profileController');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'uploads/')
    },
    filename:(req,file,cb)=>{
            cb(null, Date.now() + path.extname(file.originalname));
    }
})

const uploads=multer({storage});

route.post('/addProfile',middleware,uploads.single('profileImage'),addProfile);
route.get('/getProfile',middleware,getProfile)
module.exports=route