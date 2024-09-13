import React, { useState, useEffect } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import "./subcategoriesdashboard.css";
import axios from "axios";

const SubcategoriesDashboard = () => {
  const [subcategories, setSubcategories] = useState([]);

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

  useEffect(() => {
    fetchSubcategories();
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

export default SubcategoriesDashboard;
