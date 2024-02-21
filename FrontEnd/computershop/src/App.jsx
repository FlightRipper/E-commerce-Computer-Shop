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

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/homepage" element={<Homepage />}/>
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