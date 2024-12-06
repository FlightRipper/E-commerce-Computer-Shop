import React, { useState, useEffect } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import Adminpostcard from "../../../components/adminpostcard/adminpostcard";
import axios from "axios";
import Swal from "sweetalert2";
const PostsDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      if (response.status === 200) {
        setPosts(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowEditModal(true);
  };

  const handleDeleteConfirm = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete this post?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeletePost(postId);
      }
    });
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`);
      Swal.fire("Deleted!", "Post has been deleted.", "success");
      fetchPosts(); // Refetch posts after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Post deletion failed.",
      });
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/posts/${editingPost.id}`,
        editingPost
      );
      console.log("Post updated:", response.data);
      setShowEditModal(false);
      setEditingPost(null);
      fetchPosts(); // Refetch posts after update
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditingPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  return (
    <div className="dashboard-content-products">
      <Adminsidebar />

      <div className="dashboard-products-main">
        <h2 className="page-title">Manage Posts</h2>
        <div className="dashboard-products-cards-container">
          {posts.map((post) => (
            <div key={post.id} className="dashboard-products-single-card">
              <Adminpostcard
                id={post.id}
                description={post.description}
                imageUrl={post.image}
                dateCreated={post.createdAt}
                handleEdit={() => handleEditPost(post)}
                handleDelete={() => handleDeleteConfirm(post.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div
            className="products-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Edit Post</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="description"
                value={editingPost?.description || ""}
                onChange={handleChange}
                placeholder="Enter new description"
              />
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsDashboard;
