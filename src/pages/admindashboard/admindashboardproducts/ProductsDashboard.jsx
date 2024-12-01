import React, { useEffect, useState } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import "./productsdashboard.css";
import Adminproductcard from "../../../components/adminproductcard/adminproductcard";
import axios from "axios";
import Swal from "sweetalert2";

const ProductsDashboard = () => {
  const [Products, setProducts] = useState([]);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creatingProduct, setCreatingProduct] = useState({
    name: "",
    description: "",
    price: "",
    subcategoryId: "",
    image: "",
  });
  const [subcategories, setSubcategories] = useState([]);

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

  const handleProductUpdate = () => {
    setRefetchTrigger(refetchTrigger + 1);
  };

  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();
      Object.keys(creatingProduct).forEach((key) => {
        if (key !== "image") {
          formData.append(key, creatingProduct[key]);
        }
      });

      // Append the image file directly
      if (creatingProduct.image instanceof File) {
        formData.append("image", creatingProduct.image);
      }

      const response = await axios.post(
        "http://localhost:5000/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("New product created:", response.data);
      Swal.fire("Created!", "New product has been added.", "success");
      setShowCreateModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Product creation failed.",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    // Handle file input specifically
    if (name === "image" && files?.length) {
      setCreatingProduct({ ...creatingProduct, image: files[0] });
    } else {
      setCreatingProduct({ ...creatingProduct, [name]: value });
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSubcategories();
  }, [refetchTrigger]);

  return (
    <div className="dashboard-content-products">
      <Adminsidebar />

      <div className="dashboard-products-main">
        <h2 className="page-title">Manage Products</h2>
        <button
          className="dashboard-products-create-button"
          onClick={() => setShowCreateModal(true)}
        >
          Create
        </button>
        <div className="dashboard-products-cards-container">
          {Products.map((product) => (
            <Adminproductcard
              key={product.id}
              product={product}
              onProductUpdate={handleProductUpdate}
            />
          ))}
        </div>

        {showCreateModal && (
          <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
            <div
              className="products-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Create New Product</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateProduct();
                }}
              >
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={creatingProduct.name || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={creatingProduct.description || ""}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={creatingProduct.quantity || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={creatingProduct.price || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subcategoryId">Subcategory:</label>
                  <select
                    id="subcategoryId"
                    name="subcategoryId"
                    value={creatingProduct.subcategoryId || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a Subcategory</option>
                    {subcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image:</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                  />
                  {creatingProduct.image && (
                    <img
                      src={URL.createObjectURL(creatingProduct.image)}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>

                <button type="submit">Create Product</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsDashboard;
