import React, { useState, useEffect } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import "./subcategoriesdashboard.css";
import axios from "axios";
import Swal from "sweetalert2";

const SubcategoriesDashboard = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [creatingSubcategory, setCreatingSubcategory] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/subcategories/all"
      );
      if (response.status === 200) {
        setSubcategories(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch subcategories");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchCategories = async () => {
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

  const handleEditSubcategory = (subcategory) => {
    setEditingSubcategory(subcategory);
    setShowEditModal(true);
  };

  const handleDeleteConfirm = (subcategoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete this subcategory?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteSubcategory(subcategoryId);
      }
    });
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      await axios.delete(
        `http://localhost:5000/subcategories/${subcategoryId}`
      );
      Swal.fire("Deleted!", "Subcategory has been deleted.", "success");
      fetchSubcategories(); // Refetch subcategories after deletion
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Subcategory deletion failed.",
      });
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/subcategories/${editingSubcategory.id}`,
        editingSubcategory
      );
      console.log("Subcategory updated:", response.data);
      setShowEditModal(false);
      setEditingSubcategory(null);
      fetchSubcategories(); // Refetch subcategories after update
    } catch (error) {
      console.error("Error editing subcategory:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditingSubcategory({ ...editingSubcategory, [name]: value });
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = parseInt(event.target.value);
    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );
    setEditingSubcategory({
      ...editingSubcategory,
      CategoryId: selectedCategoryId,
      Category: selectedCategory,
    });
  };

  const handleCreateSubcategory = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/subcategories/add/${selectedCategoryId}`,
        creatingSubcategory
      );
      console.log("New subcategory created:", response.data);
      setCreatingSubcategory({});
      setShowCreateModal(false);
      fetchSubcategories();
      Swal.fire("Created!", "New subcategory has been added.", "success");
    } catch (error) {
      console.error("Error creating subcategory:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Subcategory creation failed.",
      });
    }
  };

  const handleCreateInputChange = (event) => {
    const { name, value } = event.target;
    setCreatingSubcategory({ ...creatingSubcategory, [name]: value });
  };

  const handleCreateCategoryChange = (event) => {
    const selectedCategoryId = parseInt(event.target.value);
    setSelectedCategoryId(selectedCategoryId);
  };

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  return (
    <div className="dashboard-content">
      <Adminsidebar />
      <div className="dashboard-categories-main">
        <h2 className="page-title">Manage Subcategories</h2>
        <button
          className="dashboard-products-create-button"
          onClick={() => setShowCreateModal(true)}
        >
          Create New Subcategory
        </button>

        <div className="categories-table-container">
          <table class="responstable">
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>CREATED AT</th>
              <th>OPTIONS</th>
            </tr>
            {subcategories.map((subcategory) => (
              <tr key={subcategory.id}>
                <td>{subcategory.id}</td>
                <td>{subcategory.name}</td>
                <td>
                  {subcategory.Category ? subcategory.Category.name : "N/A"}
                </td>
                <td>{new Date(subcategory.createdAt).toLocaleDateString()}</td>
                <td className="options-cell">
                  <div />
                  <button
                    class="button edit-button"
                    onClick={() => handleEditSubcategory(subcategory)}
                  >
                    <span class="button-content">Edit </span>
                  </button>
                  <div />
                  <button
                    class="button delete-button"
                    onClick={() => handleDeleteConfirm(subcategory.id)}
                  >
                    <span class="button-content">Delete </span>
                  </button>
                  <div />
                </td>
              </tr>
            ))}
          </table>
        </div>

        {showEditModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowEditModal(false)}
          >
            <div
              className="subcategories-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Edit Subcategory</h3>
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Subcategory Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editingSubcategory?.name || ""}
                    onChange={handleChange}
                    placeholder="Enter subcategory name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="CategoryId">Parent Category:</label>
                  <select
                    id="CategoryId"
                    name="CategoryId"
                    value={editingSubcategory?.CategoryId || ""}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit">Save Changes</button>
              </form>
            </div>
          </div>
        )}

        {showCreateModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="subcategories-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Create New Subcategory</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateSubcategory();
                }}
              >
                <div className="form-group">
                  <label htmlFor="name">Subcategory Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={creatingSubcategory.name || ""}
                    onChange={handleCreateInputChange}
                    placeholder="Enter subcategory name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="CategoryId">Parent Category:</label>
                  <select
                    id="CategoryId"
                    name="CategoryId"
                    value={creatingSubcategory.CategoryId || ""}
                    onChange={handleCreateCategoryChange}
                  >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit">Create Subcategory</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoriesDashboard;
