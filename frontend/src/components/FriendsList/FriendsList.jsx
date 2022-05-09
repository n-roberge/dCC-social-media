import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const FriendsList = (props) => {
  const { user } = useContext(AuthContext);
  const jwt = localStorage.getItem("token");

  useEffect(() => {}, []);
let list = <h1>Loading</h1>
  try {
    list = user.friendsList.map((friend) => {
      var config = {
        method: "get",
        url: `http://localhost:3011/api/users/${friend._id}`,
        headers: {
          "x-auth-token": jwt.replace(/(^"|"$)/g, ""),
        },
      };
      axios(config)
        .then(function (response) {
         return response.data.name;
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (error) {
    console.log(error);
    return <div className="FriendsList">no friends</div>;
  }
  return(<div>{list}</div>)
};

export default FriendsList;
