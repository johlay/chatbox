export interface ClientToServerEvents {
  chat_rooms: (_data: unknown) => void;
  chat_room_messages: (roomId: string) => void;
  join_room: (data: ChatRoom, userId: string) => void;
  send_message: ({
    msg,
    roomId,
    userId,
  }: {
    msg: string;
    roomId: string;
    userId: string;
  }) => void;
}

export interface ServerToClientEvents {
  chat_rooms: (payload: ChatRoom[]) => void;
  receive_messages: (payload: ChatMessages | undefined) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {}

export type ChatRoom = {
  id: string;
  room_name: string;
};

export type Message = {
  message: string;
  sender_user_id: string;
};

export type ChatMessages = {
  id: string;
  messages: Message[];
  users: string[];
};
