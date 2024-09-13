import React from "react";
import './adminproductcard.css'

const Adminproductcard = ({ product }) => {
  return (
    <div className="product-admin-card">
      <div className="product-admin-card-content">
        <div className="product-admin-card-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-admin-card-title">{product.name}</div>
        <div className="product-admin-card-price">${product.price.toFixed(2)}</div>
        <div className="product-admin-card-description">{product.description}</div>
      </div>

      <div className='product-admin-card-button-container'>   
        <button className='product-admin-button'>
          Edit
        </button>
        <button className='product-admin-button'>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Adminproductcard
