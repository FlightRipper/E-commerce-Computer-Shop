import React, { useEffect, useState } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import "./productsdashboard.css";
import Adminproductcard from "../../../components/adminproductcard/adminproductcard";
import axios from "axios";

const ProductsDashboard = () => {
  const [Products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="dashboard-content-products">
      <Adminsidebar />

      <div className="dashboard-products-main">
        <button className="dashboard-products-create-button">Create</button>
        <div className="dashboard-products-cards-container">
          {Products.map((product) => (
            <div className="dashboard-products-single-card" key={product.id}>
              <Adminproductcard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsDashboard;
