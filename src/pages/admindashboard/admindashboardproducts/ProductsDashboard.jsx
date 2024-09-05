import React from 'react';
import Adminsidebar from '../../../components/adminnavbar/adminnavbar';
import './productsdashboard.css'
import Adminproductcard from '../../../components/adminproductcard/adminproductcard';
const ProductsDashboard = () => {
  return (
    <div className="dashboard-content-products">

      <Adminsidebar/>

      <div className='dashboard-products-main'>
        <button className='dashboard-products-create-button'>Create</button>
<div className='dashboard-products-cards-container'> 


<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>
<div className='dashboard-products-single-card'>
<Adminproductcard />
</div>

</div>
      </div>
    </div>
  );
};

export default ProductsDashboard;
