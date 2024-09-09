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
        <a className="text-decoration-none" href="#">Ahmad Mallah</a>
      </h5>
      <p className="mt-1 mb-0">Admin User</p>
    </div>
  </div>

  <ul className="categories list-unstyled">
    {/* Dashboard */}
    <li className="navigation-item"><a href="/admin">Dashboard</a></li>

    {/* Categories */}
    <li className="navigation-item"><a href="/admin/categories">Categories</a></li>

    {/* Subcategories */}
    <li className="navigation-item"><a href="/admin/sub-categories">Sub-Categories</a></li>

    {/* Products */}
    <li className="navigation-item"><a href="/admin/products">Products</a></li>

    {/* Orders */}
    <li className="navigation-item"><a href="/admin/orders">Orders</a></li>

    {/* Posts */}
    <li className="navigation-item"><a href="/admin/posts">Posts</a></li>
  </ul>
</aside>
    )
}

export default Adminsidebar