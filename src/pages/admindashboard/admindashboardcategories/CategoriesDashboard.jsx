import "./categoriesdashboard.css";
import React, { useEffect, useState } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import axios from "axios";
import Swal from "sweetalert2";

const CategoriesDashboard = () => {
  const [Categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      if (response.status === 200) {
        setCategories(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowEditModal(true);
  };

  const handleDeleteConfirm = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete this category?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteCategory(categoryId);
      }
    });
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${categoryId}`);
      Swal.fire("Deleted!", "Category has been deleted.", "success");
      getCategories(); // Refetch categories after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Category deletion failed.",
      });
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/categories/${editingCategory.id}`,
        { name: editingCategory.name }
      );
      console.log("Category updated:", response.data);
      setShowEditModal(false);
      setEditingCategory(null);
      getCategories(); // Refetch categories after update
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleNameChange = (event) => {
    setEditingCategory({ ...editingCategory, name: event.target.value });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="dashboard-content">
      <Adminsidebar />
      <div className="dashboard-categories-main">
        <h2 className="page-title">Manage Categories</h2>
        <div className="categories-table-container">
          <table class="responstable">
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CREATED AT</th>
              <th>OPTIONS</th>
            </tr>
            {Categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                <td className="options-cell">
                  <div />
                  <button
                    class="button edit-button"
                    onClick={() => handleEditCategory(category)}
                  >
                    <span class="button-content">Edit </span>
                  </button>
                  <div />
                  <button
                    class="button delete-button"
                    onClick={() => handleDeleteConfirm(category.id)}
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
              className="categories-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Edit Category</h3>
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  value={editingCategory?.name || ""}
                  onChange={handleNameChange}
                  placeholder="Category Name"
                />
                <button type="submit">Save Changes</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesDashboard;
