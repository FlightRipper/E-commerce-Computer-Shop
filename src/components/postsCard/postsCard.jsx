import React from "react";
import "./postsCard.css";

const PostCard = ({ image, description, username, userImage }) => {
  return (
    <div className="admin-post-card">
      <img
        src={`http://localhost:5000/uploads/${image}`}
        alt=""
        className="imagePost"
      />
      <div className="post-info">
        <p className="username">{username}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default PostCard;
