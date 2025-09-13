import React, { useState } from 'react'
import { assets } from '../../assets/QuickBlog-Assets/assets'
import toast from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from '../../Middleware/Middleware';

const AddProducts = () => {
    const [image,setImage]=useState(false);
    const [title,setTitle]=useState('');
    const [name,SetName]=useState('')
    const [price,SetPrice]=useState('')
    const [brand,setBrand]=useState('')
    const [fabric,setFabric]=useState('')
    const [description,setDescription]=useState('')
    const [category,setCategory]=useState('Clothes')//by default it is lifestyle



    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        const formData=new FormData()
        formData.append("thumbnailImage",image)
        formData.append("title",title)
        formData.append("name",name)
        formData.append("price",price)
        formData.append("brand",brand)
        formData.append("fabric",fabric)
        formData.append("description",description)
        formData.append("category",category)

        try{
            const addBlogResult=await axiosInstance().post("/addproduct",formData,{
                 headers: { "Content-Type": "multipart/form-data" },
            });
            if(addBlogResult.status===200){
                toast.success("Product added successfully")
            }

        }catch(err){
            const error=err.response?.error?.message || "Add product failed"
            toast.error(error)
            console.log(err)
        }
        //console.log(BlogData)

    }
  return (
    <div className='w-full  overflow-auto h-165'>
         <form onSubmit={onSubmitHandler} className="sm:w-180 w-80 ml-2 mt-2 sm:my-10 sm:ml-10 bg-white px-5 py-5 rounded bgShadow  flex flex-col ">
                <div className="image">
                    <p className='text-primary font-medium'>Upload Thumbnail</p>
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className=' w-40 h-30 rounded  cursor-pointer'/>
                        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden   />
                    </label>
                </div>
                <p className='mt-3 text-primary font-medium'>Product Title</p>
                <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder='Enter product title' className='border text-primary/80 px-2 py-2 mt-1 border-gray-300 rounded focus:outline-none  sm:w-lg'/>
                <p className='mt-3 text-primary font-medium'>Product Name</p>
                <input type="text" onChange={(e)=>SetName(e.target.value)} placeholder='Enter product name' className='border text-primary/80 px-2 py-2 mt-1 border-gray-300 rounded focus:outline-none sm:w-lg'/>
                <p className='mt-3 text-primary font-medium'>Price</p>
                <input type="number" onChange={(e)=>SetPrice(e.target.value)} placeholder='Enter product name' className='border text-primary/80 px-2 py-2 mt-1 border-gray-300 rounded focus:outline-none sm:w-lg'/>
                <p className='mt-3 text-primary font-medium'>Brand</p>
                <input type="text" onChange={(e)=>setBrand(e.target.value)} placeholder='Enter product name' className='border text-primary/80 px-2 py-2 mt-1 border-gray-300 rounded focus:outline-none sm:w-lg'/>
                <p className='mt-3 text-primary font-medium'>Fabric</p>
                <input type="text" onChange={(e)=>setFabric(e.target.value)} placeholder='Enter product name' className='border text-primary/80 px-2 py-2 mt-1 border-gray-300 rounded focus:outline-none sm:w-lg'/>
                <p className='mt-3 text-primary font-medium'>Description</p>
                <input type="text" onChange={(e)=>setDescription(e.target.value)} placeholder='Enter product name' className='border text-primary/80 px-2 py-2 mt-1 border-gray-300 rounded focus:outline-none sm:w-lg'/>
                <p className='mt-3 text-primary font-medium'>Category</p>
                <select name="" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} className='text-primary border w-35 px-1 py-1 mt-1 rounded border-primary/10 focus:outline-none'>
                    <option value="Clothes" className=''>Clothes</option>
                    <option value="Vegitables">Vegitables</option>
                    <option value="Electronics">Electronics</option>
                    <option value="BeautyProducts">Beauty products</option>
                    <option value="Stationary">Stationary</option>
                </select>
                <button type='submit ' className='flex items-center text-white bgShadow rounded justify-center flex-start mt-2  py-1 w-30 bg-primary/80  hover:bg-primary hover:cursor-pointer'>Add Blog</button>
         </form>
    </div>
  )
}

export default AddProducts
