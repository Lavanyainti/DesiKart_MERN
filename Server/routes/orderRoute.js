const express=require('express')
const route=express.Router()
const middleware=require('../Middleware/middleware')
const { addOrder, getOrder } = require('../controller/orderController')

route.post('/buy',middleware,addOrder)
route.get('/getOrder',middleware,getOrder)
module.exports=route