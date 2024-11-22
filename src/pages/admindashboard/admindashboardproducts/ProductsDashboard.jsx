import React, { useEffect, useState } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import "./productsdashboard.css";
import Adminproductcard from "../../../components/adminproductcard/adminproductcard";
import axios from "axios";

const ProductsDashboard = () => {
  const [Products, setProducts] = useState([]);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const fetchProducts = async () => {
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

  const handleProductUpdate = () => {
    setRefetchTrigger(refetchTrigger + 1);
  };

  useEffect(() => {
    fetchProducts();
  }, [refetchTrigger]);

  return (
    <div className="dashboard-content-products">
      <Adminsidebar />

      <div className="dashboard-products-main">
        <h2 className="page-title">Manage Products</h2>
        <button className="dashboard-products-create-button">Create</button>
        <div className="dashboard-products-cards-container">
          {Products.map((product) => (
            <Adminproductcard
              key={product.id}
              product={product}
              onProductUpdate={handleProductUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsDashboard;
