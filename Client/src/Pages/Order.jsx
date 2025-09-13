import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axiosInstance from '../Middleware/Middleware'
import { useNavigate } from 'react-router-dom'

const Order = () => {
    const [orders,setOrders]=useState([])
    const navigate=useNavigate();

    useEffect(()=>{
        const getOrders=async()=>{
            const orderResults=await axiosInstance().get('/getOrder');
            if(orderResults.status===200){
                console.log(orderResults.data.orderResult)
                setOrders(orderResults.data.orderResult)
            }
        }
        getOrders();
    },[])

  return (
    <div className='bg-primary/10 min-h-screen py-10'>
    {orders.map((order)=>(
        <div key={order._id} className="bg-white rounded-lg bgShadow2 mt-12 p-5 mx-4 ">
            <h1 className="text-xl font-bold mb-2">Order Details</h1>
            <p className="text-gray-700">OrderID: {order._id}</p>
            <p className="text-gray-700">Payment Mode: {order.paymentMode}</p>
            <p className="text-gray-700">Total: ₹{order.totalAmount}</p>
            <div className="flex flex-wrap  gap-2 ">
                {order.items.map((item)=>{
                    const imageUrl = `http://localhost:5002/uploads/${item.product.thumbnailImage}`;
                return(
                    <div key={item.product._id} onClick={() => navigate(`/products/${item.product._id}`)}  className="sm:w-50  mb-2 gap-1  flex flex-col hover:cursor-pointer bg-white rounded-lg hover:scale-105 bgShadow ">
                    <img src={imageUrl} alt="" className='w-full h-30 rounded-lg'/>
                    <p className='text-primary ml-2'>Product: <span className='text-primary/80'>{item.product.name}</span></p>
                    <p className='text-primary ml-2'>Price: <span className='text-primary/80'>Rs. {item.product.price}</span></p>
                    </div>
                )
            })}
            </div>
        </div>
    ))}
</div>
  )
}

export default Order
