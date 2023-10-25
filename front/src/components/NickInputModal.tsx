import React, { ChangeEvent, useState } from "react";
import { Modal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { nickSelector } from "../libs/store/selectors";
import { setNick } from "../libs/store/reducer/actions";

export const NickInputModal: React.FC = () => {
  const dispatch = useDispatch();

  const nick = useSelector(nickSelector);

  const [inputValue, setInputValue] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    dispatch(setNick(inputValue));
  };

  return (
    <Modal isOpen={!nick}>
      <div>
        <input value={inputValue} onChange={handleInput} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </Modal>
  );
};
