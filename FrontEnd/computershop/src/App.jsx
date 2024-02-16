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
import { useAuthContext } from './hooks/useAuthContext.jsx';

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />}/>
        {/* <Route
          path="/admin"
          element={isAdmin ? <AdminPage /> : <Navigate to={'/'} />}
        />
        <Route path="/displayAll"  element={<AllMemes />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/test" element={<PushNotificationSend />}/> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
