import axios from "axios";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./FeedList.css"

const FeedList = (props) => {
  const { img } = props;
  const { user } = useContext(AuthContext);
  const [Feeds, setFeeds] = useState([]);
  let baseURL = "http://localhost:3011/api/posts";

  function getFeeds() {
    axios.get(baseURL).then((response) => {
      setFeeds(response.data);
    });
  }
  useEffect(() => {
    getFeeds()
  }, [Feeds])

  return (
    <div className="FeedList">
      {Feeds.map((Feed) => {
       return  (<div>
          <div id="Feed">
            <h4 className="username">{user.name}</h4>
            <div className="user_IMG"></div>
            <p className="Post">{Feed.body}</p>
            <div className="Date">05/04/2022</div>
            <div className="user-profile img">{img}</div>
            <div></div>
          </div>
        </div>);
      })}
    </div>
  );
};

export default FeedList;
