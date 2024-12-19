import React, { useState, useEffect } from "react";
import "./admindashboard.css";
import Adminnavbar from "../../components/adminnavbar/adminnavbar";
import axios from "axios";

const Admindashboard = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      if (response.status === 200) {
        setCategories(response.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/subcategories/all"
      );
      if (response.status === 200) {
        setSubcategories(response.data);
      } else {
        console.error("Failed to fetch subcategories");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

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

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders");
      if (response.status === 200) {
        setOrders(response.data);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getCategories();
    fetchSubcategories();
    getProducts();
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const fillEmptyRows = (data, count) => {
    const filledData = data.slice(0, count);
    while (filledData.length < count) {
      filledData.push({});
    }
    return filledData;
  };

  return (
    <>
      <Adminnavbar />
      {/* Main Content */}
      <section id="wrapper">
        <nav className="navbar navbar-expand-md">
          <div className="container-fluid mx-2">
            <div className="navbar-header">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#toggle-navbar"
                aria-controls="toggle-navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="uil-bars text-white"></i>
              </button>
              <a className="navbar-brand" href="#">
                Admin<span className="main-color"> Dashboard</span>
              </a>
            </div>
            <div className="collapse navbar-collapse" id="toggle-navbar">
              <ul className="navbar-nav ms-auto">
                {/* Toggle Sidebar */}
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i
                      data-show="show-side-navigation1"
                      className="uil-bars show-side-btn"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="p-4">
          {/* Welcome Section */}
          <div className="welcome">
            <div className="content rounded-3 p-3">
              <h1 className="fs-3">Welcome to your Dashboard</h1>
              <p className="mb-0">
                Hello Admin, welcome to your awesome dashboard!
              </p>
            </div>
          </div>
          {/* Statistics Section */}
          <section className="statis mt-4 text-center">
            <div className="row">
              <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                <div className="box bg-primary p-3">
                  <i className="uil-eye"></i>
                  <h3>{categories.length}</h3>
                  <p className="lead stats-word">Categories</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                <div className="box bg-danger p-3">
                  <i className="uil-user"></i>
                  <h3>{subcategories.length}</h3>
                  <p className="lead stats-word">Sub Categories</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
                <div className="box bg-warning p-3">
                  <i className="uil-shopping-cart"></i>
                  <h3>{products.length}</h3>
                  <p className="lead stats-word">Products</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="box bg-success p-3">
                  <i className="uil-feedback"></i>
                  <h3>{orders.length}</h3>
                  <p className="lead stats-word">Orders</p>
                </div>
              </div>
              
            </div>
          </section>

          <section className="mt-4">
            <h2 className="mb-4">Latest Categories and Products</h2>
            <div className="row">
              <div className="col-md-6 mb-4">
                <table className="table table-striped table-bordered table-hover">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                  {/* {new Date(subcategory.createdAt).toLocaleDateString() */}
                    {fillEmptyRows(categories, 4).map((category, index) => (
                      <tr key={index}>
                        <td>{category.id || "-"}</td>
                        <td>{category.name || "-"}</td>
                        <td>{new Date(category.createdAt).toLocaleDateString() || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-md-6 mb-4">
                <table className="table table-striped table-bordered table-hover">
                  <thead className="bg-success text-white">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fillEmptyRows(products, 4).map((product, index) => (
                      <tr key={index}>
                        <td>{product.id || "-"}</td>
                        <td>{product.name || "-"}</td>
                        <td>${(product.price || 0)}</td>
                        {/* {new Date(subcategory.createdAt).toLocaleDateString() */}
                        <td>{new Date(product.createdAt).toLocaleDateString() || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Admindashboard;
