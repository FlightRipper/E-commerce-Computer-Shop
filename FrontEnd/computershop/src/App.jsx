import React from 'react'
import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import SignInPage from './pages/loginpage/signin.jsx';
import RegisterPage from './pages/registerpage/register.jsx';
import Homepage from './pages/homepage/homepage.jsx';
import { useAuthContext } from './hooks/useAuthContext.jsx';
import SingleProduct from './pages/singleproduct/singleproduct.jsx';
import ScrollToTop from './pages/ScrollToTop.jsx';
import AboutUs from './pages/aboutus/aboutus.jsx';
import ContactUs from './pages/contactus/contactus.jsx';
import CartPage from './pages/cart/cart.jsx';
import ViewAll from './pages/viewall/viewall.jsx';
function App() {
  
  const {user} = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/homepage" element={<><ScrollToTop/><Homepage /></>}/>
          <Route path="/single/:productid" element={<><ScrollToTop/><SingleProduct /></>}/>
          <Route path="/about" element={<><ScrollToTop/><AboutUs /></>}/>
          <Route path="/contact" element={<><ScrollToTop/><ContactUs /></>}/>
          <Route path="/cart" element={ user ? <><ScrollToTop/><CartPage /></> : <Navigate to={'/'} />}/>
          <Route path="/shop" element={<><ScrollToTop/><ViewAll /></>}/>
          
          {/* <Route
            path="/admin"
            element={isAdmin ? <AdminPage /> : <Navigate to={'/'} />}
          />
          <Route path="/displayAll"  element={<AllMemes />}/>
          <Route path="/register" element={<RegisterPage />}/>
          */}
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
