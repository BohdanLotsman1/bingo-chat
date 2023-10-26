import { State } from "./reducer";

export const activeRoomsSelector = (state: State) => state.activeRooms;

export const nickSelector = (state: State) => state.nick;

export const messagesSelector = (state: State) => state.messages;

export const userIdSelector = (state: State) => state.uniqueUserId;

export const isRoomsFetchingSelector = (state: State) => state.isRoomsFetching;

export const roomSelector = (state: State) => state.room;
