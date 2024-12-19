import "./contactusdashboard.css";
import React, { useEffect, useState } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import axios from "axios";
import Swal from "sweetalert2";

const ContactusDashboard = () => {
  const [Contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/contactus");
      if (response.status === 200) {
        setContacts(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleDeleteConfirm = (contactId) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete this feedback?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteContact(contactId);
      }
    });
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`http://localhost:5000/contactus/${contactId}`);
      Swal.fire("Deleted!", "Contact has been deleted.", "success");
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== contactId)
      );
    } catch (error) {
      console.error("Error deleting contact:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Contact deletion failed.",
      });
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="dashboard-content">
      <Adminsidebar />
      <div className="dashboard-categories-main">
        <h2 className="page-title">Manage contacts</h2>

        <div className="contactus-cards-container">
          {Contacts.length > 0 ? (
            Contacts.map((contact) => (
              <div className="admin-contact-card" key={contact.id}>
                <div className="admin-contact-body">
                  <p className="admin-contact-text">{contact.message}</p>
                  <br />
                  <span className="admin-contact-info">
                    from : {contact.name}
                  </span>
                  <span className="admin-contact-info">
                    Email : {contact.email}
                  </span>
                  <br />
                  <button
                    className="contacts-delete-button"
                    onClick={() => handleDeleteConfirm(contact.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-feedback-message">No available feedbacks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactusDashboard;
