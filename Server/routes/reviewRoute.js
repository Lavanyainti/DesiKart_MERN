const express=require('express')
const route=express.Router();
const middleware=require('../Middleware/middleware');
const { addReview, getReview } = require('../controller/reviewController');

route.post('/addReview/:id',middleware,addReview)
route.get('/getReview/:id',middleware,getReview)
module.exports=route