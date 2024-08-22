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
import Navbar from './components/navbar/navbar.jsx';
import Community from './pages/community/community.jsx';

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/homepage" element={<><ScrollToTop /><Homepage /></>} />
          <Route path="/community" element={<><ScrollToTop /><Community /></>} />
          <Route path="/single/:productid" element={<><ScrollToTop /><SingleProduct /></>} />
          <Route path="/about" element={<><ScrollToTop /><AboutUs /></>} />
          <Route path="/contact" element={<><ScrollToTop /><ContactUs /></>} />
          <Route path="/cart" element={user ? <><ScrollToTop /><CartPage /></> : <Navigate to={'/'} />} />
          <Route path="/shop" element={<><ScrollToTop /><ViewAll /></>} />
          <Route path='/admin' element={<><ScrollToTop /><AdminPage /></>} />
          {/* <Route
            path="/admin"
            element={isAdmin ? <AdminPage /> : <Navigate to={'/'} />}
          />
          */}

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
