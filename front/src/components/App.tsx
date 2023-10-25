import React, { useEffect } from "react";
import { RoomCreation } from "./RoomCreation";
import { ActiveRoomList } from "./ActiveRoomsList";
import { useSelector } from "react-redux";
import { Chat } from "./Chat";
import { roomSelector, messagesSelector } from "../libs/store/selectors";

import { useDispatch } from "react-redux";
import { setMessages } from "../libs/store/reducer/actions";
import "../styles/styles.scss";
import { socket } from "../libs/socket";
import { IMessage } from "../types";
import { NickInputModal } from "./NickInputModal";

function App() {  
  const dispatch = useDispatch();

  const messages = useSelector(messagesSelector);
  const room = useSelector(roomSelector);

  useEffect(() => {
    socket.on("reciveMessage", (message: IMessage) => {
      dispatch(setMessages([...messages, message]));
    });

    socket.on("reciveHistory", (messages: Array<IMessage>) => {
      dispatch(setMessages(messages));
    });
  }, [messages]);

  return (
    <div className="App">
      <div className="input-data-container">
        <RoomCreation />
        <ActiveRoomList />
      </div>
      <Chat />
      <NickInputModal />
    </div>
  );
}

export default App;
