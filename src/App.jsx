import { useState } from "react";
import Nav from "./navs/Navs";
import { useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

let endpoint = "http://localhost:8000/",
  socket;

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // useEffect(()=>{
  //   axios.get(endpoint+"getAllMessage")
  //   .then((res)=>{
  //     // console.log(res)
  //     setMessages(res.data.messages)
  //   })
  //   socket = io(endpoint)
  //   socket.on("getAllMessages",(data)=>{
  //     // console.log("allMessages",data)
  //     setMessages(data.data)
  //   })
  //   socket.on('getMessage',data=>{
  //     // console.log("message",data)
  //     setMessages(prev=>([...prev,data]))
  //   })
  // },[])
  // // useEffect(()=>{
  // //   socket.on('getMessage',message=>{
  // //     console.log("message",message)
  // //     setMessages(prev=>([...prev,message]))
  // //   })
  // // },[])
  // const handleSubmit = (e)=>{
  //   e.preventDefault();
  //   axios.post(endpoint+"sendMessage",{message})
  //   .then((res)=>{
  //     console.log(res)
  //     // setMessages(res.data.data)
  //     socket.emit('sendMessage',res.data.data)
  //   })
  //   .catch((err)=>console.log(err))
  //   // setMessage('')
  // }
  // const handleChange = (e)=>{
  //   // console.log(e.target.value)
  //   setMessage(e.target.value)
  // }
  // // console.log(messages)
  return (
    <>
      <div>
        <Nav />
      </div>
    </>
  );
}

export default App;
