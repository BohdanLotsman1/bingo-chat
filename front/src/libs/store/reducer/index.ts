import {
  GET_ACTIVE_ROOMS,
  GET_ACTIVE_ROOMS_ERROR,
  GET_ACTIVE_ROOMS_SUCCESS,
  SET_MESSAGES,
  SET_NICK,
  SET_ROOM,
  SET_USER_ID,
} from "./actionTypes";
import { Actions, InitialState } from "../../../types";

const initialState: InitialState = {
  activeRooms: [],
  nick: "",
  error: "",
  isRoomsFetching: false,
  messages: [],
  uniqueUserId: "",
  room: "",
};

const rootReducer = (
  state: InitialState = initialState,
  { type, payload }: Actions
) => {
  switch (type) {
    case GET_ACTIVE_ROOMS:
      return { ...state, isRoomsFetching: true };

    case GET_ACTIVE_ROOMS_SUCCESS:
      return { ...state, activeRooms: payload, isRoomsFetching: false };

    case GET_ACTIVE_ROOMS_ERROR:
      return { ...state, isRoomsFetching: false, error: payload };

    case SET_NICK:
      return { ...state, nick: payload };

    case SET_ROOM:
      return { ...state, room: payload };

    case SET_USER_ID:
      return { ...state, uniqueUserId: payload };

    case SET_MESSAGES:
      return { ...state, messages: payload };

    default:
      return state;
  }
};

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;
