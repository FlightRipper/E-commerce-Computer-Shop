// OrdersDashboard.js
import React, { useState, useEffect } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import "./ordersdashboard.css";
import axios from "axios";
import Swal from "sweetalert2";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowEditModal(true);
  };

  const handleDeleteConfirm = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete this order?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteOrder(orderId);
      }
    });
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${orderId}`);
      Swal.fire("Deleted!", "Order has been deleted.", "success");
      fetchOrders(); // Refetch orders after deletion
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Order deletion failed.",
      });
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/orders/${editingOrder.id}`,
        editingOrder
      );
      console.log("Order updated:", response.data);
      setShowEditModal(false);
      setEditingOrder(null);
      fetchOrders(); // Refetch orders after update
    } catch (error) {
      console.error("Error editing order:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditingOrder({ ...editingOrder, [name]: value });
  };

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

  const renderStatusOptions = () => {
    return ["pending", "approved", "done", "canceled", "active"].map(
      (status) => (
        <option key={status} value={status}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </option>
      )
    );
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
                  <div />
                  <button
                    class="button edit-button"
                    onClick={() => handleEditOrder(order)}
                  >
                    <span class="button-content">Edit </span>
                  </button>
                  <div />
                  <button
                    class="button delete-button order-delete-button"
                    onClick={() => handleDeleteConfirm(order.id)}
                  >
                    <span class="button-content order-delete">Delete </span>
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
              className="orders-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Edit Order</h3>
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label htmlFor="status">Status:</label>
                  <select
                    id="status"
                    name="status"
                    value={editingOrder?.status || ""}
                    onChange={handleChange}
                  >
                    {renderStatusOptions()}
                  </select>
                </div>
                <button type="submit">Save Changes</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersDashboard;
