import React, { useState, useEffect } from 'react';
import './postsCard.css';

const PostCard = ({image, description, username, userImage}) => {
    return (
        <div className="Postcard">
            <img src={`https://e-commerce-computer-shop-backend.onrender.com/uploads/${image}`} alt="" className="imagePost"/>
            <div className="Postcard__info gap-3">
                <div className="Postcard__Jame3 d-flex gap-1 align-items-center ">   
                    <img src={`https://e-commerce-computer-shop-backend.onrender.com/uploads/${userImage}`} alt="" className="userImagePost" />
                    <span className="usernamePost">{username}</span>
                </div>
                <p className="contentPost">{description}</p>
            </div>
        </div>
    )
}

export default PostCard