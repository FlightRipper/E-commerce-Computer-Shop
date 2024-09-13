import React from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import Adminproductcard from "../../../components/adminproductcard/adminproductcard";
import Adminpostcard from "../../../components/adminpostcard/adminpostcard";
const PostsDashboard = () => {
  return (
    <div className="dashboard-content-products">
      <Adminsidebar />

      <div className="dashboard-products-main">
        <div className="dashboard-products-cards-container">
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
          <div className="dashboard-products-single-card">
            <Adminpostcard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsDashboard;
