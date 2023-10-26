export interface IMessage {
  message: string;
  nick: string;
  room?: string;
  userId: string;
}

export interface Actions {
  type: string;
  payload?: any;
  meta?: any;
}

export interface InitialState {
  activeRooms: Array<string>;
  nick: string;
  error: string;
  isRoomsFetching: boolean;
  messages: Array<IMessage>;
  uniqueUserId: string;
  room: string;
}
