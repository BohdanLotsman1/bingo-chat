import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { ModalContext } from "../libs/modalContext";

export const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const { setIsOpen } = useContext(ModalContext);
  const [message, setMessage] = useState<string>("");

  const ref = useRef<null | HTMLDivElement>(null);

  const messages = useSelector(messagesSelector);
  const nick = useSelector(nickSelector);
  const userId = useSelector(userIdSelector);
  const room = useSelector(roomSelector);

  const sendMessage = useCallback(() => {
    if (!message.trim()) return;
    const newMessage = { message: message.trim(), nick, room, userId };
    socket.emit("sendMessage", newMessage);
    dispatch(setMessages([...messages, newMessage]));
    setMessage("");
  }, [message]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handlePressEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }
    };
    document.addEventListener("keydown", handlePressEnter);
    return () => {
      document.removeEventListener("keydown", handlePressEnter);
    };
  }, [sendMessage]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-data-container">
      <div className="chat-header">
        <span className="chat-room">{room && `Room: ${room}`}</span>
        {nick && (
          <span className="users-nick">
            User: {nick} <span onClick={handleOpenModal}>&#x270E;</span>
          </span>
        )}
      </div>
      <div className="chat-container">
        {!room && (
          <div className="no-chat-selected">
            <span>Plase choose or create chat room</span>
          </div>
        )}
        <div className="messages" ref={ref}>
          {messages.map(
            ({ message, nick, userId: senderId }: IMessage, index: number) => (
              <div
                key={index}
                className={`message ${
                  senderId === userId ? "message-sender" : ""
                }`}
              >
                <div className="message-nick">{nick}</div>
                <div className="message-text">{message}</div>
              </div>
            )
          )}
        </div>
        <div className="input-container">
          <textarea
            value={message}
            maxLength={255}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
          />
          <button disabled={!room} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
