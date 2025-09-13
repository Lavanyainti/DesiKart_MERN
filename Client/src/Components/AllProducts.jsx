import React, { useEffect, useState } from 'react'
import axiosInstance from '../Middleware/Middleware';
import { useNavigate } from 'react-router-dom';
import StarWhite from '../assets/QuickBlog-Assets/star_white.png'


const AllProducts = () => {
    const [products,setProducts]=useState([]);
    const navigate=useNavigate()
      useEffect(()=>{
        const getProduct=async ()=>{
          try{
            const productResults=await axiosInstance().get('/getProduct')
            if(productResults.status===200){
              const allProducts=productResults.data.productResult
              setProducts(allProducts)
            }
            console.log(productResults.data.productResult)
          }catch(err){
            toast.error(err.response?.err?.message || "Failed to load products")
            console.log(err)
          }
        }
        getProduct()
     },[])
    
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-8 mb-5">
                  {products.length===0 ? (
                    <div className='flex items-center justify-center mt-10 '>
                      <p className='text-gray-500'>No products available in this category</p>
                    </div>
                      ):(
                        products.map((product)=>{
                        const imageUrl = `http://localhost:5002/uploads/${product.thumbnailImage}`;
                        const ratings = product.ratings || [];
                        const averageRating = ratings.length > 0
                        ? (ratings.reduce((acc, val) => acc + Number(val), 0) / ratings.length).toFixed(1)
                        : "0.0";
                          return(
                            (
                              <div key={product._id} onClick={() => navigate(`/products/${product._id}`)}  className="sm:w-60 mb-2 gap-1  flex flex-col hover:cursor-pointer bg-white rounded-lg hover:scale-105 bgShadow ">
                              <img src={imageUrl} alt="" className='w-30 sm:w-full h-30 rounded-lg'/>
                              <p className='text-primary ml-2'>Product: <span className='text-primary/80'>{product.name}</span></p>
                              <p className='text-primary ml-2'>Price: <span className='text-primary/80'>Rs. {product.price}</span></p>
                              <div className="flex gap-2  mb-2 items-center  ml-2">
                                  <div className="flex items-center  bg-green-600 gap-1 rounded-md text-white px-1  ">
                                    <p className="text-sm font-medium ">{averageRating}</p>
                                    <img src={StarWhite} alt="" className='w-2.5 '/>
                                  </div>
                                  <p className="text-xs text-primary/50">({ratings.length})</p>
                              </div>
                            </div>
                        ))
                      })
                      )
                  }
                 
        </div>
    </div>
  )
}

export default AllProducts
