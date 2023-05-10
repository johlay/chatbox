export type Message = {
  message: string;
  sender_socket_id: string;
};

export type ChatRoom = {
  id: string;
  room_name: string;
};

export type ChatMessages = {
  id: string;
  messages: Message[];
};
