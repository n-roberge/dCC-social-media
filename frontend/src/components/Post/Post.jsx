import React, { useState } from "react";
import axios from "axios";
import "./Post.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Post = (props) => {
  const [post, setPost] = useState("");
  const { user } = useContext(AuthContext);
  const baseURL = "http://localhost:3011/api/posts";

  function handleSubmit(event) {
    event.preventDefault();
    console.log(user);
    const payLoad = {
      user: user._id,
      body: post,
    };
    axios.post(baseURL, payLoad).then((response) => {
      console.log(response.data);
    });
    setPost("");
  }

  return (
    <div className="PostContainer">
      <div className="user-profile">
        <Link to="/aboutme" className="user-profile img" href="/aboutme">{user.img}</Link>
        <div  className="user-profile p">{user.name}</div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="What's on your mind?"
            name="post"
            title="post"
            type="text"
            value={post}
            onChange={(event) => setPost(event.target.value)}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Post;
