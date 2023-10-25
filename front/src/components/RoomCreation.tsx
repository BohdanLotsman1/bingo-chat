import React, { ChangeEvent, useEffect, useState } from "react";
import { socket } from "../libs/socket";
import "../styles/styles.scss";
import { useDispatch } from "react-redux";
import { getActiveRooms, setRoom } from "../libs/store/reducer/actions";

export const RoomCreation: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const joinRoom = (room: string) => () => {
    socket.emit("joinRoom", room);
    setRoomName("");
  };

  useEffect(() => {
    socket.on("join", (message: string) => {
      dispatch(setRoom(message));
      dispatch(getActiveRooms());
    });
  }, []);

  return (
    <div className="room-form">
      <input
        type="text"
        placeholder="Enter room name"
        value={roomName}
        onChange={handleChange}
      />
      <button onClick={joinRoom(roomName)}>Join room</button>
    </div>
  );
};
