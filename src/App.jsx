import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.jsx";

import SignInPage from "./pages/loginpage/signin.jsx";
import RegisterPage from "./pages/registerpage/register.jsx";
import Homepage from "./pages/homepage/homepage.jsx";
import SingleProduct from "./pages/singleproduct/singleproduct.jsx";
import ScrollToTop from "./pages/ScrollToTop.jsx";
import AboutUs from "./pages/aboutus/aboutus.jsx";
import ContactUs from "./pages/contactus/contactus.jsx";
import CartPage from "./pages/cart/cart.jsx";
import ViewAll from "./pages/viewall/viewall.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Community from "./pages/community/community.jsx";
import Admindashboard from "./pages/admindashboard/admindashboard.jsx";
import CategoriesDashboard from "./pages/admindashboard/admindashboardcategories/CategoriesDashboard.jsx";
import SubcategoriesDashboard from "./pages/admindashboard/admindashboardsubcategories/Subcategoriesdashboard.jsx";
import ProductsDashboard from "./pages/admindashboard/admindashboardproducts/ProductsDashboard.jsx";
import OrdersDashboard from "./pages/admindashboard/admindashboardorders/OrdersDashboard.jsx";
import PostsDashboard from "./pages/admindashboard/admindashboardposts/PostsDashboard.jsx";
import ContactusDashboard from "./pages/admindashboard/admindashboardcontactus/Contactusdashboard.jsx";
import Loader from "./components/loader/loader.jsx";

function App() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation, like fetching user details
    const checkUser = async () => {
      if (user !== undefined) {
        setLoading(false); // Stop the loader when user state is determined
      }
    };
    checkUser();
  }, [user]);

  function isAdmin() {
    console.log("user", user);
    return user && user.userType === "admin";
  }

  if (loading) {
    return <Loader />; // Show the loader while checking the user
  }

  return (
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
        <Route
          path="/cart"
          element={user ? <><ScrollToTop /><CartPage /></> : <Navigate to="/" />}
        />
        <Route path="/shop" element={<><ScrollToTop /><ViewAll /></>} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            isAdmin() ? (
              <>
                <ScrollToTop />
                <Admindashboard />
              </>
            ) : (
              <Navigate to="/homepage" />
            )
          }
        />
        <Route
          path="/admin/categories"
          element={
            isAdmin() ? (
              <>
                <ScrollToTop />
                <CategoriesDashboard />
              </>
            ) : (
              <Navigate to="/homepage" />
            )
          }
        />
        <Route
          path="/admin/sub-categories"
          element={
            isAdmin() ? (
              <>
                <ScrollToTop />
                <SubcategoriesDashboard />
              </>
            ) : (
              <Navigate to="/homepage" />
            )
          }
        />
        <Route
          path="/admin/products"
          element={
            isAdmin() ? (
              <>
                <ScrollToTop />
                <ProductsDashboard />
              </>
            ) : (
              <Navigate to="/homepage" />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            isAdmin() ? (
              <>
                <ScrollToTop />
                <OrdersDashboard />
              </>
            ) : (
              <Navigate to="/homepage" />
            )
          }
        />
        <Route
          path="/admin/posts"
          element={
            isAdmin() ? (
              <>
                <ScrollToTop />
                <PostsDashboard />
              </>
            ) : (
              <Navigate to="/homepage" />
            )
          }
        />
        <Route
          path="/admin/contact-us"
          element={
            isAdmin() ? (
              <>
                <ScrollToTop />
                <ContactusDashboard />
              </>
            ) : (
              <Navigate to="/homepage" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
