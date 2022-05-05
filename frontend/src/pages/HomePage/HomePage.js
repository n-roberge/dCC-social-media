import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Post from "../../components/Post/Post";
import "./HomePage.css";
import FriendsList from "../../components/FriendsList/FriendsList";
import Feed from "../../components/Feed/Feed";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  user.img = (
    <img src="https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/217403472_514756609773293_6442582320795800929_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=fFBP5PTZE_8AX9T7Q3H&_nc_ht=scontent-hou1-1.xx&oh=00_AT9gk8HM3OPZMOClZCwtHOTui1D23RbrhsIBQIOHPbHt_A&oe=6275DF09" />
  );
  console.log(user);
  return (
    <body>
      <div className="container">
        <div>
          <Post/>
        </div>
      </div>
      <div className="HomePage">
        <Feed img={user.img}/>
        <div className="right-panel">
          <FriendsList />
        </div>
      </div>
    </body>
  );
};

export default HomePage;
