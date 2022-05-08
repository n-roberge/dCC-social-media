import "./ProfilePage.css";

import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);


  function handleSubmit(event) {
    event.preventDefault();
    console.log(user);
    const payLoad = {
      user: user._id,
      body: post,
    };
    axios.put(baseURL, payLoad).then((response) => {
      console.log(response.data);
    });
    setPost("");
  }

  if (edit) {
  return ( <div>
    <div className="Name">Edit Name: {user.name}</div>
    <div className="About">Edit Bio: {user.about}</div>
    <div className="Email">Edit Email: {user.email}</div>
    <button onClick={setEdit(!edit)}>Edit</button>
  </div>)
  } else {
    return (
      <div>
        <div className="Name">Name: {user.name}</div>
        <div className="About">Bio: {user.about}</div>
        <div className="Email">Email: {user.email}</div>
        <button >Edit</button>
      </div>
    );
  }
};

export default ProfilePage;
