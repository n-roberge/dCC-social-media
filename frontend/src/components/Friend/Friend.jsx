import { useResolvedPath } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Friend = ({friend}) => {
    const [users, setUsers] = useState([]);

    function getUsers(){  
        axios.get("http://localhost:3011/api/users").then((response) => {
            setUsers(response.data);
        });   
    }

    getUsers()
    console.log(users)

    return (  
        <div className="friend">
            <div className="friendWrapper">
                <img 
                    className="friendImg"
                    src = {users.filter((u) => u.id === friend?.friendObjectId).image}
                />
                <h4 className="friendName">
                    {users.filter((u) => u.id === friend?.friendObjectId).name}
                </h4>
            </div>
        </div>
    );
}
 
export default Friend;