import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../Middleware/Middleware';
import toast from 'react-hot-toast';
import { assets } from '../assets/QuickBlog-Assets/assets';
import StarWhite from '../assets/QuickBlog-Assets/star_white.png'
import moment from 'moment'



const Products = () => {
  const {id}=useParams();
  const [productData,setProductData]=useState(null)
  const [rating,setRating]=useState('5')
  const [review,setReview]=useState('')
  const [reviews,setReviews]=useState([])

  const hadleAddReview=async (e)=>{
      e.preventDefault();
      const reviewData={
        comment:review
      }
      try{
        const addReview=await axiosInstance().post(`/addReview/${id}`,reviewData)
        if(addReview.status===200){
          toast.success("Added successfully")
        }
      }catch(err){
        toast.error(err.response?.error?.message || "can't add review")
      }
  }
  

  const hadleRating=async (e)=>{
    e.preventDefault();
        const ratingNumber=Number(rating)

        try{
          const addRating=await axiosInstance().put(`/addRating/${id}`,{rating:ratingNumber})
        if(addRating.status===200){
          toast.success("Rating addedd succesfully")
        }
        }catch(err){
          toast.error(err.response?.err?.message || "can't add rating")
        }
  }

  const handleAddCart=async(e)=>{
    e.preventDefault();
     try{
      const cartaddresult=await axiosInstance().post(`/addCart/${id}`);
     if(cartaddresult.status===200){
       toast.success('Added successfully')
     }
     }catch(err){
      console.log(err)
      toast.error("Failed to add")
     }

  }


  useEffect(()=>{
      const fetchProduct=async()=>{
        try{
          const fetchProductResult=await axiosInstance().get(`getProductById/${id}`)
          if(fetchProductResult.status===200){
              setProductData(fetchProductResult.data.getProductByIdResult)
              console.log(fetchProductResult)
          }
        }catch(err){
          toast.error(err.response?.error?.message)
        }
      }

      const fetchReview=async ()=>{
          try{
            const reviewResult=await axiosInstance().get(`/getReview/${id}`)
            if(reviewResult.status===200){
              console.log(reviewResult.data.reviewsResult)
               setReviews(reviewResult.data.reviewsResult)
            }
          }catch(err){
            console.log(err)
          toast.error(err.response?.err?.message || "Failed to fetch rviews")
        }
      }
      fetchProduct();
      fetchReview();
  },[])
  if (!productData) {
        return (
          <div className="text-center text-gray-500 mt-10">
            Loading product...
          </div>
        );
      }

  const ratings = productData.ratings || [];
  const averageRating = ratings.length > 0
  ? (ratings.reduce((acc, val) => acc + Number(val), 0) / ratings.length).toFixed(1)
  : "0.0";

  const imageUrl = `http://localhost:5002/uploads/${productData.thumbnailImage}`;
  return (
             <div className='flex flex-col gap-2 justify-center items-center w-full mt-10'>
                <div   className="sm:w-80   gap-1  flex flex-col hover:cursor-pointer bg-white rounded-lg hover:scale-105 bgShadow ">
                    
                    <img src={imageUrl} alt="" className=' sm:w-full h-60'/>
                    <p className='text-gray-500 ml-2 '>Trendy Dress</p>
                    <p className=' ml-2'><span className='text-gray-500'>{productData.description}</span></p>
                    <p className=' ml-2'>Name: {productData.name}</p>
                    <p className=' ml-2'>Price: {productData.price} </p>
                    <p className=' ml-2'>Brand <span className='text-gray-500'>{productData.brand}</span></p>
                    <p className=' ml-2'>Fabric <span className='text-gray-500'>{productData.fabric}</span></p>
                    <div className="flex w-10 items-center bg-green-600 gap-1 rounded-md text-white px-1 py-1 mb-2  ml-2">
                        <p className="text-sm font-medium">{averageRating}</p>
                        <img src={StarWhite} alt="" className='w-2.5 '/>
                        <p className="text-xs">({ratings.length})</p>
                    </div>
                    <div className="">
                      <button onClick={(e)=>handleAddCart(e)} className='border mb-2 ml-2 px-2 py-1 hover:cursor-pointer'>Add to cart</button>
                    </div>
                </div>

                <div className="mt-10">
                  <form onSubmit={hadleRating}>
                      <select name="" id="rating" value={rating} onChange={(e)=>setRating(e.target.value)} className='text-primary border w-35 px-1 py-1 mt-1 rounded border-primary/10 focus:outline-none'>
                          <option value="1" className=''>1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                      </select>
                <button type='submit ' className='flex items-center text-white bgShadow rounded justify-center flex-start mt-2  py-1 w-30 bg-primary/80  hover:bg-primary'>Submit Rating</button>
                  </form>
                </div>
                <div className="flex flex-col justify-center mx-auto  md:max-w-3xl my-5">
                        <h2 className="font-semibold text-xl mb-4">Reviews({reviews.length})</h2>
                        {reviews.length===0 ?(
                            <div></div>
                        ):(
                            reviews.map((r)=>{
                              const imageUrl = `http://localhost:5002/uploads/${r.userProfile.profileImage}`;
                              return(
                                <div key={r._id} className="bg-gray-50 border border-gray-200 p-4 rounded-3xl mb-3 shadow-sm w-sm md:w-lg ">
                                <div className="flex gap-2">
                                  <img src={imageUrl? imageUrl :assets.user_icon} alt="" className='w-6 rounded-full'/>
                                  <p className="font-medium ">{r.userProfile.userName}</p>
                                </div>
                                <div className="flex justify-between">
                                      <p className="text-gray-700 mt-1 text-sm sm:text-base ml-8">{r.comment}</p>
                                    <p className="mt-1 text-gray-500  "> {moment(r.createdAt).fromNow()}</p>
                                </div> 
                              </div>
                              )
                            })
                        )}
                </div>

                <div className="flex flex-col mx-auto justify-center max-w-3xl gap-3">
                  <h2 className='rich-text font-medium'>Add Review</h2>
                  <form className='flex flex-col gap-5' onSubmit={hadleAddReview}>
                        <textarea placeholder='Enter Your Comment' value={review} onChange={(e)=>setReview(e.target.value)} className='w-100 h-40 border border-gray-300 rounded px-3 focus:outline-none'></textarea>
                        <button type='submit' className='border border-primary/25 rounded px-3 py-1 w-25 rounded bg-primary/20 hover:bg-primary/30'>Add</button>
                  </form>
                </div>
             </div>
  )
}

export default Products
