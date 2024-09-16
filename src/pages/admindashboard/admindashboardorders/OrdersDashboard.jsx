// OrdersDashboard.js
import React, { useState, useEffect } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import "./ordersdashboard.css";
import axios from "axios";
import Swal from "sweetalert2";

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

  const renderItems = (items) => {
    return items.map((item, index) => (
      <div key={index} className="item">
        {item.productName} x{item.quantity}
      </div>
    ));
  };

  const showItemsModal = (order) => {
    const formattedItems = order.items
      .map(
        (item) =>
          `<tr><td>${item.productName}</td><td>x${item.quantity}</td></tr>`
      )
      .join("");

    Swal.fire({
      title: `<strong>Order Items for ${order.User.username}</strong>`,
      html: `
        <table class="swal-table" style="width:100%;">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${formattedItems}
          </tbody>
        </table>
      `,
      showCloseButton: true,
      focusConfirm: false,
    });
  };

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
                  <button
                    onClick={() => showItemsModal(order)}
                    className="show-items-button"
                  >
                    Show Items
                  </button>
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
