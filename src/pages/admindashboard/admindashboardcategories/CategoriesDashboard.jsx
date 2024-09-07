import "./categoriesdashboard.css";
import React from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";

const CategoriesDashboard = () => {
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
            <tr>
              <td>1</td>
              <td>Foo</td>
              <td>01/01/1978</td>
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesDashboard;
