import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../constant";

function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (userData) {
      console.log("home", userData);
      //   axios
      //     .post(endpoint + "user/update", {
      //       userEmail: userData.userEmail,
      //       value: true,
      //       name: "userStatus",
      //     })
      //     .then((res) => {
      //       console.log(res);
      //       // navigate('/')
      //     })
      //     .catch((err) => console.log("err"));
    } else {
      navigate("/signIn");
    }
    // return () => {
    //   axios
    //     .post(endpoint + "user/update", {
    //       userEmail: userData.userEmail,
    //       value: false,
    //       name: "userStatus",
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       // navigate('/')
    //     })
    //     .catch((err) => console.log("err"));
    // };
  }, [userData]);
  useEffect(() => {
    axios.get(endpoint + "activeUsers").then((res) => {
      console.log("users", res);
      setUsers(res.data.data);
    });
  }, []);
  return (
    <div>
      {users?.map((user) =>
        user.userEmail !== userData.userEmail ? (
          <div key={user._id} onClick={()=>navigate('/singleChat/'+user.userEmail)}>{user.userName}</div>
        ) : (
          ""
        )
      )}
    </div>
  );
}

export default Home;
