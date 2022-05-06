import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Feed from "../Feed/Feed";

const FeedList = (props) => {
  const {img} =props
  const { user } = useContext(AuthContext);
  const [Feeds, setFeeds] = useState([]);
  let baseURL = "http://localhost:3011/api/posts";
  function getFeeds() {
    try {
      axios.get(baseURL).then((response) => {
        setFeeds(response.data);
      });
    } catch {
      console.log("error");
    }
  }
 
  
  return (
    <div className="FeedList">
      {
      Feeds.map((Post) => {
        <div>
          <div id="Feed">
           <h4 className="username">{user.name}</h4> 
           <div className="user_IMG"></div> 
           <p className="Post">{Post.body}</p> 
           <div className="Date">05/04/2022</div> 
           <div className='user-profile img'>{img}</div> 
           <div></div> 
        </div>
        </div>;
      })}
    </div>
  ); ;
};

export default FeedList;
