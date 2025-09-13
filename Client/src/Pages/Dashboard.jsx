import React, { useState } from 'react'
import { AiFillDashboard, AiOutlinePlusCircle, AiOutlineFileText, AiOutlineComment } from "react-icons/ai";
import { FaUsers ,FaUserCog} from 'react-icons/fa';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Products from '../Components/Products';
import Services from '../Components/Services';
import News from '../Components/News';
import Profile from './Profile';
import ViewProfile from './ViewProfile';
import axiosInstance from '../Middleware/Middleware';
import Cart from './Cart';
import Order from './Order';
const Dashboard = () => {
  const [activeSection, setActiveSection]=useState("services");
  const [profileData,setProfileData]=useState(null)
  const [hasProfile, setHasProfile]=useState(false);

    useEffect(()=>{
          const fetchProfile=async()=>{
                try{
                    const profileResult=await axiosInstance().get('/getProfile')
                    console.log(profileResult)
                    if(profileResult.status===200){
                          setHasProfile(true)
                          setProfileData(profileResult.data.getProfileResult)
                    }
                }catch(err){
                  console.log(err)
                  toast.error("Failed to get profile")
                }
          }
        fetchProfile();
  },[])

  const renderSection=()=>{
        switch(activeSection){
            case "services":
              return <Services/>;
            case "profile":
              return hasProfile ? <ViewProfile profileData={profileData}/> : <Profile/>
            case "cart":
              return <Cart/>
              case "order":
              return <Order/>
            case "news":
              return <News/>
        }
  }
 if(profileData){
  console.log(profileData)
 }
 return (
     <div>
       <div className="flex sm:flex-row flex-col   ">
 
         {/* Sidebar */}
         <div className="fixed bottom-0 sm:static z-50 w-full sm:gap-5 bg-white sm:w-60 flex sm:flex-col  bgShadow sm:h-165">
           
           <Link onClick={() => setActiveSection("services")} className="flex-1 sm:flex-none ">
             <p className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4 sm:px-2   py-3 text-sm sm:text-base
               ${activeSection === 'services' ? 'text-primary/100 bg-primary/8 border-t-[2px] sm:border-r-[2px] sm:border-t-[0] rounded bgShadow3' : 'text-primary/60 hover:text-primary'}`}>
               <AiOutlinePlusCircle size={20} />
               <span className="text-[11px] sm:text-base">Services</span>
             </p>
           </Link>
              <Link onClick={() => setActiveSection("profile")} className="flex-1 sm:flex-none ">
             <p className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4 sm:px-2   py-3 text-sm sm:text-base
               ${activeSection === 'profile' ? 'text-primary/100 bg-primary/8 border-t-[2px] sm:border-r-[2px] sm:border-t-[0] rounded bgShadow3' : 'text-primary/60 hover:text-primary'}`}>
               <AiOutlinePlusCircle size={20} />
               <span className="text-[11px] sm:text-base">Profile</span>
             </p>
           </Link>
           <Link onClick={() => setActiveSection("cart")} className="flex-1 sm:flex-none">
             <p className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4 sm:px-2 py-3 text-sm sm:text-base
               ${activeSection === 'cart' ? 'text-primary/100 bg-primary/8 border-t-[2px] sm:border-r-[2px] sm:border-t-[0] rounded bgShadow3' : 'text-primary/60 hover:text-primary'}`}>
               <FaUserCog size={20} />
               <span className="text-[11px] sm:text-base">Your Cart</span>
             </p>
           </Link>
            <Link onClick={() => setActiveSection("order")} className="flex-1 sm:flex-none">
             <p className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4 sm:px-2 py-3 text-sm sm:text-base
               ${activeSection === 'order' ? 'text-primary/100 bg-primary/8 border-t-[2px] sm:border-r-[2px] sm:border-t-[0] rounded bgShadow3' : 'text-primary/60 hover:text-primary'}`}>
               <FaUserCog size={20} />
               <span className="text-[11px] sm:text-base">Your Orders</span>
             </p>
           </Link>
           <Link onClick={() => setActiveSection("news")} className="flex-1 sm:flex-none">
             <p className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4 sm:px-2 py-3 text-sm sm:text-base
               ${activeSection === 'news' ? 'text-primary/100 bg-primary/8 border-t-[2px] sm:border-r-[2px] sm:border-t-[0] rounded bgShadow3' : 'text-primary/60 hover:text-primary'}`}>
               <FaUserCog size={20} />
               <span className="text-[11px] sm:text-base">News</span>
             </p>
           </Link>
 
         </div>
 
         {/* Main Content */}
         <div className="w-full pt-2 sm:pt-0 pb-16 sm:pb-0 h-165 overflow-y-auto">
           {renderSection()}
         </div>
       </div>
     </div>
   )
}

export default Dashboard
