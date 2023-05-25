export interface ClientToServerEvents {
  chat_rooms: (_data: unknown) => void;
  chat_room_messages: (roomId: string) => void;
  join_room: (data: ChatRoom | null, userId: string) => void;
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
  receive_messages: (roomMessages: ChatMessages) => void;
}

export type Message = {
  message: string;
  sender_user_id: string;
};

export type ChatRoom = {
  id: string;
  room_name: string;
};

export type ChatMessages = {
  id: string;
  messages: Message[];
};
