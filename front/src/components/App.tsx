import React, { createContext, useEffect, useState } from "react";
import { RoomCreation } from "./RoomCreation";
import { ActiveRoomList } from "./ActiveRoomsList";
import { useSelector } from "react-redux";
import { Chat } from "./Chat";
import {
  roomSelector,
  messagesSelector,
  nickSelector,
} from "../libs/store/selectors";

import { useDispatch } from "react-redux";
import { setMessages } from "../libs/store/reducer/actions";
import "../styles/styles.scss";
import { socket } from "../libs/socket";
import { IMessage } from "../types";
import { NickInputModal } from "./NickInputModal";
import { ModalContext } from "../libs/modalContext";

function App() {
  const dispatch = useDispatch();

  const messages = useSelector(messagesSelector);
  const nick = useSelector(nickSelector);

  const [isEditNickOpen, setIsEditNickOpen] = useState<boolean>(!nick);

  useEffect(() => {
    socket.on("reciveMessage", (message: IMessage) => {
      dispatch(setMessages([...messages, message]));
    });

    socket.on("reciveHistory", (messages: Array<IMessage>) => {
      dispatch(setMessages(messages));
    });
  }, [messages]);

  const handleModalClose = () => {
    setIsEditNickOpen(false);
  };

  return (
    <div className="App">
      <ModalContext.Provider
        value={{
          isOpen: isEditNickOpen,
          setIsOpen: setIsEditNickOpen,
        }}
      >
        <div className="input-data-container">
          <RoomCreation />
          <ActiveRoomList />
        </div>
        <Chat />
      </ModalContext.Provider>
      <NickInputModal isOpen={isEditNickOpen} handleClose={handleModalClose} />
    </div>
  );
}

export default App;
