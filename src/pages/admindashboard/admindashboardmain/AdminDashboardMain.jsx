import React from 'react';

const AdminDashboardMain = () => {
  return (
    <div className="dashboard-content">
 {/* Main Content */}
 <section id="wrapper">
        <nav className="navbar navbar-expand-md">
          <div className="container-fluid mx-2">
            <div className="navbar-header">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggle-navbar" aria-controls="toggle-navbar" aria-expanded="false" aria-label="Toggle navigation">
                <i className="uil-bars text-white"></i>
              </button>
              <a className="navbar-brand" href="#">admin<span className="main-color">kit</span></a>
            </div>
            <div className="collapse navbar-collapse" id="toggle-navbar">
              <ul className="navbar-nav ms-auto">
                {/* Settings Dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Settings
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">My account</a></li>
                    <li><a className="dropdown-item" href="#">My inbox</a></li>
                    <li><a className="dropdown-item" href="#">Help</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Log out</a></li>
                  </ul>
                </li>

                {/* Notifications */}
                <li className="nav-item user-img">
                  <img src='https://cdn.discordapp.com/attachments/1146057681736581191/1280130262075834450/0_bhCQt7Hnc21Saxg7.png?ex=66d8eff6&is=66d79e76&hm=0f8d484c6cfe36a4faa90bf861f6e43a30d5178fc35167efbe11be6b8306b61a&'/>
                </li>

                {/* Alerts */}
                <li className="nav-item">
                  <a className="nav-link" href="#"><i className="uil-bell"></i><span>98</span></a>
                </li>

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
              <h1 className="fs-3">Welcome to Dashboard</h1>
              <p className="mb-0">Hello Ripper, welcome to your awesome dashboard!</p>
            </div>
          </div>
          {/* Statistics Section */}
          <section className="statis mt-4 text-center">
            <div className="row">
              <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                <div className="box bg-primary p-3">
                  <i className="uil-eye"></i>
                  <h3>5,154</h3>
                  <p className="lead">Categories</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                <div className="box bg-danger p-3">
                  <i className="uil-user"></i>
                  <h3>245</h3>
                  <p className="lead">Sub Categories</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
                <div className="box bg-warning p-3">
                  <i className="uil-shopping-cart"></i>
                  <h3>5,154</h3>
                  <p className="lead">Products</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="box bg-success p-3">
                  <i className="uil-feedback"></i>
                  <h3>5,154</h3>
                  <p className="lead">Orders</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardMain;
