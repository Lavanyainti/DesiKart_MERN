import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../Middleware/Middleware';
import { useNavigate } from 'react-router-dom';
import Clothes from '../assets/QuickBlog-Assets/clothes.jpg'
import Vegitables from '../assets/QuickBlog-Assets/vegitables.webp'
import Electronics from '../assets/QuickBlog-Assets/electronics.webp'
import Stationary from '../assets/QuickBlog-Assets/stationary.webp'
import Beauty from '../assets/QuickBlog-Assets/beauty.webp'
import StarWhite from '../assets/QuickBlog-Assets/star_white.png'

const Services = () => {
  const navigate=useNavigate();
  const [products,setProducts]=useState([]);
  const [clothes,setClothes]=useState([])
  const [vegitables,setVegitables]=useState([])
  const [electronics,setElectronics]=useState([])
  const [beauty,setBeauty]=useState([])
  const [stationary,setStationary]=useState([])
  const [activeSection,setActiveSection]=useState("clothes")

  useEffect(()=>{
        const getProduct=async ()=>{
          try{
            const productResults=await axiosInstance().get('/getProduct')
            if(productResults.status===200){
              const allProducts=productResults.data.productResult
              setProducts(allProducts)
              setClothes(allProducts.filter(p=>p.category==="Clothes"))
            setVegitables(allProducts.filter(p=>p.category==="Vegitables"))
            setElectronics(allProducts.filter(p=>p.category==="Electronics"))
            setBeauty(allProducts.filter(p=>p.category==="BeautyProducts"))
            setStationary(allProducts.filter(p=>p.category==="Stationary"))
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
    <div className="flex flex-col sm:flex-row sm:h-165 h-150 overflow-y-auto">
      
      {/* Sidebar Links */}
      <div className="w-full sm:w-40 rounded-lg  bgShadow2 h-30 sm:h-165 bg-primary/5 flex sm:flex-col  text-[11px] sm:text-base overflow-x-auto sm:overflow-y-auto">
        <div className={`border-b border-gray-300  w-full text-center ${activeSection==="clothes"? 'bg-white' :""}`} onClick={()=>{setActiveSection("clothes")}}>
          <a href="#clothes" className="flex flex-col items-center gap-1 mt-2">
            <img src={Clothes} className="w-10 h-10 rounded-full bg-white" />
            <p>Clothes</p>
          </a>
        </div>
        <div className={`border-b border-gray-300 py-2 w-full text-center ${activeSection==="vegitables"? 'bg-white' :""}`} onClick={()=>{setActiveSection("vegitables")}}>
          <a href="#vegetables" className="flex flex-col items-center gap-1">
            <img src={Vegitables} className="w-10 h-10 rounded-full bg-white" />
            <p>Vegitables</p>
          </a>
        </div>
        <div className={`border-b border-gray-300 py-2 w-full text-center ${activeSection==="electronics"? 'bg-white' :""}`} onClick={()=>{setActiveSection("electronics")}}>
          <a href="#Electronics" className="flex flex-col items-center gap-1">
            <img src={Electronics} className="w-10 h-10 rounded-full bg-white" />
            <p>Electronics</p>
          </a>
        </div>
        <div className={`border-b border-gray-300 py-2 w-full text-center ${activeSection==="beauty"? 'bg-white' :""}`} onClick={()=>{setActiveSection("beauty")}}>
          <a href="#Beauty" className="flex flex-col items-center gap-1">
            <img src={Beauty} className="w-10 h-10 rounded-full bg-white" />
            <p>Beauty Products</p>
          </a>
        </div>
        <div className={`border-b border-gray-300 py-2 w-full text-center ${activeSection==="stationary"? 'bg-white' :""}`} onClick={()=>{setActiveSection("stationary")}}>
          <a href="#Stationary" className="flex flex-col items-center gap-1">
           <img src={Stationary} className="w-10 h-10 rounded-full bg-white" />
            <p>Stationary</p>
          </a>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="w-full sm:w-3/4 h-full overflow-y-auto scroll-smooth px-4 py-6 space-y-10" >

        {/* Section 1 */}
        <section id="clothes" className=" ">
          <div className="flex flex-wrap justify-center gap-8">
            {clothes.length===0 ? (
              <div className='flex items-center justify-center mt-10 '>
                <p className='text-gray-500'>No products available in this category</p>
              </div>
                ):(
                  clothes.map((product)=>{
                  const imageUrl = `http://localhost:5002/uploads/${product.thumbnailImage}`;
                  const ratings = product.ratings || [];
                  const averageRating = ratings.length > 0
                  ? (ratings.reduce((acc, val) => acc + Number(val), 0) / ratings.length).toFixed(1)
                  : "0.0";
                    return(
                      (
                        <div key={product._id} onClick={() => navigate(`/products/${product._id}`)}  className="sm:w-60 w-30 mb-2 gap-1  flex flex-col hover:cursor-pointer bg-white rounded-lg hover:scale-105 bgShadow ">
                        <img src={imageUrl} alt="" className='w-full h-30 rounded-lg'/>
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
        </section>

        {/* Section 2 */}
        <section id="vegetables" className=" ">
          <div className="flex flex-wrap justify-center gap-5">
            {vegitables.length===0 ? (
              <div className='flex items-center justify-center mt-10'>
                <p className='text-gray-500'>No products available in this category</p>
              </div>
                ):(
                  vegitables.map((product)=>{
                  const imageUrl = `http://localhost:5002/uploads/${product.thumbnailImage}`;
                  const ratings = product.ratings || [];
                  const averageRating = ratings.length > 0
                  ? (ratings.reduce((acc, val) => acc + Number(val), 0) / ratings.length).toFixed(1)
                  : "0.0";
                    return(
                      (
                        <div key={product._id}onClick={() => navigate(`/products/${product._id}`)}  className="sm:w-60 w-30 mb-2 gap-1  flex flex-col hover:cursor-pointer bg-white rounded-lg hover:scale-105 bgShadow">
                        <img src={imageUrl} alt="" className='w-full h-30 rounded-lg'/>
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
          </section>
        <section id='Electronics'>
          <div className="flex flex-wrap justify-center gap-5">
            {electronics.length===0 ? (
              <div className='flex items-center justify-center mt-10'>
                <p className='text-gray-500'>No products available in this category</p>
              </div>
                ):(
                  electronics.map((product)=>{
                  const imageUrl = `http://localhost:5002/uploads/${product.thumbnailImage}`;
                  const ratings = product.ratings || [];
                  const averageRating = ratings.length > 0
                  ? (ratings.reduce((acc, val) => acc + Number(val), 0) / ratings.length).toFixed(1)
                  : "0.0";
                    return(
                      (<div key={product._id} onClick={() => navigate(`/products/${product._id}`)}  className="sm:w-60 w-30 mb-2 gap-1  flex flex-col hover:cursor-pointer bg-white rounded-lg hover:scale-105 bgShadow ">
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
        </section>
          <section id='Beauty'>
          <div className="flex flex-wrap justify-center gap-5">
            {beauty.length===0 ? (
              <div className='flex items-center justify-center mt-10'>
                <p className='text-gray-500'>No products available in this category</p>
              </div>
                ):(
                  beauty.map((product)=>{
                  const imageUrl = `http://localhost:5002/uploads/${product.thumbnailImage}`;
                  const ratings = product.ratings || [];
                  const averageRating = ratings.length > 0
                  ? (ratings.reduce((acc, val) => acc + Number(val), 0) / ratings.length).toFixed(1)
                  : "0.0";
                    return(
                      (
                        <div key={product._id} onClick={() => navigate(`/products/${product._id}`)}  className="sm:w-60 w-30 mb-2 gap-1  flex flex-col hover:cursor-pointer bg-white rounded-lg hover:scale-105 bgShadow ">
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
        </section>
          <section id='Stationary'>
          <div className="flex flex-wrap justify-center gap-5">
            {stationary.length===0 ? (
              <div className='flex items-center justify-center mt-10'>
                <p className='text-gray-500'>No products available in this category</p>
              </div>
                ):(
                  stationary.map((product)=>{
                  const imageUrl = `http://localhost:5002/uploads/${product.thumbnailImage}`;
                  const ratings = product.ratings || [];
                  const averageRating = ratings.length > 0
                  ? (ratings.reduce((acc, val) => acc + Number(val), 0) / ratings.length).toFixed(1)
                  : "0.0";
                    return(
                      (
                        <div key={product._id} onClick={() => navigate(`/products/${product._id}`)}  className="sm:w-60 w-30 mb-2 gap-1  flex flex-col hover:cursor-pointer bg-white rounded-lg hover:scale-105 bgShadow ">
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
        </section>

      </div>
    </div>
  );
};

export default Services;
