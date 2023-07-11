import { useNavigate, useParams } from "react-router-dom";
import ChatForm from "../components/ChatFrom";
import axios from "axios";
import io from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { endpoint } from "../constant";

let socket;

const SingleChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const { targetUser } = useParams();
  console.log(targetUser);

  useEffect(() => {
    axios
      .get(
        endpoint +
          "getAllMessage/?" +
          "me=" +
          userData.userEmail +
          "&you=" +
          targetUser
      )
      .then((res) => {
        console.log(res);
        setMessages(res.data.data);
      });
    socket = io(endpoint);
    socket.on("getMessage", (data) => {
      // console.log("message",data)
      setMessages((prev) => [...prev, data]);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    axios
      .post(endpoint + "sendMessage", {
        message,
        me: userData.userEmail,
        you: targetUser,
        sender: userData.userEmail,
      })
      .then((res) => {
        // setMessages([...messages,res.data.data])
        console.log(res);

        setMessage("");
        socket.emit("sendMessage", res.data.data);
      });
    //     .catch((err)=>console.log(err))
    //     // setMessage('')
  };
  const handleChange = (e) => {
    // console.log(e.target.value)
    setMessage(e.target.value);
  };
  return (
    <div>
      <div>Single Chat</div>
      <div
        className=""
        style={{
          color: "#fff",
        }}
      >
        {messages?.map((message) => {
          const bool = message.sender === userData.userEmail;
          return (
            <div
              key={message.createdAt}
              className="px-2 py-1"
              style={{
                maxWidth: "70%",
                width: "fit-content",
                marginLeft: bool ? "auto" : "0px",
                background: bool ? "gray" : "blue",
                marginBottom: "5px",
                display: "flex",
                borderRadius: "5px",
                // flexDirection:"column"
              }}
            >
              {/* <div> */}
              {message.message}

              {/* </div> */}
            </div>
          );
        })}
      </div>
      <ChatForm
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default SingleChat;
