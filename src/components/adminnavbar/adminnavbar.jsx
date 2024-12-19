import React from 'react';
import './adminnavbar.css';

const Adminsidebar = () => {
  const isActive = (path) => {
    return window.location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left">
      <i className="uil-bars close-aside d-md-none d-lg-none" data-close="show-side-navigation1"></i>
      <div className="sidebar-header d-flex justify-content-center align-items-center px-3 py-4">
        <img
          className="rounded-pill img-fluid"
          width="65"
          src="https://th.bing.com/th/id/OIP.S3cM8ki8_erjYCaeT3CTYAHaHa?rs=1&pid=ImgDetMain"
          alt=""
        />
        <div className="ms-2">
          <h5 className="fs-6 mb-0">
            <a className="text-decoration-none" href="#">Admin</a>
          </h5>
          <p className="mt-1 mb-0">Admin User</p>
        </div>
      </div>

      <ul className="categories list-unstyled">
        {/* Dashboard */}
        <li className={`navigation-item ${isActive('/admin')}`}>
          <a href="/admin">Dashboard</a>
        </li>

        {/* Categories */}
        <li className={`navigation-item ${isActive('/admin/categories')}`}>
          <a href="/admin/categories">Categories</a>
        </li>

        {/* Subcategories */}
        <li className={`navigation-item ${isActive('/admin/sub-categories')}`}>
          <a href="/admin/sub-categories">Sub-Categories</a>
        </li>

        {/* Products */}
        <li className={`navigation-item ${isActive('/admin/products')}`}>
          <a href="/admin/products">Products</a>
        </li>

        {/* Orders */}
        <li className={`navigation-item ${isActive('/admin/orders')}`}>
          <a href="/admin/orders">Orders</a>
        </li>

        {/* Posts */}
        <li className={`navigation-item ${isActive('/admin/posts')}`}>
          <a href="/admin/posts">Posts</a>
        </li>

        <li className={`navigation-item ${isActive('/admin/contact-us')}`}>
          <a href="/admin/contact-us">Contact-Us</a>
        </li>


      </ul>
    </aside>
  );
};

export default Adminsidebar;
