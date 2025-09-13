import React, { useState } from 'react'
import { assets } from '../assets/QuickBlog-Assets/assets'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('')
    const navigate=useNavigate();

    const handleRegisterSubmit=async (e)=>{
        e.preventDefault();

        if(!email || !password || !confirmPassword){
            toast.error("All fiels required")
            return
        }

        const userData={
            email:email,
            password:password,
            confirmPassword:confirmPassword
        }

        if(userData.password !== userData.confirmPassword){
                toast.error('Passwords do not match')
                return
        }
        try{
            const registerResult=await axios.post('http://localhost:5002/api/register',userData);
            if(registerResult.status===200 || registerResult.status===201){
                toast.success('Registration successful')
                navigate('/login')
            }
        }catch(err){
            toast.error(err.response?.data?.message || err.message || "Something went wrong")
        }
        
    }
  return (
     <div className='flex flex-col items-center justify-center mt-30  '>{/*h-screen in height to full screen */}
         <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50' alt="" />
         <h1 className=' text-center font-semibold text-xl sm:text-4xl'>Create your account</h1>
                 <div className="border rounded-lg border-primary/10 p-10 max-w-sm sm:max-w-xl gap-2 bg-white mt-10  bgShadow">
                         <form className='flex flex-col ' onSubmit={handleRegisterSubmit}>
                             <p className='text-gray-700'>Username</p>
                             <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter Your Email Address' className='border border-primary/20 bg-primary-4 px-5 py-2 rounded sm:w-sm focus:outline-none' required/>
                             <p className='mt-4 text-gray-700'>Password</p>
                             <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter Your Password' className='border border-primary/20 bg-primary-4 px-5 py-2 rounded focus:outline-none' required/>
                             <p className='mt-4 text-gray-700'>Confirm Password</p>
                             <input type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='Re-Enter Your Password' className='border border-primary/20 bg-primary-4 px-5 py-2 rounded focus:outline-none' required/>
                             <button type='submit' className='border border-primary/20 bg-primary/90 px-5 py-1 text-white mt-5 rounded hover:bg-primary/100 hover:cursor-pointer' >Sign Up</button>
                         </form>
                 </div>
        </div>
   )
}

export default Register
