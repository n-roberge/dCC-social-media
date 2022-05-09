import Friend from "../Friend/Friend"
import { useState } from "react";
import axios from "axios";

const FriendsList = ({friends}) => {
  return (
    <div className="friendsList">
      {friends.map((friend) => {
       return  (<div>
          <div id="friend">
            <h4 className="name">{friend.friendObjectId}</h4>
            {/* <div className="user-profile img">{fri}</div> */}
            <div></div>
          </div>
        </div>);
      })}
    </div>
  );

  // return (
  //   <div className="friendsList">
  //     {friends.map((friend) => (
  //       <Friend key = {friend.id} friend = {friend}/>
  //     ))};
  //   </div>
  // );
};

export default FriendsList;
