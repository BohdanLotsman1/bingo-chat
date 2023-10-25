import React, { useEffect, useState } from "react";
import { socket } from "../libs/socket";
import { IMessage } from "../types";
import {
  messagesSelector,
  nickSelector,
  userIdSelector,
  roomSelector,
} from "../libs/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../libs/store/reducer/actions";
import "../styles/styles.scss";

export const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const messages = useSelector(messagesSelector);
  const nick = useSelector(nickSelector);
  const userId = useSelector(userIdSelector);
  const room = useSelector(roomSelector);

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage = { message: message.trim(), nick, room, userId };
    socket.emit("sendMessage", newMessage);
    dispatch(setMessages([...messages, newMessage]));
    setMessage("");
  };

  return (
    <div className="chat-data-container">
      <p>{room && `Room: ${room}`}</p>
      <div className="chat-container">
        <div className="messages">
          {messages.map(({ message, nick }: IMessage, index: number) => (
            <div key={index} className="message">
              {nick} : {message}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
