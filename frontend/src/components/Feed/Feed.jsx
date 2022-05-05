import React, { useState } from 'react';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Feed.css"

const Feed = (props) => {
    const { user } = useContext(AuthContext);
    const Feed =   {
        "like": false,
        "dislike": true,
        "dateAdded": "2022-05-02T22:32:15.116Z",
        "_id": "62705bf8942ca95c3cd1246f",
        "user": "6268a574449f3f55782b4e43",
        "body": "Updated post to be disliked",
        "__v": 0
    }
    return ( 
        <div id="Feed">
           <h4 className="username">{user.name}</h4> 
           <div className="user_IMG"></div> 
           <p className="Post">{Feed.body}</p> 
           <div className="Date">05/04/2022</div> 
           <div className='user-profile img'>{props.img}</div> 
           <div></div> 
        </div>
     );
}
 
export default Feed;