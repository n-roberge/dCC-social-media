import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Post from "../../components/Post/Post";
import "./HomePage.scss";
import FriendsList from "../../components/FriendsList/FriendsList";
import FeedList from "../../components/FeedList/FeedList";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState(user.friendsList);

  user.img = (
    <img src="https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/217403472_514756609773293_6442582320795800929_n.jpg?_nc_cat=100&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=je6jWQKsPdkAX8oYyaE&tn=i9352Bb2i64bW_UF&_nc_ht=scontent-hou1-1.xx&oh=00_AT_fOoZ7hzA0UvrIagCLjTNYL1zaDCfOmgVBV92FJUy5oA&oe=627BCDC9" />
  );
  console.log(user);
  return (
    <div className="HomePage">
      <div className="CreatePost">
        <Post />
      </div>
      <div className="HomePageContent">
        {/* <div className="FeedList">
          <FeedList img={user.img} />
        </div> */}
        <div className="right-panel">
          <FriendsList friends={friends}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
