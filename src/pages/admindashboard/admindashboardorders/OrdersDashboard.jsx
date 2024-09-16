// OrdersDashboard.js
import React, { useState, useEffect } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import "./ordersdashboard.css";
import axios from "axios";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders");
      if (response.status === 200) {
        setOrders(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderItems = (items) => (
    <div className="item-list">
      {items.map((item, index) => (
        <div key={index} className="item">
          {item.productName} x{item.quantity}
        </div>
      ))}
    </div>
  );

  return (
    <div className="dashboard-content">
      <Adminsidebar />
      <div className="dashboard-categories-main">
        <h2 className="page-title">Manage Orders</h2>
        <div className="categories-table-container">
          <table class="responstable">
            <tr>
              <th>USER NAME</th>
              <th>Email</th>
              <th>STATUS</th>
              <th>ITEMS</th>
              <th>OPTIONS</th>
            </tr>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.User.username}</td>
                <td>{order.User.email}</td>
                <td>{order.status}</td>
                <td className="item-cell">
                  {renderItems(order.items)}
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
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersDashboard;
