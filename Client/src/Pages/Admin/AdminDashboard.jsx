import React, { useState } from 'react'
import Navbar from '../../Components/Navbar';
import { AiOutlinePlusCircle, AiOutlineFileText, AiOutlineComment } from "react-icons/ai";
import { FaUserCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Products from '../../Components/Products';
import Services from '../../Components/Services';
import AddProducts from './AddProducts';
import AddServices from './AddServices';
import AddNews from './AddNews';
import News from '../../Components/News';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("services");

  const renderSection = () => {
    switch (activeSection) {
      case "services":
        return <Services />
      case "news":
        return <News />
      case "addproducts":
        return <AddProducts />
      case "addservices":
        return <AddServices />
      case "addnews":
        return <AddNews />
    }
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

          <Link onClick={() => setActiveSection("news")} className="flex-1 sm:flex-none">
            <p className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4 sm:px-2 py-3 text-sm sm:text-base
              ${activeSection === 'news' ? 'text-primary/100 bg-primary/8 border-t-[2px] sm:border-r-[2px] sm:border-t-[0] rounded bgShadow3' : 'text-primary/60 hover:text-primary'}`}>
              <FaUserCog size={20} />
              <span className="text-[11px] sm:text-base">News</span>
            </p>
          </Link>

          <Link onClick={() => setActiveSection("addproducts")} className="flex-1 sm:flex-none">
            <p className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4 sm:px-2 py-3 text-sm sm:text-base
              ${activeSection === 'addproducts' ? 'text-primary/100 bg-primary/8 border-t-[2px] sm:border-r-[2px] sm:border-t-[0] rounded bgShadow3' : 'text-primary/60 hover:text-primary'}`}>
              <AiOutlineFileText size={20} />
              <span className="text-[11px] sm:text-base">Add Prod</span>
            </p>
          </Link>

          <Link onClick={() => setActiveSection("addservices")} className="flex-1 sm:flex-none">
            <p className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4 sm:px-2 py-3 text-sm sm:text-base
              ${activeSection === 'addservices' ? 'text-primary/100 bg-primary/8 border-t-[2px] sm:border-r-[2px] sm:border-t-[0] rounded bgShadow3' : 'text-primary/60 hover:text-primary'}`}>
              <AiOutlineComment size={20} />
              <span className="text-[11px] sm:text-base">Add Serv</span>
            </p>
          </Link>

          <Link onClick={() => setActiveSection("addnews")} className="flex-1 sm:flex-none">
            <p className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4 sm:px-2 py-3 text-sm sm:text-base
              ${activeSection === 'addnews' ? 'text-primary/100 bg-primary/8 border-t-[2px] sm:border-r-[2px] sm:border-t-[0] rounded bgShadow3' : 'text-primary/60 hover:text-primary'}`}>
              <FaUserCog size={20} />
              <span className="text-[11px] sm:text-base">Add News</span>
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

export default AdminDashboard
