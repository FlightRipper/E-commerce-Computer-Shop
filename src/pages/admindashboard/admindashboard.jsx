import React, { useEffect ,useRef} from 'react';
import './admindashboard.css';
import Adminnavbar from "../../components/adminnavbar/adminnavbar";
import Chart from 'chart.js/auto';

const Admindashboard = () => {

    const latestCategories = [
        { id: 1, name: "Electronics", createdAt: "2023-05-01T10:00:00Z" },
        { id: 2, name: "Clothing", createdAt: "2023-05-02T14:30:00Z" },
        { id: 3, name: "Books", createdAt: "2023-05-03T09:45:00Z" },
        { id: 4, name: "Home Goods", createdAt: "2023-05-04T13:15:00Z" }
      ];
    
      const latestProducts = [
        { id: 101, name: "Smartphone", categoryId: 1, price: 599.99, createdAt: "2023-05-01T11:00:00Z" },
        { id: 102, name: "Laptop", categoryId: 1, price: 1299.99, createdAt: "2023-05-02T15:30:00Z" },
        { id: 103, name: "Dress", categoryId: 2, price: 79.99, createdAt: "2023-05-03T10:30:00Z" },
        { id: 104, name: "Bookshelf", categoryId: 3, price: 199.99, createdAt: "2023-05-04T14:00:00Z" }
      ];

  return (
    <>
<Adminnavbar />
      {/* Main Content */}
      <section id="wrapper">
        <nav className="navbar navbar-expand-md">
          <div className="container-fluid mx-2">
            <div className="navbar-header">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggle-navbar" aria-controls="toggle-navbar" aria-expanded="false" aria-label="Toggle navigation">
                <i className="uil-bars text-white"></i>
              </button>
              <a className="navbar-brand" href="#">Admin<span className="main-color"> Dashboard</span></a>
            </div>
            <div className="collapse navbar-collapse" id="toggle-navbar">
              <ul className="navbar-nav ms-auto">

                {/* Toggle Sidebar */}
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i data-show="show-side-navigation1" className="uil-bars show-side-btn"></i>
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
              <p className="mb-0">Hello Admin, welcome to your awesome dashboard!</p>
            </div>
          </div>
          {/* Statistics Section */}
          <section className="statis mt-4 text-center">
            <div className="row">
              <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                <div className="box bg-primary p-3">
                  <i className="uil-eye"></i>
                  <h3>5,154</h3>
                  <p className="lead stats-word">Categories</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                <div className="box bg-danger p-3">
                  <i className="uil-user"></i>
                  <h3>245</h3>
                  <p className="lead stats-word">Sub Categories</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
                <div className="box bg-warning p-3">
                  <i className="uil-shopping-cart"></i>
                  <h3>5,154</h3>
                  <p className="lead stats-word">Products</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="box bg-success p-3">
                  <i className="uil-feedback"></i>
                  <h3>5,154</h3>
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
                    {latestCategories.map((category, index) => (
                      <tr key={index}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{new Date(category.createdAt).toLocaleString()}</td>
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
                      <th>Category</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.categoryId === product.category ? product.category.name : "N/A"}</td>
                        <td>{new Date(product.createdAt).toLocaleString()}</td>
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

