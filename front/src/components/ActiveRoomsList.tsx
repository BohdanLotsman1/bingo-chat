import React, { useEffect, useState } from "react";
import { socket } from "../libs/socket";
import { useDispatch, useSelector } from "react-redux";
import { getActiveRooms, setRoom } from "../libs/store/reducer/actions";
import { activeRoomsSelector, isRoomsFetchingSelector, roomSelector } from "../libs/store/selectors";
import "../styles/styles.scss";

export const ActiveRoomList: React.FC = () => {
  const dispatch = useDispatch();

  const activeRooms = useSelector(activeRoomsSelector);
  const isLoading = useSelector(isRoomsFetchingSelector);

  const currentRoom = useSelector(roomSelector);

  const joinRoom = (room: string) => {
    socket.emit("joinRoom", room);
  };

  useEffect(() => {
    dispatch(getActiveRooms());
  }, []);

  const handleRefetch = () => {
    dispatch(getActiveRooms());
  };

  return (
    <div className="room-list">
      <h5>
        List of active rooms{" "}
        {!isLoading &&  <span onClick={handleRefetch} className="room-list-reload">
          &#x21bb;
        </span>}
      </h5>
      <ul>
        {activeRooms.map((activeRoom: string, index: number) => (
          <li key={index}>
            <button
              className={`room-btn${
                currentRoom === activeRoom ? "-active" : ""
              }`}
              onClick={() => joinRoom(activeRoom)}
            >
              {activeRoom}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
