import React, { useState } from "react";
import axios from "axios";
import "./adminproductcard.css";
import Swal from "sweetalert2";

const Adminproductcard = ({ product, onProductUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEditClick = () => {
    setEditingProduct({ ...product });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleToggleFeatured = () => {
    setEditingProduct((prev) => ({
      ...prev,
      featured: !prev.featured,
    }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/products/${editingProduct.id}`,
        editingProduct
      );
      console.log("Product updated:", response.data);
      handleCloseModal();
      if (onProductUpdate) {
        onProductUpdate(editingProduct.id);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDeleteConfirm = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete ${product.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProduct();
      }
    });
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:5000/products/${product.id}`);
      Swal.fire("Deleted!", `${product.name} has been deleted.`, "success");
      if (onProductUpdate) {
        onProductUpdate(product.id);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Product deletion failed.",
      });
    }
  };

  return (
    <div className="product-admin-card">
      <div className="product-admin-card-content">
        <div className="product-admin-card-image">
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
          />
        </div>
        <div className="product-admin-card-title">{product.name}</div>
        <div className="product-admin-card-price">${product.price}</div>
        <div className="product-admin-card-description">
          {product.description}
        </div>
      </div>

      <div className="product-admin-card-button-container">
        <button className="product-admin-button" onClick={handleEditClick}>
          Edit
        </button>
        <button className="product-admin-button" onClick={handleDeleteConfirm}>
          Delete
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="products-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Edit Product</h3>
            <form onSubmit={handleEditSubmit}>
              <label htmlFor="Product Name">Product Name</label>
              <input
                type="text"
                name="name"
                value={editingProduct?.name || ""}
                onChange={handleChange}
                placeholder="Product Name"
              />
              <label htmlFor="price">price</label>
              <input
                type="number"
                name="price"
                value={editingProduct?.price || ""}
                onChange={handleChange}
                placeholder="Price"
              />
              <label htmlFor="description">description</label>
              <textarea
                name="description"
                value={editingProduct?.description || ""}
                onChange={handleChange}
                placeholder="Description"
              ></textarea>
              <button
                type="button"
                onClick={handleToggleFeatured}
                style={{
                  backgroundColor: editingProduct?.featured ? "green" : "red",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  margin: "10px 0",
                }}
              >
                {editingProduct?.featured ? "Featured" : "Not Featured"}
              </button>
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminproductcard;