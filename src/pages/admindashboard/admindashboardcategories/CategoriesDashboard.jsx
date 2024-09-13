import "./categoriesdashboard.css";
import React, { useEffect, useState } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import axios from "axios";

const CategoriesDashboard = () => {
  const [Categories, setCategories] = useState([]);

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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="dashboard-content">
      <Adminsidebar />
      <div className="dashboard-categories-main">
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
                  <button class="button">
                    <span class="button-content">Edit </span>
                  </button>
                  <div />
                  <button class="button delete-button">
                    <span class="button-content">Delete </span>
                  </button>
                  <div />
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesDashboard;
