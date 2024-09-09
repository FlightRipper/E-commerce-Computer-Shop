import React, { useState } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import "./ordersdashboard.css";

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="dropdown">
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="dropdown-select"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const OrdersDashboard = () => {
  const items = ["item 1", "item 2", "item 3"];

  return (
    <div className="dashboard-content">
      <Adminsidebar />
      <div className="dashboard-categories-main">
        <div className="categories-table-container">
          <table class="responstable">
            <tr>
              <th>USER NAME</th>
              <th>Email</th>
              <th>PHONE NUMBER</th>
              <th>STATUS</th>
              <th>ITEMS</th>
              <th>OPTIONS</th>
            </tr>
            <tr>
              <td>1</td>
              <td>example@example.com</td>
              <td>01/01/1978</td>
              <td>bhim</td>
              <td>
                <Dropdown options={items} />
              </td>
              <td className="options-cell">
                <button class="button">
                  <span class="button-content">Edit </span>
                </button>
                <div />
                <button class="button delete-button">
                  <span class="button-content">Delete </span>
                </button>
                <div />
                <button class="update-status-button">
                  <span class="button-content">Update Status</span>
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

export default OrdersDashboard;
