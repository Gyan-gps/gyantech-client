import { Modal } from "bootstrap";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import axios from "axios";
import { endpoint } from "../constant";
import { useEffect } from "react";

function Room() {
  const [activeRooms, setActiveRooms] = useState([]);
  const [createRoom, setCreateRoom] = useState("");
  const [show, setShow] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    axios.get(endpoint+"activeRooms")
    .then((res)=>{
        if(res.data.status===200){
            setActiveRooms(res.data.data)
        }
        else{
            console.log(res)
        }
    })
  },[])
  const handleCloseouter = (e) => {
    console.log(e.target.className)
    if (e.target.className.includes("closeModal")) {
      handleClose();
    }
  };
  const handleCreateRoom = () => {
    console.log("Room",createRoom)
    axios.post(endpoint+"createRoom",{roomName:createRoom,roomOwner:userData.userName})
    .then((res)=>{
        console.log(res)
    })
  };

  return (
    <div>
      <div className="d-flex justify-content-around">
        <div>Active Room</div>
        <Button variant="primary" onClick={handleShow}>
          Create New Room
        </Button>
      </div>
      <div>
        {activeRooms?.map((room) => {
          return (
            <div key={room._id}>
              <div>
                <div>Room Name: {room.roomName}</div>
                <div>Room Owner: {room.roomOwner}</div>
                <div>
                  Join member:{" "}
                  {room.member?.slice(0, 5).map(() => {
                    return <span>{"name"}</span>;
                  })}
                </div>
              </div>
              <button>Join Room</button>
            </div>
          );
        })}
      </div>
      {/* <!-- Modal --> */}
      {show && (
        <div
          className="closeModal"
          style={{
            position: "fixed",
            minHeight: "100vh",
            width: "100%",
            top: "0px",
            left: "0px",
            background: "#00000090",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleCloseouter}
        >
          <div
            className=" p-4"
            style={{
              // margin:"auto",
              background:"#fff",

              maxWidth: "60%",
              color: "#000",
            }}
          >
            <h4>Create Room</h4>
            <div>
              Room Name:
              <br />
              <input
                type="text"
                value={createRoom}
                onChange={(e) => setCreateRoom(e.target.value)}
                placeholder="Enter Room Name"
              />
              {/* Room Name:<br/>
                    <input type="text"  placeholder="Enter Room Name"  /> */}
              {/* Room Name:<br/>
                    <input type="text"  placeholder="Enter Room Name"  />
                    Room Name:<br/>
                    <input type="text"  placeholder="Enter Room Name"  />
                    Room Name:<br/>
                    <input type="text"  placeholder="Enter Room Name"  /> */}
              <button onClick={handleCreateRoom}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Room;
