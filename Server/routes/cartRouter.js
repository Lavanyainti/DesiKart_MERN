const express=require('express')
const route=express.Router()
const middleware=require('../Middleware/middleware')
const { addCart, getCart, deleteItem } = require('../controller/cartController')

route.post('/addCart/:id',middleware,addCart)
route.get('/getCart',middleware,getCart)
route.delete('/deleteItem/:id',middleware,deleteItem)
module.exports=route