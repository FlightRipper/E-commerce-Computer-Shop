import './adminnavbar.css'

const Adminsidebar =()=>{
    return(
        <aside className="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left">
  <i className="uil-bars close-aside d-md-none d-lg-none" data-close="show-side-navigation1"></i>
  <div className="sidebar-header d-flex justify-content-center align-items-center px-3 py-4">
    <img
      className="rounded-pill img-fluid"
      width="65"
      src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance"
      alt=""
    />
    <div className="ms-2">
      <h5 className="fs-6 mb-0">
        <a className="text-decoration-none" href="#">Jone Doe</a>
      </h5>
      <p className="mt-1 mb-0">Admin User</p>
    </div>
  </div>

  <ul className="categories list-unstyled">
    {/* Dashboard */}
    <li className="navigation-item"><a href="#" className="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#dashboardDropdown" aria-expanded="false">Dashboard</a></li>

    {/* Categories */}
    <li className="navigation-item has-dropdown">
      <i className="uil-folder"></i><a href="#" className="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#categoryDropdown" aria-expanded="false">Categories</a>
      <ul id="categoryDropdown" className="sidebar-dropdown collapse list-unstyled">
        <li><a href="#">Electronics</a></li>
        <li><a href="#">Clothing</a></li>
        <li><a href="#">Home & Garden</a></li>
        <li><a href="#">Books</a></li>
        <li><a href="#">Sports</a></li>
      </ul>
    </li>

    {/* Subcategories */}
    <li className="navigation-item has-dropdown">
      <i className="uil-bag"></i><a href="#" className="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#subcategoryDropdown" aria-expanded="false">Subcategories</a>
      <ul id="subcategoryDropdown" className="sidebar-dropdown collapse list-unstyled">
        <li><a href="#">Smartphones</a></li>
        <li><a href="#">Laptops</a></li>
        <li><a href="#">Headphones</a></li>
        <li><a href="#">Tablets</a></li>
        <li><a href="#">Gaming Consoles</a></li>
      </ul>
    </li>

    {/* Products */}
    <li className="navigation-item"><a href="#">Products</a></li>

    {/* Orders */}
    <li className="navigation-item"><a href="#">Orders</a></li>

    {/* Posts */}
    <li className="navigation-item"><a href="#">Posts</a></li>
  </ul>
</aside>
    )
}

export default Adminsidebar