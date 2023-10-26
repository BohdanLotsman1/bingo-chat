import { IMessage } from "../../../types";
import {
  CLEAN_ERROR,
  GET_ACTIVE_ROOMS,
  GET_ACTIVE_ROOMS_ERROR,
  GET_ACTIVE_ROOMS_SUCCESS,
  SET_MESSAGES,
  SET_NICK,
  SET_ROOM,
  SET_USER_ID,
} from "./actionTypes";

export const getActiveRooms = () => ({
  type: GET_ACTIVE_ROOMS,
});

export const getActiveRoomsSuccess = (payload: string[]) => ({
  type: GET_ACTIVE_ROOMS_SUCCESS,
  payload,
});

export const getActiveRoomsError = (payload: string) => ({
  type: GET_ACTIVE_ROOMS_ERROR,
  payload,
});

export const cleanError = () => ({
  type: CLEAN_ERROR,
});

export const setNick = (payload: string) => ({
  type: SET_NICK,
  payload,
});

export const setUserId = (payload: string) => ({
  type: SET_USER_ID,
  payload,
});

export const setMessages = (payload: Array<IMessage>) => ({
  type: SET_MESSAGES,
  payload,
});

export const setRoom = (payload: string) => ({
  type: SET_ROOM,
  payload,
});
