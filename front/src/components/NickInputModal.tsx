import React, { ChangeEvent, useState } from "react";
import { Modal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { nickSelector, userIdSelector } from "../libs/store/selectors";
import { setNick, setUserId } from "../libs/store/reducer/actions";
import { generateUniqueUserId } from "../utils";

interface Props {
  isOpen: boolean;
  handleClose?: () => void;
}

export const NickInputModal: React.FC<Props> = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const nick = useSelector(nickSelector);
  const userId = useSelector(userIdSelector);

  const [inputValue, setInputValue] = useState<string>(nick);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      alert("Name should be provided");
      return;
    }
    dispatch(setNick(inputValue));
    !userId && dispatch(setUserId(generateUniqueUserId()));
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={nick ? handleClose : undefined}>
      <div className="nick-modal-conteiner">
        <span>Please enter your Nickname</span>
        <div>
          <input
            value={inputValue}
            placeholder="Nickname"
            maxLength={55}
            onChange={handleInput}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </Modal>
  );
};
