import React, { useEffect, useState } from 'react'
import axiosInstance from '../Middleware/Middleware'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const Cart = () => {
    const [cartIrems,setCartItems]=useState([])
    const [payment,setPayment]=useState('COD')
    const navigate=useNavigate();

    const handleBuy=async(e)=>{
        e.preventDefault();
        const buyitem={
            paymentMode:payment,
        }
        try{
            const buyResult=await axiosInstance().post('buy',buyitem)
        if(buyResult.status===200){
            toast.success('order placed')
            navigate('/confirmOrder')
        }
        }catch(err){
            toast.error(err.response?.error?.message || "Failed to order")
        }
    }

    const handleDelete=async(e,id)=>{
        e.preventDefault();

        try{
            const deleteItem=await axiosInstance().delete(`/deleteItem/${id}`)
            if(deleteItem.status===200){
                setCartItems(prev => prev.filter(item => item.product._id !== id));
            toast.success('delete success')
        }
        }catch(err){
            toast.error(err.response?.error?.message || "Failed to delete")
        }
    }
    
    useEffect(()=>{
        const fetchCart=async ()=>{
            try{
                const cartResult=await axiosInstance().get('/getCart')
            if(cartResult.status===200){
                console.log(cartResult.data.getCartResult)
                setCartItems(cartResult.data.getCartResult)
            }
            }catch(err){
                toast.error('Failed to fetch')
            }
        }
        fetchCart();
    },[])
  return (
    <div>
    <div className='flex flex-wrap sm:px-5 mt-5 px-2 gap-5 '>






     {
        cartIrems.length===0?(
                <div className='flex items-center justify-center mt-10 '>
                    <p className='text-gray-500'>No products available in cart</p>
                </div>
        ):(
            <div className='flex flex-col gap-5 px-6'>
                <div className="  mt-5">
                    <form onSubmit={handleBuy} className='flex gap-2'>
                        <select name="" id="payment" className='border'>
                            <option value="COD" onChange={(e)=>{setPayment(e.target.value)}}>Cash on delivery</option>
                            <option value="UPI" onChange={(e)=>{setPayment(e.target.value)}}>UPI</option>
                        </select>
                        <button type='submit' className='border px-2 py-1 hover:cursor-pointer'>Buy</button>
                    </form>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {cartIrems.map((item)=>{
                const imageUrl= `http://localhost:5002/uploads/${item.product.thumbnailImage}`;
                return(
                    <div key={item._id} onClick={() => navigate(`/products/${item.product._id}`)}  className="sm:w-60 mb-2 gap-1  flex flex-col hover:cursor-pointer bg-white rounded-lg hover:scale-105 bgShadow ">
                    <img src={imageUrl} alt="" className='w-full h-30 rounded-lg'/>
                    <p className='text-primary ml-2'>Product: <span className='text-primary/80'>{item.product.name}</span></p>
                    <p className='text-primary ml-2'>Price: <span className='text-primary/80'>Rs. {item.product.price}</span></p>
                    <p className='text-primary ml-2'>Quantity: <span className='text-primary/80'>{item.quantity}</span></p>
                    <p className='text-primary ml-2'>Service: <span className='text-primary/80'>{item.product.category}</span></p>
                    <button className='border px-2 py-1 bg-primary/80 text-white hover:cursor-pointer hover:bg-primary' onClick={(e)=>handleDelete(e,item.product._id)}>Remove from cart</button>
                    </div>
                )
            })}
                </div>
            </div>
            
        )
      }  
    </div>
    </div>
  )
}

export default Cart
