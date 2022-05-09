import "./ProfilePage.css";
import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  

  function switchEdit() {
    setEdit(!edit);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const jwt = localStorage.getItem("token");
    const data = {
      name: name,
      email: email,
      about: about,
    };
    const config = {
      method: "put",
      url: "http://localhost:3011/api/users/" + user._id,
      headers: {
        "x-auth-token": jwt.replace(/(^"|"$)/g, ''),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        console.log(config);
      });
    switchEdit();
  }

  if (edit) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          placeholder={user.name}
          name="name"
          title="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder={user.about}
          name="about"
          title="about"
          type="text"
          value={about}
          onChange={(event) => setAbout(event.target.value)}
        />
        <input
          placeholder={user.email}
          name="email"
          title="email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input className="button" type="submit" value="Submit" />
        <button onClick={switchEdit}>Cancel</button>
      </form>
    );
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
