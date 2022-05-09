import "./ProfilePage.css";
import axios from "axios"

import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const baseURL = "http://localhost:3011/api/users/"

  function switchEdit() {
  setEdit(!edit)
  }


  function handleSubmit(event) {
    event.preventDefault();
    console.log(user);
    const payLoad = {
      user: user._id,
     
    };
    axios.put(baseURL, payLoad).then((response) => {
      console.log(response.data);
    });
    switchEdit()
  }

  if (edit) {
  return ( <form onSubmit={handleSubmit}>
    <div className="Name">Edit Name: {user.name}</div>
    <div className="About">Edit Bio: {user.about}</div>
    <div className="Email">Edit Email: {user.email}</div>
    
  </form>)
  } else {
    return (
      <div>
        <div className="Name">Name: {user.name}</div>
        <div className="About">Bio: {user.about}</div>
        <div className="Email">Email: {user.email}</div>
        <button onClick={switchEdit}>Edit</button>
      </div>
    );
  }
};

export default ProfilePage;
