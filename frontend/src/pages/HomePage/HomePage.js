import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Post from "../../components/Post/Post";
import "./HomePage.scss";
import FriendsList from "../../components/FriendsList/FriendsList";
import FeedList from "../../components/FeedList/FeedList";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  user.img = (
    <img src="https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg" />
  );
  return (
    <div className="HomePage">
      <div className="CreatePost">
        <Post />
      </div>
      <div className="HomePageContent">
        <div className="FeedList">
          <FeedList img={user.img} />
        </div>
        <div className="right-panel">
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
