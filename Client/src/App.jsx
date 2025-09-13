import React, { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import { Toaster } from 'react-hot-toast';
import { getUser } from './Utility/getUser'
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import Products from './Components/Products'
import Services from './Components/Services'
import ConfirmOrder from './Pages/ConfirmOrder'
import Profile from './Pages/Profile'

const App = () => {
  const [userData, setUserData]=useState(()=>getUser());
  return (
    <div>
      <Navbar userData={userData} setUserData={setUserData}/>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login setUserData={setUserData}/>}></Route>
        <Route path='/adminLogin' element={<AdminLogin setUserData={setUserData}/>}></Route>
        <Route path='/services' element={<Services/>}></Route>
        <Route path='/products/:id' element={<Products/>}></Route>
        <Route path='/confirmOrder' element={<ConfirmOrder/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </div>
  )
}

export default App
