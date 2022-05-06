import "./ProfilePage.css"

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext);
  return (
    <div>
    <div className="Name">{user.name}</div>
    <div className="Bio"></div>
    <div className="Email"></div>
    <div></div>
    </div>
  );
};

export default ProfilePage;


















