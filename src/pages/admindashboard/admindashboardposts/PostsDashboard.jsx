import React, { useState, useEffect } from "react";
import Adminsidebar from "../../../components/adminnavbar/adminnavbar";
import Adminproductcard from "../../../components/adminproductcard/adminproductcard";
import Adminpostcard from "../../../components/adminpostcard/adminpostcard";
import axios from "axios";

const PostsDashboard = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      if (response.status === 200) {
        setPosts(response.data);
        console.log(response.data)
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

  return (
    <div className="dashboard-content-products">
      <Adminsidebar />

      <div className="dashboard-products-main">
      <h2 className="page-title">Manage Posts</h2>
        <div className="dashboard-products-cards-container">
          {posts.map((post) => (
            <div key={post.id} className="dashboard-products-single-card">
              <Adminpostcard
                description={post.description}
                imageUrl={post.imageUrl}
                dateCreated={post.createdAt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsDashboard;
